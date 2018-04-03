<template>
  <div class="content">
    <el-tabs v-model="activeName">
      <!--全部-->
      <el-tab-pane name="first">
        <span slot="label">{{$t('m.all')}}</span>
        <div class="table">
          <ul class="th">
            <li class="td">{{$t('m.pairs')}}</li>
            <li class="td">{{$t('m.latestprice')}}(FBT)</li>
            <li class="td">买一(FBT)</li>
            <li class="td">卖一(FBT)</li>
            <li class="td">{{$t('m.tfHVolume')}}</li>
            <li class="td">{{$t('m.change')}}</li>
            <li class="td">{{$t('m.sixChange')}}</li>
            <li class="td">{{$t('m.like')}}</li>
          </ul>
          <div class="tbody">
            <div class="item" v-for="(item,index) in filteredData" v-on:mouseover="hover">
              <li class="data-item"><img :src="item.image" alt="" class="ml30">{{item.sellsymbol}}/<span class="fw4">{{item.buysymbol}}</span>
              </li>
              <li class="data-item"><span class="ml40">{{item.price}}</span></li>
              <li class="data-item"><span class="ml50">{{item.buy}}</span></li>
              <li class="data-item"><span class="ml50">{{item.sell}}</span></li>
              <li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>
              <li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">
                <span class="ml50">{{item.rose*100| keepTwoNum}}%</span>
              </li>
              <li class="data-item"></li>
              <li class="data-item">
                <i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"
                   v-on:click="toggleCollection(index)">
                </i>
              </li>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!--BTC交易区-->
      <el-tab-pane label="" name="third">
        <span slot="label">BTC {{$t('m.tradingArea')}}</span>
        <div class="table">
          <ul class="th">
            <li class="td">{{$t('m.pairs')}}</li>
            <li class="td">{{$t('m.latestprice')}}(FBT)</li>
            <li class="td">买一(FBT)</li>
            <li class="td">卖一(FBT)</li>
            <li class="td">{{$t('m.tfHVolume')}}</li>
            <li class="td">{{$t('m.change')}}</li>
            <li class="td">{{$t('m.sixChange')}}</li>
            <li class="td">{{$t('m.like')}}</li>
          </ul>
          <div class="tbody">
            <div class="item" v-for="(item,index) in btcFilteredData" v-on:mouseover="hover">
              <li class="data-item"><img :src="item.image" alt="" class="ml30">{{item.sellsymbol}}/<span class="fw4">{{item.buysymbol}}</span>
              </li>
              <li class="data-item"><span class="ml40">{{item.price}}</span></li>
              <li class="data-item"><span class="ml50">{{item.buy}}</span></li>
              <li class="data-item"><span class="ml50">{{item.sell}}</span></li>
              <li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>
              <li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">
                <span class="ml50">{{item.rose*100| keepTwoNum}}%</span>
              </li>
              <li class="data-item"></li>
              <li class="data-item">
                <i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"
                   v-on:click="toggleCollection(index)">
                </i>
              </li>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!--FBT交易区-->
      <el-tab-pane name="second">
        <span slot="label">FBT {{$t('m.tradingArea')}}</span>
        <div class="table">
          <ul class="th">
            <li class="td">{{$t('m.pairs')}}</li>
            <li class="td">{{$t('m.latestprice')}}(FBT)</li>
            <li class="td">买一(FBT)</li>
            <li class="td">卖一(FBT)</li>
            <li class="td">{{$t('m.tfHVolume')}}</li>
            <li class="td">{{$t('m.change')}}</li>
            <li class="td">{{$t('m.sixChange')}}</li>
            <li class="td">{{$t('m.like')}}</li>
          </ul>
          <div class="tbody">
            <div class="item" v-for="(item,index) in fbtFilteredData" v-on:mouseover="hover">
              <li class="data-item"><img :src="item.image" alt="" class="ml30">{{item.sellsymbol}}/<span class="fw4">{{item.buysymbol}}</span>
              </li>
              <li class="data-item"><span class="ml40">{{item.price}}</span></li>
              <li class="data-item"><span class="ml50">{{item.buy}}</span></li>
              <li class="data-item"><span class="ml50">{{item.sell}}</span></li>
              <li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>
              <li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">
                <span class="ml50">{{item.rose*100| keepTwoNum}}%</span>
              </li>
              <li class="data-item"></li>
              <li class="data-item">
                <i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"
                   v-on:click="toggleCollection(index)">
                </i>
              </li>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!--FUC交易区-->
      <!--<el-tab-pane label="" name="fourth">-->
        <!--<span slot="label">FUC {{$t('m.tradingArea')}}</span>-->
      <!--</el-tab-pane>-->
      <!--收藏-->
      <el-tab-pane label="" name="five">
        <span slot="label">{{$t('m.like')}}</span>
      </el-tab-pane>
    </el-tabs>
    <input class="search-btn" type="text" name="" id="" v-model="sName" v-bind:placeholder="$t('m.search')"><i
    class="el-icon-search search-icon"></i>
  </div>
</template>
<script>
  import common from "../../kits/domain.js";
  import {ajax} from "../../kits/http.js";


  export default {
    data() {
      return {
        activeName: 'first',
        value: '',
        sName: '',//搜索过滤
        dataList: [
          // {
          //   buy:0.18,//卖一
          //   // buysymbol:"FBT",//交易区
          //   id:2,
          //   image:'https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png',//币种图片
          //   market:'',
          //   recentQuotation:'0.2',
          //   sell:0.192,//卖一
          //   sellname:"FUC",//币种名称
          //   status:1,//状态
          //   tfHdone:'',//24h成交量
          //   rose:'',//涨跌
          //   type:2,//交易区代号
          //
          // }
          // {
          // buy:0.8
          // buysymbol:"BTC"
          // id:52
          // image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/d22bd34c20324d1086a839ceb0e34459FUBT.png"
          // price:0.8
          // rose:263.6363636
          // sell:0.122
          // sellname:"FBT"
          // sellsymbol:"FBT"
          // status:1
          // total:731.72
          // type:2
          // }
        ],
        collectionList: [],//收藏列表
      }
    },
    methods: {
      toggleCollection(index) {

        // this.dataList[0].isCollection = !this.dataList[0].isCollection
        // this.filteredData = this.dataList.filter((item,index)=>{
        //   return item['sellname'].indexOf((this.sName).toLocaleUpperCase()) !== -1;

        // })
        // this.filteredData[0].isCollection = !this.filteredData[0].isCollection
        // console.log(this.filteredData[0].isCollection);
      },
      hover(e) {
        // console.log(e.target);
        // console.dir(e.target.parentNode.parentNode.children);

        for (var i = 0; i < e.target.parentNode.parentNode.children.length; i++) {
          e.target.parentNode.parentNode.children[i].classList.remove('active');
        }
        e.target.parentNode.classList.add('active')

      }
    },
    computed: {
      filteredData: function () {
        var self = this;
        return this.dataList.filter(function (item) {
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
      var url = common.apidomain + 'real/indexmarket';
      ajax(url, 'get', {}, (res) => {
        // console.log(res);
        this.dataList = res.data.data;
        // this.dataList.forEach((item, index) => {
        //   item['isCollection'] = false;
        // })
      });
    }
  }
</script>
<style scoped>
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

  .tbody {
  }

  .tbody .item {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #212537;
    color: #fff;
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
</style>
