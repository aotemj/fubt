<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <h4><span class="active">手机找回密码</span></h4>
      <div class="mobileReg-box">
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
          <input style="padding:0 20px;width:85%" class="mobile-input fl" type="text" v-model="phoneNum">
        </div>
        <!--<div class="select-box">-->
        <!--<input type="text" name="" placeholder="验证码">-->
        <!---->
        <!--</div>-->
        <div class="select-box identify-box">
          <input type="text" v-model="imgCode" placeholder="验证码">
          <div class="inner-box cp" @click="refreshCode">
            <sIdentify class="image" :identifyCode="identifyCode"></sIdentify>
          </div>
        </div>
        <!--<div class="select-box verify-box">-->
        <!--<input type="text" name="" placeholder="短信验证码">-->
        <!--<input class="verify-btn middle fz12" type="button" value="发送验证码">-->
        <!--</div>-->
        <div class="select-box verify-box">
          <input type="text" v-model="msgCode" placeholder="短信验证码">
          <input class="verify-btn cp middle fz12" :disabled="msgDisabled" type="button" v-on:click="sendCode"
                 v-model="msgBtnTxt">
        </div>
      </div>
      <!--共用部分-->
      <div class="mobileReg-box">
        <!--证件类型-->
        <div class="select-box clearfix">
          <select class="mobile-box fr bn fz12" name="">
            <option value="" selected>身份证</option>
          </select>
          <span class="fz12">证件类型</span>
          <!--<input style="width:85%" class="mobile-input fl " type="text" v-model="idNum" placeholder="证件类型">-->
        </div>
        <!-- <div class="select-box">
          <input type="text" name="" placeholder="证件号码" v-model="idNum">
        </div> -->
        <div class="select-box" style="display:inline-block;">
           <input type="text" name="" placeholder="证件号码" v-model="idNum">
        </div>
        <span style="display:inline-block;">如果账户未实名可不填</span>

        <!-- 错误提示信息 -->
        <transition
          enter-active-class="animated shake"
        >
          <div class="false-tips fz12" v-show="errorMsg"><i v-show="errorMsg"></i>{{errorMsg}}</div>
        </transition>
        <!-- <div class="false-tips fz12"><i v-show="errorMsg"></i>{{errorMsg}}</div> -->

        <input class="register-btn dis-in-blk" type="button" value="下一步" v-on:click="next">
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "./header"
  import sIdentify from "./subcom/identify"
  import common from "../kits/domain"
  import {ajax} from "../kits/http"
  import tips from "./subcom/friendlyTips"//弹窗组件
  export default {
    data() {
      return {
        phoneResetKey:'',
        phoneResetSecond:'',
        // activeId:1,//激活面板
        refreshStatus: false,//是否允许刷新
        imgCode: '',//图形验证码
        trueImgCode: '',//正确的图形验证码
        identifyCode: "",//验证码'
        imageRedisKey: "",//图片验证码key
        errorMsg: '',//错误信息
        phoneNum: '',//电话号码
        msgDisabled: false,//短信验证码按钮状态
        msgTime: 0,//短信验证码时间
        msgBtnTxt: "发送验证码",//短信验证码按钮文字
        msgCode: '',//短信验证码
        idNum: '',//身份证号
        phoneReg: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,// 手机号验证
        idReg: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,//身份证号验证
      }
    },
    methods: {
      //下一步
      next() {
        if (!this.phoneNumReg() || !this.imgCodeReg()) {
          return;
        }
        this.findPwdByPhone().then((res) => {
          if(res.data.code!==200){
            this.errorMsg = res.data.msg;
            return;
          }
        // res中应该会返回一个字段phoneResetKey
        // console.log(res);
        // console.log(res.data.data.phoneResetKey);
        this.phoneResetKey = res.data.data.phoneResetKey;

        // 第二次调用接口:/validate/reset_phone
        var twourl = common.apidomain + 'validate/reset_phone';
        var twofd = new FormData();
        twofd.append('phoneResetKey',this.phoneResetKey);
        ajax(twourl, 'post', twofd, (res) => {
          // console.log(res.data);// res中应该会返回一个字段phoneResetSecond
          // console.log("phoneResetSecond:"+res.data.data.phoneResetSecond);
          // 将将忘记密码-手机找回-下一步按钮第二次调用接口返回的数据放到全局中保存起来
          this.$store.commit('setphoneResetSecond',res.data.data.phoneResetSecond);
        });
        this.$router.push({ path: '/addNewPwdByPhone/'+this.phoneNum })
        })
      },
      //通过手机号找回密码
      findPwdByPhone() {
        return new Promise((resolve, reject) => {
          let nextUrl = common.apidomain + 'validate/find_passwd_by_phone';
          let fd = new FormData();
          /*
          * phone: 18625512982
            msgcode: 375781
            idcard: 1
            idcardno:
            imgcode: fexy*/
          fd.append('phone', this.phoneNum);
          fd.append('msgcode', this.msgCode);
          fd.append('idcard', 1);
          fd.append('idcardno', this.idNum);
          fd.append('imgcode', this.identifyCode);
          fd.append('imageRedisKey', this.imageRedisKey);
          ajax(nextUrl, 'post', fd, (res) => {
            console.log(res);
            // if (res.data.code !== 200) {
              // reject(res);
            // } else {
              resolve(res);
            // }
          })
        })
      },
      //发送验证码
      sendCode() {
        //手机号注册
        if (!this.phoneNumReg() || !this.imgCodeReg()) {
          return;
        }
        // this.phoneNumExistTest(0).then((res) => {
        // console.log(res.data);
        // if (res.data.code !== 200) {
        //   this.errorMsg = res.data.msg;
        //   return;
        // } else {

        let msgUrl = common.apidomain + 'user/send_sms';

        let fd = new FormData();

        fd.append('type', 109);
        fd.append('msgtype', 1);
        fd.append('areaCode', '+86');
        fd.append('phone', this.phoneNum);
        fd.append('vcode', this.imgCode);
        fd.append('imageRedisKey', this.imageRedisKey);
        fd.append('uid', 0);
        ajax(msgUrl, 'post', fd, (res) => {
          // console.log(res);
          if (res.data.code !== 200) {
            this.errorMsg = res.data.msg;
            return;
          } else {
            this.msgTime = 60;
            this.msgDisabled = true;
            this.msgTimer();
          }
        })
        // }
        // });
        /*
        * 短信验证码参数格式
        * type: 109
          msgtype: 1
          areaCode: +86
          phone: 18625512982
          vcode: p5u6
          uid: 0
          */
      },
      msgTimer() {
        if (this.msgTime > 0) {
          this.msgTime--;
          this.msgBtnTxt = this.msgTime + "s后重新获取"
          setTimeout(this.msgTimer, 1000);
        } else {
          this.msgTime = 0;
          this.msgBtnTxt = "获取验证码";
          this.msgDisabled = false;
        }
      },
      /*图片验证码开始*/
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        if (!this.phoneNumReg()) {
          return;
        }
        this.makeCode();
      },
      makeCode() {
        console.log('123');
        let url = common.apidomain + 'servlet/ValidateImageServlet';
        ajax(url, 'post', {}, (res) => {
          if (res.data.code !== 200) {
            this.errorMsg = '获取图形验证码错误，请稍后再试'
            return;
          }
          this.identifyCode = res.data.data.verifyCode;
          this.imageRedisKey = res.data.data.imageRedisKey;
          // console.log(this.imageRedisKey);
          this.trueImgCode = this.identifyCode;
          console.log(this.trueImgCode)
        })
      },
      /*图片验证码结束*/
      //手机号验证：
      phoneNumReg() {
        if (!this.phoneNum) {
          this.errorMsg = '请输入手机号';
          return 0;
        } else if (!this.phoneReg.test(this.phoneNum)) {
          this.errorMsg = '请输入正确的手机号';
          return 0;
        } else {
          this.errorMsg = '';
          return 1;
        }
      },
      //身份张号验证
      idNumReg() {
        if (!this.idNum) {
          this.errorMsg = '请输入身份证号'
          return 0;
        } else if (!this.idReg.test(this.idNum)) {
          this.errorMsg = '请输入正确的身份证号码';
          return 0;
        } else {
          this.errorMsg = '';
          return 1;
        }
      },
      //图片验证码验证
      imgCodeReg() {
        if (!this.imgCode) {
          this.errorMsg = '请输入图片图片验证码';
          return 0;
        } else if (!this.imgCode == this.trueImgCode) {
          this.errorMsg = '您输入图片验证码不正确';
          return 0;
        } else {
          this.errorMsg = '';
          return 1;
        }
      },
    },
    created() {
    },
    mounted() {
      this.makeCode();
    },

    components: {
      Header,
      sIdentify,
      tips,//友情提示组件
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
    display: inline-block;
    /*padding:0 20px;*/
  }

  .verify-box {
    position: relative;
  }

  .verify-box .verify-btn {
    position: absolute;
    right: 0;
  }

  .verify-box::before {
    content: '';
    height: 15px;
    width: 1px;
    background-color: #fff;
    position: absolute;
    right: 95px;
    top: 50%;
    transform: translateY(-50%);
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

  .register-btn {
    margin-top: 20px;
    width: 100px !important;
    border: none !important;
    background-color: #445895;
    padding: 10px 20px;
    display: block;

  }

  .select-box input[type='text'], .select-box input[type='password'] {
    width: 100%;
  }
</style>
