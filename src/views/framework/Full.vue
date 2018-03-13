<template>
    <div class="">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; Powered by 新浪私有云平台
        </div>

        <Back-top></Back-top>
    </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import api from '@/api/api/api'
import {checkRequest} from '@/utils/help'
export default {
  components: {
    vHead, vSidebar
  },
  methods: {
    getData () {
      api.getData().end((err, resp) => {
        if (!checkRequest(resp)) {
          console.log('err', err)
          return
        }
        console.log(resp)
      })
    }
  },
  created () {
    // this.getData()
  }
}
</script>

<style scoped>
.content{
  background: none repeat scroll 0 0 #fff;
  position: absolute;
  left: 240px;
  right: 0;
  top: 70px;
  bottom: 0;
  width: auto;
  padding: 40px;
  box-sizing: border-box;
  overflow-y: scroll;
}
.layout-copy{
    text-align: center;
    padding: 10px;
    color: #999;
    background: #fff;
}
</style>
