<template>
	<div class="content">
		<el-tabs v-model="activeName">
		  <el-tab-pane label="全部" name="first">
		   	<div class="table">
		   		<ul class="th">
						<li class="td">市场</li>
						<li class="td">最新价格(FBT)</li>
						<li class="td">最高价(FBT)</li>
						<li class="td">最低价(FBT)</li>
						<li class="td">24H成交量</li>
						<li class="td">24H涨跌</li>
						<li class="td">6小时走势</li>
						<li class="td">收藏</li>
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
		  <el-tab-pane label="FBT交易区" name="second">
  	   	<div class="table">
  	   		<ul class="th">
  					<li class="td">市场</li>
  					<li class="td">最新价格(FBT)</li>
  					<li class="td">最高价(FBT)</li>
  					<li class="td">最低价(FBT)</li>
  					<li class="td">24H成交量</li>
  					<li class="td">24H涨跌</li>
  					<li class="td">6小时走势</li>
  					<li class="td">收藏</li>
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
		  <el-tab-pane label="BTC交易区" name="third">
  	   	<div class="table">
  	   		<ul class="th">
  					<li class="td">市场</li>
  					<li class="td">最新价格(FBT)</li>
  					<li class="td">最高价(FBT)</li>
  					<li class="td">最低价(FBT)</li>
  					<li class="td">24H成交量</li>
  					<li class="td">24H涨跌</li>
  					<li class="td">6小时走势</li>
  					<li class="td">收藏</li>
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
		  <el-tab-pane label="FUC交易区" name="fourth">
  	   	<div class="table">
  	   		<ul class="th">
  					<li class="td">市场</li>
  					<li class="td">最新价格(FBT)</li>
  					<li class="td">最高价(FBT)</li>
  					<li class="td">最低价(FBT)</li>
  					<li class="td">24H成交量</li>
  					<li class="td">24H涨跌</li>
  					<li class="td">6小时走势</li>
  					<li class="td">收藏</li>
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
		  <el-tab-pane label="我的收藏" name="five">
		   	<div class="table">
		   		<ul class="th">
						<li class="td">市场</li>
						<li class="td">最新价格(FBT)</li>
						<li class="td">最高价(FBT)</li>
						<li class="td">最低价(FBT)</li>
						<li class="td">24H成交量</li>
						<li class="td">24H涨跌</li>
						<li class="td">6小时走势</li>
						<li class="td">收藏</li>
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
		 <input class="search-btn" type="text" name="" id="" placeholder="搜索">
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
			var url = common.apidomain+'real/indexmarket';
			ajax(url,'get',{},(res)=>{
				console.log(res);
				this.dataList = res.data.data;
			});
		}
	}
</script>
<style scoped>
	.search-btn{
		position: absolute;
		right:200px;
		top:10px;
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
