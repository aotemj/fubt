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
          <img src="../../assets/quit.png" height="20" width="20" alt="" v-if="quitetoggle">
          <img src="../../assets/quitSelected.png" height="20" width="20" alt="" v-else>
          <a href="#" v-on:click.prevent="quit" class="quitstyle">退出</a>
        </div>
        <!-- 1.03设置按钮 -->
        <div class="setbutton" @mouseover="setonMouseOver" @mouseleave="setupMouseOut">
          <img src="../../assets/set.png" height="20" width="20" alt="" v-if="settoggle">
          <img src="../../assets/setSelected.png" height="20" width="20" alt="" v-else>
          <router-link to="/user" class="setstyle">设置</router-link>
        </div>
      </div>
      <!-- 2.0个人中心币种列表 -->
      <div class="currency">
        <!-- 2.01账户资产 -->
        <div class="title">账户资产</div>
        <!-- 2.02隐藏或显示全部 -->
        <div class="part">
          <div class="partright" @click="hidezero">
            <img src="../../assets/radio.png" height="14" width="14" alt=""  v-if="radiotogglehide">
            <img src="../../assets/radioSelected.png" height="14" width="14" alt="" v-else>
            <span>隐藏资产为0的币种</span>
          </div>
          <div class="partleft" @click="showall">
            <img src="../../assets/radio.png" height="14" width="14" alt="" v-if="radiotoggleall">
            <img src="../../assets/radioSelected.png" height="14" width="14" alt="" v-else>
            <span>显示全部</span>
          </div>
        </div>
        <!-- 2.03列表 -->
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
        <!-- 2.04按钮 -->
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
        quitetoggle:true,//退出按钮状态
        settoggle:true,//设置按钮状态
        radiotoggleall:false,//显示全部单选
        radiotogglehide:true,//隐藏币种为0单选
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
      console.log(this.currencyList)

    },
    methods: {
      setonMouseOver(){//设置按钮鼠标移入
        this.settoggle=false
      },
      setupMouseOut(){//设置按钮鼠标移出
        this.settoggle=true
      },
      quiteonMouseOver(){//退出按钮鼠标移入
        this.quitetoggle=false
      },
      quiteupMouseOut(){//退出按钮鼠标移出
        this.quitetoggle=true
      },
      quit() {//点击退出退出系统
        this.$store.commit('userLogOut');
      },
      hidezero(){//隐藏币种为0方法
        console.log("您点击了隐藏币种为0的单选框")
        this.radiotogglehide=false;
        this.radiotoggleall=true;
      },
      showall(){//显示全部方法
        console.log("您点击了显示全部的单选框")
        this.radiotogglehide=true;
        this.radiotoggleall=false;
      },
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
    /*background-color: #1D2E5C;*/
    background-color: #1e223c;
    opacity:0.8;
  }
  /*个人中心头部*/
  .user_info {
    height: 80px;
    border-bottom: 1px solid #7583A8;
    overflow: hidden;
    padding: 0 25px;
  }
  .personinfo{
    float: left;
    overflow: hidden;
    width: 50%;
    font-size:12px;
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
    line-height:20px;
  }
  .pinfo>div:first-child{
    padding-top: 5px;
  }
  .setbutton{
    float: right;
    margin-right: 40px; 
    display: inline-block;
    position: relative;
  }
  .setbutton:hover .setstyle,.quite:hover .quitstyle{
    color: #338FF5;
    font-size:12px;
  }
  .setbutton>img,.quite>img{
    display: inline-block;
    vertical-align:middle;
  }
  .setstyle,.quitstyle{
    color: #FFF;
    font-size: 12px;
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

  /*账户资产*/
  .title{
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    font-size: 18px;
    text-align: left;
    padding: 0 25px;
  }
  
  /*隐藏显示部分*/
  .part{
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    font-size:12px;
    padding: 0 25px;
  }
  .partleft>img,.partright>img{
    vertical-align: middle;
  }
  .partleft{
    float: right;
    cursor: pointer;
  }
  .partright{
    float: right;
    margin-left: 15px;
    cursor: pointer;
  }

  /*列表部分*/
  .currency{
    max-height: 500px;
  }
  .currency_List {
    display: flex;
    font-size:12px;
    padding: 0 25px;
  }
  .currency_List li {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .currency_List>li:nth-of-type(1) {
    text-align:left;
    padding-left:3px;
  }
  .currency_List>li:nth-of-type(3) {
    text-align:right;
  }
  .currencylist {
    max-height: 250px;
    overflow-y: auto;
  }
  .currencylist ul li {
    height: 32px;
    line-height: 32px;
    display: flex;
    cursor: pointer;
    font-size:12px;
    font-family:"Microsoft Yahei";
  }
  .currencylist ul li span {
    display: inline-block;
    /*flex: 1;*/
    text-align: center;
  }
  .currencylist ul li span:first-child{
    text-align: center;
    width: 10%;
    padding-left: 23px;
  }
  .currencylist ul li span:nth-of-type(2){
    text-align: center;
    width: 80%;
  }
  .currencylist ul li span:last-child{
    text-align: center;
    width: 10%;
    padding-right: 7px;
  }
  
  /*滚动条部分*/
  .currencylist::-webkit-scrollbar {
    width: 10px;
  }
  .currencylist::-webkit-scrollbar-track-piece {
    background-color: #181C28;
  }
  .currencylist::-webkit-scrollbar-track {
  }
  .currencylist::-webkit-scrollbar-thumb {
    background-color: #222439;
    border-radius: 20px;
  }
  .currencylist::-webkit-scrollbar-button {
    background-color: #fff;
    display: none;
  }

  /*按钮部分*/
  .button_click button {
    width: 30%;
    line-height: 30px;
    cursor: pointer;
    margin: 0 auto;
    display: inline-block;
    border: 1px solid #F8FFF3;
  }
  .button_click button:first-child {
    margin-right: 30px;
    background: transparent;
  }
  .button_click button:first-child:hover {
    border: 1px solid #2972C4;
    color: #2972C4;
  }
  .button_click button:first-child:hover .fff{
    color: #2972C4;
  }
  .button_click button:last-child {
    background: transparent;
  }
  .button_click button:last-child:hover {
    border: 1px solid #2972C4;
  }
  .button_click button:last-child:hover .fff{
    color: #2972C4;
  }
</style>
