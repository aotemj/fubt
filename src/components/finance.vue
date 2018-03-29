<template>
<!-- 财务中心 -->
  <div>
    <!-- 1.0头部引入 -->
    <Header class="header"></Header>
    <!-- 2.0财务中心内容 -->
    <div class="financeContent">
      <div>
        <el-tabs v-model="activeName" :tab-position="tabPosition">

          <el-tab-pane label="财务中心" disabled></el-tab-pane>

          <el-tab-pane label="充值&提现" name="first" >
            <cashValue></cashValue>
          </el-tab-pane>

          <el-tab-pane label="充值记录" name="second">
            <rechargeRecord></rechargeRecord>
          </el-tab-pane>

          <el-tab-pane label="提现记录" name="third">
            <withdrawalRecord></withdrawalRecord>
          </el-tab-pane>

          <el-tab-pane label="个人资产" name="fourth">
            <personalAssets></personalAssets>
          </el-tab-pane>

          <el-tab-pane label="账单明细" name="fifth">
            <billingDetails></billingDetails>
          </el-tab-pane>

          <el-tab-pane label="资金账号" name="sixth">
            <fundAccount></fundAccount>
          </el-tab-pane>

          <el-tab-pane label="PUSH资产" name="seventh">
            <pushAsset></pushAsset>
          </el-tab-pane>

          <el-tab-pane label="存币收益" name="eighth">
            <moneyIncome></moneyIncome>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "./header"//头
  import cashValue from "./subcom/cash_value"//充值与提现
  import rechargeRecord from "./subcom/recharge_record"//充值记录
  import withdrawalRecord from "./subcom/withdrawal_record"//提现记录
  import personalAssets from "./subcom/personal_assets"//个人资产
  import billingDetails from "./subcom/billing_details"//账单明细
  import fundAccount from "./subcom/fund_account"//资金账号
  import pushAsset from "./subcom/push_asset"//push资产
  import moneyIncome from "./subcom/money_income"//币存收益


  export default {
    data(){
      return {
        tabPosition: 'left',
        activeName: 'first',
      }
    },
    methods:{},
    created(){},
    computed:{},
    components:{
      Header,cashValue,rechargeRecord,withdrawalRecord,personalAssets,billingDetails,fundAccount,pushAsset,moneyIncome
    }
  }
</script>

<style scoped>
  .financeContent{
    width: 90%;
    margin: 0 auto;
    margin-top: 85px;
    background-color: #11182B;
    margin-top: 100px;
  }
</style>