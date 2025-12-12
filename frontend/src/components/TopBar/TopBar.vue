<template>
  <div class="w-full bg-gray-50 border-b border-gray-200">
    <div class="flex flex-row max-w-[1800px] mx-auto py-3 px-8">
      <div class="flex flex-row gap-4 w-[800px] items-center">
        <h1 class="flex items-center gap-2 text-2xl cursor-pointer group" @click="onHomeClick">
          <span class="font-extrabold text-gray-700">Typing Game</span>
          <span class="text-gray-500 font-medium text-lg border-l border-gray-300 pl-2"
            >Typing Game</span
          >
        </h1>
      </div>
      <div class="flex flex-row w-full justify-end gap-2 items-center">
        <button
          v-if="showLogoutButton"
          class="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
          title="Logout"
          @click="onLogoutClick"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4"
          >
            <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
            <path d="M10 12l4-4-4-4" />
            <path d="M14 8H6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/storeAuth'

// init
const router = useRouter()
const authStore = useAuthStore()
const { logout } = useAuth()

// refs
const { token } = storeToRefs(authStore)
const showLogoutButton = ref(false)

// watchers
watch(token, (newValue) => {
  showLogoutButton.value = newValue !== null
})

// actions
const onHomeClick = () => {
  router.push('/')
}

const onLogoutClick = () => {
  logout()
  router.push('/')
}

// lifecycle
onMounted(() => {
  showLogoutButton.value = token.value !== null
})
</script>
