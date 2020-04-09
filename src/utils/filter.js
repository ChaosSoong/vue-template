/**
 * 过滤器
 * @author LiuCaiHe at 2017-08-05
 */
// import {formatDate, formatMoney} from '@liwb/cloud-utils'

const filters = {

  /**
   * 格式化手机号码 334
   */
  formatPhone: (phone) => {
    let tel = filters.trim(phone, 'g')
    return tel.substring(0, 3) + ' ' + tel.substring(3, 7) + ' ' + tel.substring(7, 11)
  },

  /**
  * 去掉字符串中所有的空格
  * @param {String} str 需要格式化的字符串
  * @param {String} isGlobal [g] 是否去掉所有的空格
  */
  trim: (str, isGlobal) => {
    var result
    result = str.replace(/(^\s+)|(\s+$)g/, '')
    if (isGlobal && isGlobal.toLowerCase() === 'g') return result.replace(/\s/g, '')
    return result
  }
}

export default filters
