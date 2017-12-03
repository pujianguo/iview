import {
  joinURL,
  getRequest,
  putRequest,
  deleteRequest,
  postRequest,
  patchRequest
} from './utils'

export default {
  // lb
  getTest: () => {
    return getRequest('/lblist.json')
  },
  getLB: (id) => {
    const url = joinURL('lb', id)
    return getRequest(url)
  },
  deleteLB: (id) => {
    const url = joinURL('lb', id)
    return deleteRequest(url)
  },
  addLB: (body) => {
    return postRequest('/lb', body)
  },
  updateLBParams: (id, body) => {
    const url = joinURL('lb', id, 'params')
    return putRequest(url, body)
  },

  // cluster
  listClusters: (lbId) => {
    let url = '/cluster'
    if (lbId) {
      return getRequest(url).query({lbid: lbId})
    }
    return getRequest(url)
  },
  deleteCluster: (id) => {
    const url = joinURL('cluster', id)
    return deleteRequest(url)
  },
  addCluster: (body) => {
    return postRequest('/cluster', body)
  },
  updateClusterInfo: (id, body) => {
    const url = joinURL('cluster', id, 'info')
    return putRequest(url, body)
  },
  updateClusterParams: (id, body) => {
    const url = joinURL('cluster', id, 'params')
    return putRequest(url, body)
  },
  getCluster: (id) => {
    const url = joinURL('cluster', id)
    return getRequest(url)
  },

  // node
  listNodes: (params) => {
    // /nodes?lbid=xxx&clusterid=yyy
    let url = '/nodes'
    if (params) {
      let query = {
        clusterid: params.id
      }
      if (params.type === 'lb') {
        query = {
          lbid: params.id
        }
      }
      return getRequest(url).query(query)
    }
    return getRequest(url)
  },
  deleteNode: (id) => {
    const url = joinURL('node', id)
    return deleteRequest(url)
  },
  getNode: (id) => {
    const url = joinURL('node', id)
    return getRequest(url)
  },
  addNode: (body) => {
    return postRequest('/node', body)
  },
  updateNode: (id, body) => {
    const url = joinURL('node', id)
    return putRequest(url, body)
  },
  historyNodeDeploy: (id) => {
    let url = joinURL('history', 'deploy')
    let query = {
      ids: id
    }
    return getRequest(url).query(query)
  },
  checkSsh: (id) => {
    let url = joinURL('node', id, 'sshkey')
    return patchRequest(url)
  },
  getSsh: (id, body) => {
    const url = joinURL('node', id, 'sshkey')
    return postRequest(url, body)
  },
  deploy: (id) => {
    const url = joinURL('node', id, 'deploy')
    return patchRequest(url)
  },
  request: (id) => {
    const url = joinURL('node', id, 'request')
    return postRequest(url)
  },
  preview: (id, body) => {
    const url = joinURL('node', id, 'preview')
    return postRequest(url, body)
  },

  // tpl
  listTemplates: (type) => {
    let query = {
      type: type
    }
    return getRequest('/tpl').query(query)
  },
  getTemplate: (id) => {
    const url = joinURL('tpl', id)
    return getRequest(url)
  },
  addTemplate: (obj) => {
    return postRequest('/tpl', obj)
  },
  updateTemplateInfo: (id, obj) => {
    const url = joinURL('tpl', id)
    return putRequest(url, obj)
  },
  deleteTemplate: (id) => {
    const url = joinURL('tpl', id)
    return deleteRequest(url)
  },
  historyTemplate: (id) => {
    let url = joinURL('history', 'template')
    let query = {
      ids: id
    }
    return getRequest(url).query(query)
  },
  // template revision
  listRevisions: (id) => {
    const url = joinURL('tpl', id, 'revision')
    return getRequest(url)
  },
  listRelation: (tplId, type) => {
    const url = joinURL('tpl', tplId, type)
    return getRequest(url)
  },
  listRelationByVhost: (tplId) => {
    const url = joinURL('tpl', tplId, 'vhost')
    return getRequest(url)
  },
  newRevision: (tplId, prevRevisionId, obj) => {
    const url = joinURL('tpl', tplId, 'revision', prevRevisionId)
    return putRequest(url, obj)
  },
  getRevision: (tplId, revisionId) => {
    const url = joinURL('tpl', tplId, 'revision', revisionId)
    return getRequest(url)
  },
  getLatestRevision: (tplId) => {
    const url = joinURL('tpl', tplId, 'latest')
    return getRequest(url)
  },

  // project
  listProjects: () => {
    return getRequest('/project')
  },
  getProject: (id) => {
    const url = joinURL('project', id)
    return getRequest(url)
  },
  listProjectInstances: (id) => {
    const url = joinURL('project', id, 'instances')
    return getRequest(url)
  },
  addProject: (obj) => {
    return postRequest('/project', obj)
  },
  deleteProject: (id) => {
    const url = joinURL('project', id)
    return deleteRequest(url)
  },

  // project_info
  updateProjectBaseInfo: (id, obj) => {
    let url = joinURL('project', id, 'info')
    return putRequest(url, obj)
  },
  updateProjectParams: (id, obj) => {
    let url = joinURL('project', id, 'params')
    return putRequest(url, obj)
  },
  updateProjectInstances: (id, obj) => {
    let url = joinURL('project', id, 'instances')
    return putRequest(url, obj)
  },
  getPreviewInfo: (id, obj) => {
    let url = joinURL('project', id, 'preview')
    return postRequest(url, obj)
  },

  // profile
  getProfile: () => {
    return getRequest('/profile')
  },

  // 变更历史
  historyNodeByCluster: (lbId, clucterId) => {
    let url = joinURL('history', 'node')
    let query = {
      lbid: lbId,
      clusterid: clucterId
    }
    return getRequest(url).query(query)
  },
  historyNode: (id) => {
    let url = joinURL('history', 'node')
    let query = {
      _id: id
    }
    return getRequest(url).query(query)
  },
  historyProject: (id) => {
    let url = joinURL('history', 'project')
    let query = {
      ids: id
    }
    return getRequest(url).query(query)
  },
  historyInstance: (id) => {
    let url = joinURL('history', 'instance')
    let query = {
      ids: id
    }
    return getRequest(url).query(query)
  },

  createAudit: (obj) => {
    return postRequest('/audit', obj)
  }
}
