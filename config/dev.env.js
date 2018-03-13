'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_HOST: '"http://idb.cluster.sina.com.cn:1234/"',
  CAS_URL: '"https://cas.erp.sina.com.cn/cas/"',
  HOST: '"idb.cluster.sina.com.cn:1234"'
})
