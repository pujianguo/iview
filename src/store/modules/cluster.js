import {
  LIST_CLUSTERS_ALL,
  LIST_CLUSTERS
} from '../types'

const state = {
  allClusterList: [],
  clusterList: [],
  cluster: ''
}

const getters = {
  allClusterListById: (state) => {
    let ret = {}
    for (let i = 0; i < state.allClusterList.length; i++) {
      ret[state.allClusterList[i].id] = state.allClusterList[i]
    }
    return ret
  },
  allClusterListByLBId: (state) => {
    let ret = {}
    for (let i = 0; i < state.allClusterList.length; i++) {
      if (!ret[state.allClusterList[i].LBId]) {
        ret[state.allClusterList[i].LBId] = []
      }
      ret[state.allClusterList[i].LBId].push(state.allClusterList[i])
    }
    return ret
  }
}

const actions = {
  listClustersAll ({ commit }, clusters) {
    commit(LIST_CLUSTERS_ALL, { clusters })
  },
  listClusters ({ commit }, clusters) {
    commit(LIST_CLUSTERS, { clusters })
  }
}

const mutations = {
  [LIST_CLUSTERS_ALL] (state, {clusters}) {
    state.allClusterList = clusters
  },
  [LIST_CLUSTERS] (state, {clusters}) {
    state.clusterList = clusters
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
