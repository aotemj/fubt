<template>
	<div class="con-box">
		<Header class="header"></Header>
		<slider class="slider"></slider>
	</div>
</template>
<script>
// 头部：
import Header from "./header.vue"
// 轮播模块
import slider from "./subcom/slider.vue"

	export default {
		data(){
			return {}
		},
		methods:{},
		components:{
			Header,//头部
			slider,//轮播图
		}
	}
</script>
<style scoped>

</style>
