<template>
  <div class="con-box">
		<Header class="header"></Header>
		<range class="range"></range>
		<list class="list"></list>
    <div class="hint">
      <!-- <p><span><img src="../../images/index/d_03.png" alt=""></span><span>交易提示</span></p> -->
      <p>1、买卖商户均为实地考察认证商户，并提供100万usdt保证金，您每次兑换会冻结商户资产，商户资产不够时，不能接单，可放心兑换;</p>
      <p>2、买卖商户均为实名认证商户，并提供保证金，可放心兑换； </p>
      <p>3、请使用本人绑定的银行卡和支付宝进行汇款，其他任何方式汇款都会退款；</p>
      <p>4、商家处理时间9:00 - 21:00非处理时间的订单会在第二天9:00开始处理，一般接单后24小时内会完成打款；</p>
    </div>
    <record></record>
    <Footer></Footer>
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
import record from "./subcom/2c2_record.vue"
// 尾部
import Footer from "./footer.vue"
  export default {
    data(){
      return {}
    },
    methods:{},
    computed:{},
    components:{
      Header,//头部
			range,//交易模块
      list,//市场list模块
      record,//用户list模块
      Footer,//尾部
    }
  }
</script>
<style scoped>
.hint {
    width: 100%;
    padding: 2% 100px 2% 100px;
    margin-top: 3%;
    float: left;
    background: #111a31;
}

.hint>p:first-child {
    margin-bottom: 10px;
}

.hint>p:first-child>span:first-child>img {
    width: 16px;
    margin: -3px 7px 0 0;
}

.hint>p {
    text-align: left;
    color: #c2c3c8;
}
</style>
