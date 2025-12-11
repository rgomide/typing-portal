import TypingGameView from './TypingGameView.vue'

export default {
  title: 'Views/TypingGameView',
  component: TypingGameView
}

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
  })
}
