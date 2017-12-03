<template>
    <div class="sidebar">
        <Menu theme="dark" :active-name="onRoutes" @on-select="selectMenu" :open-names="['form']">
            <Submenu name="form">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    表单
                </template>
                <MenuItem name="baseform">基本表单</MenuItem>
                <MenuItem name="edit">编辑器</MenuItem>
                <MenuItem name="markdown">MarkDown</MenuItem>
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
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    selectMenu (name) {
      console.log(name)
      this.$router.push({
        name: name
      })
    },
    getActiveName () {
      return this.$route.path.replace('/', '')
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
