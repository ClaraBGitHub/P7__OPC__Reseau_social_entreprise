import axios from 'axios'

const Interceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        window.localStorage.clear()
        window.location = '/login'
        return Promise.reject(error)
      }
      if (error) return error
    }
  )
}

export default Interceptor
