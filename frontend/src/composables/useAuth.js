import { useAuthStore } from '@/stores/storeAuth'

export function useAuth() {
  const authStore = useAuthStore()

  function isAuthenticated() {
    return useAuthStore().user !== null && useAuthStore().token !== null
  }

  function isUserAdmin() {
    return useAuthStore().user.roles.includes('admin')
  }

  function login(user, token) {
    authStore.setAuthenticatedToken(token)
    authStore.setAuthenticatedUser(user)
  }

  function logout() {
    authStore.setAuthenticatedUser(null)
    authStore.setAuthenticatedToken(null)
  }

  return {
    isUserAdmin,
    isAuthenticated,
    login,
    logout
  }
}
