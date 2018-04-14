<template>
  <div class="pushAss push_box">
    <el-form ref="form" label-width="80px">
      <el-form-item class="Unit border_bottom" label="账户余额">
        <span>0.2507245</span>
      </el-form-item>
      <el-form-item label="卖方UID" class="border_bottom">
        <el-input v-model="Sellerid"></el-input>
      </el-form-item>
      <el-form-item label="资产类型" class="border_bottom">
        <el-select class="reg_select" v-model="Assetstype" placeholder="TKC">
          <!--<el-option  value="TKC" v-for="(item,index) in regionList"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="数量" class="border_bottom">
        <el-input v-model="number" placeholder="最小数量为100"></el-input>
      </el-form-item>
      <el-form-item label="价格" class="border_bottom">
        <el-input v-model="price"></el-input>
      </el-form-item>
      <el-form-item label="交易密码" prop="pass" class="border_bottom">
        <el-input type="password" v-model="tranpassword" auto-complete="off" placeholder="请输入交易密码"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码">
        <el-input class="input-info input-with-select" v-model="msgForNewAddress"
                  placeholder="请输入短信验证码">
          <!-- <el-button slot="append" size="mini" class="bdr0 w100p"
                      :disabled="msgDisabledForAddress"
                      v-on:click="sendCode('addAddress')">{{msgBtnTxt}}
          </el-button> -->
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交PUSH</el-button>
      </el-form-item>
    </el-form>
    <div class="empty"></div>
    <Push></Push>
  </div>
</template>
<script>
  import Push from "./pushRecord.vue"
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        Sellerid: '',//卖方id
        Assetstype: '',//资产类型
        number: '',//数量
        price: '',//价格
        tranpassword: '',//交易密码
        checkPass: '',
        //push info
        tradePwd: '',//交易密码
        msgForNewAddress: '',//新增提现地址短信验证码
        msgBtnTxt: '获取验证码',//短信验证码文字
        msgDisabledForAddress: false,//短信验证码按钮状态
        submitWithdrawErrorMsg: '',//提交订单错误信息
        addAddressErrorMsg: '',//新增提现错误信息
        addAddressTimer: 0,//新增提现地址发送验证码时间

        regionList: [],//资产列表
        userInfo: {},//个人信息
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //加载push信息
      loadPushInfo() {
        return new Promise((resolve, reject) => {
          let pushUrl = common.apidomain + 'financial/push';
          let fd = new FormData();
          fd.append('currentPage', 1);
          ajax(pushUrl, 'post', fd, (res) => {
            resolve(res);
          });
        })
      },
      //发送验证码
      sendCode(msgType) {
        //新增用户地址
        // if(msgType=='addAddress'){
        /*
        * 发送验证码格式
        * type: 108
          msgtype: 1
          areaCode: 0
          phone: 0
          vcode: 0
          uid: 0*/

        // }else if(msgType=='submitWithdraw'){}

        if (msgType == 'addAddress') {
          if (!this.newWithdrawAddress) {
            this.addAddressErrorMsg = '请输入新的提现地址';
            return;
          }
          this.sendCodeAll('addAddress').then((res) => {
            console.log(res);
            if (res.data.code !== 200) {
              this.addAddressErrorMsg = res.data.msg;
              return;
            } else {
              this.addAddressErrorMsg = '';
              this.addAddressTimer = 60;
              this.msgDisabledForAddress = true;
              this.addMsgTimer();
            }
          });
        } else if (msgType == 'submitWithdraw') {
          this.sendCodeAll('submitWithdraw').then((res) => {
            console.log(res);

            if (res.data.code !== 200) {
              this.submitWithdrawErrorMsg = res.data.msg;
              return;
            } else {
              this.submitWithdrawErrorMsg = '';
              this.submitTimer = 60;
              this.msgDisabledForSubmitWithdraw = true;
              this.submitMsgTimer();
            }
          })

        }
      },
      addMsgTimer() {
        if (this.addAddressTimer > 0) {
          this.addAddressTimer--;
          this.msgBtnTxt = this.addAddressTimer + "s后重新获取"
          setTimeout(this.addMsgTimer, 1000);
        } else {
          this.addAddressTimer = 0;
          this.msgBtnTxt = "获取验证码";
          this.msgDisabledForAddress = false;
        }
      },
      //发送验证码
      sendCodeAll(msgType) {
        return new Promise((resolve, reject) => {
          let msgUrl = common.apidomain + 'user/send_sms';
          let fd = new FormData();
          if (msgType == 'addAddress') {
            /*
            * type: 108
              msgtype: 1
              areaCode: 0
              phone: 0
              vcode: 0
              uid:*/
            fd.append('type', 108);
            fd.append('msgtype', 1);
            fd.append('areaCode', 0);
            fd.append('phone', 0);
            fd.append('vcode', 0);
            fd.append('uid', 0);
            ajax(msgUrl, 'post', fd, (res) => {
              resolve(res);
            })
          } else if (msgType == 'submitWithdraw') {
            /*
            *
            * type: 105
              msgtype: 1
              areaCode: 0
              phone: 0
              vcode: 0
              uid: 0*/
            fd.append('type', 105);
            fd.append('msgtype', 1);
            fd.append('areaCode', 0);
            fd.append('phone', 0);
            fd.append('vcode', 0);
            fd.append('uid', 0);
            ajax(msgUrl, 'post', fd, (res) => {
              resolve(res);
            })
          }

        })
      },
    },
    created() {
      this.loadPushInfo().then((res) => {
        console.log(res);
        if (res.data.code !== 200) {
          return;
        }
        this.regionList = res.data.data.pushCoinMap;
        this.userInfo = res.data.data.coinWallet;
        // regionList
      });
    },
    computed: {},
    components: {
      Push,//push记录
    }
  }
</script>
<style scoped>
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
    background: #0e1326;
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
