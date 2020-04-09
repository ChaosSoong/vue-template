
/**
 * 路由页面配置
 *
 * meta 标签配置
 * @param {String} title 网站标题
 * @param {String} requireAuth 是否需要登录
 *
 * 公共页面配置
 * @param {component} layout 布局
 */

const layout = () => import('@view/layout')
// const views = () => import('@views/layout/views')

const home = () => import('@view/home')
const about = () => import('@view/about')

const router = [
  {
    path: '/',
    component: layout,
    redirect: '/',
    children: [
      { name: 'home', path: '/', component: home, meta: { title: 'Home', requireAuth: true } },
      { name: 'about', path: '/about', component: about, meta: { title: 'About', requireAuth: true } }
    ]
  }
]

export default router
