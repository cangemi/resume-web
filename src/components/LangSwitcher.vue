<template>
  <div class="lang-switcher" role="navigation" aria-label="Language switcher">
    <button
      class="flag-btn pt"
      :class="{ active: current === 'pt' }"
      @click="set('pt')"
      title="Português - BR"
      aria-label="Português"
    >
      <img
        class="flag-img"
        src="/images/flag_14821558.png"
        alt="Bandeira do Brasil"
        width="44"
        height="28"
        aria-hidden="true"
      />
    </button>
    <button
      class="flag-btn en"
      :class="{ active: current === 'en' }"
      @click="set('en')"
      title="English"
      aria-label="English"
    >
      <img
        class="flag-img"
        src="/images/united-kingdom_4692300.png"
        alt="United Kingdom flag"
        width="44"
        height="28"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { lang, setLang } from '@/stores/lang'

const current = computed(() => lang.value)
function set(l: 'pt' | 'en') {
  setLang(l)
}
</script>

<style scoped>
.lang-switcher {
  display: flex;
  gap: 8px;
  align-items: center;
}
.flag-btn {
  background: transparent;
  border: 1px solid transparent; /* reserve space so border doesn't shift layout */
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 52px;
  min-height: 34px;
  transition:
    background 120ms ease,
    border-color 120ms ease;
}
.flag-svg {
  display: block;
  width: 28px;
  height: 20px;
}
.flag-img {
  display: block;
  width: 44px;
  height: 28px;
  object-fit: cover;
  border-radius: 3px;
}
.flag-btn:hover {
  background: rgba(255, 255, 255, 0.04);
}
.flag-btn.active {
  border-color: #ffffff;
}
</style>
