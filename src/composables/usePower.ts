import { promiseTimeout } from '@vueuse/core'

const powerDisabled = ref<boolean>(true)

watch(
  () => powerDisabled.value,
  async (newVal) => {
    if (!newVal) {
      await promiseTimeout(5000)
      powerDisabled.value = !powerDisabled.value
    }
  },
  {
    immediate: true
  }
)

export const usePower = () => {
  useEventListener(document, 'keydown', (evt) => {
    const { code } = evt
    if (code === 'Enter' && powerDisabled.value) {
      powerDisabled.value = false
    }
  })
  return powerDisabled
}