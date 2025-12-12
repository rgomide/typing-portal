import AuthView from '@/views/AuthView/AuthView.vue'
import StageSelectionView from '@/views/SageSelectionView/StageSelectionView.vue'
import TypingGameView from '@/views/TypingGameView/TypingGameView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/stage-selection',
      name: 'stage-selection',
      component: StageSelectionView
    },
    {
      path: '/typing-game/:id',
      name: 'typing-game',
      component: TypingGameView
    }
  ]
})

export default router
