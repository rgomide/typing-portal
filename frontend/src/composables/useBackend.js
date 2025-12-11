import { ref } from 'vue'
import axios from 'axios'

const GET = 'get'
const POST = 'post'
const PUT = 'put'
const DELETE = 'delete'

export function useBackend() {
  const baseUrl = import.meta.env.VITE_API_URL
  const isLoading = ref(false)
  const data = ref(null)
  const error = ref(null)

  async function getStages() {
    const url = `api/stages`
    return makeRequest(url, GET)
  }

  async function getStage(stageId) {
    const url = `api/stages/${stageId}`
    return makeRequest(url, GET)
  }

  // private functions
  async function makeRequest(url, method, payload) {
    resetState()

    isLoading.value = true

    let requestConfiguration = {
      method: method,
      url: `${baseUrl}/${url}`,
      timeout: 30000 // Set timeout to 30 seconds
    }

    const configurationStrategy = {
      get: setRequestToGet,
      post: setRequestToPost,
      put: setRequestToPut,
      delete: setRequestToDelete
    }[method]

    requestConfiguration = configurationStrategy(requestConfiguration, payload)
    return sendRequest(requestConfiguration)
  }

  async function sendRequest(requestConfiguration) {
    return axios
      .request(requestConfiguration)
      .then((response) => {
        data.value = response.data
        return { data: data.value, requestSuccessful: true }
      })
      .catch((responseError) => {
        error.value = responseError.response
          ? responseError.response.data
          : 'Error contacting the API'
        return { data: error.value, requestSuccessful: false }
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  function resetState() {
    data.value = null
    error.value = null
    isLoading.value = false
  }

  function addTokenToRequest(requestConfiguration) {
    // if (authStore.token) {
    //   const headers = requestConfiguration['headers'] || {}

    //   requestConfiguration['headers'] = {
    //     ...headers,
    //     Authorization: `Bearer ${authStore.token}`
    //   }
    // }
    return requestConfiguration
  }

  function setRequestToGet(requestConfiguration, payload) {
    if (payload) {
      requestConfiguration['params'] = payload
    }
    return addTokenToRequest(requestConfiguration)
  }

  function setRequestToDelete(requestConfiguration, payload) {
    if (payload) {
      requestConfiguration['params'] = payload
    }
    return addTokenToRequest(requestConfiguration)
  }

  function setRequestToPost(requestConfiguration, payload) {
    if (payload) {
      requestConfiguration['header'] = {
        'Content-Type': 'application/json'
      }
      requestConfiguration['data'] = payload
    }
    return addTokenToRequest(requestConfiguration)
  }

  function setRequestToPut(requestConfiguration, payload) {
    if (payload) {
      requestConfiguration['header'] = {
        'Content-Type': 'application/json'
      }
      requestConfiguration['data'] = payload
    }
    return addTokenToRequest(requestConfiguration)
  }

  return {
    getStages,
    getStage,
    isLoading,
    data,
    error
  }
}
