<template>
  <div class="billing_box">
    <header>
      <div class="block">
        <el-row class="block-col-2">
          <div class="picker">
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" id="1" v-on:click="endTime">
            </el-date-picker>
          </div>

          <el-col class="w5p lh60">
            <span class="fr">币种</span>
          </el-col>
          <!--币种-->
          <el-col :span="12" class="w8p fz12">
            <el-select v-model="selectCoin" placeholder="请选择">
              <el-option class="fz12" v-for="item in coinTypeList" :key="item.value" :label="item.label" :value="item.value" v-on:click="currency" >
              </el-option>
            </el-select>
          </el-col>

          <el-col class="w5p lh60">
            <span class="fr">类型</span>
          </el-col>
          <!--类型-->
          <el-col :span="12" class="w8p">
            <el-select v-model="selectType" placeholder="请选择">
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" v-on:click="type">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </header>
    <div class="empty"></div>
    <div class="billing_list">
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
          <div id="voteNew-list" v-show="billingList.length!==0">
            <article v-for="(item,index) in billingList" :key="index">
              <span>{{item.fupdatetime}}</span>
              <span>{{item.fsource_s}}</span>
              <span>{{item.fwithdrawaddress}}</span>
              <span>{{item.famount}}</span>
              <span>{{item.state}}</span>
              <span>{{item.fstatus_s}}</span>
            </article>
          </div>
          <div class="noRecord" v-show="billingList.length==0">暂无记录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";
  export default {
    data() {
      return {
        value1: '',//开始时间
        value2: '',//结束时间
        selectMarket: '',//市场选中值
        //币种列表
        coinTypeList: [],
        selectCoin: '',//币种选中值

        //类型
        typeList: [
          {
            value: '6',
            label: '充值'
          },
          {
            value:'7',
            label:'提现'
          }
        ],
        selectType:'6',//类型选中值

        selectStatus:8,//状态选中值

        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        // 账单明细记录
        billingList: [],
      };
    },
    // fd.append('symbol',);
        // fd.append('currentPage',);
        // fd.append('type',);
        // fd.append('datetype',);
        // fd.append('begindate',);
        // fd.append('enddate',);
        /*
        * 参数
        * symbol: 15
        * //currentPage
          type: 1
          datetype: 0
          begindate: 2018-04-13
          enddate: 2018-04-13
          */
    //获取表单数据
    methods:{
      //开始时间
      startTime(){
        let startUrl = common.apidomain + 'financial/record';
        let start = new FormData();
        start.append('typbegindatee',this.value1);//开始时间
        start.append('enddate',this.value2);//结束时间
        start.append('enddate',this.selectCoin);//币种
        start.append('enddate',this.selectType);//类型
        ajax(startUrl, 'post', start, (res) => {
          if (res.data.code !== 200) {
            return;
          } 
          // console.log(res)
          // this.coinTypeList = res.data.data.filters
        });
      },
      //结束时间
      endTime(){
        let endUrl = common.apidomain + 'financial/record';
        let end = new FormData();
        end.append('typbegindatee',this.value1);//开始时间
        end.append('enddate',this.value2);//结束时间
        end.append('enddate',this.selectCoin);//币种
        end.append('enddate',this.selectType);//类型

        ajax(endUrl, 'post', end, (res) => {
          if (res.data.code !== 200) {
            return;
          }
          // console.log(res)
        });
      },
      //币种
      currency(){
        let currencyUrl = common.apidomain + 'financial/record';
        let currency = new FormData();
        currency.append('typbegindatee',this.value1);//开始时间
        currency.append('enddate',this.value2);//结束时间
        currency.append('enddate',this.selectCoin);//币种
        currency.append('enddate',this.selectType);//类型


        ajax(currencyUrl, 'post', currency, (res) => {
           //  调用失败
          if (res.data.code !== 200) {
            return;
          } else {
          //调用成功
            this.coinTypeList = res.data.data.filters
            // console.log(res)
          }
          
        });
      },
      //类型
      type(){
        let typeUrl = common.apidomain + 'financial/record';
        let type = new FormData();
        type.append('typbegindatee',this.value1);//开始时间
        type.append('enddate',this.value2);//结束时间
        type.append('enddate',this.selectCoin);//币种
        type.append('enddate',this.selectType);//类型

        ajax(typeUrl, 'post', type, (res) => {
          if (res.data.code !== 200) {
            return
          }
          // console.log(123)
        });
      },
      billingLists(){
        return new Promise((resolve, reject) => {
          let billingUrl = common.apidomain + 'financial/record'
          let record = new FormData();
          record.append('type',2);
          record.append('type',1);
          record.append('fuid',this.$store.state.userInfo.fid);
            ajax(billingUrl, 'post', record , (res) => {
                resolve(res);
            });
        })
      }
    },
    
    created(){
      this.billingLists().then((res) => {
         //  调用失败
        if (res.data.code !== 200) {
          return;
        }
        //调用成功
          this.coinTypeList = res.data.data.filters
          this.billingList = res.data.data.list.data
          // console.log(this.billingList)
      });
    },
    computed:{},
  };
</script>
<style scoped>
  .block {
    background-color: #0E1326;
  }

  .noRecord {
    height: 410px;
    line-height: 410px;
    background-color: #11182C;
  }

  .empty {
    width: 100%;
    height: 20px;
    background: #1e253d;
  }

  .voteNew > ul {
    background: #0e1326;
    color: #c2c3c8;
  }

  .voteNew {
    margin: 10px 0 50px;
  }

  .voteNew > ul {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #0c101e;
  }

  .voteNew > ul > li {
    width: 16.5%;
    float: left;
    font-size: 14px;
  }

  #voteNew-list {
    background: #11182c;
  }

  #voteNew-list > article {
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }

  #voteNew-list > article > span {
    display: inline-block;
    width: 16.5%;
    color: #c2c3c8;
    font-size: 12px;
    float: left;
  }

  .picker {
    float: left;
    margin-top: 15px;
  }

  .picker > span:first-child {
    margin: 0 10px 0 15px;
  }

  .picker > .to {
    margin: 0 5px;
  }

  .block-col-2 {
    padding: 0 15px;
  }

  .el-date-editor .el-range__icon {
    /*line-height: 24px;*/
  }
</style>
