<template>
  <div class="billing_box">
    <header>
      <div class="block">
        <div class="picker">
          <span class="to">起止日期</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期">

          </el-date-picker>
          <span class="to">至</span>
          <el-date-picker v-model="value2" type="date" placeholder="选择日期">

          </el-date-picker>
        </div>
        <el-row class="block-col-2">
          <el-col :span="12">
            <span>市场</span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                全部<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>FBT交易区</el-dropdown-item>
                <el-dropdown-item>FUC交易区</el-dropdown-item>
                <el-dropdown-item>BTC交易区</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="12">
            <span>币种</span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                全部<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>FBT</el-dropdown-item>
                <el-dropdown-item>FUC</el-dropdown-item>
                <el-dropdown-item>BTC</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="12">
            <span>类型</span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                全部<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>FBT提现</el-dropdown-item>
                <el-dropdown-item>FBT充值</el-dropdown-item>
                <el-dropdown-item>FUC提现</el-dropdown-item>
                <el-dropdown-item>FUC充值</el-dropdown-item>
                <el-dropdown-item>BTC提现</el-dropdown-item>
                <el-dropdown-item>BTC充值</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="12">
            <span>状态</span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                全部<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>买</el-dropdown-item>
                <el-dropdown-item>卖</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
          <div id="voteNew-list" v-for="(item,index) in billingList">
            <article>
              <span>{{item.time}}</span>
              <span>{{item.type}}</span>
              <span>{{item.number}}</span>
              <span>{{item.service}}</span>
              <span>{{item.state}}</span>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
   export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: '',
        value2: '',
        billingTab:[
          {
            time:'交易时间',
            type:'类型',
            number:'数量',
            service:'手续费',
            state:'状态'
          }
        ],
        billingList:[
          {
            time:'2018.3.29 20:30:20',
            type:'FTB',
            number:'155631',
            service:'0.01',
            state:'已确认'
          }
        ]
      };
    }
  };
</script>
<style scoped>
.empty{
  width: 100%;
  height: 20px;
  background: #1e253d;
}
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
    font-size: 16px;
    border-bottom: 1px solid #0c101e;
}

.voteNew>ul>li {
    width: 20%;
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
    width: 20%;
    color: #c2c3c8;
    font-size: 12px;
    float: left;
}
.picker{
  float: left;
  margin-top: 15px;
}
.picker>span:first-child{
  margin: 0 10px 0 15px;
}
.picker>.to{
 margin: 0 5px;
}

</style>
