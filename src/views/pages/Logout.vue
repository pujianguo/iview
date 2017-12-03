<template>
  <div>
    <p>Logout...</p>
  </div>
</template>

<script>
import localStore from '@/api/localstore'
export default {
  name: 'Logout',
  methods: {
    logout () {
      // api.logout().end(function () {
      // })
      this.$Message.warning('正在退出 ...')
      localStore.rmUserAuth()
      setTimeout(() => {
        this.$router.push({
          name: 'login'
        })
      }, 500)
    }
  },
  created () {
    this.logout()
  }
}
</script>
