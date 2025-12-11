import Spinner from './Spinner.vue'

export default {
  title: 'Components/Spinner',
  component: Spinner
}

const SpinnerTemplate = `
<div class="w-full flex flex-col gap-2 justify-center items-center">
  <Spinner color="blue" size="24" />
  <Spinner color="red" size="36" />
  <Spinner color="green" size="48" />
  <Spinner color="yellow" size="60" />
  <Spinner color="purple" size="72" />
  <Spinner color="orange" size="84" />
  <Spinner color="pink" size="96" />
  <Spinner color="brown" size="108" />
  <Spinner color="gray" size="120" />

</div>
`

export const Default = {
  name: 'Default',
  args: {},
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args }
    },
    template: SpinnerTemplate
  })
}
