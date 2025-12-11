<template>
  <div class="max-w-6xl mx-auto">
    <!-- Sound Toggle Button -->
    <div class="flex justify-end mb-4">
      <button
        @click="toggleSound"
        class="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 cursor-pointer"
        :title="soundEnabled ? 'Desativar som' : 'Ativar som'"
      >
        <!-- Speaker icon when sound is enabled -->
        <svg
          v-if="soundEnabled"
          class="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
        <!-- Muted speaker icon when sound is disabled -->
        <svg
          v-else
          class="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      </button>
    </div>

    <!-- Statistics Panel -->
    <div class="mb-6 grid grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
        <div class="text-sm text-gray-600 font-medium">Teclas Corretas</div>
        <div class="text-2xl font-bold text-green-600">{{ stats.correct }}</div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
        <div class="text-sm text-gray-600 font-medium">Teclas Erradas</div>
        <div class="text-2xl font-bold text-red-600">{{ stats.wrong }}</div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
        <div class="text-sm text-gray-600 font-medium">Progresso</div>
        <div class="text-2xl font-bold text-blue-600">{{ progressPercentage }}%</div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
        <div class="text-sm text-gray-600 font-medium">Tempo</div>
        <div class="text-2xl font-bold text-purple-600">{{ formattedTime }}</div>
      </div>
    </div>

    <!-- Text Challenge Display -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div class="text-lg font-medium text-gray-700 mb-4">
        <span v-if="isCompleted" class="text-green-600 font-bold">✓ Desafio Concluído!</span>
        <span v-else>Digite o texto abaixo:</span>
      </div>
      <div
        ref="textAreaRef"
        tabindex="0"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="handleClick"
        :class="[
          'relative text-2xl leading-relaxed font-mono p-4 bg-gray-50 rounded border-2 min-h-[150px] break-words overflow-wrap-anywhere whitespace-pre-wrap transition-all duration-200',
          isFocused || timerStarted
            ? 'border-gray-200 cursor-text'
            : 'border-blue-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50'
        ]"
      >
        <!-- Focus overlay message -->
        <div
          v-if="!isFocused && !timerStarted && !isCompleted"
          class="absolute inset-0 flex items-center justify-center bg-blue-50/80 backdrop-blur-sm rounded z-10 transition-opacity duration-200"
        >
          <div class="flex flex-col items-center gap-3 text-center px-6">
            <svg
              class="w-8 h-8 text-blue-500 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <div>
              <p class="text-base font-semibold text-blue-700 mb-1">Clique aqui para começar</p>
            </div>
          </div>
        </div>

        <!-- Text content -->
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
import { useSound } from '@vueuse/sound'
import Keyboard from '../Keyboard/Keyboard.vue'
import keyboardSound from '@/assets/fx/keyboard.mp3'

const props = defineProps({
  textChallenge: {
    type: String,
    required: true,
    default: ''
  }
})

// Emits
const emits = defineEmits(['completed'])

const keyboardStandard = ref('ABNT2')
const currentIndex = ref(0)
const typedChars = ref([])
const highlightedKeys = ref({})
const stats = ref({
  correct: 0,
  wrong: 0
})

// Timer state
const elapsedMilliseconds = ref(0)
const timerInterval = ref(null)
const timerStarted = ref(false)
const startTime = ref(null)

// Focus state
const isFocused = ref(false)
const textAreaRef = ref(null)

// Sound state
const soundEnabled = ref(true)

// Sound effect
const { play: playKeyboardSound } = useSound(keyboardSound, {
  volume: 0.3
})

// Toggle sound
const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value
}

// Focus handlers
const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}

const handleClick = () => {
  if (textAreaRef.value) {
    textAreaRef.value.focus()
  }
}

// Progress calculation
const progressPercentage = computed(() => {
  if (!props.textChallenge.length) return 0
  return Math.round((currentIndex.value / props.textChallenge.length) * 100)
})

// Check if challenge is completed
const isCompleted = computed(() => {
  return currentIndex.value >= props.textChallenge.length && props.textChallenge.length > 0
})

// Format time as MM:SS:MS
const formattedTime = computed(() => {
  const totalMs = elapsedMilliseconds.value
  const minutes = Math.floor(totalMs / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const milliseconds = Math.floor((totalMs % 1000) / 10) // Display centiseconds (00-99)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`
})

// Start timer
const startTimer = () => {
  if (!timerStarted.value) {
    timerStarted.value = true
    elapsedMilliseconds.value = 0
    startTime.value = Date.now()
    timerInterval.value = setInterval(() => {
      elapsedMilliseconds.value = Date.now() - startTime.value
    }, 10) // Update every 10ms for smooth display
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
      ? 'text-green-700 bg-green-200 font-semibold shadow-sm'
      : 'text-red-700 bg-red-200 font-semibold line-through shadow-sm'
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
  // Only process keys when focused or when timer has started (user already started typing)
  if (!isFocused.value && !timerStarted.value) {
    return
  }

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

  // Focus the text area if not already focused (when user starts typing)
  if (!isFocused.value && textAreaRef.value) {
    textAreaRef.value.focus()
  }

  // Start timer on first keypress
  startTimer()

  // Play keyboard sound when game is running (after validation checks)
  if (soundEnabled.value) {
    playKeyboardSound()
  }

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
    }, 200)
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
    // Emit completed event with scores and time
    emits('completed', {
      correct: stats.value.correct,
      wrong: stats.value.wrong,
      time: elapsedMilliseconds.value
    })
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
    elapsedMilliseconds.value = 0
    timerStarted.value = false
    startTime.value = null
    isFocused.value = false
    stopTimer()
  }
)

// Cleanup on unmount
onUnmounted(() => {
  stopTimer()
})
</script>
