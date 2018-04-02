<template>
  <div class="fund_box">
    <ul class="tabs clearfix">
       <el-dropdown trigger="click" class="tab_border from_width">
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" @click="changeTabId(-1)">
                <el-dropdown-item   :class="{'tabId':tabId===0}">FUC</el-dropdown-item>
                <el-dropdown-item   :class="{'tabId':tabId===0}">FUC1</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- <li>FUC</li> -->
        <li @click="changeTabId(1)" :class="{'tabId':tabId===1}">银行卡</li>
        <li @click="changeTabId(2)" :class="{'tabId':tabId===2}">支付宝</li>
    </ul>
    <div class="cards">
        <div v-show="tabId===0">
            <Currency></Currency>   
        </div>  
        <div v-show="tabId===1">
            <Bank></Bank>
        </div>  
        <div v-show="tabId===2">
            <Alipay></Alipay>
        </div>  
    </div>  
  </div>
     
</template>
<script>
  import Currency from './capitalCurrency.vue' //币种地址
  import Bank from './capitalBank.vue' //银行卡地址
  import Alipay from './capitalAlipay.vue' //支付宝地址
   
  export default {
    data(){
        return {
            tabId:0,
            form: {
                FUC: ''
            }
        }
    },
    methods:{
        changeTabId(num){
            this.tabId = num;
            console.log(this.tabId);
        }
    },
    created(){
        console.log(this.tabId);
    },
    computed:{},
    components:{
      Currency,//添加地址
      Bank,//银行卡
      Alipay,//支付宝
    }
  }
</script>
<style scoped>
.from_width{
    width: 6%;
    float: left;
}
.tab_border{
    border: 0;
    outline: medium;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
}
.tabId{
    color: #409EFF;
}
.fund_box>ul{
  background: #0e1425;
}
.border_dropdown{
  border: 0;
  color: #409EFF;
  cursor: pointer;
}
.box {  
    width: 800px;  
    height: 200px;  
    margin: 0 auto;  
    border: 1px solid #000;  
    }  

.tabs li {  
    float: left;  
    margin:0 30px;  
    list-style: none;  
}  

.tabs .tab-link {  
    display: block; 
    text-align: center;    
    color: #c2c3c8;  
    text-decoration: none;  
}  

.tabs .tab-link.active {  
    height: 47px;  
    color: #2d76d1;
    transition: .3s;  
}  

.cards {  
    float: left;  
    padding-left: 2%;
    padding-top: 2%;
    box-sizing: border-box;
}  

.clearfix:after {  
    content: "";  
    display: block;  
    height: 0;  
    clear: both;  
}  

.clearfix {  
    zoom: 1;  
    height: 50px;
    line-height: 50px;
    padding-left: 2%;
    box-sizing: border-box;
}  
.add_card{
    width: 250px;
    height: 130px;
    border: 1px solid #c2c3c8;
    border-radius:5px;
}
.add_card>p{
    width: 30px;
    height: 30px;
    border: 1px solid #c2c3c8;
    border-radius: 50%;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin: 15% auto 5px;
}
</style>