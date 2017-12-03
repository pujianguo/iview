import Vue from 'vue'
import {CAS_URL, HOST} from '@/api/api/utils'

const vm = new Vue()

export const nCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export const checkRequest = function (resp) {
  if (resp) {
    if (resp.status >= 200 && resp.status <= 302) {
      return true
    } else if (resp.status === 401) {
      // TODO: maybe should show more info
      // console.log('login url: ', `${CAS_URL}login?service=http%3A%2F%2F${HOST}%2Fapi%2Flogin`)
      // window.location.href = `${CAS_URL}login?service=http%3A%2F%2F${HOST}%2Fapi%2Flogin`
      let loginUrl = `${CAS_URL}login?service=http%3A%2F%2F${HOST}%2Fapi%2Flogin`
      console.log('login url: ', loginUrl)
      // window.location.href = loginUrl
    } else {
      let res = JSON.parse(resp.text)
      let mess = resp.text
      if (res && res.error) {
        mess = res.error
      }
      vm.$Notice.error({
        title: '请求错误',
        desc: mess
      })
      return false
    }
  } else {
    vm.$Notice.error({
      title: '连接错误',
      desc: '连接到服务器失败'
    })
    return false
  }
}

export const rmArrayDuplicatedItem = function (arr) {
  let ret = []
  for (let i = 0, j = arr.length; i < j; i++) {
    if (ret.indexOf(arr[i]) === -1) {
      ret.push(arr[i])
    }
  }
  return ret
}

// 数据多余100个字符隐藏
export const hideStr = function (string, length) {
  let html = ''
  html = string.substr(0, length)
  if (html.length === length) {
    html += '...'
  }
  return html
}

// 提交时验证自定义参数
export const getParams = function (params) {
  let ret = []
  for (let i = 0; i < params.length; i++) {
    if (params[i].name) {
      if (params[i].default) {
        ret.push(params[i])
      } else {
        vm.$Message.warning('自定义参数默认值不能为空！')
        return false
      }
    }
  }
  return ret
}

// 提交时验证常规参数
export const getParamData = function (paramData) {
  let ret = []
  for (let i = 0; i < paramData.length; i++) {
    if (paramData[i].name) {
      if (paramData[i].default) {
        ret.push(paramData[i])
      } else {
        vm.$Message.warning('参数值不能为空！')
        return false
      }
    }
  }
  return ret
}

// ip验证
export const checkIP = function (ip) {
  let reg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
  return reg.test(ip)
}

// member验证
export const checkMember = function (ip) {
  let reg = /^((\d+)\.(\d+)\.(\d+)\.(\d+):(\d+)),(\d+)$/
  return reg.test(ip)
}

// 域名验证
export const checkDomain = function (domain) {
  let reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([?&]\w+=\w*)*$/
  return reg.test(domain)
}

// 验证vips
export const getVips = function (vips) {
  var data = []
  for (let i = 0; i < vips.length; i++) {
    if (vips[i] !== '') {
      if (!checkIP(vips[i])) {
        vm.$Message.warning('第' + (i + 1) + ' 个vip格式不正确')
        return false
      } else {
        if (data.indexOf(vips[i]) === -1) {
          data.push(vips[i])
        }
      }
    }
  }
  return data
}

// 验证换行分隔的域名列表并返回数组
export const getDomains = function (domains) {
  let domainsArr = domains.split('\n')
  let data = []
  for (let i = 0; i < domainsArr.length; i++) {
    let thisDomain = domainsArr[i].trim()
    if (thisDomain !== '') {
      if (!checkDomain(thisDomain)) {
        vm.$Message.warning('第' + (i + 1) + ' 行域名格式不正确')
        return false
      } else {
        if (data.indexOf(thisDomain) === -1) {
          data.push(thisDomain)
        }
      }
    }
  }
  return data
}

// 获取paramData初始值
export const getParamDataForInit = function (params, paramData) {
  if (!params) {
    return []
  }
  if (paramData.length === 0) {
    if (params && params.length > 0) {
      return params.map((x, index) => {
        return {
          name: x.name,
          type: x.type,
          value: x.default,
          desc: x.desc,
          seq: x.seq,
          is: true,
          default: x.default
        }
      })
    }
    return []
  } else {
    let a = {}
    for (var i = 0; i < paramData.length; i++) {
      a[paramData[i].name] = paramData[i].value
    }
    let ret = params.map(x => {
      let value = x.default
      let d = x.default
      let isDefault = true
      if (a[x.name] && (a[x.name] !== x.default)) {
        value = a[x.name]
        isDefault = false
      }
      return {
        name: x.name,
        type: x.type,
        desc: x.desc,
        seq: x.seq,
        value: value,
        is: isDefault,
        default: d
      }
    })
    return ret
  }
}

// 获取paramData提交值
export const getParamDataForSubmit = function (params, paramData) {
  let paramsKey = {}
  for (let i = 0; i < params.length; i++) {
    paramsKey[params[i].name] = params[i].default
  }
  let tmp = paramData.filter(x => {
    return x.value !== paramsKey[x.name]
  })
  return tmp.map(x => {
    return {
      name: x.name,
      type: x.type,
      value: x.value,
      desc: x.desc,
      seq: x.seq
    }
  })
}

// 判断常规参数是否自定义值
export const getParamDataForCustom = function (params, customParamData) {
  let paramsKey = {}
  for (let i = 0; i < params.length; i++) {
    paramsKey[params[i].name] = params[i].default
  }
  let ret = customParamData.map(x => {
    let customVal = x.value
    let isDefault = true
    if (paramsKey[x.name] && (paramsKey[x.name] !== customVal)) {
      isDefault = false
    }
    x.is = isDefault
    return x
  })
  return ret
}

// 获取几分钟之后的时间
export const getTime = function (time = 10) {
  let now = new Date()
  return now.setMinutes(now.getMinutes() + time)
}
