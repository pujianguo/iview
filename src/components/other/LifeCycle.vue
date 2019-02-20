<template>
    <div name="lifeCycle">
        <h1>生命周期</h1>
        <input type="text" v-model="message">
        <input type="text" v-model="messageb">
        {{message}}
        <Button type="primary" id="btn-click">click</Button>
        <Button type="info" @click="destroy">destroy</Button>

        <pre>
一个组件从开始到最后消亡所经历的各种状态，就是一个组件的生命周期。 Vue在执行过程中会自动调用生命周期钩子函数，只需要提供这些钩子函数即可 钩子函数的名称都是Vue中规定好的

挂载阶段：
beforeCreate：数据劫持之前被调用，无法访问methods，data,computed上的方法或数据
created：实例已经创建完成之后被调用。但挂载阶段还没开始，$el 属性目前不可见。常用于ajax发送请求获取数据
beforeMounted: 在挂载开始之前被调用
mounted: vue实例已经挂载到页面中，可以获取到el中的DOM元素，进行DOM操作

更新阶段：
当dom有变化时就会触发，如页面上有{{message}}, 当message变化之后就会触发。
beforeUpdated: 更新数据之前调用
updated：组件 DOM 已经更新

销毁阶段：
使用vm.$destroy()方法可触发，完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
在大多数场景中你不应该调用这个方法。最好使用 v-if 和 v-for 指令以数据驱动的方式控制子组件的生命周期。
当组建移除时也会自动触发。
beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
destroyed： Vue 实例销毁后调用
</pre>

        
    </div>
</template>

<script>
let vm = null
export default {
  name: 'lifeCycle',
  components: {
  },
  data () {
    return {
      message: 'content',
      messageb: ''
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    destroy () {
      this.$destroy()
    }
  },
  beforeCreate () {
    console.group('---beforeCreate---')
    console.log('message', this.message)
    console.log('el', this.$el)
    console.groupEnd('---beforeCreate---')
  },
  created () {
    vm = this
    console.group('---created---')
    console.log('发送ajax')
    // setTimeout( () => {
    //   this.message = 123
    // },1000)
    console.log('message', this.message)
    console.log('el', this.$el)
    console.groupEnd('---created---')
  },
  beforeMount () {
    console.group('---beforeMount---')
    console.log('message', this.message)
    console.log('el', this.$el)
    console.groupEnd('---beforeMount---')
  },
  mounted () {
    console.group('---mounted---')
    console.log('message', this.message)
    console.log('el', this.$el)
    // 操作DOM
    console.log('操作dom')
    document.querySelector('#btn-click').onclick = function () {
      vm.message = 'aaaa'
    }
    console.groupEnd('---mounted---')
  },
  beforeUpdate () {
    console.group('---beforeUpdated---')
    console.log(this.message)
    console.log(this.$el)
    console.groupEnd('---beforeUpdated---')
  },
  updated () {
    console.group('---updated---')
    console.log(this.message)
    console.log(this.$el)
    console.groupEnd('---updated---')
  },
  beforeDestroy () {
    console.group('---beforeDestroy---')
    console.log(this.message)
    console.log(this.$el)
    console.groupEnd('---beforeDestroy---')
  },
  destroyed () {
    console.group('---destroyed---')
    console.log(this.message)
    console.log(this.$el)
    // document.removeEventListener('click',this.__handle__)
    console.groupEnd('---destroyed---')
  }
}
</script>

<style scoped>
</style>
