<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <div class="login-box">
        <h4>登录</h4>
        <div class="username">
          <input type="text" placeholder="请输入手机号/邮箱" v-model.trim="username">
        </div>
        <div class="pwd">
          <input type="password" placeholder="请输入密码" v-model.trim="password">
        </div>
        <div class="todos">
          <router-link to="/forgetPwd">忘记密码？</router-link>
          <router-link to="/register">免费注册</router-link>
        </div>
        <div class="false-tips fz12"><i v-show="errorMsg"></i>{{errorMsg}}</div>
        <input type="button" :disabled="logging" v-model="loginBtn" class="login-btn" v-on:click="login">
      </div>

    </div>
  </div>
</template>
<script>
  import Header from "./header"
  import common from "../kits/domain"
  import {ajax} from "../kits/http"

  export default {
    data() {
      return {
        username: null,
        password: null,
        errorMsg:'',//错误提示
        loginBtn:'登录',
        logging:false,//登录中
      }
    },
    methods: {
      login() {

        if(!this.username){
          this.errorMsg = '邮箱或手机号不能为空';
          return;
        }else if(!this.password){
          this.errorMsg = '密码不能为空';
          return;
        }else if(this.password.length<6){
          this.errorMsg = '密码长度不能小于6!'
          return;
        }else{
          this.errorMsg = '';
        }

        this.loginBtn = '登录中...';
        this.logging=true;

        let loginUrl = common.apidomain + 'login';

        let formData = new FormData();
        formData.append('loginName', this.username);
        formData.append('password', this.password);

        ajax(loginUrl, 'post', formData, (res) => {
          this.loginBtn = '登录';
          this.logging=false;
          // if(res.data.){}
          if(res.data.code!==200){
            if(res.data.msg =='帐号不存在，<a href="/user/register.html">去注册>></a>！'){
              this.errorMsg='账号不存在！请核对后重新输入';
              return;
            }
            this.errorMsg = res.data.msg;
            return;
          }
          console.log(res.data);

          this.$store.commit('userLogin', true)
          if(this.$store.state.routerTo){
            this.$router.push({path:this.$store.state.routerTo})

          }else{
            this.$router.push({path:'/'})
          }
        });


      }
    },
    created() {
    },
    components: {
      Header,
    }
  }
</script>
<style scoped>
  .inner-box {
    width: 900px;
    height: 400px;
    /*background-color: green;*/
    margin: 200px auto;
    text-align: left;
  }

  .login-box {
    font-size: 16px;

  }

  .username, .pwd {
    position: relative;
  }

  .login-box input {
    border: 1px solid #fff;
    margin-bottom: 20px;
    padding: 10px 20px;
    width: 400px;
  }

  .username-tips, .pwd-tips {
    position: absolute;
    /*right:0px;*/
    left: 410px;
    font-size: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  .pwd-tips {
    /*top:110px;*/
  }

  .todos a {
    color: #fff;
    font-size: 12px;
    flex: 1;
  }

  .todos {
    /*border:1px solid #fff;*/
    position: relative;
    width: 150px;
    display: flex;
  }

  .todos::before {
    position: absolute;
    content: '';
    height: 10px;
    width: 1px;
    background-color: #fff;
    left: 64px;
    top: 50%;
    transform: translateY(-50%);
  }

  .login-btn {
    margin-top: 20px;
    width: 100px !important;
    border: none !important;
    background-color: #445895;

  }
  /*错误提示*/
  .false-tips{
    margin-top:20px;
    color:#e9494d;
  }
  .false-tips i {
    display:inline-block;
    vertical-align: middle;
    margin-right:5px;
    width:16px;
    height:16px;
    background: url('../assets/errorIcon.png') no-repeat center center;
    -webkit-background-size: 16px 16px;
    background-size: 16px 16px;
  }
</style>
