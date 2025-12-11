import AuthView from './AuthView.vue'
import { vueRouter } from 'storybook-vue3-router'

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
      return { args }
    },
    template: AuthViewTemplate
  }),
  decorators: [vueRouter()],
  parameters: {}
}
