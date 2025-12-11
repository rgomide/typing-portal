import TypingGameView from './TypingGameView.vue'
import { vueRouter } from 'storybook-vue3-router'
import { http, HttpResponse, delay } from 'msw'

export default {
  title: 'Views/TypingGameView',
  component: TypingGameView
}

const handlers = [
  http.get('*/api/stages/:stageId', async ({ request }) => {
    const stage = {
      id: 1,
      title: 'Beginner Basics',
      description:
        'Start your typing journey with simple words and sentences. Perfect for absolute beginners.',
      textChallenge: 'The quick brown fox jumps over the lazy dog.',
      difficulty: 1,
      enabled: true,
      thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
    }

    await delay(1000)

    return HttpResponse.json(stage, { status: 200 })
  })
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
  parameters: { msw: { handlers } },
  decorators: [
    vueRouter([{ path: '/typing-game/:stageId', name: 'typing-game' }], {
      initialRoute: '/typing-game/1'
    })
  ]
}
