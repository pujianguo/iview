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
      ret[state.userList[i].id] = state.userList[i]
    }
    return ret
  },
  getUserById: (state) => (id) => {
    return state.userList.find(user => user.id === id) ? state.userList.find(user => user.id === id) : null
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
