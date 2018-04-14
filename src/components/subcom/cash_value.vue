<template>
  <div class="pr">
    <tips class="pa"></tips>
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
              <div class="td">{{item.shortName}}</div>
              <div class="td">{{item.total}}</div>
              <div class="td">{{item.frozen}}</div>
              <div class="td todos">
                <button v-on:click="showRechargeBox(index,item.coinId)">充值</button>
                <button v-on:click="showWithdrawDepositBox(index,item.coinId)">提现</button>
              </div>
            </div>
            <div class="todos-box" v-if="withdrawDepositIsShowList[index].allIsShow">
              <!--充值-->
              <div class="recharge-box" v-show="withdrawDepositIsShowList[index].rechargeIsShow">
                <!--非天涯币充值地址-->
                <div class="inner-box clearfix" v-if="item.shortName!=='TYZ'">
                  <div class="needmemo tc fw7 fz22" v-show="needmemo">
                    转账时请务必备注（否则后果自负）:<span class="red">{{$store.state.userInfo.fid}}</span>
                  </div>
                  <div class="left fl">
                    <p class="title dis-in-blk">充值地址</p>
                    <el-button size="mini" type="primary" v-if="!rechargeAddress.fadderess"
                               v-on:click="getAddress(index,item.coinId)">点击获取充值地址
                    </el-button>
                    <div v-show="rechargeAddress.fadderess">
                      <div class="address">
                        <span class="fl">{{rechargeAddress.fadderess}}</span>
                        <span class="fr copy-btn cp" v-clipboard:copy="rechargeAddress.fadderess"
                              v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
                      </div>
                    </div>
                  </div>
                  <div class="right fl">
                    <div class="qr-code" id="qrcode" v-if="rechargeAddress.fadderess">
                      <VueQrcode :value="String(rechargeAddress.fadderess)" :options="{ size: 100 }"></VueQrcode>
                    </div>
                  </div>
                </div>
                <!--天涯币充值地址-->
                <div class="inner-box" v-show="item.shortName=='TYZ'">
                  <div class="h40 ml80">转账金额：<input class="bd1 dis-in-blk bdr5 pdlr10" type="text"
                                                    v-model="tyz.transferAccounts"></div>
                  <div class="h40 ml80">来源账号：<input class="bd1 dis-in-blk bdr5 pdlr10" type="text"
                                                    v-model="tyz.account">
                  </div>
                  <div class="ml80 h40 w220">
                    <div class="false-tips fz12 mb10 mt-10"><i v-show="errorMsg"></i>{{errorMsg}}</div>
                    <el-button size="mini" type="primary" v-on:click="submitTyzTransfer">提交充值订单</el-button>
                  </div>
                </div>
                <!--非天涯币充值须知-->
                <div class="tips" v-if="item.shortName!=='TYZ'">
                  充值须知
                  <p> < 到账时间一般是10分钟-60分钟，如有疑问请联系客服QQ:2263378</p>
                  <p> < 您充值{{item.shortName}}上述地址后，需要整个{{item.shortName}}网络节点的确认，为了快速到账，您可以向FUC网络支付少量的手续费。</p>
                  <p> < 最小充值金额是：0.0001 您的{{item.shortName}}地址不会改变，可以重复充值，如有更改，我们会通过网站公告或邮件通知您。</p>
                </div>
                <!--天涯币充值须知-->
                <div class="tips" v-if="item.shortName=='TYZ'">
                  <p>< 请将天涯钻转入平台账号hf</p>
                  <p>< 目前仅支持100元以上汇款, 100元以下汇款不予处理。</p>
                </div>
              </div>

              <!--提现-->
              <div class="withdraw-deposit-box" v-show="withdrawDepositIsShowList[index].withdrawDepositIsShow">
                <div class="inner-box" v-bind:class="{'h380':item.shortName=='TYZ'}">
                  <ul>
                    <li><span class="fl">可用{{item.shortName}}</span><span class="fl">{{item.total}}</span></li>
                    <!--天涯币-->
                    <li v-if="item.shortName=='TYZ'">
                      <span class="fl">提现账号</span><input type="text" class="fr">
                    </li>
                    <!--非天涯币-->
                    <li class="pr" v-if="item.shortName!=='TYZ'">
                      <span class="fl">提现地址</span>
                      <el-select class="fr" v-model="withdrawAddress" placeholder="请选择">
                        <el-option
                          v-for="(item,index) in withdrawAddressList"
                          :key="item.fid"
                          :label="item.fremark+'-'+item.fadderess"
                          :value="item.fid">
                        </el-option>
                      </el-select>
                      <span v-if="item.shortName!=='TYZ'" class="pa blue add-address cp" v-on:click="addAddress">去新增 <i> >> </i></span>
                      <!--新增提现地址-->
                      <i class="dialog">
                        <el-dialog title="提现地址" center :visible.sync="dialogFormVisible" class="dialog-contentinfo"
                                   width="35%">
                          <el-form class="cent" label-width="120px" label-position="right">

                            <el-form-item label="提现地址">
                              <el-input class="input-info" v-model="newWithdrawAddress"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                              <el-input class="input-info" v-model="remark"></el-input>
                            </el-form-item>
                            <el-form-item label="交易密码">
                              <el-input class="input-info" v-model="tradePwd" placeholder="请输入交易密码"
                                        type="password"></el-input>
                            </el-form-item>
                            <!--<div class="false-tips fz12 mt-5"><i v-show="tradePwdErrorMsg"></i>{{tradePwdErrorMsg}}-->
                            <!--</div>-->


                            <el-form-item label="短信验证码">
                              <el-input class="input-info input-with-select" v-model="msgForNewAddress"
                                        placeholder="请输入短信验证码">
                                <el-button slot="append" size="mini" class="bdr0 w100p"
                                           :disabled="msgDisabledForAddress"
                                           v-on:click="sendCode('addAddress')">{{msgBtnTxt}}
                                </el-button>
                              </el-input>
                            </el-form-item>
                            <el-form-item label="      ">
                              <div class="false-tips fz12 mt-10"><i v-show="addAddressErrorMsg"></i>{{addAddressErrorMsg}}
                              </div>
                            </el-form-item>
                            <el-form-item label="      ">
                              <el-button size="mini" class="" v-on:click="addNewAddress">确定提交</el-button>
                            </el-form-item>
                          </el-form>
                        </el-dialog>
                      </i>
                    </li>
                    <!--BTC提现-->
                    <li class="pr" v-if="item.shortName=='BTC'">
                      <span class="fl">BTC网络手续费</span>
                      <el-select class="fr" v-model="btcfeesIndex" placeholder="请选择">
                        <el-option key="0" value="0" label="0.0001"></el-option>
                        <el-option key="1" value="1" label="0.0002"></el-option>
                        <el-option key="2" value="2" label="0.0003"></el-option>
                        <el-option key="3" value="3" label="0.0004"></el-option>
                        <el-option key="4" value="4" label="0.0005"></el-option>
                        <el-option key="5" value="5" label="0.0006"></el-option>
                        <el-option key="6" value="6" label="0.0007"></el-option>
                        <el-option key="7" value="7" label="0.0008"></el-option>
                        <el-option key="8" value="8" label="0.0009"></el-option>
                        <el-option key="9" value="9" label="0.0010"></el-option>

                      </el-select>
                    </li>

                    <li v-if="item.shortName!=='TYZ'">
                      <span class="fl">提现数量</span>
                      <input class="fr" type="text" v-model="withdrawCount">
                    </li>

                    <!--天涯币提现-->
                    <li v-if="item.shortName=='TYZ'"><span class="fl">提现金额</span><input class="fr" type="text"></li>
                    <li v-if="item.shortName=='TYZ'">
                      <span class="fl"></span>
                      <div class="fl ml100 db1p pdlr10 w80p">
                        <div>手续费 00000 TYZ</div>
                        <div>实际到账 <span class="red">0000</span></div>
                      </div>
                      <input class="fr" type="text">
                    </li>

                    <li><span class="fl">交易密码</span><input class="fr" type="text" v-model="tradePwd"></li>
                    <li class="verify-li">
                      <span class="fl">短信验证码</span>
                      <input class="fr" type="text" v-model="submitWithdrawMsg">
                      <input class="verify-btn" v-on:click="sendCode('submitWithdraw')" type="button"
                             :disabled="msgDisabledForSubmitWithdraw" v-model="submitBtnTxt">
                    </li>
                    <li>
                      <input class="fr submit" type="button" value="提交提现订单" v-on:click="submitWithdraw(item.shortName)">

                    </li>
                    <li>
                      <div class="false-tips fz12 mt-10"><i v-show="submitWithdrawErrorMsg"></i>{{submitWithdrawErrorMsg}}
                      </div>
                    </li>
                  </ul>
                </div>
                <!--交易须知-->
                <div class="tips">
                  交易须知
                  <p> < {{item.shortName}} 最小提币数量为0个</p>
                  <p> < 提交申请后，24小时内审核通过。待网络确认后，即可到账。</p>
                  <p> < 提币费率说明:提币手续费=提币数目*费率0.0000{{item.shortName}} +固定手续费2.0000{{item.shortName}} 。</p>
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
  // import VueQArt from 'vue-qart'
  import VueQrcode from '@xkeshi/vue-qrcode'
  import tips from "./friendlyTips"

  export default {
    data() {
      return {
        //二维码样式
        config: {
          value: 'https://www.baidu.com',
          imagePath: '',
          filter: 'color'
        },
        seen: true,
        withdrawDepositIsShowList: [],
        currencyList: [//币种列表
          // {
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
          // }
        ],
        filteredData: [],//渲染数组
        filteredData1: [],//原数组
        filteredData2: [],//过滤可用余额不为0 的数组
        rechargeAddress: {
          fadderess: ''
        },//充值地址
        msg: '复制信息',//复制信息
        needmemo: null,//是否需要提示信息
        tyz: {
          transferAccounts: '',//转账金额
          account: '',//账号来源
        },
        errorMsg: '',//错误信息

        //  新增提现地址
        withdrawAddress: '',//1.提现地址
        withdrawAddressList: [
          /*
          * fadderess:"FqKekmNtx43b5amcW9oTKbSQWfAoTabZy9"
            fcoinid:1
            fcreatetime:1523502617000
            fid:269
            fremark:""
            fuid:300221
            init:true
            version:0
            */
        ],

        newWithdrawAddress: '',//新增提现地址
        addAddressErrorMsg: '',//新增提现错误信息
        msgForNewAddress: '',//新增提现地址短信验证码
        remark: '',//新增提现地址备注
        addAddressTimer: 0,//新增提现地址发送验证码时间
        // value: ''
        dialogFormVisible: false,//新增提现地址框
        tradePwd: '',//交易密码
        msgBtnTxt: '获取验证码',//短信验证码文字
        msgDisabledForAddress: false,//短信验证码按钮状态


        //提交提现订单
        //非天涯币
        withdrawCount: '',//提现数量
        submitWithdrawMsg: '',//提现短信验证码
        submitWithdrawErrorMsg: '',//提交订单错误信息
        msgDisabledForSubmitWithdraw: false,//短信验证码按钮状态
        submitTimer: 0,//提交订单发送验证码时间
        submitBtnTxt: '获取验证码',//短信验证码文字
        activeCoinId: '',//提现币种id
        btcfeesIndex:0,//btc提现手续费
        //天涯币

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
      showRechargeBox(index, coinId) {
        this.withdrawDepositIsShowList.forEach((item, index) => {
          item.allIsShow = false;
          item.rechargeIsShow = false;
          item.withdrawDepositIsShow = false;
        })
        this.withdrawDepositIsShowList[index].allIsShow = true;
        this.withdrawDepositIsShowList[index].rechargeIsShow = true;

        //清空地址栏
        this.rechargeAddress = {
          fadderess: ''
        }

        let coinDepositUrl = common.apidomain + 'deposit/coin_deposit';
        let fd = new FormData();
        fd.append('symbol', coinId);
        ajax(coinDepositUrl, 'post', fd, (res) => {
          console.dir(res.data.data);

          if (res.data.code !== 200) {
            return;
          }
          if (!res.data.data.rechargeAddress) {
            return;
          }
          //是否需要提示
          if (res.data.data.needmemo) {
            this.needmemo = res.data.data.needmemo;
          }
          this.rechargeAddress = res.data.data.rechargeAddress;
          console.log(this.rechargeAddress.fadderess);
        })
      },
      //显示提现框
      showWithdrawDepositBox(index, coinId) {
        this.withdrawDepositIsShowList.forEach((item, index) => {
          item.allIsShow = false;
          item.rechargeIsShow = false;
          item.withdrawDepositIsShow = false;
        })
        this.withdrawDepositIsShowList[index].allIsShow = true;
        this.withdrawDepositIsShowList[index].withdrawDepositIsShow = true;

        let coinWithdrawUrl = common.apidomain + 'withdraw/coin_withdraw';
        let fd = new FormData();
        fd.append('symbol', coinId);
        ajax(coinWithdrawUrl, 'post', fd, (res) => {
          if (res.data.code !== 200) {
            return;
          }
          console.log(res);
          this.withdrawAddressList = res.data.data.withdrawAddress;
          this.activeCoinId = coinId;//数据传递使用
          // console.log(this.activeCoinId);
          // console.log('1234');
          // console.log(this.withdrawAddressList);
        });


      },
      // //  获取币种列表
      // loadCurrencyList() {
      //   let promise = new Promise((resolve, reject) => {
      //     // let coinUrl = common.apidomain+ 'deposit/coin_deposit';
      //     let coinUrl = common.apidomain + 'financial/index';
      //     let fd = new FormData();
      //
      //     // fd.append('symbol',1);
      //     ajax(coinUrl, 'post', fd, (res) => {
      //       console.log(res);
      //       if (res.data.code !== 200) {
      //         reject(res);
      //         return;
      //       } else {
      //         resolve(res);
      //       }
      //
      //     })
      //   })
      //   return promise;
      //
      // },
      //  获取虚拟币充值地址
      getAddress(index, coinId) {
        let addressUrl = common.apidomain + 'withdraw/coin_address';
        let fd = new FormData();
        fd.append('symbol', coinId);
        ajax(addressUrl, 'post', fd, (res) => {
          console.log(res);
          if (res.data.code !== 200) {
            this.$store.commit('changeDialogInfo', res.data.msg)
            return;
          }
          this.rechargeAddress = {
            fadderess: res.data.data
          }
        })
      },
      //提交天涯币充值订单
      submitTyzTransfer() {
        /*
        * tyz:{
          transferAccounts:'',//转账金额
          account:'',//账号来源
        }*/
        if (!this.tyz.account) {
          this.errorMsg = '请输入账号来源';
          return;
        } else if (!this.tyz.transferAccounts) {
          this.errorMsg = '请输入转账金额';
          return;
        } else if (this.tyz.transferAccounts < 100) {
          this.errorMsg = '转账金额不可小于100';
          return;
        } else {
          this.errorMsg = ''
        }
      },
      //提交提现订单
      submitWithdraw(coinType) {
        //非天涯币
        if (coinType != 'TYZ') {

            console.log(this.withdrawAddress);
            console.log(this.withdrawCount);
            console.log(this.tradePwd);
            console.log(this.submitWithdrawMsg);
            console.log(this.btcfeesIndex);
            console.log(this.activeCoinId);

          /*
          * withdrawAddr: 273
            withdrawAmount: 1
            tradePwd: b
            totpCode: 0
            phoneCode: 323541
            symbol: 1
            btcfeesIndex: 0*/

          let withdrawUrl = common.apidomain + 'withdraw/coin_manual';
          let fd = new FormData();
          fd.append('withdrawAddr', this.withdrawAddress);
          fd.append('withdrawAmount', this.withdrawCount);
          fd.append('tradePwd', this.tradePwd);
          fd.append('totpCode', 0);
          fd.append('phoneCode', this.submitWithdrawMsg);
          fd.append('symbol', this.activeCoinId);
          // if(coinType=='BTC'){
            fd.append('btcfeesIndex',this.btcfeesIndex);
          // }
          ajax(withdrawUrl,'post',fd,(res)=>{
            console.log(res.data);
            this.submitWithdrawErrorMsg=res.data.msg;
            if(res.data.code!=200){
              this.submitWithdrawErrorMsg == res.data.msg;
              // this.submitWithdrawErrorMsg == '错误';
              return;
            }else{
              this.$store.commit('changeDialogInfo',res.data.msg);

            }
          });
        } else {
          //  天涯币
          console.log('天涯币');
        }
      },
      //  点击复制
      onCopy: function (e) {
        let msg = '已拷贝' + e.text;
        this.$store.commit('changeDialogInfo', msg)
      },
      onError: function (e) {
        let msg = '拷贝失败，请稍后重试';
        this.$store.commit('changeDialogInfo', msg)
      },
      //  提现
      //  显示提现窗口
      addAddress() {
        this.dialogFormVisible = true;
      },
      //新增提现地址
      addNewAddress() {
        if (!this.newWithdrawAddress) {
          this.addAddressErrorMsg = '请输入新的提现地址';
          return;
        } else if (!this.tradePwd) {
          this.addAddressErrorMsg = '请输入交易密码';
          return;
        } else if (!this.msgForNewAddress) {
          this.addAddressErrorMsg = '请输入短信验证码';
          return;
        } else {
          this.addAddressErrorMsg = '';
        }

        let addNewAddressUrl = common.apidomain + 'user/save_withdraw_address';
        let fd = new FormData();
        /*
        *
        * withdrawAddr: FqDDfCyFACFnPcohg1qAfuXZsbhiwcdKSv
          totpCode: 0
          phoneCode: 073379
          symbol: 1
          password:
          remark: */
        console.log(this.activeCoinId);
        fd.append('withdrawAddr', this.newWithdrawAddress);
        fd.append('totpCode', 0);
        fd.append('phoneCode', this.msgForNewAddress);
        fd.append('symbol', this.activeCoinId);
        fd.append('password', this.tradePwd);
        fd.append('remark', this.remark);
        ajax(addNewAddressUrl, 'post', fd, (res) => {
          console.log(res);
          if (res.data.code !== 200) {
            this.addAddressErrorMsg = res.data.msg;
            return;
          }
          this.$store.commit('changeDialogInfo', res.data.msg);
        });
      },
      //发送验证码
      sendCode(msgType) {
        //新增用户地址
        // if(msgType=='addAddress'){
        /*
        * 发送验证码格式
        * type: 108
          msgtype: 1
          areaCode: 0
          phone: 0
          vcode: 0
          uid: 0*/

        // }else if(msgType=='submitWithdraw'){}

        if (msgType == 'addAddress') {
          if (!this.newWithdrawAddress) {
            this.addAddressErrorMsg = '请输入新的提现地址';
            return;
          }
          this.sendCodeAll('addAddress').then((res) => {
            console.log(res);
            if (res.data.code !== 200) {
              this.addAddressErrorMsg = res.data.msg;
              return;
            } else {
              this.addAddressErrorMsg = '';
              this.addAddressTimer = 60;
              this.msgDisabledForAddress = true;
              this.addMsgTimer();
            }
          });
        } else if (msgType == 'submitWithdraw') {
          this.sendCodeAll('submitWithdraw').then((res) => {
            console.log(res);

            if (res.data.code !== 200) {
              this.submitWithdrawErrorMsg = res.data.msg;
              return;
            } else {
              this.submitWithdrawErrorMsg = '';
              this.submitTimer = 60;
              this.msgDisabledForSubmitWithdraw = true;
              this.submitMsgTimer();
            }
          })

        }

        // let msgUrl = common.apidomain + 'user/send_sms';
        //
        // let fd = new FormData();
        //
        // fd.append('type', 111);
        // fd.append('msgtype', 1);
        // fd.append('areaCode', '+86');
        // fd.append('phone', this.registerInfo.phoneNum);
        // fd.append('vcode', this.imgCode);
        // fd.append('imageRedisKey', this.imageRedisKey);
        // fd.append('uid', 0);
        // ajax(msgUrl, 'post', fd, (res) => {
        //   console.log(res);
        //   if (res.data.code !== 200) {
        //     this.errorMsg = res.data.msg;
        //     return;
        //   } else {
        //     this.msgTime = 60;
        //     this.msgDisabled = true;
        //     this.msgTimer();
        //   }
        // })
        // }
        // });
      },
      //发送验证码
      sendCodeAll(msgType) {
        return new Promise((resolve, reject) => {
          let msgUrl = common.apidomain + 'user/send_sms';
          let fd = new FormData();
          if (msgType == 'addAddress') {
            /*
            * type: 108
              msgtype: 1
              areaCode: 0
              phone: 0
              vcode: 0
              uid:*/
            fd.append('type', 108);
            fd.append('msgtype', 1);
            fd.append('areaCode', 0);
            fd.append('phone', 0);
            fd.append('vcode', 0);
            fd.append('uid', 0);
            ajax(msgUrl, 'post', fd, (res) => {
              resolve(res);
            })
          } else if (msgType == 'submitWithdraw') {
            /*
            *
            * type: 105
              msgtype: 1
              areaCode: 0
              phone: 0
              vcode: 0
              uid: 0*/
            fd.append('type', 105);
            fd.append('msgtype', 1);
            fd.append('areaCode', 0);
            fd.append('phone', 0);
            fd.append('vcode', 0);
            fd.append('uid', 0);
            ajax(msgUrl, 'post', fd, (res) => {
              resolve(res);
            })
          }

        })
      },
      addMsgTimer() {
        if (this.addAddressTimer > 0) {
          this.addAddressTimer--;
          this.msgBtnTxt = this.addAddressTimer + "s后重新获取"
          setTimeout(this.addMsgTimer, 1000);
        } else {
          this.addAddressTimer = 0;
          this.msgBtnTxt = "获取验证码";
          this.msgDisabledForAddress = false;
        }
      },
      submitMsgTimer() {
        if (this.submitTimer > 0) {
          this.submitTimer--;
          this.submitBtnTxt = this.submitTimer + "s后重新获取"
          setTimeout(this.submitMsgTimer, 1000);
        } else {
          this.submitTimer = 0;
          this.submitBtnTxt = "获取验证码";
          this.msgDisabledForSubmitWithdraw = false;
        }
      },
    },

    created() {
      this.currencyList = this.$store.state.personalAsset;

      this.filteredData = this.currencyList;
      this.filteredData1 = this.currencyList;
      this.currencyList.forEach((item, index) => {
        this.withdrawDepositIsShowList.push({allIsShow: false, rechargeIsShow: false, withdrawDepositIsShow: false});
        if (item.total) {
          this.filteredData2.push(item);
        }
      })
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
    components: {
      VueQrcode,//二维码
      tips,//提示信息
    }
  }
</script>
<style scoped>
  /*充值提现表头*/
  .title {
    height: 40px;
    line-height: 40px;
    /*width: 100%;*/
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

  .recharge-box .inner-box {
    min-height: 130px;
    /*min-height:50px;*/
    /*background-color: pink;*/
  }

  .withdraw-deposit-box .inner-box {
    min-height: 280px;
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
    margin-right: 20px;
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
    /*background-color: pink;*/
  }

  .qr-code div {
    width: 100px;
    height: 100px;
  }

  .qr-code div div {
    width: 100px;
    height: 100px;
  }

  .recharge-box .tips, .withdraw-deposit-box .tips {
    /*margin-top: 150px;*/
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
    width: 46.5%;
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

  .needmemo {
    height: 70px;
    line-height: 50px;
    /*background-color: pink;*/
  }

  /*新增提现地址*/
  .add-address {
    right: -105px;
    top: 0;
    /*background-color: pink;*/
  }

  .dialog {
    font-style: normal;
  }
</style>
