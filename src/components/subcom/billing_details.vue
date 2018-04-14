<template>
  <div class="billing_box">
    <header>
      <div class="block">

        <el-row class="block-col-2">
          <div class="picker">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              id="1">
            </el-date-picker>
          </div>

          <el-col class="w5p lh60">
            <span class="fr">市场</span>
          </el-col>
          <!--市场-->
          <el-col :span="12">
            <el-select v-model="selectMarket" placeholder="请选择">
              <el-option
                v-for="item in market"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>

          <el-col class="w5p lh60">
            <span class="fr">币种</span>
          </el-col>
          <!--币种-->
          <el-col :span="12" class="w8p fz12">
            <el-select v-model="selectCoin" placeholder="请选择">
              <el-option class="fz12"
                v-for="item in coinTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>

          <el-col class="w5p lh60">
            <span class="fr">类型</span>
          </el-col>
          <!--类型-->
          <el-col :span="12" class="w8p">
            <el-select v-model="selectType" placeholder="请选择">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="w5p lh60">
            <span class="fr">状态</span>
          </el-col>
          <!--类型-->
          <el-col :span="12">

            <!--<el-col>-->
            <el-select class="fl" v-model="selectStatus" placeholder="请选择">

              <el-option class=""
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
          <ul v-for="(item,index) in billingTab">
            <li>{{item.time}}</li>
            <li>{{item.type}}</li>
            <li>{{item.number}}</li>
            <li>{{item.service}}</li>
            <li>{{item.state}}</li>
          </ul>
          <div id="voteNew-list">
            <article v-for="(item,index) in billingList" v-show="billingList.length!==0">
              <span>{{item.time}}</span>
              <span>{{item.type}}</span>
              <span>{{item.number}}</span>
              <span>{{item.service}}</span>
              <span>{{item.state}}</span>
            </article>
          </div>
          <div class="noRecord" v-show="billingList.length==0">暂无记录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //市场
        market: [
          {
            value: '0',
            label: 'FBT交易区'
          }, {
            value: '1',
            label: 'FUC交易区'
          }, {
            value: '2',
            label: 'BTC交易区'
          }
        ],
        selectMarket: '',//市场选中值
        //币种列表
        coinTypeList: [
          {
            value: '3',
            label: 'FBT交易区'
          }, {
            value: '4',
            label: 'FUC交易区'
          }, {
            value: '5',
            label: 'BTC交易区'
          }
        ],
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

        //状态
        statusList:[
          {
            vlaue:'8',
            label:'等待提现'
          },
          {
            value:'9',
            label:'提现完成'
          }
        ],
        selectStatus:8,//状态选中值

        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: '',
        value2: '',
        billingTab: [
          {
            time: '交易时间',
            type: '类型',
            number: '数量',
            service: '手续费',
            state: '状态'
          }
        ],
        billingList: [
          {
            time: '2018.3.29 20:30:20',
            type: 'FTB',
            number: '155631',
            service: '0.01',
            state: '已确认'
          }
        ]
      };
    },
    methods:{
      getRecord(){
        let recordUrl = common.apidomain+'financial/record';
        let fd = new FormData();
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

      },//获取表单数据
    },
    computed:{},
    created(){}
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
    width: 20%;
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
    width: 20%;
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
