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
			}
		},
		methods:{},
		computed:{},
		created(){}
	}
</script>
<style scoped>
	.search-btn{
		position: absolute;
		right:300px;
		top:10px;
	}
	.th{
		display: flex;
		justify-content:space-between;
		/*flex-start | flex-end | center | space-between | space-around;*/
		background-color: pink;
	}
	.th .td{
		flex:1;
	}
</style>
