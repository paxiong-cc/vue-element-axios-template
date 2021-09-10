import {
  get
} from './index'

const apiList = {
  login: (params) => get('/user/login', params)
}

export default apiList
