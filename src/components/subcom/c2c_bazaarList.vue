<template>
  <div class="put-up">
    <header>市场挂单</header>
    <div class="put-info">
      <ul>
        <li>商户</li>
        <li>类型</li>
        <li>成交数量</li>
        <li>状态</li>
        <li>付款方式</li>
      </ul>
    </div>
    <div id="merchant-info">
      <ul>
        <li>
          <span>普通商户</span>
          <span>卖单</span>
          <span>1.025687974</span>
          <span>待审核</span>
          <span>
            <img src="../../assets/cion_y.png" alt="银行卡">
            <img src="../../assets/cion_z.png" alt="支付宝">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    methods:{},
    computed:{},
    created(){},
    components:{}
  }
</script>
<style scoped>
.exchange {
    float: left;
    width: 100%;
    margin-top: 45px;
}

.put-up{
  float: left;
  width: 100%;
  padding: 0 100px 0 100px;
  margin-top: 45px;
}

.put-up>header {
    width: 100%;
    height: 38px;
    font-size: 18px;
    border-bottom: 1px solid #11182c;
    color: #c2c3c8;
    text-align: left;
}

.put-info {
    width: 100%;
    height: 60px;
    background: #0e1326;
    line-height: 60px;
    font-size: 14px;
}

.put-info>ul>li {
    width: 20%;
    float: left;
    color: #c2c3c8;
    font-size: 16px;
}

.put-info>ul>li+li {
    text-align: center;
}


#merchant-info>ul>li {
    height: 45px;
    background: #11182c;
}

#merchant-info>ul>li:hover {
    background: #0e1326;
    cursor: pointer;
}

#merchant-info>ul>li>span {
    display: block;
    width: 20%;
    height: 45px;
    float: left;
    line-height: 45px;
    font-size: 14px;
}

#merchant-info>ul>li>span+span {
    text-align: center;
}


#merchant-info>ul>li>span>img {
    margin-right: 15px;
}

#merchant-info>ul>li:nth-child(1)>span:nth-child(2),
#merchant-info>ul>li:nth-child(2)>span:nth-child(2) {
    color: #5cb85c;
}

#merchant-info>ul>li:nth-child(3)>span:nth-child(2),
#merchant-info>ul>li:nth-child(4)>span:nth-child(2) {
    color: #d9534f;
}

</style>
