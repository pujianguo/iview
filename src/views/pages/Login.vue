<template>
  <div>
    <p>Login...</p>
    <p>{{msg}}</p>
  </div>
</template>

<script>
import localStore from '@/api/localstore'

export default {
  name: 'Login',
  data () {
    return {
      msg: ''
    }
  },
  created: function () {
    const [token, secret] = [this.$route.query.token, this.$route.query.secret]
    if (!token || !secret) {
      // todo
      this.msg = 'invalid token or secret.'
      return
    }
    localStore.setUserAuth({token: token, secret: secret})
    window.location.href = '/'
  }
}
</script>
