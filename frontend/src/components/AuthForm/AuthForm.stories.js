import AuthForm from '@/components/AuthForm/AuthForm.vue'

export default {
  title: 'Components/AuthForm',
  component: AuthForm
}

const onLogin = (userName, password) => {
  console.log(userName, password)
}

const AuthFormTemplate = `
    <AuthForm @login="args.onLogin" />
`

export const Default = {
  name: 'Default component',
  args: {
    onLogin: onLogin
  },
  render: (args) => ({
    components: { AuthForm },
    setup() {
      return { args }
    },
    template: AuthFormTemplate
  })
}
