import axios from 'axios'
import router from '@/router/index'
import getUrl from '@/config/path'
import { Message } from 'element-ui'

/* 基本配置 */
axios.defaults.timeout = 6000 // 请求默认时间
axios.defaults.withCredentials = true // 浏览器请求 携带 cookie
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // axios post 请求头
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // axios post 请求头

/* 拦截器 在发送请求之前拦截 */
axios.interceptors.request.use(
  res => {
    // 设置token
    return res
  },
  err => {
    return err
  }
)

/* 拦截器 在发送请求之后 拦截 */
axios.interceptors.response.use(
  res => {
    return res
  },
  err => {
    return err
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
      axios
          .get(`${baseUrl}${url}`, {
              params: params,
          })
          .then((res) => {
              resolve(res.data);
          })
          .catch((err) => {
              err.data && reject(err.data);
          });
  });
}

export function exportGet(url, params) {
  return new Promise((resolve, reject) => {
      axios({
          method: "GET",
          url: `${baseUrl}${url}`,
          params: params,
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
          },
          responseType: "blob",
      })
          .then((res) => {
              resolve(res.data);
          })
          .catch((err) => {
              err.data && reject(err.data);
          });
  });
}

export function putBody(url, params) {
  return new Promise((resolve, reject) => {
      axios({
          method: "PUT",
          url: `${baseUrl}${url}`,
          data: params,
          headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: store.state.user.Authorization,
          },
      })
          .then((res) => {
              resolve(res.data);
          })
          .catch((err) => {
              err.data && reject(err.data);
          });
  });
}
