import LoadingButton from '@/components/LoadingButton/LoadingButton.vue'

export default {
  title: 'Components/LoadingButton',
  component: LoadingButton
}

const onClick = () => {
  console.log('clicked')
}

const LoadingButtonTemplate = `
<div class="w-full flex flex-col gap-2">
    <LoadingButton :label="'Click me'" @click="args.onClick" />
    <LoadingButton :label="'Click me'" :color="args.color" @click="args.onClick" />
    <LoadingButton :is-loading="true" @click="args.onClick" />
</div>
`

export const Default = {
  name: 'Default component',
  args: {
    color: 'red',
    onClick: onClick
  },
  render: (args) => ({
    components: { LoadingButton },
    setup() {
      return { args }
    },
    template: LoadingButtonTemplate
  })
}
