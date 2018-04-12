<template>
  <div class="con-box">
		<Header class="header"></Header>
		<range class="range"></range>
		<list class="list"></list>
    <div class="hint">
      <!-- <p><span><img src="../../images/index/d_03.png" alt=""></span><span>交易提示</span></p> -->
      <p><i class="el-icon-info"></i>交易提示</p>
      <p>1、买卖商户均为实地考察认证商户，并提供100万usdt保证金，您每次兑换会冻结商户资产，商户资产不够时，不能接单，可放心兑换；</p>
      <p>2、买卖商户均为实名认证商户，并提供保证金，可放心兑换； </p>
      <p>3、请使用本人绑定的银行卡和支付宝进行汇款，其他任何方式汇款都会退款；</p>
      <p>4、商家处理时间9:00 - 21:00非处理时间的订单会在第二天9:00开始处理，一般接单后24小时内会完成打款；</p>
    </div>
    <record></record>
    <Customer></Customer>
    <Footer></Footer>
    <div v-show="prompt">
      <el-button type="text" @click="centerDialogVisible" style="display:none"></el-button>
      <el-dialog class="c2c-text" title="温馨提示：" :visible.sync="centerDialogVisible" width="26%" center>
        <div class="solid"></div>
        <p>尊敬的FUBT用户：为了您的购买可以快速到账，请在交易前仔细阅读以下注意事项：</p>
        <p>1、买卖商户均为实名认证商户，并提供保证金，可放心兑换；</p>
        <p>2、商家处理时间9:00 - 21:00非处理时间的订单会在第二天9:00开始处理，一般接单后2小时内会完成交易，最长时间不会超过24小时。请在下单后30分钟内完成付款，否则会延时到账；</p>
        <p>3、<span>请使用本人绑定的银行卡或支付宝进行汇款，其他任何方式汇款都会造成延时处理。</span></p>
        <p>4、如果你的交易24小时内没有处理，请联系在线客服登记。会有专人24小时内与您联系，请保持手机畅通；</p>
        <p>5、由于咨询量过大，24小时内未处理的交易订单咨询，在线客服无法提供帮助。敬请谅解。</p>
        <p>6、单天最多只能发起10笔卖出订单。</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
	</div>
</template>
<script>
// 头部：
import Header from "./header.vue"
// c2c交易模块
import range from "./subcom/c2c_range.vue"
// 市场Liet模块
import list from "./subcom/c2c_bazaarList.vue"
// 用户List模块
import record from "./subcom/c2c_record.vue"
//在线客服
import Customer from './subcom/customer_service'
// 尾部
import Footer from "./footer.vue"
  export default {
    data(){
      return {
        centerDialogVisible: true,
        prompt:true
      }
    },
    methods:{},
    computed:{

    },
    components:{
      Header,//头部
			range,//交易模块
      list,//市场list模块
      record,//用户list模块
      Footer,//尾部
      Customer,
    }
  }
</script>
<style scoped>
  .hint {
    width: 1300px;
    margin: 0 auto;
    padding: 2% 0px 2% 70px;
    margin-top: 3%;
    background: #111a31;
  }

  .hint>p:first-child {
    font-size:16px;
  }
  .hint>p:first-child>i {
    font-size:16px;
    margin-right:10px;
    color:#B22426;
  }

  .hint>p:first-child>span:first-child>img {
    width: 16px;
    margin: -3px 7px 0 0;
  }

  .hint>p {
    text-align: left;
    color: #c2c3c8;
    line-height: 2em;
  }
  .c2c-text{
    border-radius: 5px;
  }

  .c2c-text p{
    color: #c2c3c8;
  }
  .c2c-text p span{
    color: #338ff5;
  }
  .c2c-text button{
    width: 150px;
  }
  .solid{
    width:100%;
    height:1px;
    background:#c2c3c8;
    margin-top: -20px;
     margin-bottom: 10px;
  }
  .range{
    width: 1300px;
    margin: 0 auto;
  }
</style>
