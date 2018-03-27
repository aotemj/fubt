<template>
	<div class="header-box">
		<div class="inner-content clearfix">
			<div class="left fl clearfix">
				<div class="logo fl">
          <a href="https://www.fubt.top"><img src="https://www.fubt.top//front/images/index/logo_03.png" alt="">

          </a>
        </div>
				<div class="nav fl">
					<ul class="clearfix" v-on:click="selected">
						<li class="fl active"><router-link to="/">{{$t('m.home')}}</router-link></li>
						<li class="fl"><router-link to="/exchange">{{$t('m.tradingCenter')}}</router-link></li>
						<li class="fl"><router-link to="/finance">{{$t('m.financeCenter')}}</router-link></li>
						<li class="fl"><router-link to="/market">{{$t('m.marketCenter')}}</router-link></li>
						<li class="fl"><router-link to="/newCoins">{{$t('m.voteForNewCurrency')}}</router-link></li>
						<li class="fl"><router-link to="/news">{{$t('m.news')}}</router-link></li>
						<li class="fl"><router-link to="/c2c">{{$t('m.C2C')}}</router-link></li>
					</ul>
				</div>
			</div>
			<div class="right fr clearfix">
				<div class="login fl">
					<ul class="clearfix">
						<li class="fl"><a href="#">{{$t('m.login')}}</a></li>
						<li class="fl"><a href="#">{{$t('m.logout')}}</a></li>
					</ul>
				</div>
        <!--切换语言-->
        <div class="change-lang fl">
          <i class="selected-country" v-on:mouseover="showCountryList"></i>
          <!--国家列表-->
          <div class="country-list" v-show="countryListIsShow">
            <ul v-on:mouseleave="hiddenCountryList">
              <li class="clearfix" v-on:click="chooseLang('zh-CN')"><span class="fl">简体中文</span> <i class="fr country chinese"></i></li>
              <li class="clearfix" v-on:click="chooseLang('en-US')"><span class="fl" >English</span> <i class="fr country english"></i></li>
            </ul>
          </div>
        </div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
        countryListIsShow:false,//语言列表切换
			}
		},
		created(){

		},
		methods:{
			// 点击切换active
			selected(e){
				console.log(e.target);
			},
      showCountryList(){
			  this.countryListIsShow =true;
      },
      hiddenCountryList(){
			  this.countryListIsShow = false;
      },
      chooseLang(e){

			  if(e==this.$store.state.lang){
          this.hiddenCountryList();
			    return;
        }
        this.$store.state.lang = e;
        this.$i18n.locale = this.$store.state.lang;
			  // console.log(this.$store.state.lang);
			  this.hiddenCountryList();
      }
		},
		computed:{}
	}
</script>
<style scoped>
	.header-box{
		width:100%;
		padding:0 100px;
	}
	.inner-content{
		/*background-color: pink;*/
		width:100%;
		height:100%;
	}
	.logo img{
		vertical-align: middle;
	}
	.nav ul li {
		padding:0 20px;
	}
	/*.nav ul li.active a {
		color:;
	}*/
	.nav ul li.active a,.nav ul li a:hover{
		color:#2d76d1;
	}
	.nav ul li a,.login ul li a {
		color:#fff;
	}
  .login ul li{
    padding:0 20px;
  }
  /*切换语言*/
  .change-lang{
    height:85px;
    line-height:85px;
    position:relative;
  }
  .selected-country{
    display:block;
    width:21px;
    height:28px;
    background:url('../assets/country.png') no-repeat center bottom;
    background-size:21px 46px;
    /*margin-top:8px;*/
    position: absolute;
    top:50%;
    transform:translateY(-75%);
    cursor:pointer;
  }

  .country {
    display:block;
    width:21px;
    height:17px;
    background:url('../assets/country.png') no-repeat center bottom;
    background-size:21px 46px;
    /*margin-top:8px;*/
  }
  /*中文*/
  .chinese{
    background-position: center bottom;
  }
  /*英文*/
  .english{
    background-position: center top;
  }
  .country-list{
    position:absolute;
    bottom:-55px;
    right: -21px;
  }
  .country-list ul{
    cursor:pointer;
  }
  .country-list ul li {
    height:40px;
    width:100px;
    /*background-color:pink;*/
    line-height:40px;
    position: relative;
  }
  .country-list ul li i {
    position: absolute;
    right:0;
    top:50%;
    transform: translate(0,-50%);
  }
</style>
