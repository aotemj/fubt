<template>
    <div class="exchange">
      <header>最近交易记录 <span id="toggle-info">收起-</span></header>
      <div class="exchange-list">
        <ul>
          <li>时间</li>
          <li>类别</li>
          <li>流水号</li>
          <li>数量</li>
          <li>单价</li>
          <li>总价</li>
          <li>状态</li>
          <li>操作</li>
        </ul>
      </div>
      <div id="exchange-info" style="display: block;">
        <ul>
          <li>
            <span>2018/3/27 17:27</span>
            <span>买单</span>
            <span>15978464531</span>
            <span>976416312252</span>
            <span>0.2154</span>
            <span>97975466</span>
            <span>已完成</span>
            <span>确定</span>
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
    components:{}
  }
</script>
<style scoped>
.exchange{
  width: 100%;
  float: left;
  padding: 0 100px 0 100px;
  margin: 20px 0 50px;
}

.exchange>header{
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #c2c3c8;
  text-align: left;
}

.exchange-list>ul{
  width: 100%;
  height: 60px;
  background: #0e1326;
  line-height: 60px;
  font-size: 14px;
}
.exchange-list>ul>li:first-child {
    width: 17%;
}

.exchange-list>ul>li:nth-child(1),
.exchange-list>ul>li:nth-child(3) {
    width: 17%;
}

.exchange-list>ul>li {
    width: 10%;
    float: left;
    color: #c2c3c8;
}

.exchange-list>ul>li:nth-child(4),
.exchange-list>ul>li:nth-child(5),
.exchange-list>ul>li:nth-child(6),
.exchange-list>ul>li:nth-child(7),
.exchange-list>ul>li:nth-child(8) {
    text-align: center;
}

#toggle-info {
    cursor: pointer;
    float: right;
    padding-right: 3%;
    font-size: 15px;
    color: #333;
}

#exchange-info>ul>li>span:first-child {
    width: 15%;
}

#exchange-info>ul>li {
    height: 40px;
    background: #11182c;
}

#exchange-info>ul>li:hover {
    background: #0e1326;
    cursor: pointer;
}

#exchange-info>ul>li>span {
    display: block;
    width: 10%;
    height: 40px;
    float: left;
    line-height: 40px;
}

#exchange-info>ul>li>span:nth-child(3) {
    width: 10%;
}

#exchange-info>ul>li>span:nth-child(1),
#exchange-info>ul>li>span:nth-child(3) {
    width: 17%;
}

#exchange-info>ul>li>span:nth-child(4),
#exchange-info>ul>li>span:nth-child(5),
#exchange-info>ul>li>span:nth-child(6),
#exchange-info>ul>li>span:nth-child(7),
#exchange-info>ul>li>span:nth-child(8) {
    text-align: center;
}

#exchange-info>ul>li>span>a {
    color: #2a7fff;
    text-decoration: none;
}

</style>
