import TypingGame from './TypingGame.vue'
import { ref } from 'vue'

export default {
  title: 'Components/TypingGame',
  component: TypingGame,
  argTypes: {
    textChallenge: {
      control: 'text',
      description: 'The text that users need to type'
    }
  }
}

const TypingGameTemplate = (args) => ({
  components: { TypingGame },
  setup() {
    return { args }
  },
  template: '<TypingGame :text-challenge="args.textChallenge" />'
})

export const Default = {
  name: 'Default',
  args: {
    textChallenge: 'The quick brown fox jumps over the lazy dog.'
  },
  render: TypingGameTemplate,
  parameters: {}
}

export const LongText = {
  name: 'Long Text Challenge',
  args: {
    textChallenge:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  render: TypingGameTemplate,
  parameters: {}
}

export const PortugueseText = {
  name: 'Portuguese Text (ABNT2)',
  args: {
    textChallenge:
      'O rato roeu a roupa do rei de Roma. Açúcar e café são importantes para o Brasil.'
  },
  render: TypingGameTemplate,
  parameters: {}
}

export const SpecialCharacters = {
  name: 'Special Characters',
  args: {
    textChallenge: 'Hello! How are you? @#$%^&*()[]{}|\\:;"\'<>,.?/~`'
  },
  render: TypingGameTemplate,
  parameters: {}
}
