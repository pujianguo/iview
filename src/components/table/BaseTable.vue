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
                <li>2.显示复选框组件，通过selectionChange来监听iview的Table组件中的选中方法，返回选中项。此数据一般用于批量删除</li>
<<<<<<< HEAD
                <li>3.批量处理某个值，如批量只修改权重</li>
=======
>>>>>>> 758c176ce724a66673a23108c59f77d31f79b633
              </ul>
            </Alert>

            <NTable :nColumns="usertListColumns" :nData="userListTableData" :page="5" @selectionChange="selectionChange">
              <span slot="handleButtons">
                <Button type="info" @click="openAddModal">添加</Button>
                <Button type="warning" @click="batchUpdataWeightHandle" :disabled="selectedCount === 0" :loading="batchUpdataWeigtBtnLoading">修改权重<span v-if="selectedCount > 0"> ({{selectedCount}}) </span></Button>
                <Button type="error" @click="batchDeleteHandle" :disabled="selectedCount === 0" :loading="batchDeleteBtnLoading">删除<span v-if="selectedCount > 0"> ({{selectedCount}}) </span></Button>
              </span>
            </NTable>

        </Card>

        <!-- 编辑 -->
        <Modal v-model="editFormVisible" :mask-closable="false" :closable="false">
            <div slot="header">
                <h3> <i class="fa fa-wpforms" aria-hidden="true"></i> 编辑表单 </h3>
            </div>
            <div>
                <Form ref="formValidate" :model="editForm" :rules="ruleValidate" :label-width="80" v-if="editForm">
                      <FormItem label="用户名" prop="name">
                          <Input v-model="editForm.name" placeholder="请输入用户名"></Input>
                      </FormItem>
                      <FormItem label="性别" prop="sex">
                          <RadioGroup v-model="editForm.sex">
                              <Radio label="1">男{{editForm.sex}}</Radio>
                              <Radio label="0">女</Radio>
                          </RadioGroup>
                      </FormItem>
                      <FormItem label="年龄" prop="age">
                          <Input v-model="editForm.age" placeholder="请输入年龄"></Input>
                      </FormItem>
                      <FormItem label="生日" prop="birth">
                          <DatePicker type="date" placeholder="Select date" v-model="editForm.birth"></DatePicker>
                      </FormItem>
                      <FormItem label="地址" prop="addr">
                          <Input v-model="editForm.addr" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." @keyup.enter.native="editSubmit()"></Input>
                      </FormItem>
                </Form>
            </div>
            <div slot="footer">
              <Button type="text" @click.native="closeEditModal()">取消</Button>
              <Button type="primary" @click.native="saveHandle()" :loading="editSubmitBtnLoading">确定</Button>
            </div>
        </Modal>

        <!-- 修改权重 -->
        <Modal v-model="changeWeightModalVisible" :mask-closable="false">
            <b slot="header">修改权重</b>
            <Alert>本次共选择修改权重{{selectedCount}}个</Alert>
            <Table :columns="changeWeightColumns" :data="changeWeightTable" border></Table>
            <div slot="footer">
                <span>
                    <Button type="text" @click="changeWeightModalVisible = false">取消</Button>
                    <Button type="primary" @click="submitChangeWeight()">确定</Button>
                </span>
            </div>
        </Modal>
    </div>
</template>

<script>
import NTable from './NTable'
<<<<<<< HEAD
import {jsonData} from './list'
=======
import {nCopy} from '@/utils/help'

>>>>>>> 758c176ce724a66673a23108c59f77d31f79b633
let defaultFormData = {
  name: '',
  sex: 1,
  age: 20,
  birth: '',
  addr: ''
}
let ruleValidate = {
  name: [
    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
  ],
  sex: [
    { required: true, message: 'Please select sex', trigger: 'change' }
  ],
  age: [
    { required: true, type: 'number', message: 'The age cannot be empty', trigger: 'blur' }
  ],
  birth: [
    { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
  ],
  addr: [
    { required: true, message: 'Please enter a personal introduction', trigger: 'blur' }
  ]
}
export default {
  name: 'basetable',
  components: {
    NTable
  },
  data () {
    return {
      jsonData: jsonData,
      ruleValidate: ruleValidate,
      editForm: null,
      editFormVisible: false,
      editSubmitBtnLoading: false,
      selectedList: [], // 列表中选中的项
      batchDeleteBtnLoading: false,
      batchUpdataWeigtBtnLoading: false,
      changeWeightModalVisible: false,
      changeWeightList: [], // 负责保存修改数据
      changeWeightTable: [], // 负责展示的数据
      changeWeightColumns: [
        {
          title: 'Endpoint',
          key: 'endpoint'
        },
        {
          title: 'Weight',
          key: 'weight'
        },
        {
          title: 'NewWeight',
          key: 'newWeight',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.newWeight,
                number: true
              },
              style: {
                width: '60px',
                marginRight: '5px'
              },
              on: {
                'input': (value) => {
                  let member = params.row
                  member.newWeight = value
                  Vue.set(this.changeWeightList, params.row._index, member)
                }
              }
            })
          }
        }
      ],
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
          width: 100,
          render: (h, params) => {
            return params.row.index
          }
        },
        {
          title: '姓名',
          key: 'name',
          width: 120,
          render: (h, params) => {
            return params.row.name
          }
        },
        {
          title: '性别',
          key: 'sex',
          width: 80,
          render: (h, params) => {
            return params.row.sex
          }
        },
        {
          title: '年龄',
          key: 'addr',
          width: 80,
          render: (h, params) => {
            return params.row.age
          }
        },
        {
          title: '生日',
          key: 'addr',
          width: 120,
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
          width: 130,
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
                    this.openEditModal(params.row.index)
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
    },
    userList () {
      return this.$store.state.user.userList
    }
  },
  watch: {
    userList () {
      this.userListTableData = this.userList.map((x, i) => {
        x.index = i
        return x
      })
    }
  },
  methods: {
    initData () {
      console.log('initData')
      this.$store.dispatch('listUsers', [])
      this.$store.dispatch('listUsers', nCopy(jsonData))
    },
    selectionChange (val) {
      this.selectedList = val
    },

    // edit about
    openAddModal () {
      this.editForm = Object.assign({}, defaultFormData)
      this.editFormVisible = true
    },
    openEditModal (index) {
      this.editForm = Object.assign({}, this.userListTableData[index])
      console.log(this.editForm)
      this.editFormVisible = true
    },
    closeEditModal () {
      this.editFormVisible = false
      this.$refs['formValidate'] && this.$refs['formValidate'].resetFields()
    },
    saveHandle () {
      let data = this.editForm
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          if (data.id) {
            this.editSubmit(data)
          } else {
            this.addSubmit(data)
          }
        } else {
          this.$Message.error('表单验证失败')
        }
      })
    },
    async addSubmit (data) {
      this.editSubmitBtnLoading = true
      // let res = await func(data)
      this.editSubmitBtnLoading = false
      // if (!res) {
      //   failed
      //   return
      // }
      this.editFormVisible = false
    },
    async editSubmit (data) {
      this.editSubmitBtnLoading = true
      // let res = await func(data)
      this.editSubmitBtnLoading = false
      // if (!res) {
      //   failed
      //   return
      // }
      this.editFormVisible = false
    },

    // delete
    deleteHandle (index) {
      let data = this.userListTableData[index]
      console.log('store data')
      console.log(this.getUserById(data.id))

      this.$Modal.confirm({
        title: '确认删除',
        content: `确认删除该记录吗？`,
        onOk: () => {
          this.deleteSubmit(data)
        },
        onCancel: () => {
          this.$Message.info('取消删除')
        }
      })
    },
    async deleteSubmit (data) {
      // await func()
      // let res = await func()
      // if (!res) {
      //   // faild
      // }
    },
    // 批量删除
    batchDeleteHandle () {
      var ids = this.selectedList.map(item => item.id).toString()
      this.$Modal.confirm({
        title: '确认删除',
        content: `确认删除选中的 ${this.selectedCount} 条记录吗？`,
        onOk: () => {
          this.batchDeleteSubmit(ids)
        },
        onCancel: () => {
          this.$Message.info('取消删除')
        }
      })
    },
    async batchDeleteSubmit (data) {
      this.batchDeleteBtnLoading = true
      // let res = await func()
      // if (!res) {
      //   // faild
      // }
      this.batchDeleteBtnLoading = false
    },

<<<<<<< HEAD
    // 批量修改权重
    batchUpdataWeightHandle () {
      let list = []
      for (let x of this.userListTableData) {
        if (this.selected.indexOf(x.index) > -1) {
          list.push(x)
        }
      }
      this.changeWeightTable = list.map((x, index) => {
        x._index = index
        x.newWeight = ''
        return x
      })
      this.changeWeightList = nCopy(this.changeWeightTable)
      this.changeWeightModalVisible = true
    },
    submitChangeWeight () {
      let rmList = []
      let addList = []
      var r = /^\+?[1-9][0-9]*$/
      for (let i in this.changeWeightList) {
        let x = this.changeWeightList[i]
        if (x.newWeight && x.newWeight !== x.weight) {
          console.log(x.newWeight)
          if (!r.test(x.newWeight)) {
            let row = parseInt(i) + 1
            this.$Message.warning(`第${row}行权重格式不正确`)
            return false
          }
          rmList.push({
            endpoint: x.endpoint,
            weight: x.weight,
            paramData: x.paramData
          })
          addList.push({
            endpoint: x.endpoint,
            weight: parseInt(x.newWeight),
            paramData: x.paramData
          })
        }
      }
      if (rmList.length === 0) {
        this.$Message.warning('没有权重变更')
        return false
      }
      console.log('list')
      console.log(rmList)
      console.log(addList)
      let data = {
        clusterIds: [this.clusterId],
        rms: rmList,
        adds: addList
      }
      this.changeWeightBtnLoading = true
      api.updateMembers(this.projectId, data).end((err, resp) => {
        this.changeWeightBtnLoading = false
        if (!checkRequest(resp)) {
          console.log('err', err)
          return
        }
        this.selected = []
        this.changeWeightTable = []
        this.changeWeightList = []
        this.addToAudit(data, resp.body.items, 'update')
      })
      this.changeWeightModalVisible = false
    },
=======
    // 功能方法
    getUserById (id) {
      return this.$store.getters.getUserById(id)
    }
>>>>>>> 758c176ce724a66673a23108c59f77d31f79b633
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped>
</style>
