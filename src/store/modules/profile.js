import {
  GET_PROFILE
} from '../types'

const state = {
  profile: null
}

const getters = {
}

const actions = {
  getProfile ({ commit }, profile) {
    commit(GET_PROFILE, { profile })
  }
}

const mutations = {
  [GET_PROFILE] (state, {profile}) {
    state.profile = profile
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
