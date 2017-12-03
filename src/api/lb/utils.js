import request from 'superagent'
import CryptoJS from 'crypto-js'
import saPrefix from 'superagent-prefix'

import localStore from '../localstore'

export const SERVER_HOST = process.env.SERVER_HOST
export const CAS_URL = process.env.CAS_URL
export const HOST = process.env.HOST

export const apiPrefix = saPrefix(SERVER_HOST + 'lb')

export const setNevisSignature = function (req) {
  const ua = localStore.getUserAuth()
  if (!ua || !ua.token || !ua.secret) {
    console.warn('require user_auth')
    return req
  }
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
  if (urls.length === 1) {
    return urls[0]
  } else if (urls.length > 1) {
    return '/' + urls.join('/')
  }
  return '/'
}

export const getRequest = function (url) {
  return request.get(url)
    .use(setNevisSignature)
    .use(apiPrefix)
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
