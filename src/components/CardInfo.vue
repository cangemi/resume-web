<template>
  <Vcard
    :key="cardKey"
    class="card"
    :class="[{ visible }, { 'with-line': showLine }]"
    :showBorder="false"
  >
    <h2>{{ title }}</h2>
    <div class="card-content">
      <div
        ref="editable"
        class="editable"
        contenteditable="true"
        @input="onInput"
        @keydown="onKeydown"
        @click="onClick"
        @mouseup="onMouseUp"
      >
        <slot>
          <p v-if="content" v-html="content"></p>
        </slot>
      </div>
    </div>
    <div class="border-anim" aria-hidden>
      <span class="side top"></span>
      <span class="side right"></span>
      <span class="side bottom"></span>
      <span class="side left"></span>
    </div>
  </Vcard>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  content?: string
  visible?: boolean
  showLine?: boolean
}>()

import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { markAttemptedDelete } from '@/stores/deleteFlag'
import Vcard from '@/components/Vcard.vue'
const emit = defineEmits<{
  (e: 'update:content', html: string): void
  (e: 'reload'): void
}>()
const cardKey = ref(0)

function rebuildCard() {
  cardKey.value++
  emit('reload')
}

const editable = ref<HTMLElement | null>(null)
let previousHTML = ''
let previousPlain = ''
let lastDeleted = ''
let restoreTimer: number | null = null
let typingTimer: number | null = null
let isTyping = false
let preDeletionText = ''
let preDeletionHTML = ''
let totalDeletedSinceRestore = 0
const MAX_TOTAL_DELETE = 20

type CaretPos = 'start' | 'end' | number

function setCaretTo(el: HTMLElement | null | undefined, pos: CaretPos = 'end') {
  if (!el) return
  const sel = window.getSelection()
  try {
    if (pos === 'end') {
      const range = document.createRange()
      range.selectNodeContents(el)
      range.collapse(false)
      sel?.removeAllRanges()
      if (sel) sel.addRange(range)
      return
    }

    if (pos === 'start') {
      const range = document.createRange()
      range.selectNodeContents(el)
      range.collapse(true)
      sel?.removeAllRanges()
      if (sel) sel.addRange(range)
      return
    }

    let remaining = Number(pos)
    if (isNaN(remaining) || remaining <= 0) {
      const range = document.createRange()
      range.selectNodeContents(el)
      range.collapse(true)
      sel?.removeAllRanges()
      if (sel) sel.addRange(range)
      return
    }

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null)
    let node = walker.nextNode() as Text | null
    while (node && remaining > node.data.length) {
      remaining -= node.data.length
      node = walker.nextNode() as Text | null
    }

    const range = document.createRange()
    if (!node) {
      range.selectNodeContents(el)
      range.collapse(false)
      sel?.removeAllRanges()
      if (sel) sel.addRange(range)
      return
    }

    range.setStart(node, Math.max(0, remaining))
    range.collapse(true)
    sel?.removeAllRanges()
    if (sel) sel.addRange(range)
  } catch (err) {
    // ignore errors
  }
}

function ensureCaretEnd() {
  if (!editable.value) return
  requestAnimationFrame(() => setCaretTo(editable.value as HTMLElement, 'end'))
}

function clearRestoreTimer() {
  if (restoreTimer) {
    clearTimeout(restoreTimer)
    restoreTimer = null
  }
}

function clearTypingTimer() {
  if (typingTimer) {
    clearInterval(typingTimer)
    typingTimer = null
  }
  isTyping = false
  // after automated typing finishes, update snapshots and inform parent
  if (editable.value) {
    previousPlain = (editable.value.innerText || '').replace(/[\r\n]+/g, ' ')
    previousHTML = editable.value.innerHTML
    totalDeletedSinceRestore = 0
    emit('update:content', previousHTML)
    rebuildCard()
  }
}

// remove the last `n` plain-text characters from `editable`, traversing text nodes
function deleteLastNChars(n: number) {
  if (!editable.value || n <= 0) return
  let remaining = n
  const walker = document.createTreeWalker(editable.value, NodeFilter.SHOW_TEXT, null)
  const textNodes: Text[] = []
  let node = walker.nextNode() as Text | null
  while (node) {
    textNodes.push(node)
    node = walker.nextNode() as Text | null
  }
  for (let i = textNodes.length - 1; i >= 0 && remaining > 0; i--) {
    const t = textNodes[i]
    const len = t!.data.length
    if (len <= remaining) {
      const parent = t!.parentNode
      // remove this text node
      if (t!.parentNode) t!.parentNode.removeChild(t!)
      // if parent becomes empty element, remove it
      if (parent && parent.nodeType === Node.ELEMENT_NODE && parent.childNodes.length === 0) {
        parent.parentNode?.removeChild(parent)
      }
      remaining -= len
    } else {
      t!.data = t!.data.slice(0, len - remaining)
      remaining = 0
    }
  }
}

function scheduleRestore(delay = 5000) {
  clearRestoreTimer()
  try {
    markAttemptedDelete()
  } catch {}
  restoreTimer = window.setTimeout(() => {
    if (!editable.value) return
    if (!lastDeleted) return
    const toType = lastDeleted
    lastDeleted = ''
    typeBack(toType)
  }, delay)
}

function typeBack(textToType: string) {
  if (!editable.value || !textToType) return
  isTyping = true
  let i = 0
  typingTimer = window.setInterval(() => {
    if (!editable.value) return
    editable.value.innerText = (editable.value.innerText || '') + textToType[i]
    previousPlain = (editable.value.innerText || '').replace(/[\r\n]+/g, ' ')
    previousHTML = editable.value.innerHTML
    ensureCaretEnd()
    i++
    if (i >= textToType.length) {
      clearTypingTimer()
      // ensure parent is informed after typing completes
      if (editable.value) {
        emit('update:content', editable.value.innerHTML)
        rebuildCard()
      }
    }
  }, 60)
}

function onInput(e: Event) {
  if (!editable.value || isTyping) return
  const currentHTML = editable.value.innerHTML
  const currentPlain = (editable.value.innerText || '').replace(/[\r\n]+/g, ' ')

  // if anchors were removed, revert HTML to preserve links
  const prevAnchors = (previousHTML.match(/<a\b/gi) || []).length
  const currAnchors = (currentHTML.match(/<a\b/gi) || []).length
  if (currAnchors < prevAnchors) {
    editable.value.innerHTML = previousHTML
    previousPlain = previousHTML ? (editable.value.innerText || '').replace(/[\r\n]+/g, ' ') : ''
    previousHTML = editable.value.innerHTML
    ensureCaretEnd()
    return
  }

  // update snapshots; deletions are handled in onKeydown to avoid duplicate processing
  if (currentPlain.length >= previousPlain.length) {
    lastDeleted = ''
    clearRestoreTimer()
  }
  previousPlain = currentPlain
  previousHTML = currentHTML
}

function onKeydown(e: KeyboardEvent) {
  if (!editable.value) return
  // while the component is auto-typing, block any deletion or input
  if (isTyping) {
    e.preventDefault()
    requestAnimationFrame(() => ensureCaretEnd())
    return
  }

  const allowed = ['Backspace']
  if (!allowed.includes(e.key)) {
    e.preventDefault()
    requestAnimationFrame(() => ensureCaretEnd())
    return
  }

  // capture pre-deletion text so we can compute exactly what was removed
  preDeletionText = editable.value.innerText || ''
  preDeletionHTML = editable.value.innerHTML || ''
  // compute deletion after native input applies
  setTimeout(() => {
    if (!editable.value) return
    const postText = editable.value.innerText || ''

    // no change or insertion
    if (postText.length >= preDeletionText.length) {
      previousPlain = postText.replace(/[\r\n]+/g, ' ')
      previousHTML = editable.value.innerHTML
      return
    }

    const deletedPlainCount = preDeletionText.length - postText.length
    if (totalDeletedSinceRestore >= MAX_TOTAL_DELETE) {
      // already reached global delete limit: revert this deletion
      editable.value.innerHTML = preDeletionHTML
      previousPlain = (editable.value.innerText || '').replace(/[\r\n]+/g, ' ')
      previousHTML = editable.value.innerHTML
      ensureCaretEnd()
      // schedule type-back after 1 second
      scheduleRestore(1000)
      return
    }

    const allowed = Math.max(0, MAX_TOTAL_DELETE - totalDeletedSinceRestore)
    if (deletedPlainCount > allowed) {
      // user attempted to delete more than remaining allowance: revert and delete only allowed
      editable.value.innerHTML = preDeletionHTML
      // perform exact deletion of `allowed` plain chars from end while preserving HTML
      deleteLastNChars(allowed)
      const actualDeletedText = preDeletionText.slice(preDeletionText.length - allowed)
      totalDeletedSinceRestore += allowed
      lastDeleted = actualDeletedText + lastDeleted
      previousPlain = (editable.value.innerText || '').replace(/[\r\n]+/g, ' ')
      previousHTML = editable.value.innerHTML
      // start retyping allowed-deleted fragment after 1 second
      scheduleRestore(1000)
      return
    }

    // normal deletion within allowance
    const deletedChunk = preDeletionText.slice(postText.length)
    if (deletedChunk.length === 0) {
      previousPlain = postText.replace(/[\r\n]+/g, ' ')
      previousHTML = editable.value.innerHTML
      return
    }
    totalDeletedSinceRestore += deletedPlainCount
    lastDeleted = deletedChunk + lastDeleted
    previousPlain = postText.replace(/[\r\n]+/g, ' ')
    previousHTML = editable.value.innerHTML
    scheduleRestore()
  }, 0)
}

function onMouseUp(e: MouseEvent) {
  // if the user clicked a link, don't move the caret
  const target = e.target as HTMLElement | null
  if (target && target.closest && target.closest('a')) return
  ensureCaretEnd()
}

function onClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (!target) return
  const a = target.closest('a') as HTMLAnchorElement | null
  if (!a) return
  const href = a.getAttribute('href')
  if (!href) return
  // open links in a new tab/window
  window.open(href, '_blank')
  e.preventDefault()
}

onMounted(async () => {
  await nextTick()
  if (editable.value) {
    // ensure prop content is inside editable
    if (!editable.value.innerHTML || editable.value.innerHTML.trim() === '') {
      if ((props as any).content) editable.value.innerHTML = (props as any).content
    }
    previousHTML = editable.value.innerHTML || ''
    previousPlain = (editable.value.innerText || '').replace(/[\r\n]+/g, ' ')
  }
})

onBeforeUnmount(() => {
  clearRestoreTimer()
  clearTypingTimer()
})
</script>

<style scoped>
.card {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.06);
  padding: 30px;
  margin-top: 50px;
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.35);
  width: 100%;
  display: block;
  box-sizing: border-box;
  text-align: left;
  opacity: 0;
  transition:
    opacity 420ms ease,
    transform 420ms ease;
  pointer-events: none;
  /* keep final border as requested, but start transparent and reveal after animation */
  transition-property: opacity, transform, border-color;
  transition-duration: 420ms, 420ms, 0s;
  transition-delay: 0ms, 0ms, 720ms; /* delay border-color change until after draw */
}
@media (max-width: 900px) {
  .card {
    margin-top: 30px;
  }
}
.card.visible {
  opacity: 1;
  pointer-events: auto;
}
.card.with-line.visible::before {
  height: 16px;
  opacity: 0.9;
}

/* animated perimeter border using an SVG rect (stroke-dasharray animation) */
.card {
  overflow: visible; /* show svg stroke */
}
.card-border {
  position: absolute;
  inset: 0; /* stretch to card size */
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}
.card-border rect {
  stroke-dasharray: 365; /* approximate perimeter */
  stroke-dashoffset: 365;
  opacity: 0;
  transition: opacity 120ms linear;
}
.card.visible .card-border rect {
  animation: draw-border 700ms ease forwards;
  opacity: 1;
}
@keyframes draw-border {
  to {
    stroke-dashoffset: 0;
  }
}

/* border animation using 4 span sides */
.border-anim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
}
.border-anim .side {
  position: absolute;
  background: #fff;
  opacity: 0;
}
.border-anim .side.top,
.border-anim .side.bottom {
  height: 1px;
  left: 0;
  right: 0;
  width: 0%;
}
.border-anim .side.left,
.border-anim .side.right {
  width: 1px;
  top: 0;
  bottom: 0;
  height: 0%;
}
.border-anim .side.top {
  top: 0;
  transform-origin: left center;
}
.border-anim .side.right {
  right: 0;
  transform-origin: top center;
}
.border-anim .side.bottom {
  bottom: 0;
  transform-origin: right center;
}
.border-anim .side.left {
  left: 0;
  transform-origin: bottom center;
}

/* animation sequence: top -> right -> bottom -> left */
.card.visible .border-anim .side.top {
  animation: grow-width 240ms ease forwards 0ms;
  opacity: 1;
}
.card.visible .border-anim .side.right {
  animation: grow-height 240ms ease forwards 180ms;
  opacity: 1;
}
.card.visible .border-anim .side.bottom {
  animation: grow-width 240ms ease forwards 360ms;
  opacity: 1;
}
.card.visible .border-anim .side.left {
  animation: grow-height 240ms ease forwards 540ms;
  opacity: 1;
}

@keyframes grow-width {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
@keyframes grow-height {
  from {
    height: 0%;
  }
  to {
    height: 100%;
  }
}

/* after the draw completes, reveal the actual CSS border (1px solid #fff) */
.card.visible {
  border-color: #fff;
}

/* editable area styles and typing-tag */
.editable {
  outline: none;
  caret-color: #fff;
  min-height: 2rem;
  white-space: normal; /* collapse consecutive whitespace/newlines */
  line-height: 1.5;
}
.editable p {
  margin: 0;
}
.typing-tag {
  display: inline-block;
  color: #4ade80;
  margin-left: 0.5rem;
  opacity: 0;
  transform-origin: left center;
}
.typing-tag.play {
  animation: typeAndFade 1.2s steps(5, end) forwards;
}
@keyframes typeAndFade {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(6px);
  }
}
</style>
