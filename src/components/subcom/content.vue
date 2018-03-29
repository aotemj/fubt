<template>
  <div class="content">
    <el-tabs v-model="activeName">
      <el-tab-pane name="first">
        <span slot="label">{{$t('m.all')}}</span>
        <!--<el-table fixed :data="dataList" max-height="500" style="width: 100%">-->
          <!--&lt;!&ndash;市场&ndash;&gt;-->
          <!--<el-table-column :label="$t('m.pairs')">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.sellsymbol}}/<span style="font-weight:400">{{scope.row.buysymbol}}</span></span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;最新价格&ndash;&gt;-->
          <!--<el-table-column label="最新价格(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.price}}</span>-->
            <!--</template>s-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;买一(FBT)&ndash;&gt;-->
          <!--<el-table-column label="买一(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.buy}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;卖一(FBT)&ndash;&gt;-->
          <!--<el-table-column label="卖一(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.sell}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;24H成交量&ndash;&gt;-->
          <!--<el-table-column label="24H成交量">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.total|keepTwoNum}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;24H涨跌&ndash;&gt;-->
          <!--<el-table-column label="24H涨跌" >-->
            <!--<template slot-scope="scope">-->
              <!--<span v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">{{scope.row.rose*100|keepTwoNum}}%</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
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
            <div class="item" v-for="(item,index) in dataList" v-on:mouseover="hover">
              <li class="data-item"><img :src="item.image" alt="">{{item.sellname}}/{{item.buysymbol}}</li>
              <li class="data-item">{{item.price}}</li>
              <li class="data-item">{{item.buy}}</li>
              <li class="data-item">{{item.sell}}</li>
              <li class="data-item">{{item.total|keepTwoNum}}</li>
              <li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">
                {{item.rose*100| keepTwoNum}}%
              </li>
              <li class="data-item"></li>
              <li class="data-item">
                <i class="iconfont icon-shoucang" v-bind:class="{'active':item.isCollection}" v-on:click="toggleCollection(index)">
                </i>
              </li>
            </div>
          </div>
        </div>
      </el-tab-pane>
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
            <div class="item" v-for="(item,index) in dataList" v-on:mouseover="hover">
              <li class="data-item"><img :src="item.image" alt="">{{item.sellname}}/{{item.buysymbol}}</li>
              <li class="data-item">{{item.price}}</li>
              <li class="data-item">{{item.buy}}</li>
              <li class="data-item">{{item.sell}}</li>
              <li class="data-item">{{item.total|keepTwoNum}}</li>
              <li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">
                {{item.rose*100| keepTwoNum}}%
              </li>
              <li class="data-item"></li>
              <li class="data-item">
                <i class="iconfont icon-shoucang" v-bind:class="{'active':item.isCollection}" v-on:click="toggleCollection(index)">
                </i>
              </li>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="" name="third">
        <span slot="label">BTC {{$t('m.tradingArea')}}</span>
        <!--<el-table fixed background-color="#545c64" :data="dataList" max-height="500" style="width: 100%">-->
          <!--&lt;!&ndash;市场&ndash;&gt;-->
          <!--<el-table-column :label="$t('m.pairs')">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.sellsymbol}}/<span style="font-weight:400">{{scope.row.buysymbol}}</span></span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;最新价格&ndash;&gt;-->
          <!--<el-table-column label="最新价格(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.price}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;买一(FBT)&ndash;&gt;-->
          <!--<el-table-column label="买一(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.buy}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;卖一(FBT)&ndash;&gt;-->
          <!--<el-table-column label="卖一(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.sell}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;24H成交量&ndash;&gt;-->
          <!--<el-table-column label="24H成交量">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.total|keepTwoNum}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;24H涨跌&ndash;&gt;-->
          <!--<el-table-column label="24H涨跌" >-->
            <!--<template slot-scope="scope">-->
              <!--<span v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">{{scope.row.rose*100|keepTwoNum}}%</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      </el-tab-pane>
      <el-tab-pane label="" name="fourth">
        <span slot="label">FUC {{$t('m.tradingArea')}}</span>
        <!--<el-table fixed background-color="#545c64" :data="dataList" max-height="500" style="width: 100%">-->
          <!--&lt;!&ndash;市场&ndash;&gt;-->
          <!--<el-table-column :label="$t('m.pairs')">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.sellsymbol}}/<span style="font-weight:400">{{scope.row.buysymbol}}</span></span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;最新价格&ndash;&gt;-->
          <!--<el-table-column label="最新价格(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.price}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;买一(FBT)&ndash;&gt;-->
          <!--<el-table-column label="买一(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.buy}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;卖一(FBT)&ndash;&gt;-->
          <!--<el-table-column label="卖一(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.sell}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;24H成交量&ndash;&gt;-->
          <!--<el-table-column label="24H成交量">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.total|keepTwoNum}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;24H涨跌&ndash;&gt;-->
          <!--<el-table-column label="24H涨跌" >-->
            <!--<template slot-scope="scope">-->
              <!--<span v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">{{scope.row.rose*100|keepTwoNum}}%</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      </el-tab-pane>
      <el-tab-pane label="" name="five">
        <span slot="label">{{$t('m.like')}}</span>
        <!--<el-table fixed background-color="#545c64" :data="dataList" max-height="500" style="width: 100%">-->
          <!--&lt;!&ndash;市场&ndash;&gt;-->
          <!--<el-table-column :label="$t('m.pairs')">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.sellsymbol}}/<span style="font-weight:400">{{scope.row.buysymbol}}</span></span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;最新价格&ndash;&gt;-->
          <!--<el-table-column label="最新价格(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.price}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;买一(FBT)&ndash;&gt;-->
          <!--<el-table-column label="买一(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.buy}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;卖一(FBT)&ndash;&gt;-->
          <!--<el-table-column label="卖一(FBT)" >-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.sell}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;24H成交量&ndash;&gt;-->
          <!--<el-table-column label="24H成交量">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.total|keepTwoNum}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--&lt;!&ndash;24H涨跌&ndash;&gt;-->
          <!--<el-table-column label="24H涨跌" >-->
            <!--<template slot-scope="scope">-->
              <!--<span v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">{{scope.row.rose*100|keepTwoNum}}%</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      </el-tab-pane>
    </el-tabs>
    <input class="search-btn" type="text" name="" id="" v-bind:placeholder="$t('m.search')"><i
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
        dataList: [
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },
          {
            buy:0.18,//卖一
            buysymbol:"FBT",//交易区
            id:2,
            image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",//币种图片
            price:0.184,//最新价格
            rose:1.5452538,//涨跌
            sell:0.192,//卖一
            sellname:"FUC",//
            sellsymbol:"FUC",//币种
            status:1,
            total:3337293.396,//24小时成交量
            type:2,//交易区代号
            //自己添加的属性
            isCollection:false
          },

        ],
        collectionList:[],//收藏列表
      }
    },
    methods: {
      toggleCollection(index) {
        this.dataList[index].isCollection = !this.dataList[index].isCollection
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
    computed: {},
    created() {
      // var url = common.apidomain+'real/indexmarket';
      // ajax(url,'get',{},(res)=>{
      // 	console.log(res);
      // 	this.dataList = res.data.data;
      // });
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
.table{
  font-weight: 700;
}
  .th {
    display: flex;
    background-color: #272b41;
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
    background-color:#212537;
    color: #fff;
  }

  /*各行变色*/
  .tbody .item:nth-child(odd) {
    /*background-color: #485283;*/
  }

  .tbody .item.active {
    background-color:#1b1f2e;
  }

  .tbody .item .data-item {
    flex: 1;
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
