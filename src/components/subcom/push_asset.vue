<template>
  <div class="pushAss push_box">
    <el-form ref="form" label-width="80px">
      <el-form-item class="Unit border_bottom" label="账户余额">
        <span>{{ this.tota }}</span>
      </el-form-item>
      <el-form-item label="买方UID" class="border_bottom">
        <el-input v-model="pushuid"></el-input>
      </el-form-item>
      <el-form-item label="资产类型" class="border_bottom">
        <el-select class="reg_select" v-model="pushcoinid" placeholder="TKC">
          <el-option v-for="(item,index) in regionList" :key="index" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" class="border_bottom">
        <el-input v-model="pushcount" placeholder="最小数量为100"></el-input>
      </el-form-item>
      <el-form-item label="价格" class="border_bottom">
        <el-input v-model="pushprice"></el-input>
      </el-form-item>
      <el-form-item label="交易密码" prop="pass" class="border_bottom">
        <el-input type="password" v-model="tradepwd" auto-complete="off" placeholder="请输入交易密码"></el-input>
      </el-form-item>
      <el-form-item label="短信验证" class="modify">
        <input class="modifyInput" type="text" v-model="ver">
        <input class="verify-btn" :disabled="assetsDisabled" type="button" v-on:click="sendCode"
               v-model="assetsBtnTxt">
      </el-form-item>
      <div class="false-tips fz12"><i v-show="pushMsg"></i>{{pushMsg}}</div>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交PUSH</el-button>
      </el-form-item>
    </el-form>
    <div class="empty"></div>
    <Push></Push>
  </div>
</template>
<script>

  // pushcoinid //资产类型
  // pushuid //卖方id
  // pushcount //数量
  // pushprice //价格
  // tradepwd  //交易密码
  // phonecode //短信验证码

  import Push from "./pushRecord.vue"
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"

  export default {
    data() {
      return {
        tota: '',//余额
        pushuid: '',//买方id
        pushcoinid: '',//资产类型
        pushcount: '',//数量
        pushprice: '',//价格
        tradepwd: '',//交易密码
        phonecode: '',
        //push info
        tradePwd: '',//交易密码
        assetsTime: 0,//短信验证码时间
        assetsDisabled: false,//短信验证码按钮状态
        assetsBtnTxt: "发送验证码",//短信验证码按钮文字
        ver: '',//短信验证码
        regionList: [],//资产列表
        userInfo: [],//个人信息
        pwdReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,//密码验证
        pushMsg: '',//错误提示信息
      }
    },
    methods: {
      submitForm() {
        if (!this.pushuid) {
          this.pushMsg = '请输入卖方id';
          return;
        } else if (!this.pushcount) {
          this.pushMsg = '请输入数量';
          return;
        } else if (!this.pushprice) {
          this.pushMsg = '请输入价格';
          return;
        } else if (!this.tradepwd) {
          this.pushMsg = '请输入密码';
          return;
        } else if (!this.pwdReg.test(this.tradepwd)) {
          this.pushMsg = "密码格式错误，密码必须大于等于6位且包含字母和数字"
          return;
        } else if (!this.ver) {
          this.pushMsg = "请输入短信验证码"
          return;
        } else {
          this.pushMsg = ""
        }

        let submitUrl = common.apidomain + 'submit_push';
        let pushfd = new FormData();
        pushfd.append('pushuid', this.pushuid);
        pushfd.append('pushcoinid', this.pushcoinid);
        pushfd.append('pushcount', this.pushcount);
        pushfd.append('pushprice', this.pushprice);
        pushfd.append('tradepwd', this.tradepwd);
        pushfd.append('phonecode', this.ver);
        ajax(submitUrl, 'post', pushfd, (res) => {
          if (res.data.code !== 200) {
            return;
          } else {
            console.log(this.pushuid)
          }
        });
      },
      //加载push信息
      loadPushInfo() {
        return new Promise((resolve, reject) => {
          let pushUrl = common.apidomain + 'financial/push';
          ajax(pushUrl, 'post', {}, (res) => {
            resolve(res);
          });
        })
      },
      sendCode() {
        if (!this.tradepwd) {
          this.pushMsg = "请输入密码"
          return;
        } else if (this.pushcount == 0) {
          this.pushMsg = "數量不能为0"
          return;
        } else if (this.pushcount > this.tota) {
          this.pushMsg = "余额不足"
          return;
        } else {
          this.pushMsg = ""
        }
        let loginUrl = common.apidomain + 'user/send_sms';
        let fd = new FormData();
        fd.append('type', 113);
        fd.append('msgtype', 1);
        fd.append('areaCode', 0);
        fd.append('phone', 0);
        fd.append('vcode', 0);
        fd.append('uid', 0);
        ajax(loginUrl, 'post', fd, (res) => {
          if (res.data.code !== 200) {
            this.errorMsg = res.data.msg;
            return;
          } else {
            this.assetsTime = 60;
            this.assetsDisabled = true;
            this.Timer();
          }
        })
      },
      //60s短信倒计时
      Timer() {
        if (this.assetsTime > 0) {
          this.assetsTime--;
          this.assetsBtnTxt = this.assetsTime + "s后重新获取"
          setTimeout(this.Timer, 1000);
        } else {
          this.assetsTime = 0;
          this.assetsBtnTxt = "获取验证码";
          this.assetsDisabled = false;
        }
      },
    },
    created() {
      this.loadPushInfo().then((res) => {
        if (res.data.code !== 200) {
          return;
        } else if (this.tota !== null) {
          this.tota = res.data.data.coinWallet.total;
        }
        this.regionList = res.data.data.pushCoinMap;

      });
    },
    computed: {},
    components: {
      Push,//push记录
    }
  }
</script>
<style scoped>
  .false-tips {
    text-align: left;
    margin-left: 20%;
  }

  /* 短信验证 */
  .verify-btn {
    width: 105px;
    position: absolute;
    top: 9px;
    right: 3px;
    cursor: pointer;
    background: #000;
    height: 27px;
  }

  .modifyInput {
    width: 100%;
    float: right;
    /* margin-right: 8%; */
    height: 30px;
    border: 1px solid #c2c3c8;
    border-radius: 5px;
    margin-top: 7px;
    padding-left: 3%;
    background: #19233c;
  }

  .border_bottom {
    margin-bottom: 10px;
  }

  .push_box {
    padding-top: 2%;
  }

  .Unit {
    text-align: left;
  }

  button {
    width: 100%;
    height: 35px;
    line-height: 9px;
    border-radius: 5px;
    outline: medium;
    border: 0;
    margin: 0 auto;
    color: #c2c3c8;
  }

  .user-recharge > section > button:hover {
    background: #409EFF;
    color: #fff;
    cursor: pointer;
  }

  .reg_select {
    width: 100%;
  }

  .empty {
    width: 100%;
    height: 20px;
    background: #1e253d;
  }

  .Verification {
    float: right;
    position: absolute;
    top: 0px;
    right: 4%;
    cursor: pointer;
  }
</style>
