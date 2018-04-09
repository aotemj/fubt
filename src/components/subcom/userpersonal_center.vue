<template>
  <div>
    <div class="user_div">
      <div class="user_info">
        <p class="username">{{ userInfo.floginname }}<span class="set"><router-link to="/user"
                                                                                    class="blue">设置</router-link>&nbsp;&nbsp;&nbsp;&nbsp;<a
          href="#" class="blue" v-on:click.prevent="quit">退出</a></span></p>
        <div class="userid">
          <span>UID：{{userInfo.fid}}</span>
        </div>
      </div>
      <div class="currency">
        <ul class="currency_List">
          <li>币种</li>
          <li>可用</li>
          <li>冻结</li>
        </ul>
        <div class="currencylist">
          <ul>
             <li v-for="(item,index) in currencyList"><span>{{ item.shortName }}</span><span>{{ item.total }}</span><span>{{ item.frozen }}</span></li>
          </ul>
        </div>
        <div class="button_click">
          <button><router-link class="fff" to="/finance">提现提币</router-link></button>
          <button><router-link class="fff" to="/finance">充值充币</router-link></button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"

  export default {
    data() {
      return {
      }
    },
    created() {
      // var url = common.apidomain + 'login';
      // var formData = new FormData();
      // formData.append('loginName','15994026836');
      // formData.append('password','fbt15994026836');
      // ajax(url, 'post', formData, (res) => {
      //     console.log(res.data);
      //     this.userCenter = res.data.data.user;
      // });

      // console.log(this.userInfo);
    },
    methods: {
      quit() {
        this.$store.commit('userLogOut');
      }
    },
    computed: {
      //个人信息
      userInfo() {
        return this.$store.state.userInfo;
      },

      //  资产列表
      currencyList(){
        return this.$store.state.personalAsset
      }
    },
  }
</script>
<style scoped>
  .currency{
    max-height: 400px;
  }
  .userid, .username, .currency_List li {
    height: 30px;
    line-height: 30px;
    color: #c2c3c8;
    font-size: 14px;
  }

  .user_info {
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  }

  .username {
    width: 100%;
    padding-left: 13%;
  }

  .userid span:first-child {
    display: inline-block;
    width: 46%;
    margin-left: 13%;
  }

  .set {
    display: inline-block;
    float: right;
    width: 25%;
    height: 20px;
    margin-right: 13%;
    color: #6bb1e1;
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
  }

  /* .userid span:last-child{
      display: inline-block;
      width: 13%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      float: right;
      cursor: pointer;
      border: 1px solid #c2c3c8;
      margin-right: 9%;
      font-size: 12px;
      margin-top: 5px;
  } */
  /* .userid span:last-child:hover{
      border: 1px solid #ff6000;
      color: #ff6000;
  } */
  .currency_List {
    display: flex;
  }

  .currency_List li {
    flex: 1;
    text-align: center;
  }

  .currencylist {
    height: 260px;
    overflow-y: scroll;
  }

  .currencylist ul li {
    height: 25px;
    line-height: 25px;
    display: flex;
    cursor: pointer;
  }

  .currencylist ul li span {
    display: inline-block;
    flex: 1;
    text-align: center;
  }

  .currencylist::-webkit-scrollbar {
    width: 2px;
  }

  .currencylist::-webkit-scrollbar-track-piece {
    background-color: #c2c3c8;
  }

  .currencylist::-webkit-scrollbar-track {
    background-color: #c2c3c8;
  }

  .currencylist::-webkit-scrollbar-thumb {
    background-color: #000;
  }

  .currencylist::-webkit-scrollbar-button {
    background-color: #fff;
    display: none;
  }

  .button_click {
    width: 100%;
  }

  .button_click button {
    width: 70%;
    height: 30px;
    line-height: 25px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 auto;
  }

  .button_click button:first-child {
    background: #d9534f;
    margin: 30px auto 20px;
  }

  .button_click button:last-child {
    background: #5cb85c;
  }
</style>
