<template>
  <div>
    <Alert>使用marked解析merkdown内容</Alert>
    <div style="border: 1px solid #e5e8ee; padding: 20px;margin-top: 30px;">
      <div v-html="compiledMarkdown" style="min-height: 120px;"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'

export default{
  data () {
    return {
      content: content
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.content, { sanitize: true })
    }
  },
  methods: {
    markdown() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      })
    }
  },
  created () {
    this.markdown() // 配置，不配置也可以，将使用默认配置
  }
}

let content = 'i am a ~~tast~~ **test**.'

</script>
