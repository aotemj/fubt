<template>
	<!-- 友情提示弹出框 -->
	<div class="friendlyTip pa">
		<!-- <el-button type="text" @click="centerDialogVisible = true">点击我出现弹出框</el-button> -->

		<el-dialog
		  title="友情提示"
		  :visible.sync="centerDialogVisible"
		  width="30%"
		  top="20vh"
		  center>
		  <span class="datainfo">{{this.$store.state.message.dataInfo}}</span>
		  <span slot="footer" class="dialog-footer">
		    <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
		    <el-button  size="mini" class="blue-bg w100" @click="close">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		methods:{
			// center(){
			// 	this.$store.commit('changeDialogInfo');
			// },
			close(){
				this.$store.commit('close');
			}
		},
		computed:{
			centerDialogVisible(){
				return this.$store.state.message.status
			}
		}
	}
</script>
<style scoped>
	.friendlyTip{
		margin-top: 100px;
		text-align: left;
	}
	.datainfo{
		color: #fff;
		font-size: 16px;
	}

</style>
