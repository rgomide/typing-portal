<template>
  <TypingGame :text-challenge="textChallenge" @completed="onCompleted" />
</template>

<script setup>
import TypingGame from '@/components/TypingGame/TypingGame.vue'
import { ref } from 'vue'

// refs
const textChallenge = ref('The quick brown fox jumps over the lazy dog.')

// actions
const onCompleted = (status) => {
  console.log(status)
}
</script>
