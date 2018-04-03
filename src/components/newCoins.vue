<template>
  <div>
    <!-- 1.0 头部 -->
     <Header class="header"></Header>

    <!-- 2.0 投票记录列表 -->
    <div class="newCoins">
      <!-- 新币投票表头 -->
      <header>
        <div class="left">新币投票</div>
        <!--<div class="left">记录</div>-->
      </header>
      <!-- 数据展示部分 -->
      <div class="data">
        <div class="data-list">
          <ul>
            <li>序号</li>
            <li>币种</li>
            <li>名称</li>
            <li>赞成/反对</li>
            <li>参与人数</li>
            <li>操作</li>
          </ul>
          <ul v-for="(item,index) in dataList">
            <li>{{item.xuhao}}</li>
            <li>{{item.bizhong}}</li>
            <li>{{item.name}}</li>
            <li>{{item.zhichi}}</li>
            <li>{{item.sum}}</li>
            <li>
              <button type="button">赞成</button>
              <button type="button">反对</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from './header'
  export default {
    data(){
      return {
        dataList:[
          {
            xuhao:1,
            bizhong:'FHU',
            name:'比特币',
            zhichi:'23/43',
            sum:234,
          },
          {
            xuhao:2,
            bizhong:'SDF',
            name:'人民币',
            zhichi:'89/993',
            sum:894,
          },
          {
            xuhao:3,
            bizhong:'KRU',
            name:'美元',
            zhichi:'9/439',
            sum:789,
          },
          {
            xuhao:4,
            bizhong:'WRU',
            name:'美元',
            zhichi:'9/9',
            sum:79,
          }
        ],
      }
    },
    methods:{},
    computed:{},
    created(){},
    components:{
      Header
    }
  }
</script>

<style scoped>
  .newCoins{
    padding: 0 100px;
    line-height:60px;
    margin-top:100px;
    padding:0 100px;
  }
  header {
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    background-color: #0E1326;
  }
  .left{
    float: left;
    font-size: 16px;
    padding-left: 20px;
  }
  /*数据展示部分*/
  .data{
    margin-top: 10px;
    background-color: #11182B;
  }
  .data-list>ul{
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }
  .data-list>ul:first-child{
    background-color: #0E1326;
    font-size: 14px;
  }
  .data-list>ul:not(:first-child):hover{
    background:#0E1326;
    cursor: pointer;
  }
  .data-list>ul>li {
    width: 16.666%;
    float: left;
  }
  .data-list>ul+ul{
    font-size: 12px;
  }
  /*操作按钮部分*/
  button{
    width: 70px;
    height: 25px;
    background: transparent;
    border: 1px solid #c2c3c8;
    border-radius: 5px;
    font-size: 12px;
    line-height: 18px;
    display: inline-block;
    margin: 0 2px;
  }
  button:hover{
    border: 1px solid #245da2;
    color: #245da2;
    cursor: pointer;
  }
</style>
