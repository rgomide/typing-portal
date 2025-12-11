<template>
  <button type="button" :disabled="isLoading" :class="buttonClass" @click="handleClick">
    <span v-if="isLoading">
      <svg
        class="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <span>
      {{ isLoading ? labelLoading : label }}
    </span>
  </button>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  labelLoading: {
    type: String,
    required: false,
    default: 'Carregando...'
  },
  color: {
    type: String,
    required: false,
    default: 'blue'
  }
})

const emits = defineEmits(['click'])

const handleClick = () => {
  emits('click')
}

const buttonClass = computed(() => {
  let classes = 'flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white w-full'
  if (props.isLoading) {
    classes += ' bg-gray-500 cursor-not-allowed'
  } else {
    classes += ` bg-${props.color}-500 hover:bg-${props.color}-600 active:bg-${props.color}-700 cursor-pointer`
  }
  return classes
})
</script>
