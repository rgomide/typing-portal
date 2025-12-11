import ModalDialog from './ModalDialog.vue'
import { ref } from 'vue'

export default {
  title: 'Components/ModalDialog',
  component: ModalDialog
}

const ModalDialogTemplate = `
  <div>
    <button 
      @click="isOpen = true"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Open Modal
    </button>
    
    <ModalDialog 
      v-model="isOpen" 
      :position="position"
      :close-on-backdrop-click="closeOnBackdropClick"
      :overlay="overlay"
    >
      <template #header>
        <h2 class="text-2xl font-bold text-gray-800">Modal Header</h2>
      </template>
      
      <template #content>
        <p class="text-gray-600 mb-4">
          This is the modal content area. You can put any content here.
        </p>
        <p class="text-gray-600">
          Position: <strong>{{ position }}</strong>
        </p>
      </template>
      
      <template #button-bar>
        <div class="flex justify-end gap-3">
          <button 
            @click="isOpen = false"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            @click="isOpen = false"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </template>
    </ModalDialog>
  </div>
`

export const Center = {
  name: 'Center Position',
  args: {
    position: 'center',
    closeOnBackdropClick: true,
    overlay: true
  },
  render: (args) => ({
    components: { ModalDialog },
    setup() {
      const isOpen = ref(false)
      return {
        args,
        isOpen,
        position: args.position,
        closeOnBackdropClick: args.closeOnBackdropClick,
        overlay: args.overlay !== undefined ? args.overlay : true
      }
    },
    template: ModalDialogTemplate
  })
}

export const Top = {
  name: 'Top Position',
  args: {
    position: 'top',
    closeOnBackdropClick: true
  },
  render: (args) => ({
    components: { ModalDialog },
    setup() {
      const isOpen = ref(false)
      return {
        args,
        isOpen,
        position: args.position,
        closeOnBackdropClick: args.closeOnBackdropClick,
        overlay: args.overlay !== undefined ? args.overlay : true
      }
    },
    template: ModalDialogTemplate
  })
}

export const Bottom = {
  name: 'Bottom Position',
  args: {
    position: 'bottom',
    closeOnBackdropClick: true
  },
  render: (args) => ({
    components: { ModalDialog },
    setup() {
      const isOpen = ref(false)
      return {
        args,
        isOpen,
        position: args.position,
        closeOnBackdropClick: args.closeOnBackdropClick,
        overlay: args.overlay !== undefined ? args.overlay : true
      }
    },
    template: ModalDialogTemplate
  })
}

export const WithoutButtonBar = {
  name: 'Without Button Bar',
  args: {
    position: 'center',
    closeOnBackdropClick: true
  },
  render: (args) => ({
    components: { ModalDialog },
    setup() {
      const isOpen = ref(false)
      return {
        args,
        isOpen,
        position: args.position,
        closeOnBackdropClick: args.closeOnBackdropClick,
        overlay: args.overlay !== undefined ? args.overlay : true
      }
    },
    template: `
      <div>
        <button 
          @click="isOpen = true"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Modal
        </button>
        
        <ModalDialog 
          v-model="isOpen" 
          :position="position"
          :close-on-backdrop-click="closeOnBackdropClick"
          :overlay="overlay"
        >
          <template #header>
            <h2 class="text-2xl font-bold text-gray-800">Simple Modal</h2>
          </template>
          
          <template #content>
            <p class="text-gray-600 mb-4">
              This modal doesn't have a button bar. You can close it by clicking the backdrop or pressing ESC.
            </p>
          </template>
        </ModalDialog>
      </div>
    `
  })
}

export const WithoutOverlay = {
  name: 'Without Overlay',
  args: {
    position: 'center',
    closeOnBackdropClick: true,
    overlay: false
  },
  render: (args) => ({
    components: { ModalDialog },
    setup() {
      const isOpen = ref(false)
      return {
        args,
        isOpen,
        position: args.position,
        closeOnBackdropClick: args.closeOnBackdropClick,
        overlay: args.overlay !== undefined ? args.overlay : false
      }
    },
    template: `
      <div>
        <button 
          @click="isOpen = true"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Modal (No Overlay)
        </button>
        
        <ModalDialog 
          v-model="isOpen" 
          :position="position"
          :close-on-backdrop-click="closeOnBackdropClick"
          :overlay="overlay"
        >
          <template #header>
            <h2 class="text-2xl font-bold text-gray-800">Modal Without Overlay</h2>
          </template>
          
          <template #content>
            <p class="text-gray-600 mb-4">
              This modal doesn't have a gray overlay backdrop.
            </p>
          </template>
          
          <template #button-bar>
            <div class="flex justify-end gap-3">
              <button 
                @click="isOpen = false"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </template>
        </ModalDialog>
      </div>
    `
  })
}

export const WithoutHeader = {
  name: 'Without Header',
  args: {
    position: 'center',
    closeOnBackdropClick: true
  },
  render: (args) => ({
    components: { ModalDialog },
    setup() {
      const isOpen = ref(false)
      return {
        args,
        isOpen,
        position: args.position,
        closeOnBackdropClick: args.closeOnBackdropClick,
        overlay: args.overlay !== undefined ? args.overlay : true
      }
    },
    template: `
      <div>
        <button 
          @click="isOpen = true"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Modal
        </button>
        
        <ModalDialog 
          v-model="isOpen" 
          :position="position"
          :close-on-backdrop-click="closeOnBackdropClick"
          :overlay="overlay"
        >
          <template #content>
            <p class="text-gray-600 mb-4">
              This modal doesn't have a header section.
            </p>
          </template>
          
          <template #button-bar>
            <div class="flex justify-end gap-3">
              <button 
                @click="isOpen = false"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </template>
        </ModalDialog>
      </div>
    `
  })
}
