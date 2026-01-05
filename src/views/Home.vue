<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue'
import Background from '@/components/Background.vue'
import CardInfo from '@/components/CardInfo.vue'
import Vcard from '@/components/Vcard.vue'
import { t, lang } from '@/stores/lang'
import { initialGridCells, type GridCell } from '@/data/gridCells'
import { hasAttemptedDeleteRef } from '@/stores/deleteFlag'

const scrolled = ref(0)
const home = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)

// grid cells: keep data separate for easier editing
const gridCells = ref<Array<null | GridCell>>(initialGridCells)

const displayedCells = computed(() => {
  // show the appropriate 'deleteAttempted' CTA depending on the flag
  return gridCells.value.map((cell) => {
    if (!cell) return null
    if (cell.id === 'deleteAttempted') {
      console.log('Rendering deleteAttempted cell, flag is ', hasAttemptedDeleteRef.value)
      if (hasAttemptedDeleteRef.value) {
        const title =
          lang.value === 'en'
            ? 'Hey… did you try to delete something? 🤔'
            : ' Ei… por acaso você tentou apagar alguma coisa? 🤔'

        const content =
          lang.value === 'en'
            ? `
                <p>
                  I'm curious 😅<br /><br />

                  Jokes aside, if something didn't please you or if you liked it a lot, if you have a suggestion
                  or just want to chat, let's talk!
                </p>

                <p>
                    <a style="color: #4ade80" href="https://wa.me/5516981777171" target="_blank" rel="noopener noreferrer">(16) 98177-7171</a><br />
                  I promise I'm easier to understand than this layout 😄
                </p>
                `
            : `
                <p>
                  Fiquei curioso 😅<br /><br />

                  Brincadeiras à parte, se algo não te agradou ou agradou muito, se você tem uma sugestão
                  ou simplesmente quer trocar uma ideia, bora conversar!
                </p>

                <p>
                    <a style="color: #4ade80" href="https://wa.me/5516981777171" target="_blank" rel="noopener noreferrer">(16) 98177-7171</a><br />
                  Prometo que sou mais fácil de entender do que esse layout 😄
                </p>
                `

        return {
          id: 'deleteAttempted',
          title,
          showLine: false,
          content,
        } as GridCell
      }
      return cell
    }
    return cell
  })
})

function getTitle(cell: GridCell | null) {
  if (!cell) return ''
  return lang.value === 'en' && cell.title_en ? cell.title_en : cell.title
}

function getContent(cell: GridCell | null) {
  if (!cell) return ''
  return lang.value === 'en' && cell.content_en ? cell.content_en : cell.content
}

let dragSrcIndex: number | null = null
const isDragging = ref(false)
let dragPlaceholder: HTMLElement | null = null
let onDocDrag: ((e: DragEvent) => void) | null = null

// pointer offset inside the card where the user clicked
let dragOffsetX = 0
let dragOffsetY = 0
// pointer-based drag (replaces native drag for better control)
let currentDraggedEl: HTMLElement | null = null
let pointerMoveHandler: ((ev: PointerEvent) => void) | null = null
let pointerUpHandler: ((ev: PointerEvent) => void) | null = null
let lastDropIndex: number | null = null

function startPointerDrag(idx: number, e: PointerEvent) {
  const target = e.target as HTMLElement | null
  // disable drag on touch/mobile devices
  const isTouch =
    (e as any).pointerType === 'touch' || window.matchMedia('(max-width: 900px)').matches
  if (isTouch) return

  // if the user clicked inside an editable region or on a link/button, allow the event (no drag)
  if (
    target &&
    (target.closest('.editable') ||
      target.closest('a') ||
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea'))
  ) {
    return
  }
  e.preventDefault()
  const el = target?.closest('.draggable-card') as HTMLElement | null
  if (!el) return
  dragSrcIndex = idx
  isDragging.value = true
  currentDraggedEl = el
  el.classList.add('is-dragging')
  const rect = el.getBoundingClientRect()

  // placeholder preserves layout
  dragPlaceholder = document.createElement('div')
  dragPlaceholder.className = 'drag-placeholder'
  dragPlaceholder.style.width = rect.width + 'px'
  dragPlaceholder.style.height = rect.height + 'px'
  el.parentNode?.insertBefore(dragPlaceholder, el)

  // compute pointer offset inside the element
  dragOffsetX = e.clientX - rect.left
  dragOffsetY = e.clientY - rect.top

  // fix element to viewport for smooth movement
  el.style.position = 'fixed'
  el.style.left = e.clientX - dragOffsetX + 'px'
  el.style.top = e.clientY - dragOffsetY + 'px'
  el.style.width = rect.width + 'px'
  el.style.height = rect.height + 'px'
  el.style.margin = '0'
  el.style.zIndex = '1000'
  el.style.userSelect = 'none'

  try {
    ;(el as any).setPointerCapture((e as any).pointerId)
  } catch (err) {
    /* ignore */
  }

  pointerMoveHandler = (ev: PointerEvent) => {
    ev.preventDefault()
    const x = ev.clientX
    const y = ev.clientY
    if (!currentDraggedEl) return
    currentDraggedEl.style.left = x - dragOffsetX + 'px'
    currentDraggedEl.style.top = y - dragOffsetY + 'px'

    // detect underlying grid-cell by hiding the dragged element briefly
    const prevDisplay = currentDraggedEl.style.display
    currentDraggedEl.style.display = 'none'
    const underneath = document.elementFromPoint(x, y) as HTMLElement | null
    currentDraggedEl.style.display = prevDisplay

    // clear previous highlights
    document
      .querySelectorAll('.grid-cell.drop-target')
      .forEach((n) => n.classList.remove('drop-target'))
    const cell = underneath?.closest('.grid-cell') as HTMLElement | null
    if (cell && cell.dataset && typeof cell.dataset.index !== 'undefined') {
      cell.classList.add('drop-target')
      lastDropIndex = parseInt(cell.dataset.index || '', 10)
    } else {
      lastDropIndex = null
    }
  }

  pointerUpHandler = (ev: PointerEvent) => {
    ev.preventDefault()
    if (pointerMoveHandler) document.removeEventListener('pointermove', pointerMoveHandler)
    if (pointerUpHandler) document.removeEventListener('pointerup', pointerUpHandler)

    // perform swap if dropped over a cell
    if (lastDropIndex !== null && dragSrcIndex !== null) {
      const src = Number(dragSrcIndex)
      const tgt = lastDropIndex
      if (src !== tgt) {
        const tmp = gridCells.value[tgt] ?? null
        gridCells.value[tgt] = gridCells.value[src] ?? null
        gridCells.value[src] = tmp
      }
    }

    // clear any drop-target highlights (including when dropped in same spot)
    document
      .querySelectorAll('.grid-cell.drop-target')
      .forEach((n) => n.classList.remove('drop-target'))

    // cleanup: restore moved element into DOM and reset styles
    if (dragPlaceholder) {
      const moved = document.querySelector(
        '[style*="position: fixed"][style*="left:"]',
      ) as HTMLElement | null
      if (moved && dragPlaceholder.parentNode) {
        dragPlaceholder.parentNode.insertBefore(moved, dragPlaceholder)
        moved.style.position = ''
        moved.style.left = ''
        moved.style.top = ''
        moved.style.width = ''
        moved.style.height = ''
        moved.style.margin = ''
        moved.style.zIndex = ''
        moved.style.userSelect = ''
      }
      dragPlaceholder.parentNode?.removeChild(dragPlaceholder)
      dragPlaceholder = null
    }

    currentDraggedEl?.classList.remove('is-dragging')
    currentDraggedEl = null
    isDragging.value = false
    dragSrcIndex = null
    lastDropIndex = null
    dragOffsetX = 0
    dragOffsetY = 0
  }

  document.addEventListener('pointermove', pointerMoveHandler)
  document.addEventListener('pointerup', pointerUpHandler)
}

function onDragEnter(idx: number, e: DragEvent) {
  if (!isDragging.value) return
  const el = (e.currentTarget || e.target) as HTMLElement | null
  el?.classList.add('drop-target')
}

function onDragLeave(idx: number, e: DragEvent) {
  const el = (e.currentTarget || e.target) as HTMLElement | null
  el?.classList.remove('drop-target')
}

function onDrop(targetIdx: number, e: DragEvent) {
  e.preventDefault()
  const data = e.dataTransfer?.getData('text/plain')
  const srcIdx = data !== undefined && data !== null ? parseInt(data, 10) : dragSrcIndex
  if (isNaN(Number(srcIdx)) || srcIdx === null) return
  // swap src and target (allow moving into empty cell)
  const src = Number(srcIdx)
  const tmp = gridCells.value[targetIdx] ?? null
  gridCells.value[targetIdx] = gridCells.value[src] ?? null
  gridCells.value[src] = tmp
  dragSrcIndex = null
}

let wheelCount = 0

const onScroll = () => {
  const top = container.value ? container.value.scrollTop : 0
  scrolled.value = wheelCount
}

let observer: IntersectionObserver | null = null
let onWheel: ((e: WheelEvent) => void) | null = null
let onKeyDown: ((e: KeyboardEvent) => void) | null = null

onMounted(async () => {
  await nextTick()

  // watch the container ref so we always attach the scroll listener
  watch(
    container,
    (newEl, oldEl) => {
      if (oldEl) oldEl.removeEventListener('scroll', onScroll)
      if (newEl) newEl.addEventListener('scroll', onScroll, { passive: true })
    },
    { immediate: true },
  )

  // IntersectionObserver para revelar cada card só quando centraliza na tela
  let observer: IntersectionObserver | null = null
  if (container.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) el.classList.add('visible')
        })
      },
      {
        root: container.value,
        threshold: 0.6, // só aciona quando boa parte do card está visível
        rootMargin: '-30% 0px -30% 0px', // só ativa quando o centro do card está próximo do centro do container
      },
    )
  }

  watch(
    displayedCells,
    (newCells) => {
      // Limpa observadores antigos
      observer?.disconnect()

      // Adiciona observadores para os novos elementos
      nextTick(() => {
        const gridCells = document.querySelectorAll('.grid-cell .draggable-card')
        gridCells.forEach((cell) => observer?.observe(cell))
      })
    },
    { immediate: true },
  )

  // forward wheel on the parent (.home) to the container so container remains scrollable
  // store handler refs so they can be removed in the outer cleanup hook
  onWheel = (e: WheelEvent) => {
    if (!container.value) return
    // only when pointer is inside home
    const rect = home.value?.getBoundingClientRect()
    if (!rect) return

    // attempt to scroll and detect whether scroll actually changed
    const prevTop = container.value.scrollTop
    container.value.scrollTop += e.deltaY
    const newTop = container.value.scrollTop

    // update wheelCount only if the container actually scrolled
    if (newTop !== prevTop) {
      if (e.deltaY > 0 && wheelCount < gridCells.value.length) {
        wheelCount++
      } else if (e.deltaY < 0 && wheelCount > 0) {
        wheelCount--
      }
    }
    console.log('Wheel event count:', wheelCount)
  }
  home.value?.addEventListener('wheel', onWheel, { passive: true })

  onScroll()

  onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Backspace') return
    const active = document.activeElement as HTMLElement | null
    // debug: log where the focus is when Backspace is pressed
    try {
      const cellEl =
        active && active.closest ? (active.closest('.grid-cell') as HTMLElement | null) : null
      const cellIdx = cellEl?.dataset ? cellEl.dataset.index : null
      console.log(
        'Backspace pressed — activeElement:',
        active,
        'tag:',
        active?.tagName,
        'classes:',
        active?.className,
        'isContentEditable:',
        active?.isContentEditable,
        'closestGridIndex:',
        cellIdx,
      )
    } catch (err) {
      console.log('Backspace pressed — could not read activeElement info', err)
    }
    if (!active) {
      e.preventDefault()
      return
    }
    if (
      active.closest &&
      (active.closest('.editable') ||
        active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable)
    ) {
      return
    }
    e.preventDefault()
  }
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  if (container.value) container.value.removeEventListener('scroll', onScroll)
  if (onWheel) home.value?.removeEventListener('wheel', onWheel)
  if (onKeyDown) document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div class="home" ref="home">
    <Background :count="240" :connectNearest="2" :mouseRadius="140" bgColor="#000" />
    <div class="container" ref="container" :class="{ dragging: isDragging }">
      <Vcard class="title" :class="{ visible: scrolled >= 0 }">
        <h1 style="font-size: 72px">
          {{`
          <h1>HELLO, WORLD!</h1>
          `}}
        </h1>
        <p style="font-size: 24px" v-html="t('introParagraph')"></p>
        <div class="scroll-note">
          <p style="font-size: 20px">{{ t('scrollNote') }}</p>
          <div class="scroll-hint" aria-hidden="true">
            <svg viewBox="0 0 24 32" width="24" height="32" preserveAspectRatio="xMidYMid meet">
              <path class="arrow" d="M12 4 L12 22" />
              <path class="arrow" d="M6 16 L12 22 L18 16" />
            </svg>
          </div>
        </div>
      </Vcard>
      <!-- Grid (3 columns) with draggable cells. Empty cells keep layout positions stable. -->
      <div class="grid">
        <template
          v-for="(cell, idx) in displayedCells"
          :key="cell ? cell.id + '-' + idx : 'empty-' + idx"
        >
          <div
            class="grid-cell"
            :data-index="idx"
            @dragover.prevent
            @drop="onDrop(idx, $event)"
            @dragenter="onDragEnter(idx, $event)"
            @dragleave="onDragLeave(idx, $event)"
          >
            <div
              v-if="cell"
              class="draggable-card"
              draggable="false"
              @pointerdown="startPointerDrag(idx, $event)"
              @dragstart.prevent
            >
              <CardInfo
                :title="getTitle(cell)"
                :content="getContent(cell)"
                :visible="scrolled >= Math.floor(idx / 3) + 2"
                :showLine="cell.showLine"
              />
            </div>
            <div v-else class="cell-placeholder" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* container should be "intangível" (não intercepta ponteiros),
   mas seus filhos continuam interativos */
.container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%; /* ocupa a altura da .home */
  justify-content: flex-start;
  overflow: auto; /* scroll apenas dentro da .container */
  padding: 35vh 10rem 4rem 10rem; /* top = metade da viewport */
  box-sizing: border-box;
  pointer-events: none; /* container não captura ponteiros */
}

.container > * {
  pointer-events: none;
}

/* elementos específicos que devem capturar ponteiros */
.title {
  pointer-events: none;
}
.emphasis {
  font-weight: 700;
}

.scroll-note,
.grid .draggable-card {
  pointer-events: auto;
}

/* hide scrollbar but keep scrolling functional */
.container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.container::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.home {
  width: 100%;
  height: 95vh; /* garante que .container não ultrapasse */
  background: #000;
  color: #fff;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  overflow: hidden; /* o scroll fica dentro de .container */
}

/* título */
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 3;
  color: #fff;
  margin: 0;
}

/* seta animada que desenha de cima pra baixo, some e repete */
.scroll-note {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
.scroll-hint {
  width: 24px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}
.scroll-hint svg {
  display: block;
}
.scroll-hint .arrow {
  stroke: #fff;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  opacity: 1;
  animation: drawFade 1.6s ease-in-out infinite;
}

@keyframes drawFade {
  0% {
    stroke-dashoffset: 100;
    opacity: 1;
  }
  60% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

/* layout helper: two CardInfo lado a lado */
.card-pair {
  display: flex;
  gap: 20rem;
  width: 100%;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  pointer-events: none; /* container não captura ponteiros */
}
.card-pair > * {
  flex: 1 1 320px; /* grow, shrink, base width */
  max-width: 48%;
}

/* grid layout for draggable cards */
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.5rem;
  width: 100%;
  box-sizing: border-box;
  pointer-events: none; /* default: let background receive events */
}
.grid-cell {
  min-height: 6rem;
}
.cell-placeholder {
  height: 100%;
  width: 100%;
}
.draggable-card {
  cursor: grab;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;
}

/* while dragging, enable grid cells as drop targets */
.container.dragging .grid-cell {
  pointer-events: auto;
}

/* dragged card visual */
.draggable-card.is-dragging {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  opacity: 1 !important;
  z-index: 30;
}

/* highlight drop target */
.grid-cell.drop-target {
  outline: 2px dashed rgba(74, 222, 128, 0.22);
  border-radius: 6px;
  transition:
    outline-color 140ms ease,
    background-color 140ms ease;
  background-color: rgba(74, 222, 128, 0.02);
}

/* placeholder that keeps layout while the real element is moved */
.drag-placeholder {
  display: block;
  background: transparent;
}

@media (max-width: 768px) {
  .card-pair > * {
    max-width: 100%;
    flex-basis: 100%;
  }
}

/* Mobile / small screens: make grid single-column and reduce spacing */
@media (max-width: 900px) {
  .container {
    padding: 30vh 2rem 2rem 2rem;
  }
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .grid-cell {
    min-height: 4rem;
  }
  .draggable-card {
    cursor: grab;
  }
  .title h1 {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 20vh 1rem 1.5rem 1rem;
  }
  .grid {
    gap: 0.75rem;
  }
  .insert-slot {
    min-height: 56px;
    padding: 0.5rem;
  }
  .slot-placeholder {
    font-size: 0.85rem;
  }
  .title h1 {
    font-size: 1.2rem;
  }
}
</style>

<style>
a,
a:visited,
a:active {
  cursor: pointer;
}
</style>

<style>
/* keyword highlight animation and fixed tooltip (global) */
.keyWord {
  color: #ffffff;
  transition: color 0.4s ease;
  animation: keywordPulse 2.4s ease-in-out infinite;
}

@keyframes keywordPulse {
  0% {
    color: #ffffff;
  }
  50% {
    color: #4ade80;
  }
  100% {
    color: #ffffff;
  }
}

.keyword-tooltip {
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 24px;
  max-width: 220px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 160ms ease,
    transform 160ms ease;
  pointer-events: none;
  position: relative;
}

.keyword-tooltip::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
}
</style>
