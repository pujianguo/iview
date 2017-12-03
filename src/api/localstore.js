import localStore from 'store'

// for localstore's key
const LS_KEY_USER_AUTH = 'nevis_user_auth'
const NAMESPACE = 'nevis_namespace'
const MOCK_DATA = 'mock_data'

export default {
  setUserAuth: function (obj) {
    localStore.set(LS_KEY_USER_AUTH, obj)
  },
  getUserAuth: function () {
    return localStore.get(LS_KEY_USER_AUTH)
  },
  rmUserAuth: function () {
    localStore.remove(LS_KEY_USER_AUTH)
  },

  setNamespace (val) {
    localStore.set(NAMESPACE, val)
  },
  getNamespace () {
    return localStore.get(NAMESPACE)
  },
  rmNamespace () {
    localStore.remove(NAMESPACE)
  },

  setMockData (val) {
    localStore.set(MOCK_DATA, val)
  },
  getMockData () {
    return localStore.get(MOCK_DATA)
  },
  rmMockData () {
    localStore.remove(MOCK_DATA)
  }
}
