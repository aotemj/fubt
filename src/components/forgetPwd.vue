<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <div class="login-box">
        <h4>找回密码</h4>
        <div class="username">
          <input type="text" disabled placeholder="手机号找回"><router-link to="/changePwdByPhone" class="username-tips blue">点击找回>></router-link>
        </div>
        <div class="pwd">
          <input type="password" disabled placeholder="邮箱找回"><router-link to="/changePwdByEmail" class="pwd-tips blue">点击找回>></router-link>
        </div>
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
    font-size: 20px;

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
