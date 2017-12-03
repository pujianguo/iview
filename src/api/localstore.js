import localStore from 'store'

// for localstore's key
const LS_KEY_USER_AUTH = 'user_auth'

export default {
  setUserAuth: function (obj) {
    localStore.set(LS_KEY_USER_AUTH, obj)
  },
  getUserAuth: function () {
    return localStore.get(LS_KEY_USER_AUTH)
  },
  rmUserAuth: function () {
    localStore.remove(LS_KEY_USER_AUTH)
  }
}
