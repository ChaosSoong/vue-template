import axios from 'axios'
import CON from '@conf'

let axiosInstance = {}

axiosInstance = axios.create(CON.AXIOS_DEFAULT_CONFIG)

// 注入请求拦截
axiosInstance
  .interceptors.request.use(
    CON.INTERCEPTORS.requestSuccess,
    CON.INTERCEPTORS.requestFail
  )

// 注入响应拦截
axiosInstance
  .interceptors.response.use(
    CON.INTERCEPTORS.responseSuccess,
    CON.INTERCEPTORS.responseFail
  )

export default axiosInstance
