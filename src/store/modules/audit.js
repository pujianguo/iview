import {
  LIST_AUDIT
} from '../types'

const state = {
  audits: null
}

const getters = {
}

const actions = {
  listAudit ({ commit }, audits) {
    commit(LIST_AUDIT, { audits })
  }
}

const mutations = {
  [LIST_AUDIT] (state, {audits}) {
    state.list = audits
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
