<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

type Particle = { x: number; y: number; vx: number; vy: number; size: number }

const props = defineProps({
  count: { type: Number, default: 120 },
  connectNearest: { type: Number, default: 2 },
  mouseRadius: { type: Number, default: 120 },
  bgColor: { type: String, default: '#000' },
})

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
const particles: Particle[] = []
const mouse = { x: 0, y: 0, active: false }

function resizeCanvas() {
  if (!canvas.value || !ctx) return
  const dpr = window.devicePixelRatio || 1
  canvas.value.width = Math.floor(canvas.value.clientWidth * dpr)
  canvas.value.height = Math.floor(canvas.value.clientHeight * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function initParticles(width: number, height: number) {
  particles.length = 0
  for (let i = 0; i < props.count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: 1 + Math.random() * 1.6,
    })
  }
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy)
}

function updateAndDraw() {
  if (!canvas.value || !ctx) return
  const w = canvas.value.clientWidth
  const h = canvas.value.clientHeight

  // background
  ctx.fillStyle = props.bgColor
  ctx.fillRect(0, 0, w, h)

  // update particles
  for (const p of particles) {
    if (mouse.active) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < props.mouseRadius && dist > 0.1) {
        const repulse = ((props.mouseRadius - dist) / props.mouseRadius) * 0.9
        p.vx += (dx / dist) * repulse * 0.6
        p.vy += (dy / dist) * repulse * 0.6
      }
    }

    p.x += p.vx
    p.y += p.vy
    p.vx *= 0.985
    p.vy *= 0.985

    if (p.x < 0) {
      p.x = 0
      p.vx *= -1
    }
    if (p.y < 0) {
      p.y = 0
      p.vy *= -1
    }
    if (p.x > w) {
      p.x = w
      p.vx *= -1
    }
    if (p.y > h) {
      p.y = h
      p.vy *= -1
    }
  }

  // draw connected triangles
  ctx.lineWidth = 0.6
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    const dists: { idx: number; d: number }[] = []
    for (let j = 0; j < particles.length; j++) {
      if (i === j) continue
      const other = particles[j]
      if (!other) continue
      dists.push({ idx: j, d: distance(p!, other) })
    }
    dists.sort((a, b) => a.d - b.d)
    for (let k = 0; k < props.connectNearest && k < dists.length; k++) {
      const n1 = particles[dists[k]!.idx]
      if (!n1) continue
      for (let m = k + 1; m < props.connectNearest + 1 && m < dists.length; m++) {
        const n2 = particles[dists[m]!.idx]
        if (!n2) continue
        const avgDist = (dists[k]!.d + dists[m]!.d) / 2
        const alpha = Math.max(0, 0.35 - avgDist / Math.max(w, h))
        if (alpha <= 0) continue
        ctx.strokeStyle = `rgba(180,180,200,${alpha})`
        ctx.beginPath()
        ctx.moveTo(p!.x, p!.y)
        ctx.lineTo(n1.x, n1.y)
        ctx.lineTo(n2.x, n2.y)
        ctx.closePath()
        ctx.stroke()
      }
    }
  }

  // draw points
  for (const p of particles) {
    ctx.fillStyle = 'rgba(220,220,230,0.95)'
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
  }

  raf = requestAnimationFrame(updateAndDraw)
}

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  if (!ctx) return

  canvas.value.style.position = 'absolute'
  canvas.value.style.left = '0'
  canvas.value.style.top = '0'
  canvas.value.style.width = '100%'
  canvas.value.style.height = '100%'
  canvas.value.style.display = 'block'
  canvas.value.style.zIndex = '0'

  const handleResize = () => {
    resizeCanvas()
    if (canvas.value) initParticles(canvas.value.clientWidth, canvas.value.clientHeight)
  }

  handleResize()
  window.addEventListener('resize', handleResize)

  const onMove = (e: MouseEvent) => {
    mouse.x = e.clientX - canvas.value!.getBoundingClientRect().left
    mouse.y = e.clientY - canvas.value!.getBoundingClientRect().top
    mouse.active = true
  }
  const onLeave = () => (mouse.active = false)

  canvas.value.addEventListener('mousemove', onMove)
  canvas.value.addEventListener('mouseenter', onMove)
  canvas.value.addEventListener('mouseleave', onLeave)

  raf = requestAnimationFrame(updateAndDraw)

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', handleResize)
    if (!canvas.value) return
    canvas.value.removeEventListener('mousemove', onMove)
    canvas.value.removeEventListener('mouseenter', onMove)
    canvas.value.removeEventListener('mouseleave', onLeave)
  })
})

watch(
  () => props.count,
  () => {
    if (canvas.value) initParticles(canvas.value.clientWidth, canvas.value.clientHeight)
  },
)
</script>

<template>
  <canvas ref="canvas" class="particle-canvas" />
</template>

<style scoped>
.particle-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
