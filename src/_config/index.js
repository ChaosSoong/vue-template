/**
 * 系统业务相关配置文件
 *
 */

/**
 * 拦截器
 * axios
 * router 拦截器
 * router 路由配置
 */
import { requestSuccess, requestFail, responseSuccess, responseFail } from './interceptors/axios'
import { routerBeforeEach } from './interceptors/router'

import ROUTERS from './router'

const INTERCEPTORS = {
  requestSuccess,
  requestFail,
  responseSuccess,
  responseFail,
  routerBeforeEach
}

/**
 * 微信相关配置
 *
 * @param {String} APPID 微信APPID
 * @param {String} CURRENT_URI 当前URL
 * @param {String} WX_OAUTH_URL 微信授权地址
 */
const APPID = 'wx67b67250b6597272'
const CURRENT_URI = encodeURIComponent(window.location.href)

const WX_OAUTH_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + CURRENT_URI + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'

/**
 * Axios相关配置
 *
 * @param {String} APIURL API地址
 * @param {String} APPKEY 请求来源
 * @param {String} APPSECRET 参与签名私钥
 */

const APPKEY = 'wx3.0'
const APPSECRET = '79bff7aff68de81bb5f4e7c0efba518c'

const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  baseURL: process.env.VUE_APP_API_HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
}

/**
 * 路由相关配置 ROUTER_BASE_CONFIG
 *
 * @param {String} base 配置路由的路径
 * @param {String} mode 配置路由的模式 (hash 模式 | history 模式)
 */
const ROUTER_CONFIG = {
  mode: 'history'
}

/**
 * 方便开发的相关配置
 * CONSOLE_REQUEST_ENABLE 开启请求参数打印
 * CONSOLE_RESPONSE_ENABLE 开启响应参数打印
 */

const CONSOLE_REQUEST_ENABLE = true
const CONSOLE_RESPONSE_ENABLE = true

export default {
  INTERCEPTORS,

  ROUTERS,

  WX_OAUTH_URL,

  ROUTER_CONFIG,

  APPKEY,
  APPSECRET,
  AXIOS_DEFAULT_CONFIG,

  CONSOLE_REQUEST_ENABLE,
  CONSOLE_RESPONSE_ENABLE
}
