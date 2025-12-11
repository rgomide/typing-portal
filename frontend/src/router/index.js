import AuthView from '@/views/AuthView/AuthView.vue'
import StageSelectionView from '@/views/StageSelectionView/StageSelectionView.vue'
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
    }
  ]
})

export default router
