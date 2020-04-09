
import MD5 from 'md5'
import _ from 'lodash'

import CON from '@conf'

const paramSort = res => {
  var str = []
  // 将对象转成数组
  for (var i in res) {
    str.push([i, res[i]])
  }
  // 对数组进行排序
  _sort(str, function (a, b) {
    return a[0] > b[0]
  })
  return str
}

const signGenerate = res => {
  var objs = paramSort(res)
  var strs = ''
  for (let i = 0; i < objs.length; i++) {
    strs += objs[i][0] + '' + ((objs[i][1] === null || objs[i][1] === undefined) ? '' : objs[i][1])
  }
  strs = MD5(CON.APPSECRET + strs + CON.APPSECRET).toLowerCase()
  return strs
}

/**
 * 模拟 sort 排序 (解决 Safari 下 sort 的 BUG)
 * @param  {Array}   array 需要排序的数组
 * @param  {Function} fn   排序函数
 * @return {Array}         返回排序后的数组
 */
const _sort = (array, fn) => {
  for (var i = 0; i < array.length - 1; i++) {
    var isSorted = true
    for (var j = 0; j < array.length - 1 - i; j++) {
      if (fn(array[j], array[j + 1]) > 0) {
        var temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        isSorted = false
      }
    }
    if (isSorted) {
      return false
    }
  }
}

const isWechatEnv = () => {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') !== -1) return true
  else return false
}

const lib = {
  signGenerate,
  isWechatEnv
}

const isIOS = () => {
  var isIphone = navigator.userAgent.includes('iPhone')
  var isIpad = navigator.userAgent.includes('iPad')
  return isIphone || isIpad
}

/**
 * 跳转页面不记录URL
 */
const _urlReplace = uri => {
  var href = uri
  if (href && /^#|javasc/.test(href) === false) {
    if (history.replaceState) {
      history.replaceState(null, document.title, href.split('#')[0] + '#')
      location.replace('')
    } else {
      location.replace(href)
    }
  }
}

export default {
  _,
  MD5,
  lib,
  isIOS,
  _urlReplace
}
