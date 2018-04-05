<template>
  <div>
    <!-- 充值提现表头 -->
    <div class="title">
      <div class="left-con">充值&提现</div>
      <div class="right-con">
        <section>
          <div class="all" @click="show">
            <input type="radio" id="female" name="radioGroup" checked="checked"/>
            <label for="female">显示全部</label>
          </div>
          <div class="part" @click="hide">
            <input type="radio" id="male" name="radioGroup"/>
            <label for="male">隐藏资产为0的币种</label>
          </div>
          <div class="search">
            <input type="text" placeholder="搜索">
            <img src="../../assets/search_01.png" height="14" width="14" alt="">
          </div>
        </section>
      </div>
    </div>
    <div class="margin-bottom"></div>
    <div class="body">
      <div class="table">
        <div class="th">
          <div class="td">币种</div>
          <div class="td">可用</div>
          <div class="td">冻结</div>
          <div class="td">操作</div>
        </div>
        <div class="tbody">
          <div class="tr" v-for="(item,index) in filteredData">
            <!-- <div class="tr" v-for="(item,index) in filteredData2"> -->
            <div class="item">
              <div class="td">{{item.coinName}}</div>
              <div class="td">{{item.total}}</div>
              <div class="td">{{item.frozen}}</div>
              <div class="td todos">
                <button v-on:click="showRechargeBox(index,item.coinId)">充值</button>
                <button v-on:click="showWithdrawDepositBox(index)">提现</button>
              </div>
            </div>
            <div class="todos-box" v-show="withdrawDepositIsShowList[index].allIsShow">
              <!--充值-->
              <div class="recharge-box" v-show="withdrawDepositIsShowList[index].rechargeIsShow">
                <div class="inner-box clearfix">
                  <div class="left fl">
                    <p class="title">充值地址</p>
                    <div class="address">
                      <span class="fl">{{rechargeAddress.fadderess}}</span>
                      <span class="fr copy-btn">复制</span>
                    </div>
                  </div>
                  <div class="right fl">
                    <div class="qr-code"></div>
                  </div>
                </div>
                <!--充值须知-->
                <div class="tips">
                  充值须知
                  <p> < 到账时间一般是10分钟-60分钟，如有疑问请联系客服QQ:2263378</p>
                  <p> < 您充值FUC上述地址后，需要整个FUC网络节点的确认，为了快速到账，您可以向FUC网络支付少量的手续费。</p>
                  <p> < 最小充值金额是：0.0001 您的TKC地址不会改变，可以重复充值，如有更改，我们会通过网站公告或邮件通知您。</p>
                </div>
              </div>
              <!--提现-->
              <div class="withdraw-deposit-box" v-show="withdrawDepositIsShowList[index].withdrawDepositIsShow">
                <div class="inner-box">
                  <ul>
                    <li><span class="fl">可用{{item.coinName}}</span><span class="fl">{{item.total}}</span></li>
                    <li><span class="fl">提现地址</span><input class="fr" type="text"></li>
                    <li><span class="fl">提现数量</span><input class="fr" type="text"></li>
                    <li><span class="fl">交易密码</span><input class="fr" type="text"></li>
                    <li class="verify-li"><span class="fl">短信验证码</span><input class="fr" type="text">
                      <input class="verify-btn" type="button" value="发送验证码">
                    </li>
                    <li><input class="fr submit" type="button" value="提交提现订单"></li>
                  </ul>
                </div>
                <!--充值须知-->
                <div class="tips">
                  交易须知
                  <p> < FUC 最小提币数量为0个</p>
                  <p> < 提交申请后，24小时内审核通过。待网络确认后，即可到账。</p>
                  <p> < 提币费率说明:提币手续费=提币数目*费率0.0000BTM +固定手续费2.0000BTM 。</p>
                </div>
              </div>
            </div>
          </div>
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
        seen: true,
        withdrawDepositIsShowList: [],
        currencyList: [//币种列表
          {
            // "applogo":"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",
            // "coinIntroduce":null,
            // "id":1,
            // "name":"FUC",
            // "networkFee":0.01,
            // "recharge":true,
            // "shortname":"FUC",
            // "status":1,
            // "symbol":"FUC",
            // "type":2,
            // "weblogo":"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",
            // "withdraw":true
          }
        ],
        filteredData: [],//渲染数组
        filteredData1:[],//原数组
        filteredData2:[],//过滤可用余额不为0 的数组
        rechargeAddress:{},//充值地址

      }
    },
    methods: {
      show: function () {
        this.filteredData = [];
        this.filteredData = this.filteredData1;
      },
      hide: function () {
        this.filteredData = [];
        this.filteredData = this.filteredData2;
      },
      //显示充值框
      showRechargeBox(index,coinId) {
        this.withdrawDepositIsShowList.forEach((item, index) => {
          item.allIsShow = false;
          item.rechargeIsShow = false;
          item.withdrawDepositIsShow = false;
        })
        this.withdrawDepositIsShowList[index].allIsShow = true;
        this.withdrawDepositIsShowList[index].rechargeIsShow = true;

        let coinDepositUrl = common.apidomain+'deposit/coin_deposit';
        let fd = new FormData();
        fd.append('symbol',coinId);
        ajax(coinDepositUrl,'post',fd,(res)=>{
          console.log(res);
          if(res.data.code!==200){
            return;
          }
          this.rechargeAddress = res.data.data.rechargeAddress;
        })
      },
      //显示提现框
      showWithdrawDepositBox(index) {
        this.withdrawDepositIsShowList.forEach((item, index) => {
          item.allIsShow = false;
          item.rechargeIsShow = false;
          item.withdrawDepositIsShow = false;
        })
        this.withdrawDepositIsShowList[index].allIsShow = true;
        this.withdrawDepositIsShowList[index].withdrawDepositIsShow = true;
      },
    //  获取币种列表
      loadCurrencyList(){
        let promise = new Promise((resolve, reject)=>{
          // let coinUrl = common.apidomain+ 'deposit/coin_deposit';
          let coinUrl = common.apidomain+ 'financial/index';
          let fd = new FormData();

          // fd.append('symbol',1);
          ajax(coinUrl,'post',fd,(res)=>{
            if(res.data.code!==200){
              reject(res);
              return;
            }else{
              resolve(res);
            }

          })
        })
        return promise;

      }
    },

    created() {
      this.loadCurrencyList().then((res)=>{
        this.currencyList = res.data.data.userWalletList;
        this.filteredData = this.currencyList;
        this.filteredData1 = this.currencyList;
        this.currencyList.forEach((item,index)=>{
          this.withdrawDepositIsShowList.push({allIsShow: false, rechargeIsShow: false, withdrawDepositIsShow: false});
          if(item.total){
            this.filteredData2.push(item);
          }
        })
        console.log(this.currencyList);
      });
      // console.log(this.withdrawDepositIsShowList);
    },
    computed: {
      // // 显示所有
      // filteredData1: function () {
      //   return this.currencyList.filter(function (item) {
      //     return item;
      //   })
      // },
      // // 隐藏资产为0的币种
      // filteredData2: function () {
      //   return this.currencyList.filter(function (item) {
      //     return item.availableCount !== 0;
      //   })
      // },
    },
    components: {}
  }
</script>
<style scoped>
  /*充值提现表头*/
  .title {
    height: 40px;
    line-height: 40px;
    width: 100%;
    background-color: #0e1425;
    /*margin-bottom:10px;*/
  }

  .left-con {
    float: left;
    font-size: 14px;
    padding-left: 20px;
  }

  .right-con {
    float: right;
    overflow: hidden;
  }

  .right-con .all, .right-con .part, .right-con .search {
    float: left;
    width: 200px;
  }

  .right-con .all input, .right-con .part input {
    display: inline-block;
  }

  .right-con .all label, .right-con .part label {
    font-size: 14px;
    cursor: pointer;
  }

  .right-con .part {
    margin-right: 60px;
  }

  .right-con .search {
    position: relative;
  }

  .right-con .search input {
    display: inline-block;
    width: 145px;
    height: 30px;
    border: 1px solid #c2c2c8;
    border-radius: 15px;
    padding-left: 45px;
    background: transparent;
  }

  .right-con .search img {
    position: absolute;
    top: 14px;
    left: 43px;
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

  .margin-bottom {
    height: 10px;
    background-color: #1f263c;
  }

  /*主题内容*/
  .body {
    background-color: green;
    text-align: left;
    /*height: 500px;*/
  }

  .table {
    width: 100%;
    padding-top: 40px;
    position: relative;
  }

  /*表头*/
  .table .th {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #0e1425;
    justify-content: space-between;
    padding: 0 20px;
  }

  .table .th .td {
    flex: 1;
  }

  /*操作居中*/
  .table .th .td:nth-last-of-type(1) {
    text-align: center;
  }

  .tbody {

  }

  .tbody .tr {
    position: relative;
    /*margin:0 20px;*/
    background-color: #12192b;
    text-align: left;
  }

  .tbody .tr .item {
    display: flex;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background-color: #12182b;
  }

  .tbody .tr .item .todos {
    /*padding:0 30px;*/
    text-align: center;
  }

  .tbody .tr .item .todos button {
    border: 1px solid #fff;
    border-radius: 5px;
    height: 25px;
    width: 30%;
    margin: 0 10px;
    display: inline-block;
  }

  .tbody .tr .td {
    flex: 1;
  }

  .recharge-box, .withdraw-deposit-box {
    /*height: 150px;*/
    background-color: #0e1425;
    padding: 20px;
  }

  .recharge-box .left {
    /*padding:5px 10px;*/
    text-align: left;
    margin-right: 40px;
  }

  .recharge-box .left .title {
    /*text-align: left;*/
    height: 20px;
    /*background-color: pink;*/
    margin-bottom: 20px;
  }

  .recharge-box .left .address {
    border: 1px solid #fff;
    padding: 0 20px;
    height: 40px;
    width: 500px;
    line-height: 40px;
    position: relative;
    /*background-color: yellow;*/
  }

  .recharge-box .left .address::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 25px;
    top: 50%;
    right: 70px;
    transform: translateY(-50%);
    background-color: #fff;
    clear: both;
  }

  /*右侧 二维码盒子*/
  .recharge-box .right .qr-code {
    width: 100px;
    height: 100px;
    background-color: pink;
  }

  .recharge-box .tips, .withdraw-deposit-box .tips {
    margin-top: 150px;
    text-align: left;
  }

  .recharge-box .tips p, .withdraw-deposit-box .tips p {
    font-size: 12px;
    line-height: 25px;
  }

  .withdraw-deposit-box .tips {
    /*margin-top:0;*/
    margin: 0 auto;
    width: 54%;
  }

  .withdraw-deposit-box li {
    width: 53%;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
  }

  .withdraw-deposit-box li span {
    display: inline-block;
    width: 100px;
    text-align: left;
    /*background-color: pink;*/
  }

  .withdraw-deposit-box input {
    border: 1px solid #fff;
    display: inline-block;
    border-radius: 5px;
    width: 400px;
    height: 30px;
    margin: 5px auto;
    box-sizing: border-box;
    padding: 0 20px;
  }

  .withdraw-deposit-box li .submit {
    background-color: #192135;
  }

  .withdraw-deposit-box .verify-li {
    position: relative;
  }

  /*获取验证码按钮*/
  .withdraw-deposit-box .verify-li .verify-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: auto;
    border: none;
    font-size: 12px;
    padding: 0 10px;
    /*background-color: pink;*/
  }

  .withdraw-deposit-box .verify-li::before {
    content: '';
    height: 20px;
    background-color: #fff;
    width: 1px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 17%;
  }
</style>
