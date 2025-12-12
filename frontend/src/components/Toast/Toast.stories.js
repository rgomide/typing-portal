import Toast from '@/components/Toast/Toast.vue'
import { ref } from 'vue'

export default {
  title: 'Components/Toast',
  component: Toast
}

const ToastTemplate = `
<div class="p-8">
  <div class="flex flex-col gap-4">
    <button 
      @click="showToast = !showToast"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Toggle Toast
    </button>
    <Toast 
      v-model="showToast" 
      :color="args.color" 
      :position="args.position"
      :duration="args.duration"
    >
      <span>{{ args.message }}</span>
    </Toast>
  </div>
</div>
`

export const Default = {
  name: 'Default Toast',
  args: {
    color: 'blue',
    position: 'top',
    duration: 1000,
    message: 'This is a default toast message'
  },
  render: (args) => ({
    components: { Toast },
    setup() {
      const showToast = ref(false)
      return { args, showToast }
    },
    template: ToastTemplate
  })
}

export const TopPosition = {
  name: 'Top Position',
  args: {
    color: 'green',
    position: 'top',
    duration: 2000,
    message: 'Toast at the top'
  },
  render: (args) => ({
    components: { Toast },
    setup() {
      const showToast = ref(true)
      return { args, showToast }
    },
    template: ToastTemplate
  })
}

export const BottomPosition = {
  name: 'Bottom Position',
  args: {
    color: 'red',
    position: 'bottom',
    duration: 2000,
    message: 'Toast at the bottom'
  },
  render: (args) => ({
    components: { Toast },
    setup() {
      const showToast = ref(true)
      return { args, showToast }
    },
    template: ToastTemplate
  })
}

export const Colors = {
  name: 'Different Colors',
  args: {
    color: 'blue',
    position: 'top',
    duration: 3000,
    message: 'Toast with different colors'
  },
  render: (args) => ({
    components: { Toast },
    setup() {
      const showToast = ref(true)
      const colors = ['blue', 'green', 'red', 'yellow', 'gray']
      const currentColor = ref('blue')

      const cycleColor = () => {
        const currentIndex = colors.indexOf(currentColor.value)
        const nextIndex = (currentIndex + 1) % colors.length
        currentColor.value = colors[nextIndex]
        showToast.value = false
        setTimeout(() => {
          showToast.value = true
        }, 100)
      }

      return { args, showToast, cycleColor, currentColor }
    },
    template: `
      <div class="p-8">
        <div class="flex flex-col gap-4">
          <button 
            @click="cycleColor"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Change Color (Current: {{ currentColor }})
          </button>
          <Toast 
            v-model="showToast" 
            :color="currentColor" 
            :position="args.position"
            :duration="args.duration"
          >
            <span>{{ args.message }} - Color: {{ currentColor }}</span>
          </Toast>
        </div>
      </div>
    `
  })
}

export const LongDuration = {
  name: 'Long Duration',
  args: {
    color: 'yellow',
    position: 'top',
    duration: 5000,
    message: 'This toast will stay for 5 seconds'
  },
  render: (args) => ({
    components: { Toast },
    setup() {
      const showToast = ref(true)
      return { args, showToast }
    },
    template: ToastTemplate
  })
}

export const ShortDuration = {
  name: 'Short Duration',
  args: {
    color: 'gray',
    position: 'top',
    duration: 500,
    message: 'This toast disappears quickly (500ms)'
  },
  render: (args) => ({
    components: { Toast },
    setup() {
      const showToast = ref(true)
      return { args, showToast }
    },
    template: ToastTemplate
  })
}
