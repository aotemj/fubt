<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <h4><span class ="active" v-on:click="activeId=1">邮箱找回密码</span></h4>
      <!--共用部分-->

      <div class="mobileReg-box">

        <!-- 邮箱地址 -->
        <div class="select-box">
          <input type="text" name="" placeholder="邮箱地址" v-model="emailaddress">
        </div>

        <!--证件类型-->
        <div class="select-box clearfix">
          <select class="mobile-box fr bn fz12" name="">
            <option value="" selected>身份证</option>
          </select>
          <input class="mobile-input fl" type="text" name="" placeholder="证件类型" disabled>
        </div>
        
        <!-- 证件号码 -->
        <div class="select-box">
          <input type="text" name=""  placeholder="证件号码"  v-model="idacard">
        </div>

        <!-- 验证码 -->
        <div class="select-box sendinput">
          <input type="text" name="" placeholder="验证码" class="yanzm"><button class="sendma">发送验证码</button>
        </div>
        
        <!-- 提示信息 -->
        <div class="tipinfo">{{tipinfo}}</div>
        
        <!-- 点击下一步按钮 -->
        <input class="register-btn dis-in-blk" type="button" v-on:click="next" value="下一步">

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
        // activeId:1,//激活面板
        tipinfo:'',
        emailaddress:'',//邮箱地址
        idacard:'',//身份证
      }
    },
    methods:{


      // 1.0下一步
      next(){
        if (!this.emailReg() || !this.idcard()){
          return;
        }
        // this.$router.push({ path: '/addNewPwdByEmail' })
      },


      // 2.0邮箱验证
      emailReg(){
        var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(this.emailaddress==''){
          this.tipinfo="请输入邮箱地址";
          return 0;
        }else if(!regEmail.test(this.emailaddress)){
          this.tipinfo="邮箱格式不正确";
          return 0;
        }else{
          this.tipinfo="";
          return 1;
        }
      },


      // 3.0身份证验证
      idcard(){
        var regidcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(this.idacard==''){
          this.tipinfo="请输入身份证号";
          return 0;
        }else if(!regidcard.test(this.idacard)){
          this.tipinfo="身份证格式不正确";
          return 0;
        }else{
          this.tipinfo="";
          return 1;
        }
      },

      // 4.0发送邮箱验证码
      sendEmailcard(){
        var url = common.apidomain + 'validate/send_findbackmail';
        var fd = new FormData();
        fd.append('email','');
        fd.append('idcard','');
        fd.append('idcardno','');
        fd.append('imageRedisKey','');
        fd.append('imgcode','');
        ajax(url, 'post', fd, (res) => {
          console.log(res.data);
        });
      },

    },
    created(){},
    components:{
      Header,
    }
  }
</script>
<style scoped>
  /*发送验证码样式*/
  .sendinput{
    position: relative;
  }
  .yanzm{
  }
  .sendma{
    position: absolute;
    right: 0;
    top:10px;
    cursor: pointer;
    padding-left: 20px;
    border-left: 1px solid #fff;
  }

  /*提示信息样式*/
  .tipinfo{
    height: 15px;
    line-height: 15px;
  }
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
