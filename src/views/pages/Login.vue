<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
          <div class="ms-login">
            <Form ref="ruleForm" :model="ruleForm" :rules="rules">
                <FormItem prop="username">
                    <Input v-model="ruleForm.username" placeholder="请输入用户名">
                        <span slot="prepend">
                            <Icon :size="16" type="person"></Icon>
                        </span>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input :type="pwdType" v-model="ruleForm.password" placeholder="请输入密码" @keyup.enter.native="submitForm" icon="ios-eye" @on-click="showPwd">
                        <span slot="prepend">
                            <Icon :size="14" type="locked"></Icon>
                        </span>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button @click="submitForm" type="primary" long :loading="loading">登录</Button>
                </FormItem>
            </Form>
          </div>
        </div>
    </div>
</template>

<script>
import localStore from '@/api/localstore'
import api from '@/api/api'
import {checkRequest} from '@/utils/help'

export default {
  name: 'login',
  data () {
    return {
      loading: false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          // { validator: validaePass }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '最少6位密码', trigger: 'blur' }
          // { validator: validaePass2 }
        ]
      },
      pwdType: 'password'
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    },
    submitForm (ev) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          api.testApiLogin(this.ruleForm).end((err, resp) => {
            this.loading = false
            if (!checkRequest(resp)) {
              console.log('err', err)
              return false
            }
            this.saveAuth(resp.body)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveAuth (data) {
      // const [token, secret] = [this.$route.query.token, this.$route.query.secret]
      const [token, secret] = [data.token, data.secret]
      if (!token || !secret) {
        // todo
        this.msg = 'invalid token or secret.'
        return
      }
      localStore.setUserAuth({token: token, secret: secret})
      window.location.href = '/'
    }
  }
}
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
    background: #324157;
  }
  .ms-title{
    position: absolute;
    top:50%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:350px;
    height:220px;
    margin:-150px 0 0 -190px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
</style>