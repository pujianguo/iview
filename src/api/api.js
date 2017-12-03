import request from 'superagent'

const treeApiUrl = '/static/tree.json'

export default {
  // tree
  getTree: () => {
    return request.get(treeApiUrl)
  }
}
