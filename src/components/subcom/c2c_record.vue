<template>
    <div class="exchange">
      <header>最近交易记录</header>
      <div class="exchange-list" v-for="(item,index) in tabList">
        <ul>
          <li>{{item.time}}</li>
          <li>{{item.type}}</li>
          <li>{{item.serial}}</li>
          <li>{{item.quantity}}</li>
          <li>{{item.unit}}</li>
          <li>{{item.total}}</li>
          <li>{{item.state}}</li>
          <li>{{item.oper}}</li>
        </ul>
      </div>
      <div id="exchange-info" v-for="(item,index) in businessListings">
        <ul>
          <li>
            <span>{{item.time}}</span>
            <span>{{item.type}}</span>
            <span>{{item.serial}}</span>
            <span>{{item.quantity}}</span>
            <span>{{item.unit}}</span>
            <span>{{item.total}}</span>
            <span>{{item.state}}</span>
            <span>{{item.oper}}</span>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        tabList:[
          {
            time:'时间',
            type:'类别',
            serial:'流水号',
            quantity:'数量',
            unit:'单价',
            total:'总价',
            state:'状态',
            oper:'操作'
          }
        ],
        businessListings:[
          {
            time:'2018.3.26',
            type:'买单',
            serial:'4534433465',
            quantity:'87645',
            unit:'0.125',
            total:'12354',
            state:'已审核',
            oper:'操作'
          }
        ]
      }
    },
    methods:{},
    computed:{},
    components:{}
  }
</script>
<style scoped>
.exchange{
  /*width: 100%;*/
  /*float: left;*/
  /*padding: 0 100px 0 100px;*/
  /*margin: 20px 0 50px;*/
  width: 1300px;
  margin: 20px auto 50px;
  /*  float: left;
    padding: 0 100px 0 100px;
    margin: 20px 0 50px;*/
}

.exchange>header{
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #c2c3c8;
  text-align: left;
  padding-left: 2%;
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
