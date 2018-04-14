<template>
  <div class="fund_box">
    <div class="cards">
      <div class="add_card" @click="dialogFormVisible = true">
        <p>+</p>
        <span>添加支付宝</span>
      </div>
      <i class="dialog">
        <el-dialog title="添加支付宝" :visible.sync="dialogFormVisible" width="35%" center>
          <el-form id="from_add">
            <el-form-item label="姓名" class="border_bottom">
              <div class="add_right">
                <el-input v-model="username" auto-complete="off"></el-input>
              </div>
              <span class="hint_information">*支付宝姓名必须与您实名认证姓名一致</span>
            </el-form-item>
            <el-form-item label="账号" class="border_bottom">
              <div class="add_right">
                <el-input v-model="aliAccount" auto-complete="off"></el-input>
              </div>
            </el-form-item>

            <el-form-item label="短信验证码">
              <el-input class="input-info input-with-select" v-model="msgForNewAddress"
                        placeholder="请输入短信验证码">
                <el-button slot="append" size="mini" class="bdr0 w100p"
                           :disabled="msgDisabledForAddress"
                           v-on:click="sendCode('addAddress')">{{msgBtnTxt}}
                </el-button>
              </el-input>
            </el-form-item>
            <!--错误提示-->
            <el-form-item label="      ">
              <div class="false-tips fz12 mt-10"><i v-show="addAddressErrorMsg"></i>{{addAddressErrorMsg}}
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addNewAddress">提交</el-button>
          </div>
        </el-dialog>
      </i>
    </div>
  </div>
</template>
<script>
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"

  export default {
    data() {
      return {
        dialogFormVisible: false,
        username: '',//用户姓名
        aliAccount: '',//支付宝账号
        addAddressErrorMsg: '',//错误信息
        msgForNewAddress: '',//短信验证码
        msgDisabledForAddress: false,//短信验证码按钮状态
        msgBtnTxt: '发送验证码',//短信验证码按钮文字
      }
    },
    methods: {
      //新增提现地址
      addNewAddress() {
        if (!this.username) {
          this.addAddressErrorMsg = '请输入您的真实姓名';
          return;
        } else if (!this.aliAccount) {
          this.addAddressErrorMsg = '请输入您的支付宝账号';
          return;
        } else if (!this.msgForNewAddress) {
          this.addAddressErrorMsg = '请输入短信验证码';
          return;
        } else {
          this.addAddressErrorMsg = '';
        }

        let addNewAddressUrl = common.apidomain + 'user/save_alipay';
        let fd = new FormData();
        /*
        *
        * account: 13939753981
          totpCode: 0
          phoneCode: 111111
          payeeAddr: 测试
          */
        fd.append('account', this.aliAccount);//支付宝账号
        fd.append('totpCode', 0);//
        fd.append('phoneCode', this.msgForNewAddress);//手机验证码
        fd.append('payeeAddr', this.username);//真实姓名
        ajax(addNewAddressUrl, 'post', fd, (res) => {
          console.log(res);
          if (res.data.code !== 200) {
            this.addAddressErrorMsg = res.data.msg;
            return;
          }
          this.$store.commit('changeDialogInfo', res.data.msg);
        });
        this.$parent.changeTabId(2);
      },
      //发送验证码
      sendCode(msgType) {
        if (!this.username) {
          this.addAddressErrorMsg = '请输入您的真实姓名';
          return;
        } else if (!this.aliAccount) {
          this.addAddressErrorMsg = '请输入您的支付宝账号';
          return;
        } else {
          this.addAddressErrorMsg = '';
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

        // let msgUrl = common.apidomain + 'user/send_sms';
        //
        // let fd = new FormData();
        //
        // fd.append('type', 111);
        // fd.append('msgtype', 1);
        // fd.append('areaCode', '+86');
        // fd.append('phone', this.registerInfo.phoneNum);
        // fd.append('vcode', this.imgCode);
        // fd.append('imageRedisKey', this.imageRedisKey);
        // fd.append('uid', 0);
        // ajax(msgUrl, 'post', fd, (res) => {
        //   console.log(res);
        //   if (res.data.code !== 200) {
        //     this.errorMsg = res.data.msg;
        //     return;
        //   } else {
        //     this.msgTime = 60;
        //     this.msgDisabled = true;
        //     this.msgTimer();
        //   }
        // })
        // }
        // });
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
          /*
           *type: 110
            msgtype: 1
            areaCode: 0
            phone: 0
            vcode: 0
            uid: 0*/
          fd.append('type', 110);
          fd.append('msgtype', 1);
          fd.append('areaCode', 0);
          fd.append('phone', 0);
          fd.append('vcode', 0);
          fd.append('uid', 0);
          ajax(msgUrl, 'post', fd, (res) => {
            resolve(res);
          })

        })
      },
    },
    created() {
    },
    computed: {},
    components: {}
  }
</script>
<style scoped>
  .border_bottom {
    margin-bottom: 10px;
  }

  #from_add {
    width: 90%;
  }

  .add_right {
    width: 80%;
    float: right;
    margin-right: 3%;
  }

  .add_card {
    width: 275px;
    height: 135px;
    border: 1px solid #c2c3c8;
    border-radius: 5px;
    cursor: pointer;
  }

  .hint_information {
    display: inline-block;
    margin-left: 20%;
  }

  .add_card > p {
    width: 30px;
    height: 30px;
    border: 1px solid #c2c3c8;
    border-radius: 50%;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin: 15% auto 5px;
  }

  .Verification {
    float: right;
    position: absolute;
    top: 0px;
    right: 6%;
    cursor: pointer;
  }

  button {
    width: 70%;
    height: 35px;
    border-radius: 5px;
    background: #19233c;
    outline: medium;
    border: 0;
    margin: 0 auto;
    color: #c2c3c8;
    margin-left: 14%;
  }

  .user-recharge > section > button:hover {
    background: #409EFF;
    color: #fff;
    cursor: pointer;
  }

  .dialog-footer {
    margin-top: -30px;
  }

  .dialog {
    font-style: normal;
  }
</style>
