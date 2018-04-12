<template>
  <div class="range">
  <!-- 买入FBT/卖出FBT -->
    <div class="trading-sub-content">
      <div id="trading-sub">
        <el-tabs v-model="activeName">

          <el-tab-pane label="FBT交易" name="first">
            <!-- 右侧提现充值按钮部分 -->
            <div class="C2c-header">
              <div class="C2C-header-right">
                <ul v-for="(item,index) in datalink">
                  <li><router-link to="/finance"><button>{{item.bring}}</button></router-link></li>
                  <li><router-link to="/finance"><button>{{item.full}}</button></router-link></li>
                  <li><span><router-link to="/c2c_instructions" style="color:#fff;">{{item.state}}</router-link></span></li>
                </ul>
              </div>
            </div>
            <!-- 买卖交易部分 -->
            <div id="trading-table">
              <div class="trading-C2C" style="display:block;">
                <div class="C2C-box">

                  <!-- 1.0 买入FBT部分 -->
                  <div class="trading-left trading1" v-for="(item,index) in databuy">
                      <p class="C2C-buy">{{item.title}}</p>
                      <div class="C2C-tab">
                        <p class="tab_input">{{item.site}}&nbsp;{{item.fbt}}</p>
                        <p class="tab_input" ref="buyNum"> {{buyprice}}</p>
                      </div>
                      <div class="trading-left">
                          <div class="C2C-tab C2C-input" v-bind:class="{ red: isActive1 }">
                            <p>{{item.scale}}&nbsp;{{item.fbt}}</p>
                            <input id="inp1" type="text" placeholder="0" v-model="buyPurchases" @focus="inputfocus1()" @blur="inputblur1()" @keyup="buyamount" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"><!-- 买入量 -->
                          </div>
                          <div class="C2C-tab C2C-input" v-bind:class="{ red: isActive2 }" style="position:relative">
                            <p>{{item.sum}}&nbsp;{{item.cny}}</p>
                            <input id="inp2" type="text" placeholder="0" v-model="moneySum" @focus="inputfocus2()" @blur="inputblur2()" @keyup="buyMoney" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"><!-- 金额 -->
                            <div class="warninfo">{{warn}}</div>
                          </div>

                          
                          <div class="C2C-tab">
                            <button v-on:click="buybutton()">{{item.buying}}</button>
                          </div>
                      </div>
                  </div>

                  <!-- 2.0 卖出FBT部分 -->
                  <div class="trading-right" v-for="(item,index) in datasale">
                    <p class="C2C-buy">{{item.title}}
                      <span class="available">可用：<span class="availSum">{{available}}</span>FBT</span>
                    </p>
                    <div class="C2C-tab">
                      <p class="tab_input">{{item.site}}&nbsp;{{item.fbt}}</p>
                      <!-- <p class="tab_input">{{item.buynum}}</p> -->
                      <p class="tab_input">{{sellpice}}</p>
                    </div>
                    <div class="trading-right1">
                      <div class="C2C-tab C2C-input" v-bind:class="{ green: isActive3 }">
                        <p>{{item.scale}}&nbsp;{{item.fbt}}</p>
                        <input id="inp3" type="text" placeholder="0" v-model="sellPurchases" @focus="inputfocus3()" @blur="inputblur3()" @keyup="sellamount" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"><!-- 卖出量 -->
                      </div>
                      <div class="C2C-tab C2C-input" v-bind:class="{ green: isActive4 }" style="position:relative">
                        <p>{{item.sum}}&nbsp;{{item.cny}}</p>
                        <input id="inp4" type="text" placeholder="0" v-model="sellmoneySum" @focus="inputfocus4()" @blur="inputblur4()" @keyup="sellMoney" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"><!-- 金额 -->
                        <div class="sellWarn">{{sellwarn}}</div>
                      </div>
                      <div class="C2C-tab">
                        <button v-on:click="sellbutton()">{{item.selling}}</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="trading-C2C">
                  <div class="trading-left">
                      <!-- <img src="./images/650.png" alt=""> -->
                  </div>
                  <!-- <div class="trading-right">22</div> -->
              <div class="trading-C2C">
              </div>
                  <div class="trading-left">
                      <!-- <img src="./images/650.png" alt=""> -->
                  </div>
                  <!-- <div class="trading-right">33</div> -->
              </div>
            </div>
          </el-tab-pane>

          <!--交易密码框-->
          <i class="dialog">
            <el-dialog title="交易密码" center :visible.sync="dialogFormVisible1" class="dialog-contentinfo" width="35%">
              <el-form class="cent">
                <el-form-item label="交易密码">
                  <el-input type="password" class="input-info" v-model="tradePwd" placeholder="请输入交易密码"></el-input>
                  <!-- <el-input class="input-info" v-model="tradePwd" placeholder="请输入交易密码"></el-input> -->
                  <!-- <div class="false-tips fz12 mt-5"><i v-show="tradePwdErrorMsg"></i>{{tradePwdErrorMsg}}</div> -->
                </el-form-item>
                <el-form-item label="">
                  <el-button size="mini" class="buttomvote" v-on:click="submitTradePwd(tradeType)">确定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </i>

          <!--设置交易密码框：如果没有设置交易密码，则弹出此框引导设置交易密码-->
          <i class="dialog settrapwd">
            <el-dialog title="友情提示" center :visible.sync="dialogFormVisible2" class="dialog-contentinfo" width="30%">
              <el-form class="cent">
                <el-form-item>
                  <!-- <el-input class="input-info" v-model="tradePwd" placeholder="请输入交易密码"></el-input>
                  <div class="false-tips fz12 mt-5"><i v-show="tradePwdErrorMsg"></i>{{tradePwdErrorMsg}}</div> -->
                  <div>请先设置交易密码，<router-link to="/user" style="color:#C73232;">立即设置</router-link></div>
                </el-form-item>
                <el-form-item label="" style="textAlign:center;paddingTop:10px;">
                  <!-- <el-button class="buttomvote" v-on:click="submitTradePwd">确定</el-button> -->
                  <el-button class="buttomvote" @click="dialogFormVisible2 = false">确定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </i>

          <!--银行卡或者支付宝提示框：如果没有绑定银行卡或者支付宝提示去绑定-->
          <i class="dialog bankcard">
            <el-dialog title="友情提示" center :visible.sync="dialogFormVisible3" class="dialog-contentinfo" width="30%">
              <el-form class="cent">
                <el-form-item>
                  <!-- <el-input class="input-info" v-model="tradePwd" placeholder="请输入交易密码"></el-input>
                  <div class="false-tips fz12 mt-5"><i v-show="tradePwdErrorMsg"></i>{{tradePwdErrorMsg}}</div> -->
                  <div>请先绑定银行卡或支付宝，<router-link to="/finance" style="color:#C73232;">立即设置</router-link></div>
                </el-form-item>
                <el-form-item label="" style="textAlign:center;paddingTop:10px;">
                  <!-- <el-button class="buttomvote" v-on:click="submitTradePwd">确定</el-button> -->
                  <el-button class="buttomvote" @click="dialogFormVisible3 = false">确定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </i>

          <el-tab-pane label="BTC交易" name="second">BTC交易</el-tab-pane>

          <el-tab-pane label="FUC交易" name="third">
            <div class="C2c-header">
              <div class="C2C-header-right">
                <ul>
                  <li><a href="#"><button>提现</button></a></li>
                  <li><a href="#"><button>充值</button></a></li>
                  <li><a href="../C2C/information.html"><span>操作说明</span></a></li>
                </ul>
              </div>
            </div>
            <div id="trading-table">
              <div class="trading-C2C" style="display:block;">
                <div class="C2C-box">
                  <div class="trading-left trading1">
                      <p class="C2C-buy">买入FBT</p>
                      <div class="C2C-tab">
                          <p class="tab_input">买入价&nbsp;CNY</p>
                          <p class="tab_input">7.28</p>
                      </div>
                      <div class="trading-left">
                          <div class="C2C-tab C2C-input">
                              <p>买入量&nbsp;FBT</p>
                              <input id="inp5" type="text" placeholder="0">
                          </div>
                          <div class="C2C-tab C2C-input">
                              <p>金额&nbsp;CNY</p>
                              <input id="inp6" type="text" placeholder="0">
                          </div>
                          <div class="C2C-tab">
                              <button>买入</button>
                          </div>
                      </div>
                  </div>
                  <div class="trading-right">
                    <p class="C2C-buy">卖出FBT</p>
                    <div class="C2C-tab">
                        <p class="tab_input">卖出价&nbsp;CNY</p>
                        <p class="tab_input">7.28</p>
                    </div>
                    <div class="trading-right1">
                      <div class="C2C-tab C2C-input">
                        <p>卖出量&nbsp;FBT</p>
                        <input id="inp7" type="text" placeholder="0">
                      </div>
                      <div class="C2C-tab C2C-input">
                        <p>金额&nbsp;CNY</p>
                        <input id="inp8" type="text" placeholder="0">
                      </div>
                      <div class="C2C-tab">
                        <button>卖出</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <!-- <div class="trading-C2C">
                  <div class="trading-left">
                      <img src="./images/650.png" alt="">
                  </div>
                  <div class="trading-right">22</div>
              </div>
              <div class="trading-C2C">
                  <div class="trading-left">
                      <img src="./images/650.png" alt="">
                  </div>
                  <div class="trading-right">33</div>
              </div> -->
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import common from "../../kits/domain.js"
  import {ajax} from "../../kits/http.js"
  export default {
    data(){
      	return {
          tradeType: 0,//交易类型,0 :买入，1：卖出

          // 银行卡是否绑定
          bankinfo:'',

          // 警示信息
          warn:'',//买入的提示信息
          sellwarn:'',//卖出的提示信息

          //交易密码弹窗
          dialogFormVisible1: false,//弹窗状态
          tradePwd: '',//交易密码

          // 设置交易密码
          dialogFormVisible2: false,//弹窗状态

          //银行卡弹窗
          dialogFormVisible3:false,//弹窗状态

          //文本框是否获得焦点
          isActive1:false,
          isActive2:false,
          isActive3:false,
          isActive4:false,

          buyprice:"",//买入价
          sellpice:"",//卖出价
          available:"",//可用

          buyPurchases:"",//买入量
          moneySum:"",//买入金额

          sellPurchases:"",//卖出量
          sellmoneySum:"",//卖出金额
          
  				activeName: 'first',
  				value:'',
  				datalink:[
            {
              bring:'提现',
              full:'充值',
              state:'操作说明',
            }
          ],
          databuy:[
            {
              title:'买入FBT',
              site:'买入价',
              cny:'CNY',
              buynum:'1',
              scale:'买入量',
              fbt:'FBT',
              sum:'金额',
              buying:'买入'
            }
          ],
          datasale:[
            {
              title:'卖出FBT',
              site:'卖出价',
              cny:'CNY',
              buynum:'0.99',
              scale:'卖出量',
              fbt:'FBT',
              sum:'金额',
              selling:'卖出'
            }
          ],
			}
    },
    created(){
      // 1.0 刚打开c2c页面请求数据
      this.render();
    },
    methods:{
      // 1.0 刚打开c2c页面请求数据
      render(){
        var url = common.apidomain + 'c2c/index';
        var formData = new FormData();
        formData.append('c2ctradeId',52);
        formData.append('c2ctype',2);
        ajax(url, 'post', formData, (res) => {
          // console.log(res.data)
          // console.log(res.data.data);
          this.buyprice=res.data.data.c2CCoinList[0].buymoney;//1
          this.sellpice=res.data.data.c2CCoinList[0].sellmoney;//0.99
          this.available=res.data.data.userWalletTotal;//可用
          this.bankinfo=res.data.data.c2cfUserBankinfo;// 银行卡是否绑定
          // console.log(this.bankinfo);
        });
      },

      // 5.0点击 买入 按钮触发事件
      buybutton(){
        // console.log(this.$store.state.userInfo.ftradepassword)//交易密码    
        if(this.$store.state.isLogin==false){// 登陆验证
          this.$router.push('/login');//跳转到首页登陆
        }else if(this.buyPurchases<100){//买入量验证
          this.warn="最小交易数量为100个！";
          return;
        }else if(this.buyPurchases>1000000){
          this.warn="最大交易数量为100万个！";
          return;
        }else if(this.$store.state.userInfo.ftradepassword==''){//若没有设置交易密码--弹窗--立即设置--用户中心设置交易密码
          this.dialogFormVisible2=true;
        }else if(this.$store.state.userInfo.fhasrealvalidate==false){//验证是否实名认证false:未实名，true实名；
          this.warn="请先完成实名认证！";
        }else{//弹出输入交易密码框
          this.tradeType=0;
          this.dialogFormVisible1=true;
        }
      },

      // 6.0 点击输入交易密码框中的确定按钮
      submitTradePwd(id){
        var urlbuy = common.apidomain + 'trade/cny_c2c_buy';
        var urlsell = common.apidomain + 'trade/cny_c2c_sell';
        var formData1 = new FormData();
        formData1.append('symbol',2);
        formData1.append('tradePwd',this.tradePwd);
        if(id==0){//买入按钮
          if(this.tradePwd==''){
            this.warn="请输入交易密码！";
            return;
          }
          // 当输入了交易密码的时候发送数据请求
          formData1.append('tradeAmount',this.buyPurchases);
          formData1.append('tradePrice',this.buyprice);
          ajax(urlbuy, 'post', formData1, (res) => {
            if(res.data.code!==200){
              this.warn=res.data.msg;
              this.dialogFormVisible1=false;
              return;
            }
            if(res.data.code==200){
              this.warn="数据请求成功！";
              this.warn=res.data.msg;
            }
          });
        }
        if(id==1){//卖出按钮
          if(this.tradePwd==''){
            this.sellwarn="请输入交易密码！";
            return;
          }
          // 当输入了交易密码的时候发送数据请求
          formData1.append('tradeAmount',this.sellPurchases);
          formData1.append('tradePrice',this.sellpice);
          ajax(urlsell, 'post', formData1, (res) => {
            if(res.data.code!==200){
              this.sellwarn=res.data.msg;
              this.dialogFormVisible1=false;
              return;
            }
            if(res.data.code==200){
              this.sellwarn=res.data.msg;
            }
          });
        } 
      },

      // 7.0 点击 卖出 按钮触发事件
      sellbutton(){
        // console.log("我是卖出按钮");
        if(this.$store.state.isLogin==false){// 登陆验证
          this.$router.push('/login');//跳转到首页登陆
        }else if(this.bankinfo==false){//银行卡支付宝是否绑定验证
          this.dialogFormVisible3=true;
        }else if(this.sellPurchases<100){//卖出数量最小值验证
          this.sellwarn="小交易数量为100个！";
          return;
        }else if(this.sellPurchases>1000000){//卖出数量最大值验证
          this.sellwarn="最大交易数量为100万个！";
          return;
        }else if(this.$store.state.userInfo.ftradepassword==''){//若没有设置交易密码--弹窗--立即设置--用户中心设置交易密码
          this.dialogFormVisible2=true;
        }else if(this.$store.state.userInfo.fhasrealvalidate==false){//验证是否实名认证false:未实名，true实名；
          this.sellwarn="请先完成实名认证！";
        }else{//弹出输入交易密码框
          this.tradeType=1;
          this.dialogFormVisible1=true;
        }
      },

      // 1.0输入买入量的时候键盘弹上来触发的方法
      buyamount(){
        this.moneySum = this.buyprice * this.buyPurchases;
      },
      // 2.0输入买入FBT金额的时候键盘弹上来触发的方法
      buyMoney(){
        this.buyPurchases = this.moneySum / this.buyprice;
      },
      // 3.0输入卖入量的时候键盘弹上来触发的方法
      sellamount(){
        this.sellmoneySum = this.sellpice * this.sellPurchases;
      },
      // 4.0输入卖入量FBT金额的时候键盘弹上来触发的方法
      sellMoney(){
        this.sellPurchases = this.sellmoneySum / this.sellpice;
      },
      // 控制文本框焦点的获得与失去
      inputfocus1(){
        this.isActive1=true;
      },
      inputblur1(){
        this.isActive1=false;
      },
      inputfocus2(){
        this.isActive2=true;
      },
      inputblur2(){
        this.isActive2=false;
      },
      inputfocus3(){
        this.isActive3=true;
      },
      inputblur3(){
        this.isActive3=false;
      },
      inputfocus4(){
        this.isActive4=true;
      },
      inputblur4(){
        this.isActive4=false;
      },
    },
    computed:{},
    components:{},
    mounted(){},
  }
</script>

<style scoped>
  .range{
    width:1300px;
  }
  #trading-sub {
      margin-top:7%;
  }

  #trading-table{
    position: relative;
  }
  .C2c-header {
      width: 100%;
      height: 60px;
  }

  .C2c-header>ul {
      padding-left: 10px;
  }

  .C2c-header>ul>li {
      float: left;
      line-height: 60px;
      margin-right: 15px;
  }

  .C2c-header>ul>li>a>span {
      font-size: 14px;
      color: #555;
  }

  .C2c-header>ul>li>a {
      color: #4197f7;
      text-decoration: none;
  }

  .C2c-header>ul>li>a>span>img {
      width: 20%;
      margin: -4px 5px 0 0;
  }

  .C2c-header>ul>li>a:hover {
      text-decoration: none;
  }
  .C2C-header-right>ul>li>a{
    color:#c2c3c8;
  }

  .C2C-header-right {
      float: right;
      width: 250px;
      height: 100%;
      /* line-height: 60px; */
  }

  .C2C-header-right>ul>li {
      float: left;
      margin-left: 20px;
      margin-top: 25px;
  }

  .C2C-header-right>ul>li>a>button {
      width: 52px;
      height: 26px;
      border: 1px solid #c2c3c8;
      border-radius: 4px;
      text-align: center;
      line-height: 21px;
      background: transparent;
      cursor: pointer;
      outline: medium;
      font-size: 15px;
  }

  .C2C-header-right>ul>li>a>button:hover {
      border: 1px solid #338ff5;
  }

  .C2C-header-right>ul>li>a>span>img {
      margin-right: 7px;
  }

  .C2C-header-right>ul>li:nth-child(3)>a>span:hover {
      color: #338ff5;
      cursor: pointer;
  }

  .C2C-header-right>ul>li:last-child>a>span:hover {
      color: #338ff5;
      cursor: pointer;
  }

  .trading-C2C {
      display: none;
      top: 120px;
      left: 0;
      padding: 3px 0 25px;
  }

  .trading-C2C>.C2C-box>.trading-left,
  .trading-right {
      width: 50%;
      float: left;
  }

  .trading-left>.C2C-tab>button {
      background: rgb(217, 83, 79);
  }

  .trading-left>.C2C-tab>button:hover {
      background: rgb(201, 48, 44);
  }

  .trading1 {
      padding-right: 20px;
  }


  .C2C-buy {
      width: 100%;
      height: 40px;
      border-bottom: 2px solid #0e1326;
      line-height: 40px;
      font-size: 18px;
      padding-left: 10px;
      color: #c2c3c8;
      box-sizing: border-box;
      text-align: left;
  }

  .C2C-tab {
      width: 100%;
      height: 50px;
      margin-top: 40px;
  }

  .C2C-tab>p:first-child {
      width: 20%;
      background: #11182c;
      float: left;
      text-align: center;
      /*line-height: 50px;*/
      line-height: 48px;
      margin-top: 0;
      color: #fff;
  }

  .C2C-tab>p:last-child {
      width: 80%;
      height: 100%;
      float: right;
      text-align: right;
      padding-right: 15px;
      line-height: 44px;
      color: rgb(217, 83, 79);
      background: #1d2843;
      font-size: 19px;
      box-sizing: border-box;
  }

  .trading-right>.C2C-tab>p:last-child {
      color: rgb(92, 182, 92) !important;
  }

  .C2C-tab>button {
      width: 100%;
      height: 46px;
      text-align: center;
      line-height: 46px;
      font-size: 18px;
      border: 0;
      outline: medium;
      cursor: pointer;
  }

  .trading-right1>.C2C-tab>button {
      background: rgb(92, 182, 92);
  }

  .trading-right1>.C2C-tab>button:hover {
      background: rgb(68, 152, 68);
  }

  .tab_input{
    margin: 0 !important;
  }

  .C2C-input {
      /*border: 1px solid #11182c !important;*/
      border: 1px solid #11182c;
  }


  .red{
    border: 1px solid #C9302C;
  }
  .green{
    border: 1px solid #449844;
  }
  
  .C2C-input>input {
    width: 80%;
    height: 100%;
    float: right;
    border: 0;
    outline: medium;
    text-align: right;
    padding-right: 15px;
  }

  #inp1,
  #inp2,
  #inp3,
  #inp4,
  #inp5,
  #inp6,
  #inp7,
  #inp8,{
    width: 80%;
    height: 100%;
    border: 0;
    outline: medium;
    text-align: right;
    padding-right: 15px;
    background: #1d2843;
    font-size: 17px;
  }

  /*可用：*/
  .available{
    color:#B5534F;
    padding-left:10px;
    font-size:16px;
  }
  .available .availSum{
    padding: 0 3px;
  }
  /*警告信息*/
  .warninfo{
    /*text-align: left;
    padding-left: 20px;*/
    color: #FB6A08;
    position: absolute;
    bottom: -30px;
    left: 20px;
  }
  .sellWarn{
    color: #FB6A08;
    position: absolute;
    bottom: -30px;
    left: 20px;
  }
  /*弹框*/
  .dialog {
    font-style: normal;
  }
</style>

