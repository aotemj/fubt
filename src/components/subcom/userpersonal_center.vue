<template>
  <div>
    <div class="user_div">
      <!-- 1.0个人中心头部 -->
      <div class="user_info">
        <!-- 1.01左侧头像部分 -->
        <div class="personinfo">
          <div class="pictou"><img src="../../assets/person.png" height="44" width="44" alt=""></div>
          <div class="pinfo">
            <div>{{userInfo.floginname}}</div>
            <div>UID:{{userInfo.fid}}</div>
          </div>
        </div>
        
        <!-- 1.02退出按钮 -->
        <div class="quite" @mouseover="quiteonMouseOver" @mouseleave="quiteupMouseOut">
          <img src="../../assets/quit.png" height="20" width="20" alt="" v-show="quitetoggle1">
          <img src="../../assets/quitSelected.png" height="20" width="20" alt="" v-show="quitetoggle2">
          <a href="#" v-on:click.prevent="quit" class="quitstyle">退出</a>
        </div>
        <!-- 1.03设置按钮 -->
        <div class="setbutton" @mouseover="setonMouseOver" @mouseleave="setupMouseOut">
          <img src="../../assets/set.png" height="20" width="20" alt="" v-show="settoggle1">
          <img src="../../assets/setSelected.png" height="20" width="20" alt="" v-show="settoggle2">
          <router-link to="/user" class="setstyle">设置</router-link>
        </div>
        <!-- <p class="username">{{ userInfo.floginname }}
          <span class="set">
            <router-link to="/user" class="blue">设置</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#" class="blue" v-on:click.prevent="quit">退出</a>
          </span>
        </p>
        <div class="userid">
          <span>UID：{{userInfo.fid}}</span>
        </div> -->
      </div>
      <!-- 个人中心币种列表 -->
      <div class="currency">
        <!-- 账户资产 -->
        <div class="title">账户资产</div>
        <div class="part">
            <input type="radio" id="male" name="radioGroup"/>
            <label for="male">隐藏资产为0的币种</label>
        </div>
        <!-- 列表 -->
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
          <button><router-link class="fff" to="/finance">充值</router-link></button>
          <button><router-link class="fff" to="/finance">提币</router-link></button>
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
        settoggle1:true,
        settoggle2:false,
        quitetoggle1:true,
        quitetoggle2:false,
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
      // console.log(this.$store.state.userInfo.fid);
    },
    methods: {
      setonMouseOver(){
        this.settoggle1=false
        this.settoggle2=true
      },
      setupMouseOut(){
        this.settoggle1=true
        this.settoggle2=false
      },
      quiteonMouseOver(){
        this.quitetoggle1=false
        this.quitetoggle2=true
      },
      quiteupMouseOut(){
        this.quitetoggle1=true
        this.quitetoggle2=false
      },
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
  .user_div{
    padding: 10px 10px 0 10px;
  }
  .user_info {
    height: 80px;
    border-bottom: 1px solid #7583A8;
    overflow: hidden;
  }
  .personinfo{
    float: left;
    overflow: hidden;
    width: 50%;
  }
  .pictou,.pinfo{
    box-sizing:border-box;
  }
  .pictou{
    float: left;
    padding-top:8%; 
  }
  .pinfo{
    width: 65%;
    float: left;
    color: #fff;
    padding-top:8%; 
  }
  .pinfo>div{
    text-align: left;
    margin-left: 7%;
    line-height:25px;
  }
  .setbutton{
    float: right;
    margin-right: 40px; 
    display: inline-block;
    position: relative;
  }
  .setbutton:hover .setstyle,.quite:hover .quitstyle{
    color: #338FF5;
  }
  .setbutton>img,.quite>img{
    display: inline-block;
    vertical-align:middle;
  }
  .setstyle,.quitstyle{
    color: #FFF;
    font-size: 14px;
  }
  .quite{
    float: right;
    position: relative;
  }
  .setbutton>img,.quite>img{
    position: absolute;
    right: 32px;
    top: 32px;
  }

  /*.username {
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
  }*/
/*  .userid, .username, .currency_List li {
    height: 30px;
    line-height: 30px;
    color: #c2c3c8;
    font-size: 14px;
  }*/


  .title{
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    font-size: 18px;
    text-align: left;
    /*font-weight: 700;*/
  }
  .part{
    text-align: right;
    padding-right: 10px;
    height: 30px;
    line-height: 30px;
  }
  .part input {
    display: inline-block;
  }
  .part label {
    font-size: 14px;
    cursor: pointer;
  }
    input[type="radio"] + label::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    width: 1em;
    height: 1em;
    margin-right: .4em;
    border-radius: 50%;
    border: 1px solid #338ff5;
    text-indent: .15em;
    line-height: 1;
  }

  input[type="radio"]:checked + label::before {
    width: .6em;
    height: .6em;
    vertical-align: middle;
    background-color: #338ff5;
    background-clip: content-box;
    padding: .2em;
  }

  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }








  .currency{
    max-height: 500px;
  }
  .currency_List {
    display: flex;
  }

  .currency_List li {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .currencylist {
    max-height: 260px;
    overflow-y: auto;
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
    /*width: 100%;*/
    /*line-height: 20px;*/
  }

  .button_click button {
    width: 25%;
    /*height: 30px;*/
    /*line-height: 25px;*/
    /*text-align: center;*/
    line-height: 30px;
    cursor: pointer;
    /*border-radius: 5px;*/
    margin: 0 auto;
    display: inline-block;
    border: 1px solid #F8FFF3;
  }

  .button_click button:first-child {
    /*background: #d9534f;*/
    /*background: #1C2F5A;*/
    /*margin: 30px auto 20px;*/
    margin-right: 30px;
    /*background: #050505;*/
    background: transparent;
  }

  .button_click button:last-child {
    /*background: #5cb85c;*/
    /*background: #1C2F5A;*/
    /*background: #050505;*/
    background: transparent;
  }
</style>
