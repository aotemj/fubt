<template>
 <div>
    <div class="container-screen">
      <!--<header>新币投票</header>-->
      <div class="voteNew">
        <ul v-for="(item,index) in newrecordTab">
            <li>{{item.time}}</li>
            <li>{{item.currency}}</li>
            <li>{{item.address}}</li>
            <li>{{item.number}}</li>
            <li>{{item.confirmation}}</li>
            <li>{{item.state}}</li>
        </ul>
        <div id="voteNew-list" v-for="(item,index) in newrecordList" v-show="newrecordList.length!==0">
          <article>
            <span>{{item.time}}</span>
            <span>{{item.currency}}</span>
            <span>{{item.address}}</span>
            <span>{{item.number}}</span>
            <span>{{item.confirmation}}</span>
            <span>{{item.state}}</span>
          </article>
        </div>
        <div class="wu" v-show="newrecordList.length==0">暂无记录</div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return {
        newrecordTab:[
          {
            time:'时间',
            currency:'币种',
            address:'充值地址',
            number:'充值数量',
            confirmation:'确认数',
            state:'状态'
          }
        ],
        newrecordList:[
          {
            time:'2018.3.29 20:30:20',
            currency:'FTB',
            address:'河南省',
            number:'155631',
            confirmation:'6',
            state:'已确认'
          }
        ]
      }
    },
    methods:{},
    created(){},
    computed:{},
    components:{
    }
  }
</script>
<style scoped>
/*header {*/
    /*height: 60px;*/
    /*padding-left: 20px;*/
    /*line-height: 60px;*/
    /*font-size: 16px;*/
    /*margin-top: 25px;*/
    /*text-align: left;*/
/*}*/
.wu{
    height: 500px;
    line-height: 500px;
    background: #0e1326;
}

.voteNew>ul {
    background: #0e1326;
    color: #c2c3c8;
}

.voteNew {
    margin:0px 0 50px;
}

.voteNew>ul {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #0c101e;
}

.voteNew>ul>li {
    width: 16.5%;
    float: left;
    font-size: 14px;
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
    width: 16.5%;
    color: #c2c3c8;
    float: left;
    font-size: 12px;
}
</style>
