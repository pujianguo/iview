<template>
    <div name="event">
        <h1>事件</h1>
        <p> click: <Button type="primary" @click="onClick">click</Button> </p>
        <p> keydown: <input type="text" name="name" @keydown="onKeyDown"> </p>
        <p> keydown.enter: <input type="text" name="name" @keydown.enter="onKeyDown"> </p>
        <h1> 动态组件 </h1>
        <p :is="comToRender" :param="param"></p>
    </div>
</template>

<script>
import ComA from './ComA'

let vm = null

export default {
  name: 'event',
  components: {
    ComA
  },
  data () {
    return {
      param: 'i am parent component data',
      comToRender: 'ComA'
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    onClick (event) {
      console.log(event)
    },
    onKeyDown (event) {
      console.log(event)
      console.log(event.key)
      console.log(event.keyCode)
    },
    onKeyUp (event) {
      console.log(event)
    }
  },
  mounted () {
    vm = this
    console.log(vm)
  }
}
</script>

<style scoped>
</style>
