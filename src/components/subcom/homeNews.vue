<template>
	<div class="news">
		<ul id="con1" ref="con1" :class="{anim:animate==true}">
			<!-- <li v-for='item in items'><a href="#">{{item.title}}</a></li> -->
			<!-- 若需要点击公告标题跳转，可参考下面这行进行改写 -->
			<!-- <li v-for='item in items'><router-link to="/news">{{item.title}}</router-link></li> -->
			<li v-for='item in items'><router-link :to="'./news/newsDetails/'+item.id">{{item.title}}</router-link></li>
		</ul>
	</div>
</template>
<script>
	import common from "../../kits/domain"
  	import {ajax} from "../../kits/http"

	export default{
		data(){
			return {
				animate:false,
				items:[
					// {name:"关于地球币（EAC）上线FBT交易区的公告"},
					// {name:"首届中国区块链商业应用与投资峰会"},
					// {name:"喜迎UTO首发富比特.50万豪礼送不停"},
					// {name:"新币上线！PC火爆上线富比特FBT交易区"},
					// {name:"【活动公告】富比特携手BVT狂撒10万币福利！注册即送！"}
				]
			}
		},
		created(){
			// 1.0 公告标题请求数据
            // var url = common.apidomain + 'service/appnewmore';
            // var formData = new FormData();
            // formData.append('id',2);
            // formData.append('cur',1);
            // ajax(url, 'post', formData, (res) => {
			// 	// console.log(res)
			// 	// console.log(res.data)
			// 	// console.log(res.data.data.items)
		     //    this.items = res.data.data.items;
            // });
            // //2.0 调用公告无缝滚动方法
            // setInterval(this.scroll,3000);
		},
		methods:{
			// 公告无缝滚动方法
			scroll(){
				this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
		       	setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题
	               this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的末尾
	               this.items.shift();               //删除数组的第一个元素
	               this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
		        },500)
			}
		},
		computed:{},
		mounted(){},
	}
</script>
<style scoped>
	.news{
		/*overflow: hidden;*/
		/*transition: all 0.5s;*/
    width: 100%;

    overflow: hidden;
    transition: all 0.5s;
	}
	.anim{
		transition: all 0.5s;
    	margin-top: -60px;
	}
	#con1 li a{
		color: #fff;
	}
</style>
