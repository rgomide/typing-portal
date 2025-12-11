<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        :class="positionClasses"
        @click.self="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div
          v-if="overlay"
          class="absolute inset-0 backdrop-blur-sm"
          style="background-color: rgba(107, 114, 128, 0.7)"
          @click="handleBackdropClick"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden z-10 p-6 gap-2"
          @click.stop
        >
          <!-- Header Slot -->
          <div v-if="$slots.header" class="w-full">
            <slot name="header"></slot>
          </div>

          <!-- Content Slot -->
          <div class="flex-1 overflow-y-auto">
            <slot name="content"></slot>
          </div>

          <!-- Button Bar Slot -->
          <div v-if="$slots['button-bar']" class="w-full">
            <slot name="button-bar"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'center',
    validator: (value) => ['top', 'center', 'bottom'].includes(value)
  },
  closeOnBackdropClick: {
    type: Boolean,
    default: true
  },
  overlay: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:modelValue', 'close'])

const positionClasses = computed(() => {
  const positions = {
    top: 'items-start pt-8',
    center: 'items-center',
    bottom: 'items-end pb-8'
  }
  return positions[props.position]
})

const handleBackdropClick = () => {
  if (props.closeOnBackdropClick) {
    closeModal()
  }
}

const closeModal = () => {
  emits('update:modelValue', false)
  emits('close')
}

const handleEscape = (event) => {
  if (event.key === 'Escape' && props.modelValue) {
    closeModal()
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  opacity: 0;
  transform: scale(0.95);
}
</style>
