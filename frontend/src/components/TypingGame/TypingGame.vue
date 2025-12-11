<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Statistics Panel -->
    <div class="mb-6 grid grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
        <div class="text-sm text-gray-600 font-medium">Correct Keys</div>
        <div class="text-2xl font-bold text-blue-600">{{ stats.correct }}</div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
        <div class="text-sm text-gray-600 font-medium">Wrong Keys</div>
        <div class="text-2xl font-bold text-red-600">{{ stats.wrong }}</div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
        <div class="text-sm text-gray-600 font-medium">Progress</div>
        <div class="text-2xl font-bold text-green-600">{{ progressPercentage }}%</div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
        <div class="text-sm text-gray-600 font-medium">Time</div>
        <div class="text-2xl font-bold text-purple-600">{{ formattedTime }}</div>
      </div>
    </div>

    <!-- Text Challenge Display -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div class="text-lg font-medium text-gray-700 mb-4">
        <span v-if="isCompleted" class="text-green-600 font-bold">✓ Challenge Completed!</span>
        <span v-else>Type the text below:</span>
      </div>
      <div
        class="text-2xl leading-relaxed font-mono p-4 bg-gray-50 rounded border-2 border-gray-200 min-h-[150px] break-words overflow-wrap-anywhere whitespace-pre-wrap"
      >
        <span
          v-for="(char, index) in textChallenge"
          :key="index"
          :class="getCharClass(index)"
          class="transition-all duration-300 ease-in-out px-1 rounded"
        >
          {{ char === ' ' ? ' ' : char }}
        </span>
      </div>
    </div>

    <!-- Keyboard Component -->
    <Keyboard v-model="keyboardStandard" :highlighted-keys="highlightedKeys" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useEventListener } from '@vueuse/core'
import Keyboard from '../Keyboard/Keyboard.vue'

const props = defineProps({
  textChallenge: {
    type: String,
    required: true,
    default: ''
  }
})

const keyboardStandard = ref('ABNT2')
const currentIndex = ref(0)
const typedChars = ref([])
const highlightedKeys = ref({})
const stats = ref({
  correct: 0,
  wrong: 0
})

// Timer state
const elapsedSeconds = ref(0)
const timerInterval = ref(null)
const timerStarted = ref(false)

// Progress calculation
const progressPercentage = computed(() => {
  if (!props.textChallenge.length) return 0
  return Math.round((currentIndex.value / props.textChallenge.length) * 100)
})

// Check if challenge is completed
const isCompleted = computed(() => {
  return currentIndex.value >= props.textChallenge.length && props.textChallenge.length > 0
})

// Format time as MM:SS
const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60)
  const seconds = elapsedSeconds.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// Start timer
const startTimer = () => {
  if (!timerStarted.value) {
    timerStarted.value = true
    elapsedSeconds.value = 0
    timerInterval.value = setInterval(() => {
      elapsedSeconds.value++
    }, 1000)
  }
}

// Stop timer
const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

// Get character class for styling
const getCharClass = (index) => {
  if (index < currentIndex.value) {
    // Already typed
    const isCorrect = typedChars.value[index] === props.textChallenge[index]
    return isCorrect
      ? 'text-white bg-green-500 font-semibold shadow-sm'
      : 'text-white bg-red-500 font-semibold line-through shadow-sm'
  } else if (index === currentIndex.value) {
    // Current character
    return 'bg-yellow-400 text-gray-900 underline font-bold shadow-md animate-pulse'
  } else {
    // Not yet typed
    return 'text-gray-600'
  }
}

// Map character to keyboard code
const getKeyCodeFromChar = (char, shiftPressed = false) => {
  const charUpper = char.toUpperCase()

  // Space key
  if (char === ' ') return 'Space'

  // Letters
  if (/[A-Za-z]/.test(char)) {
    return `Key${charUpper}`
  }

  // Numbers
  if (/[0-9]/.test(char)) {
    return `Digit${char}`
  }

  // Special characters mapping
  const specialMap = {
    '!': 'Digit1',
    '@': 'Digit2',
    '#': 'Digit3',
    $: 'Digit4',
    '%': 'Digit5',
    '^': 'Digit6',
    '&': 'Digit7',
    '*': 'Digit8',
    '(': 'Digit9',
    ')': 'Digit0',
    '-': 'Minus',
    _: 'Minus',
    '=': 'Equal',
    '+': 'Equal',
    '[': 'BracketLeft',
    '{': 'BracketLeft',
    ']': 'BracketRight',
    '}': 'BracketRight',
    '\\': 'Backslash',
    '|': 'Backslash',
    ';': 'Semicolon',
    ':': 'Semicolon',
    "'": 'Quote',
    '"': 'Quote',
    ',': 'Comma',
    '<': 'Comma',
    '.': 'Period',
    '>': 'Period',
    '/': 'Slash',
    '?': 'Slash',
    '`': 'Backquote',
    '~': 'Backquote',
    Ç: 'Semicolon',
    ç: 'Semicolon'
  }

  return specialMap[char] || null
}

// Handle key press
const handleKeyPress = (event) => {
  if (currentIndex.value >= props.textChallenge.length) {
    stopTimer()
    return // Challenge completed
  }

  const expectedChar = props.textChallenge[currentIndex.value]
  const typedChar = event.key

  // Block backspace - users cannot undo their typing
  if (event.key === 'Backspace') {
    event.preventDefault()
    return
  }

  // Skip non-printable characters
  if (event.key.length > 1 && event.key !== 'Backspace') {
    return
  }

  // Start timer on first keypress
  startTimer()

  // Get key code for highlighting
  const keyCode = getKeyCodeFromChar(typedChar, event.shiftKey)

  // Compare typed character with expected
  const isCorrect = typedChar === expectedChar

  typedChars.value.push(typedChar)

  // Set highlight color based on correctness
  if (keyCode) {
    highlightedKeys.value[keyCode] = isCorrect ? 'green' : 'red'

    // Clear highlight after animation duration
    setTimeout(() => {
      delete highlightedKeys.value[keyCode]
    }, 800)
  }

  if (isCorrect) {
    stats.value.correct++
    currentIndex.value++
  } else {
    stats.value.wrong++
    // Still advance to show the mistake
    currentIndex.value++
  }

  // Stop timer when challenge is completed
  if (currentIndex.value >= props.textChallenge.length) {
    stopTimer()
  }
}

// Set up keyboard listeners using VueUse
useEventListener(window, 'keydown', handleKeyPress)

// Reset when textChallenge changes
watch(
  () => props.textChallenge,
  () => {
    currentIndex.value = 0
    typedChars.value = []
    highlightedKeys.value = {}
    stats.value = {
      correct: 0,
      wrong: 0
    }
    elapsedSeconds.value = 0
    timerStarted.value = false
    stopTimer()
  }
)

// Cleanup on unmount
onUnmounted(() => {
  stopTimer()
})
</script>
