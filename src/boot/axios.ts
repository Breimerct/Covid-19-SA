import axios, { AxiosInstance } from 'axios'
import { boot } from 'quasar/wrappers'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || process.env.API_URL
})

export { httpClient }

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
})
