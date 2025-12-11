<template>
  <div
    @click="handleClick"
    :class="[
      'relative bg-white border rounded-lg p-6 shadow-md transition-all duration-200',
      enabled
        ? 'border-gray-200 hover:shadow-lg hover:border-gray-300 cursor-pointer'
        : 'border-gray-300 opacity-75 cursor-not-allowed'
    ]"
    :style="{ maxWidth: maxWidth, maxHeight: maxHeight }"
  >
    <!-- Locker icon overlay when disabled -->
    <div v-if="!enabled" class="absolute top-4 right-4 z-10">
      <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    </div>

    <!-- Title -->
    <h3 :class="['text-xl font-bold mb-4', enabled ? 'text-gray-800' : 'text-gray-500']">
      {{ title }}
    </h3>

    <!-- Thumbnail Image -->
    <div :class="['w-full mb-4 rounded-lg overflow-hidden', !enabled && 'grayscale']">
      <img :src="thumbUrl" :alt="title" class="w-full h-48 object-cover" />
    </div>

    <!-- Description -->
    <p :class="['text-sm mb-4', enabled ? 'text-gray-600' : 'text-gray-400']">
      {{ description }}
    </p>

    <!-- Difficulty Stars -->
    <div class="flex items-center justify-center">
      <h4 class="text-md font-bold mb-2 text-gray-800">Dificuldade</h4>
    </div>
    <div class="flex items-center justify-center gap-1">
      <svg
        v-for="star in 5"
        :key="star"
        class="w-7 h-7"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :fill="star <= difficulty ? '#ca8a04' : '#d1d5db'"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
// emits
const emits = defineEmits(['click'])

// props
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true,
    validator: (value) => value >= 1 && value <= 5
  },
  enabled: {
    type: Boolean,
    required: false,
    default: true
  },
  thumbUrl: {
    type: String,
    required: true
  },
  maxWidth: {
    type: String,
    required: false,
    default: '300px'
  },
  maxHeight: {
    type: String,
    required: false,
    default: null
  }
})

// actions
const handleClick = () => {
  if (props.enabled) {
    emits('click')
  }
}
</script>
