<template>
	<div>
		<!-- 1.0 头部 -->
    	<Header class="header"></Header>

    	<div class="notice">
    		<!-- 2.0 面包屑导航 -->
    		<el-breadcrumb class="pathNav" separator-class="el-icon-arrow-right">
				<!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
				<el-breadcrumb-item :to="{ path: '/news' }">公告</el-breadcrumb-item>
				<el-breadcrumb-item>公告详情</el-breadcrumb-item>
			</el-breadcrumb>

    		<!-- 3.0 新闻详细内容 -->
    		<div class="article" v-for="(item,index) in newList">
    			<h2 class="title">{{item.title}}</h2>
    			<p class="publishDate">发布时间： {{item.publishDate}}</p>
    			<p class="hello">{{item.hello}}:</p>
    			<p class="details">{{item.details}}</p>
    			<p class="inscribe">{{item.inscribe}}</p>
    			<p class="releaseDate">{{item.releaseDate}}</p>
    		</div>
    	</div>
	</div>
</template>

<script>
	import Header from './header'

	export default {
	data(){
		return {
			newList:[
				{
					title:'关于FUC更换充值地址的公告',
					publishDate:'2018-03-26 10:28:54',
					hello:'尊敬的用户',
					details:'FUC充值地址已更换，需要转入充值FUC的用户，请核对地址无误后进行操作，否则将可能造成充值的FUC丢失。如超过24小时未到账，请联系客服处理。FUC充值地址已更换，需要转入充值FUC的用户，请核对地址无误后进行操作，否则将可能造成充值的FUC丢失。如超过24小时未到账，请联系客服处理。FUC充值地址已更换，需要转入充值FUC的用户，请核对地址无误后进行操作，否则将可能造成充值的FUC丢失。如超过24小时未到账，请联系客服处理。FUC充值地址已更换，需要转入充值FUC的用户，请核对地址无误后进行操作，否则将可能造成充值的FUC丢失。如超过24小时未到账，请联系客服处理。',
					inscribe:'香港富比特',
					releaseDate:'2018年2月18日'
				}
			]
		}
	},
	methods:{},
	computed:{},
	created(){},
	components:{Header}
	}
</script>

<style scoped> 
	.notice{
		background-color: #11182B;
		width: 90%;
		margin: 0 auto;
		margin-top: 105px;
	}
	.notice .pathNav{
		height: 60px;
		line-height: 60px;
		background-color: #0E1326;
		font-size: 16px;
		padding-left: 20px;
	}
	.notice .article{
		color: #F7FCFF;
		padding: 30px 100px 50px 100px;
	}
	.notice .article .hello,.notice .article .details,.notice .article .inscribe,.notice .article .releaseDate{
		text-align: left;
	}
	.notice .article .hello{
		padding: 10px 0;
	}
	.notice .article .details{
		line-height: 2em;
		margin: 30px 0 40px 0;
	}
	.notice .article .releaseDate{
		margin-bottom: 0px;
		padding-bottom: 16px;
	}
	
</style>