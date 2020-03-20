import Cookies from 'js-cookie'

const tokenKey = 'Authorization'

/**
 * 从 cookie中 获取得到token
 */
export function getToken () {
  return Cookies.get(tokenKey) || ''
}

/**
 * 设置token到cookie中
 * @param {token value} tokenValue
 */
export function setToken (tokenValue, flag) {
  return Cookies.set(
    tokenKey,
    tokenValue,
    flag ? { expires: 1000 * 6000 } : ''
  )
}

/**
 * 移除token
 */
export function removeToken () {
  return Cookies.remove(tokenKey)
}
