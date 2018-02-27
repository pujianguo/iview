<template>
    <div name="async">
        <h1>异步请求</h1>
        {{data}}
    </div>
</template>

<script>
import async from '@/api/api/async'

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
          // reject('error')
          resolve('ok')
        }, time)
      })
    },

    // 同步获取, 并在回掉中执行获取到数据之后的操作
    getUser () {
      async.getUser().then(result => {
        console.log('异步执行')
        console.log(result)
        // data handle
      }).catch(err => {
        console.log(err)
      })
    },
    // 异步获取，有返回值的获取数据
    async asyncGetUser () {
      try {
        return await async.getUser()
      } catch (err) {
        console.log(err)
      }
    },

    async start () {
      try {
        console.log('start')
        let res = await this.sleep(3000)
        console.log(res)
        // 上面得到了一个返回错误时，以下代码不会被执行了
        console.log('end')
        return res
      } catch (err) {
        console.log(err) // 这里捕捉到错误 `error`
      }
    },

    async initData () {
      console.log('init')
      this.getUser()
      let se = await this.start()
      console.log('se:', se)
      if (!se) {
        return false
      }
      let user = await this.asyncGetUser()
      console.log(user)
      this.$nextTick(() => {
        console.log('bbb')
      })
    }
  },
  created () {
    this.initData()
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
