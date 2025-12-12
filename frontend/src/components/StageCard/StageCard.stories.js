import StageCard from '@/components/StageCard/StageCard.vue'

export default {
  title: 'Components/StageCard',
  component: StageCard
}

const StageCardTemplate = `
    <StageCard 
      :id="args.id"
      :title="args.title"
      :description="args.description"
      :difficulty="args.difficulty"
      :enabled="args.enabled"
      :thumb-url="args.thumbUrl"
    />
`

export const Default = {
  name: 'Default Enabled Card',
  args: {
    id: 1,
    title: 'Beginner Typing',
    description:
      'Start your typing journey with simple words and sentences. Perfect for beginners.',
    difficulty: 2,
    enabled: true,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  render: (args) => ({
    components: { StageCard },
    setup() {
      return { args }
    },
    template: StageCardTemplate
  })
}

export const MissingImage = {
  name: 'Missing Image',
  args: {
    id: 1,
    title: 'Beginner Typing',
    description:
      'Start your typing journey with simple words and sentences. Perfect for beginners.',
    difficulty: 2,
    enabled: true,
    thumbUrl: null
  },
  render: (args) => ({
    components: { StageCard },
    setup() {
      return { args }
    },
    template: StageCardTemplate
  })
}

export const Disabled = {
  name: 'Disabled Card',
  args: {
    id: 2,
    title: 'Advanced Typing',
    description: 'Challenge yourself with complex texts and faster typing speeds.',
    difficulty: 5,
    enabled: false,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  render: (args) => ({
    components: { StageCard },
    setup() {
      return { args }
    },
    template: StageCardTemplate
  })
}

export const Difficulty1 = {
  name: 'Difficulty Level 1',
  args: {
    id: 3,
    title: 'Easy Start',
    description: 'Very simple typing exercises for absolute beginners.',
    difficulty: 1,
    enabled: true,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  render: (args) => ({
    components: { StageCard },
    setup() {
      return { args }
    },
    template: StageCardTemplate
  })
}

export const Difficulty3 = {
  name: 'Difficulty Level 3',
  args: {
    id: 4,
    title: 'Intermediate Challenge',
    description: 'Moderate difficulty with longer texts and varied vocabulary.',
    difficulty: 3,
    enabled: true,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  render: (args) => ({
    components: { StageCard },
    setup() {
      return { args }
    },
    template: StageCardTemplate
  })
}

export const Difficulty5 = {
  name: 'Difficulty Level 5',
  args: {
    id: 5,
    title: 'Expert Level',
    description:
      'Extremely challenging typing exercises for advanced users. Fast speeds and complex texts required.',
    difficulty: 5,
    enabled: true,
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  render: (args) => ({
    components: { StageCard },
    setup() {
      return { args }
    },
    template: StageCardTemplate
  })
}
