<template>
  <div
    class="w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200/60 backdrop-blur-sm shadow-sm"
  >
    <div class="flex flex-row max-w-[1800px] mx-auto py-4 px-8">
      <div class="flex flex-row gap-4 items-center flex-1">
        <h1
          class="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
          @click="onHomeClick"
        >
          <!-- Logo Icon -->
          <div class="relative">
            <div
              class="absolute inset-0 bg-ifgoiano-primary-500 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"
            ></div>
            <div
              class="relative bg-ifgoiano-primary-500 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-6 h-6"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <!-- Title -->
          <div class="flex flex-col">
            <span
              class="font-bold text-2xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-ifgoiano-primary-500 group-hover:to-ifgoiano-primary-400 transition-all duration-300"
            >
              Typing Portal
            </span>
            <span
              class="text-xs font-medium text-slate-500 group-hover:text-ifgoiano-primary-500 transition-colors duration-300"
            >
              Melhore suas habilidades de digitação
            </span>
          </div>
        </h1>
      </div>

      <div class="flex flex-row gap-3 items-center">
        <button
          v-if="showLogoutButton"
          class="group relative flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-white rounded-lg transition-all duration-300 overflow-hidden cursor-pointer"
          title="Logout"
          @click="onLogoutClick"
        >
          <!-- Hover background effect -->
          <span
            class="absolute inset-0 bg-[#C90C0F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></span>

          <!-- Content -->
          <span class="relative flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
              <path d="M10 12l4-4-4-4" />
              <path d="M14 8H6" />
            </svg>
            <span class="text-sm font-medium hidden sm:inline">Logout</span>
          </span>

          <!-- Shine effect -->
          <span
            class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          ></span>
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
