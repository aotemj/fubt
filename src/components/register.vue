<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <h4><span v-bind:class="{active:activeId==1}" v-on:click="activeId=1">手机注册</span><span v-bind:class="{active:activeId==2}" v-on:click="activeId=2">邮箱注册</span></h4>
      <!--电话注册-->
      <div class="mobileReg-box" v-show="activeId==1">
        <!--国家选取-->
        <div class="select-box">
          <select class="inner-box">
            <option value="">中国大陆（China）</option>
            <option value="">中国大陆（China）</option>
          </select>
        </div>
        <!--电话-->
        <div class="select-box clearfix">
          <select class="mobile-box fl" name="">
            <option value="">+86</option>
          </select>
          <input class="mobile-input fl" type="text" name="">
        </div>
        <div class="select-box">
          <input type="text" name="" placeholder="验证码">
        </div>
        <div class="select-box verify-box">
          <input type="text" name="" placeholder="短信验证码">
          <input class="verify-btn middle fz12" type="button" value="发送验证码">
        </div>
      </div>
      <!--邮箱注册-->
      <div class="emailReg-box mobileReg-box" v-show="activeId==2">

        <div class="select-box">
          <input type="text" name="" placeholder="邮箱地址">
        </div>
        <div class="select-box">
          <input type="text" name="" placeholder="验证码">
        </div>
        <div class="select-box verify-box">
          <input type="text" name="" placeholder="邮箱验证码">
          <input class="verify-btn middle fz12" type="button" value="发送验证码">
        </div>
      </div>
      <!--共用部分-->
      <div class="mobileReg-box">
        <div class="select-box">
          <input type="password" name="" placeholder="密码">
        </div>
        <div class="select-box">
          <input type="password" name=""  placeholder="确认密码">
        </div>
        <div class="select-box">
          <input type="text" name="" placeholder="邀请码（没有可不填）">
        </div>
        <input type="checkbox" class="dis-in-blk"><span>我已阅读并同意<router-link to="/" class="blue">《用户协议》</router-link></span><br>
        <input class="register-btn dis-in-blk" type="button" value="注册">
        <span>已有账号？<router-link to="/login" class="blue">直接登录>></router-link></span>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "./header"
  export default {
    data(){
      return {
        activeId:1,//激活面板
      }
    },
    methods:{

    },
    created(){},
    components:{
      Header,
    }
  }
</script>
<style scoped>
  .con-box>.inner-box{
    width:900px;
    /*height:400px;*/
    margin:200px auto;
    text-align: left;
  }
  .inner-box>h4 {
    font-size:14px;
    color:#8d959f;
  }
  .inner-box>h4>span{
    margin-right:20px;
    display:inline-block;
    cursor:pointer;
  }

  .inner-box>h4 span.active{
    font-size: 20px;
    color:#fff;
  }
  .select-box{
    border:1px solid #fff;
    width:400px;
    padding:10px 0 10px 10px;
    box-sizing: border-box;
    margin-bottom:15px;
    height:42px;
  }
  .select-box>.inner-box{
    background-color: transparent;
    /*border:1px solid #fff;*/
    outline:none;
    border:none;
    width:400px;
    border-radius:0;
    color:#fff;
  }
  .mobile-box{
    padding-right:10px;
    border-right:1px solid #fff;
  }
  option{
    border-radius:0;
    /*color:#fff;*/
  }
  .mobile-input{
    /*display:inline-block;*/
    padding:0 20px;
  }
  .verify-box{
    position: relative;
  }
  .verify-box .verify-btn{
    position: absolute;
    right:0;
  }
  .verify-box::before{
    content:'';
    height:15px;
    width:1px;
    background-color: #fff;
    position: absolute;
    right:80px;
    top:50%;
    transform: translateY(-50%);
  }
  .register-btn{
    margin-top:20px;
    width:100px !important;
    border:none !important;
    background-color:#445895;
    padding:10px 20px;

  }
</style>
