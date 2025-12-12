import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref(null)
    const token = ref(null)

    const setAuthenticatedUser = (newUser) => {
      user.value = newUser
    }

    const setAuthenticatedToken = (newToken) => {
      token.value = newToken
    }

    return {
      user,
      token,
      setAuthenticatedUser,
      setAuthenticatedToken
    }
  },
  {
    persist: true
  }
)
