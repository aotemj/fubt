<template>
  <div class="con-box">
    <tips></tips>
    <Header class="header"></Header>
    <div class="inner-box">
      <h4><span class ="active" v-on:click="activeId=1">邮箱找回密码</span></h4>
      <!--共用部分-->

      <div class="mobileReg-box">

        <!-- 邮箱地址 -->
        <div class="select-box">
          <input type="text" name="" placeholder="邮箱地址" v-model="emailaddress">
        </div>

        <!--证件类型-->
        <div class="select-box clearfix">
          <select class="mobile-box fr bn fz12" name="">
            <option value="" selected>身份证</option>
          </select>
          <input class="mobile-input fl" type="text" name="" placeholder="证件类型" disabled>
        </div>
        
        <!-- 证件号码 -->
        <div class="select-box" style="display:inline-block;">
          <input type="text" name=""  placeholder="证件号码"  v-model="idacard">
        </div>
        <span style="display:inline-block;">如果账户未实名可不填</span>

        <!-- 图片验证码 -->
        <!-- <div class="select-box">
          <input type="text" name="" placeholder="验证码">
        </div> -->

        <div class="select-box identify-box">
          <input type="text" v-model="imgCode" placeholder="验证码">
          <div class="inner-box cp" @click="refreshCode">
            <sIdentify class="image" :identifyCode="identifyCode"></sIdentify>
          </div>
        </div>
        
        <!-- 提示信息 -->
        <div class="tipinfo">{{tipinfo}}</div>
        
        <!-- 点击下一步按钮 -->
        <input class="register-btn dis-in-blk" type="button" v-on:click="next" value="下一步">

      </div>
    </div>
  </div>
</template>
<script>

  import Header from "./header"
  import common from "../kits/domain"
  import {ajax} from "../kits/http"
  import sIdentify from "./subcom/identify"//引入图片验证码组件
  import tips from './subcom/friendlyTips'//提示信息

  export default {
    data(){
      return {
        refreshStatus: false,//是否允许刷新
        imgCode: '',//图形验证码
        trueImgCode: '',//正确的图形验证码
        identifyCode: "",//验证码'
        imageRedisKey: "",//图片验证码key

        // activeId:1,//激活面板
        tipinfo:'',
        emailaddress:'',//邮箱地址
        idacard:'',//身份证
      }
    },
    methods:{
      // 1.0邮箱验证
      emailReg(){
        var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(this.emailaddress==''){
          this.tipinfo="请输入邮箱地址";
          return 0;
        }else if(!regEmail.test(this.emailaddress)){
          this.tipinfo="邮箱格式不正确";
          return 0;
        }else{
          this.tipinfo="";
          return 1;
        }
      },

      // 2.0发送邮箱验证码
      sendEmailcard(){
        var url = common.apidomain + 'validate/send_findbackmail';
        var fd = new FormData();
        fd.append('email',this.emailaddress);//必填项
        fd.append('imgcode',this.imgCode);//必填项
        fd.append('imageRedisKey',this.imageRedisKey);//必填项
        fd.append('idcard',1);//可选项
        fd.append('idcardno',this.idacard);//可选项
        ajax(url, 'post', fd, (res) => {
          console.log(res.data);
          if(res.data.code!==200){
            this.tipinfo = res.data.msg;
            return;
          }
          if(res.data.code==200){
            //弹出友情提示框
            this.$store.commit('changeDialogInfo',{dataInfo:'邮件发送成功，请点击邮件链接找回密码！'});

            //此条为假数据，用于验证成功后跳转到密码重置界面的:注意上面的不等号应该换一下位置才是正确的逻辑，此处只是为了测试
            // this.$store.commit('changeDialogInfo',{dataInfo:'邮件发送成功，请点击邮件链接找回密码！',skipurl:'/addNewPwdByEmail'});
            // this.$router.push({ path: '/addNewPwdByEmail' })//路由跳转
          }
        });
      },

      // 3.0图片验证码开始
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.makeCode();
      },
      makeCode() {
        let url = common.apidomain + 'servlet/ValidateImageServlet';
        ajax(url, 'post', {}, (res) => {
          if (res.data.code !== 200) {
            this.tipinfo = '获取图形验证码错误，请稍后再试';
            return;
          }
          this.identifyCode = res.data.data.verifyCode;
          this.imageRedisKey = res.data.data.imageRedisKey;
          console.log(res.data.data.imageRedisKey);
          // console.log(this.imageRedisKey);
          this.trueImgCode = this.identifyCode;
          // console.log(this.trueImgCode);
        })
      },

      // 4.0下一步按钮
      next(){
        if (!this.emailReg()){//验证邮箱
          return;
        }
        if(this.imgCode==''){//验证码为空验证
          this.tipinfo = '请输入图片验证码';
          return;
        }
        this.sendEmailcard();// 发送请求
        
      },

      

    

    },
    created(){},
    mounted(){
      this.makeCode();
    },
    components:{
      Header,
      sIdentify,//图片验证码
      tips,//友情提示框
    }
  }
</script>
<style scoped>


  /*提示信息样式*/
  .tipinfo{
    height: 15px;
    line-height: 15px;
  }
  .con-box>.inner-box{
    width:900px;
    /*height:400px;*/
    margin:200px auto;
    text-align: left;
  }
  .inner-box>h4 {
    font-size:14px;
    color:#8d959f;
  }
  .inner-box>h4>span{
    margin-right:20px;
    display:inline-block;
    cursor:pointer;
  }

  .inner-box>h4 span.active{
    font-size: 20px;
    color:#fff;
  }
  .select-box{
    border:1px solid #fff;
    width:400px;
    padding:10px 0 10px 10px;
    box-sizing: border-box;
    margin-bottom:15px;
    height:42px;
  }
  .select-box>.inner-box{
    background-color: transparent;
    /*border:1px solid #fff;*/
    outline:none;
    border:none;
    width:400px;
    border-radius:0;
    color:#fff;
  }
  .mobile-box{
    padding-right:10px;
    border-right:1px solid #fff;
  }
  option{
    border-radius:0;
    /*color:#fff;*/
  }
  .mobile-input{
    /*display:inline-block;*/
    /*padding:0 20px;*/
  }
  .verify-box{
    position: relative;
  }
  .verify-box .verify-btn{
    position: absolute;
    right:0;
  }
  .verify-box::before{
    content:'';
    height:15px;
    width:1px;
    background-color: #fff;
    position: absolute;
    right:80px;
    top:50%;
    transform: translateY(-50%);
  }
  .register-btn{
    margin-top:20px;
    width:100px !important;
    border:none !important;
    background-color:#445895;
    padding:10px 20px;
  }



  .identify-box {
    position: relative;
  }

  .identify-box .inner-box {
    position: absolute;
    right: 0;
    top: 0;
    width: 25.5%;
    height: 100%;
    /*background-color: pink;*/
    border-radius: 5px;
    /*border:1px solid #fff;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .identify-box .image {
    width: 100% !important;
  }
</style>
