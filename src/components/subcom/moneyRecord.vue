<template>
  <div class="push_record">
    <header>记录</header>
    <div class="empty"></div>
    <div class="voteNew">
    <ul v-for="(item,index) in pushTab">
        <li>{{item.currency}}</li>
        <li>{{item.type}}</li>
        <li>{{item.number}}</li>
        <li>{{item.earnings}}</li>
        <li>{{item.grantTime}}</li>
        <li>{{item.creationTime}}</li>
        <li>{{item.state}}</li>
        <li>{{item.operation}}</li>
    </ul>
    <div id="voteNew-list">
      <article v-for="(item,index) in pushList" v-show="pushList.length!==0">
        <span>{{item.currency}}</span>
        <span>{{item.type}}</span>
        <span>{{item.number}}</span>
        <span>{{item.earnings}}</span>
        <span>{{item.grantTime}}</span>
        <span>{{item.creationTime}}</span>
        <span>{{item.state}}</span>
        <span>{{item.operation}}</span>
      </article>
    </div>
    <div class="noRecord" v-show="pushList.length==0">暂无记录</div>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return {
        pushTab:[
          {
            currency:'币种',
            type:'收益类型',
            number:'数量',
            earnings:'预计收益',
            grantTime:'预计发放时间',
            creationTime:'创建时间',
            state:'状态',
            operation:'操作',
          }
        ],
        pushList:[
          // {
          //   currency:'FBT',
          //   type:'类型',
          //   number:'954642',
          //   earnings:'12.1345',
          //   grantTime:'2018/3/30 14:31',
          //   creationTime:'2018/3/30 14:31',
          //   state:'已存入',
          //   operation:'已审核',
          // }
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
.noRecord{
    height: 150px;
    line-height: 150px;
}
header {
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 14px;
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
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #0c101e;
}

.voteNew>ul>li {
    width: 12.5%;
    float: left;
    font-size: 12px;
}

#voteNew-list {
    background: #11182c;
}

#voteNew-list>article {
    height: 40px;
    line-height: 40px;
    cursor: pointer;
}

#voteNew-list>article>span {
    display: inline-block;
    width: 12.5%;
    color: #c2c3c8;
    float: left;
    font-size: 12px;
}
</style>
