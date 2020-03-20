import axios from 'axios'
import router from '@/router/index'
import { getUrl } from '@/config/path'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/config/auth'

/* 基本配置 */
axios.defaults.timeout = 6000 // 请求默认时间
axios.defaults.baseURL = getUrl() // 请求根目录
axios.defaults.withCredentials = true // 浏览器请求 携带 cookie
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // axios post 请求头
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // axios post 请求头

// axios.interceptors.request.use     发送请求前处理
// axios.interceptors.response.use    接受返回后，回调之前处理处理

/* 返回指令 */
const ERROR_CODE_MAP = {
  success: 'SYS.UNKNOWN_EXCEPTION',
  error: 'BIZ.BUSSINESS_EXCEPTION'
}

var netWorkError = false //  网络状态是否异常

/* 状态码 */
const STATUS_CODE = {
  401: {
    process: () => {
      removeToken()
      router.replace('/')
    }
  }
}

/* 拦截器 在发送请求之前拦截 */
axios.interceptors.request.use(
  config => {
    // 设置token
    config.headers.Authorization = getToken()
    return config
  },
  err => {
    return err
  }
)

/* 拦截器 在发送请求之后 拦截 */
axios.interceptors.response.use(
  res => {
    // 账号密码错误
    if (ERROR_CODE_MAP.error === res.data.code) {
      res.data.msg = res.data.msg === '账户不存在' || res.data.msg === '密码错误' ? '账号或密码错误' : ''
      Message({ type: 'error', message: res.data.msg, duration: 2000 })
      return { data: '' }
    }
    return res
  },
  err => {
    // 网络连接失败
    if (!navigator.onLine) {
      if (!netWorkError) {
        netWorkError = true
        setTimeout(() => {
          netWorkError = false
        }, 1300)
        return Message({ type: 'error', message: '网络连接失败', duration: 1000 })
      }
      return
    }

    // 身份未认证
    if (err.message.indexOf('401') !== -1) {
      STATUS_CODE[401].process()
      return false
    }

    // 请求超时
    const msg = err.message === 'timeout of 6000ms exceeded'
      ? '请求超时'
      : err.message
    Message({ type: 'error', message: msg, duration: 2000 })
    return false
  }
)
