<template>
  <div class="push_record">
    <tips></tips>
    <header>记录</header>
    <div class="empty"></div>
    <div class="voteNew">
        <ul>
            <li>类型</li>
            <li>UID</li>
            <li>资产</li>
            <li>数量</li>
            <li>价格(FBT)</li>
            <li>金额</li>
            <li>时间</li>
            <li>状态</li>
            <li>操作</li>
        </ul>
        <div id="voteNew-list">
            <article v-for="(item,index) in pushList" v-show="pushList.length!==0" :key="index">
                <!-- enum.financial.transfer.type1=转出 -->
                <!-- enum.financial.transfer.type0=转入 -->
                <!-- 判断fuid == $store.state.userInfo.fshowid 时 显示转出 -->
                <!-- 否则显示转入 -->
                <span v-if="item.fuid !== $store.state.userInfo.fshowid">{{ type0 }}</span>
                <span v-else>{{ type1 }}</span>
                <span>{{item.fpushuid}}</span>
                <span>{{item.fcoin_s}}</span>
                <span>{{item.fcount}}</span>
                <span>{{item.fprice}}</span>
                <span>{{item.famount}}</span>
                <span>{{item.fcreatetime}}</span>
                <span>{{item.fstate_s}}</span>
                <!-- 判断fstate == 1 并且 fuid == $store.state.userInfo.fshowid  显示取消 -->
                <!-- 判断fstate == 1 并且 fuid !== $store.state.userInfo.fshowid  显示付款 -->
                <!-- financial.push.record.05=付款 -->
                <!-- comm.cancel=取消 -->
                <span class="cancel" v-if="item.fstate == 1 && item.fuid == $store.state.userInfo.fshowid" v-on:click="dialogVisible = true(item.fid,1)" :id="item.fid">{{fstate1}}</span>
                <span class="cancel" v-if="item.fstate == 1 && item.fuid !== $store.state.userInfo.fshowid" v-on:click="payment">{{fstate0}}</span>
            </article>
        </div>
        <div class="noRecord" v-show="pushList.length==0">暂无记录</div>  
        <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="20%" center>
            <span class="info">确定取消PUSH资产吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" v-on:click="cancel">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>
<script>
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  import tips from "./friendlyTips.vue"
  
  export default {
    data(){
      return {
        type0:'转入',
        type1:'转出',
        fstate0:'付款',
        fstate1:'取消',
        fpushuid:'',
        dialogVisible: false,
        pushList:[]
      }
    },
    methods:{
       loadPushInfo() {
        return new Promise((resolve, reject) => {
          let pushUrl = common.apidomain + 'financial/push';
          ajax(pushUrl, 'post', {}, (res) => {
            resolve(res);
          });
        })
      },
      //取消push
      cancel(){
        let recordUrl = common.apidomain + 'cancel_push';
        var recordfd = new FormData();
        recordfd.append('fpushuid',this.fpushuid);
        ajax(recordUrl, 'post', recordfd, (res) => {
            if(res.data.code !== 200){
                return;
            }else{
                this.$store.commit('changeDialogInfo','取消成功')
                dialogVisible = false
            }
        });
      },
    },
    created(){
      this.loadPushInfo().then((res) => {
        if (res.data.code !== 200) {
          return;
        }else{
          this.pushList = res.data.data.page.data;
          this.fpushuid = res.data.data.page.data.fpushuid;
        }
      });
    },
    computed:{},
    components:{
      tips,//取消弹窗
    }
  }
</script>
<style scoped>
.info{
    text-align: center;
    width:100%;
    display: inline-block;
    color: #c2c3c8;
}
.cancel{
    color:#2d76d1 !important;
}
.noRecord{
    height: 150px;
    line-height: 150px;
}
header {
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
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
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #0c101e;
}

.voteNew>ul>li {
    width: 11%;
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
    width: 11%;
    color: #c2c3c8;
    float: left;
    font-size: 12px;
}
</style>