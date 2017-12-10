<template>
    <div name="markdown">
        <Card dis-hover>
            <p slot="title">
                <i class="fa fa-wpforms" aria-hidden="true"></i>
                MarkDown
            </p>
            <a href="#" slot="extra" @click.prevent="refresh()">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                刷新
            </a>
            <Alert>
                <p>mavonEditor：
                <a href="https://github.com/hinesboy/mavonEditor" target="_blank">Git</a>，
                <a href="https://hinesboy.github.io/mavonEditor/dist" target="_blank">文档</a>
                <p>
                <p>既然用了markdown语法了，那么就有一个很实际的问题了。要怎么在前台展示数据呢？</p>
                <p>这个时候就需要解析markdown语法了。可以使用 <a href="https://github.com/miaolz123/vue-markdown" target="_blank">vue-markdown</a>：一个基于vue.js的markdown语法解析插件。（这里不作展开，有需要自行了解）</p>
            </Alert>

            <mavonEditor :readmodel="true" v-model="value"></mavonEditor>
        </Card>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

let vm = null
export default {
  name: 'markdown',
  components: {
    mavonEditor
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  mounted () {
    vm = this
    console.log(vm)
  }
}
</script>

<style scoped>
</style>
