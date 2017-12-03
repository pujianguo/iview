// import Vue from 'vue'

import {
  LIST_LB
} from '../types'

const state = {
  lbList: []
}

const getters = {
  lbListById: (state) => {
    let ret = {}
    for (let i = 0; i < state.lbList.length; i++) {
      ret[state.lbList[i].id] = state.lbList[i]
    }
    return ret
  }
}

const actions = {
  listLBs ({ commit }, lbs) {
    commit(LIST_LB, { lbs })
  }
}

const mutations = {
  [LIST_LB] (state, {lbs}) {
    state.lbList = lbs
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
