import {
  NODE,
  PARENT_NODE,
  LIST_NODES,
  LIST_NODES_ALL
} from '../types'

const state = {
  node: '',
  parentNode: '',
  nodeList: [],
  allNodeList: []
}

const getters = {
  allNodeListById: (state) => {
    let ret = {}
    for (let i = 0; i < state.allNodeList.length; i++) {
      ret[state.allNodeList[i].id] = state.allNodeList[i]
    }
    return ret
  },
  allNodeListByClusterId: (state) => {
    let ret = {}
    for (let i = 0; i < state.allNodeList.length; i++) {
      if (!ret[state.allNodeList[i].clusterId]) {
        ret[state.allNodeList[i].clusterId] = []
      }
      ret[state.allNodeList[i].clusterId].push(state.allNodeList[i])
    }
    return ret
  }
}

const actions = {
  node ({ commit }, node) {
    commit(NODE, { node })
  },
  parentNode ({ commit }, node) {
    commit(PARENT_NODE, { node })
  },
  listNodes ({ commit }, nodes) {
    commit(LIST_NODES, { nodes })
  },
  listNodesAll ({ commit }, nodes) {
    commit(LIST_NODES_ALL, { nodes })
  }
}

const mutations = {
  [PARENT_NODE] (state, {node}) {
    state.parentNode = node
  },
  [NODE] (state, {node}) {
    state.node = node
  },
  [LIST_NODES] (state, {nodes}) {
    state.nodeList = nodes
  },
  [LIST_NODES_ALL] (state, {nodes}) {
    state.allNodeList = nodes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
