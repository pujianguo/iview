<template>
    <div name="basetable">
        <Card dis-hover>
            <p slot="title">
                <i class="fa fa-wpforms" aria-hidden="true"></i>
                基础表格
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                刷新
            </a>
            <Alert>
              简介
            </Alert>

            <p>content</p>
        </Card>
    </div>
</template>

<script>
let vm = null
export default {
  name: 'basetable',
  data () {
    return {
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
