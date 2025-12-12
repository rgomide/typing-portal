<template>
  <Teleport to="body">
    <Transition
      :enter-active-class="transitionClasses.enterActive"
      :enter-from-class="transitionClasses.enterFrom"
      :enter-to-class="transitionClasses.enterTo"
      :leave-active-class="transitionClasses.leaveActive"
      :leave-from-class="transitionClasses.leaveFrom"
      :leave-to-class="transitionClasses.leaveTo"
    >
      <div
        v-if="isVisible"
        class="fixed left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-[500px] flex items-center gap-3"
        :class="[positionClasses, colorClasses]"
      >
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'red', 'yellow', 'gray'].includes(value)
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  duration: {
    type: Number,
    default: 1000
  }
})

const emits = defineEmits(['update:modelValue', 'close'])

const isVisible = ref(props.modelValue)
let timeoutId = null

const positionClasses = computed(() => {
  return {
    top: 'top-4',
    bottom: 'bottom-4'
  }[props.position]
})

const colorClasses = computed(() => {
  const colors = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    red: 'bg-red-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    gray: 'bg-gray-500 text-white'
  }
  return colors[props.color]
})

const transitionClasses = computed(() => {
  const isTop = props.position === 'top'
  return {
    enterActive: 'transition-all duration-300 ease-out',
    enterFrom: `opacity-0 ${isTop ? '-translate-y-5' : 'translate-y-5'}`,
    enterTo: 'opacity-100 translate-y-0',
    leaveActive: 'transition-all duration-300 ease-in',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: `opacity-0 ${isTop ? 'translate-y-5' : '-translate-y-5'}`
  }
})

const hideToast = () => {
  isVisible.value = false
  setTimeout(() => {
    emits('update:modelValue', false)
    emits('close')
  }, 300) // Wait for transition to complete
}

const showToast = () => {
  isVisible.value = true
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      hideToast()
    }, props.duration)
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      showToast()
    } else {
      hideToast()
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.modelValue) {
    showToast()
  }
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>
