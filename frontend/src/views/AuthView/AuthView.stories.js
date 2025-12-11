import AuthView from './AuthView.vue'
import { useRouter } from 'vue-router'

export default {
  title: 'Views/AuthView',
  component: AuthView
}

const AuthViewTemplate = `
    <AuthView @showAlert="args.showAlert" />
`

export const Default = {
  name: 'Auth successfully',
  args: {},
  render: (args) => ({
    components: { AuthView },
    setup() {
      // Router is already set up globally in preview.js
      return { args }
    },
    template: AuthViewTemplate
  }),
  parameters: {}
}
