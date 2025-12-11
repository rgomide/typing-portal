import Keyboard from './Keyboard.vue'
import { ref } from 'vue'

export default {
  title: 'Components/Keyboard',
  component: Keyboard,
  argTypes: {
    modelValue: {
      control: 'select',
      options: ['ABNT2', 'QWERTY-US', 'QWERTY-UK', 'AZERTY-FR', 'QWERTZ-DE']
    }
  }
}

const KeyboardTemplate = `
  <Keyboard v-model="keyboardStandard" />
`

export const Default = {
  name: 'Keyboard',
  args: {
    modelValue: 'ABNT2'
  },
  render: (args) => ({
    components: { Keyboard },
    setup() {
      const keyboardStandard = ref(args.modelValue)
      return { keyboardStandard }
    },
    template: KeyboardTemplate
  }),
  parameters: {}
}

export const QWERTYUS = {
  name: 'QWERTY US Keyboard',
  args: {
    modelValue: 'QWERTY-US'
  },
  render: (args) => ({
    components: { Keyboard },
    setup() {
      const keyboardStandard = ref(args.modelValue)
      return { keyboardStandard }
    },
    template: KeyboardTemplate
  }),
  parameters: {}
}

export const QWERTYUK = {
  name: 'QWERTY UK Keyboard',
  args: {
    modelValue: 'QWERTY-UK'
  },
  render: (args) => ({
    components: { Keyboard },
    setup() {
      const keyboardStandard = ref(args.modelValue)
      return { keyboardStandard }
    },
    template: KeyboardTemplate
  }),
  parameters: {}
}

export const AZERTYFR = {
  name: 'AZERTY French Keyboard',
  args: {
    modelValue: 'AZERTY-FR'
  },
  render: (args) => ({
    components: { Keyboard },
    setup() {
      const keyboardStandard = ref(args.modelValue)
      return { keyboardStandard }
    },
    template: KeyboardTemplate
  }),
  parameters: {}
}

export const QWERTZDE = {
  name: 'QWERTZ German Keyboard',
  args: {
    modelValue: 'QWERTZ-DE'
  },
  render: (args) => ({
    components: { Keyboard },
    setup() {
      const keyboardStandard = ref(args.modelValue)
      return { keyboardStandard }
    },
    template: KeyboardTemplate
  }),
  parameters: {}
}
