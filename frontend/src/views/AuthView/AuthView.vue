<template>
  <div class="flex justify-center items-center h-full">
    <AuthForm @login="onLogin" :is-loading="isLoading" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import AuthForm from '@/components/AuthForm/AuthForm.vue'

// init
const router = useRouter()

// refs
const isLoading = ref(false)

// actions
const onLogin = (userName, password) => {
  console.log(userName, password)
  router.push('/stage-selection')
}
</script>
