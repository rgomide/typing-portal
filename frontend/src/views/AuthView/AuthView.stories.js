import AuthView from './AuthView.vue'
import { vueRouter } from 'storybook-vue3-router'
import { http, HttpResponse, delay } from 'msw'

export default {
  title: 'Views/AuthView',
  component: AuthView
}

const onShowMessage = (message) => {
  console.log(message)
}

const handlers = [
  http.post('*/api/auth/login', async ({ request }) => {
    return HttpResponse.json({ token: '1234567890' }, { status: 200 })
  })
]

const handlersError = [
  http.post('*/api/auth/login', async ({ request }) => {
    const body = await request.json()
    await delay(500)
    return HttpResponse.json(
      {
        message: 'Forbidden'
      },
      { status: 403 }
    )
  })
]

const AuthViewTemplate = `
    <AuthView @showMessage="args.showMessage" />
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
  parameters: { msw: { handlers } }
}


export const Error = {
  name: 'Auth error',
  args: {
    showMessage: onShowMessage
  },
  render: (args) => ({
    components: { AuthView },
    setup() {
      return { args }
    },
    template: AuthViewTemplate
  }),
  decorators: [vueRouter()],
  parameters: {
    msw: {
      handlers: handlersError
    }
  }
}
