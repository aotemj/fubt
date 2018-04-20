<template>
  <div class="push_box">
    <tips></tips>
    <el-form ref="form" label-width="80px">
       <el-form-item class="Unit border_bottom" label="账户余额">
        <span>{{ this.tota }}</span>
      </el-form-item>
      <el-form-item label="资产类型" class="border_bottom">
        <el-select class="reg_select" v-model="assetstype" aria-placeholder="请选择资产类型">
          <el-option  v-for="(item,index) in assets" :key="index" :value="item.fname">{{ item.fname }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收益类型" class="border_bottom">
        <el-select class="reg_select" v-model="profit">
          <el-option v-for="(item,index) in currencyList" :value="item.name" :key="index">{{ item.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" class="border_bottom">
        <el-input v-model="numb" min="100" placeholder="最小数量为100" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"></el-input>
      </el-form-item>
      <el-form-item label="交易密码" prop="pass" class="border_bottom">
        <el-input type="password" v-model="password" auto-complete="off" placeholder="请输入交易密码"></el-input>
      </el-form-item>
      <el-form-item label="短信验证" class="modify">
        <input class="modifyInput" type="text" v-model="ver">
        <input class="verify-btn" :disabled="assetsDisabled" type="button" v-on:click="sendCode"
                v-model="assetsBtnTxt">
      </el-form-item>
      <transition enter-active-class="animated shake">
        <div class="false-tips"><i v-show="errorMsg"></i>{{errorMsg}}</div>
      </transition>
      <el-form-item>
        <el-button type="primary" @click="submi">提交</el-button>
      </el-form-item>
    </el-form>
    <div class="empty"></div>
    <Monemy></Monemy>
  </div>
</template>
<script>

  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  import Monemy from "./moneyRecord.vue"
  import tips from './friendlyTips'//提示信息
  export default {
    data(){
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
        tota:'',//账户余额
        assetstype: '',//资产类型
        profit: 'FUC',//收益类型
        currencyList:[],//收益类型
        numb:'',//数量
        password:'',//交易密码
        assetsTime: 0,//短信验证码时间
        assetsDisabled: false,//短信验证码按钮状态
        assetsBtnTxt: "发送验证码",//短信验证码按钮文字
        ver: '',//短信验证码
        assets:[],//
        errorMsg:'',//错误提示
        pwdReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,//密码验证
      }
    },
    methods:{
      submi(){
        if(!this.numb){
          this.errorMsg = "请输入数量"
          return;
        }else if(!this.password){
          this.errorMsg = "请输入密码"
          return;
        }else if(!this.pwdReg.test(this.password)){
          this.errorMsg = "密码格式错误，密码必须大于等于6位且包含字母和数字！"
          return;
        }else if(this.$store.state.userInfo.frealname == null){
          this.errorMsg = "请实名认证"
          return;
        }else if(!this.ver){
          this.errorMsg = "请输入验证码！"
          return;
        }else{
          this.errorMsg = ""
        }

        let moneyUrla = common.apidomain + 'submit_finances';
        let moneya = new FormData();
        moneya.append('symbol', 1);//存币收益
        moneya.append('type', 4);//存币收益
        moneya.append('count', this.numb);//存币收益
        moneya.append('tradepwd', this.password);//存币收益D
        moneya.append('phonecode', this.ver);//存币收益D

        ajax(moneyUrla, 'post', moneya, (res) => {
          if(res.data.code !==200){
            return;
          }else{
            this.$store.commit('changeDialogInfo','存入成功')
            this.submitForm();
          }

        });
        
      },

      submitForm() {
        return new Promise((resolve, reject) => {
          let moneyUrl = common.apidomain + 'financial/finances';
          ajax(moneyUrl, 'post', {}, (res) => {
            resolve(res);
          });
       });
      },
      
      sendCode() {
        if(!this.password){
          this.errorMsg = "请输入密码"
          return;
        }else if(this.numb == 0){
          this.errorMsg = "數量不能为0"
          return;
        }else if(this.numb > this.tota){
            this.errorMsg = "余额不足"
            return;
        }else{
            this.errorMsg = ""
        }
        let loginUrl = common.apidomain + 'user/send_sms';
        let fd = new FormData();
        fd.append('type', 106);
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
    created(){
       this.submitForm().then((res) => {
          if (res.data.code !== 200) {
            return;
          }else{
            this.tota = res.data.data.userWallet.total
            this.assets =  res.data.data.typeList
            this.currencyList = res.data.data.financesCoinMap
            this.profit = res.data.data.financesCoinMap[0].name
          }
      });
    },
    computed:{
    },
    components:{
      Monemy,//存币记录
      tips,//弹窗组件
    }
  }
</script>
<style scoped>
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
.border_bottom{
  margin-bottom: 10px;
}
.push_box{
  padding-top: 2%;
}
.Unit {
  text-align: left;
}
button {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    /* background: #0e1326; */
    outline: medium;
    border: 0;
    margin: 0 auto;
    color: #c2c3c8;
}
.user-recharge>section>button:hover{
  background: #409EFF;
  color: #fff;
  cursor: pointer;
}
.reg_select{
  width: 100%;
}
.empty{
  width: 100%;
  height: 20px;
  background: #1e253d;
}
.Verification{
  float: right;
  position:absolute;
  top:0px;
  right: 4%;
  cursor: pointer;
}
</style>