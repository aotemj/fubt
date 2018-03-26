<template>
	<div class="con-box">
		<Header class="header"></Header>
		<!-- 币种资料 -->
		<div class="currencyData ">
		  <div class="inner-box clearfix">
        <div class="left fl clearfix">
          <button class="chg-cur-btn fl" v-on:click="toggleCurList">{{currentCurrency01.name}}/{{currentCurrency02.name}}</button><i class="iconfont fl" v-bind:class="{'icon-xiala':!curListIsShow,'icon-shangla-copy':curListIsShow}"></i>
          <button class="cur-desc fl" v-on:click="toggleCurDesc"><i class= "iconfont icon-bianji"></i>币种资料</button>
        </div>
        <div class="right fr">
          <ul class="clearfix">
            <li class="fl today-max">
              今日最高
              <span>{{0.00000254}}</span>
            </li>
            <li class="fl today-min">
              今日最低
              <span>{{0.00000254}}</span>
            </li>
            <li class="fl tf-done-count">
              24小时成交量
              <span>{{0.00000254}}</span>
            </li>
            <li class="fl up-and-down">
              跌涨幅
              <span>{{0.00000254}}</span>
            </li>
            <li class="fl now-price">
              最新成交价
              <span>{{0.00000254}}</span>
            </li>
          </ul>
        </div>
      </div>
		</div>

    <!--交易-->
    <div class="deal-box">
      <div class="inner-box">
        <!--买入-->
        <div class="buy">
          {{currentCurrency01.name}}余额：{{currentCurrency01.count | keepTwoNum}}
        </div>
        <!--卖出-->
        <div class="sell"></div>
        <!--价格-->
        <div class="price"></div>
      </div>
    </div>
	</div>
</template>
<script>
	import Header from "./header.vue";
	export default {
		data(){
			return {
				currentCurrency01:{
				  name:'FUC',//币种
          count:0,//数量
        },
        currentCurrency02:{
          name:'FBT',//币种
          count:0,//数量
        },
				curListIsShow:false,//币种选择框显示状态
				curDescIsShow:false,//币种资料框显示状态
        // current
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
		padding:0 200px;
	}
  .currencyData .inner-box {
    background-color: #10172d;
    width:100%;
    height:100%;
  }

	.chg-cur-btn,.cur-desc{
		height:70px;
		margin-right:30px;
	}
  .chg-cur-btn{
    font-weight: 700;

  }
	.cur-desc{
		margin-left: 30px;
	}
  .right ul li.fl{
    /*background-color: pink;*/
    height:70px;
    line-height: 36px;
    padding:0 30px;
  }
  .right ul li.fl span{
    display:block;
    height: 100%;
    /*line-height: 30px;*/
  }
  /*交易框（买入，卖出）*/
  .deal-box{
    margin-top:20px;
    height:400px;
    padding:0 200px;
    /*text-align: left;*/
  }
  .deal-box .inner-box{
    /*background-color: #10172d;*/
    display:flex;
    width:100%;
    height:100%;
  }
  .deal-box .inner-box>div{
    text-align: left;
    flex:1;
    margin-right:20px;
    height:400px;
    padding:30px;
    background-color: #10172d;
  }
  .deal-box .inner-box .price{
    margin-right:0;
  }
</style>
