<template>
  <div class="content pr">
    <Customer></Customer>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <!--全部-->
      <el-tab-pane name="1">
        <span slot="label">{{$t('m.all')}}</span>
        <div class="table" v-if="activeName === '1'">
          <el-table
            align="left"
            v-loading="loadingArr[0]"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="filteredData"
          >
            <!--市场-->
            <el-table-column
              :label="$t('m.pairs')"
              align="left"
            >
              <template slot-scope="scope">
                  <span class="ml30">
                      <img :src="scope.row.image" alt="" class="bitIcon mr5">
                    {{ scope.row.sellsymbol }}
                    <i>/</i>
                    <span class="fw4 fz12">{{scope.row.buysymbol}}</span>
                  </span>
              </template>
            </el-table-column>

            <!--最新价格-->
            <el-table-column
              label="最新价格(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="data-item" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">
                  <span class="ml40">{{scope.row.price}}</span>
                  <transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">
                  <span v-show="upDownShow" class="animate pa">
                  <i v-show="scope.row.rose >0" class="iconfont icon-up fz12"></i>
                  </span>
                  </transition>
                  <transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">
                  <span v-show="upDownShow" class="animate pa">
                  <i v-show="scope.row.rose<0" class="iconfont icon-down fz12"></i>
                  </span>
                  </transition>
                </div>

              </template>
            </el-table-column>

            <!--买一-->
            <el-table-column
              label="买一(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50">{{scope.row.buy}}</div>
              </template>
            </el-table-column>
            <!--买一-->
            <el-table-column
              label="卖一(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50"> {{scope.row.sell}}</div>
              </template>
            </el-table-column>

            <!--成交量-->
            <el-table-column
              label="成交量"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50">
                  {{scope.row.total|keepTwoNum}}
                </div>
              </template>
            </el-table-column>

            <!--24小时涨跌-->
            <el-table-column
              label="24小时涨跌"
              align="left"
            >
              <template slot-scope="scope">
                <div class="data-item ml40" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">
                  <span v-show="scope.row.rose>0">+</span>{{scope.row.rose| keepTwoNum}}%
                </div>
              </template>
            </el-table-column>

            <!--6小时走势-->
            <el-table-column
              label="6小时走势"
              align="left"
              width="100"
            >
              <template slot-scope="scope">
              </template>
            </el-table-column>

            <!--收藏-->
            <el-table-column
              label="收藏"
              width="100"
            >
              <template slot-scope="scope">
                <i class="el-icon-star-on fz16" v-on:click="toggleLike(scope.row.id)"
                   v-bind:class="{'active':scope.row.isLike}">
                </i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!--BTC交易区-->
      <el-tab-pane name="2">
        <span slot="label">BTC交易区</span>
        <div class="table" v-if="activeName === '2'">
          <el-table
            align="left"
            v-loading="loadingArr[0]"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="btcFilteredData"
          >
            <!--市场-->
            <el-table-column
              :label="$t('m.pairs')"
              align="left"
            >
              <template slot-scope="scope">
                  <span class="ml30">
                      <img :src="scope.row.image" alt="" class="bitIcon mr5">
                    {{ scope.row.sellsymbol }}
                    <i>/</i>
                    <span class="fw4 fz12">{{scope.row.buysymbol}}</span>
                  </span>
              </template>
            </el-table-column>

            <!--最新价格-->
            <el-table-column
              label="最新价格(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="data-item" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">
                  <span class="ml40">{{scope.row.price}}</span>
                  <transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">
                  <span v-show="upDownShow" class="animate pa">
                  <i v-show="scope.row.rose >0" class="iconfont icon-up fz12"></i>
                  </span>
                  </transition>
                  <transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">
                  <span v-show="upDownShow" class="animate pa">
                  <i v-show="scope.row.rose<0" class="iconfont icon-down fz12"></i>
                  </span>
                  </transition>
                </div>

              </template>
            </el-table-column>

            <!--买一-->
            <el-table-column
              label="买一(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50">{{scope.row.buy}}</div>
              </template>
            </el-table-column>
            <!--买一-->
            <el-table-column
              label="卖一(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50"> {{scope.row.sell}}</div>
              </template>
            </el-table-column>

            <!--成交量-->
            <el-table-column
              label="成交量"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50">
                  {{scope.row.total|keepTwoNum}}
                </div>
              </template>
            </el-table-column>

            <!--24小时涨跌-->
            <el-table-column
              label="24小时涨跌"
              align="left"
            >
              <template slot-scope="scope">
                <div class="data-item ml40" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">
                  <span v-show="scope.row.rose>0">+</span>{{scope.row.rose| keepTwoNum}}%
                </div>
              </template>
            </el-table-column>

            <!--6小时走势-->
            <el-table-column
              label="6小时走势"
              align="left"
              width="100"
            >
              <template slot-scope="scope">
              </template>
            </el-table-column>

            <!--收藏-->
            <el-table-column
              label="收藏"
              width="100"
            >
              <template slot-scope="scope">
                <i class="el-icon-star-on fz22" v-on:click="toggleLike(scope.row.id)"
                   v-bind:class="{'active':scope.row.isLike}">
                </i>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label">FUC交易区</span>
        <div class="table" v-if="activeName === '3'">
          <el-table
            align="left"
            v-loading="loadingArr[0]"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="fbtFilteredData"
          >
            <!--市场-->
            <el-table-column
              :label="$t('m.pairs')"
              align="left"
            >
              <template slot-scope="scope">
                  <span class="ml30">
                      <img :src="scope.row.image" alt="" class="bitIcon mr5">
                    {{ scope.row.sellsymbol }}
                    <i>/</i>
                    <span class="fw4 fz12">{{scope.row.buysymbol}}</span>
                  </span>
              </template>
            </el-table-column>

            <!--最新价格-->
            <el-table-column
              label="最新价格(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="data-item" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">
                  <span class="ml40">{{scope.row.price}}</span>
                  <transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">
                  <span v-show="upDownShow" class="animate pa">
                  <i v-show="scope.row.rose >0" class="iconfont icon-up fz12"></i>
                  </span>
                  </transition>
                  <transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">
                  <span v-show="upDownShow" class="animate pa">
                  <i v-show="scope.row.rose<0" class="iconfont icon-down fz12"></i>
                  </span>
                  </transition>
                </div>

              </template>
            </el-table-column>

            <!--买一-->
            <el-table-column
              label="买一(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50">{{scope.row.buy}}</div>
              </template>
            </el-table-column>
            <!--买一-->
            <el-table-column
              label="卖一(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50"> {{scope.row.sell}}</div>
              </template>
            </el-table-column>

            <!--成交量-->
            <el-table-column
              label="成交量"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50">
                  {{scope.row.total|keepTwoNum}}
                </div>
              </template>
            </el-table-column>

            <!--24小时涨跌-->
            <el-table-column
              label="24小时涨跌"
              align="left"
            >
              <template slot-scope="scope">
                <div class="data-item ml40" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">
                  <span v-show="scope.row.rose>0">+</span>{{scope.row.rose| keepTwoNum}}%
                </div>
              </template>
            </el-table-column>

            <!--6小时走势-->
            <el-table-column
              label="6小时走势"
              align="left"
              width="100"
            >
              <template slot-scope="scope">
              </template>
            </el-table-column>
            <!--收藏-->
            <el-table-column
              label="收藏"
              width="100"
            >
              <template slot-scope="scope">
                <i class="el-icon-star-on fz22" v-on:click="toggleLike(scope.row.id)"
                   v-bind:class="{'active':scope.row.isLike}">
                </i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane name="4">
        <span slot="label">收藏</span>
        <div class="table" v-if="activeName === '4'">
          <el-table
            align="left"
            v-loading="loadingArr[0]"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="likeList"
          >
            <!--市场-->
            <el-table-column
              :label="$t('m.pairs')"
              align="left"
            >
              <template slot-scope="scope">
                  <span class="ml30">
                      <img :src="scope.row.image" alt="" class="bitIcon mr5">
                    {{ scope.row.sellsymbol }}
                    <i>/</i>
                    <span class="fw4 fz12">{{scope.row.buysymbol}}</span>
                  </span>
              </template>
            </el-table-column>

            <!--最新价格-->
            <el-table-column
              label="最新价格(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="data-item" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">
                  <span class="ml40">{{scope.row.price}}</span>
                  <transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">
                  <span v-show="upDownShow" class="animate pa">
                  <i v-show="scope.row.rose >0" class="iconfont icon-up fz12"></i>
                  </span>
                  </transition>
                  <transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">
                  <span v-show="upDownShow" class="animate pa">
                  <i v-show="scope.row.rose<0" class="iconfont icon-down fz12"></i>
                  </span>
                  </transition>
                </div>

              </template>
            </el-table-column>

            <!--买一-->
            <el-table-column
              label="买一(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50">{{scope.row.buy}}</div>
              </template>
            </el-table-column>
            <!--买一-->
            <el-table-column
              label="卖一(***)"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50"> {{scope.row.sell}}</div>
              </template>
            </el-table-column>

            <!--成交量-->
            <el-table-column
              label="成交量"
              align="left"
            >
              <template slot-scope="scope">
                <div class="ml50">
                  {{scope.row.total|keepTwoNum}}
                </div>
              </template>
            </el-table-column>

            <!--24小时涨跌-->
            <el-table-column
              label="24小时涨跌"
              align="left"
            >
              <template slot-scope="scope">
                <div class="data-item ml40" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">
                  <span v-show="scope.row.rose>0">+</span>{{scope.row.rose| keepTwoNum}}%
                </div>
              </template>
            </el-table-column>

            <!--6小时走势-->
            <el-table-column
              label="6小时走势"
              align="left"
              width="100"
            >
              <template slot-scope="scope">
              </template>
            </el-table-column>

            <!--收藏-->
            <el-table-column
              label="收藏"
              width="100"
            >
              <template slot-scope="scope">
                <i class="el-icon-star-on fz22" v-on:click="toggleLike(scope.row.id)"
                   v-bind:class="{'active':scope.row.isLike}">
                </i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="search-box pa">
      <el-input class="" v-bind:placeholder="$t('m.search')" v-model="sName">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
  </div>
</template>
<script>
  import common from "../../kits/domain.js";
  import {ajax} from "../../kits/http.js";
  //在线客服
  import Customer from './customer_service'

  export default {
    data() {
      return {
        activeName: '1',
        value: '',
        sName: '',//搜索过滤
        upDownShow: false,//涨跌箭头状态
        timer: '',//定时器
        // loadingArr: [true, false, false, false],
        loadingArr: [true, false, false, false],
        likeList: [],//收藏列表
        marketList: [],//市场信息
        localMarketList: JSON.parse(localStorage.getItem("localMarketList")) || [],//本地市场信息
      }
    },
    methods: {
      hover(e) {
        for (var i = 0; i < e.target.parentNode.parentNode.children.length; i++) {
          e.target.parentNode.parentNode.children[i].classList.remove('active');
        }
        e.target.parentNode.classList.add('active')
      },

      reflashMarket() {
        // console.log(this.$store.state.marketList);
        this.dataList = this.$store.state.marketList;
        // console.log(this.dataList);
      },

      toggleUpDownShow() {
        this.upDownShow = !this.upDownShow;
      },
      //动画
      beforeEnterDown(el) {
        el.style = "padding-top:-5px";
        // el.style.opacity = "1";
      },
      enterDown(el, done) {
        el.offsetWidth;
        el.style.paddingTop = "5px";
        el.style.opacity = "0";
        done();
      },
      afterEnterDown(el) {
        // this.upDownShow = false;
        this.isShow = !this.isShow;
      },
      //动画
      beforeEnterUp(el) {
        el.style = "margin-top:5px";
        // el.style.opacity = "1";
      },
      enterUp(el, done) {
        el.offsetWidth;
        el.style.marginTop = "-5px";
        el.style.opacity = "0";
        done();
      },
      afterEnterUp(el) {
        // this.upDownShow = false;
        // this.isShow = !this.isShow;
      },
      //tab栏切换
      changeTab(tab, event) {
      },
      //  切换收藏
      toggleLike(id) {
        console.log(id);
        let count = 0;
        //切换收藏
        this.marketList.forEach((item, index) => {
          if (item.id == id) {
            item.isLike = !item.isLike;
          }
        })
        this.likeList.forEach((item, index) => {
          //如果存在就删除
          if (item.id == id) {
            count++;
            this.likeList.splice(index, 1);

            return;
          }
        })

        this.marketList.forEach((item, index) => {
          if (item.id == id && count == 0) {
            this.likeList.push(item);
          }
        })
        localStorage.setItem('localMarketList', JSON.stringify(this.marketList));
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
    },
    computed: {
      filteredData: function () {
        var self = this;
        return this.marketList.filter(function (item) {
          return item['sellname'].indexOf((self.sName).toLocaleUpperCase()) !== -1;
        })
      },
      fbtFilteredData: function () {
        return this.filteredData.filter(function (item) {
          return item['type'] == 2;
        })
      },
      btcFilteredData: function () {
        return this.filteredData.filter(function (item) {
          return item['type'] == 1;
        })
      },
    },
    created() {
      this.localMarketList.forEach((item, index) => {
        if (item.isLike) {
          this.likeList.push(item);
        }
      });
      //获取市场数据
      this.getMarket().then((res) => {
        if (res.data.code !== 200) {
          return;
        }
        if (this.localMarketList.length !== 0) {
          //添加收藏
          res.data.data.forEach((item, index) => {

            //添加本地数据存储中的收藏
            if (item.id == this.localMarketList[index].id) {
              item.isLike = this.localMarketList[index].isLike || 0;
            }

          })
        } else {
          res.data.data.forEach((item, index) => {
            item.isLike = 0;
          });
        }

        this.marketList = res.data.data;
        this.loadingArr[0] = false;
        localStorage.setItem('localMarketList', JSON.stringify(res.data.data));
        this.$store.commit('getMarket', res.data.data);

      })

      //加载收藏列表


      // this.timer = setInterval(this.toggleUpDownShow, 1000);
      // this.timer = setInterval(this.reflashMarket, 10000000);

    },
    mounted() {
    },
    components: {
      Customer
    }
  }
</script>
<style scoped>
  .animate {
    /*transition:all 1.5s;*/
    transition-property: all;
    transition-duration: 1.5s;
    transition-timing-function: linear;
  }

  .search-btn {
    position: absolute;
    right: 100px;
    top: 10px;
    width: 100px;
    border: 1px solid #fff;
    border-radius: 25px;
    box-sizing: border-box;
    padding: 0 20px;
    color: #fff;
  }

  .search-icon {
    position: absolute;
    right: 180px;
    top: 12px;
  }

  .table {
    font-weight: 700;
    min-height: 300px;
  }

  .th {
    display: flex;
    background-color: #272b41;
    /*text-align: left;*/
    /*margin-left:30px;*/
  }

  .th .td {
    flex: 1;
    height: 40px;
    line-height: 40px;
    color: #fff;
  }

  .tbody .item {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #212537;
    color: #fff;
    border-bottom: .5px solid #fff;
  }

  /*各行变色*/
  .tbody .item:nth-child(odd) {
    /*background-color: #485283;*/
  }

  .tbody .item.active {
    background-color: #1b1f2e;
  }

  .tbody .item .data-item {
    flex: 1;
    /*background-color: pink;*/
    /*margin-left:30px;*/
    text-align: left;
    /*text-align: left;*/
  }

  .tbody .item .data-item img {
    /*display:inline-block !important;*/
    display: inline-block;
    width: 16px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .data-item.up {
    color: #ac4f55;
  }

  .data-item.down {
    color: #598f66;
  }

  .data-item.active {
  }

  .icon-shoucang {
    color: #bfbfbf;
    cursor: pointer;
  }

  .icon-shoucang.active {
    color: #f4ea2a;
  }

  .no-data {
    line-height: 200px;
  }

  .content {
    /*/ / 增加此样式 width: 1300 px;*/
    margin: 0 auto;
    padding-bottom: 70px;
  }

  .animate {
    /*top: -10px;*/
  }

  .search-box {
    width: 150px;
    overflow: hidden;
    right: 0;
    top: 6px;
    height: 25px;
    box-sizing: border-box;
    padding: 0;
  }


</style>
