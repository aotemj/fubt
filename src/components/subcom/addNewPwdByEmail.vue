<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <h4><span class ="active">邮箱找回密码</span></h4>
      <!--共用部分-->
      <div class="mobileReg-box" v-show="!success">
        <!-- 登录账号 -->
        <div class="select-box">
          <div class="loginnum">登录账号<input type="text" class="loginid" v-model="loginid"></div>
        </div>
        <!-- 手机发送验证码：如果绑定了手机就显示，否则不显示 -->
        <div class="select-box verify-box" v-show="telbind">
          <input type="text" v-model="msgCode" placeholder="短信验证码">
          <input class="verify-btn cp middle fz12" :disabled="msgDisabled" type="button" v-on:click="sendCode"
                 v-model="msgBtnTxt">
        </div>
        <!--新密码-->
        <div class="select-box">
          <input type="text" name=""  placeholder="新密码" v-model="newpwd">
        </div>
        <!--确认新密码-->
        <div class="select-box">
          <input type="text" name=""  placeholder="确认密码" v-model="newpwd2">
        </div>
        <!-- 接口数据res.msg信息提示 -->
        <div class="errtip">{{errorMsg}}</div>
        <!-- 下一步按钮 -->
        <input class="register-btn dis-in-blk" type="button" v-on:click="next" value="下一步">
      </div>
      <!-- 密码重置成功后显示登陆界面 -->
      <div class="success" v-show="success">
        <h4>{{successtip}}</h4>
        <input class="register-btn dis-in-blk" v-on:click="login" type="button" value="立即登录">
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "../header"
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  export default {
    data(){
      return {
        telbind:'',
        loginid:'',
        errorMsg:'',
        success:false,//是否
        newpwd:'',//新密码
        newpwd2:'',//确认密码
        msgBtnTxt: "发送验证码",//短信验证码按钮文字
        msgCode: '',//短信验证码
        msgDisabled: false,//短信验证码按钮状态
        successtip:'',//修改手机成功提示
        uid:'',
        uuid:'',
        fid:'',
        pwdreg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
      }
    },
    methods:{
      // 邮箱找回密码逻辑：
      // 刚进来页面就调用接口：/validate/reset_email，传入uid和uuid参数，会返回fid字段和用户 登陆名 存起来在下面要用；
      // 在点击下一步的时候需要调用接口validate/reset_password，传入参数totpCode：0，phoneCode（判断是否绑定了手机：绑定了就显示发送验证码，没绑定就不显示发送验证码；用户信息中Fistelephonebind是否绑定手机）：，newPassword：，newPassword2：，fid（在上面的接口可以拿到）：；

      // 5.0 点击下一步按钮发送请求通过邮箱修改密码
      next(){
        // if(!this.pwdreg.test(this.newpwd)){
        //   this.errorMsg = '请输入6-16数字、字母组合的密码';
        //   return;
        // }
        // if (!this.newpwd) {
        //   this.errorMsg = '请输入新密码';
        //   return;
        // } else if (!this.newpwd2) {
        //   this.errorMsg = '请输入确认新密码';
        //   return;
        // } else if (this.newpwd !== this.newpwd2) {
        //   this.errorMsg = '两次密码输入不一致';
        //   return;
        // } else {
        //   this.errorMsg = '';
        // } 
        if(!this.newpwd){
          this.errorMsg = '请输入新密码';
          return;
        }else if(!this.pwdreg.test(this.newpwd)){
          this.errorMsg = '请输入6-16位数字、字母组合的密码';
          return;
        }else if(!this.newpwd2){
          this.errorMsg = '请输入确认密码';
          return;
        }else if(!this.pwdreg.test(this.newpwd2)){
          this.errorMsg = '请输入6-16数字、字母组合的密码';
          return;
        }else if(this.newpwd !== this.newpwd2){
          this.errorMsg = '两次密码输入不一致';
          return;
        }else{
          this.errorMsg = '';
        } 
        var url = common.apidomain + 'validate/reset_password';
        var formData = new FormData();
        formData.append('totpCode',0);
        formData.append('newPassword',this.newpwd);
        formData.append('newPassword2',this.newpwd2);
        formData.append('fid',this.fid);
        //如果绑定了手机
        if(this.telbind==true){
          formData.append('phoneCode',this.msgCode);
          ajax(url, 'post', formData, (res) => {
            console.log(res.data);
            if(res.data.code!==200){
              this.errorMsg = res.data.msg;
              return;
            }
            if(res.data.code==200){
              this.successtip = res.data.msg;
              this.success = true;//修改成功的提示状态
            }
          });
        }
        //没有绑定手机
        if(this.telbind==false){
          // var url = common.apidomain + 'validate/reset_password';
          // var formData = new FormData();
          // formData.append('totpCode',0);
          // formData.append('phoneCode',this.msgCode);
          // formData.append('newPassword',this.newpwd);
          // formData.append('newPassword2',this.newpwd2);
          // formData.append('fid',this.fid);
          ajax(url, 'post', formData, (res) => {
            console.log(res.data);
            if(res.data.code!==200){
              this.errorMsg = res.data.msg;
              return;
            }
            if(res.data.code==200){
              this.successtip = res.data.msg;
              this.success = true;//修改成功的提示状态
            }
          });
        }
      },
      //3.0 发送验证码按钮事件
      sendCode() {
        let msgUrl = common.apidomain + 'user/send_sms';
        let fd = new FormData();
        fd.append('type', 120);
        fd.append('msgtype', 1);
        fd.append('areaCode', '+86');
        // fd.append('areaCode', 0);
        fd.append('phone', this.loginid);
        // fd.append('vcode', this.imgCode);
        // fd.append('imageRedisKey', this.imageRedisKey);
        fd.append('uid', 0);
        ajax(msgUrl, 'post', fd, (res) => {
          console.log(res);
          if (res.data.code !== 200) {
            this.errorMsg = res.data.msg;
            return;
          } else {
            this.msgTime = 60;
            this.msgDisabled = true;
            this.msgTimer();
          }
        })
      },
      // 4.0 验证码发送成功后，按钮样式改变
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
      // 6.0 修改密码成功后，点击登陆跳转到登录界面
      login(){
        this.$router.push({'path':'/login'})
      },
      // 2.0 刚进来页面就调用接口：/validate/reset_email
      beginbackfid(){
        var url = common.apidomain + 'validate/reset_email';
        var formData = new FormData();
        formData.append('uid',this.uid);
        formData.append('uuid',this.uuid);
        ajax(url, 'post', formData, (res) => {
          console.log(res.data)
          // 参数中会返回fid字段，需要保存下来第二次发请求用
          this.fid=res.data.data.fuser.fid
          // console.log(res.data.data.fuser.fid);
          // 会返回用户id，获得用户的手机号：在找回密码重置密码页面填到最上面
          this.loginid=res.data.data.fuser.floginname;
          // console.log(res.data.data.fuser.floginname);
          //获取是否绑定了手机
          this.telbind=res.data.data.fuser.fistelephonebind;
        });
      },
    },
    created(){
      // 1.0 刚进来页面获取URL中的参数
      // console.log(this.$route.query.uid);
      // console.log(this.$route.query.uuid);
      this.uid=this.$route.query.uid;
      this.uuid=this.$route.query.uuid;
      // 2.0 刚进来页面就调用接口：/validate/reset_email
      this.beginbackfid();   
    },
    components:{
      Header,
    }
  }
</script>
<style scoped>
  .errtip{
    height: 12px;
    line-height: 12px;
  }
  .con-box>.inner-box{
    width:900px;
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
  .select-box:nth-of-type(1){
    border:0;
    padding-left: 0px;
  }
  .loginnum{
    font-size: 16px;
  }
  .loginid{
    margin-left: 20px;
    display: inline-block;
    font-size: 16px;
  }
  .select-box>.inner-box{
    background-color: transparent;
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
  }
  .mobile-input{
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
