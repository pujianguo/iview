import request from 'superagent'
import saPrefix from 'superagent-prefix'
import CryptoJS from 'crypto-js'
import {checkRequest} from '@/utils/help'
import localStore from '../localstore'

export const SERVER_HOST = process.env.SERVER_HOST
// export const SERVER_HOST = 'http://pujianguo.com'
export const CAS_URL = process.env.CAS_URL
export const HOST = process.env.HOST

export const apiPrefix = saPrefix(SERVER_HOST + '/')

// 判断用户是否登陆
const ua = localStore.getUserAuth()
const uaFlag = function () {
  // 跳转到登录页面
  // if (ua && ua.token && ua.secret) {
  //   return true
  // } else {
  //   console.warn('require user_auth')
  //   let loginUrl = `/login`
  //   console.log(loginUrl)
  //   window.location.href = loginUrl
  //   return false
  // }

  // sina 统一登录
  if (ua && ua.token && ua.secret) {
    return true
  } else {
    console.log('CAS_URL', CAS_URL)
    console.warn('require user_auth')
    let url = SERVER_HOST + 'login'
    let loginUrl = `${CAS_URL}login?service=` + encodeURIComponent(url)
    console.log(loginUrl)
    window.location.href = loginUrl
    return false
  }
}

export const setNevisSignature = function (req) {
  const [token, secret, nonce] = [ua.token, ua.secret, parseInt(new Date().getTime())]
  const sign = CryptoJS.HmacSHA256(`${token}${nonce}`, secret).toString(CryptoJS.enc.Hex)
  return req.set('X-Signature', `${token}:${nonce}:${sign}`)
}
// 字符串原样返回
// 对象返回json串
// 没有返回json空串
export const jsonStr = function (obj) {
  let query = '{}'
  if (!obj) {
  } else if (typeof obj === 'string') {
    query = obj
  } else {
    query = JSON.stringify(obj)
  }
  return query
}

export const joinURL = function (...urls) {
  return '/' + urls.join('/')
}

// 带完整验证
// export const _getRequest = function (url) {
//   if (uaFlag()) {
//     const promise = request.get(url)
//       .use(setShcmpSignature)
//       .use(apiPrefix)
//     return new Promise((resolve, reject) => {
//       promise.end(function (err, resp) {
//         if (!checkRequest(resp)) {
//           console.log('request-ok')
//           reject(err)
//         } else {
//           console.log('request-no')
//           resolve(resp.body)
//         }
//       })
//     })
//   }
// }

// 只有请求，没有做验证
export const _getRequest = function (url) {
  const promise = request.get(url)
    .use(apiPrefix)
  return new Promise((resolve, reject) => {
    promise.end(function (err, resp) {
      if (!checkRequest(resp)) {
        console.log('request-ok')
        reject(err)
      } else {
        console.log('request-no')
        resolve(resp.body)
      }
    })
  })
}

export const _postRequest = function (url, data) {
  if (uaFlag()) {
    const promise = request.post(url, data)
    return new Promise((resolve, reject) => {
      promise.end(function (err, resp) {
        if (!checkRequest(resp)) {
          reject(err)
        } else {
          resolve(resp.body)
        }
      })
    })
  }
}

export const getRequest = function (url) {
  if (uaFlag()) {
    return request.get(url)
      .use(setNevisSignature)
      .use(apiPrefix)
  }
}
export const postRequest = function (url, body) {
  return request.post(url)
    .use(apiPrefix)
    .use(setNevisSignature)
    .send(body)
}
export const putRequest = function (url, body) {
  return request.put(url)
    .use(apiPrefix)
    .use(setNevisSignature)
    .send(body)
}
export const patchRequest = function (url, body) {
  return request.patch(url)
    .use(apiPrefix)
    .use(setNevisSignature)
    .send(body)
}
export const deleteRequest = function (url, body) {
  return request.delete(url)
    .use(apiPrefix)
    .use(setNevisSignature)
    .send(body)
}

export const setSlothToken = 'kill warning'
