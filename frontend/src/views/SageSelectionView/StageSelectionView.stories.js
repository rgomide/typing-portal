import { vueRouter } from 'storybook-vue3-router'
import StageSelectionView from './StageSelectionView.vue'
import { http, HttpResponse, delay } from 'msw'

export default {
  title: 'Views/StageSelectionView',
  component: StageSelectionView
}

const handlers = [
  http.get('*/api/stages', async ({ request }) => {
    const stages = [
      {
        id: 1,
        title: 'Beginner Basics',
        description:
          'Start your typing journey with simple words and sentences. Perfect for absolute beginners.',
        difficulty: 1,
        enabled: true,
        thumbUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        title: 'Common Words',
        description: 'Practice typing the most commonly used words in the English language.',
        difficulty: 2,
        enabled: true,
        thumbUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
      },
      {
        id: 3,
        title: 'Intermediate Challenge',
        description:
          'Moderate difficulty with longer texts and varied vocabulary. Build your speed and accuracy.',
        difficulty: 3,
        enabled: true,
        thumbUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
      },
      {
        id: 4,
        title: 'Advanced Typing',
        description:
          'Challenge yourself with complex texts, technical terms, and faster typing speeds.',
        difficulty: 4,
        enabled: false,
        thumbUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
      },
      {
        id: 5,
        title: 'Expert Level',
        description:
          'Extremely challenging typing exercises for advanced users. Fast speeds and complex texts required.',
        difficulty: 5,
        enabled: false,
        thumbUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
      },
      {
        id: 6,
        title: 'Speed Training',
        description:
          'Focus on increasing your words per minute with timed exercises and speed drills.',
        difficulty: 3,
        enabled: true,
        thumbUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
      }
    ]
    await delay(500)
    return HttpResponse.json(stages, { status: 200 })
  })
]

const StageSelectionViewTemplate = `
    <StageSelectionView />
`

export const Default = {
  name: 'Default',
  args: {},
  render: (args) => ({
    components: { StageSelectionView },
    setup() {
      return { args }
    },
    template: StageSelectionViewTemplate
  }),
  decorators: [vueRouter()],
  parameters: { msw: { handlers } }
}
