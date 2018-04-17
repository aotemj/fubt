<template>
  <div class="push_record">
    <header>记录</header>
    <div class="empty"></div>
    <div class="voteNew">
    <ul>
        <li class="name">币种</li>
        <li class="fname">收益类型</li>
        <li class="famount">数量</li>
        <li class="famount">预计收益</li>
        <li class="fupdatetime">预计发放时间</li>
        <li class="fupdatetime">创建时间</li>
        <li class="famount">状态</li>
        <li class="famount">操作</li>
    </ul>
    <div id="voteNew-list" v-show="pushList.length!==0">
      <article v-for="(item,index) in pushList" :key="index">
        <span class="name" v-for="(item,index) in profit" :key="index">{{ item.name }}</span>
        <span class="fname">{{ item.fname }}</span>
        <span class="famount">{{ item.famount }}</span>
        <span class="famount">{{ item.frate }}</span>
        <span class="fupdatetime">{{ item.fupdatetime }}</span>
        <span class="fupdatetime">{{ item.fcreatetime }}</span>
        <span class="famount">{{ item.fstate_s }}</span>
        <span class="famount">dfgafg</span>
      </article>
    </div>
    <div class="noRecord" v-show="pushList.length==0">暂无记录</div>
    </div>
  </div>
</template>
<script>
  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";
  export default {
    data(){
      return {
        profit:[],
        pushList: []
      }
    },
    methods:{
      recordList() {
        return new Promise((resolve, reject) => {
          let recordUrl = common.apidomain + 'financial/finances';
          ajax(recordUrl, 'post', {}, (res) => {
            resolve(res);
          });
        });
      }
    },
    created(){
      this.recordList().then((res) => {
        if (res.data.code !== 200) {
          // this.errorMsg = res.data.msg;
          return;
        } else {
          this.pushList = res.data.data.page.data
          this.profit = res.data.data.financesCoinMap
          console.log(1)
          console.log(res)
          console.log(res.data.data.financesCoinMap[0].name)
          console.log(2)
          
        }
      });
    },
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
    /* width: 12.5%; */
    color: #c2c3c8;
    float: left;
    font-size: 12px;
}
.name{
  width: 5%;
  margin-left: 4%;
}
.fname{
  margin: 0 3%;
  width: 27%;
}
.famount{
  width: 5%;
  margin-left: 2%;
}
.fupdatetime{
  width: 10%;
  margin-left: 3%;
}

</style>
