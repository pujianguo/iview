import Vue from 'vue'
import Vuex from 'vuex'

import cluster from './modules/cluster'
import node from './modules/node'
import project from './modules/project'
import instance from './modules/instance'
import template from './modules/template'
import user from './modules/user'
import profile from './modules/profile'
import lb from './modules/lb'
import tree from './modules/tree'
import audit from './modules/audit'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    cluster,
    node,
    project,
    instance,
    template,
    user,
    profile,
    lb,
    tree,
    audit
  },
  strict: DEBUG
})
