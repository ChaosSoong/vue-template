import 'normalize.css'
import 'lib-flexible'

import Vue from 'vue'

import App from './App'

import router from './utils/router'
import inject from './inject'
import filters from './utils/filter'

import FastClick from 'fastclick'

// 注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.use(inject)

global.bus = new Vue()

// 设置 sessionStorage 默认值
global.$storage.defaults({ author: 'LiuCaiHe <at@lang.so>' })

/**
 * 消除物理点击和 click 移动浏览器上的事件触发之间的300毫秒延迟
 */
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#main')
