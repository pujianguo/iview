import request from 'superagent'
import saPrefix from 'superagent-prefix'

// export const SERVER_HOST = ''
// export const apiPrefix = saPrefix(SERVER_HOST + '/static/mock')

export const SERVER_HOST = ''
export const apiPrefix = saPrefix(SERVER_HOST + '/static/mock')

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
    .use(apiPrefix)
}
export const postRequest = function (url, body) {
  return request.post(url)
    .use(apiPrefix)
    .send(body)
}
export const putRequest = function (url, body) {
  return request.put(url)
    .use(apiPrefix)
    .send(body)
}
export const patchRequest = function (url, body) {
  return request.patch(url)
    .use(apiPrefix)
    .send(body)
}
export const deleteRequest = function (url, body) {
  return request.delete(url)
    .use(apiPrefix)
    .send(body)
}

export const setSlothToken = 'kill warning'
