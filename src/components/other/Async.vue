<template>
    <div name="async">
        <h1>异步请求</h1>
        {{data}}
    </div>
</template>

<script>
import api from '@/api/api/api'
import asyncFunc from  '@/api/api/asyncGet'

let vm = null
let defaultData = {
  name: 'testname',
  params: []
}
export default {
  name: 'async',
  components: {
  },
  data () {
    return {
      data: defaultData
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    sleep (time) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          // 模拟出错了，返回 ‘error’
          reject('error')
          // resolve('ok')
        }, time)
      })
    },

    async start () {
      try {
        console.log('start')
        let res = await this.sleep(3000) // 这里得到了一个返回错误
        console.log(res)
        // 所以以下代码不会被执行了
        console.log('end')
        return res
      } catch (err) {
        console.log(err) // 这里捕捉到错误 `error`
      }
    },

    async getUser () {
      try {
        return await api.getUser()
      } catch (err) {
        console.log(err) // 这里捕捉到错误 `error`
      }
    },
    async initDataByMyPage () {
      console.log('init')
      let se = await this.start()
      if (!se) {
        return false
      }
      console.log('se:', se)
      let user = await this.getUser()
      this.data.params = user
      console.log(user)
      this.$nextTick(() => {
        console.log('bbb')
      })
    },
    async initDataByCommon() {
      console.log('init')
      let se = await asyncFunc.asyncSleep()
      console.log('se:', se)
      if (!se) {
        return false
      }
      let user = await asyncFunc.asyncGetUser()
      this.data.params = user
      console.log(user)
      this.$nextTick(() => {
        console.log('bbb')
      })
    }
  },
  created () {
    this.initDataByMyPage()
    // this.initDataByCommon()
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
