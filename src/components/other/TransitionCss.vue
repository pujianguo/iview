<template>
    <div name="transition_css">
        <Card dis-hover>
            <p slot="title">
                <i class="fa fa-wpforms" aria-hidden="true"></i>
                title
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                刷新
            </a>
            <Alert>
              简介
            </Alert>

            <div>
              <button @click="show = !show">Toggle</button>
              <transition name="fade">
                <p v-show="show">i am show</p>
              </transition>
            </div>
        </Card>
    </div>
</template>

<script>
let vm = null
export default {
  name: 'transitionCss',
  data () {
    return {
      show: true
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-out;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
