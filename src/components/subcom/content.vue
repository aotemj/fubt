<template>
	<div class="content">
		<el-tabs v-model="activeName">
		  <el-tab-pane name="first">
        <span slot="label">{{$t('m.all')}}</span>
		   	<div class="table">
		   		<ul class="th">
						<li class="td">{{$t('m.pairs')}}</li>
						<li class="td">{{$t('m.latestprice')}}(FBT)</li>
						<li class="td"> {{$t('m.maxPrice')}}(FBT)</li>
						<li class="td">{{$t('m.minPrice')}}(FBT)</li>
						<li class="td">{{$t('m.tfHVolume')}}</li>
						<li class="td">{{$t('m.change')}}</li>
						<li class="td">{{$t('m.sixChange')}}</li>
						<li class="td">{{$t('m.like')}}</li>
		   		</ul>
		   		<div class="tbody">
						<div class="item" v-for="(item,index) in dataList" v-on:mouseover="hover">
							<li class="data-item">{{item.market}}</li>
							<li class="data-item">{{item.recentQuotation}}</li>
							<li class="data-item">{{item.topQuotation}}</li>
							<li class="data-item">{{item.minimumQuotation}}</li>
							<li class="data-item">{{item.tfHdone}}</li>
							<li class="data-item" v-bind:class="{'up':item.tfupAndDown>0,'down':item.tfupAndDown<0}">{{item.tfupAndDown}}%</li>
							<li class="data-item">{{item.sixhTendency}}</li>
							<li class="data-item"><i class="iconfont icon-shoucang" v-bind:class="{'active':item.isCollection}" v-on:click="toggleCollection(index)"></i></li>
						</div>
		   		</div>
		   	</div>
		 	</el-tab-pane>
		  <el-tab-pane  name="second">
        <span slot="label">FBT {{$t('m.tradingArea')}}</span>
  	   	<div class="table">
  	   		<ul class="th">
            <li class="td">{{$t('m.pairs')}}</li>
            <li class="td">{{$t('m.latestprice')}}(FBT)</li>
            <li class="td"> {{$t('m.maxPrice')}}(FBT)</li>
            <li class="td">{{$t('m.minPrice')}}(FBT)</li>
            <li class="td">{{$t('m.tfHVolume')}}</li>
            <li class="td">{{$t('m.change')}}</li>
            <li class="td">{{$t('m.sixChange')}}</li>
            <li class="td">{{$t('m.like')}}</li>
  	   		</ul>
  	   		<div class="tbody">
  					<div class="item" v-for="(item,index) in dataList" v-on:mouseover="hover">
  						<li class="data-item">{{item.market}}</li>
  						<li class="data-item">{{item.recentQuotation}}</li>
  						<li class="data-item">{{item.topQuotation}}</li>
  						<li class="data-item">{{item.minimumQuotation}}</li>
  						<li class="data-item">{{item.tfHdone}}</li>
  						<li class="data-item" v-bind:class="{'up':item.tfupAndDown>0,'down':item.tfupAndDown<0}">{{item.tfupAndDown}}%</li>
  						<li class="data-item">{{item.sixhTendency}}</li>
  						<li class="data-item"><i class="iconfont icon-shoucang" v-bind:class="{'active':item.isCollection}" v-on:click="toggleCollection(index)"></i></li>
  					</div>
  	   		</div>
  	   	</div>
		  </el-tab-pane>
		  <el-tab-pane label="" name="third">
        <span slot="label">BTC {{$t('m.tradingArea')}}</span>
  	   	<div class="table">
  	   		<ul class="th">
            <li class="td">{{$t('m.pairs')}}</li>
            <li class="td">{{$t('m.latestprice')}}(FBT)</li>
            <li class="td"> {{$t('m.maxPrice')}}(FBT)</li>
            <li class="td">{{$t('m.minPrice')}}(FBT)</li>
            <li class="td">{{$t('m.tfHVolume')}}</li>
            <li class="td">{{$t('m.change')}}</li>
            <li class="td">{{$t('m.sixChange')}}</li>
            <li class="td">{{$t('m.like')}}</li>
  	   		</ul>
  	   		<div class="tbody">
  					<div class="item" v-for="(item,index) in dataList" v-on:mouseover="hover">
  						<li class="data-item">{{item.market}}</li>
  						<li class="data-item">{{item.recentQuotation}}</li>
  						<li class="data-item">{{item.topQuotation}}</li>
  						<li class="data-item">{{item.minimumQuotation}}</li>
  						<li class="data-item">{{item.tfHdone}}</li>
  						<li class="data-item" v-bind:class="{'up':item.tfupAndDown>0,'down':item.tfupAndDown<0}">{{item.tfupAndDown}}%</li>
  						<li class="data-item">{{item.sixhTendency}}</li>
  						<li class="data-item"><i class="iconfont icon-shoucang" v-bind:class="{'active':item.isCollection}" v-on:click="toggleCollection(index)"></i></li>
  					</div>
  	   		</div>
  	   	</div>
			</el-tab-pane>
		  <el-tab-pane label="" name="fourth">
        <span slot="label">FUC {{$t('m.tradingArea')}}</span>
  	   	<div class="table">
  	   		<ul class="th">
            <li class="td">{{$t('m.pairs')}}</li>
            <li class="td">{{$t('m.latestprice')}}(FBT)</li>
            <li class="td"> {{$t('m.maxPrice')}}(FBT)</li>
            <li class="td">{{$t('m.minPrice')}}(FBT)</li>
            <li class="td">{{$t('m.tfHVolume')}}</li>
            <li class="td">{{$t('m.change')}}</li>
            <li class="td">{{$t('m.sixChange')}}</li>
            <li class="td">{{$t('m.like')}}</li>
  	   		</ul>
  	   		<div class="tbody">
  					<div class="item" v-for="(item,index) in dataList" v-on:mouseover="hover">
  						<li class="data-item">{{item.market}}</li>
  						<li class="data-item">{{item.recentQuotation}}</li>
  						<li class="data-item">{{item.topQuotation}}</li>
  						<li class="data-item">{{item.minimumQuotation}}</li>
  						<li class="data-item">{{item.tfHdone}}</li>
  						<li class="data-item" v-bind:class="{'up':item.tfupAndDown>0,'down':item.tfupAndDown<0}">{{item.tfupAndDown}}%</li>
  						<li class="data-item">{{item.sixhTendency}}</li>
  						<li class="data-item"><i class="iconfont icon-shoucang" v-bind:class="{'active':item.isCollection}" v-on:click="toggleCollection(index)"></i></li>
  					</div>
  	   		</div>
  	   	</div>
		  </el-tab-pane>
		  <el-tab-pane label="" name="five">
        <span slot="label">{{$t('m.like')}}</span>
		   	<div class="table">
		   		<ul class="th">
            <li class="td">{{$t('m.pairs')}}</li>
            <li class="td">{{$t('m.latestprice')}}(FBT)</li>
            <li class="td"> {{$t('m.maxPrice')}}(FBT)</li>
            <li class="td">{{$t('m.minPrice')}}(FBT)</li>
            <li class="td">{{$t('m.tfHVolume')}}</li>
            <li class="td">{{$t('m.change')}}</li>
            <li class="td">{{$t('m.sixChange')}}</li>
            <li class="td">{{$t('m.like')}}</li>
		   		</ul>
		   		<div class="tbody">
						<div class="item" v-for="(item,index) in dataList" v-on:mouseover="hover">
							<li class="data-item">{{item.market}}</li>
							<li class="data-item">{{item.recentQuotation}}</li>
							<li class="data-item">{{item.topQuotation}}</li>
							<li class="data-item">{{item.minimumQuotation}}</li>
							<li class="data-item">{{item.tfHdone}}</li>
							<li class="data-item" v-bind:class="{'up':item.tfupAndDown>0,'down':item.tfupAndDown<0}">{{item.tfupAndDown}}%</li>
							<li class="data-item">{{item.sixhTendency}}</li>
							<li class="data-item"><i class="iconfont icon-shoucang" v-bind:class="{'active':item.isCollection}" v-on:click="toggleCollection(index)"></i></li>
						</div>
		   		</div>
		   	</div>
		  </el-tab-pane>
		 </el-tabs>
		 <input class="search-btn" type="text" name="" id="" v-bind:placeholder="$t('m.search')"><i class="el-icon-search search-icon"></i>
	</div>
</template>
<script>
	import common from "../../kits/domain.js";
	import {ajax} from "../../kits/http.js";
	export default{
		data(){
			return {
				activeName: 'first',
				value:'',
				dataList:[
          {
            market:'DOGE/FBT',//市场
            recentQuotation:0.21,//最新报价
            topQuotation:0.263,//最高价
            minimumQuotation:0.21,//最低价
            tfHdone:1446997.33,//24h成交量
            tfupAndDown:3.9,//24小时涨跌
            sixhTendency:'走势',//6小时走势
            isCollection:true//是否收藏
          },
          {
            market:'DOGE/FBT',//市场
            recentQuotation:0.21,//最新报价
            topQuotation:0.263,//最高价
            minimumQuotation:0.21,//最低价
            tfHdone:1446997.33,//24h成交量
            tfupAndDown:3.9,//24小时涨跌
            sixhTendency:'走势',//6小时走势
            isCollection:true//是否收藏
          },
          {
            market:'DOGE/FBT',//市场
            recentQuotation:0.21,//最新报价
            topQuotation:0.263,//最高价
            minimumQuotation:0.21,//最低价
            tfHdone:1446997.33,//24h成交量
            tfupAndDown:3.9,//24小时涨跌
            sixhTendency:'走势',//6小时走势
            isCollection:true//是否收藏
          },
          {
            market:'DOGE/FBT',//市场
            recentQuotation:0.21,//最新报价
            topQuotation:0.263,//最高价
            minimumQuotation:0.21,//最低价
            tfHdone:1446997.33,//24h成交量
            tfupAndDown:3.9,//24小时涨跌
            sixhTendency:'走势',//6小时走势
            isCollection:true//是否收藏
          },
          {
            market:'DOGE/FBT',//市场
            recentQuotation:0.21,//最新报价
            topQuotation:0.263,//最高价
            minimumQuotation:0.21,//最低价
            tfHdone:1446997.33,//24h成交量
            tfupAndDown:3.9,//24小时涨跌
            sixhTendency:'走势',//6小时走势
            isCollection:true//是否收藏
          },
          {
            market:'DOGE/FBT',//市场
            recentQuotation:0.21,//最新报价
            topQuotation:0.263,//最高价
            minimumQuotation:0.21,//最低价
            tfHdone:1446997.33,//24h成交量
            tfupAndDown:3.9,//24小时涨跌
            sixhTendency:'走势',//6小时走势
            isCollection:true//是否收藏
          },
          {
            market:'DOGE/FBT',//市场
            recentQuotation:0.21,//最新报价
            topQuotation:0.263,//最高价
            minimumQuotation:0.21,//最低价
            tfHdone:1446997.33,//24h成交量
            tfupAndDown:3.9,//24小时涨跌
            sixhTendency:'走势',//6小时走势
            isCollection:true//是否收藏
          },
          {
            market:'DOGE/FBT',//市场
            recentQuotation:0.21,//最新报价
            topQuotation:0.263,//最高价
            minimumQuotation:0.21,//最低价
            tfHdone:1446997.33,//24h成交量
            tfupAndDown:3.9,//24小时涨跌
            sixhTendency:'走势',//6小时走势
            isCollection:true//是否收藏
          },
				]
			}
		},
		methods:{
			toggleCollection(index){
				this.dataList[index].isCollection =!this.dataList[index].isCollection
			},
			hover(e){
				// console.log(e.target);
				// console.dir(e.target.parentNode.parentNode.children);

				for(var i =0;i<e.target.parentNode.parentNode.children.length;i++){
					e.target.parentNode.parentNode.children[i].classList.remove('active');
				}
				e.target.parentNode.classList.add('active')

			}
		},
		computed:{},
		created(){
			// var url = common.apidomain+'real/indexmarket';
			// ajax(url,'get',{},(res)=>{
			// 	console.log(res);
			// 	this.dataList = res.data.data;
			// });
		}
	}
</script>
<style scoped>
	.search-btn{
		position: absolute;
		right:100px;
		top:10px;
    width:100px;
    border:1px solid #fff;
    border-radius:25px;
    box-sizing: border-box;
    padding:0 20px;
    color:#fff;
	}
  .search-icon{
    position: absolute;
    right:180px;
    top:12px;
  }
	.th{
		display: flex;
		background-color: #0e1328;
	}
	.th .td{
		flex:1;
		font-size: 16px;
		height:60px;
		line-height: 60px;
		color:#fff;
	}
	.tbody{
	}
	.tbody .item{
		display:flex;
		height: 50px;
		line-height: 50px;
		background-color: #10172d;
		color:#fff;
	}
	/*各行变色*/
	.tbody .item:nth-child(odd){
		background-color: #485283;
	}
	.tbody .item.active{
		background-color: #4c99cf;
	}
	.tbody .item .data-item{
		flex:1;
	}
	.data-item.up{
		color:red;
	}
	.data-item.down{
		color:green;
	}
	.data-item.active{
	}
	.icon-shoucang{
		color:#bfbfbf;
		cursor:pointer;
	}
	.icon-shoucang.active{
		color:#f4ea2a;
	}
</style>
