<template>
    <div name="baseForm">
        <Card dis-hover style="width:50%">
            <p slot="title">
                <i class="fa fa-wpforms" aria-hidden="true"></i>
                表单
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                刷新
            </a>
            <Alert>
              <p>1.基础表单中包含了表单验证，表单提交，表单重置，为提交按钮添加提交状态、最后一个输入框添加回车提交事件。</p>
              <p>2.这个表单可以是table中信息的编辑页面。</p>

            </Alert>

            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="用户名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
                </FormItem>
                <FormItem label="城市" prop="city">
                    <Select v-model="formValidate.city" placeholder="请选择城市">
                        <Option value="beijing">北京</Option>
                        <Option value="shanghai">上海</Option>
                        <Option value="shenzhen">深圳</Option>
                    </Select>
                </FormItem>
                <FormItem label="时间">
                    <Row>
                        <Col span="11">
                            <FormItem prop="date">
                                <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="time">
                                <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="爱好" prop="interest">
                    <CheckboxGroup v-model="formValidate.interest">
                        <Checkbox label="Eat"></Checkbox>
                        <Checkbox label="Sleep"></Checkbox>
                        <Checkbox label="Run"></Checkbox>
                        <Checkbox label="Movie"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="简介" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." @keyup.enter.native="handleSubmit('formValidate')"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click.native="handleSubmit('formValidate')" :loading="loading">Submit</Button>
                    <Button type="ghost" @click.native="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
import api from '@/api/api'
import {checkRequest} from '@/utils/help'

let defaultForm = {
  name: '',
  mail: '',
  city: '',
  gender: '',
  interest: [],
  date: '',
  time: '',
  desc: ''
}
let ruleValidate = {
  name: [
    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
  ],
  mail: [
    { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
    { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
  ],
  city: [
    { required: true, message: 'Please select the city', trigger: 'change' }
  ],
  gender: [
    { required: true, message: 'Please select gender', trigger: 'change' }
  ],
  interest: [
    { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
    { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
  ],
  date: [
    { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
  ],
  time: [
    { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
  ],
  desc: [
    { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
  ]
}

export default {
  data () {
    return {
      loading: false,
      formValidate: defaultForm,
      ruleValidate: ruleValidate
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true
          api.testApiLogin(this.ruleForm).end((err, resp) => {
            this.loading = false
            if (!checkRequest(resp)) {
              console.log('err', err)
              return false
            }
            this.$Message.success('Success!')
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped>
</style>
