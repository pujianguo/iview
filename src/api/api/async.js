import {
  joinURL,
  _getRequest
  // _postRequest
} from './utils'

export default{
  getUser: () => {
    const url = joinURL('get.php')
    return _getRequest(url)
  }
}
