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
          <span @click="modifyFormVisible = true" class="floatRight">设置/修改</span>
          <el-dialog title="修改登录密码" :visible.sync="modifyFormVisible" width="40%" center>  
            <el-form :model="form" class="modifyPassword">
              <el-form-item label="旧登录密码" class="modify">
                <input class="modifyInput" type="password" v-model="password" placeholder="旧密码">
              </el-form-item>
              <el-form-item label="新登录密码" class="modify">
                <input class="modifyInput"  type="password" v-model="password" placeholder="新密码">
              </el-form-item>
              <el-form-item label="确认新密码" class="modify">
                <input class="modifyInput"  type="password" v-model="confirmPwd" placeholder="确认新密码">
              </el-form-item>
              <el-form-item label="短信验证码" class="modify">
                <input class="modifyInput" type="text">
                <p class="Verification">
                  <span>|</span>&nbsp;
                  <span>发送验证码</span>
                </p>
              </el-form-item>
            </el-form>
            <div class="false-tips fz12"><i v-show="errorMsg"></i>{{errorMsg}}</div>
            <div slot="footer" class="dialog-footer footertop">
                <el-button type="primary" v-on:click="LoginPassword">确 定</el-button>
            </div>
          </el-dialog>
        </li>
        <li>
          <span>绑定手机：</span>
          <span v-if="userInfo.ftelephone !==false" >已绑定</span>
          <span v-else>未绑定</span>
          <span v-if="userInfo.ftelephone !==false">您绑定的手机为{{userInfo.ftelephone.substring(0,3)}}****{{userInfo.ftelephone.substring(7,11)}}</span>
          <span v-else>请绑定绑定手机号</span>

          <span @click="phoneFormVisible = true" class="floatRight">设置/修改</span>
          <el-dialog title="修改登录密码" :visible.sync="phoneFormVisible" width="40%" center>  
            <el-form :model="form" class="modifyPassword">
              <p>您正在为<span>  {{userInfo.ftelephone.substring(0,3)}}****{{userInfo.ftelephone.substring(7,11)}}</span>  修改绑定手机</p>
              <el-form-item label="原手机号码" class="modify">
                {{userInfo.ftelephone.substring(0,3)}}****{{userInfo.ftelephone.substring(7,11)}}
              </el-form-item>
              <el-form-item label="短信验证码" class="modify">
                <input class="modifyInput" type="text">
                <p class="Verification">
                  <span>|</span>&nbsp;
                  <span>发送验证码</span>
                </p>
              </el-form-item>
              <!-- <el-form-item label="所在地" class="modify">
                <el-select v-model="form.Location" placeholder="中国大陆(China)"  class="modifyInput">
                  <el-option label="中国大陆(China)" value="China"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="更换手机号" class="modify">
                <input class="modifyInput" type="text">
                <p class="Mainland">+{{ userInfo.fareacode }}</p>
              </el-form-item>
              <el-form-item label="验证码" class="modify">
                <input class="modifyInput" type="text">
                <p class="Verification">

                </p>
              </el-form-item>
              <el-form-item label="短信验证码" class="modify">
                <input class="modifyInput" type="text">
                <p class="Verification">
                  <span>|</span>&nbsp;
                  <span>发送验证码</span>
                </p>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footertop">
                <el-button type="primary" @click="phoneFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </li>
        <li>
          <span>绑定邮箱：</span>
          <span v-if="userInfo.fismailbind !==false">已绑定</span>
          <span v-else>未绑定</span>
          <span v-if="userInfo.fismailbind !==false">您绑定的邮箱为{{this.$store.state.userInfo.femail.substring(0,3)}}****{{this.$store.state.userInfo.femail.substring(11,19)}}</span>
          <span v-else>请绑定绑定邮箱</span>
          <span class="floatRight">设置/修改</span>
        </li>
        <li>
          <span>修改密码：</span>
          <span v-if="userInfo.floginpassword !==''">已设置</span>
          <span v-else>未设置</span>
          <span>账户资金变动时需先验证交易密码</span>
          <span class="floatRight" @click="transactionFormVisible = true">重置密码/修改密码</span>
          <el-dialog title="重置交易密码" :visible.sync="transactionFormVisible" width="40%" center>  
            <el-form :model="form" class="modifyPassword">
              <el-form-item label="身份证号" class="modify">
                <input class="modifyInput" type="text">
              </el-form-item>
              <el-form-item label="新交易密码" class="modify">
                <input class="modifyInput" type="text">
              </el-form-item>
              <el-form-item label="确认新密码" class="modify">
                <input class="modifyInput" type="text">
              </el-form-item>
              <el-form-item label="短信验证码" class="modify">
                <input class="modifyInput" type="text">
                <p class="Verification">
                  <span>|</span>&nbsp;
                  <span>发送验证码</span>
                </p>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footertop">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </li>
        <li>
          <span>实名认证：</span>
          <span v-if="userInfo.fhasrealvalidate !==false">已实名</span>
          <span v-else>未实名</span>
          <span v-if="userInfo.fhasrealvalidate !==false">您的账号已通过实名认证</span>
          <span v-else class="confirm">请实名认证</span>
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
  export default {
    data() {
      return {
        form:{

        },
        errorMsg: '',//错误提示
        password: '',//密码
        confirmPwd: '',//确认密码
        // 登录密码
        modifyFormVisible: false,
        //绑定手机
        phoneFormVisible: false,
        // 绑定邮箱
        // eamilFormVisible:false,
        //修改交易密码
        transactionFormVisible:false,
        errorMsg: '',//错误提示
    }
    },
    methods: {
      LoginPassword () {
        this.modifyFormVisible = false;
      },
      loginPassword(){
        if (!this.password) {
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

        let regUrl = common.apidomain +'user/modify_passwd';
        if(this.regType==0){
          fd.append('regName',this.registerInfo.phoneNum);//手机号
          fd.append('pcode',this.msgCode);//短信验证码
        }
        let fd = new FormData();
        fd.append('password',this.password);//密码
      }
     
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo;
      },
    },
    created() {
    },
    components: {
      
    }
  }
</script>
<style scoped>

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
  width: 70%;
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
  margin-right: 8%;
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
  width: 48%;
  height: 35px;
  border-radius: 5px;
  background: #19233c;
  outline: medium;
  border: 0;
  margin: 0 auto;
  color: #c2c3c8;
  margin-left: 9%;
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
  width: 10%;
  height: 27px;
  line-height: 27px;
  background: rgb(38, 42, 66);
  position: absolute;
  top: 6px;
  left: 90px;
  text-align: center;
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
