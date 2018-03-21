<template>
	<div class="block">
	  <el-carousel height="500px">
	    <el-carousel-item v-for="(item,index) in imgList" :key="index">
				<img :src="item.src" alt="" width="100%" height="100%">
	    </el-carousel-item>
	  </el-carousel>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				imgList:[
					{
						src:'https://www.fubt.top/front/images/index/TKC.jpg'
					},
					{
						src:'https://www.fubt.top/front/images/index/n.jpg'
					},
					{
						src:'https://www.fubt.top/front/images/index/c.jpg'
					}
				]
			}
		},
		methods:{},
		computed:{}
	}
</script>
<style scoped>

</style>
