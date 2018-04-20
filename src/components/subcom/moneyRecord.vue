<template>
  <div class="push_record">
    <tips></tips>
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
        <span class="fupdatetime">{{ item.fupdatetime|formatDateTime }}</span>
        <span class="fupdatetime">{{ item.fcreatetime|formatDateTime }}</span>
        <span class="famount">{{ item.fstate_s }}</span>
        <span class="famount" v-if="item.fstate==1 && item.fcoinstate !==2" v-on:click="payment(item.fid)" :id="item.fid">取消</span>
        <span v-else></span>
      </article>
    </div>
    <div class="noRecord" v-show="pushList.length==0">暂无记录</div>
    </div>
    <!-- 取消push -->
    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="20%" center>
        <span class="info">确定取消PUSH资产吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" v-on:click="subt">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";
  import tips from "./friendlyTips.vue"//弹框提示
  import {formatDate} from '../../kits/dateFormat';//格式化时间
  export default {
    data(){
      return {
        profit:[],
        pushList: [],
        dialogVisible: false,
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
      },
      //取消
      payment(id){
        console.log(123)
        this.dialogVisible = true
        this.pushuid = id;
        this.pushList.forEach((item,index)=>{
          if(item.fid == id){

          }
        })
      },
      //取消存币
      subt(){
        let recordUrl = common.apidomain + 'cancel_finances';
        let pushfd = new FormData();
        pushfd.append('fid', this.pushuid);
          ajax(recordUrl, 'post', pushfd, (res) => {
            //  调用失败
              if (res.data.code !== 200) {
                this.$store.commit('changeDialogInfo', res.data.msg)
              } else {
              //调用成功
                // this.$store.commit('changeDialogInfo',{} res.data.msg);
                this.$store.commit('changeDialogInfo',{dataInfo:'取消成功'})
                this.dialogVisible = false
              }
            
          });
      },

    },
    created(){
      this.recordList().then((res) => {
        if (res.data.code !== 200) {
          // this.errorMsg = res.data.msg;
          return;
        } else {
          this.pushList = res.data.data.page.data
          this.profit = res.data.data.financesCoinMap
          
        }
      });
    },
    computed:{},
    components:{
      tips,//弹窗确认
    },
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
  width: 29%;
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
