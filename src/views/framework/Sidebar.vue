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
                <MenuItem name="codemirror">CodeMirror</MenuItem>
            </Submenu>
            <Submenu name="other">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    其他
                </template>
                <MenuItem name="event">事件</MenuItem>
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
      console.log(this.$route.name)
      return this.$route.name
    }
  },
  methods: {
    selectMenu (name) {
      console.log(name)
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
    width: 250px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
