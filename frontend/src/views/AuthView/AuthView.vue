<template>
  <div class="flex justify-center items-center h-full">
    <AuthForm @login="onLogin" :is-loading="isLoading" />
  </div>
</template>
<script setup>
import AuthForm from '@/components/AuthForm/AuthForm.vue'
import { useRouter } from 'vue-router'
import { useBackend } from '@/composables/useBackend'
import { useCrypto } from '@/composables/useCrypto'
import { useAuth } from '@/composables/useAuth'

const { sha256 } = useCrypto()
const { login } = useAuth()
const router = useRouter()
const { login: loginBackend, isLoading } = useBackend()

// emits
const emit = defineEmits(['showMessage'])

// actions
const onLogin = async (userName, password) => {
  const hashedPassword = await sha256(password)
  const response = await loginBackend(userName, hashedPassword)

  if (response.requestSuccessful) {
    const { user, token } = response.data

    login(user, token)

    router.push('/stage-selection')
  } else {
    const message = response.data.message || response.data
    emit('showMessage', { message, duration: 1000 })
  }
}
</script>
