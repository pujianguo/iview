<template>
    <div name="basetable">
        <Card dis-hover>
            <p slot="title">
                <i class="fa fa-wpforms" aria-hidden="true"></i>
                基础表格
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                刷新
            </a>
            <Alert>
              简介: 
              <ul>
                <li>1.通过插槽来实现添加、删除按钮在导航栏的显示</li>
                <li>2.显示复选框组件，通过selectionChange来监听iview的Table组件中的选中方法，返回选中项</li>
              </ul>
            </Alert>
            <NTable :nColumns="usertListColumns" :nData="userListTableData" :page="5" @selectionChange="selectionChange">
              <span slot="handleButtons">
                <Button type="info" @click="addHandle">添加</Button>
                <Button type="error" @click="batchDeleteHandle" :disabled="selectedCount === 0" :loading="batchDeleteBtnLoading">删除<span v-if="selectedCount > 0"> ({{selectedCount}}) </span></Button>
              </span>
            </NTable>
        </Card>
    </div>
</template>

<script>
import {jsonData} from './list'
import NTable from './NTable'
let vm = null

export default {
  name: 'basetable',
  components: {
    NTable
  },
  data () {
    return {
      selectedList: [], // 列表中选中的项
      batchDeleteBtnLoading: false,
      userListTableData: [],
      usertListColumns: [
        // {
        //   title: '',
        //   key: 'checked',
        //   render: (h, params) => {
        //     return h('Checkbox', {
        //       props: {
        //         value: this.selected.indexOf(params.row.index) >= 0
        //       },
        //       on: {
        //         'on-change': (value) => {
        //           if (value) {
        //             this.selected.push(params.row.index)
        //           } else {
        //             let i = this.selected.indexOf(params.row.index)
        //             if (i >= 0) {
        //               this.selected.splice(i, 1)
        //             }
        //           }
        //         }
        //       }
        //     })
        //   }
        // },
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'index',
          render: (h, params) => {
            return params.row.index
          }
        },
        {
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return params.row.name
          }
        },
        {
          title: '性别',
          key: 'sex',
          render: (h, params) => {
            return params.row.sex
          }
        },
        {
          title: '年龄',
          key: 'addr',
          render: (h, params) => {
            return params.row.age
          }
        }, 
        {
          title: '生日',
          key: 'addr',
          render: (h, params) => {
            return params.row.birth
          }
        },
        {
          title: '地址',
          key: 'addr',
          render: (h, params) => {
            return params.row.addr
          }
        },
        {
          title: '操作',
          key: 'option',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.editHandle(params.row.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteHandle(params.row.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  computed: {
    selectedCount () {
      return this.selectedList.length
    }
  },
  watch: {
  },
  methods: {
    initData () {
      this.userListTableData = jsonData.map((x, i) => {
        x.index = i
        return  x
      })
    },
    selectionChange (val) {
      this.selectedList = val
    },
    addHandle () {
      console.log('add')
    },
    editHandle (index) {
      let data = jsonData[index]
      console.log(data)
    },
    deleteHandle (index) {
      let data = jsonData[index]
      console.log(data)
      this.$Modal.confirm({
        title: '确认删除',
        content: `确认删除该记录吗？`,
        onOk: () => {
          this.$Message.info('删除')
        },
        onCancel: () => {
          this.$Message.info('取消删除')
        }
      })
    },
    batchDeleteHandle () {
      var ids = this.selectedList.map(item => item.id).toString()
      this.$Modal.confirm({
        title: '确认删除',
        content: `确认删除选中的 ${this.selectedCount} 条记录吗？`,
        onOk: () => {
          this.batchDeleteBtnLoading = true
          // async 操作
          this.batchDeleteBtnLoading = false
          this.$Message.info('删除')
        },
        onCancel: () => {
          this.$Message.info('取消删除')
        }
      })
    }
  },
  mounted () {
    vm = this
    this.initData()
  }
}
</script>

<style scoped>
</style>
