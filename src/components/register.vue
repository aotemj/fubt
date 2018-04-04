<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <h4><span v-bind:class="{active:activeId==1}" v-on:click="activeId=1">手机注册</span><span
        v-bind:class="{active:activeId==2}" v-on:click="activeId=2">邮箱注册</span></h4>
      <!--电话注册-->
      <div class="mobileReg-box" v-show="activeId==1">
        <!--国家选取-->
        <div class="select-box">
          <select class="inner-box">
            <option value="">中国大陆（China）</option>
          </select>
        </div>
        <!--电话-->
        <div class="select-box clearfix">
          <select class="mobile-box fl" name="">
            <option value="">+86</option>
          </select>
          <input class="mobile-input fl" type="text" v-model.trim="registerInfo.phoneNum">
        </div>
        <div class="select-box verify-box">
          <input type="text" v-model="msgCode" placeholder="短信验证码">
          <input class="verify-btn cp middle fz12" :disabled="msgDisabled" type="button" v-on:click="sendcode"
                 v-model="btntxt">
        </div>
      </div>
      <!--邮箱注册-->
      <div class="emailReg-box mobileReg-box" v-show="activeId==2">

        <div class="select-box">
          <input type="text" name="" placeholder="邮箱地址">
        </div>

        <div class="select-box verify-box">
          <input type="text" name="" placeholder="邮箱验证码">
          <input class="verify-btn cp middle fz12" type="button" value="发送验证码">
        </div>
      </div>
      <!--共用部分-->
      <div class="mobileReg-box">
        <div class="select-box identify-box">
          <input type="text" v-model="imgCode" placeholder="验证码">
          <div class="inner-box cp" @click="refreshCode">
            <sIdentify class="image" :identifyCode="identifyCode"></sIdentify>
          </div>
        </div>
        <div class="select-box">
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="select-box">
          <input type="password" v-model="confirmPwd" placeholder="确认密码">
        </div>
        <div class="select-box">
          <input type="text" v-model="invitationCode" placeholder="邀请码（没有可不填）">
        </div>
        <input type="checkbox" v-model="agree" class="dis-in-blk"><span>我已阅读并同意<router-link to="/"
                                                                            class="blue">《用户协议》</router-link></span><br>
        <div class="false-tips fz12"><i v-show="errorMsg"></i>{{errorMsg}}</div>
        <input class="register-btn dis-in-blk" v-on:click="register" type="button" value="注册">
        <span>已有账号？<router-link to="/login" class="blue">直接登录>></router-link></span>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "./header"
  import sIdentify from "./subcom/identify"
  import common from "../kits/domain"
  import {ajax} from "../kits/http"

  export default {
    data() {
      return {
        activeId: 1,//激活面板
        msgDisabled: false,//短信验证码状态
        time: 0,//时间
        btntxt: "发送验证码",//按钮文字
        msgCode: '',//短信验证码
        trueMsgCode:'',//正确的短信验证码
        // msgCodeStatus: false,//短信验证码状态
        errorMsg: '',//错误提示

        imgCode: '',//图形验证码
        trueImgCode:'',//正确的图形验证码
        imgCodeStatus: false,//图形验证码状态
        identifyCode: "",//验证码'
        password:'',//密码
        confirmPwd:'',//确认密码
        invitationCode:'',//邀请码
        agree:false,//用户协议
        registerInfo: {//注册信息
          phoneNum: null,

        }

      }
    },
    methods: {
      //注册
      register() {
        //手机号注册
        if (this.activeId == 1) {
          var phoneReg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;//手机号验证
          var pwdReg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/;//密码格式验证
          if (!this.registerInfo.phoneNum) {
            this.errorMsg = '请输入手机号';
            return;
          } else if (!phoneReg.test(this.registerInfo.phoneNum)) {
            this.errorMsg = '您输入的手机号格式不正确';
            return;
          } else if (!this.msgCode) {
            this.errorMsg = '请输入短信验证码';
            return;
          } else if(!this.msgCodeStatus){
            this.errorMsg = '您输入的验证码不正确';
            return;
          }else if (!this.imgCode){
            this.errorMsg = '请输入验证码';
            return;
          }else if(!this.imgCodeStatus){
            this.errorMsg = '您输入的验证码不正确';
            return;
          }else if(!this.password){
            this.errorMsg = '请输入密码';
            return;
          }else if(!pwdReg.test(this.password)){
            this.errorMsg ="密码格式错误，密码必须大于等于6位且包含字母和数字！"
            return;
          }else if(!this.confirmPwd){
            this.errorMsg = '请再次输入密码';
            return;
          }else if(this.password!==this.confirmPwd){
            this.errorMsg = '两次输入密码不一致'
            return;
          }else if(!this.agree){
            this.errorMsg = '请阅读并同意用户协议';
            return;
          }else {
            this.errorMsg = '';

          }
          //邮箱注册
        } else {

        }
      },
      //发送验证码
      sendcode() {
        this.time = 60;
        this.msgDisabled = true;
        this.timer();
        let msgUrl = common.apidomain+'user/send_sms';

      },
      timer() {
        if (this.time > 0) {
          this.time--;
          this.btntxt = this.time + "s后重新获取";
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.btntxt = "获取验证码";
          this.msgDisabled = false;
        }
      },
      /*发送验证码结束*/
      /*图片验证码开始*/
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode();
      },
      makeCode() {
        let url = common.apidomain + 'servlet/ValidateImageServlet';
        ajax(url, 'post', {}, (res) => {
          if (res.data.code !== 200) {
            this.errorMsg = '获取图形验证码错误，请稍后再试'
            return;
          }
          this.identifyCode = res.data.data.verifyCode;
        })
      }
      /*图片验证码结束*/
    },
    mounted() {
      this.identifyCode = String(Math.floor(Math.random() * 10000));
    },
    computed:{
      //短信验证码状态
      msgCodeStatus(){
        return this.msgCode==!this.trueMsgCode
      },
      imgCodeStatus(){
        return this.imgCode==!this.trueImgCode
      }
    },
    created() {
    },
    components: {
      Header,
      sIdentify
    }
  }
</script>
<style scoped>
  .con-box > .inner-box {
    width: 900px;
    /*height:400px;*/
    margin: 200px auto;
    text-align: left;
  }

  .inner-box > h4 {
    font-size: 14px;
    color: #8d959f;
  }

  .inner-box > h4 > span {
    margin-right: 20px;
    display: inline-block;
    cursor: pointer;
  }

  .inner-box > h4 span.active {
    font-size: 20px;
    color: #fff;
  }

  .select-box {
    border: 1px solid #fff;
    width: 400px;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    margin-bottom: 15px;
    height: 42px;
  }

  .select-box > .inner-box {
    background-color: transparent;
    /*border:1px solid #fff;*/
    outline: none;
    border: none;
    width: 400px;
    border-radius: 0;
    color: #fff;
  }

  .mobile-box {
    padding-right: 10px;
    border-right: 1px solid #fff;
  }

  option {
    border-radius: 0;
    /*color:#fff;*/
  }

  .mobile-input {
    /*display:inline-block;*/
    padding: 0 20px;
  }

  .verify-box {
    position: relative;
  }

  .verify-box .verify-btn {
    position: absolute;
    right: 0;
    width: 100px;
  }

  .verify-box::before {
    content: '';
    height: 15px;
    width: 1px;
    background-color: #fff;
    position: absolute;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
  }

  .register-btn {
    margin-top: 20px;
    width: 100px !important;
    border: none !important;
    background-color: #445895;
    padding: 10px 20px;

  }

  .identify-box {
    position: relative;
  }

  .identify-box .inner-box {
    position: absolute;
    right: 0;
    top: 0;
    width: 25.5%;
    height: 100%;
    /*background-color: pink;*/
    border-radius: 5px;
    /*border:1px solid #fff;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .identify-box .image {
    width: 100% !important;
  }

  /*错误提示*/
  .false-tips {
    margin-top: 20px;
    color: #e9494d;
  }

  .false-tips i {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    width: 16px;
    height: 16px;
    background: url('../assets/errorIcon.png') no-repeat center center;
    -webkit-background-size: 16px 16px;
    background-size: 16px 16px;
  }
</style>
