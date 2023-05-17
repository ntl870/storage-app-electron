import axios from 'axios'
import { useLocalStorage } from '@renderer/utils/tools'

const { getLocalStorage } = useLocalStorage()

const instance = axios.create({
  baseURL: import.meta.env.RENDERER_VITE_BASE_API,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
  }
})

instance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const axiosClient = instance
