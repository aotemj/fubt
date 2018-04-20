<template>
 <div>
    <div class="container-screen">
      <div class="voteNew">
        <ul>
            <li>时间</li>
            <li>币种</li>
            <li>提现地址</li>
            <li>提现数量</li>
            <li>确认数</li>
            <li>状态</li>
        </ul>
        <div id="voteNew-list" v-show="recordList.length!==0">
          <article v-for="(item,index) in recordList" :key="index">
            <span>{{item.fupdatetime|formatDateTime}}</span>
            <span>{{item.fsource_s}}</span>
            <span>{{item.fwithdrawaddress}}</span>
            <span>{{item.famount}}</span>
            <span>{{item.state}}</span>
            <span>{{item.fstatus_s}}</span>
          </article>
        </div>
        <div class="wu" v-show="recordList.length==0">暂无记录</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../kits/dateFormat';//格式化时间
  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";

  export default {
    data(){
      return {
        recordList:[],//
      }
    },
    methods:{
      //用户提现列表方法
      loadAlipayList() {
        return new Promise((resolve, reject) => {
          let recordUrl = common.apidomain + 'financial/record';
          let record = new FormData();
          record.append('type',2);
          record.append('fuid',this.$store.state.userInfo.fid);
          record.append('symbol',1);
           record.append('currentPage',1);
           record.append('datetype',2);
          ajax(recordUrl, 'post', record, (res) => {
            resolve(res);
          });
        });
      },
    },
    created(){
      //加载提现列表数据
      this.loadAlipayList().then((res) => {
         console.log(res)
        if (res.data.code !== 200) {
          return;
        }else{
          this.recordList = res.data.data.list.data
        }
      });
        
    },
    computed:{
      
    },
    components:{},
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      },
      formatDateTime(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
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

/*header,*/
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
    margin: 0px 0 50px;
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
