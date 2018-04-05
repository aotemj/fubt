<template>
	<div class="news">
		<ul id="con1" ref="con1" :class="{anim:animate==true}">
			<li v-for='item in items'><a href="#">{{item.name}}</a></li>
			<!-- 若需要点击公告标题跳转，可参考下面这行进行改写 -->
			<!-- <li v-for='item in items'><router-link to="/news">{{item.name}}</router-link></li> -->
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				animate:false,
				items:[
					{name:"关于地球币（EAC）上线FBT交易区的公告"},
					{name:"首届中国区块链商业应用与投资峰会"},
					{name:"喜迎UTO首发富比特.50万豪礼送不停"},
					{name:"新币上线！PC火爆上线富比特FBT交易区"},
					{name:"【活动公告】富比特携手BVT狂撒10万币福利！注册即送！"}
				]
			}
		},
		created(){
			setInterval(this.scroll,3000) // 在钩子函数中调用scroll()方法，注意此处不要忘记加this，设置定时为3S轮播。
		},
		methods:{
			scroll(){
				let con1 = this.$refs.con1;
				con1.style.marginTop ='-60px';
				this.animate = !this.animate;
				var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
				setTimeout(function(){
					that.items.push(that.items[0]);
					that.items.shift();
					con1.style.marginTop='0px';
					that.animate = !that.animate;  // 如果不把 animate 取反会出现消息回滚的现象，此时把ul元素的过渡属性取消掉就可以实现无缝滚动的效果了
				},500)
			}
		},
		computed:{}
	}
</script>
<style scoped>
	.news{
		overflow: hidden;
	}
	.anim{
		transition: all 0.5s;
	}
	#con1 li a{
		color: #fff;
	}
</style>
