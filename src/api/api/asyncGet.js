import api from './api'
export default{
  sleep: (time) => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // 模拟出错了，返回 ‘error’
        // reject('error')
        resolve('ok')
      }, time)
    })
  },
  asyncSleep: async () => {
    try {
      return await this.a.sleep(1000)
    } catch (err) {
      console.log(err) // 这里捕捉到错误 `error`
    }
  },
  asyncGetUser: async () => {
    try {
      return await api.getUser()
    } catch (err) {
      console.log(err) // 这里捕捉到错误 `error`
    }
  }
}
