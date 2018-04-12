<template>
  <div>
    <div class="security">
      <p class="account-info">账户信息</p>
      <ul class="subMenu">
        <li>
          <span>账户：</span>
          <span>{{userInfo.ftelephone.substring(0,3)}}****{{userInfo.ftelephone.substring(7,11)}}</span>
        </li>
        <li>
          <span>UID：</span>
          <span>{{userInfo.fid}}</span>
        </li>
        <li>
          <span>登录密码：</span>
          <span v-if="userInfo.floginpassword !==''">已设置</span>
          <span v-else>未设置</span>
          <span>登录富比特时使用</span>
          <span @click="modifyFormVisible = true" class="floatRight">修改</span>
          <el-dialog title="修改登录密码" :visible.sync="modifyFormVisible" width="30%" center>  
            <el-form :model="form" class="modifyPassword">
              <el-form-item label="旧登录密码" class="modify">
                <input class="modifyInput" type="password" v-model="codepassword" placeholder="旧密码">
              </el-form-item>
              <el-form-item label="新登录密码" class="modify">
                <input class="modifyInput"  type="password" v-model="password" placeholder="新密码">
              </el-form-item>
              <el-form-item label="确认新密码" class="modify">
                <input class="modifyInput"  type="password" v-model="confirmPwd" placeholder="确认新密码">
              </el-form-item>
              <el-form-item label="短信验证码" class="modify">
                <input class="modifyInput" type="text" v-model="msgCode">
                <input class="verify-btn" :disabled="msgDisabled" type="button" v-on:click="sendCode"
                 v-model="msgBtnTxt">
              </el-form-item>
            </el-form>
            <div class="false-tips fz12"><i v-show="errorMsg"></i>{{errorMsg}}</div>
            <div slot="footer" class="dialog-footer footertop">
                <el-button type="primary" v-on:click="loginPassword">确 定</el-button>
            </div>
          </el-dialog>
        </li>
        <li>
          <span>绑定手机：</span>
          <span v-if="userInfo.ftelephone !==false" >已绑定</span>
          <span v-else>未绑定</span>
          <span v-if="userInfo.ftelephone !==false">您绑定的手机为{{userInfo.ftelephone.substring(0,3)}}****{{userInfo.ftelephone.substring(7,11)}}</span>
          <span v-else>请绑定绑定手机号</span>
          <span @click="phoneFormVisible = true" class="floatRight">修改</span>
          <el-dialog title="绑定手机" :visible.sync="phoneFormVisible" width="40%" center>  
            <el-form :model="form" class="modifyPassword">
              <p>您正在为<span>  {{userInfo.ftelephone.substring(0,3)}}****{{userInfo.ftelephone.substring(7,11)}}</span>  修改绑定手机</p>
              <el-form-item label="原手机号码" class="modify">
                {{userInfo.ftelephone.substring(0,3)}}****{{userInfo.ftelephone.substring(7,11)}}
              </el-form-item>
              <el-form-item label="短信验证码" class="modify">
                <input class="modifyInput" type="text" v-model="msgCode">
                <input class="verify-btn" :disabled="msgDisabled" type="button" v-on:click="phoneCode"
                 v-model="msgBtnTxt">
              </el-form-item>
              <el-form-item label="所在地" class="modify">
               <select class="modifyInput">
                  <option value="中国大陆(China)">中国大陆(China)</option>
                </select>
              </el-form-item>
              <el-form-item label="更换手机号" class="modify">
               <input class="modifyInput inp" type="text">
                <p class="Mainland">+{{ userInfo.fareacode }}</p>
              </el-form-item>
              <el-form-item label="验证码" class="modify">
                <input class="modifyInput" type="text">
                <div class="inner-box cp" @click="refreshCode">
                  <sIdentify class="image" :identifyCode="identifyCode"></sIdentify>
                </div>
              </el-form-item>
              <el-form-item label="短信验证码" class="modify">
                 <input class="modifyInput" type="text" v-model="msgCode">
                <input class="verify-btn" :disabled="msgDisabled" type="button" v-on:click="sendCode"
                 v-model="msgBtnTxt">
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footertop">
                <el-button type="primary" @click="phoneFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </li>
        <li>
          <span>绑定邮箱：</span>
          <span v-if="userInfo.femail !==null">已绑定</span>
          <span v-else>未绑定</span>
          <span v-if="userInfo.femail !==null">您绑定的邮箱为{{this.$store.state.userInfo.femail.substring(0,3)}}****{{this.$store.state.userInfo.femail.substring(11,19)}}</span>
          <span v-else>请绑定绑定邮箱</span>
          <span class="floatRight" @click="EmailFormVisible = true" v-if="userInfo.femail ==null">修改</span>
          <span v-else></span>
          <el-dialog title="绑定邮箱" :visible.sync="EmailFormVisible" width="30%" center>
            <el-form :model="form" class="modifyPassword">
              <el-form-item label="邮箱地址" class="modify">
                <input class="modifyInput" type="email" v-model="EmailNum">
              </el-form-item>
            </el-form> 
            <div class="false-tips fz12"><i v-show="emailMsg"></i>{{emailMsg}}</div>
            <div slot="footer" class="dialog-footer footertop">
                <el-button type="primary" v-on:click="Bindingmailbox">确 定</el-button>
            </div>
          </el-dialog>
        </li>
        <li>
          <span>交易密码：</span>
          <span v-if="userInfo.ftradepassword !==''">已设置</span>
          <span v-else>未设置</span>
          <span>账户资金变动时需先验证交易密码</span>
          <span class="floatRight" @click="transactionFormVisible = true">重置密码</span>
          <el-dialog title="重置交易密码" :visible.sync="transactionFormVisible" width="40%" center>  
            <el-form :model="form" class="modifyPassword">
              <el-form-item label="身份证号" class="modify">
                <input class="modifyInput" type="text" v-model="IDNumber">
              </el-form-item>
              <el-form-item label="新交易密码" class="modify">
                <input class="modifyInput" type="password" v-model="newpassword">
              </el-form-item>
              <el-form-item label="确认新密码" class="modify">
                <input class="modifyInput" type="password" v-model="confirmpassword">
              </el-form-item>
              <el-form-item label="短信验证码" class="modify">
               <input class="modifyInput" type="text" v-model="magCode">
                <input class="verify-btn" :disabled="magDisabled" type="button" v-on:click="phoneCode"
                 v-model="magBtnTxt">
              </el-form-item>
            </el-form>
            <div class="false-tips fz12"><i v-show="errorMsg"></i>{{errorMsg}}</div>
            <div slot="footer" class="dialog-footer footertop">
                <el-button type="primary" v-on:click="Transactionpwd">确 定</el-button>
            </div>
          </el-dialog>
        </li>
        <li>
          <span>实名认证：</span>
          <span v-if="userInfo.fhasrealvalidate !==false">已实名</span>
          <span v-else>未实名</span>
          <span v-if="userInfo.fhasrealvalidate !==false">您的账号已通过实名认证</span>
          <span v-else class="confirm">请实名认证</span>
          <span class="floatRight" @click="RealFormVisible = true" v-if="userInfo.frealname !==''">修改</span>
          <span v-else></span>
          <el-dialog title="实名认证：" :visible.sync="RealFormVisible" width="30%" center>  
            <el-form :model="form" class="modifyPassword">
               <p><span>认证年龄需满18周岁，最高年龄为60周岁</span></p>
              <el-form-item label="真实姓名" class="modify">
                <input class="modifyInput" type="text" v-model="realname">
                <p><span style="display:inline-block">*请填写真实姓名，认证后不能更改，提现是需要与银行等姓名信息保持一致。</span></p>
              </el-form-item>
              <el-form-item label="地区/国家" class="modify">
               <select class="modifyInput">
                  <option value="">中国大陆(China)</option>
                </select>
              </el-form-item>
              <el-form-item label="证件类型" class="modify" v-model="identitytype">
               <select class="modifyInput">
                  <option value="">身份证</option>
                </select>
              </el-form-item>
               <el-form-item label="证件号码" class="modify">
                <input class="modifyInput" type="text" v-model="realnameID">
              </el-form-item>
            </el-form> 
            <div class="false-tips fz12"><i v-show="RealMsg"></i>{{RealMsg}}</div>
            <div slot="footer" class="dialog-footer footertop">
              <el-button type="primary" v-on:click="Realnamebox">确 定</el-button>
            </div>
          </el-dialog>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  /*
  * {…}
fareacode:"86"                                //区域代码
fbirth:null                                   //生日
femail:null                                   //邮箱
fgoogleauthenticator:null                     //谷歌认证
fgooglebind:false                             //谷歌绑定
fgoogleurl:null
fhasrealvalidate:false                        //实名认证
fhasrealvalidatetime:null                     //实名认证时间
fid:300221                                    //用户id
fidentityno:null
fidentitytype:0                               //验证类型
fintrouid:null
finvalidateintrocount:0                       //
fiscny:1                                      //是人民币
fiscny_s:"正常"
fiscoin:1                                     //是虚拟货币
fiscoin_s:"正常"
fismailbind:false                             //是邮箱绑定
fistelephonebind:true                         //是电话绑定
flastip:3232235788                            //最近的ip
flastlogintime:1523091285933                  //最近登录时间
floginname:"18625512982"
floginpassword:"aEaGBoTwUCmrzMCaU81m8Q=="     //登录密码
fnickname:"18625512982"                       //昵称
fplatform:null                                //平台
frealname:null                                //真实姓名
fregistertime:1523001609000                   //注册时间
fshowid:300221
fstatus:1
fstatus_s:"正常"
ftelephone:"18625512982"                      //电话
ftradepassword:null                           //交易密码
ftradepwdtime:null                            //设定交易密码时间
fupdatetime:1523001609000                     //更新时间
identitytype:0                                //身份类别
ip:"192.168.1.12"                             //ip
isVideo:null                                  //是否有视频
level:0                                       //等级
score:0                                       //分数
version:61                                    //版本号
videoTime:null*/
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  export default {
    data() {
      return {
        form:{

        },
        // 登录密码
        modifyFormVisible: false,
        errorMsg: '',//错误提示
        codepassword:'',//旧密码
        password: '',//新密码
        confirmPwd: '',//确认密码
        msgDisabled: false,//短信验证码按钮状态
        msgBtnTxt: "发送验证码",//短信验证码按钮文字
        msgCode: '',//短信验证码
        //绑定手机
        phoneFormVisible: false,

        // 修改交易密码
        IDNumber:'',//身份证
        newpassword:'',//交易新密码
        confirmpassword:'',//交易确认密码
        magDisabled: false,//短信验证码按钮状态
        magBtnTxt: "发送验证码",//短信验证码按钮文字
        magCode:'',

         // 绑定邮箱
        EmailFormVisible:false,
        EmailNum:'',
        emailMsg:'',//绑定邮箱错误提示
        // 绑定邮箱
        // eamilFormVisible:false,

        //实名认证
        RealFormVisible:false,
        realname:'',//真实姓名
        realnameID:'',//证件号码
        identitytype:'',//证件类型
        identifyCode: "",//验证码'
        imageRedisKey: "",//图片验证码key
        RealMsg:'',//错误提示
        //修改交易密码
        transactionFormVisible:false,
        errorMsg: '',//错误提示
        emailReg: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        pwdReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,//密码
        isIDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证
    }
    },
    methods: {
      //修改登录密码
      loginPassword(){
        if(!this.codepassword){
          this.errorMsg = '请输入旧密码';
          return;
        }else if (!this.pwdReg.test(this.codepassword)) {
          this.errorMsg = "密码格式错误，密码必须大于等于6位且包含字母和数字！"
          return;
        }else if (!this.password) {
          this.errorMsg = '请输入密码';
          return;
        } else if (!this.pwdReg.test(this.password)) {
          this.errorMsg = "密码格式错误，密码必须大于等于6位且包含字母和数字！"
          return;
        } else if (!this.confirmPwd) {
          this.errorMsg = '请再次输入密码';
          return;
        } else if (this.password !== this.confirmPwd) {
          this.errorMsg = '两次输入密码不一致'
          return;
        }else {
          this.errorMsg = '';
        }
       
        var regUrl = common.apidomain +'user/modify_passwd';
        let fda = new FormData();
        fda.append('password', this.password);//密码
        ajax(regUrl, 'post', fda, (res) => {
          console.log(res)
         
        })
      },

      //修改交易密码
      Transactionpwd(){
        if(!this.IDNumber){
          this.errorMsg = '请输入身份证';
          return;
        }else if (!this.isIDCard.test(this.IDNumber)) {
          this.errorMsg = "身份证格式错误，必须等于18位只能为数字！"
          return;
        }else if (!this.pwdReg.test(this.newpassword)) {
          this.errorMsg = "密码格式错误，密码必须大于等于6位且包含字母和数字！"
          return;
        }else if (!this.newpassword) {
          this.errorMsg = '请输入密码';
          return;
        } else if (!this.pwdReg.test(this.newpassword)) {
          this.errorMsg = "密码格式错误，密码必须大于等于6位且包含字母和数字！"
          return;
        } else if (!this.confirmpassword) {
          this.errorMsg = '请再次输入密码';
          return;
        } else if (this.newpassword !== this.confirmpassword) {
          this.errorMsg = '两次输入密码不一致'
          return;
        }else {
          this.errorMsg = '';
        }
        var regUrl = common.apidomain +'user/modify_passwd';
        
        ajax(regUrl, 'post', {}, (res) => {
          
          console.log(res)
         
        })

      },
      //60s短信倒计时
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
      //短信验证码验证
      msgCodeReg() {
        if (!this.msgCode) {
          this.errorMsg = '请输入短信验证码';
          return 0;
        }else {
          return 1;
        }
      },
      //绑定邮箱
      Bindingmailbox(){
        if(!this.EmailNum){
          this.emailMsg = '请输入邮箱';
          return;
        }else if (!this.emailReg.test(this.EmailNum)) {
          this.emailMsg = "邮箱格式错误"
          return;
        }else {
          this.emailMsg = '';
          // validate/send_bindmail
        }
        let EmailUrl = common.apidomain + 'validate/send_bindmail';
        let Ed = new FormData();
        Ed.append('email',this.EmailNum);
        ajax(EmailUrl, 'post', Ed, (res) => {
          console.log(res);
          this.errorMsg = res.data.msg;
          return; 
        })
      },
      //修改登录密码发送验证码
      sendCode() {
        let msgUrl = common.apidomain + 'user/send_sms';
        let fd = new FormData();
        /*
        type: 106
        msgtype: 1
        areaCode: 0
        phone: 0
        vcode: 0
        uid: 0*/
        fd.append('type', 106);
        fd.append('msgtype', 1);
        fd.append('areaCode', 0);
        fd.append('phone', 0);
        fd.append('vcode', 0);
        fd.append('uid', 0);
        ajax(msgUrl, 'post', fd, (res) => {
          console.log(res);
          if(res.data.code!==200){
            this.errorMsg = res.data.msg;
            return;
          }else{
            this.msgTime = 60;
            this.msgDisabled = true;
            this.msgTimer();
          }
        })
      },
    // 手机绑定
     phoneCode(){
       let msgUrl = common.apidomain + 'user/send_sms';
        let fd = new FormData();
        /*
        type: 106
        msgtype: 1
        areaCode: 0
        phone: 0
        vcode: 0
        uid: 0*/
        fd.append('type', 106);
        fd.append('msgtype', 1);
        fd.append('areaCode', 0);
        fd.append('phone', 0);
        fd.append('vcode', 0);
        fd.append('uid', 0);
        ajax(msgUrl, 'post', fd, (res) => {
          console.log(res);
          if(res.data.code!==200){
            this.errorMsg = res.data.msg;
            return;
          }else{
            this.msgTime = 60;
            this.msgDisabled = true;
            this.msgTimer();
          }
        })
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
      emailTimer() {
        if (this.emailTime > 0) {
          this.emailTime--;
          this.emailBtnTxt = this.emailTime + "s后重新获取"
          setTimeout(this.emailTimer, 1000);
        } else {
          this.emailTime = 0;
          this.emailBtnTxt = "获取验证码";
          this.emailDisabled = false;
        }
      },
      /*发送验证码结束*/
      /*图片验证码开始*/
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        if (this.regType == 0) {
          if (!this.phoneNumReg()) {
            return;
          }
        } else {
          if (!this.emailNumReg()) {
            return;
          }
        }
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
          this.imageRedisKey = res.data.data.imageRedisKey;
          // console.log(this.imageRedisKey);
          this.trueImgCode = this.identifyCode;
          console.log(this.trueImgCode)
        })
      },
      /*图片验证码结束*/
      //手机号验证：
      phoneNumReg() {
        if (!this.registerInfo.phoneNum) {
          this.errorMsg = '请输入手机号';
          return 0;
        } else if (!this.phoneReg.test(this.registerInfo.phoneNum)) {
          this.errorMsg = '您输入的手机号格式不正确';
          return 0;
        } else {
          this.errorMsg = '';
          return 1;
        }
      },

     //实名认证
     Realnamebox(){
        if(!this.realname){
          this.RealMsg = '请输入用户名';
          return;
        }else if(!this.realnameID){
          this.RealMsg = '请填写证件号';
          return;
        }else if(!this.isIDCard.test(this.realnameID)){
          this.RealMsg = '证件号格式不正确';
          return;
        }else{
          this.RealMsg = '';
        }
        var RealUrl = common.apidomain +'real_name_auth';
        let Rfd = new FormData();
        Rfd.append('realname', this.realname);
        Rfd.append('identitytype', -1)
        Rfd.append('identityno', this.identityno)
        Rfd.append('address', '+86')
        
        ajax(RealUrl, 'post', Rfd, (res) => {
          console.log(res)
          this.errorMsg = res.data.msg;
          return; 
        })  
     }

    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo;
      },
    },
    created() {
      console.log(this.$store.state.userInfo.ftradepassword)
    },
    components: {
      
    }
  }
</script>
<style scoped>
/* 短信验证 */
.verify-btn{
    width: 105px;
    position: absolute;
    top: 9px;
    right: 3px;
    cursor: pointer;
    background: #000;
    height: 27px;
}
.confirm{
  color: #2884e6;
}
.account-info,
.subMenu > li {
  line-height: 50px;
}

.subMenu, .account-info {
  color: #c2c3c8;
  background: #0e1326;
}

.security > ul {
  color: #c2c3c8;
  background: #0e1326;
}

.security {
  width: 100%;
}

.account-info {
  width: 100%;
  height: 50px;
  margin-bottom: 9px;
  font-size: 16px;
  font-family: '微软雅黑';
  padding: 0 30px;
  box-sizing: border-box;
  text-align: left;
}

.subMenu {
  margin-bottom: 22px;
}

ul.subMenu > li:first-child {
  border-top: 0;
}

ul.subMenu > li {
  height: 50px;
  border-top: 1px solid #1c253a;
  margin: 0 30px;
  font-family: '微软雅黑';
  font-size: 12px;
  cursor: pointer;
  text-align: left;
}

.floatRight{
  float: right;
  color: #2884e6;
}

.subMenu > li:first-child > span:last-child,
.subMenu > li:nth-child(2) > span:last-child {
  margin-left: 10%;
}

.subMenu > li:nth-child(3) > span:nth-child(2),
li:nth-child(4) > span:nth-child(2),
li:nth-child(5) > span:nth-child(2),
li:nth-child(6) > span:nth-child(2),
li:nth-child(7) > span:nth-child(2) {
  margin-left: 8%;
}

.subMenu > li:nth-child(3) > span:nth-child(3),
li:nth-child(4) > span:nth-child(3),
li:nth-child(5) > span:nth-child(3),
li:nth-child(6) > span:nth-child(3),
li:nth-child(7) > span:nth-child(3) {
  margin-left: 20%;
}

/* 修改密码 */
.modifyPassword{
  width: 300px;
  margin-top: -25px;
}
.modifyPassword p:first-child{
  text-align: center;
  margin-bottom: 10px;
}
.modifyPassword p:first-child span{
  color: #2884e6;
}
.modifyInput{
  width: 70%;
  float: right;
  /* margin-right: 8%; */
  height: 30px;
  border: 1px solid #c2c3c8;
  border-radius: 5px;
  margin-top: 7px;
  padding-left: 3%;
  background: #19233c;
}
.modifydialog{
  margin-bottom:0; 
}
.modify{
  margin-bottom: 10px;
}
.footertop{
  margin-top: -30px;
}
button{
      width: 60%;
    height: 35px;
    border-radius: 5px;
    background: #19233c;
    outline: medium;
    border: 0;
    margin: 0 auto;
    color: #c2c3c8;
    margin-left: 27%;
}
.Verification{
  float: right;
  position:absolute;
  top: 1.5px;
  right: 12%;
  cursor: pointer;
}
/* 绑定手机 */
/* .selectRight{
  width: 70%;
  margin-left: 7%;
} */

.Mainland{
  width: 20%;
  height: 27px;
  line-height: 27px;
  background: rgb(38, 42, 66);
  position: absolute;
  top: 9px;
  left: 93px;
  text-align: center;
}
.inp{
  padding-left: 24% !important;
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
    -webkit-background-size: 16px 16px;
    background-size: 16px 16px;
  }
</style>
