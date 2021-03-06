// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import filter from '@/filter'
import iView from 'iview'

import 'iview/dist/styles/iview.css'
import 'font-awesome/css/font-awesome.min.css'
import VueClipboards from 'vue-clipboards'

Vue.use(iView)
Vue.use(filter)
Vue.use(VueClipboards)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
