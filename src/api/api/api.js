import {
  joinURL,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest
} from './utils'

export default {
  // test
  testApi: () => {
    return getRequest('/mock/test.json')
  },

  // logout
  logout: () => {
    return deleteRequest('/logout')
  },

  // product
  listProduct: () => {
    const url = joinURL('/product')
    return getRequest(url)
  },
  productTree: () => {
    const url = joinURL('/product/_/tree')
    return getRequest(url)
  },
  getProduct: (uuid) => {
    const url = joinURL('product', uuid)
    return getRequest(url)
  },
  reloadProduct: () => {
    const url = joinURL('product', 'reload')
    return getRequest(url)
  },
  getTechLeader: (uuid) => {
    const url = joinURL('product', uuid, 'techleader')
    return getRequest(url)
  },

  // user
  listUsers: () => {
    return getRequest('/users')
  },
  getUserRelation: (id) => {
    let url = joinURL('users', id, 'relation')
    return getRequest(url)
  },
  SetRole: (obj) => {
    let url = joinURL('users', obj.id, 'role')
    return patchRequest(url, obj)
  },

  // idc
  listIdcs: () => {
    return getRequest('/idcs')
  },
  addIdc: (obj) => {
    return postRequest('/idcs', obj)
  },
  updateIdc: (obj) => {
    let url = joinURL('idcs', obj.id)
    return postRequest(url, obj)
  },
  deleteIdc: (id) => {
    let url = joinURL('idcs', id)
    return deleteRequest(url)
  },

  // profile
  getProfile: () => {
    return getRequest('/profile')
  },

  addSetting: (obj) => {
    let url = joinURL('settings')
    return postRequest(url, obj)
  },
  updateSetting: (obj) => {
    let url = joinURL('settings', obj.key)
    return putRequest(url, obj)
  },

  // auth
  listAuth: (id) => {
    const url = joinURL('permission', id)
    return getRequest(url)
  },
  updateAuth: (id, body) => {
    const url = joinURL('permission', id, 'members')
    return putRequest(url, body)
  },

  // locker
  listLockers: (type) => {
    type = 'lbui_' + type
    const url = joinURL('locker', type)
    return getRequest(url)
  },
  getLocker: (type, key) => {
    type = 'lbui_' + type
    const url = joinURL('locker', type, key)
    return getRequest(url)
  },
  addLocker: (body) => {
    body.type = 'lbui_' + body.type
    return postRequest('/locker', body)
  },
  renewleaseLocker: (type, key) => {
    type = 'lbui_' + type
    const url = joinURL('locker', type, key)
    return patchRequest(url)
  },
  existsLocker: (type, key) => {
    type = 'lbui_' + type
    const url = joinURL('locker', type, key, 'check')
    return getRequest(url)
  },
  deleteLocker: (type, key) => {
    type = 'lbui_' + type
    const url = joinURL('locker', type, key)
    return deleteRequest(url)
  }
}
