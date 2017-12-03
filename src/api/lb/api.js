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
  listLB: () => {
    return getRequest('/lb')
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
  listTplRevisions: (id) => {
    const url = joinURL('tpl', id, 'revision')
    return getRequest(url)
  },
  listTplRelation: (tplId, type) => {
    const url = joinURL('tpl', tplId, type)
    return getRequest(url)
  },
  listTplRelationByVhost: (tplId) => {
    const url = joinURL('tpl', tplId, 'vhost')
    return getRequest(url)
  },
  newTplRevision: (tplId, prevRevisionId, obj) => {
    const url = joinURL('tpl', tplId, 'revision', prevRevisionId)
    return putRequest(url, obj)
  },
  getTplRevision: (tplId, revisionId) => {
    const url = joinURL('tpl', tplId, 'revision', revisionId)
    return getRequest(url)
  },
  getTplLatestRevision: (tplId) => {
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
  addProject: (obj) => {
    return postRequest('/project', obj)
  },
  deleteProject: (id) => {
    const url = joinURL('project', id)
    return deleteRequest(url)
  },

  // instance
  listInstances: (projectid, nodeid) => {
    let url = joinURL('/instances')
    let query = null
    if (projectid) {
      if (nodeid) {
        query = {
          projectids: projectid,
          nodeids: nodeid
        }
      } else {
        query = {
          projectids: projectid
        }
      }
    }
    return getRequest(url).query(query)
  },
  updateInstance: (projectid, nodeid, body) => {
    const url = joinURL('/instances')
    let query = {
      projectid: projectid,
      nodeid: nodeid
    }
    return postRequest(url, body).query(query)
  },
  getInstance: (projectid, nodeid) => {
    const url = joinURL('isntances', projectid, nodeid)
    return getRequest(url)
  },
  deleteInstance: (projectid, nodeid) => {
    const url = joinURL('/instances', nodeid, projectid)
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
  // 通过资源id获取history
  historyNode: (nodeId) => {
    let url = joinURL('history', 'node')
    let query = null
    if (nodeId) {
      query = {
        _id: nodeId
      }
    }
    return getRequest(url).query(query)
  },
  historyProject: (projectId) => {
    let url = joinURL('history', 'project')
    let query = null
    if (projectId) {
      query = {
        _id: projectId
      }
    }
    return getRequest(url).query(query)
  },
  historyInstance1: (instanceId) => {
    let url = joinURL('history', 'instance')
    let query = null
    if (instanceId) {
      query = {
        _id: instanceId
      }
    }
    return getRequest(url).query(query)
  },
  historyInstance: (projectid, nodeid) => {
    let url = joinURL('history', 'instance')
    let query = null
    if (projectid) {
      if (nodeid) {
        query = {
          projectid: projectid,
          nodeid: nodeid
        }
      } else {
        query = {
          projectid: projectid
        }
      }
    }
    return getRequest(url).query(query)
  },
  historyNodeDelete: (id) => {
    let url = joinURL('history', 'node', id)
    return deleteRequest(url)
  },
  historyProjectDelete: (id) => {
    let url = joinURL('history', 'project', id)
    return deleteRequest(url)
  },
  historyInstanceDelete: (id) => {
    let url = joinURL('history', 'instance', id)
    return deleteRequest(url)
  },

  // 通过historyId 获取信息
  historyNodeById: (ids) => {
    let url = joinURL('history', 'node')
    let query = null
    if (ids) {
      query = {
        ids: ids
      }
    }
    return getRequest(url).query(query)
  },
  historyProjectById: (ids) => {
    let url = joinURL('history', 'project')
    let query = null
    if (ids) {
      query = {
        ids: ids
      }
    }
    return getRequest(url).query(query)
  },
  historyInstanceById: (ids) => {
    let url = joinURL('history', 'instance')
    let query = null
    if (ids) {
      query = {
        ids: ids
      }
    }
    return getRequest(url).query(query)
  },

  listAudit: (LBId) => {
    let query = {
      lbid: LBId
    }
    return getRequest('/audit').query(query)
  },
  getAudit: (id) => {
    let url = joinURL('audit', id)
    return getRequest(url)
  },
  createAudit: (obj) => {
    return postRequest('/audit', obj)
  },
  addAudit: (id, obj) => {
    let url = joinURL('audit', id, 'add')
    return putRequest(url, obj)
  },
  delAudit: (id, obj) => {
    let url = joinURL('audit', id, 'del')
    return putRequest(url, obj)
  },
  getAuditDiff: (id) => {
    let url = joinURL('audit', id, 'diff')
    return getRequest(url)
  },

  // 审核操作
  auditOpen: (id, obj) => {  // 通过审核
    let url = joinURL('audit', id, 'start')
    return patchRequest(url, obj)
  },
  auditApprove: (id, obj) => {
    let url = joinURL('audit', id, 'approve')
    return patchRequest(url, obj)
  },
  auditCancel: (id, obj) => {
    let url = joinURL('audit', id, 'cancel')
    return patchRequest(url, obj)
  },
  auditDeploy: (id, obj) => {
    let url = joinURL('audit', id, 'deploy')
    return patchRequest(url, obj)
  },
  auditReOpen: (id, obj) => {
    let url = joinURL('audit', id, 'reOpen')
    return patchRequest(url, obj)
  }
}
