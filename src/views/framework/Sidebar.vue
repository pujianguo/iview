<template>
    <div class="sidebar">
        <Menu theme="dark" :active-name="getActiveName" @on-select="selectMenu" :open-names="['form']">
            <Submenu name="form">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    表单
                </template>
                <MenuItem name="baseform">基本表单</MenuItem>
                <MenuItem name="edit">编辑器</MenuItem>
                <MenuItem name="markdown">MarkDown</MenuItem>
                <MenuItem name="markdownshow">MarkDown展示</MenuItem>
                <MenuItem name="codemirror">CodeMirror</MenuItem>
                <MenuItem name="upload">文件上传</MenuItem>
            </Submenu>
            <Submenu name="table">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    表格
                </template>
                <MenuItem name="basetable">基础表格</MenuItem>
            </Submenu>
            <Submenu name="other">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    其他
                </template>
                <MenuItem name="lifeCycle">生命周期</MenuItem>
                <MenuItem name="event">事件</MenuItem>
                <MenuItem name="async">异步请求</MenuItem>
                <MenuItem name="network">network</MenuItem>
                <MenuItem name="transitioncss">CSS过渡</MenuItem>
                <MenuItem name="transitionjs">JS过渡</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    getActiveName () {
      return this.$route.name
    }
  },
  methods: {
    selectMenu (name) {
      this.$router.push({
        name: name
      })
    }
  }
}
</script>

<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    width: 240px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
    overflow-y: scroll;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
