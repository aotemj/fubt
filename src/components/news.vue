<template>
  <div>
    <!-- 1.0 头部 -->
    <Header class="header"></Header>
    <!-- 2.0 banner图 -->
    <div class="banner">
      <img src="../assets/newsBanner.png">
    </div>
    <!-- 3.0 tabs标签页 -->
    <div class="newsTabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="新闻中心" name="first">
          <!-- 新闻中心内容 -->
          <div class="newsCenter">
            <!-- 时间轴 -->
            <div class="timeAxis">
              <ul>
                <li v-for="(item,index) in timeList">
                  <router-link to="./news/newsDetails">
                    <h4>{{item.order}}</h4>
                    <p>{{item.time}}</p>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- 新闻列表 -->
            <div class="newsList">
              <ul>
                <li v-for="(item,index) in newsLists">
                  <div class="contents">
                    <div class="sign">
                      <span>{{item.sign}}</span>
                    </div>
                    <div class="title">{{item.title}}</div>
                    <div class="date">{{item.date}}</div>
                  </div>
                  <div class="overview">
                    <p>
                      {{item.overview}}<router-link to="./news/newsDetails" class="more">&nbsp;&nbsp;[查看更多]</router-link>
                    </p>
                  </div>
                  <div class="verticalLine"></div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="官方公告" name="second">
          <!-- 官方公告内容 -->
          <div class="newsCenter">
            <!-- 时间轴 -->
            <div class="timeAxis">
              <ul>
                <li v-for="(item,index) in noticeTimeList">
                  <router-link to="./news/newsDetails">
                    <h4>{{item.order}}</h4>
                    <p>{{item.time}}</p>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- 新闻列表 -->
            <div class="newsList">
              <ul>
                <li v-for="(item,index) in noticeNewsLists">
                  <div class="contents">
                    <div class="sign">
                      <span>{{item.sign}}</span>
                    </div>
                    <div class="title">{{item.title}}</div>
                    <div class="date">{{item.date}}</div>
                  </div>
                  <div class="overview">
                    <p>
                      {{item.overview}}<router-link to="./news/newsDetails" class="more">&nbsp;&nbsp;[查看更多]</router-link>
                    </p>
                  </div>
                  <div class="verticalLine"></div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Header from './header'

  export default {
    data(){
      return {
        activeName: 'first',
        timeList:[
          {
            time:'2018.03.28',
            order:'壹'
          },
          {
            time:'2018.05.8',
            order:'贰'
          },
          {
            time:'2017.06.6',
            order:'叁'
          },
          {
            time:'2012.07.6',
            order:'肆'
          },
          {
            time:'2014.08.4',
            order:'伍'
          },
          {
            time:'2013.09.44',
            order:'陆'
          },
          {
            time:'2014.11.55',
            order:'柒'
          }
        ],
        newsLists:[
          {
            sign:'壹',
            title:'UFH介绍',
            date:'2018年9月18日',
            overview:'亲爱的富比特用户富比特将在2018年3月28日开启PC PromotionChain交易，支持PC/FBT交易对，邀您体验！具体时间安排如下：3月28日上午10:00开启充提服务。3月28日下午15:00开放PC交易。PC介绍破局传统推广行业困境，推广链横空出世！'
          },
          {
            sign:'贰',
            title:'4天狂欢百万糖果大空投',
            date:'2018年09月13日',
            overview:'上线币种：RDN、DGD、ABT、SNT、DTA3.23日下午6点开启充提币服务。3.24日上午10点开启交易。币种介绍：RDNRaidenNetwork简介雷电网络是一种链下规模性交易的解决方案，基于以太坊智能合约实现。可支持所有符合以太坊ERC20标准代币的交易，它类似于闪电网络，具有即时到账，低转账费用。'
          },
          {
            sign:'叁',
            title:'关于 IOST.BTM.OMG.TRX.VEN 上线富比特BTC交易区公告',
            date:'2013年01月23日',
            overview:'暨绿色区块链发展论坛启动仪式首席协办单位：香港富比特广东省碳普惠创新发展中心小聪中小企业服务示范平台承办单位：广东量子协同会展管理有限公司首席支持单位：乐步施消费合作社碳圈传媒中金财行斑马信链CHINAAI峰会时间：2018-03-25 13:00至2018-03-25 18:00峰会地址'
          },
          {
            sign:'肆',
            title:'关于 IOST.BTM.OMG.TRX.VEN 上线富比特BTC交易区公告',
            date:'2013年01月23日',
            overview:'暨绿色区块链发展论坛启动仪式首席协办单位：香港富比特广东省碳普惠创新发展中心小聪中小企业服务示范平台承办单位：广东量子协同会展管理有限公司首席支持单位：乐步施消费合作社碳圈传媒中金财行斑马信链CHINAAI峰会时间：2018-03-25 13:00至2018-03-25 18:00峰会地址'
          },
          {
            sign:'伍',
            title:'关于 IOST.BTM.OMG.TRX.VEN 上线富比特BTC交易区公告',
            date:'2013年01月23日',
            overview:'暨绿色区块链发展论坛启动仪式首席协办单位：香港富比特广东省碳普惠创新发展中心小聪中小企业服务示范平台承办单位：广东量子协同会展管理有限公司首席支持单位：乐步施消费合作社碳圈传媒中金财行斑马信链CHINAAI峰会时间：2018-03-25 13:00至2018-03-25 18:00峰会地址'
          },
          {
            sign:'陆',
            title:'关于 IOST.BTM.OMG.TRX.VEN 上线富比特BTC交易区公告',
            date:'2013年01月23日',
            overview:'暨绿色区块链发展论坛启动仪式首席协办单位：香港富比特广东省碳普惠创新发展中心小聪中小企业服务示范平台承办单位：广东量子协同会展管理有限公司首席支持单位：乐步施消费合作社碳圈传媒中金财行斑马信链CHINAAI峰会时间：2018-03-25 13:00至2018-03-25 18:00峰会地址'
          },
          {
            sign:'柒',
            title:'关于 IOST.BTM.OMG.TRX.VEN 上线富比特BTC交易区公告',
            date:'2013年01月23日',
            overview:'暨绿色区块链发展论坛启动仪式首席协办单位：香港富比特广东省碳普惠创新发展中心小聪中小企业服务示范平台承办单位：广东量子协同会展管理有限公司首席支持单位：乐步施消费合作社碳圈传媒中金财行斑马信链CHINAAI峰会时间：2018-03-25 13:00至2018-03-25 18:00峰会地址'
          },
        ],
        noticeTimeList:[
          {
            time:'2018.03.28',
            order:'壹'
          },
          {
            time:'2018.05.8',
            order:'贰'
          },
          {
            time:'2017.06.6',
            order:'叁'
          },
          {
            time:'2012.07.6',
            order:'肆'
          },
          {
            time:'2014.08.4',
            order:'伍'
          },
          {
            time:'2013.09.44',
            order:'陆'
          },
          {
            time:'2014.11.55',
            order:'柒'
          }
        ],
        noticeNewsLists:[
          {
            sign:'肆',
            title:'关于 IOST.BTM.OMG.TRX.VEN 上线富比特BTC交易区公告',
            date:'2013年01月23日',
            overview:'暨绿色区块链发展论坛启动仪式首席协办单位：香港富比特广东省碳普惠创新发展中心小聪中小企业服务示范平台承办单位：广东量子协同会展管理有限公司首席支持单位：乐步施消费合作社碳圈传媒中金财行斑马信链CHINAAI峰会时间：2018-03-25 13:00至2018-03-25 18:00峰会地址'
          },
          {
            sign:'伍',
            title:'关于 IOST.BTM.OMG.TRX.VEN 上线富比特BTC交易区公告',
            date:'2013年01月23日',
            overview:'暨绿色区块链发展论坛启动仪式首席协办单位：香港富比特广东省碳普惠创新发展中心小聪中小企业服务示范平台承办单位：广东量子协同会展管理有限公司首席支持单位：乐步施消费合作社碳圈传媒中金财行斑马信链CHINAAI峰会时间：2018-03-25 13:00至2018-03-25 18:00峰会地址'
          },
          {
            sign:'陆',
            title:'关于 IOST.BTM.OMG.TRX.VEN 上线富比特BTC交易区公告',
            date:'2013年01月23日',
            overview:'暨绿色区块链发展论坛启动仪式首席协办单位：香港富比特广东省碳普惠创新发展中心小聪中小企业服务示范平台承办单位：广东量子协同会展管理有限公司首席支持单位：乐步施消费合作社碳圈传媒中金财行斑马信链CHINAAI峰会时间：2018-03-25 13:00至2018-03-25 18:00峰会地址'
          },
          {
            sign:'柒',
            title:'关于 IOST.BTM.OMG.TRX.VEN 上线富比特BTC交易区公告',
            date:'2013年01月23日',
            overview:'暨绿色区块链发展论坛启动仪式首席协办单位：香港富比特广东省碳普惠创新发展中心小聪中小企业服务示范平台承办单位：广东量子协同会展管理有限公司首席支持单位：乐步施消费合作社碳圈传媒中金财行斑马信链CHINAAI峰会时间：2018-03-25 13:00至2018-03-25 18:00峰会地址'
          },
        ]
      }
    },
    methods:{
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    },
    computed:{},
    created(){},
    components:{Header}
  }
</script>

<style scoped>
  /*1.0 banner图部分*/
  .banner{
    margin-top: 85px;
    width: 100%;
  }
  .banner>img{
    width: 100%;
    height: 100%;
  }
  /*2.0 tabs标签页*/
  /*新闻中心和官方公告内容样式一样，在此用了同一套样式结构，在发送数据时候循环的数组不一样就可以了*/
  .newsCenter{
    padding-top: 60px;
  }
  /*时间轴*/
  .timeAxis{
    height: 260px;
    width: 100%;
    background: url(../assets/newsTime.png) no-repeat center;
    -webkit-background-size: 50% 80%;
    background-size: 50% 80%;
    position: relative;
  }
  .timeAxis>ul>li>a{
    color: #B9C1C4;
  }
  .timeAxis>ul>li:nth-of-type(1),.timeAxis>ul>li:nth-of-type(2),.timeAxis>ul>li:nth-of-type(3),.timeAxis>ul>li:nth-of-type(4),.timeAxis>ul>li:nth-of-type(5),.timeAxis>ul>li:nth-of-type(6),.timeAxis>ul>li:nth-of-type(7){
    width: 7%;
    height: 28%;
    background-color: #1F2A48;
    position: absolute;
  }
  .timeAxis>ul>li:nth-of-type(1) h4,.timeAxis>ul>li:nth-of-type(2) h4,.timeAxis>ul>li:nth-of-type(3) h4,.timeAxis>ul>li:nth-of-type(4) h4,.timeAxis>ul>li:nth-of-type(5) h4,.timeAxis>ul>li:nth-of-type(6) h4,.timeAxis>ul>li:nth-of-type(7) h4{
    padding: 8px 0;
    margin: 0;
  }
  .timeAxis>ul>li:nth-of-type(1) p,.timeAxis>ul>li:nth-of-type(2) p,.timeAxis>ul>li:nth-of-type(3) p,.timeAxis>ul>li:nth-of-type(4) p,.timeAxis>ul>li:nth-of-type(5) p,.timeAxis>ul>li:nth-of-type(6) p,.timeAxis>ul>li:nth-of-type(7) p{
    padding: 4px 0;
    margin: 0;
  }
  .timeAxis>ul>li:nth-of-type(1){
    top: 1%;
    left: 27%;
  }
  .timeAxis>ul>li:nth-of-type(2){
    top: 70%;
    left: 33.6%;
  }
  .timeAxis>ul>li:nth-of-type(3){
    top: 1%;
    left: 39.8%;
  }
  .timeAxis>ul>li:nth-of-type(4){
    top: 70%;
    left: 46.4%;
  }
  .timeAxis>ul>li:nth-of-type(5){
    top: 1%;
    left: 52.8%;
  }
  .timeAxis>ul>li:nth-of-type(6){
    top: 70%;
    left: 59.5%;
  }
  .timeAxis>ul>li:nth-of-type(7){
    top: 1%;
    left: 65.6%;
  }
  /*新闻列表部分*/
  .newsList{
    width: 100%;
    padding: 0 25%;
    margin-top: 50px;
  }
  .newsList>ul>li{
    padding: 10px 0;
    color: #B9C1C4;
  }
  .newsList>ul>li>.contents{
    overflow: hidden;
    height: 40px;
    line-height: 40px;
  }
  .newsList>ul>li>.contents>.sign{
    width: 88px;
    height: 44px;
    float: left;
    background: url(../assets/newsOrder.png) no-repeat;
    background-size: 84px 40px;
  }
  .newsList>ul>li>.contents>.title{
    float: left;
    margin-left: 30px;
  }
  .newsList>ul>li>.contents>.date{
    float: right;
  }
  .newsList>ul>li>.overview>p{
    text-align: left;
    line-height: 1.8em;
  }
  .newsList>ul>li>.overview>p>.more{
    color: #B9C1C4;
  }
  .newsList>ul>li>.overview>p>.more:hover{
    color: #FF6000;
  }
  .newsList>ul>li>.verticalLine{
    height: 70px;
    background: url(../assets/newsWire.png) no-repeat;
  }
  .newsList>ul>li:last-child>.verticalLine{
    display: none;
  }

</style>
