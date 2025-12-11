import TypingGameView from './TypingGameView.vue'
import { vueRouter } from 'storybook-vue3-router'
import { RouterView, useRouter } from 'vue-router'
import { Suspense, onMounted } from 'vue'
import AuthView from '@/views/AuthView/AuthView.vue'
import StageSelectionView from '@/views/SageSelectionView/StageSelectionView.vue'

export default {
  title: 'Views/TypingGameView',
  component: TypingGameView
}

// Define routes for Storybook
const routes = [
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

const TypingGameViewTemplate = `
    <TypingGameView />
`

export const Default = {
  name: 'Default',
  args: {},
  render: (args) => ({
    components: { TypingGameView },
    setup() {
      return { args }
    },
    template: TypingGameViewTemplate
  }),
  decorators: [
    vueRouter([{ path: '/typing-game/:stageId', name: 'typing-game' }], {
      initialRoute: '/typing-game/1'
    })
  ]
}
