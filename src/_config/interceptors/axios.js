// import Qs from 'qs'
// import CON from '$conf'
// import router from '../../utils/router'

/**
 * 拦截器发起请求
 *
 * @export
 * @param {*} res
 * @returns
 */
export const requestSuccess = res => {
  // if (res.method === 'post') {
  //   // console.log(res)
  //   res.data.app_key = CON.APPKEY
  //   // 当前时间戳
  //   res.data.timestamp = new Date().getTime()
  //   res.data.token = sessionStorage.getItem('wx__signin_token') ? sessionStorage.getItem('wx__signin_token') : ''
  //   res.data.sign = global.$utils.signGenerate(res.data)
  //   res.data = Qs.stringify(res.data)
  // }

  // CON.CONSOLE_REQUEST_ENABLE &&
  // eslint-disable-next-line no-console
  // console.info('requestInterceptor', `url:[${res.method}] ${res.url}`, res)

  return res
}

/**
 * 拦截器发起请求失败
 *
 * @export
 * @param {*} requestError
 * @returns
 */
export const requestFail = requestError => {
  // 自定义发送请求失败逻辑，断网，请求发送监控等

  return Promise.reject(requestError)
}

/**
 * 拦截器响应请求成功
 *
 * @export
 * @param {*} responseObj
 * @returns
 */
export const responseSuccess = responseObj => {
  return responseObj.data
}

/**
 * 拦截器响应请求失败
 *
 * @export
 * @param {*} responseError
 * @returns
 */
export const responseFail = responseError => {
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理

  return Promise.reject(responseError)
}
