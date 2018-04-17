<template>
  <div class="content pr">
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
                  <span v-show="scope.row.rose>0">+</span>{{scope.row.rose*100| keepTwoNum}}%
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
                <i class="el-icon-star-on" v-on:click="toggleLike(scope.row.id)">
                  <!--v-bind:class="{'active':}"-->
                </i>
              </template>
            </el-table-column>

            <!--<ul class="th">-->
            <!--<li class="td">{{$t('m.pairs')}}</li>-->
            <!--<li class="td">{{$t('m.latestprice')}}(FBT)</li>-->
            <!--<li class="td">买一(FBT)</li>-->
            <!--<li class="td">卖一(FBT)</li>-->
            <!--<li class="td">{{$t('m.tfHVolume')}}</li>-->
            <!--<li class="td">{{$t('m.change')}}</li>-->
            <!--<li class="td">{{$t('m.sixChange')}}</li>-->
            <!--<li class="td">{{$t('m.like')}}</li>-->
            <!--</ul>-->

            <!--<div class="tbody" v-show="filteredData.length!=0">-->
            <!--<div class="item" v-for="(item,index) in filteredData" v-on:mouseover="hover">-->

            <!--<li class="data-item">-->
            <!--<img :src="item.image" alt="" class="ml30">-->
            <!--<span> {{item.sellsymbol}}</span>-->
            <!--<i>/</i>-->
            <!--<span class="fw4 fz12">{{item.buysymbol}}</span>-->
            <!--</li>-->

            <!--<li class="data-item pr" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">-->
            <!--<span class="ml40">{{item.price}}</span>-->

            <!--<transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">-->
            <!--<span v-show="upDownShow" class="animate pa">-->
            <!--<i v-show="item.rose >0" class="iconfont icon-up fz12"></i>-->
            <!--</span>-->
            <!--</transition>-->

            <!--<transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">-->
            <!--<span v-show="upDownShow" class="animate pa">-->
            <!--<i v-show="item.rose <0" class="iconfont icon-down fz12"></i>-->
            <!--</span>-->
            <!--</transition>-->

            <!--</li>-->

            <!--<li class="data-item"><span class="ml50">{{item.buy}}</span></li>-->
            <!--<li class="data-item"><span class="ml50">{{item.sell}}</span></li>-->
            <!--<li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>-->
            <!--<li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">-->
            <!--<span class="ml50"><span v-show="item.rose>0">+</span>{{item.rose*100| keepTwoNum}}%</span>-->
            <!--</li>-->
            <!--<li class="data-item"></li>-->
            <!--<li class="data-item">-->
            <!--<i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"-->
            <!--v-on:click="toggleCollection(index)">-->
            <!--</i>-->
            <!--</li>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="no-data" v-show="filteredData.length==0">暂无数据</div>-->
          </el-table>

        </div>
      </el-tab-pane>

      <!--BTC交易区-->
      <el-tab-pane name="2">
        <span slot="label">{{$t('m.all')}}</span>
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
                  <span v-show="scope.row.rose>0">+</span>{{scope.row.rose*100| keepTwoNum}}%
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
                <i class="el-icon-star-on" v-on:click="toggleLike(scope.row.id)">
                  <!--v-bind:class="{'active':}"-->
                </i>
              </template>
            </el-table-column>

            <!--<ul class="th">-->
            <!--<li class="td">{{$t('m.pairs')}}</li>-->
            <!--<li class="td">{{$t('m.latestprice')}}(FBT)</li>-->
            <!--<li class="td">买一(FBT)</li>-->
            <!--<li class="td">卖一(FBT)</li>-->
            <!--<li class="td">{{$t('m.tfHVolume')}}</li>-->
            <!--<li class="td">{{$t('m.change')}}</li>-->
            <!--<li class="td">{{$t('m.sixChange')}}</li>-->
            <!--<li class="td">{{$t('m.like')}}</li>-->
            <!--</ul>-->

            <!--<div class="tbody" v-show="filteredData.length!=0">-->
            <!--<div class="item" v-for="(item,index) in filteredData" v-on:mouseover="hover">-->

            <!--<li class="data-item">-->
            <!--<img :src="item.image" alt="" class="ml30">-->
            <!--<span> {{item.sellsymbol}}</span>-->
            <!--<i>/</i>-->
            <!--<span class="fw4 fz12">{{item.buysymbol}}</span>-->
            <!--</li>-->

            <!--<li class="data-item pr" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">-->
            <!--<span class="ml40">{{item.price}}</span>-->

            <!--<transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">-->
            <!--<span v-show="upDownShow" class="animate pa">-->
            <!--<i v-show="item.rose >0" class="iconfont icon-up fz12"></i>-->
            <!--</span>-->
            <!--</transition>-->

            <!--<transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">-->
            <!--<span v-show="upDownShow" class="animate pa">-->
            <!--<i v-show="item.rose <0" class="iconfont icon-down fz12"></i>-->
            <!--</span>-->
            <!--</transition>-->

            <!--</li>-->

            <!--<li class="data-item"><span class="ml50">{{item.buy}}</span></li>-->
            <!--<li class="data-item"><span class="ml50">{{item.sell}}</span></li>-->
            <!--<li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>-->
            <!--<li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">-->
            <!--<span class="ml50"><span v-show="item.rose>0">+</span>{{item.rose*100| keepTwoNum}}%</span>-->
            <!--</li>-->
            <!--<li class="data-item"></li>-->
            <!--<li class="data-item">-->
            <!--<i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"-->
            <!--v-on:click="toggleCollection(index)">-->
            <!--</i>-->
            <!--</li>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="no-data" v-show="filteredData.length==0">暂无数据</div>-->
          </el-table>

        </div>
      </el-tab-pane>

      <!--<el-tab-pane label="" name="2">-->
        <!--<span slot="label">BTC {{$t('m.tradingArea')}}</span>-->
        <!--<div class="table" v-if="activeName === '2'">-->
          <!--<el-table-->
            <!--v-loading="loadingArr[1]"-->
            <!--element-loading-background="rgba(0, 0, 0, 0.8)"-->
            <!--align="left"-->
            <!--:data="btcFilteredData"-->
          <!--&gt;-->
            <!--&lt;!&ndash;市场&ndash;&gt;-->
            <!--<el-table-column-->
              <!--:label="$t('m.pairs')"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                  <!--<span>-->
                      <!--<img :src="scope.row.image" alt="" class="bitIcon">-->
                    <!--{{ scope.row.sellsymbol }}-->
                    <!--<i>/</i>-->
                    <!--<span class="fw4 fz12">{{scope.row.buysymbol}}</span>-->
                  <!--</span>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;最新价格&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="最新价格"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--<div class="data-item" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">-->
                  <!--<span class="ml40">{{scope.row.price}}</span>-->
                  <!--<transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">-->
                  <!--<span v-show="upDownShow" class="animate pa">-->
                  <!--<i v-show="scope.row.rose >0" class="iconfont icon-up fz12"></i>-->
                  <!--</span>-->
                  <!--</transition>-->
                  <!--<transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">-->
                  <!--<span v-show="upDownShow" class="animate pa">-->
                  <!--<i v-show="scope.row.rose<0" class="iconfont icon-down fz12"></i>-->
                  <!--</span>-->
                  <!--</transition>-->
                <!--</div>-->

              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;买一&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="买一"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.buy}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--&lt;!&ndash;买一&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="卖一"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.sell}}-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;成交量&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="成交量"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.total|keepTwoNum}}-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;24小时涨跌&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="24小时涨跌"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--<div class="data-item" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">-->
                  <!--<span v-show="scope.row.rose>0">+</span>{{scope.row.rose*100| keepTwoNum}}%-->
                <!--</div>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;6小时走势&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="6小时走势"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;收藏&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="收藏"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--<i class="el-icon-star-on"></i>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;<ul class="th">&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.pairs')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.latestprice')}}(FBT)</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">买一(FBT)</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">卖一(FBT)</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.tfHVolume')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.change')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.sixChange')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.like')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;</ul>&ndash;&gt;-->

            <!--&lt;!&ndash;<div class="tbody" v-show="filteredData.length!=0">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="item" v-for="(item,index) in filteredData" v-on:mouseover="hover">&ndash;&gt;-->

            <!--&lt;!&ndash;<li class="data-item">&ndash;&gt;-->
            <!--&lt;!&ndash;<img :src="item.image" alt="" class="ml30">&ndash;&gt;-->
            <!--&lt;!&ndash;<span> {{item.sellsymbol}}</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<i>/</i>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="fw4 fz12">{{item.buysymbol}}</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</li>&ndash;&gt;-->

            <!--&lt;!&ndash;<li class="data-item pr" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="ml40">{{item.price}}</span>&ndash;&gt;-->

            <!--&lt;!&ndash;<transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">&ndash;&gt;-->
            <!--&lt;!&ndash;<span v-show="upDownShow" class="animate pa">&ndash;&gt;-->
            <!--&lt;!&ndash;<i v-show="item.rose >0" class="iconfont icon-up fz12"></i>&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</transition>&ndash;&gt;-->

            <!--&lt;!&ndash;<transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">&ndash;&gt;-->
            <!--&lt;!&ndash;<span v-show="upDownShow" class="animate pa">&ndash;&gt;-->
            <!--&lt;!&ndash;<i v-show="item.rose <0" class="iconfont icon-down fz12"></i>&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</transition>&ndash;&gt;-->

            <!--&lt;!&ndash;</li>&ndash;&gt;-->

            <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.buy}}</span></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.sell}}</span></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="ml50"><span v-show="item.rose>0">+</span>{{item.rose*100| keepTwoNum}}%</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item"></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item">&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"&ndash;&gt;-->
            <!--&lt;!&ndash;v-on:click="toggleCollection(index)">&ndash;&gt;-->
            <!--&lt;!&ndash;</i>&ndash;&gt;-->
            <!--&lt;!&ndash;</li>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="no-data" v-show="filteredData.length==0">暂无数据</div>&ndash;&gt;-->
          <!--</el-table>-->

        <!--</div>-->

        <!--&lt;!&ndash;<div class="table">&ndash;&gt;-->
        <!--&lt;!&ndash;<ul class="th">&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.pairs')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.latestprice')}}(FBT)</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">买一(FBT)</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">卖一(FBT)</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.tfHVolume')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.change')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.sixChange')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.like')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;</ul>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="tbody" v-show="btcFilteredData.length!=0">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="item" v-for="(item,index) in btcFilteredData" v-on:mouseover="hover">&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><img :src="item.image" alt="" class="ml30">{{item.sellsymbol}}/<span class="fw4">{{item.buysymbol}}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><span class="ml40">{{item.price}}</span></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.buy}}</span></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.sell}}</span></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="ml50">{{item.rose*100| keepTwoNum}}%</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item">&ndash;&gt;-->
        <!--&lt;!&ndash;<i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"&ndash;&gt;-->
        <!--&lt;!&ndash;v-on:click="toggleCollection(index)">&ndash;&gt;-->
        <!--&lt;!&ndash;</i>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="no-data" v-show="filteredData.length==0">暂无数据</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</el-tab-pane>-->
      <!--FBT交易区-->

      <!--<el-tab-pane name="3">-->
        <!--<span slot="label">FBT {{$t('m.tradingArea')}}</span>-->
        <!--<div class="table" v-if="activeName === '3'">-->
          <!--<ul class="th">-->
            <!--<li class="td">{{$t('m.pairs')}}</li>-->
            <!--<li class="td">{{$t('m.latestprice')}}(FBT)</li>-->
            <!--<li class="td">买一(FBT)</li>-->
            <!--<li class="td">卖一(FBT)</li>-->
            <!--<li class="td">{{$t('m.tfHVolume')}}</li>-->
            <!--<li class="td">{{$t('m.change')}}</li>-->
            <!--<li class="td">{{$t('m.sixChange')}}</li>-->
            <!--<li class="td">{{$t('m.like')}}</li>-->
          <!--</ul>-->
          <!--<div class="tbody" v-show="btcFilteredData.length!=0">-->
            <!--<div class="item" v-for="(item,index) in fbtFilteredData" v-on:mouseover="hover">-->
              <!--<li class="data-item"><img :src="item.image" alt="" class="ml30">-->
                <!--<span class="fw7">{{item.sellsymbol}}</span>-->
                <!--<i class="ml5 mr5">/</i>-->
                <!--<span class="fw4">{{item.buysymbol}}</span>-->
              <!--</li>-->
              <!--<li class="data-item"><span class="ml40">{{item.price}}</span></li>-->
              <!--<li class="data-item"><span class="ml50">{{item.buy}}</span></li>-->
              <!--<li class="data-item"><span class="ml50">{{item.sell}}</span></li>-->
              <!--<li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>-->
              <!--<li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">-->
                <!--<span class="ml50">{{item.rose*100| keepTwoNum}}%</span>-->
              <!--</li>-->
              <!--<li class="data-item"></li>-->
              <!--<li class="data-item">-->
                <!--<i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"-->
                   <!--v-on:click="toggleCollection(index)">-->
                <!--</i>-->
              <!--</li>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="no-data" v-show="fbtFilteredData.length==0">暂无数据</div>-->
        <!--</div>-->
      <!--</el-tab-pane>-->

      <el-tab-pane name="3">
        <span slot="label">{{$t('m.all')}}</span>
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
                  <span v-show="scope.row.rose>0">+</span>{{scope.row.rose*100| keepTwoNum}}%
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
                <i class="el-icon-star-on" v-on:click="toggleLike(scope.row.id)">
                  <!--v-bind:class="{'active':}"-->
                </i>
              </template>
            </el-table-column>

            <!--<ul class="th">-->
            <!--<li class="td">{{$t('m.pairs')}}</li>-->
            <!--<li class="td">{{$t('m.latestprice')}}(FBT)</li>-->
            <!--<li class="td">买一(FBT)</li>-->
            <!--<li class="td">卖一(FBT)</li>-->
            <!--<li class="td">{{$t('m.tfHVolume')}}</li>-->
            <!--<li class="td">{{$t('m.change')}}</li>-->
            <!--<li class="td">{{$t('m.sixChange')}}</li>-->
            <!--<li class="td">{{$t('m.like')}}</li>-->
            <!--</ul>-->

            <!--<div class="tbody" v-show="filteredData.length!=0">-->
            <!--<div class="item" v-for="(item,index) in filteredData" v-on:mouseover="hover">-->

            <!--<li class="data-item">-->
            <!--<img :src="item.image" alt="" class="ml30">-->
            <!--<span> {{item.sellsymbol}}</span>-->
            <!--<i>/</i>-->
            <!--<span class="fw4 fz12">{{item.buysymbol}}</span>-->
            <!--</li>-->

            <!--<li class="data-item pr" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">-->
            <!--<span class="ml40">{{item.price}}</span>-->

            <!--<transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">-->
            <!--<span v-show="upDownShow" class="animate pa">-->
            <!--<i v-show="item.rose >0" class="iconfont icon-up fz12"></i>-->
            <!--</span>-->
            <!--</transition>-->

            <!--<transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">-->
            <!--<span v-show="upDownShow" class="animate pa">-->
            <!--<i v-show="item.rose <0" class="iconfont icon-down fz12"></i>-->
            <!--</span>-->
            <!--</transition>-->

            <!--</li>-->

            <!--<li class="data-item"><span class="ml50">{{item.buy}}</span></li>-->
            <!--<li class="data-item"><span class="ml50">{{item.sell}}</span></li>-->
            <!--<li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>-->
            <!--<li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">-->
            <!--<span class="ml50"><span v-show="item.rose>0">+</span>{{item.rose*100| keepTwoNum}}%</span>-->
            <!--</li>-->
            <!--<li class="data-item"></li>-->
            <!--<li class="data-item">-->
            <!--<i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"-->
            <!--v-on:click="toggleCollection(index)">-->
            <!--</i>-->
            <!--</li>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="no-data" v-show="filteredData.length==0">暂无数据</div>-->
          </el-table>

        </div>
      </el-tab-pane>


      <!--FUC交易区-->
      <!--<el-tab-pane label="" name="fourth">-->
      <!--<span slot="label">FUC {{$t('m.tradingArea')}}</span>-->
      <!--</el-tab-pane>-->
      <!--收藏-->
      <!--<el-tab-pane label="" name="4">-->
        <!--<span slot="label">{{$t('m.like')}}</span>-->
        <!--<div class="table" v-if="activeName === '4'">-->
          <!--<el-table-->
            <!--v-loading="loadingArr[1]"-->
            <!--element-loading-background="rgba(0, 0, 0, 0.8)"-->
            <!--align="left"-->
            <!--:data="likeList"-->
          <!--&gt;-->
            <!--&lt;!&ndash;市场&ndash;&gt;-->
            <!--<el-table-column-->
              <!--:label="$t('m.pairs')"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                  <!--<span>-->
                      <!--<img :src="scope.row.image" alt="" class="bitIcon">-->
                    <!--{{ scope.row.sellsymbol }}-->
                    <!--<i>/</i>-->
                    <!--<span class="fw4 fz12">{{scope.row.buysymbol}}</span>-->
                  <!--</span>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;最新价格&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="最新价格"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--<div class="data-item" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">-->
                  <!--<span class="ml40">{{scope.row.price}}</span>-->
                  <!--<transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">-->
                  <!--<span v-show="upDownShow" class="animate pa">-->
                  <!--<i v-show="scope.row.rose >0" class="iconfont icon-up fz12"></i>-->
                  <!--</span>-->
                  <!--</transition>-->
                  <!--<transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">-->
                  <!--<span v-show="upDownShow" class="animate pa">-->
                  <!--<i v-show="scope.row.rose<0" class="iconfont icon-down fz12"></i>-->
                  <!--</span>-->
                  <!--</transition>-->
                <!--</div>-->

              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;买一&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="买一"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.buy}}-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--&lt;!&ndash;买一&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="卖一"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.sell}}-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;成交量&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="成交量"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.total|keepTwoNum}}-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;24小时涨跌&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="24小时涨跌"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--<div class="data-item" v-bind:class="{'up':scope.row.rose>0,'down':scope.row.rose<0}">-->
                  <!--<span v-show="scope.row.rose>0">+</span>{{scope.row.rose*100| keepTwoNum}}%-->
                <!--</div>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;6小时走势&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="6小时走势"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;收藏&ndash;&gt;-->
            <!--<el-table-column-->
              <!--label="收藏"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--<i class="el-icon-star-on"></i>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--&lt;!&ndash;<ul class="th">&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.pairs')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.latestprice')}}(FBT)</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">买一(FBT)</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">卖一(FBT)</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.tfHVolume')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.change')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.sixChange')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="td">{{$t('m.like')}}</li>&ndash;&gt;-->
            <!--&lt;!&ndash;</ul>&ndash;&gt;-->

            <!--&lt;!&ndash;<div class="tbody" v-show="filteredData.length!=0">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="item" v-for="(item,index) in filteredData" v-on:mouseover="hover">&ndash;&gt;-->

            <!--&lt;!&ndash;<li class="data-item">&ndash;&gt;-->
            <!--&lt;!&ndash;<img :src="item.image" alt="" class="ml30">&ndash;&gt;-->
            <!--&lt;!&ndash;<span> {{item.sellsymbol}}</span>&ndash;&gt;-->
            <!--&lt;!&ndash;<i>/</i>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="fw4 fz12">{{item.buysymbol}}</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</li>&ndash;&gt;-->

            <!--&lt;!&ndash;<li class="data-item pr" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="ml40">{{item.price}}</span>&ndash;&gt;-->

            <!--&lt;!&ndash;<transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">&ndash;&gt;-->
            <!--&lt;!&ndash;<span v-show="upDownShow" class="animate pa">&ndash;&gt;-->
            <!--&lt;!&ndash;<i v-show="item.rose >0" class="iconfont icon-up fz12"></i>&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</transition>&ndash;&gt;-->

            <!--&lt;!&ndash;<transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">&ndash;&gt;-->
            <!--&lt;!&ndash;<span v-show="upDownShow" class="animate pa">&ndash;&gt;-->
            <!--&lt;!&ndash;<i v-show="item.rose <0" class="iconfont icon-down fz12"></i>&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</transition>&ndash;&gt;-->

            <!--&lt;!&ndash;</li>&ndash;&gt;-->

            <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.buy}}</span></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.sell}}</span></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="ml50"><span v-show="item.rose>0">+</span>{{item.rose*100| keepTwoNum}}%</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item"></li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="data-item">&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"&ndash;&gt;-->
            <!--&lt;!&ndash;v-on:click="toggleCollection(index)">&ndash;&gt;-->
            <!--&lt;!&ndash;</i>&ndash;&gt;-->
            <!--&lt;!&ndash;</li>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="no-data" v-show="filteredData.length==0">暂无数据</div>&ndash;&gt;-->
          <!--</el-table>-->

        <!--</div>-->

        <!--&lt;!&ndash;<div class="table">&ndash;&gt;-->
        <!--&lt;!&ndash;<ul class="th">&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.pairs')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.latestprice')}}(FBT)</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">买一(FBT)</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">卖一(FBT)</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.tfHVolume')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.change')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.sixChange')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="td">{{$t('m.like')}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;</ul>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="tbody" v-show="btcFilteredData.length!=0">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="item" v-for="(item,index) in btcFilteredData" v-on:mouseover="hover">&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><img :src="item.image" alt="" class="ml30">{{item.sellsymbol}}/<span class="fw4">{{item.buysymbol}}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><span class="ml40">{{item.price}}</span></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.buy}}</span></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.sell}}</span></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="ml50">{{item.rose*100| keepTwoNum}}%</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item"></li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="data-item">&ndash;&gt;-->
        <!--&lt;!&ndash;<i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"&ndash;&gt;-->
        <!--&lt;!&ndash;v-on:click="toggleCollection(index)">&ndash;&gt;-->
        <!--&lt;!&ndash;</i>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="no-data" v-show="filteredData.length==0">暂无数据</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</el-tab-pane>-->
      <el-tab-pane name="4">
        <span slot="label">{{$t('m.all')}}</span>
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
                  <span v-show="scope.row.rose>0">+</span>{{scope.row.rose*100| keepTwoNum}}%
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
                <i class="el-icon-star-on" v-on:click="toggleLike(scope.row.id)">
                  <!--v-bind:class="{'active':}"-->
                </i>
              </template>
            </el-table-column>

            <!--<ul class="th">-->
            <!--<li class="td">{{$t('m.pairs')}}</li>-->
            <!--<li class="td">{{$t('m.latestprice')}}(FBT)</li>-->
            <!--<li class="td">买一(FBT)</li>-->
            <!--<li class="td">卖一(FBT)</li>-->
            <!--<li class="td">{{$t('m.tfHVolume')}}</li>-->
            <!--<li class="td">{{$t('m.change')}}</li>-->
            <!--<li class="td">{{$t('m.sixChange')}}</li>-->
            <!--<li class="td">{{$t('m.like')}}</li>-->
            <!--</ul>-->

            <!--<div class="tbody" v-show="filteredData.length!=0">-->
            <!--<div class="item" v-for="(item,index) in filteredData" v-on:mouseover="hover">-->

            <!--<li class="data-item">-->
            <!--<img :src="item.image" alt="" class="ml30">-->
            <!--<span> {{item.sellsymbol}}</span>-->
            <!--<i>/</i>-->
            <!--<span class="fw4 fz12">{{item.buysymbol}}</span>-->
            <!--</li>-->

            <!--<li class="data-item pr" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">-->
            <!--<span class="ml40">{{item.price}}</span>-->

            <!--<transition @before-enter="beforeEnterUp" @enter="enterUp" @after-enter="afterEnterUp">-->
            <!--<span v-show="upDownShow" class="animate pa">-->
            <!--<i v-show="item.rose >0" class="iconfont icon-up fz12"></i>-->
            <!--</span>-->
            <!--</transition>-->

            <!--<transition @before-enter="beforeEnterDown" @enter="enterDown" @after-enter="afterEnterDown">-->
            <!--<span v-show="upDownShow" class="animate pa">-->
            <!--<i v-show="item.rose <0" class="iconfont icon-down fz12"></i>-->
            <!--</span>-->
            <!--</transition>-->

            <!--</li>-->

            <!--<li class="data-item"><span class="ml50">{{item.buy}}</span></li>-->
            <!--<li class="data-item"><span class="ml50">{{item.sell}}</span></li>-->
            <!--<li class="data-item"><span class="ml50">{{item.total|keepTwoNum}}</span></li>-->
            <!--<li class="data-item" v-bind:class="{'up':item.rose>0,'down':item.rose<0}">-->
            <!--<span class="ml50"><span v-show="item.rose>0">+</span>{{item.rose*100| keepTwoNum}}%</span>-->
            <!--</li>-->
            <!--<li class="data-item"></li>-->
            <!--<li class="data-item">-->
            <!--<i class="iconfont icon-shoucang ml70" v-bind:class="{'active':item.isCollection}"-->
            <!--v-on:click="toggleCollection(index)">-->
            <!--</i>-->
            <!--</li>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="no-data" v-show="filteredData.length==0">暂无数据</div>-->
          </el-table>

        </div>
      </el-tab-pane>

    </el-tabs>
    <!--<input class="search-btn" type="text" name="" id="" v-model="sName" v-bind:placeholder="$t('m.search')"><i-->
    <!--class="el-icon-search search-icon"></i>-->
    <div class="search-box pa">
      <el-input class=""
                v-bind:placeholder="$t('m.search')"
                v-model="sName">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
  </div>
</template>
<script>
  import common from "../../kits/domain.js";
  import {ajax} from "../../kits/http.js";

  export default {
    data() {
      return {
        activeName: '1',
        value: '',
        sName: '',//搜索过滤
        dataList: [
          {
            buy: 0.3123123,
            buysymbol: "FBT",
            id: 3,
            image: "https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",
            price: 0.3123123,
            rose: 1.2,
            sell: 0.3123123,
            sellname: "FUC",
            sellsymbol: "FUC",
            status: 1,
            total: 0,
            type: 1,
          },
          {
            buy: 0.123123,
            buysymbol: "FBT",
            id: 2,
            image: "https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",
            price: 0.121,
            rose: -1.2,
            sell: 0.123123,
            sellname: "FUC",
            sellsymbol: "FUC",
            status: 1,
            total: 0,
            type: 2,
          },
          {
            buy: 0.123,
            buysymbol: "gxc",
            id: 3,
            image: "https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png",
            price: 0.121,
            rose: -1.2,
            sell: 0.123123,
            sellname: "FUC",
            sellsymbol: "FUC",
            status: 1,
            total: 0,
            type: 3,
          }

          /*
          buy:0
          buysymbol:"FBT"
          id:2
          image:"https://fubt.oss-ap-southeast-1.aliyuncs.com/fubt/upload/coin/a7e56fc38ea44e1f8ed4c395193ec2e0组.png"
          price:0.3
          rose:0
          sell:0
          sellname:"FUC"
          sellsymbol:"FUC"
          status:1
          total:0
          type:2
          */
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

        upDownShow: false,//涨跌箭头状态
        timer: '',//定时器
        // loadingArr: [true, false, false, false],
        loadingArr: [false, false, false, false],
        likeList: [],//收藏列表
        activeLikeItem: {
          isLike: false,//是否收藏
          id: -1,//对应项id
        },//即将收藏或取消收藏的项
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

      },
      //  加载交易信息
      loadMarket() {
        return new Promise((resolve, reject) => {
            var url = common.apidomain + 'real/indexmarket';
            ajax(url, 'get', {}, (res) => {

              resolve(res);
              // this.dataList.forEach((item, index) => {
              //   item['isCollection'] = false;
              // })
            });
          }
        )
      },
      reflashMarket() {
        this.loadMarket().then((res) => {
          if (res.data.code !== 200) {
            return;
          } else {
            this.loadingArr[0] = false;
            this.dataList = res.data.data;

          }
        });
      },
      //清除定时器
      // clearTimer (timer){
      //   clearInterval(timer);
      // },
      //开启定时器
      // startTimer(){
      //   this.clearTimer(this.timer);
      //   this.timer = setInterval(this.toggleUpDownShow(),1000);
      //   // this.toggleUpDownShow();
      // },
      toggleUpDownShow() {
        this.upDownShow = !this.upDownShow;
        console.log(this.upDownShow);
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
        this.likeList.forEach((item, index) => {
          //如果存在就删除
          if (item.id == id) {
            count++;
            this.likeList.splice(index, 1);
            return;
          }
        })

        //全部
        if (this.activeName == '1') {
          console.log(count);
          this.filteredData.forEach((item, index) => {
            if (item.id == id && count == 0) {
              this.likeList.push(item);
            }
          })
        } else if (this.activeName == '2') {
          //  btc交易区
          this.btcFilteredData.forEach((item, index) => {
            if (item.id == id && count == 0) {
              this.likeList.push(item);
            }
          });
        } else if (this.activeName == '3') {
          //  fbt交易区
          this.fbtFilteredData.forEach((item, index) => {
            if (item.id == id && count == 0) {
              this.likeList.push(item);
            }
          })
          // console.log(this.likeList);
        }
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
      // this.timer = setInterval(this.toggleUpDownShow, 1000);
      // this.timer = setInterval(this.reflashMarket, 10000000);
      // this.reflashMarket();
    },
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

  .tbody {
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
  / / 增加此样式 width: 1300 px;
    margin: 0 auto;
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
