import {
  LIST_USERS
} from '../types'

const state = {
  userList: []
}

const getters = {
  userListById: (state) => {
    let ret = {}
    for (let i = 0; i < state.userList.length; i++) {
      ret[state.userList[i].id] = {
        name: state.userList[i].userinfo.name,
        email: state.userList[i].userinfo.email,
        role: state.userList[i].role
      }
    }
    return ret
  }
}

const actions = {
  listUsers ({ commit }, users) {
    commit(LIST_USERS, { users })
  }
}

const mutations = {
  [LIST_USERS] (state, {users}) {
    state.userList = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
