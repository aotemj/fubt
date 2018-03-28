<template>
  <div>
    <!-- 1.0 头部 -->
    <Header class="header"></Header>

    <!-- 2.0 内容 -->
    <div class="finContent">
      <!-- 充值提现表头 -->
      <header>
        <div class="left">充值&提现</div>
        <div class="right">
          <section>
            <div class="all">
              <input type="radio" id="female" name="radioGroup" checked="checked" />
              <label for="female">显示全部</label>
            </div>
            <div class="part">
              <input type="radio" id="male" name="radioGroup" />
              <label for="male">隐藏资产为0的币种</label>
            </div>
            <div class="search">
              <input type="text" placeholder="搜索">
              <img src="../assets/search_01.png" height="14" width="14" alt="">
            </div>
          </section>
        </div>
      </header>
      <!-- 数据展示部分 -->
      <div class="data">
        <div class="data-list">
          <ul>
            <li>币种</li>
            <li>可用</li>
            <li>冻结</li>
            <li>操作</li>
          </ul>
          <ul v-for="(item,index) in dataList">
            <li>{{item.bizhong}}</li>
            <li>{{item.keyong}}</li>
            <li>{{item.dongjie}}</li>
            <li>
              <button type="button">充值</button>
              <button type="button">提现</button>
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
            bizhong:'FUC',//币种
            keyong:0.8888888,//可用
            dongjie:0.9999999,//冻结
          },
          {
            bizhong:'UFO',//币种
            keyong:0.7777777,//可用
            dongjie:0.6666666,//冻结
          },
          {
            bizhong:'ABC',//币种
            keyong:0.5555555,//可用
            dongjie:0.4444444,//冻结
          }
        ]
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
  .finContent{
    /*height:70px;*/
    line-height:70px;
    margin-top:100px;
    padding:0 100px;
  }
  /*充值提现表头*/
  header {
    height: 80px;
    line-height: 80px;
    overflow: hidden;
    background-color: #0E1326;
  }
  .left{
    float: left;
    font-size: 20px;
    padding-left: 20px;
  }
  .right{
    float: right;
    overflow: hidden;
  }
  .right .all,.right .part,.right .search{
    float: left;
    width: 200px;
  }
  .right .all input,.right .part input{
    display: inline-block;
  }
  .right .all label,.right .part label{
    font-size: 16px;
    cursor: pointer;
  }
  .right .part{
    margin-right: 60px;
  }
  .right .search{
    position: relative;
  }
  .right .search input{
    display: inline-block;
    width: 145px;
    height: 30px;
    border: 1px solid #c2c2c8;
    border-radius: 15px;
    padding-left: 40px;
    background: transparent;
  }
  .right .search img{
    position: absolute;
    top: 34px;
    left: 44px;
  }
  input[type="radio"]+label::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    width: 1em;
    height: 1em;
    margin-right: .4em;
    border-radius: 50%;
    border: 1px solid #338ff5;
    text-indent: .15em;
    line-height: 1;
  }
  input[type="radio"]:checked+label::before {
    width: .6em;
    height: .6em;
    vertical-align: middle;
    background-color: #338ff5;
    background-clip: content-box;
    padding: .2em;
  }
  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  /*数据展示部分*/
  .data{
    margin-top: 10px;
    background-color: #11182B;
  }
  .data-list>ul{
    height: 60px;
    line-height: 60px;
    overflow: hidden;
  }
  .data-list>ul:first-child{
    background-color: #0E1326;
  }
  .data-list>ul:not(:first-child):hover{
    background:#0E1326;
    cursor: pointer;
  }
  .data-list>ul>li {
    width: 25%;
    float: left;
  }
  /*操作按钮部分*/
  button{
    width: 78px;
    height: 28px;
    background: transparent;
    border: 1px solid #c2c3c8;
    border-radius: 5px;
    font-size: 14px;
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
