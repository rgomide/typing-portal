import { vueRouter } from 'storybook-vue3-router'
import TopBar from './TopBar.vue'
import { useAuthStore } from '@/stores/storeAuth'

export default {
  title: 'Components/TopBar',
  component: TopBar
}

const TopBarTemplate = `
    <TopBar />
`

export const Default = {
  name: 'User is logged in',
  args: {},
  render: (args) => ({
    components: { TopBar },
    setup() {
      const authStore = useAuthStore()
      authStore.setAuthenticatedUser({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        roles: ['admin']
      })
      authStore.setAuthenticatedToken('1234567890')
      return { args }
    },
    template: TopBarTemplate
  }),
  decorators: [vueRouter()]
}

export const UserIsNotLoggedIn = {
  name: 'User is not logged in',
  args: {},
  render: (args) => ({
    components: { TopBar },
    setup() {
      const authStore = useAuthStore()
      authStore.setAuthenticatedUser(null)
      authStore.setAuthenticatedToken(null)
      return { args }
    },
    template: TopBarTemplate
  }),
  decorators: [vueRouter()]
}
