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
                <span>{{item.fcreatetime|formatDateTime}}</span>
                <span>{{item.fstate_s}}</span>
                <!-- 判断fstate == 1 并且 fuid == $store.state.userInfo.fshowid  显示取消 -->
                <!-- 判断fstate == 1 并且 fuid !== $store.state.userInfo.fshowid  显示付款 -->
                <!-- financial.push.record.05=付款 -->
                <!-- comm.cancel=取消 -->
                <span class="cancel" v-if="item.fstate == 1 && item.fuid == $store.state.userInfo.fshowid" v-on:click="cancel(item.fid)" :id="item.fid">{{fstate1}}</span>
                <span class="cancel" v-if="item.fstate == 1 && item.fuid !== $store.state.userInfo.fshowid" v-on:click="payment(item.fid)" :id="item.fid">{{fstate0}}</span>
            </article>
        </div>
        <div class="noRecord" v-show="pushList.length==0">暂无记录</div>  
        <!-- 取消push -->
        <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="20%" center>
            <span class="info">确定取消PUSH资产吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirm">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 付款 -->
        <el-dialog title="PUSH确认" :visible.sync="paymentVisible" width="25%" center>
            <el-form class="form_padding">
                <el-form-item label="PUSH资产">
                    <el-input class="input1" type="text" v-model="push" disabled></el-input>
                </el-form-item>
                <el-form-item label="PUSH价格">
                    <el-input class="input1" type="text" v-model="pros" disabled></el-input>
                </el-form-item>
                <el-form-item label="PUSH数量">
                    <el-input class="input1" type="text" v-model="number" disabled></el-input>
                </el-form-item>
                <el-form-item label="付款金额">
                    <el-input class="input1" type="text" v-model="money" disabled></el-input>
                </el-form-item>
                <el-form-item label="交易密码">
                    <el-input class="input" type="password" v-model="password"></el-input>
                </el-form-item>
            </el-form>
            <transition enter-active-class="animated shake">
                <div class="false-tips fz12"><i v-show="pushMsg"></i>{{pushMsg}}</div>
            </transition>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="Submit">确定提交</el-button>
            </div>
        </el-dialog>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../kits/dateFormat';//格式化时间
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  import tips from "./friendlyTips.vue"//弹框提示
  
  export default {
    data(){
      return {
        type0:'转入',
        type1:'转出',
        fstate0:'付款',
        fstate1:'取消',
        pushuid:'',
        dialogVisible: false,
        pushList:[],
        //付款
        paymentVisible: false,
        push:'',//push资产
        pros:'',//push价格
        number:'',//push数量
        money:'',//付款金额
        password:'',//交易密码
        pushMsg:'',//错误提示
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
      cancel(id){
        this.dialogVisible = true
        this.pushuid = id;
        this.pushList.forEach((fid,item)=>{
          if(item.fid == fid){
            this.pushList = item;
          }
        })
        // console.log(this.pushuid);
      },
        confirm(){
            // console.log(this.pushuid)
            let recordUrl = common.apidomain + 'cancel_push';
            let recordfd = new FormData();
            recordfd.append('pushid',this.pushuid);
            ajax(recordUrl, 'post', recordfd, (res) => {
                 //  调用失败
                if (res.data.code !== 200) {

                    this.$store.commit('changeDialogInfo', res.data.msg)
                } else {
                //调用成功
                    this.$store.commit('changeDialogInfo', res.data.msg);
                }
                this.dialogVisible = false
                this.loadPushInfo()
            });
            
        },
        //付款
        payment(id){
            this.paymentVisible = true
            this.pushuid = id;
            this.pushList.forEach((item,index)=>{
                if(item.fid == id){
                    this.push = item.fcoin_s
                    this.pros = item.fprice
                    this.number = item.fcount
                    this.money = item.famount
                }
            })
        },
        Submit(){
            let paymentUrl = common.apidomain + 'confirm_push';
            let paymentfd = new FormData();
            paymentfd.append('pushid',this.pushuid);
            paymentfd.append('password',this.password);
            ajax(paymentUrl, 'post', paymentfd, (res) => {
                console.log(res)
                //  调用失败
                if (res.data.code !== 200) {

                    this.$store.commit('changeDialogInfo', res.data.msg)
                } else {
                //调用成功
                    this.$store.commit('changeDialogInfo', res.data.msg);
                }
                this.paymentVisible = false
            });
        }
    },
   
    created(){
      this.loadPushInfo().then((res) => {
        if (res.data.code !== 200) {
          return;
        }else{
            if(res.data.data.page.data.fcoin_s == null){
                this.push = '1'
            }
          this.pushList = res.data.data.page.data;

        //   console.log(this.pushList);
        }
      });
    },
    computed:{},
    components:{
      tips,//取消弹窗
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
button {
    margin: -11px 0 0 23%;
    width: 43%;
    height: 35px;
    border-radius: 5px;
    outline: medium;
    border: 0;
    color: #c2c3c8;
}
.form_padding{
    width: 65%;
}
.input{
    width: 65%;
    float: right;
}
.input1{
    width: 50%;
}
</style>