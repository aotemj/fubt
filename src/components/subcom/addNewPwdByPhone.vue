<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="inner-box">
      <h4><span class="active">手机找回密码</span></h4>
      <!--共用部分-->
      <div class="mobileReg-box" v-show="!success">
        <div class="select-box">
          <!--手机号-->
          <input type="text" name="" :placeholder="phoneNum" disabled>
        </div>
        <div class="select-box">
          <!--新密码-->
          <input type="text" name="" placeholder="新密码" v-model="newPwd">
        </div>
        <div class="select-box">
          <!--确认新密码-->
          <input type="text" name="" placeholder="确认密码" v-model="rNewPwd">
        </div>
        <div class="false-tips fz12"><i v-show="errorMsg"></i>{{errorMsg}}</div>
        <input class="register-btn dis-in-blk" v-on:click="next" type="button" value="下一步">
      </div>
      <div class="success" v-show="success">
        <h4>恭喜您,登录密码修改成功!</h4>
        <input class="register-btn dis-in-blk" v-on:click="login" type="button" value="立即登录">
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "../header"
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  import tips from "./friendlyTips"//弹窗组件
  export default {
    data() {
      return {
        // activeId:1,//激活面板
        success: false,//修改密码成功状态
        originalPwd: '',//原密码
        newPwd: '',//新密码
        rNewPwd: '',//重复新密码
        errorMsg: '',//错误提示
        phoneNum:'',//手机号
      }
    },
    methods: {
      next() {
        if (!this.newPwd) {
          this.errorMsg = '请输入新密码';
          return;
        } else if (!this.rNewPwd) {
          this.errorMsg = '请确认新密码';
          return;
        } else if (this.newPwd !== this.rNewPwd) {
          this.errorMsg = '新密码输入不一致';
          return;
        } else {
          this.errorMsg = '';

        }

        this.success = true;
      },
      login() {
        this.$router.push({'path': '/login'})
      },
      resetPwd(){
        return new Promise((resolve, reject)=>{
          let resetUrl = common.apidomain+'validate/reset_passwd_by_phone';
          let fd = new FormData();
          /*
          * totpCode
          * newPassword
          * phoneResetSecond
          * */
          fd.append();
        })
      }

    },
    created() {
      this.phoneNum = this.$route.params.phoneNum;
    },
    components: {
      Header,
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
    right: 80px;
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
</style>
