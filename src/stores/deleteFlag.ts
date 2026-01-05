import { ref } from 'vue'

// start as false by default to avoid stale values from prior actions
export const hasAttemptedDeleteRef = ref<boolean>(false)

export function markAttemptedDelete() {
  try {
    if (typeof window === 'undefined') return
    sessionStorage.setItem('hasAttemptedDelete', 'true')
  } catch {}
  hasAttemptedDeleteRef.value = true
}

export function resetAttemptedDelete() {
  try {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem('hasAttemptedDelete')
  } catch {}
  hasAttemptedDeleteRef.value = false
}
