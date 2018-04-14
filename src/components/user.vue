<template>
  <div class="user-box">
    <Header class="header"></Header>
    <div class="centerContent">
      <el-tabs v-model="activeName">
        <el-tab-pane label="安全中心" name="first">
          <account></account>
          <history></history>
        </el-tab-pane>
        <el-tab-pane label="用户中心" name="second">
          <award></award>
          <!-- <rechange></rechange> 充值码充值暂无用 -->
          <site></site>
          <candies></candies>
          <Api></Api>
        </el-tab-pane>
        <el-tab-pane label="推广中心" name="third">
          <generalize></generalize>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  // 头部：
  import Header from "./header"
  //奖励记录
  import Account from "./subcom/safety_account"
  //登录、设置历史
  import History from "./subcom/safety_history"
  //用户中心
  import Award from "./subcom/center_award"
  //充值码记录
  // import Rechange from "./subcom/center_recharge"
  //收货地址
  import Site from "./subcom/center_site"
  //糖果奖励
  import Candies from "./subcom/center_candies"
  //API 申请
  import Api from "./subcom/centerApi.vue"
  //推广
  import Generalize from "./subcom/center_generalize"

  export default {
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {
      handleClick(tab, event) {
      }
    },
    computed: {
      // userInfo() {
      // return this.$store.state.userInfo
      // }
    },
    components: {
      Header,//头部
      Account,//safety-奖励记录
      History,//safety-历史
      Award,//center-奖励记录
      // Rechange,//cneter-充值码
      Site,//center-地址
      Candies,//糖果奖励
      Api,//API申请
      Generalize,//推广
    }
  }
</script>
<style scoped>
  .centerContent {
    width: 1300px;
    margin: 0 auto;
  }

  .header {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    left: 0;
    right: 0;
  }

  .user-box {
    /*padding:0 100px 0 100px;*/
    margin-top: 100px;
    background: #1c253a;
  }
</style>
