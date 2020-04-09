/**
 * sessionStorage 存储
 * 使用 global 或者 this
 * EG:
 * ```
 * 写
 * global.$storage.set('user', { name: 'userName' })
 * 写 3 秒后过期
 * global.$storage.set('user', { name: 'userName' }, new Date().getTime() + 3000)
 *
 * 读
 * global.$storage.get('user')
 *
 * 删除
 * global.$storage.remove('user')
 *
 * 遍历所有的值
 * global.$storage.each(function(value, key) {
 *   console.log(key, '==', value)
 * })
 * ```
 */

import engine from 'store/src/store-engine'
import session from 'store/storages/sessionStorage'
import defaults from 'store/plugins/defaults'
import expire from 'store/plugins/expire'

export default engine.createStore([session], [defaults, expire])
