<template>
  <div>
    <!-- 个人资产数据展示部分 -->
      <div class="data">
        <div class="data-list">
          <ul>
            <li>币种</li>
            <li>可用资产</li>
            <li>冻结资产</li>
            <li>总量</li>
          </ul>
          <ul v-for="(item,index) in dataList" v-show="dataList.length!==0">
            <li>{{item.shortName}}</li>
            <li>{{item.total}}</li>
            <li>{{item.frozen}}</li>
            <li>{{item.total+item.frozen}}</li>
          </ul>
          <div class="noRecord" v-show="dataList.length==0">暂无记录</div>
        </div>
      </div>

  </div>
</template>
<script>

  export default {
    data(){
      return {
      }
    },
    methods:{},
    created(){},
    computed:{
      dataList(){
        return this.$store.state.personalAsset;
      }
    },
    components:{}
  }
</script>
<style scoped>
  /*个人资产数据展示部分*/
  .data{
    /*margin-top: 10px;*/
    background-color: #11182B;
  }
  .data-list>ul{
    height: 40px;
    line-height: 40px;
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
    text-align: left;
    padding-left: 60px;
  }

  /*暂无记录*/
  .noRecord{
    height: 500px;
    line-height:500px;
    /*background-color: #11182C;*/
  }
</style>
