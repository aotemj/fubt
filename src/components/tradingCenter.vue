<template>
	<div class="con-box">
		<Header class="header"></Header>
		<!-- 币种资料 -->
		<div class="currencyData clearfix">
			<div class="left fl clearfix">
				<button class="chg-cur-btn fl" v-on:click="toggleCurList">{{currentCurrency}}</button><i class="iconfont fl" v-bind:class="{'icon-xiala':!curListIsShow,'icon-shangla-copy':curListIsShow}"></i>
				<button class="cur-desc fl" v-on:click="toggleCurDesc"><i class= "iconfont icon-bianji"></i>币种资料</button>
			</div>
			<div class="right fr">
				<ul class="clearfix">
					<li class="fl today-max">
						今日最高
						<span>{{0.00000254}}</span>
					</li>
					<li class="fl today-min">今日最低</li>
					<li class="fl tf-done-count">24小时成交量</li>
					<li class="fl up-and-down">跌涨幅</li>
					<li class="fl now-price">最新成交价</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import Header from "./header.vue";
	export default {
		data(){
			return {
				currentCurrency:'FUC/FBT',//当前币种
				curListIsShow:false,//币种选择框显示状态
				curDescIsShow:false,//币种资料框显示状态
			}
		},
		methods:{
			//显示隐藏币种选择框
			toggleCurList(){
				this.isShow = !this.isShow;
			},
			toggleCurDesc(){

			}
		},
		created(){

		},
		computed:{

		},
		components:{
			Header,//头部
		}
	}
</script>
<style scoped>
	.currencyData{
		height:70px;
		line-height:70px;
		margin-top:100px;
		background-color: #10172d;
		padding:0 200px;
	}
	.chg-cur-btn,.cur-desc{
		height:70px;
		margin-right:30px;
	}
	.cur-desc{
		margin-left: 30px;
	}
</style>
