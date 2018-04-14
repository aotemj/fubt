<template>
  <div class="fund_box">
    <tips></tips>
    <div class="cards">
      <div class="add_card" @click="dialogFormVisible = true">
        <p>+</p>
        <span>添加银行卡</span>
      </div>
      <el-dialog title="添加银行卡" :visible.sync="dialogFormVisible" width="35%" center>
        <el-form id="from_add">
          <el-form-item label="开户姓名" class="border_bottom">
            <div class="add_right">
              <el-input v-model="username" auto-complete="off"></el-input>
            </div>
            <span class="hint_information">*银行卡账户名必须与您实名认证姓名一致</span>
          </el-form-item>

          <el-form-item label="银行卡号" class="border_bottom">
            <div class="add_right">
              <el-input v-model="bankAccount" auto-complete="off"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="确认卡号" class="border_bottom">
            <div class="add_right">
              <el-input v-model="confirmBankAccount" auto-complete="off"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="开户银行" class="border_bottom">
            <el-select class="reg_select" v-model="AccountOpening " placeholder="请选择银行类型">
              <el-option label="中国工商银行" value="1"></el-option>
              <el-option label="中国建设银行" value="2"></el-option>
              <el-option label="中国农业银行" value="3"></el-option>
              <el-option label="中国交通银行" value="4"></el-option>
              <el-option label="中国招商银行" value="5"></el-option>
              <el-option label="中国邮政储蓄银行" value="6"></el-option>
              <el-option label="中国银行" value="7"></el-option>
              <el-option label="中国民生银行" value="8"></el-option>
              <el-option label="中国光大银行" value="9"></el-option>
              <el-option label="兴业银行" value="10"></el-option>
              <el-option label="上海浦东银行" value="11"></el-option>
              <el-option label="中信银行" value="12"></el-option>
              <el-option label="华夏银行" value="14"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开户地址">
            <el-select class="selece_box" v-model="prov">
              <el-option v-for="(option,index) in arr" :value="option.name" :key="option.name">{{ option.name }}
              </el-option>
            </el-select>
            <el-select class="selece_box" v-model="city">
              <el-option v-for="(option,index) in cityArr" :value="option.name" :key="option.name">{{ option.name }}
              </el-option>

              <!--<el-option value="郑州市">{{ this.city }}</el-option>-->
              <!--<el-option value="州市"></el-option>-->
            </el-select>
            <el-select class="selece_box" v-model="district">
              <el-option v-for="(option,index) in districtArr" :value="option.name" :key="option.name">{{ option.name
                }}
              </el-option>
              <!--<el-option value="金水区" label="金水区">{{ this.district }}</el-option>-->
              <!--<el-option value="水区" label="金水区"></el-option>-->
            </el-select>
            <input type="text" class="prova" placeholder="请输入您的详细地址" v-model="address">
          </el-form-item>

          <!--<el-form-item label="短信验证" class="border_bottom">-->
          <!--<div class="add_right">-->
          <!--<el-input v-model="form.ver" placeholder="请输入验证码"></el-input>-->
          <!--<p class="Verification">-->
          <!--<span>|</span>&nbsp;-->
          <!--<span>发送验证码</span>-->
          <!--</p>-->
          <!--</div>-->
          <!--</el-form-item>-->


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
          <el-button type="primary" @click="addNewAddress">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import arrAll from "../../kits/dropDown"//三级联动
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  import tips from "./friendlyTips"//友情提示
  export default {
    data() {
      return {
        arr: arrAll,
        prov: '北京',//省
        city: '北京',//市
        district: '东城区',//区
        cityArr: [],
        districtArr: [],
        address: '',//详细地址

        dialogFormVisible: false,
        username: this.$store.state.userInfo.frealname,//用户姓名
        bankAccount: '',//银行卡号
        confirmBankAccount: '',//确认银行卡号
        AccountOpening: '',//开户行
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
        } else if (!this.bankAccount) {
          this.addAddressErrorMsg = '请输入您的银行卡号';
          return;
        } else if (this.confirmBankAccount != this.bankAccount) {
          this.addAddressErrorMsg = '您输入的银行卡号不一致';
          return;
        } else if (!this.AccountOpening) {
          this.addAddressErrorMsg = '请选择您的开户行';
          return;
        } else if (!this.msgForNewAddress) {
          this.addAddressErrorMsg = '请输入短信验证码';
          return;
        } else {
          this.addAddressErrorMsg = '';
        }

        let addNewAddressUrl = common.apidomain + 'user/save_bankinfo';
        let fd = new FormData();
        /*
        *
        * account: 1111111111111111111
          openBankType: 4
          totpCode: 0
          phoneCode: 111111
          address: 123
          prov: 河北
          city: 邯郸
          dist: 丛台区
          payeeAddr: 吕冰
          bankId: 0
          */
        fd.append('account', this.bankAccount);//银行卡号
        fd.append('openBankType', this.AccountOpening);//银行表示
        fd.append('totpCode', 0);
        fd.append('phoneCode', this.msgForNewAddress);//短信验证码
        fd.append('address', this.address);//短信验证码
        fd.append('prov', this.prov);//省
        fd.append('city', this.city);//市
        fd.append('dist', this.dist);//县区
        fd.append('payeeAddr', this.username);//县区
        fd.append('bankId', 0);//


        ajax(addNewAddressUrl, 'post', fd, (res) => {
          console.log(res);
          if (res.data.code !== 200) {
            this.addAddressErrorMsg = res.data.msg;
            return;
          }
          this.dialogFormVisible = false;
          this.$store.commit('changeDialogInfo', {dataInfo: res.data.msg});
          this.$parent.changeTabId(1);
        });
      },
      //发送验证码
      sendCode(msgType) {

        // if (this.username!=this.$store.state.userInfo.frealname) {
        //   this.addAddressErrorMsg = '请输入您的真实姓名';
        //   return;
        // } else if (!this.aliAccount) {
        //   this.addAddressErrorMsg = '请输入您的支付宝账号';
        //   return;
        // } else {
        //   this.addAddressErrorMsg = '';
        // }
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
            uid: 0
            */
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


      //  三级联动
      updateCity() {
        for (var i in this.arr) {
          var obj = this.arr[i];
          if (obj.name == this.prov) {
            this.cityArr = obj.sub;
            break;
          }
        }
        this.city = this.cityArr[1].name;
      },
      updateDistrict() {
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == this.city) {
            this.districtArr = obj.sub;
            break;
          }
        }
        if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
          this.district = this.districtArr[1].name;
        } else {
          this.district = '';
        }
      }
      //  三级联动结束
    },
    created() {
      console.log(this.$store.state.userInfo);
    },
    computed: {},
    components: {
      tips,//友情提示
    },
    beforeMount: function () {
      this.updateCity();
      this.updateDistrict();
    },
    watch: {
      prov() {
        this.updateCity();
        this.updateDistrict();
      },
      city() {
        this.updateDistrict();
      }
    }
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

  .reg_select {
    width: 80%;
    float: right;
    margin-right: 3%;
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
</style>
