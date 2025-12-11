<template>
  <TypingGame :text-challenge="textChallenge" @completed="onCompleted" />
</template>

<script setup>
import TypingGame from '@/components/TypingGame/TypingGame.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// route
const route = useRoute()

// refs
const textChallenge = ref('The quick brown fox jumps over the lazy dog.')
const selectedStageId = ref(null)

// Watch route params to see when they become available
watch(
  () => route.params.stageId,
  (stageId) => {
    selectedStageId.value = stageId
    console.log('Selected Stage ID:', selectedStageId.value)
  }
)

// actions
const onCompleted = (status) => {
  console.log(status)
}
</script>
