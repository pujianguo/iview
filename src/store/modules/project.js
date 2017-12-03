import {
  LIST_PROJECTS,
  INIT_PROJECT,
  EDIT_PROJECT
} from '../types'

const state = {
  projectList: [],
  projectInit: null,
  projectEdit: null
}

const getters = {
  projectListById: (state) => {
    let ret = {}
    for (let i = 0; i < state.projectList.length; i++) {
      ret[state.projectList[i].id] = state.projectList[i]
    }
    return ret
  }
}

const actions = {
  listProjects ({ commit }, projects) {
    commit(LIST_PROJECTS, { projects })
  },
  initProject ({ commit }, project) {
    commit(INIT_PROJECT, { project })
  },
  editProject ({ commit }, project) {
    commit(EDIT_PROJECT, { project })
  }
}

const mutations = {
  [LIST_PROJECTS] (state, {projects}) {
    state.projectList = projects
  },
  [INIT_PROJECT] (state, {project}) {
    state.projectInit = project
  },
  [EDIT_PROJECT] (state, {project}) {
    state.projectEdit = project
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
