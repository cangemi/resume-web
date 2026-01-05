<template>
  <div class="vcard" v-bind="$attrs">
    <slot />
    <div v-if="showBorder" class="card-border" aria-hidden>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          fill="none"
          stroke="currentColor"
          stroke-width="0.5"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ showBorder?: boolean }>()
const { showBorder = true } = props
</script>

<style scoped>
.vcard {
  position: relative;
  display: block;
}
.card-border {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 4;
}
</style>
