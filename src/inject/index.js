/**
 * inject
 */

import axios from './axios'
import utils from '@utils'
import storage from '@utils/storage'
import wx from 'wx'

global.$axios = axios
global.$_ = utils._
global.$utils = utils.lib
global.$storage = storage

export default {
  install: (Vue) => {
    Vue.prototype.$axios = axios
    Vue.prototype.$wx = wx
    Vue.prototype.$storage = storage
    Vue.prototype.$_ = utils._
    Vue.prototype.$utils = utils.lib
  }
}
