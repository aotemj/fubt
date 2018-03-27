<template>
	<div class="con-box">
		<Header class="header"></Header>
		<!-- 币种资料 -->
		<div class="currencyData">
		  <div class="inner-box clearfix">
        <div class="left fl clearfix">
          <button class="chg-cur-btn fl" v-on:click="toggleCurList">{{currentCurrency01.name}}/{{currentCurrency02.name}}</button><i class="iconfont fl" v-bind:class="{'icon-xiala':!curListIsShow,'icon-shangla-copy':curListIsShow}"></i>
          <button class="cur-desc fl" v-on:click="toggleCurDesc"><i class= "iconfont icon-bianji"></i>币种资料</button>
        </div>
        <div class="right fr">
          <ul class="clearfix">
            <li class="fl today-max">
              今日最高
              <span>{{0.00000254}}</span>
            </li>
            <li class="fl today-min">
              今日最低
              <span>{{0.00000254}}</span>
            </li>
            <li class="fl tf-done-count">
              24小时成交量
              <span>{{0.00000254}}</span>
            </li>
            <li class="fl up-and-down">
              跌涨幅
              <span>{{0.00000254}}</span>
            </li>
            <li class="fl now-price">
              最新成交价
              <span>{{0.00000254}}</span>
            </li>
          </ul>
        </div>
      </div>
		</div>

    <!--交易-->
    <div class="deal-box">
      <div class="inner-box">
        <!--买入-->
        <div class="buy">
          <ul>
            <li>
              {{currentCurrency01.name}}余额：{{currentCurrency01.count | keepTwoNum}}
            </li>
            <li>
              最大可买：{{currentCurrency01.maxBuy}}
            </li>
            <li>
              参考单价：{{currentCurrency01.referencePrice}}
            </li>
            <li>
              <ul class="buy-title">
                <li>买入价格（FBT）</li>
                <li>买入数量（FUC）</li>
                <li>金额（FBT）</li>
              </ul>
            </li>
            <li>
              <ul class="buy-content">
                <li><input type="text" v-model="currentCurrency01.buyPrice"></li>
                <li><input type="text" v-model="currentCurrency01.buyCount"></li>
                <li><input type="text" disabled v-model="currentCurrency01.totalPrice"></li>
              </ul>
            </li>
            <li>
              <el-slider v-model="currentCurrency01.totalPrice" max.number="101" input-size="mini"></el-slider>
            </li>
            <li>
              <a class="fff" href="#">立即充值 >></a>
            </li>
            <li>
              <input class="buy-btn" type="button" value="买入">
            </li>
          </ul>
        </div>
        <!--卖出-->
        <div class="sell">
          <ul>
            <li>
              {{currentCurrency01.name}}余额：{{currentCurrency01.count | keepTwoNum}}
            </li>
            <li>
              最大可卖：{{currentCurrency01.maxBuy}}
            </li>
            <li>
              参考单价：{{currentCurrency01.referencePrice}}
            </li>
            <li>
              <ul class="buy-title">
                <li>买出价格（FBT）</li>
                <li>买出数量（FUC）</li>
                <li>金额（FBT）</li>
              </ul>
            </li>
            <li>
              <ul class="buy-content">
                <li><input type="text" v-model="currentCurrency01.buyPrice"></li>
                <li><input type="text" v-model="currentCurrency01.buyCount"></li>
                <li><input type="text" disabled v-model="currentCurrency01.totalPrice"></li>
              </ul>
            </li>
            <li>
              <el-slider v-model="currentCurrency01.totalPrice" max.number="101" input-size="mini"></el-slider>
            </li>
            <li>
              <a class="fff" href="#">立即充值 >></a>
            </li>
            <li>
              <input class="sell-btn" type="button" value="卖出">
            </li>
          </ul>
        </div>
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
            <li class="sell-one" v-for="(item,index) in sellList">
              <ul>
                <li>{{item.name}}</li>
                <li>{{item.price}}</li>
                <li>{{item.entrustCount|keepTwoNum}}</li>
                <li>
                  <span class="sell-proportion" v-bind:style="{width:item.proportion}"></span>
                </li>
              </ul>
            </li>
            <div class="middle-line"></div>
            <li class="buy-one" v-for="(item,index) in buyList">
              <ul>
                <li>{{item.name}}</li>
                <li>{{item.price}}</li>
                <li>{{item.entrustCount|keepTwoNum}}</li>
                <li>
                  <span class="buy-proportion" v-bind:style="{width:item.proportion}"></span>
                </li>
              </ul>
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
               <li class="td">价格</li>
               <li class="td">数量</li>
               <li class="td">成交额</li>
               <li class="td">状态</li>
               <li class="td">操作</li>
              </ul>
            <div class="tbody">
              <ul class="item" v-for="(item,index) in currentEntrustList" v-on:mouseover="hover">
                <li class="data-item">{{item.date}}</li>
                <li class="data-item">{{item.type}}</li>
                <li class="data-item">{{item.price}}</li>
                <li class="data-item">{{item.count}}</li>
                <li class="data-item">{{item.doneCount}}</li>
                <li class="data-item">{{item.status}}</li>
                <li class="data-item">{{item.todos}}</li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">历史委托</span>
        </el-tab-pane>
      </el-tabs>

    </div>
	</div>
</template>
<script>
	import Header from "./header.vue";
	export default {
		data(){
			return {
			  activeName:'first',
				currentCurrency01:{
				  name:'FUC',//币种
          count:0,//数量
          maxBuy:0,//最大可买
          referencePrice:0.00000254,//参考单价
          buyPrice:0,//买入价格
          buyCount:0,//买入数量
          totalPrice:this.buyPrice*this.buyCount||0,//总金额
        },
        currentCurrency02:{
          name:'FBT',//币种
          count:0,//数量
          maxBuy:0,//最大可买
          referencePrice:0.00000254,//参考单价
          buyPrice:0,//买入价格
          sellPrice:0,//买入数量
          totalPrice:this.buyPrice*this.buyCount||0,//总金额
        },
				curListIsShow:false,//币种选择框显示状态
				curDescIsShow:false,//币种资料框显示状态
        userBalance:9977,//用户余额
        // userBuyCount:0,//用户买入数量
        // userBuyTotal:this.userBuyPrice*this.userBuyCount||0,//总价
        buyList:[
          {
            name:'买1',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'100%',//比例
          },
          {
            name:'买2',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'20%',//比例
          }
          ,
          {
            name:'买3',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'10%',//比例
          },
          {
            name:'买4',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'50%',//比例
          },{
            name:'买5',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'88%',//比例
          }
        ],//买列表
        sellList:[
          {
            name:'卖1',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'100%',//比例
          },
          {
            name:'卖2',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'20%',//比例
          }
          ,
          {
            name:'卖3',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'10%',//比例
          },
          {
            name:'卖4',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'50%',//比例
          },{
            name:'卖5',//名称
            price:0.00008500,//价格
            entrustCount:5000.000,//委托量
            proportion:'88%',//比例
          }
        ],//卖列表
        currentEntrustList:[
          {
            date:'18-02-27 10:53:48',
            type:'买单',
            price:'0.090FBT',
            count:'300.00FUC',
            doneCount:'0FBT',
            status:'未成交',
            todos:'撤销'
          },
          {
            date:'18-02-27 10:53:48',
            type:'买单',
            price:'0.090FBT',
            count:'300.00FUC',
            doneCount:'0FBT',
            status:'未成交',
            todos:'撤销'
          }
        ]
			}

		},
		methods:{
			//显示隐藏币种选择框
			toggleCurList(){
				this.isShow = !this.isShow;
			},
			toggleCurDesc(){

			},
      formatTooltip(val) {
			  return val;
        // return this.userBalance/val*100 ;
      },
      hover(e){
        // console.log(e.target);
        // console.dir(e.target.parentNode.parentNode.children);

        for(var i =0;i<e.target.parentNode.parentNode.children.length;i++){
          e.target.parentNode.parentNode.children[i].classList.remove('active');
        }
        e.target.parentNode.classList.add('active')

      }
		},
		created(){

		},
		computed:{

		},
		components:{
			Header,//头部
		}
	}
</script>
<style scoped>
	.currencyData{
		height:70px;
		line-height:70px;
		margin-top:100px;
		padding:0 100px;
	}
  .currencyData .inner-box {
    background-color: #10172d;
    width:100%;
    height:100%;
  }

	.chg-cur-btn,.cur-desc{
		height:70px;
		margin-right:30px;
	}
  .chg-cur-btn{
    font-weight: 700;

  }
	.cur-desc{
		margin-left: 30px;
	}
  .right ul li.fl{
    /*background-color: pink;*/
    height:70px;
    line-height: 36px;
    padding:0 30px;
  }
  .right ul li.fl span{
    display:block;
    height: 100%;
    /*line-height: 30px;*/
  }
  /*交易框（买入，卖出）*/
  .deal-box,.entrust{
    margin-top:20px;
    height:400px;
    padding:0 100px;
    /*text-align: left;*/
  }
  .deal-box .inner-box{
    /*background-color: #10172d;*/
    display:flex;
    width:100%;
    height:100%;
  }
  .deal-box .inner-box>div{
    text-align: left;
    flex:1;
    margin-right:20px;
    height:400px;
    padding:30px;
    background-color: #10172d;
  }
  .deal-box .inner-box .price{
    margin-right:0;
  }
  .buy-title, .buy-content{
    margin-top:10px;
    display:flex;

  }
  .buy-content{
    position: relative;
  }
  .buy-content:before,.buy-content:after{
    content:'*';
    position: absolute;
    top:2px;
    left:29%;
  }
  .buy-content:after{
    content:'=';
    top:0;
    left:62%;
  }
  .buy ul li,.sell ul li {
    margin-bottom:10px;
  }
  .buy-title li,.buy-content li  {
    flex:1;
    font-size: 12px;
  }

  .buy-content li input {
    border:1px solid #fff;
    width:80%;
    border-radius :5px;
    text-align: center;
  }
  /*买入按钮*/
  .buy-btn,.sell-btn{
    width:100%;
    height:40px;
    background-color:#fc6869;
    font-size: 14px;
    border-radius:5px;
  }
  .sell-btn{
    background-color:#5fb761;
  }
  .sell-one,.buy-one{
    font-size: 12px;
  }
  .price-title ul,.buy-one ul,.sell-one ul{
    display:flex;
    margin-bottom:10px;
  }
  .price-title ul li,.buy-one ul li,.sell-one ul li{
    text-align: center;
    flex:2;
  }
  .buy-one ul li:last-child,.sell-one ul li:last-child{
    text-align: left;
  }
  .price-title ul li:first-child,.buy-one ul li:first-child,.sell-one ul li:first-child{
    flex:1;
  }

  .buy-proportion,.sell-proportion{
    display:inline-block;
    line-height: 8px;
    height:8px;
    background-color:#fa696c;
  }

  .sell-proportion{
    background-color:#5fb761;
  }
  /*分割线*/
  .middle-line{
    height:1px;
    width:100%;
    background-color: #fff;
    margin-bottom:10px;
  }
  .th{
    display: flex;
    background-color: #0e1328;
  }
  .th .td{
    flex:1;
    font-size: 16px;
    height:60px;
    line-height: 60px;
    color:#fff;
  }
  .tbody{
  }
  .tbody .item{
    display:flex;
    height: 50px;
    line-height: 50px;
    background-color: #10172d;
    color:#fff;
  }
  /*各行变色*/
  .tbody .item:nth-child(odd){
    background-color: #485283;
  }
  .tbody .item.active{
    background-color: #4c99cf;
  }
  .tbody .item .data-item{
    flex:1;
  }
</style>
