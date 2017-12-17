<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <Row type="flex">
              <Col span="5">
                <router-link :to="{
                  name: 'project_info'
                }">
                  <div class="clouds-logo"></div>
                </router-link>
              </Col>
              <Col span="19">
                  <Row type="flex" justify="end" align="middle">
                      <Menu mode="horizontal" theme="dark">
                          <Submenu name="user" style="margin-right: 18px;">
                            <template slot="title">
                              <i class="fa fa-user-o"></i>
                              test
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
        </Menu>

       <!--  <Row type="flex">
            <Col span="5" class="layout-menu-left">
                <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left"></div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </template>
                        <MenuItem name="1-1">Option 1</MenuItem>
                        <MenuItem name="1-2">Option 2</MenuItem>
                        <MenuItem name="1-3">Option 3</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </template>
                        <MenuItem name="2-1">Option 1</MenuItem>
                        <MenuItem name="2-2">Option 2</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </template>
                        <MenuItem name="3-1">Option 1</MenuItem>
                        <MenuItem name="3-2">Option 2</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="19">
                <div class="layout-header"></div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">Home</BreadcrumbItem>
                        <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                        <BreadcrumbItem>iView</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">Content</div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row> -->

       <!--  <div class="layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb-item>
                <router-link :to="{ name: 'project_info' }">
                Home
                </router-link>
              </Breadcrumb-item>
              <Breadcrumb-item v-for="(bc, index) in getBreadcrumbArray()" :key="index">{{ bc }}</Breadcrumb-item>
            </Breadcrumb>
        </div> -->
        <div class="layout-content">
            <div class="layout-content-main">
                    <Row :gutter="16" class="height-100">
                        <Col span="5" class="height-100">
                            <Menu theme="dark" active-name="1-2" :open-names="['1']">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-paper"></Icon>
                                        内容管理
                                    </template>
                                    <MenuItem name="1-1">文章管理</MenuItem>
                                    <MenuItem name="1-2">评论管理</MenuItem>
                                    <MenuItem name="1-3">举报管理</MenuItem>
                                </Submenu>
                                <Submenu name="2">
                                    <template slot="title">
                                        <Icon type="ios-people"></Icon>
                                        用户管理
                                    </template>
                                    <MenuItem name="2-1">新增用户</MenuItem>
                                    <MenuItem name="2-2">活跃用户</MenuItem>
                                </Submenu>
                                <Submenu name="3">
                                    <template slot="title">
                                        <Icon type="stats-bars"></Icon>
                                        统计分析
                                    </template>
                                    <MenuGroup title="使用">
                                        <MenuItem name="3-1">新增和启动</MenuItem>
                                        <MenuItem name="3-2">活跃分析</MenuItem>
                                        <MenuItem name="3-3">时段分析</MenuItem>
                                    </MenuGroup>
                                    <MenuGroup title="留存">
                                        <MenuItem name="3-4">用户留存</MenuItem>
                                        <MenuItem name="3-5">流失用户</MenuItem>
                                    </MenuGroup>
                                </Submenu>
                            </Menu>
                        </Col>
                        <Col span="19" class="height-100">
                            <Card :bordered="false" dis-hover class="height-100" style="overflow: auto;">
                                <p slot="title">
                                    <i class="fa fa-list-alt" aria-hidden="true"></i>
                                    资源申请列表
                                </p>
                                <Button type="text" slot="extra" @click="refresh()">
                                  <i class="fa fa-refresh" aria-hidden="true"></i>
                                  刷新
                                </Button>
                            </Card>
                            <!-- <router-view></router-view> -->
                        </Col>
                  </Row>
            </div>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; Powered by 新浪私有云平台
        </div>

        <Back-top></Back-top>
    </div>
</template>
<script>

export default {
  data () {
    return {
    }
  },
  computed: {
    routePath () {
      return this.$route.path
    }
  },
  watch: {
  },
  methods: {
    selectMenu (name) {
      console.log(name)
    },
    getBreadcrumbArray () {
      let paths = this.routePath.split('/')
      paths = paths.filter(x => {
        return x
      })
      return paths
    }
  },
  created () {
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
  /*border: 1px solid #d7dde4;*/
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
  margin-bottom: -7px;
  padding-bottom: 7px;
}
.layout-content-main{
    overflow-y: auto;
    height: 100%;
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

.main-position{
  position: absolute;
  top: 101px;
  bottom: 48px;
  left: 8px;
  right: 8px;
}
</style>
