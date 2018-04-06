<template>
	<div class="header-box">
		<!--<div class="inner-content clearfix">-->
		<div class="inner-content">
			<!--<div class="left fl clearfix">-->
			<div class="left">
				<!--<div class="logo fl">-->
				<div class="logo">
          <a href="https://www.fubt.top"><img src="https://www.fubt.top//front/images/index/logo_03.png" alt=""></a>
        </div>
				<!--<div class="nav fl">-->
				<div class="nav">
					<ul class="">
						<li class="fl" ><router-link v-bind:class="{active:activeRoute=='home'}" data-no="1" to="/">{{$t('m.home')}}</router-link></li>
						<li class="fl" ><router-link v-bind:class="{active:activeRoute=='exchange'}" data-no="2" to="/exchange">{{$t('m.tradingCenter')}}</router-link></li>
						<li class="fl finance-center" v-on:mouseover="showLink" v-on:mouseleave="hideLink">
              <router-link v-bind:class="{active:activeRoute=='finance'}" data-no="3" to="/finance">{{$t('m.financeCenter')}}
              </router-link>
            </li>
						<li class="fl" >
              <!--<router-link v-bind:class="{active:activeRoute=='market'}" data-no="4" to="/market">{{$t('m.marketCenter')}}</router-link>-->
              <a href="https://www.fubt.top/trademarket.html">{{$t('m.marketCenter')}}</a>
            </li>
						<li class="fl" ><router-link v-bind:class="{active:activeRoute=='newCoins'}" data-no="5" to="/newCoins">{{$t('m.voteForNewCurrency')}}</router-link></li>
						<li class="fl" ><router-link v-bind:class="{active:activeRoute=='news'}" data-no="6" to="/news">{{$t('m.news')}}</router-link></li>
						<li class="fl" ><router-link v-bind:class="{active:activeRoute=='c2c'}" data-no="7" to="/c2c">{{$t('m.C2C')}}</router-link></li>
					</ul>
				</div>
			</div>
			<!--<div class="right fr clearfix">-->
			<div class="right">

        <!--登录注册-->
				<div class="login fl" v-if="!isLogin">
					<ul class="clearfix">
            <li class="fl"><router-link to="/login">{{$t('m.login')}}</router-link></li>
						<li class="fl"><router-link to="/register">{{$t('m.register')}}</router-link></li>
					</ul>
				</div>

        <!--欢迎页面-->
        <div class="welcome login fl" v-else="isLogin">
          <ul class="clearfix">
            <li class="fl percenter" @mouseover="onMouseOver" @mouseleave="upMouseOut">
              <a href="#">您好，{{this.$store.state.userInfo.frealname}}</a>
              <!-- 悬浮弹窗个人信息在此展示 -->
              <div slot="content" class="personal_center" v-show="per">
                <Personal></Personal>
              </div>
            </li>
            <!-- <li class="fl"><router-link to="/" @click.prevent="quit">{{$t('m.logout')}}</router-link></li> -->
            <li class="fl"><a href="#" @click.prevent="quit">{{$t('m.logout')}}</a></li>
          </ul>
        </div>
        <!--切换语言-->
        <div class="change-lang fl" v-on:mouseover="showCountryList" v-on:mouseleave="hideCountryList">
          <i class="selected-country" v-bind:class="{'ch':lang['zh-CN'],'es':lang['en-US'],'ch-fan':lang['zh-FN']}"></i>
          <!--国家列表-->
          <div class="country-list" v-show="countryListIsShow">
            <ul v-on:mouseleave="hideCountryList">
              <li class="clearfix" v-on:click="chooseLang('zh-CN')"><span class="fl">简体中文</span> <i class="fr country chinese"></i></li>
              <li class="clearfix" v-on:click="chooseLang('en-US')"><span class="fl" >English</span> <i class="fr country english"></i></li>
              <li class="clearfix" v-on:click="chooseLang('zh-FN')"><span class="fl" >繁體中文</span> <i class="fr country fanti"></i></li>
            </ul>
          </div>
        </div>
			</div>
		</div>
	</div>
</template>
<script>
  import Personal from './subcom/userpersonal_center'
  import common from "../kits/domain"
  import {ajax} from "../kits/http"
  // import common from "./"
	export default {
		data(){
			return {
        countryListIsShow:false,//语言列表切换
        activeRoute:'home',//当前激活标签标记
        // isLogin:this.$store.state.isLogin,//用户当前登录状态
        financeListIsShow:false,//财务中心连接显示状态
        lang:{
          'zh-CN':true,//中文
          'en-US':false,//英文
          'zh-FN':false,//中文繁体
        },
        per:false,//悬浮弹窗个人信息默认是隐藏的
			}
		},
		created(){
      this.activeRoute = this.$route.name;//头部点击样式添加
      // let msgUrl = common.apidomain + 'user/send_sms';
      //
      // let fd = new FormData();
      //
      // fd.append('type',111);
      // fd.append('msgtype',1);
      // fd.append('areaCode','+86');
      // fd.append('phone',this.registerInfo.phoneNum);
      // fd.append('vcode',this.imgCode);
      // fd.append('uid',0);
      // ajax(msgUrl,'post',fd,(res)=>{
      //   console.log(res);
      // })
		},

		methods:{
			// 点击切换active
			selected(e){
			  // console.log(123);
				// console.dir(e.target.dataset.no);
				// this.activeRoute = e.target.dataset.no;
			},
      showCountryList(){//语言列表显示
			  this.countryListIsShow =true;
      },
      hideCountryList(){//语言列表隐藏
			  this.countryListIsShow = false;
      },
      showLink(){//财务中心显示
        this.financeListIsShow=true;
      },
      hideLink(){//财务中心隐藏
        this.financeListIsShow=false;
      },
      chooseLang(e){
			  if(e==this.$store.state.lang){
          this.hideCountryList();
			    return;
        }
        for(let k in this.lang){
			    this.lang[k] = false;
        }
        this.lang[e]=true;
        this.$store.state.lang = e;
        this.$i18n.locale = this.$store.state.lang;
			  this.hideCountryList();
      },
      onMouseOver(){// 鼠标移入名字悬浮弹窗个人信息显示事件
        this.per = true
      },
      upMouseOut(){// 鼠标移出名字悬浮弹窗个人信息隐藏事件
        this.per = false
      },
      // 退出系统
      quit:function(){//点击退出按钮触发事件
        // console.log("1")
        this.$router.push({path:'/'});//点击退出到首页
        this.$store.commit('userLogOut');//从前端退出系统：改变用户的登陆状态->未登陆
        // 发送请求接口：从后台 退出 系统
        var url = common.apidomain + 'user/logout';
        // var formData = new FormData();
        ajax(url, 'post', {}, (res) => {
          // console.log(res.data)
        });
        // console.log(this.userInfo)
      },
		},
    computed:{
		  isLogin(){
		    return this.$store.state.isLogin;
      }
    },
    components:{Personal}
  }
</script>
<style scoped>
	.header-box{
		width:100%;
		padding:0 100px;
	}
	.inner-content{
		/*width:100%;*/
		/*height:100%;*/
    /*display:flex;*/
    width: 1300px;
    margin: 0 auto;
    /*width:100%;*/
    height:100%;
    display:flex;
	}
  .inner-content .left {
    flex:4;
    display:flex;
  }
  .inner-content .left .logo{
    flex:1;
  }
  .inner-content .left .nav{
    flex:4;
  }
  .inner-content .left .nav ul {
  }
  .inner-content .right{
    flex:1;
    display:flex;
  }
	.logo img{
		vertical-align: middle;
	}
	.nav ul li {
		padding:0 10px;
    /*flex:1;*/
	}
	.nav ul li a.active{
		color:#2d76d1;
	}
	/*.nav ul li.active a,.nav ul li a:hover{*/
		/*color:#2d76d1;*/
	/*}*/
  .right{

  }
  .login,.welcome{
    margin-right:20px;
  }
	.nav ul li a,.login ul li a {
		color:#fff;
	}
  .login ul li{
    padding:0 10px;
  }
  /*切换语言*/
  .change-lang{
    right:10px;
    width: 20px;
    height:85px;
    line-height:85px;
    position:relative;
    top:2px;
  }
  .selected-country{
    display:block;
    width:21px;
    height:16px;
    background:green url('../assets/country.png') no-repeat;
    background-position: center center;
    background-size:21px 70px;
    /*margin-top:8px;*/
    position: absolute;
    top:50%;
    transform:translateY(-75%);
    cursor:pointer;
  }

  .selected-country.ch{
    background-position: center center !important;
  }
  .selected-country.es{
    background-position: center top !important;
  }
  .selected-country.ch-fan{
    background-position: center bottom !important;
  }

  .country {
    display:block;
    width:21px;
    height:16px;
    background:url('../assets/country.png') no-repeat center bottom;
    background-size:21px 70px;
    /*margin-top:8px;*/
  }
  /*中文*/
  .chinese{
    background-position: center center;
  }
  /*英文*/
  .english{
    background-position: center top;
  }
  /*中文繁体*/
  .fanti{
    background-position:center bottom;
  }
  .country-list{
    position:absolute;
    bottom:-90px;
    right: -10px;
    background-color: rgba(0,0,0,.7);
    box-sizing: border-box;
    padding:0 10px;
  }
  .country-list ul{
    cursor:pointer;
  }
  .country-list ul li {
    height:40px;
    width:100px;
    line-height:40px;
    position: relative;
  }
  .country-list ul li i {
    position: absolute;
    right:0;
    top:50%;
    transform: translate(0,-50%);
  }
  /*财务中心下拉图标*/
  .icon-htmal5icon03,.icon-htmal5icon03-copy{
    font-size: 12px;
  }
  /*财务中心li*/
  .finance-center{
    position: relative;
  }
  .finance-center .router-box{
    background-color:#1d2639;
    position: absolute;
    top:60px;
    left:0;
    width:100%;
    line-height:30px;
  }
  .finance-center .router-box a{
    font-size: 12px;
  }

  /* 个人中心 */
  .percenter{
    position: relative;
  }
  .personal_center{
    width: 400px;
    height: 500px;
    background: rgba(0,0,0,0.5);
    position:absolute;
    top:85px;
    right:-108px;
  }
</style>
