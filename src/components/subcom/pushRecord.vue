<template>
  <div class="push_record">
    <header>记录</header>
    <div class="empty"></div>
    <div class="voteNew">
    <ul v-for="(item,index) in pushTab">
        <li>{{item.time}}</li>
        <li>{{item.currency}}</li>
        <li>{{item.address}}</li>
        <li>{{item.number}}</li>
        <li>{{item.confirmation}}</li>
        <li>{{item.state}}</li>
        <li>{{item.state}}</li>
        <li>{{item.state}}</li>
        <li>{{item.state}}</li>
    </ul>
    <div id="voteNew-list" v-for="(item,index) in pushList">
      <article>
        <span>{{item.time}}</span>
        <span>{{item.currency}}</span>
        <span>{{item.address}}</span>
        <span>{{item.number}}</span>
        <span>{{item.confirmation}}</span>
        <span>{{item.state}}</span>
        <span>{{item.state}}</span>
        <span>{{item.state}}</span>
        <span>{{item.state}}</span>
      </article>
    </div>
    </div>
  </div>
</template>
<script>
  
  export default {
    data(){
      return {
        pushTab:[
          {
            time:'时间',
            currency:'币种',
            address:'提现地址',
            number:'提现数量',
            confirmation:'确认数',
            state:'状态',
            state:'状态',
            state:'状态',
            state:'状态',
          }
        ],
        pushList:[
          {
            time:'2018.3.29 20:30:20',
            currency:'FTB',
            address:'河南省',
            number:'155631',
            confirmation:'6',
            state:'已确认',
            state:'已确认',
            state:'已确认',
            state:'已确认',
            state:'已确认',
          }
        ]
      }
    },
    methods:{
      
    },
    created(){},
    computed:{},
    components:{
     
    }
  }
</script>
<style scoped>
header {
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    font-size: 16px;
    text-align: left;
}
.empty{
  width: 100%;
  height: 3px;
  background: #1e253d;
}
header,
.voteNew>ul {
    background: #0e1326;
    color: #c2c3c8;
}

.voteNew {
    margin: 10px 0 50px;
}

.voteNew>ul {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    border-bottom: 1px solid #0c101e;
}

.voteNew>ul>li {
    width: 11%;
    float: left;
    font-size: 14px;
}

#voteNew-list {
    background: #11182c;
}

#voteNew-list>article {
    height: 50px;
    line-height: 50px;
    cursor: pointer;
}

#voteNew-list>article>span {
    display: inline-block;
    width: 11%;
    color: #c2c3c8;
    float: left;
    font-size: 12px;
}
</style>