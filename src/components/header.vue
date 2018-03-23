<template>
	<div class="header-box">
		<div class="inner-content clearfix">
			<div class="left fl clearfix">
				<div class="logo fl"><img src="https://www.fubt.top//front/images/index/logo_03.png" alt=""></div>
				<div class="nav fl">
					<ul class="clearfix" v-on:click="selected">
						<li class="fl active"><router-link to="/">首页</router-link></li>
						<li class="fl"><router-link to="/trading">交易中心</router-link></li>
						<li class="fl"><a href="#">财务中心</a></li>
						<li class="fl"><a href="#">行情中心</a></li>
						<li class="fl"><a href="#">新币投票</a></li>
						<li class="fl"><a href="#">新闻中心</a></li>
						<li class="fl"><a href="#">C2C</a></li>
					</ul>
				</div>
			</div>
			<div class="right fr">
				<div class="login">
					<ul class="clearfix">
						<li class="fl"><a href="#">注册</a></li>
						<li class="fl"><a href="#">登录</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		created(){

		},
		methods:{
			// 点击切换active
			selected(e){
				console.log(e.target);
			}
		},
		computed:{}
	}
</script>
<style scoped>
	.header-box{
		width:100%;
		padding:0 200px;
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
</style>
