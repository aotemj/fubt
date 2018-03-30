<template>
  <div>
    <div class="title">

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
          <div class="tr" v-for="(item,index) in currencyList">
            <div class="item">
              <div class="td">{{item.name}}</div>
              <div class="td">{{item.availableCount}}</div>
              <div class="td">{{item.disabledCount}}</div>
              <div class="td todos">
                <button v-on:click="showRechargeBox(index)">充值</button>
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
                      <span class="fl">FszhgKUfy2HjoFEJKaWvyExqNFJcZHugBW</span>
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
                  <p> < 到账时间一般是10分钟-60分钟，如有疑问请联系客服QQ:2263378</p>
                  <p> < 到账时间一般是10分钟-60分钟，如有疑问请联系客服QQ:2263378</p>
                </div>
              </div>
              <!--提现-->
              <div class="withdraw-deposit-box" v-show="withdrawDepositIsShowList[index].withdrawDepositIsShow">
                <div class="inner-box">
                  <ul>
                    <li ><span class="fl">可用FUC</span><span class="fl">500.0000</span></li>
                    <li ><span class="fl">提现地址</span><input class="fr" type="text"></li>
                    <li ><span class="fl">提现数量</span><input class="fr" type="text"></li>
                    <li ><span class="fl">交易密码</span><input class="fr" type="text"></li>
                    <li class="verify-li"><span class="fl">短信验证码</span><input class="fr" type="text">
                      <input class="verify-btn" type="button" value="发送验证码">
                    </li>
                    <li ><input class="fr submit" type="button" value="提交提现订单"></li>
                  </ul>
                </div>
                <!--充值须知-->
                <div class="tips">
                  交易须知
                  <p> < FUC 最小提币数量为0个</p>
                  <p> < 提交申请后，24小时内审核通过。待网络确认后即可到账</p>
                  <p> < 提币费率说明：提币手续费=提币数目*费率0.0010FUC+固定手续费0.0100FUC</p>
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

  export default {
    data() {
      return {
        withdrawDepositIsShowList:[],
        currencyList: [//币种列表
          {
            name:'FUC',
            availableCount:500.00,
            disabledCount:500.00
          },
          {
            name:'FUC',
            availableCount:500.00,
            disabledCount:500.00
          },
          {
            name:'FUC',
            availableCount:500.00,
            disabledCount:500.00
          },
          {
            name:'FUC',
            availableCount:500.00,
            disabledCount:500.00
          },
          {
            name:'FUC',
            availableCount:500.00,
            disabledCount:500.00
          },
          {
            name:'FUC',
            availableCount:500.00,
            disabledCount:500.00
          }

        ]
      }
    },
    methods: {
      //显示充值框
      showRechargeBox(index){
        this.withdrawDepositIsShowList.forEach((item,index)=>{
          item.allIsShow=false;
          item.rechargeIsShow=false;
          item.withdrawDepositIsShow=false;
        })
        this.withdrawDepositIsShowList[index].allIsShow=true;
        this.withdrawDepositIsShowList[index].rechargeIsShow=true;
      },
      //显示提现框
      showWithdrawDepositBox(index){
        this.withdrawDepositIsShowList.forEach((item,index)=>{
          item.allIsShow=false;
          item.rechargeIsShow=false;
          item.withdrawDepositIsShow=false;
        })
        this.withdrawDepositIsShowList[index].allIsShow=true;
        this.withdrawDepositIsShowList[index].withdrawDepositIsShow=true;
      }
    },
    created() {
      for(var i=0;i<this.currencyList.length;i++){
        this.withdrawDepositIsShowList.push({allIsShow:false,rechargeIsShow:false,withdrawDepositIsShow:false});
      }
      // console.log(this.withdrawDepositIsShowList);
    },
    computed: {},
    components: {}
  }
</script>
<style scoped>
  .title {
    height: 60px;
    width: 100%;
    background-color: #0e1425;
    /*margin-bottom:10px;*/
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
    padding:0 20px;
  }


  .table .th .td {
    flex: 1;
  }
  /*操作居中*/
  .table .th .td:nth-last-of-type(1){
    text-align: center;
  }

  .tbody {

  }
  .tbody .tr{
    position: relative;
    /*margin:0 20px;*/
    background-color:#12192b
  }
  .tbody .tr .item {
    display: flex;
    height: 40px;
    line-height: 40px;
    padding:0 20px;
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
   .recharge-box .tips,.withdraw-deposit-box .tips{
    margin-top:150px;
    text-align: left;
  }
  .recharge-box .tips p,.withdraw-deposit-box .tips p{
    font-size: 12px;
    line-height: 25px;
  }
  .withdraw-deposit-box .tips{
    /*margin-top:0;*/
    margin:0 auto;
    width:54%;
  }

  .withdraw-deposit-box li{
    width:53%;
    margin:0 auto;
    height: 40px;
    line-height:40px;
  }
  .withdraw-deposit-box li span{
    display:inline-block;
    width:100px;
    text-align: left;
    /*background-color: pink;*/
  }
  .withdraw-deposit-box input{
    border:1px solid #fff;
    display:inline-block;
    border-radius:5px;
    width:400px;
    height:30px;
    margin:5px auto;
    box-sizing: border-box;
    padding:0 20px;
  }
  .withdraw-deposit-box li .submit{
    background-color:#192135;
  }
  .withdraw-deposit-box .verify-li{
    position: relative;
  }
  /*获取验证码按钮*/
  .withdraw-deposit-box .verify-li .verify-btn{
    position: absolute;
    top:0;
    right:0;
    width:auto;
    border:none;
    font-size: 12px;
    padding:0 10px;
    /*background-color: pink;*/
  }
  .withdraw-deposit-box .verify-li::before{
    content:'';
    height:20px;
    background-color: #fff;
    width:1px;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right:17%;
  }
</style>
