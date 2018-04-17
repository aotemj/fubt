<template>
 <div>
    <div class="container-screen">
      <div class="voteNew">
        <ul>
            <li>时间</li>
            <li>币种</li>
            <li>充值地址</li>
            <li>充值数量</li>
            <li>确认数</li>
            <li>状态</li>
        </ul>
        <div id="voteNew-list" v-show="recordList.length!==0">
          <article v-for="(item,index) in recordList" :key="index">
            <span>{{ item.fcreatetime }}</span>
            <span>{{ item.updata }}</span>
            <span>{{ item.address }}</span>
            <span>{{ item.number }}</span>
            <span>{{ item.confirmations }}</span>
            <span>{{ item.status }}</span>
          </article>
        </div>
        <div class="wu" v-show="recordList.length==0">暂无记录</div>
      </div>
    </div>
  </div>
</template>
<script>

    // // 主键ID
    // private Integer fid;
    // // 银行卡ID
    // private Integer fsysbankid;
    // // 用户ID
    // private Integer fuid;
    // // 币种id
    // private Integer fcoinid;
    // // 创建时间
    // private Date fcreatetime;
    // // 数量
    // private BigDecimal famount;
    // // 充值或提现 CapitalOperationTypeEnum，汇款or提现
    // private Integer finouttype;
    // // 充值类型
    // private Integer ftype;
    // private String ftype_s;
    // // 状态
    // private Integer fstatus;// CapitalOperationInStatus||CapitalOperationOutStatus
    // private String fstatus_s;
    // // 汇款类型
    // private Integer fremittancetype;
    // // 备注
    // private String fremark;
    // // 充值银行
    // private String fbank;
    // // 银行帐号
    // private String faccount;
    // // 开户姓名
    // private String fpayee;
    // // 手机号
    // private String fphone;
    // // 更新时间
    // private Date fupdatetime;
    // // 审核管理员ID
    // private Integer fadminid;
    // // 手续费
    // private BigDecimal ffees;
    // // 版本号
    // private Integer version;
    // // 是否充值
    // private Boolean fischarge;
    // // 开户地址
    // private String faddress;
    // // 来源
    // private Integer fsource;
    // private String fsource_s;
    // // 订单来源平台
    // private Integer fplatform;
    // private String fplatform_s;

    // /********** 扩展字段 ************/

    // // 登录名
    // private String floginname;
    // // 昵称
    // private String fnickname;
    // // 真实姓名
    // private String frealname;
    // // 审核人
    // private String fadminname;

  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";
  export default {
    data(){
      return {
        //充值列表
        recordList:[],
      }
    },
    methods:{
      newrecord() {
        return new Promise((resolve, reject) => {
          let recordUrl = common.apidomain + 'financial/record';
          let record = new FormData();
          record.append('type',1);
          record.append('fuid',this.$store.state.userInfo.fid);
          ajax(recordUrl, 'post', record, (res) => {
            resolve(res);
          });
        });
      },
    },
    created(){
      this.newrecord().then((res) => {
        if (res.data.code !== 200) {
          return;
        }else{
          console.log(res)   
          this.recordList = res.data.data.list.data
          console.log(this.recordList)   
        }
      });
    },
    computed:{
      // 用户id
      dialogFormVisible(){
        return this.$store.state.userInfo;
      }
    },
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
