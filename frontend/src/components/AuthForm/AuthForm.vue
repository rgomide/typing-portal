<template>
  <form
    v-focustrap
    class="flex flex-col gap-6 w-[500px] bg-white border border-gray-200 rounded-lg p-8 shadow-lg"
  >
    <div class="text-center mb-2">
      <h2 class="text-2xl font-bold text-gray-800 mb-1">Bem-vindo</h2>
      <p class="text-sm text-gray-500">Entre com suas credenciais</p>
    </div>

    <div class="flex flex-col gap-2">
      <label for="user-name" class="text-sm font-semibold text-gray-700">Usuário</label>
      <input
        ref="userNameInput"
        id="user-name"
        name="user-name"
        type="text"
        v-model="userName"
        placeholder="Digite seu usuário"
        @keyup.enter="onLogin"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 hover:border-gray-400"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="password" class="text-sm font-semibold text-gray-700">Senha</label>
      <input
        id="password"
        name="password"
        type="password"
        v-model="password"
        placeholder="Digite sua senha"
        @keyup.enter="onLogin"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 hover:border-gray-400"
      />
    </div>

    <div class="pt-2 w-full">
      <LoadingButton label="Entrar" @click="onLogin" :is-loading="props.isLoading" />
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFocus } from '@vueuse/core'
import LoadingButton from '@/components/LoadingButton/LoadingButton.vue'

// props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  }
})

// refs
const userName = ref('')
const password = ref('')
const userNameInput = ref(null)

// focus management
useFocus(userNameInput, { initialValue: true })

// emits
const emits = defineEmits(['login'])

// actions
const onLogin = () => {
  emits('login', userName.value, password.value)
}
</script>
