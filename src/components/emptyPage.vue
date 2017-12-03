<template>
  <div name="empty_page">
    emptyPage
  </div>
</template>

<script>
let vm = null
export default {
  name: 'emptyPage',
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
