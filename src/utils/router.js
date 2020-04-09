import Vue from 'vue'
import Router from 'vue-router'

/**
 * 引入配置文件
 */
import CON from '@conf'

Vue.use(Router)

// 注入默认配置和路由表
let routerInstance = new Router({
  ...CON.ROUTER_CONFIG,
  routes: CON.ROUTERS
})

// 注入拦截器
routerInstance.beforeEach(CON.INTERCEPTORS.routerBeforeEach)

export default routerInstance
