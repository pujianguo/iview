import {
  LIST_INSTANCES
} from '../types'

const state = {
  instanceList: null
}

const getters = {
}

const actions = {
  listInstances ({ commit }, instances) {
    commit(LIST_INSTANCES, { instances })
  }
}

const mutations = {
  [LIST_INSTANCES] (state, {instances}) {
    state.instanceList = instances
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
