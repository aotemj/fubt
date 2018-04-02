<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <h4><span class ="active" v-on:click="activeId=1">手机找回密码</span></h4>
      <!--电话注册-->
      <div class="mobileReg-box">
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
      <!--共用部分-->
      <div class="mobileReg-box">

        <!--证件类型-->
        <div class="select-box clearfix">
          <select class="mobile-box fr bn fz12" name="">
            <option value="" selected>身份证</option>
          </select>
          <input class="mobile-input fl " type="text" name="" placeholder="证件类型">
        </div>

        <div class="select-box">
          <input type="text" name=""  placeholder="证件号码">
        </div>
        <input class="register-btn dis-in-blk" type="button" value="下一步" v-on:click="next">
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "./header"
  export default {
    data(){
      return {
        // activeId:1,//激活面板
      }
    },
    methods:{
      //下一步
      next(){
        this.$router.push({ path: '/addNewPwdByPhone' })
      }
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
    /*padding:0 20px;*/
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
