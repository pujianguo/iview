import {
  lbProjectID,
  lbIDC
} from '@/api/convention'

// get project id in labels of k8s' resource
export const getResPID = function (item) {
  let {metadata: {labels = {}}} = item

  const lb = labels[lbProjectID]
  if (lb && lb !== '') {
    return lb
  }
  return 'none'
}

// get node idc in node
export const getResIdc = function (node) {
  if (node.v1) {
    let {v1: {metadata: {labels = {}}}} = node
    if (labels === {}) {
      // console.error('not support resource', node)
      return 'none'
    }
    const idc = node.v1.metadata.labels[lbIDC]
    if (idc && idc !== '') {
      return idc
    }
  }
  return 'none'
}

// get node state in node
export const getNodeByState = function (node) {
  if (node) {
    let {status: {conditions = {}}} = node
    if (conditions === {}) {
      // console.error('not support resource', node)
      return 'abnormal'
    }

    for (let sta of conditions) {
      if (sta.status === 'True') {
        if (sta.type === 'Ready') {
          return 'normal'
        } else {
          return 'abnormal'
        }
      }
    }
  }
  return 'abnormal'
}

export const isMatchLabel = function (item, query) {
  let {metadata: {labels = {}}} = item
  if (labels === {}) {
    console.error('not support resource', item)
    return false
  }
  for (var key in query) {
    if (labels[key] !== query[key]) {
      return false
    }
  }
  return true
}
