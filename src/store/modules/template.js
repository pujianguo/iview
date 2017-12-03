import {
  LIST_TEMPLATES
} from '../types'

const state = {
  templateList: []
}

const getters = {
  tplListByTypeForVhost: (state) => {
    let ret = {}
    for (let i = 0; i < state.templateList.length; i++) {
      if (state.templateList[i].type === 'vhost') {
        ret[state.templateList[i].id] = state.templateList[i]
      }
    }
    return ret
  },
  tplListByTypeForNgx: (state) => {
    let ret = {}
    for (let i = 0; i < state.templateList.length; i++) {
      if (state.templateList[i].type === 'ngx') {
        ret[state.templateList[i].id] = state.templateList[i]
      }
    }
    return ret
  }
}

const actions = {
  listTemplates ({ commit }, templates) {
    commit(LIST_TEMPLATES, { templates })
  }
}

const mutations = {
  [LIST_TEMPLATES] (state, {templates}) {
    state.templateList = templates
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
