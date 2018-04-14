<template>
  <div class="fund_box">
    <ul class="tabs clearfix">
      <li class="w10p" :class="{'active':tabId===0}">
        <el-select v-model="selectCoin" placeholder="请选择" class="bn" @change="change">
          <el-option class="bn fz12"
                     v-for="item in coinTypeList"
                     :key="item.id"
                     :label="item.shortname"
                     :value="item.id">
          </el-option>
        </el-select>
      </li>

      <li @click="changeTabId(1)" :class="{'tabId':tabId===1}">银行卡</li>
      <li @click="changeTabId(2)" :class="{'tabId':tabId===2}">支付宝</li>
    </ul>
    <div class="cards clearfix">
      <div v-show="tabId===0">
        <!--虚拟币列表-->
        <ul v-if="accountcoinList.length">
          <li class="bank-card-item account-item fw7" v-for="(item,index) in accountcoinList">
            <div class="inner-box">
              <!--顶部-->
              <div class="top clearfix">

                <!--虚拟币地址-->
                <div class="bank-name fl clearfix mr10">
                  <!--银行名称-->
                  <div class="name tl fw7">{{item.fadderess}}</div>
                </div>
                <!--删除按钮-->
                <div class="del fr lh20 fz16">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <!--底部-->
              <div class="bottom tl">
                <div class="desc pr lh30">
                  <i class="iconfont icon-erweima fw4 mr10" v-on:mouseenter="showErcode(index,item.fadderess)"
                     v-on:mouseleave="hiddenErcode"></i>
                  {{item.fremark}}
                  <!--<div class="ercode pa" v-show="ercodeIsShowId==index"></div>-->
                  <VueQrcode class=" ercode pa" :value="String(item.fadderess)" :options="{ size: 100 }"
                             v-show="ercodeIsShowId==index"></VueQrcode>

                </div>
                <div class="address">

                </div>
              </div>
            </div>
          </li>
        </ul>
        <Currency class="fl" :select-coin="selectCoin"></Currency>
      </div>
      <div v-show="tabId===1">
        <!--银行卡列表-->
        <ul>
          <li class="bank-card-item fw7" v-for="(item,index) in bankCardList">
            <div class="inner-box">
              <!--顶部-->
              <div class="top clearfix">
                <div class="logo fl mr20"
                     v-bind:style="{'background':'url(https://www.fubt.top/front/images/finance/banklogo/'+item.fbanktype+'.png) no-repeat center center'}">

                </div>
                <!--银行卡号-->
                <div class="bank-name fl clearfix mr10">
                  <!--银行名称-->
                  <div class="name tl fw7">{{item.fname}}</div>
                  <!--银行卡号-->
                  <div class="num fw7 lh30">**** **** ****
                    {{item.fbanknumber.substring(item.fbanknumber.length-4,item.fbanknumber.length)}}
                  </div>
                </div>
                <!--删除按钮-->
                <div class="del fr lh40 fz16">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <!--底部-->
              <div class="bottom tl">

                <div class="desc">
                  {{item.fname}}，{{item.faddress}}
                </div>
                <div class="address lh30">
                  {{item.fprov}}{{item.fcity}}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <Bank class="fl"></Bank>


      </div>
      <div v-show="tabId===2">
        <!--支付宝列表-->
        <ul>
          <li class="bank-card-item alipay-item fw7" v-for="(item,index) in alipayList">
            <div class="inner-box">
              <!--顶部-->
              <div class="top clearfix">
                <div class="logo fl mr20">
                  <i class="iconfont icon-zhifubao"></i>
                </div>
                <!--支付宝信息-->
                <div class="bank-name fl clearfix mr10">
                  <!--真实姓名-->
                  <div class="name tl fw7 lh35">{{item.frealname}}</div>
                </div>
                <!--删除按钮-->
                <div class="del fr lh40 fz16">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <!--底部-->
              <div class="bottom tl">

                <div class="desc">
                  {{item.fname}}账号
                </div>
                <div class="address">
                  <div class="num fw7 lh30">{{item.fbanknumber.substring(0,4)}} ****
                    {{item.fbanknumber.substring(item.fbanknumber.length-4,item.fbanknumber.length)}}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <Alipay class="fl"></Alipay>
      </div>
    </div>
  </div>

</template>
<script>
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  import tips from "./friendlyTips"//弹窗组件
  import Currency from './capitalCurrency.vue' //币种地址
  import Bank from './capitalBank.vue' //银行卡地址
  import Alipay from './capitalAlipay.vue' //支付宝地址
  import VueQrcode from '@xkeshi/vue-qrcode'//二维码

  export default {
    data() {
      return {
        coinTypeList: [
          //   {
          //   "id": 1,
          //   "name": "FUC",
          //   "type": 2,
          //   "shortname": "FUC",
          //   "weblogo": "https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",
          //   "applogo": "https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",
          //   "coinIntroduce": null,
          //   "symbol": "FUC",
          //   "status": 1,
          //   "networkFee": 0.01,
          //   "recharge": true,
          //   "withdraw": true
          // }, {
          //   value: '选项2',
          //   label: '双皮奶'
          // }, {
          //   value: '选项3',
          //   label: '蚵仔煎'
          // }, {
          //   value: '选项4',
          //   label: '龙须面'
          // }, {
          //   value: '选项5',
          //   label: '北京烤鸭'
          // }
        ],
        selectCoin: '',


        //银行卡列表
        bankCardList: [
          // {
          //   "fid": 104,
          //   "fuid": 300200,
          //   "fname": "不知道银行",
          //   "fbanknumber": "6217994910112120383",
          //   "fbanktype": 10,
          //   "fbanktype_s": null,
          //   "fcreatetime": 1523604175000,
          //   "fstatus": 1,
          //   "version": 0,
          //   "init": true,
          //   "faddress": "123",
          //   "frealname": "吕冰洋",
          //   "fprov": "河南",
          //   "fcity": "郑州",
          //   "ftype": 0,
          //   "fdist": "中原区"
          // },
          // {
          //   "fid": 104,
          //   "fuid": 300200,
          //   "fname": "不知道银行",
          //   "fbanknumber": "6217994910112120383",
          //   "fbanktype": 10,
          //   "fbanktype_s": null,
          //   "fcreatetime": 1523604175000,
          //   "fstatus": 1,
          //   "version": 0,
          //   "init": true,
          //   "faddress": "123",
          //   "frealname": "吕冰洋",
          //   "fprov": "河南",
          //   "fcity": "郑州",
          //   "ftype": 0,
          //   "fdist": "中原区"
          // },
          // {
          //   "fid": 104,
          //   "fuid": 300200,
          //   "fname": "不知道银行",
          //   "fbanknumber": "6217994910112120383",
          //   "fbanktype": 10,
          //   "fbanktype_s": null,
          //   "fcreatetime": 1523604175000,
          //   "fstatus": 1,
          //   "version": 0,
          //   "init": true,
          //   "faddress": "123",
          //   "frealname": "吕冰洋",
          //   "fprov": "河南",
          //   "fcity": "郑州",
          //   "ftype": 0,
          //   "fdist": "中原区"
          // },
          // {
          //   "fid": 104,
          //   "fuid": 300200,
          //   "fname": "不知道银行",
          //   "fbanknumber": "6217994910112120383",
          //   "fbanktype": 10,
          //   "fbanktype_s": null,
          //   "fcreatetime": 1523604175000,
          //   "fstatus": 1,
          //   "version": 0,
          //   "init": true,
          //   "faddress": "123",
          //   "frealname": "吕冰洋",
          //   "fprov": "河南",
          //   "fcity": "郑州",
          //   "ftype": 0,
          //   "fdist": "中原区"
          // },
          // {
          //   "fid": 104,
          //   "fuid": 300200,
          //   "fname": "不知道银行",
          //   "fbanknumber": "6217994910112120383",
          //   "fbanktype": 10,
          //   "fbanktype_s": null,
          //   "fcreatetime": 1523604175000,
          //   "fstatus": 1,
          //   "version": 0,
          //   "init": true,
          //   "faddress": "123",
          //   "frealname": "吕冰洋",
          //   "fprov": "河南",
          //   "fcity": "郑州",
          //   "ftype": 0,
          //   "fdist": "中原区"
          // }
        ],
        //支付宝
        alipayList: [
          // {
          //   "fid": 105,
          //   "fuid": 300200,
          //   "fname": "支付宝",
          //   "fbanknumber": "13639753981",
          //   "fbanktype": null,
          //   "fbanktype_s": null,
          //   "fcreatetime": 1523612739000,
          //   "fstatus": 1,
          //   "version": 0,
          //   "init": true,
          //   "faddress": null,
          //   "frealname": "吕冰洋",
          //   "fprov": null,
          //   "fcity": null,
          //   "ftype": 1,
          //   "fdist": null
          // }
        ],

        //虚拟币列表
        accountcoinList: [
          // {
          //   fadderess: "FmSFk3bySA3K6zDsARmqcZnphvV9M76kTD",
          //   fcoinid: 1,
          //   fcreatetime: 1523520915000,
          //   fid: 271,
          //   fremark: "测试",
          //   fuid: 300200,
          //   init: true,
          //   version: 0
          // }
        ],

        ercodeIsShowId: -1,//现有虚拟币地址二维码显示状态id
        tabId: 1,
        form: {
          FUC: ''
        }
      }
    },
    methods: {
      //显示二维码
      showErcode(index, address) {
        this.ercodeIsShowId = index;

      },
      //隐藏二维码
      hiddenErcode() {
        this.ercodeIsShowId = -1;
      },
      //加载支付宝信息
      loadAlipayList() {
        return new Promise((resolve, reject) => {
          let aliUrl = common.apidomain + 'financial/accountalipay';
          ajax(aliUrl, 'post', {}, (res) => {
            resolve(res);
          });
        });
      },
      //加载银行信息
      loadAccountbankInfo() {
        return new Promise((resolve, reject) => {
          let bankUrl = common.apidomain + 'financial/accountbank';
          ajax(bankUrl, 'post', {}, (res) => {
            resolve(res);
          });
        })
      },
      changeTabId(num) {
        this.tabId = num;

        //银行卡
        if (this.tabId == 1) {
          this.loadAccountbankInfo().then((res) => {
            if (res.data.code !== 200) {
              return;
            }
            this.bankCardList = res.data.data.fbankinfoWithdraws;
          });
        } else if (this.tabId == 2) {
          //  支付宝
          this.loadAlipayList().then((res) => {
            if (res.data.code !== 200) {
              return;
            }
            this.alipayList = res.data.data.fbankinfoWithdraws;
          });
        }
      },
      //选择不同虚拟币
      change() {
        this.accountcoinList = [];
        this.tabId = 0;
        this.loadAccountInfo().then((res) => {
          if (res.data.code !== 200) {
            return;
          }
          if (res.data.data.fvirtualaddressWithdraws.length !== 0) {
            this.accountcoinList = res.data.data.fvirtualaddressWithdraws;
          }
        });
      },
      // 加载虚拟币管理地址
      loadAccountInfo() {
        return new Promise((resolve, reject) => {

          let accountUrl = common.apidomain + 'financial/accountcoin';
          let fd = new FormData();
          fd.append('symbol', this.selectCoin);
          ajax(accountUrl, 'post', fd, (res) => {
            resolve(res);
          });
        })
      }

    },
    created() {
      this.loadAccountbankInfo().then((res) => {
        if (res.data.code !== 200) {
          return;
        }
        // this.bankCardList = '';
        //币种列表
        this.coinTypeList = res.data.data.coinTypeList;
        this.selectCoin = this.coinTypeList[0].id;
      })
    },
    computed: {},
    components: {
      Currency,//添加地址
      Bank,//银行卡
      Alipay,//支付宝
      VueQrcode,//二维码组件
    }
  }
</script>
<style scoped>
  .from_width {
    width: 6%;
    float: left;
  }

  .tab_border {
    border: 0;
    outline: medium;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
  }

  .tabId {
    color: #409EFF;
  }

  .fund_box > ul {
    background: #0e1425;
  }

  .border_dropdown {
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
    margin: 0 30px;
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
    /*background-color: pink;*/
    width: 100%;
    /*height: 400px;*/
  }

  /*.clearfix:after {*/
  /*content: "";*/
  /*display: block;*/
  /*height: 0;*/
  /*clear: both;*/
  /*}*/

  /*.clearfix {*/
  /*zoom: 1;*/
  /*height: 50px;*/
  /*line-height: 50px;*/
  /*padding-left: 2%;*/
  /*box-sizing: border-box;*/
  /*}*/

  .add_card {
    width: 275px;
    height: 135px;
    border: 1px solid #c2c3c8;
    border-radius: 5px;
  }

  .add_card > p {
    width: 30px;
    height: 30px;
    border: 1px solid #c2c3c8;
    border-radius: 50%;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin: 15% auto 5px;
  }

  /*单个银行卡*/
  .bank-card-item, .alipay-item .account-item {
    float: left;
    width: 275px;
    height: 135px;
    /*border: 1px solid #c2c3c8;*/
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #24aa92;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .account-item {
    width: 430px;
    height: 85px;
  }

  .bank-card-item .inner-box, .alipay-item .inner-box {
    width: 100%;
    height: 100%;
  }

  .bank-card-item .inner-box .top, .alipay-item .inner-box .top {
    width: 100%;
    border-bottom: 1px solid #fff;
    height: 60%;
    /*background-color: pink;*/
    padding: 20px 15px;
  }

  .bank-card-item .inner-box .top .logo, .alipay-item .inner-box .top .logo {
    width: 34px;
    height: 34px;
  }

  .alipay-item .inner-box .top .logo i {
    font-size: 30px;

  }

  .bank-card-item .inner-box .bottom, .alipay-item .inner-box .bottom {
    padding: 5px 15px;
  }

  .account-item .desc .ercode {
    width: 100px;
    height: 100px;
    background-color: pink;
  }

</style>

