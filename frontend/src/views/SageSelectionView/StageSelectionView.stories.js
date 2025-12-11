import StageSelectionView from './StageSelectionView.vue'

export default {
  title: 'Views/StageSelectionView',
  component: StageSelectionView
}

const StageSelectionViewTemplate = `
    <StageSelectionView />
`

export const Default = {
  name: 'Default',
  args: {},
  render: (args) => ({
    components: { StageSelectionView },
    setup() {
      return { args }
    },
    template: StageSelectionViewTemplate
  })
}
