<script setup lang="ts">
import LangSwitcher from '@/components/LangSwitcher.vue'
</script>

<template>
  <div id="app-root">
    <LangSwitcher class="top-right" />
    <router-view />
  </div>
</template>

<style scoped>
.top-right {
  position: fixed;
  top: 14px;
  right: 18px;
  z-index: 60;
}
#app-root {
  min-height: 100vh;
}
</style>
