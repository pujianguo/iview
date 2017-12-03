import {
  TREE_PATH,
  TREE_INSTANCE_LB,
  TREE_INSTANCE_CLUSTER,
  TREE_INSTANCE_NODE,
  TREE_PORJECT,
  TREE_PORJECT_INSTANCE

} from '../types'

const state = {
  treePath: [],
  treeInstanceLB: {
    parentId: 'loadbalance-id',
    id: ''
  },
  treeInstanceCluster: {
    parentId: '',
    id: ''
  },
  treeInstanceNode: {
    parentId: '',
    id: ''
  },
  treeProject: {
    parentId: 'project-id',
    id: ''
  },
  treeProjectInstance: {
    parentId: '',
    id: ''
  }
}

const getters = {
}

const actions = {
  setTreePath ({ commit }, data) {
    commit(TREE_PATH, { data })
  },
  setTreeInstanceLB ({ commit }, data) {
    commit(TREE_INSTANCE_LB, { data })
  },
  setTreeInstanceCluster ({ commit }, data) {
    commit(TREE_INSTANCE_CLUSTER, data)
  },
  setTreeInstanceNode ({ commit }, data) {
    commit(TREE_INSTANCE_NODE, { data })
  },
  setTreeProject ({ commit }, data) {
    commit(TREE_PORJECT, { data })
  },
  setTreeProjectInstance ({ commit }, data) {
    commit(TREE_PORJECT_INSTANCE, { data })
  }
}

const mutations = {
  [TREE_PATH] (state, {data}) {
    state.treePath = data
  },
  [TREE_INSTANCE_LB] (state, {data}) {
    state.treeInstanceLB = data
  },
  [TREE_INSTANCE_CLUSTER] (state, data) {
    state.treeInstanceCluster = data
  },
  [TREE_INSTANCE_NODE] (state, {data}) {
    state.treeInstanceNode = data
  },
  [TREE_PORJECT] (state, {data}) {
    state.treeProject = data
  },
  [TREE_PORJECT_INSTANCE] (state, {data}) {
    state.treeProjectInstance = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
