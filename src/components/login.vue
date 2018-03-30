<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <div class="login-box">
        <h4>登录</h4>
       <div class="username">
         <input type="text" placeholder="请输入手机号/邮箱" v-model="username"><span class="username-tips">正确提示</span>
       </div>
        <div class="pwd">
          <input type="password" placeholder="请输入密码" v-model="password"><span class="pwd-tips">错误提示</span>
        </div>
        <div class="todos">
          <router-link to="/">忘记密码？</router-link><router-link to="/register">免费注册</router-link>
        </div>
        <input type="button" value="登录" class="login-btn" v-on:click="login">
      </div>

    </div>
  </div>
</template>
<script>
  import Header from "./header"
  import common from "../kits/domain"
  import {ajax} from "../kits/http"
  export default {
    data(){
      return {
        username:null,
        password:null,
      }
    },
    methods:{
      login(){
        console.log('123');
        let loginUrl = common.apidomain+'login';

        let formData = new FormData();
        formData.append('loginName',this.username);
        formData.append('password',this.password);

        ajax(loginUrl,'post',data,(res)=>{
          console.log(res);
        })
      }
    },
    created(){},
    components:{
      Header,
    }
  }
</script>
<style scoped>
  .inner-box{
    width:900px;
    height:400px;
    /*background-color: green;*/
    margin:200px auto;
    text-align: left;
  }
  .login-box{
    font-size: 16px;

  }
  .username,.pwd{
    position: relative;
  }
  .login-box input {
    border:1px solid #fff;
    margin-bottom:20px;
    padding:10px 20px;
    width:400px;
  }
  .username-tips,.pwd-tips{
    position: absolute;
    /*right:0px;*/
    left:410px;
    font-size: 12px;
    top:50%;
    transform: translateY(-50%);
  }
  .pwd-tips{
    /*top:110px;*/
  }
 .todos a {
   color:#fff;
   font-size: 12px;
   flex:1;
 }
 .todos{
   /*border:1px solid #fff;*/
   position: relative;
   width:150px;
   display:flex;
 }

  .todos::before{
    position: absolute;
    content:'';
    height:10px;
    width:1px;
    background-color: #fff;
    left:64px;
    top:50%;
    transform: translateY(-50%);
  }
  .login-btn{
    margin-top:20px;
    width:100px !important;
    border:none !important;
    background-color:#445895;

  }
</style>
