<template>
	<div class="news">
		<div class="parent">
			<div class="son">
				<a class="news-item" href="#">{{newsList[0].title}}</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				newsList:[
					{
						title:'关于地球币（EAC）上线FBT交易区的公告'
					},
					{
						title:'首届中国区块链商业应用与投资峰会'
					},
					{
						title:'喜迎UTO首发富比特.50万豪礼送不停'
					}
				]
			}
		},
		created(){
			// this.autoplay()
		},
		methods:{
			autoplay(){
				setInterval(() => {
				    let first = this.newsList.splice(0, 1)
				    this.newsList.push(...first)
				},1000)
			}
		},
		computed:{}
	}
</script>
<style scoped>
	.parent{
		width:100%;
		height:100%;
		position: relative;

	}
	.son{
		width: 100%;
		position: absolute;
	}
	.news-item{
		display:block;
		height:100%;
	}
</style>
