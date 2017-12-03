<template>
    <div class="layout">
        <Menu mode="horizontal" theme="light" active-name="1">
            <Row type="flex">
              <Col span="5">
                <router-link :to="{
                  name: 'audit_list'
                }">
                  <div class="clouds-logo"></div>
                </router-link>
              </Col>
              <Col span="19">
                <Row type="flex">
                  <Col span="12">
                    <Row type="flex" justify="start" align="middle">
                        <Menu ref="clouds_menu" mode="horizontal" theme="light" :active-name="getActiveName()" @on-select="selectMenu">
                            <MenuItem name="audit">
                                申请流程
                            </MenuItem>
                            <MenuItem name="project_info">
                                应用管理
                            </MenuItem>
                            <MenuItem name="instance_info">
                                实例管理
                            </MenuItem>
                            <MenuItem name="template_list">
                                模板管理
                            </MenuItem>
                        </Menu>
                    </Row>
                  </Col>
                  <Col span="12">
                    <Row type="flex" justify="end" align="middle">
                        <Menu mode="horizontal" theme="light">
                            <Menu-item name="doc">
                            <span type="text" @click="goApiDoc()">
                              <i class="fa fa-code"></i>
                              API 文档
                            </span>
                            </Menu-item>
                            <Submenu name="user" style="margin-right: 18px;">
                              <template slot="title">
                                <i class="fa fa-user-o"></i>
                                {{ (profile && profile.userinfo) ? profile.userinfo.name : '...' }}
                              </template>
                              <Menu-item name="profile">
                                <Button type="text" @click="goProfile()">
                                  用户中心
                                </Button>
                              </Menu-item>
                              <Menu-item name="logout">
                                <Button type="text" @click="logout()">
                                  退出
                                </Button>
                              </Menu-item>
                            </Submenu>
                        </Menu>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
        </Menu>
        <div class="layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb-item>
                <router-link :to="{ name: 'audit_list' }">
                Home
                </router-link>
              </Breadcrumb-item>
              <Breadcrumb-item v-for="(bc, index) in getBreadcrumbArray()" :key="index">{{ bc }}</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; Powered by 新浪私有云平台
        </div>

        <Back-top></Back-top>
    </div>
</template>
<script>
import api from '@/api/api/api'
import lb from '@/api/lb/api'
import localstore from '@/api/localstore'
import { checkRequest } from '@/utils/help'
import {CAS_URL, SERVER_HOST, HOST} from '@/api/api/utils'

let vm = null

let menuList = [
  'audit',
  'instance_info',
  'project_info',
  'template_list'
]
export default {
  data () {
    return {
      menuList: menuList
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    routePath () {
      return this.$route.path
    },
    profile () {
      return this.$store.state.profile.profile
    }
  },
  watch: {
  },
  methods: {
    goApiDoc () {
      setTimeout(function () {
        window.open(SERVER_HOST + 'docs/', '_blank')
      }, 0)
    },
    getActiveName () {
      let key = this.routeName.split('_')[0] || 'audit_list'
      let filterMenu = this.menuList.filter(x => {
        return x.startsWith(key)
      })
      return filterMenu[0] || 'audit_list'
    },
    getBreadcrumbArray () {
      let paths = this.routePath.split('/')
      paths = paths.filter(x => {
        return x
      })
      return paths
    },
    updateActiveName () {
      this.$nextTick(() => {
        if (this.$refs.clouds_menu) {
          this.$refs.clouds_menu.updateActiveName()
        }
      })
    },
    selectMenu (name) {
      this.$router.push({
        name: name
      })
    },
    logout () {
      api.logout().end(function () {
      })
      vm.$Message.warning('正在退出 ...')
      localstore.rmUserAuth()
      setTimeout(function () {
        let logoutUrl = `${CAS_URL}login?service=http%3A%2F%2F${HOST}`
        // console.log('login url: ', logoutUrl)
        window.location.href = logoutUrl
      }, 500)
    },
    initProfile () {
      // getProfile
      api.getProfile().end(function (err, resp) {
        if (!checkRequest(resp)) {
          console.log('err', err)
          return
        }
        console.log('user: ', resp.body.userinfo.email, 'role: ', resp.body.role)
        vm.$store.dispatch('getProfile', resp.body)
      })
    },
    initResource () {
      // listUsers
      api.listUsers().end(function (err, resp) {
        if (!checkRequest(resp)) {
          console.log('err', err)
          return
        }
        vm.$store.dispatch('listUsers', resp.body.items)
      })

      // listLB
      lb.listLB().end(function (err, resp) {
        if (!checkRequest(resp)) {
          console.log('err', err)
          return false
        }
        let data = resp.body.items
        vm.$store.dispatch('listLBs', data)
      })

      // listTemplate
      lb.listTemplates().end(function (err, resp) {
        if (!checkRequest(resp)) {
          console.log('err', err)
          return false
        }
        vm.$store.dispatch('listTemplates', resp.body.items)
      })

      // listAllClusters
      lb.listClusters().end(function (err, resp) {
        if (!checkRequest(resp)) {
          console.log('err', err)
          return false
        }
        vm.$store.dispatch('listClustersAll', resp.body.items)
      })

      // listAllNodes
      lb.listNodes().end(function (err, resp) {
        if (!checkRequest(resp)) {
          console.log('err', err)
          return false
        }
        vm.$store.dispatch('listNodesAll', resp.body.items)
      })

      // listProjects
      lb.listProjects().end(function (err, resp) {
        if (!checkRequest(resp)) {
          console.log('err', err)
          return
        }
        vm.$store.dispatch('listProjects', resp.body.items)
      })
    }
    // setTree (data) {
    //   console.log('lbList change')
    //   let tmp = {}
    //   for (let x in data) {
    //     let t = data[x]
    //     tmp[t.id] = {
    //       id: t.id,
    //       text: t.name,
    //       type: 'lb',
    //       opened: false,
    //       children: null
    //     }
    //   }
    //   let tree = {
    //     'loadbalance-id': {
    //       id: 'loadbalance-id',
    //       text: 'loadbalance',
    //       type: 'root',
    //       opened: true,
    //       children: tmp
    //     }
    //   }
    //   vm.$store.dispatch('getTree', tree)
    // }
  },
  created () {
    vm = this
    this.initProfile()
    this.initResource()
    this.updateActiveName()
  }
}
</script>
<style scoped>
.height-100{
  width:100px;
}
.layout{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}
.layout-logo{
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-breadcrumb{
    padding: 10px 15px 0;
}
.layout-content{
  height: 100%;
  margin-top: -91px;
  padding-top: 91px;
  margin-bottom: -38px;
  padding-bottom: 38px;
}
.layout-content-main{
    overflow-y: auto;
    height: 100%;
    padding: 10px;
}
.layout-copy{
    text-align: center;
    padding: 10px;
    color: #999;
    background: #fff;
}
.clouds-logo{
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: .5rem 1rem;
  margin-right: 0;
  background-image: url(/static/img/logo.png);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: auto;
}
</style>
