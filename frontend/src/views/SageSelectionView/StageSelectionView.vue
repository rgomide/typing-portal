<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Selecione o estágio</h1>

    <div class="flex flex-row flex-wrap gap-6 justify-center items-center max-w-7xl mx-auto">
      <StageCard
        v-if="!isLoading"
        v-for="stage in stages"
        :key="stage.id"
        :id="stage.id"
        :title="stage.title"
        :description="stage.description"
        :difficulty="stage.difficulty"
        :enabled="stage.enabled"
        :thumb-url="stage.thumbUrl"
        @click="handleStageClick(stage.id)"
      />
      <div v-else class="flex justify-center items-center">
        <Spinner color="gray" size="60" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StageCard from '@/components/StageCard/StageCard.vue'
import Spinner from '@/components/Spinner/Spinner.vue'
import { useBackend } from '@/composables/useBackend'

// emits
const emits = defineEmits(['error'])
// init
const router = useRouter()
const { getStages, isLoading, data, error } = useBackend()
// refs
const stages = ref([])

// actions
const handleStageClick = (stageId) => {
  console.log('Stage clicked:', stageId)
  router.push(`/typing-game/${stageId}`)
}

// lifecycle
onMounted(async () => {
  const response = await getStages()

  if (response.requestSuccessful) {
    stages.value = response.data
  } else {
    emits('error', response.error)
  }
})
</script>
