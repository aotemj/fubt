<template>
  <div>
    <Header class="head"></Header>
    <news></news>
    <div class="container information container-screen">
      <header>操作说明</header>
      <ul>
        <li>
          <p>
              <!-- <span><img src="../../images/index/d_03.png" alt=""></span> -->
            <span>温馨提示</span>
          </p>
          <p>此交易用户与用户之间的C2C交易。因fuc每日价格恒定，系统会随机匹配买卖方。仅支持fubt实名认证通过的用户，交易前绑定收款银行卡或支付宝。</p>
        </li>
        <li>
          <p>1、怎么成为商户？</p>
          <p>想成为C2C交易商户，请将个人资料（个人联系方式、身份证文件、个人简介、数字资产拥有量、是否从事过数字资产交易）进行提交。我们会尽快审核您的申请。</p>
        </li>
        <li>
          <p>2、怎么买入<span>FUBT（FUC）</span>？</p>
          <p>请按照网站公示价格发布购买信息，系统自动为您匹配商户，按照提示信息在24小时内完成给账户付款。确认收到款后，会在2小时内发币到您的账户地址中。</p>
        </li>
        <li>
          <p>3、怎么卖出<span>FUBT（FUC）</span>？</p>
          <p>请按照网站公示价格发布卖出信息，系统自动为您匹配商户，下单成功后商户会在24小时给您打款。</p>
        </li>
        <li>
          <p>4、买入时需要提供什么资料？</p>
          <p>姓名 / 电话号码 / <span>FUBT</span>充值地址 / <span>FUBT</span>用户名</p>
        </li>
        <li>
          <p>5、<span>FUC</span>有没有额度限制？</p>
          <p>目前单次买入卖出单笔最低为100个币，最高为100万个。</p>
        </li>
        <li>
          <p>6、<span>FUC</span>充值多久到账？</p>
          <p>正常情况半个小时，但最近转币速度较慢，约为3-5个小时,个别用户可能更慢，具体以区块链网络情况为准。</p>
        </li>
        <li>
          <p>7、每次是否有手续费？</p>
          <p>全流程平台不收取任何费用</p>
        </li>
        <li>
          <p>8、订单有效期多久？</p>
          <p>订单有效期为24小时，如24小时内无法匹配成功订单将失效。目前订单匹配成功的时间一般为2个小时内。</p>
        </li>
        <li>
          <p>9、C2C交易过程产生纠纷怎么处理？</p>
          <p>在FUBT进行交易的、均是经过实名认证用户，如交易过程产生纠纷，请提供有关打款、打币记录，交由FUBT确认交易成功或失败后进行仲裁，确保双方利益。</p>
        </li>
        <li>
          <p>10、每天的工作时间是多久？</p>
          <p>客服服务时间：早上9点到晚上17:30点</p>
        </li>
      </ul>
    </div>
    <Footer></Footer>
    <Customer></Customer>
  </div>
</template>
<script>
  import Header from '../header.vue'
  import news from './homeNews.vue'
  import Footer from '../footer.vue'
  import Customer from './customer_service'//在线客服
  export default {
    data(){
      return {}
    },
    methods:{},
    computed:{},
    components:{
      Header,news,Footer,Customer
    }
  }
</script>

<style scoped>
.head{
  height: 85px;
  line-height: 85px;
}
/* instructions */
.information{
  text-align: left;
  width: 1300px;
  margin: 0 auto;
}
.information>header {
    /*width: 100%;*/
    padding: 18px 25px;
    font-size: 20px;
    color: #c2c3c8;
    background: #0e1326;
    margin-top: 5%;
}

.information>ul {
    padding-bottom: 5%;
}

.information>ul>li {
    padding: 30px 25px;
}

.information>ul>li>p {
    font-family: '微软雅黑';
}

.information>ul>li:nth-child(even) {
    background: #0e1326;
}

.information>ul>li:first-child>p:first-child>span:first-child>img {
    width: 15px;
    height: 15px;
    margin: -5px 5px 0;
}

.information>ul>li:first-child>p:first-child>span:last-child {
    color: #c2c3c8;
}

.information>ul>li:first-child>p:last-child {
    color: #ff6000;
    margin-top: 8px;
}

.information>ul>li+li>p:nth-child(1) {
    color: #ff6000;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
}

.information>ul>li+li>p:nth-child(2) {
    color: #c2c3c8;
    font-size: 13px;
    padding-left: 2%;
}
</style>

