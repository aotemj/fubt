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
          <span>已设置</span>
          <span>登录富比特时使用</span>
          <span>设置/修改</span>
        </li>
        <li>
          <span>绑定手机：</span>
          <span>已绑定</span>
          <span>您绑定的手机为176****3306</span>
          <span>设置/修改</span>
        </li>
        <li>
          <span>绑定邮箱：</span>
          <span>已绑定</span>
          <span>您绑定的邮箱为153****928@qq.com</span>
          <span>设置/修改</span>
        </li>
        <li>
          <span>修改密码：</span>
          <span>已设置</span>
          <span>账户资金变动时需先验证交易密码</span>
          <span>设置/修改</span>
        </li>
        <li>
          <span>实名认证：</span>
          <span>已认证</span>
          <span>您的账号已通过实名认证</span>
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
      return {}
    },
    methods: {},
    computed: {
      userInfo(){
        return this.$store.state.userInfo;
      }
    },
    created() {
    },
    components: {}
  }
</script>
<style scoped>
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

  ul.subMenu > li:nth-child(3) > span:last-child {
    float: right;
  }

  ul.subMenu > li:nth-child(4) > span:last-child {
    float: right;
  }

  ul.subMenu > li:nth-child(5) > span:last-child {
    float: right;
  }

  ul.subMenu > li:nth-child(6) > span:last-child {
    float: right;
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
    margin-left: 8.5%;
  }

  .subMenu > li:nth-child(3) > span:nth-child(3),
  li:nth-child(4) > span:nth-child(3),
  li:nth-child(5) > span:nth-child(3),
  li:nth-child(6) > span:nth-child(3),
  li:nth-child(7) > span:nth-child(3) {
    margin-left: 20%;
  }
</style>
