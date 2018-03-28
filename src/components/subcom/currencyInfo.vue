<template>
  <div class="cur-info-box">
    <Header class="header"></Header>
    <div class="cur-info">
      <header>币种资料</header>
      <div class="cont-box">
        <div class="title clearfix">
          <div class="fl">
            BTC(比特币)
          </div>
          <div class="fr">
            <router-link class="blue" to="/market">K线交易</router-link>
          </div>
        </div>
        <div class="cont">
          <h4>简介</h4>
          <p>
            比特币（BitCoin）的概念最初由中本聪在2009年提出，根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币是一种P2P形式的数字货币。点对点的传输意味着一个去中心化的支付系统。
          </p>
          <h4>优势</h4>
          <p>
            比特币（BitCoin）的概念最初由中本聪在2009年提出，根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币是一种P2P形式的数字货币。点对点的传输意味着一个去中心化的支付系统。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "../header"
  export default{
    data(){
      return {}
    },
    created(){},
    methods:{},
    computed:{},
    components:{
      Header
    }
  }
</script>
<style scoped>
  .cur-info-box{
    /*padding:0 100px;*/
  }
  .cur-info{

    margin-top:100px;
    /*background-color: #fff;*/
    padding:0 100px;

  }
  header{
    background-color:#0e1425;
    height:70px;
    line-height:70px;
    text-align: left;
    box-sizing: border-box;
    padding:0 20px;
    width:100%;
  }
  .cont-box{
    /*width:100%;*/
    background-color:#12182b;
    text-align: left;
    margin-top:20px;
  }
  .cont{
    padding:20px 40px;
  }
  .title{
    padding:0 20px;
    height:70px;
    line-height:70px;
    background-color:#0e1425 ;
  }

</style>
