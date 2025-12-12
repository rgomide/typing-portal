<template>
  <div class="w-full h-screen flex flex-col">
    <TopBar />
    <main class="flex-1 max-w-[1800px] w-full mx-auto px-8">
      <RouterView @showMessage="onShowMessage" />
    </main>
    <Toast
      v-model="showMessage"
      :color="toastConfig.color"
      :position="toastConfig.position"
      :duration="toastConfig.duration"
    >
      <span>{{ toastConfig.message }}</span>
    </Toast>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TopBar from '@/components/TopBar/TopBar.vue'
import Toast from '@/components/Toast/Toast.vue'
import { ref } from 'vue'

// refs
const showMessage = ref(false)
const toastConfig = ref({
  color: 'red',
  position: 'top',
  duration: 2000,
  message: ''
})

// actions
const onShowMessage = (message) => {
  const config = {
    color: 'red',
    position: 'top',
    duration: 2000,
    message: '',
    ...message
  }

  toastConfig.value = config

  showMessage.value = true
}
</script>
