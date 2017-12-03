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
                    <Input type="password" v-model="ruleForm.password" placeholder="请输入密码">
                        <span slot="prepend">
                            <Icon :size="14" type="locked"></Icon>
                        </span>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button @click="submitForm" type="primary" long :loading="logining">登录</Button>
                </FormItem>
            </Form>
          </div>
        </div>
    </div>
</template>

<script>
import localStore from '@/api/localstore'

export default {
  name: 'login',
  data () {
    return {
      logining: false,
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
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { validator: validaePass2 }
        ]
      },
      checked: true
    }
  },
  methods: {
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    },
    submitForm (ev) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.logining = true
          setTimeout(() => {
            // 访问登陆接口，返回验证信息，保存在store中
            // 如下，假设返回的信息是data
            let data = {token: 'token', secret: 'secret'}
            this.logining = false
            this.saveAuth(data)
          }, 1500)
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