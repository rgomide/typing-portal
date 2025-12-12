<template>
  <div class="flex flex-col py-10">
    <button
      type="button"
      @click="goBack"
      class="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Voltar</span>
    </button>

    <div v-if="!isLoading">
      <TypingGame :text-challenge="textChallenge" @completed="onCompleted" />
    </div>
    <div v-else class="flex justify-center items-center">
      <Spinner color="gray" size="60" />
    </div>

    <ModalDialog
      v-model="showResultModal"
      position="center"
      overlay
      :close-on-backdrop-click="false"
    >
      <template #header>
        <h2 class="text-2xl font-bold text-gray-800">Resultados</h2>
      </template>
      <template #content>
        <div class="space-y-6">
          <!-- Stats Grid -->
          <div class="grid grid-cols-3 gap-4">
            <!-- Correct Characters -->
            <div class="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
              <div class="flex justify-center mb-2">
                <svg
                  class="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="text-3xl font-bold text-green-700 mb-1">{{ results.correct || 0 }}</div>
              <div class="text-sm text-green-600 font-medium">Corretos</div>
            </div>

            <!-- Wrong Characters -->
            <div class="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
              <div class="flex justify-center mb-2">
                <svg
                  class="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="text-3xl font-bold text-red-700 mb-1">{{ results.wrong || 0 }}</div>
              <div class="text-sm text-red-600 font-medium">Errados</div>
            </div>

            <!-- Time -->
            <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
              <div class="flex justify-center mb-2">
                <svg
                  class="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="text-2xl font-bold text-blue-700 mb-1">
                {{ formatTime(results.time) }}
              </div>
              <div class="text-sm text-blue-600 font-medium">Tempo</div>
            </div>
          </div>

          <!-- Accuracy Bar -->
          <div
            v-if="results.correct !== undefined && results.wrong !== undefined"
            class="space-y-2"
          >
            <div class="flex justify-between items-center">
              <span class="text-sm font-semibold text-gray-700">Precisão</span>
              <span class="text-lg font-bold" :class="accuracyColor">{{ accuracy }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                class="h-full transition-all duration-500 rounded-full"
                :class="accuracyBarColor"
                :style="{ width: accuracy + '%' }"
              ></div>
            </div>
          </div>

          <!-- Summary Message -->
          <div class="text-center pt-2">
            <p class="text-gray-600">
              <span class="font-semibold">{{ totalCharacters }}</span> caracteres digitados em
              <span class="font-semibold">{{ formatTime(results.time) }}</span>
            </p>
          </div>
        </div>
      </template>
      <template #button-bar>
        <div class="w-full flex justify-end">
          <button
            type="button"
            @click="closeResultModal"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </template>
    </ModalDialog>
  </div>
</template>

<script setup>
import TypingGame from '@/components/TypingGame/TypingGame.vue'
import Spinner from '@/components/Spinner/Spinner.vue'
import ModalDialog from '@/components/ModalDialog/ModalDialog.vue'
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBackend } from '@/composables/useBackend'

// init
const route = useRoute()
const router = useRouter()
const { getStage, isLoading } = useBackend()

// emits
const emits = defineEmits(['showMessage'])

// refs
const textChallenge = ref('')
const selectedStageId = ref(null)
const showResultModal = ref(false)
const results = ref({})

// Watch route params to see when they become available
watch(
  () => route.params.stageId,
  (stageId) => {
    selectedStageId.value = stageId
    loadStage(stageId)
  }
)

// actions
const goBack = () => {
  router.back()
}

const closeResultModal = () => {
  showResultModal.value = false
  router.back()
}

const onCompleted = (status) => {
  results.value = status
  showResultModal.value = true
}

const loadStage = async (stageId) => {
  const response = await getStage(stageId)
  console.log(response.data)
  if (response.requestSuccessful) {
    textChallenge.value = response.data.textChallenge
  } else {
    emits('showMessage', { message: response.error, color: 'red' })
  }
}

// Computed properties for results display
const totalCharacters = computed(() => {
  return (results.value.correct || 0) + (results.value.wrong || 0)
})

const accuracy = computed(() => {
  const total = totalCharacters.value
  if (total === 0) return 0
  return Math.round(((results.value.correct || 0) / total) * 100)
})

const accuracyColor = computed(() => {
  if (accuracy.value >= 90) return 'text-green-600'
  if (accuracy.value >= 70) return 'text-yellow-600'
  return 'text-red-600'
})

const accuracyBarColor = computed(() => {
  if (accuracy.value >= 90) return 'bg-gradient-to-r from-green-400 to-green-600'
  if (accuracy.value >= 70) return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
  return 'bg-gradient-to-r from-red-400 to-red-600'
})

const formatTime = (milliseconds) => {
  if (!milliseconds) return '0s'
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }
  return `${remainingSeconds}s`
}

// lifecycle
onMounted(async () => {
  if (route.params?.stageId) {
    await loadStage(route.params.stageId)
  }
})
</script>
