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
		  </el-tab-pane>
		  <el-tab-pane label="BTC交易区" name="third">
			</el-tab-pane>
		  <el-tab-pane label="FUC交易区" name="fourth">
		  </el-tab-pane>
		  <el-tab-pane label="我的收藏" name="fourth">
		  </el-tab-pane>
		 </el-tabs>
		 <input class="search-btn" type="text" name="" id="" placeholder="搜索">
	</div>
</template>
<script>
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
						tfupAndDown:-3.9,//24小时涨跌
						sixhTendency:'走势',//6小时走势
						isCollection:false//是否收藏
					},
					{
						market:'DOGE/FBT',//市场
						recentQuotation:0.21,//最新报价
						topQuotation:0.263,//最高价
						minimumQuotation:0.21,//最低价
						tfHdone:1446997.33,//24h成交量
						tfupAndDown:3.9,//24小时涨跌
						sixhTendency:'走势',//6小时走势
						isCollection:false//是否收藏
					},
					{
						market:'DOGE/FBT',//市场
						recentQuotation:0.21,//最新报价
						topQuotation:0.263,//最高价
						minimumQuotation:0.21,//最低价
						tfHdone:1446997.33,//24h成交量
						tfupAndDown:3.9,//24小时涨跌
						sixhTendency:'走势',//6小时走势
						isCollection:false//是否收藏
					}
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
		created(){}
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
		/*justify-content:flex-end;*/
		/*flex-start | flex-end | center | space-between | space-around;*/
		background-color: #0e1328;
	}
	.th .td{
		flex:1;
		font-size: 16px;
		height:60px;
		line-height: 60px;
		color:#fff;
		/*border:1px solid #000;*/
	}
	.tbody{
	}
	.tbody .item{
		display:flex;
		/*　align-items:center;*/
		height: 50px;
		line-height: 50px;
		background-color: #10172d;
		color:#fff;
	}
	.tbody .item.active{
		background-color: #0e1328;
	}
	.tbody .item .data-item{
		flex:1;
		/*border:1px solid #000;*/

	}
	.data-item.up{
		color:red;
	}
	.data-item.down{
		color:green;
	}
	.data-item.active{
		/*color:red;*/
	}
	.icon-shoucang{
		color:#bfbfbf;
		cursor:pointer;
	}
	.icon-shoucang.active{
		color:#f4ea2a;
	}
</style>
