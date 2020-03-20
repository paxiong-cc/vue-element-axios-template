const state = {
  IDENTITY: JSON.parse(localStorage.getItem('Identity')) // 用户信息
}

const mutations = {
  // 保存用户信息
  setIdentity(state, val) {
    state.IDENTITY = JSON.parse(val)
  }
}

const actions = {
  // 保存用户信息
  setIdentity({ commit }, val) {
    commit('setIdentity', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
