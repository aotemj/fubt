<template>
  <div class="fund_box">
    <div class="cards">
      <div class="add_card" @click="showAddWin">
        <p>+</p>
        <span>添加币种地址</span>
      </div>
      <!--<el-dialog title="添加币种地址" :visible.sync="dialogFormVisible" width="30%" center>-->
      <!--<el-form :model="form" id="from_add">-->
      <!--<el-form-item label="提现管理" class="border_bottom">-->
      <!--<div class="add_right">-->
      <!--<el-input v-model="form.adminis" auto-complete="off"></el-input>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="备注" class="border_bottom">-->
      <!--<div class="add_right">-->
      <!--<el-input v-model="form.remarks" auto-complete="off"></el-input>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="交易密码" prop="pass" class="border_bottom">-->
      <!--<div class="add_right">-->
      <!--<el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入交易密码"></el-input>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="短信验证" class="border_bottom">-->
      <!--<div class="add_right">-->
      <!--<el-input v-model="form.ver" placeholder="请输入验证码"></el-input>-->
      <!--<p class="Verification">-->
      <!--<span>|</span>&nbsp;-->
      <!--<span>发送验证码</span>-->
      <!--</p>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
      <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
      <!--</div>-->
      <!--</el-dialog>-->

      <!--新增提现地址-->
      <i class="dialog">
        <el-dialog title="提现地址" center :visible.sync="dialogFormVisible" class="dialog-contentinfo"
                   width="35%">
          <el-form class="cent" label-width="120px" label-position="right">

            <el-form-item label="提现地址">
              <el-input class="input-info" v-model="newWithdrawAddress"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input class="input-info" v-model="remark"></el-input>
            </el-form-item>
            <el-form-item label="交易密码">
              <el-input class="input-info" v-model="tradePwd" placeholder="请输入交易密码"
                        type="password"></el-input>
            </el-form-item>
            <!--<div class="false-tips fz12 mt-5"><i v-show="tradePwdErrorMsg"></i>{{tradePwdErrorMsg}}-->
            <!--</div>-->


            <el-form-item label="短信验证码">
              <el-input class="input-info input-with-select" v-model="msgForNewAddress"
                        placeholder="请输入短信验证码">
                <el-button slot="append" size="mini" class="bdr0 w100p"
                           :disabled="msgDisabledForAddress"
                           v-on:click="sendCode('addAddress')">{{msgBtnTxt}}
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="      ">
              <div class="false-tips fz12 mt-10"><i v-show="addAddressErrorMsg"></i>{{addAddressErrorMsg}}
              </div>
            </el-form-item>
            <el-form-item label="      ">
              <el-button size="mini" class="" v-on:click="addNewAddress">确定提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </i>
    </div>
  </div>
</template>
<script>

  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  import tips from "./friendlyTips"

  export default {
    props: ['selectCoin'],//父组件传来的币种id
    data() {
      // var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'));
      //   } else {
      //     if (this.ruleForm2.checkPass !== '') {
      //       this.$refs.ruleForm2.validateField('checkPass');
      //     }
      //     callback();
      //   }
      // };
      return {
        // dialogFormVisible: false,
        // form: {
        //   adminis: '',
        //   remarks: '',
        //   ver: ''
        // },
        // ruleForm2: {
        //   pass: '',
        //   checkPass: '',
        // },


        dialogFormVisible: false,//新增提现地址框
        newWithdrawAddress: '',//新增提现地址
        remark: '',//新增提现地址备注
        tradePwd: '',//交易密码
        msgForNewAddress: '',//新增提现地址短信验证码
        msgBtnTxt: '获取验证码',//短信验证码文字
        msgDisabledForAddress: false,//短信验证码按钮状态
        submitWithdrawErrorMsg: '',//提交订单错误信息
        addAddressErrorMsg: '',//新增提现错误信息
        addAddressTimer: 0,//新增提现地址发送验证码时间

      }
    },
    methods: {
      //显示添加窗口
      showAddWin() {
        this.dialogFormVisible = true;
        console.log(this.selectCoin);
      },
      // //添加币种地址
      // addAddress() {
      //   let addAddUrl = common.apidomain + 'user/save_withdraw_address';
      //   let fd = new FormData();
      //   /*
      //   * withdrawAddr: FmSFk3bySA3K6zDsARmqcZnphvV9M76kTD
      //     totpCode: 0
      //     phoneCode: 111111
      //     symbol:
      //     password: lvby19910312
      //     remark: 添加的地址*/
      //   fd.append('withdrawAddr',);//提现地址
      //   fd.append('totpCode', 0);//
      //   fd.append('phoneCode',);//短信验证阿妈
      //   fd.append('symbol',);//币种id
      //   fd.append('password',);//交易密码
      //   fd.append('remark',);//备注
      // },
      //新增提现地址
      addNewAddress() {
        if (!this.newWithdrawAddress) {
          this.addAddressErrorMsg = '请输入新的提现地址';
          return;
        } else if (!this.tradePwd) {
          this.addAddressErrorMsg = '请输入交易密码';
          return;
        } else if (!this.msgForNewAddress) {
          this.addAddressErrorMsg = '请输入短信验证码';
          return;
        } else {
          this.addAddressErrorMsg = '';
        }

        let addNewAddressUrl = common.apidomain + 'user/save_withdraw_address';
        let fd = new FormData();
        /*
        *
        *withdrawAddr: FmSFk3bySA3K6zDsARmqcZnphvV9M76kTD
          totpCode: 0
           phoneCode: 111111
           symbol:
           password: lvby19910312
           remark: 添加的地址*/
        console.log(this.activeCoinId);
        fd.append('withdrawAddr', this.newWithdrawAddress);
        fd.append('totpCode', 0);
        fd.append('phoneCode', this.msgForNewAddress);
        fd.append('symbol', this.activeCoinId);
        fd.append('password', this.tradePwd);
        fd.append('remark', this.remark);
        ajax(addNewAddressUrl, 'post', fd, (res) => {
          console.log(res);
          if (res.data.code !== 200) {
            this.addAddressErrorMsg = res.data.msg;
            return;
          }
          this.$store.commit('changeDialogInfo', res.data.msg);
        });
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
    width: 430px;
    height: 80px;
    border: 1px solid #c2c3c8;
    border-radius: 5px;
    cursor: pointer;
  }

  .add_card > p {
    width: 30px;
    height: 30px;
    border: 1px solid #c2c3c8;
    border-radius: 50%;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin: 2% auto 5px;
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
