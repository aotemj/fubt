<template>
  <div class="con-box">
    <tips></tips>
    <Header class="header"></Header>
    <!-- 币种资料 -->
    <div class="currencyData">
      <div class="inner-box clearfix">
        <div class="left fl clearfix">
          <button class="chg-cur-btn fl" v-on:click="toggleCurList">
            {{activeCoinInfo.sellsymbol}}/{{activeCoinInfo.buysymbol}}
          </button>
          <i class="iconfont fl" v-bind:class="{'icon-xiala':!curListIsShow,'icon-shangla-copy':curListIsShow}"></i>
          <router-link to="/currencyInfo" class="cur-desc fff fl"><i class="iconfont icon-bianji"></i>币种资料</router-link>
        </div>
        <div class="right fr">
          <ul class="clearfix">
            <li class="fl today-max">
              <!--今日最高-->
              买一
              <span>{{activeCoinInfo.buy}}</span>
            </li>
            <li class="fl today-min">
              <!--今日最低-->
              卖一
              <span>{{activeCoinInfo.sell}}</span>
            </li>
            <li class="fl tf-done-count">
              24小时成交量
              <span>{{activeCoinInfo.total}}</span>
            </li>
            <li class="fl up-and-down">
              跌涨幅
              <span>{{activeCoinInfo.rose}}</span>
            </li>
            <li class="fl now-price">
              最新成交价
              <span>{{activeCoinInfo.price}}</span>
            </li>
          </ul>
        </div>
        <!--币种列表-->
        <el-collapse-transition>
          <div class="currencyList" v-show="curListIsShow">
          <el-tabs type="">
            <el-tab-pane>
              <span slot="label"><span style="font-size:18px;">●</span> FBT交易</span>
              <div class="table">
                <ul class="th">
                  <li class="td">币种</li>
                  <li class="td">最新成交价</li>
                  <li class="td">24H成交量</li>
                  <li class="td">日涨跌</li>
                </ul>
                <div class="tbody" v-on:click="selectedCurrency">
                  <div :id="item.id" class="item" v-for="(item,index) in fbtFilteredData" v-on:mouseover="hover"
                       v-on:click.stop="say(item.id,item.sellsymbol,item.buysymbol)">
                    <li class="data-item">{{item.sellsymbol}}/{{item.buysymbol}}</li>
                    <li class="data-item">{{item.price}}</li>
                    <li class="data-item">{{item.total}}</li>
                    <li class="data-item">{{item.rose}}</li>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><span style="font-size:18px;">●</span> BTC交易</span>
              <div class="table">
                <ul class="th">
                  <li class="td">币种</li>
                  <li class="td">最新成交价</li>
                  <li class="td">24H成交量</li>
                  <li class="td">日涨跌</li>
                </ul>
                <div class="tbody" v-on:click="selectedCurrency">
                  <div :id="item.id" class="item" v-for="(item,index) in btcFilteredData" v-on:mouseover="hover"
                       v-on:click.stop="say(item.id,item.sellsymbol,item.buysymbol)">
                    <li class="data-item">{{item.sellsymbol}}/{{item.buysymbol}}</li>
                    <li class="data-item">{{item.price}}</li>
                    <li class="data-item">{{item.total}}</li>
                    <li class="data-item">{{item.rose}}</li>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><span style="font-size:18px;">●</span> FUC交易</span>
              <div class="table">
                <ul class="th">
                  <li class="td">币种</li>
                  <li class="td">最新成交价</li>
                  <li class="td">24H成交量</li>
                  <li class="td">日涨跌</li>
                </ul>
                <div class="tbody" v-on:click="selectedCurrency">
                  <div :id="item.id" class="item" v-for="(item,index) in fucFilteredData" v-on:mouseover="hover"
                       v-on:click.stop="say(item.id,item.sellsymbol,item.buysymbol)">
                    <li class="data-item">{{item.sellsymbol}}/{{item.buysymbol}}</li>
                    <li class="data-item">{{item.price}}</li>
                    <li class="data-item">{{item.total}}</li>
                    <li class="data-item">{{item.rose}}</li>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><span style="font-size: 10px;">★ </span>收藏</span>
              <div class="table">
                <ul class="th">
                  <li class="td">币种</li>
                  <li class="td">最新成交价</li>
                  <li class="td">24H成交量</li>
                  <li class="td">日涨跌</li>
                </ul>
                <div class="tbody">
                  <div class="item" v-for="(item,index) in currencyList" v-on:mouseover="hover">
                    <li class="data-item">{{item.name}}</li>
                    <li class="data-item">{{item.newestPrice}}</li>
                    <li class="data-item">{{item.tfDoneCunt}}</li>
                    <li class="data-item">{{item.upAndDown}}</li>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <input class="search-btn" type="text" name="" id="" v-bind:placeholder="$t('m.search')"><i
          class="el-icon-search search-icon"></i>
        </div>
        </el-collapse-transition>
      </div>
    </div>

    <!--交易-->
    <div class="deal-box">
      <div class="inner-box">
        <!--买入-->
        <div class="buy">
          <ul>
            <li>
              {{activeCoinInfo.sellsymbol}}余额: {{activeSellTotal}}
            </li>
            <li>
              最大可买：{{activeSellTotal/buyReferencePrice}}
            </li>
            <li>
              <!--参考单价：{{sell5[sell5.length-1].price}}-->
              参考单价：{{buyReferencePrice}}
            </li>
            <li>
              <ul class="buy-title">
                <li>买入价格（{{activeCoinInfo.sellsymbol}}）</li>
                <li>买入数量（{{activeCoinInfo.sellsymbol}}）</li>
                <li>金额（{{activeCoinInfo.sellsymbol}}）</li>
              </ul>
            </li>
            <li>
              <ul class="buy-content">
                <li><input type="text" v-model="buyReferencePrice" v-on:keyup="checkBalance(true,false)"></li>
                <li><input type="text" v-model="buyCount" v-on:keyup="checkBalance(true,false)"></li>
                <li><input type="text" disabled v-model="totalBuyAccount"></li>
              </ul>
            </li>
            <li>
              <el-slider :step="0.01" :max="activeSellTotal||100" input-size="mini"></el-slider>
              <div class="false-tips fz12 mt-5"><i v-show="buyErrorMsg"></i>{{buyErrorMsg}}</div>
            </li>
            <li>
              <router-link class="fff" to="/finance">立即充值 >></router-link>
            </li>
            <li>
              <input class="buy-btn" type="button" value="买入" v-on:click="showTradeWin(0)">
            </li>
          </ul>
        </div>
        <!--卖出-->
        <div class="sell">
          <ul>
            <li>
              {{activeCoinInfo.buysymbol}}余额：{{activeBuyTotal}}
            </li>
            <li>
              最大可卖：{{activeBuyTotal/sellReferencePrice}}
            </li>
            <li>
              参考单价：{{sellReferencePrice}}
            </li>
            <li>
              <ul class="buy-title">
                <li>卖出价格（{{activeCoinInfo.buysymbol}}）</li>
                <li>卖出数量（{{activeCoinInfo.buysymbol}}）</li>
                <li>金额（{{activeCoinInfo.buysymbol}}）</li>
              </ul>
            </li>
            <li>
              <ul class="buy-content">
                <li><input type="text" v-model="sellReferencePrice"
                           v-on:keyup="checkBalance(false,true,activeCoinInfo.buysymbol)"></li>
                <li><input type="text" v-model="sellCount"
                           v-on:keyup="checkBalance(false,true,activeCoinInfo.buysymbol)"></li>
                <li><input type="text" disabled v-model="totalSellAccount"></li>
              </ul>
            </li>
            <li>
              <el-slider v-model="currentCurrency01.totalPrice" :step="0.01" :max="activeBuyTotal||100"
                         input-size="mini"></el-slider>
              <div class="false-tips fz12 mt-5"><i v-show="sellErrorMsg"></i>{{sellErrorMsg}}</div>
            </li>
            <li>
              <!--<a class="fff" href="#">立即充值 >></a>-->
              <router-link class="fff" to="/finance">立即充值 >></router-link>
            </li>
            <li>
              <input class="sell-btn" type="button" value="卖出" v-on:click="showTradeWin(1)">
            </li>
          </ul>
        </div>
        <!--交易密码框-->
        <i class="dialog">
          <el-dialog title="交易密码" center :visible.sync="dialogFormVisible" class="dialog-contentinfo" width="35%">
            <el-form class="cent" label-width="120px" label-position="right">
              <el-form-item label="交易密码">
                <el-input class="input-info" v-model="tradePwd" placeholder="请输入交易密码"></el-input>
                <div class="false-tips fz12 mt-5"><i v-show="tradePwdErrorMsg"></i>{{tradePwdErrorMsg}}</div>

              </el-form-item>
              <el-form-item label="">
                <el-button size="mini" class="buttomvote" v-on:click="submitTradePwd">确定</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </i>
        <!--价格-->
        <div class="price">
          <ul>
            <li class="price-title">
              <ul>
                <li>买/卖</li>
                <li>价格</li>
                <li>委托量</li>
                <li>比例</li>
              </ul>
            </li>
            <li class="sell-one">
              <ul v-for="(item,index) in sell5">
                <li>卖{{sell5.length-index}}</li>
                <li>{{item.price}}</li>
                <li>{{item.amount}}</li>
                <li>
                  <span :amount="item.amount" class="sell-proportion"
                        v-bind:style="{width:item.amount/sell5Max*100+'%'}"></span>
                </li>
              </ul>
              <div class="empty tc lh100" v-show="sell5.length==0">
                暂无数据
              </div>
            </li>
            <div class="middle-line"></div>
            <li class="buy-one">
              <ul v-for="(item,index) in buy5">
                <li>买{{index+1}}</li>
                <li>{{item.price}}</li>
                <li>{{item.amount}}</li>
                <li>
                  <span class="buy-proportion" v-bind:style="{width:item.amount/buy5Max*100+'%'}"></span>
                </li>
              </ul>
              <div class="empty tc lh100" v-show="buy5.length==0">
                暂无数据
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--委托-->
    <div class="entrust">
      <el-tabs v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label">当前委托</span>
          <div class="table">
            <ul class="th">
              <li class="td">时间</li>
              <li class="td">类型</li>
              <li class="td">来源</li>
              <li class="td">委托价格</li>
              <li class="td">委托数量</li>
              <li class="td">成交额</li>
              <li class="td">手续费</li>
              <li class="td">状态</li>
              <li class="td">操作</li>
            </ul>
            <div class="tbody" v-show="entrutsCur.length!=0">
              <ul class="item" v-for="(item,index) in entrutsCur.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-on:mouseover="hover">
                <li class="data-item">{{item.time}}</li>
                <li class="data-item">{{item.types}}</li>
                <li class="data-item">{{item.source}}</li>
                <li class="data-item">{{item.buysymbol}}{{item.price}}</li>
                <li class="data-item">{{item.sellsymbol}}{{item.count}}</li>
                <li class="data-item">{{item.successamount}}</li>
                <li class="data-item">{{item.fees}}</li>
                <li class="data-item">{{item.status}}</li>
                <li class="data-item"><span class="cp blue" v-on:click="cancelEntruts(item.id)">取消</span></li>
              </ul>
              <div>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pagesize"
                  layout="prev, pager, next"
                  background
                  :total="entrutsCur.length">
                </el-pagination>

                <!--第 <span>{{curStartNum}}</span> 页-->
                <!--<span>上一页</span>-->
                <!--<span>下一页</span>-->
              </div>
            </div>

            <div class="tbody lh100" v-show="entrutsCur.length==0">
              暂无记录
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">历史委托</span>
          <div class="table">
            <ul class="th">
              <li class="td">时间</li>
              <li class="td">类型</li>
              <li class="td">来源</li>
              <li class="td">委托价格</li>
              <li class="td">委托数量</li>
              <li class="td">成交额</li>
              <li class="td">手续费</li>
              <li class="td">状态</li>
              <li class="td">操作</li>
            </ul>
            <div class="tbody" v-show="entrutsHis.length!=0">
              <ul class="item" v-for="(item,index) in entrutsHis.slice((currentPageHis-1)*pagesizeHis,currentPageHis*pagesizeHis)" v-on:mouseover="hover">
                <li class="data-item">{{item.time}}</li>
                <li class="data-item">{{item.types}}</li>
                <li class="data-item">{{item.source}}</li>
                <li class="data-item">{{item.buysymbol}}{{item.price}}</li>
                <li class="data-item">{{item.sellsymbol}}{{item.count}}</li>
                <li class="data-item">{{item.successamount}}</li>
                <li class="data-item">{{item.fees}}</li>
                <li class="data-item">{{item.status}}</li>
                <li class="data-item">{{item.todos}}</li>
              </ul>
              <div>
                <el-pagination
                  @size-change="handleSizeChangeHis"
                  @current-change="handleCurrentChangeHis"
                  :current-page="currentPageHis"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pagesizeHis"
                  layout="prev, pager, next"
                  background
                  :total="entrutsCur.length">
                </el-pagination>
              </div>
            </div>
            <div class="tbody lh100" v-show="entrutsHis.length==0">
              暂无记录
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
    <Customer></Customer>
  </div>
</template>
<script>
  import common from "../kits/domain"
  import {ajax} from "../kits/http"
  import Header from "./header.vue";
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

  //在线客服
  import Customer from './subcom/customer_service'
  import tips from './subcom/friendlyTips'//友情提示
  export default {
    data() {
      return {
        activeName: 'first',
        currentCurrency01: {
          name: 'FUC',//币种
          count: 0,//数量
          maxBuy: 0,//最大可买
          referencePrice: 0.00000254,//参考单价
          buyPrice: 0,//买入价格
          buyCount: 0,//买入数量
          totalPrice: this.buyPrice * this.buyCount || 0,//总金额
        },
        currentCurrency02: {
          name: 'FBT',//币种
          count: 0,//数量
          maxBuy: 0,//最大可买
          referencePrice: 0.00000254,//参考单价
          buyPrice: 0,//买入价格
          sellPrice: 0,//买入数量
          totalPrice: this.buyPrice * this.buyCount || 0,//总金额
        },
        curListIsShow: false,//币种选择框显示状态
        curDescIsShow: false,//币种资料框显示状态
        userBalance: 9977,//用户余额
        userBuyCount: 0,//用户买入数量
        userBuyTotal: this.userBuyPrice * this.userBuyCount || 0,//总价

        //卖列表
        currentEntrustList: [
          {
            date: '18-02-27 10:53:48',
            type: '买单',
            price: '0.090FBT',
            count: '300.00FUC',
            doneCount: '0FBT',
            status: '未成交',
            todos: '撤销'
          },
          {
            date: '18-02-27 10:53:48',
            type: '买单',
            price: '0.090FBT',
            count: '300.00FUC',
            doneCount: '0FBT',
            status: '未成交',
            todos: '撤销'
          }
        ],
        //所有币种列表
        currencyList: [],
        //部分行情数据展示
        activeCoinInfo: {},
        //买卖
        business: [],
        newarr: [],
        //比例显示
        total: 0,
        activeBuyTotal: 0,//当前选中买币种用户资金总额
        activeSellTotal: 0,//当前卖币种用户资金总额
        buy5: [],//买1-买5
        buy5Max: 0,//买1-买5委托量最大值
        sell5: [],//卖1-卖5
        sell5Max: 0,//卖1-卖5委托量最大值
        buyReferencePrice: 0,//参考卖价,
        sellReferencePrice: 0,//参考买价
        buyCount: 0,//买入数量
        sellCount: 0,//卖出数量
        activeSellTotalModel: this.buyCount * this.buyReferencePrice,//滑块初始化
        buyErrorMsg: '',//购买错误信息
        sellErrorMsg: '',//卖出错误信息


        //交易密码弹窗
        dialogFormVisible: false,//弹窗状态
        tradePwd: '',//交易密码
        tradePwdErrorMsg: '',//交易密码错误信息
        tradeType: 0,//交易类型,0 :买入，1：卖出

        // 委单记录
        entrutsHis: [],//历史委单
        entrutsCur: [],//当前委单
        currentPage:1,//当前委单当前页
        pagesize:5,//当前委单每页显示数据数量
        currentPageHis:1,//历史委单当前页
        pagesizeHis:5,//历史委单当前页
      }
    },
    filters: {
      // buyFilter(value){
      //   return buyReferencePrice
      // }
    },
    methods: {
      //显示隐藏币种选择框
      toggleCurList() {
        // this.isShow = !this.isShow;
        this.curListIsShow = !this.curListIsShow;
      },
      toggleCurDesc() {

      },
      formatTooltip(val) {
        return val;
        // return this.userBalance/val*100 ;
      },
      hover(e) {
        for (var i = 0; i < e.target.parentNode.parentNode.children.length; i++) {
          e.target.parentNode.parentNode.children[i].classList.remove('active');
        }
        e.target.parentNode.classList.add('active')
      },
      //切换币种列表显示隐藏
      selectedCurrency(e) {
        let curName = e.target.parentNode.dataset.curName;
        this.curListIsShow = false;
      },
      // 所有币种列表
      say: function (id, sellName, buyName) {
        this.sell5Max = 0;
        this.buy5Max = 0;
        this.getMarket().then((res) => {
          this.currencyList = res.data.data;

          this.currencyList.forEach((item, index) => {
            if (item.id == id) {
              // console.log(item.id)
              //单个列表数据
              this.activeCoinInfo = item;
            }
          })
          //获取委单记录
          console.log(this.activeCoinInfo);
          this.renderEntrutsList(this.activeCoinInfo.id)
          // this.getEntruts().then((res) => {
          //   console.log(res);
          //   if (res.data.code !== 200) {
          //     return;
          //   }
          //   this.entrutsCur = res.data.data.entrutsCur;
          //   this.entrutsHis = res.data.data.entrutsHis;
          // });

          // 个人资产
          this.personalAsset.forEach((item, index) => {
            if (item.shortName == sellName) {
              this.activeSellTotal = item.total;

            }
            if (item.shortName == buyName) {
              this.activeBuyTotal = item.total;
            }
          })
        })
        //请求买一卖一数据
        this.getRealMarket(id).then((res) => {
          // console.log(res);`
          this.buy5 = res.data.data.buys;
          this.sell5 = res.data.data.sells;

          for (let i = 0; i < this.buy5.length; i++) {
            if (this.buy5[i].amount > this.buy5Max) {
              this.buy5Max = this.buy5[i].amount;
            }
          }
          for (let j = 0; j < this.sell5.length; j++) {
            if (this.sell5[j].amount > this.sell5Max) {
              this.sell5Max = this.sell5[j].amount;
            }
          }
          if (this.sell5[this.sell5.length - 1]) {
            this.buyReferencePrice = this.sell5[this.sell5.length - 1].price;

          }
          if (this.buy5[0]) {
            this.sellReferencePrice = this.buy5[0].price;

          }
          // console.log(this.sellReferencePrice);
        })


        this.curListIsShow = false;
      },
      //获取市场数据(币种)
      getMarket() {
        return new Promise((resolve, reject) => {
          let url = common.apidomain + 'real/indexmarket';
          ajax(url, 'get', {}, (res) => {
            resolve(res);
          })
        })
      },
      // 数据比例显示
      buys: function (amount) {
        this.businessbuys.forEach((item, index) => {
          this.total += item.amount;
        })
      },
      // 获取市场行情(卖1，买1)
      getRealMarket(tradeId) {
        return new Promise((resolve, reject) => {
          let currebyurl = common.apidomain + 'real/market';
          ajax(currebyurl, 'get', {
            symbol: tradeId,
            buysellcount: 5,
            successcount: 10,
          }, (res) => {
            resolve(res);
            // console.log(res);
            // this.business = res.data.data.trades;
            // this.newarr = this.business.slice(0,12);//截取的数据
            // this.buys();
          });
        })
      },
      //  检测用户余额是否不足购买
      checkBalance(buy, sell, coinName) {
        if (buy) {
          if (this.totalBuyAccount > this.activeSellTotal) {
            this.buyErrorMsg = '您的余额不足，请先充值';
            // return;
          } else {
            this.buyErrorMsg = '';
          }
        } else {
          if (this.totalSellAccount > this.activeBuyTotal) {
            this.sellErrorMsg = '您的' + coinName + '余额不足'
          } else {
            this.sellErrorMsg = ''
          }
        }
      },
      //显示支付密码弹窗
      showTradeWin(tradeType) {
        //未登陆，跳转到登陆页面
        if (!this.$store.state.isLogin) {
          this.$router.push({path: '/login'})
        }
        //未设置交易密码
        if (!this.$store.state.userInfo.ftradepassword) {

        }

        this.tradeType = tradeType;

        //买入
        if (!tradeType) {
          if (!this.buyCount) {
            this.buyErrorMsg = '请输入购买数量！';
            return;
          }
        } else {
          //  卖出
          if (!this.sellCount) {
            this.sellErrorMsg = '请输入卖出数量！';
            return;
          }
        }
        // console.log(this.activeCoinInfo);


        // fd.append('tradePwd',this.$s);
        // let data = {
        // tradeAmount: tradeAmount,//数量
        // tradePrice: tradeCnyPrice,//价格
        // tradePwd: tradePwd,//交易密码
        // symbol: this.activeCoinInfo.id,//交易对id
        // limited: limited
        // }

        this.tradePwdErrorMsg = '';
        this.dialogFormVisible = true;
      },
      //提交支付密码
      submitTradePwd() {
        if (!this.tradePwd) {
          this.tradePwdErrorMsg = '请输入交易密码！';
          return;
        }

        let fd = new FormData();
        fd.append('tradePwd', this.tradePwd);
        fd.append('symbol', this.activeCoinInfo.id);
        fd.append('limited', '');
        //买入
        if (!this.tradeType) {
          fd.append('tradeAmount', this.buyCount);
          fd.append('tradePrice', this.buyReferencePrice);
          let buyUrl = common.apidomain + 'trade/cny_buy';
          ajax(buyUrl, 'post', fd, (res) => {
            console.log(res);
            if (res.data.code !== 200) {
              this.buyErrorMsg = res.data.msg;
              return;
            } else {
              this.$store.commit('changeDialogInfo', res.data.msg);
            }
          })
        } else {
          //卖出
          fd.append('tradeAmount', this.sellCount);
          fd.append('tradePrice', this.sellReferencePrice);
          let sellUrl = common.apidomain + 'trade/cny_sell';
          ajax(sellUrl, 'post', fd, (res) => {
            console.log(res);
            if (res.data.code !== 200) {
              this.sellErrorMsg = res.data.msg;
              return;
            } else {
              this.$store.commit('changeDialogInfo', res.data.msg);
            }
          });
        }

        this.dialogFormVisible = false;
      },
      //  获取委单记录
      getEntruts(id) {
        return new Promise((resolve, reject) => {
          let entrutsUrl = common.apidomain + 'real/getEntruts';
          let fd = new FormData();
          // console.log(this.activeCoinInfo.id);
          fd.append('symbol', id);
          fd.append('count', 10000);
          ajax(entrutsUrl, 'post', fd, (res) => {
            resolve(res)
          })
        })
      },
      //渲染委单列表
      renderEntrutsList(id,startNum){
        this.getEntruts(id).then((res) => {
          console.log(res);
          if (res.data.code !== 200) {
            return;
          }
          this.entrutsCur = res.data.data.entrutsCur;
          this.entrutsHis = res.data.data.entrutsHis;
        });
      },
      //取消委单
      cancelEntruts(id) {
        let cancelEnUrl = common.apidomain + 'trade/cny_cancel';
        let fd = new FormData();
        fd.append('id', id);
        ajax(cancelEnUrl, 'post', fd, (res) => {
          console.log(res);
          if(res.data.code!==200){
            this.$store.commit('changeDialogInfo',res.data.msg);
            return;
          }
          this.renderEntrutsList(this.activeCoinInfo.id)
        });
      },
      //当前委单分页
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
    //  历史委单分页

      handleCurrentChangeHis(val) {
        this.multipleSelection = val;
      },
      handleSizeChangeHis(val) {
        this.pagesizeHis = val;
      },
      handleCurrentChangeHis(val) {
        this.currentPageHis = val;
      },
    },
    created() {
      this.getMarket().then((res) => {
        this.currencyList = res.data.data;
        this.say(this.currencyList[0].id, this.currencyList[0].sellsymbol, this.currencyList[0].buysymbol);

        //   this.activeCoinInfo = this.currencyList[0];
        //
        //   this.personalAsset.forEach((item, index) => {
        //     if (item.shortName == this.activeCoinInfo.sellsymbol) {
        //       this.activeCoinInfo.sellItem = item;
        //     }
        //     if (item.shortName == this.activeCoinInfo.buysymbol) {
        //       this.activeCoinInfo.buyItem = item;
        //     }
        //   })
        //   console.log(this.activeCoinInfo);
      })
      // 币种数据接口
      // var url = common.apidomain + 'real/indexmarket';
      // ajax(url, 'get', {}, (res) => {
      //   this.currencyList = res.data.data;
      //   console.log(this.currencyList);
      // this.say(this.currencyList[0].id,this.currencyList[0].sellsymbol,this.currencyList[0].buysymbol)
      // this.activeCoinInfo = this.currencyList[0];
      // });

      // 行情信息展示接口
      // var currebyurl = common.apidomain + 'real/market';
      // ajax(currebyurl,'get',{
      //   symbol:2,
      //   buysellcount:10,
      //   successcount:10,
      // },(res) => {
      //   console.log(res);
      //   // this.business = res.data.data.trades;
      //   // this.newarr = this.business.slice(0,12);//截取的数据
      //   // this.buys();
      // });
    },
    mounted() {
    },
    computed: {
      //总购买金额
      totalBuyAccount() {
        return this.buyCount * this.buyReferencePrice
      },
      //总卖出金额
      totalSellAccount() {
        return this.sellCount * this.sellReferencePrice
      },
      activeCount() {
        return this.activeSellTotalModel / this.buyReferencePrice
      },
      // buyCount(){
      // return this.activeBuyTotal/this.buyReferencePrice
      // },
      personalAsset() {
        return this.$store.state.personalAsset;
      },
      // 币种列表过滤
      fbtFilteredData: function () {
        return this.currencyList.filter(function (item) {
          return item['type'] == 2;
        });
      },
      btcFilteredData: function () {
        return this.currencyList.filter(function (item) {
          return item['type'] == 1;
        })
      },
      fucFilteredData: function () {
        return this.currencyList.filter(function (item) {
          return item['type'] == 3;
        })
      },
      // 买过滤
      businessbuys: function () {
        return this.newarr.filter(function (item) {
          return item['type'] == '买入';
        })
      },
      //卖过滤
      businesssell: function () {
        return this.newarr.filter(function (item) {
          return item['type'] == '卖出';
        })
      },

      // isLogin(){
      //   return this.$store.state.isLogin;
      // }
    },
    components: {
      Header,//头部
      Customer,//在线客服
      tips,//友情提示弹窗
      CollapseTransition,//动画收起
    }
  }
</script>
<style scoped>
  .currencyData {
    /*height:70px;*/
    /*line-height:70px;*/
    /*margin-top:100px;*/
    /*padding:0 100px;*/
    width: 1300px;
    margin: 0 auto;
    height: 70px;
    line-height: 70px;
    margin-top: 100px;
    /*padding:0 100px;*/
  }

  .currencyData .inner-box {
    background-color: #10172d;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .currencyList {
    padding: 0 10px;
    position: absolute;
    top: 71px;
    left: 0;
    width: 500px;
    height: 400px;
    line-height: 50px;
    background-color: #12182b;
    z-index: 100000;
    border: 1px solid #131a2c;
    /*overflow: auto;*/
  }

  /*遮挡elementui底边框*/
  .currencyList:before {
    position: absolute;
    top: 46px;
    left: 0;
    content: '';
    height: 4px;
    /*background-color:pink;*/
    background-color: #12192b;
    width: 100%;
    z-index: 100000000;

  }

  .chg-cur-btn, .cur-desc {
    cursor: pointer;
    height: 70px;
    margin: 0 30px;
  }

  .chg-cur-btn {
    font-weight: 700;

  }

  .cur-desc {
    margin-left: 30px;
  }

  .right ul li.fl {
    /*background-color: pink;*/
    height: 70px;
    line-height: 36px;
    padding: 0 30px;
  }

  .right ul li.fl span {
    display: block;
    height: 100%;
    /*line-height: 30px;*/
  }

  /*交易框（买入，卖出）*/
  .deal-box, .entrust {
    /*margin-top:20px;*/
    /*height:400px;*/
    /*padding:0 100px;*/
    /*text-align: left;*/
    width: 1300px;
    margin: 0 auto;
    margin-top: 15px;
    height: 400px;
    /*padding:0 100px;*/
    /*text-align: left;*/
  }

  .deal-box .inner-box {
    /*background-color: #10172d;*/
    display: flex;
    width: 100%;
    height: 100%;
  }

  .deal-box .inner-box > div {
    text-align: left;
    flex: 1;
    margin-right: 20px;
    height: 400px;
    padding: 30px;
    background-color: #10172d;
  }

  .deal-box .inner-box .price {
    margin-right: 0;
  }

  .buy-title, .buy-content {
    margin-top: 10px;
    display: flex;

  }

  .buy-content {
    position: relative;
  }

  .buy-content:before, .buy-content:after {
    content: '*';
    position: absolute;
    top: 2px;
    left: 29%;
  }

  .buy-content:after {
    content: '=';
    top: 0;
    left: 62%;
  }

  .buy ul li, .sell ul li {
    margin-bottom: 10px;
  }

  .buy-title li, .buy-content li {
    flex: 1;
    font-size: 12px;
  }

  .buy-content li input {
    border: 1px solid #fff;
    width: 80%;
    border-radius: 5px;
    text-align: center;
    padding: 0 10px;
  }

  /*买入按钮*/
  .buy-btn, .sell-btn {
    width: 100%;
    height: 40px;
    background-color: #fc6869;
    font-size: 14px;
    border-radius: 5px;
  }

  .sell-btn {
    background-color: #5fb761;
  }

  .sell-one, .buy-one {
    font-size: 12px;
    height: 150px;
    overflow: hidden;
  }

  .price-title ul, .buy-one ul, .sell-one ul {
    display: flex;
    height: 20px;
    margin-bottom: 10px;
  }

  .price-title ul li, .buy-one ul li, .sell-one ul li {
    text-align: center;
    flex: 2;
  }

  .buy-one ul li:last-child, .sell-one ul li:last-child {
    text-align: left;
  }

  .price-title ul li:first-child, .buy-one ul li:first-child, .sell-one ul li:first-child {
    flex: 1;
  }

  .buy-proportion, .sell-proportion {
    display: inline-block;
    line-height: 8px;
    height: 8px;
    background-color: #fa696c;
  }

  .sell-proportion {
    background-color: #5fb761;
  }

  /*分割线*/
  .middle-line {
    height: 1px;
    width: 100%;
    background-color: #fff;
    margin-bottom: 10px;
  }

  .th {
    display: flex;
    background-color: #0e1328;
  }

  .th .td {
    flex: 1;
    height: 40px;
    line-height: 40px;
    color: #fff;
  }

  .tbody {
  }

  .tbody .item {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #10172d;
    color: #fff;
  }

  /*各行变色*/
  .tbody .item:nth-child(odd) {
    background-color: #485283;
  }

  .tbody .item.active {
    background-color: #4c99cf;
  }

  .tbody .item .data-item {
    flex: 1;
  }

  /*币种列表*/
  .currencyList .tbody {
    max-height: 400px;
    overflow: auto;
    background-color: green;
  }

  .dialog {
    font-style: normal;
  }

  .search-btn {
    position: absolute;
    right: 10px;
    top: 15px;
    width: 100px;
    border: 1px solid #fff;
    border-radius: 25px;
    box-sizing: border-box;
    padding: 0 20px;
    color: #fff;
    text-align: center;
  }

  .search-icon {
    position: absolute;
    right: 80px;
    top: 17px;
  }
</style>

