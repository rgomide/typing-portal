import AuthView from '@/views/AuthView/AuthView.vue'
import StageSelectionView from '@/views/SageSelectionView/StageSelectionView.vue'
import TypingGameView from '@/views/TypingGameView/TypingGameView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView,
      beforeEnter: () => redirectToSelectStage()
    },
    {
      path: '/stage-selection',
      name: 'stage-selection',
      component: StageSelectionView,
      beforeEnter: () => canAccessAuthenticatedRoutes()
    },
    {
      path: '/typing-game/:stageId',
      name: 'typing-game',
      component: TypingGameView,
      beforeEnter: () => canAccessAuthenticatedRoutes()
    }
  ]
})

const canAccessAuthenticatedRoutes = () => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated()) {
    router.push('/')
  }
}

const redirectToSelectStage = () => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated()) {
    router.push('/stage-selection')
  }
}

export default router
