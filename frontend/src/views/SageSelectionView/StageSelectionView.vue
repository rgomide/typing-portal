<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Selecione o estágio</h1>

    <div class="flex flex-row flex-wrap gap-6 justify-center">
      <StageCard
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import StageCard from '@/components/StageCard/StageCard.vue'

// router
const router = useRouter()

// refs
const stages = ref([
  {
    id: 1,
    title: 'Beginner Basics',
    description:
      'Start your typing journey with simple words and sentences. Perfect for absolute beginners.',
    difficulty: 1,
    enabled: true,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Common Words',
    description: 'Practice typing the most commonly used words in the English language.',
    difficulty: 2,
    enabled: true,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Intermediate Challenge',
    description:
      'Moderate difficulty with longer texts and varied vocabulary. Build your speed and accuracy.',
    difficulty: 3,
    enabled: true,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Advanced Typing',
    description:
      'Challenge yourself with complex texts, technical terms, and faster typing speeds.',
    difficulty: 4,
    enabled: false,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    title: 'Expert Level',
    description:
      'Extremely challenging typing exercises for advanced users. Fast speeds and complex texts required.',
    difficulty: 5,
    enabled: false,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    title: 'Speed Training',
    description: 'Focus on increasing your words per minute with timed exercises and speed drills.',
    difficulty: 3,
    enabled: true,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  }
])

// actions
const handleStageClick = (stageId) => {
  console.log('Stage clicked:', stageId)
  router.push(`/typing-game/${stageId}`)
}
</script>
