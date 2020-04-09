/**
 * 这里做页面拦截\权限处理
 */
export const routerBeforeEach = (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (to.meta.title) document.title = to.meta.title
    next()
  } else {
    next()
  }
}
