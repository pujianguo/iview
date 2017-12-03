export default {
  label (lb) {
    return `labelSelector=${lb}`
  },
  labelObj (lb) {
    return JSON.stringify({
      labelSelector: lb
    })
  },
  eq (key, val) {
    return this.label(`${key}==${val}`)
  },
  in (key, arr) {
    return this.label(`${key} in ( ${arr.join(',')} )`)
  },
  notin (key, arr) {
    return this.label(`${key} notin ( ${arr.join(',')} )`)
  },

  // for idc
  Idc (alias) {
    return this.labelObj(`${this.lbIDC}==${alias}`)
  },
  NotinIdcs (alias) {
    return this.labelObj(`${this.lbIDC} notin ( ${alias.join(',')} )`)
  }
}
