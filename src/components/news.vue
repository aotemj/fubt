<template>
  <div>
    <!-- 1.0 头部 -->
    <Header class="header"></Header>
    <!-- 2.0 banner图 -->
    <div class="banner">
      <img src="../assets/newsBanner.png">
    </div>
    <!-- 3.0 tabs标签页 -->
    <div class="newsTabs newNavs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <div slot="label" class="titleNavs">新闻中心<i :class="{active:activeId}"></i></div>
          <div class="bar"></div>
          <!-- 新闻中心内容 -->
          <div class="newsCenter">
            <!-- 时间轴 -->
            <div class="timeAxis">
              <ul>
                <li v-for="(item,index) in newList">
                  <!-- <router-link to="./news/newsDetails"> -->
                  <router-link :to="'./news/newsDetails/'+item.fid">
                    <h4>{{index}}</h4>
                    <p>{{item.fcreatedate}}</p>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- 新闻列表 -->
            <div class="newsList">
              <ul v-show="newsLists.length!=0">
                <li v-for="(item,index) in newsLists">
                  <div class="contents">
                    <div class="sign">
                      <span>{{item.sign}}</span>
                    </div>
                    <div class="title">{{item.ftitle}}</div>
                    <div class="date">{{item.fcreatedate}}</div>
                  </div>
                  <div class="overview">
                    <p>
                      {{item.fcontent_short}}<router-link :to="'./news/newsDetails/'+item.fid" class="more">&nbsp;&nbsp;[查看更多]</router-link>
                    </p>
                  </div>
                  <div class="verticalLine"></div>
                </li>
              </ul>
              <div class="no-data" v-show ="newsLists.length==0">暂无数据</div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane name="second">
          <div slot="label" class="titleNavs">官方公告<i :class="{active:!activeId}"></i></div>
          <!-- 官方公告内容 -->
          <div class="newsCenter">
            <!-- 时间轴 -->
            <div class="timeAxis">
              <ul>
                <li v-for="(item,index) in noticeList">
                  <!-- <router-link to="./news/newsDetails"> -->
                  <router-link :to="'./news/newsDetails/'+item.fid">
                    <h4>{{index}}</h4>
                    <p>{{item.fcreatedate}}</p>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- 公告列表 -->
            <div class="newsList">
              <ul v-show="noticeLists.length!=0">
                <li v-for="(item,index) in noticeLists">
                  <div class="contents">
                    <div class="sign">
                      <span>{{item.sign}}</span>
                    </div>
                    <div class="title">{{item.ftitle}}</div>
                    <div class="date">{{item.fcreatedate}}</div>
                  </div>
                  <div class="overview">
                    <p>
                      <!-- {{item.content}}<router-link to="./news/newsDetails" class="more">&nbsp;&nbsp;[查看更多]</router-link> -->
                      {{item.fabstract}}<router-link :to="'./news/newsDetails/'+item.fid" class="more">&nbsp;&nbsp;[查看更多]</router-link>
                    </p>
                  </div>
                  <div class="verticalLine"></div>
                </li>
              </ul>
              <div class="no-data" v-show ="noticeLists.length==0">暂无数据</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Customer></Customer>
  </div>
</template>

<script>
  import Header from './header'
  import common from "../kits/domain"
  import {ajax} from "../kits/http"
  import Customer from './subcom/customer_service'//在线客服
  export default {
    data(){
      return {
        activeName: 'first',
        activeId:true,
        newsLists:[],// 返回的10条新闻
        newList:[],//截取的前7条新闻
        noticeLists:[],//返回的10条公告
        noticeList:[],// 截取的前7条公告
      }
    },
    methods:{
      handleClick(tab, e) {
        // console.log(tab, event);
        // console.log(e.target);
        this.activeId =!this.activeId;
      }
    },
    computed:{},
    created(){

      // 1.0 新闻列表请求数据
      var url = common.apidomain + 'notice/index';
      var formData1 = new FormData();
      formData1.append('id',2);
      formData1.append('currentPage',1);
      ajax(url, 'post', formData1, (res) => {
        // console.log(res.data.data.farticles);
        this.newsLists = res.data.data.farticles;//返回的10条新闻
        this.newList = this.newsLists.slice(0,7);//截取的前7条新闻
        // console.log(res.data.data.farticles)
        console.log(res)
      });

      // 2.0 公告列表请求数据
      var url = common.apidomain + 'notice/index';
      var formData2 = new FormData();
      formData2.append('id',1);
      formData2.append('currentPage',1);
      ajax(url, 'post', formData2, (res) => {
        this.noticeLists = res.data.data.farticles;//返回的10条新闻
        this.noticeList = this.noticeLists.slice(0,7);//截取的前7条新闻
        // this.noticeLists = res.data.data.farticles;
        console.log(res)
        // console.log(res.data)
        // console.log(res.data.data.items)
        // this.noticeLists = res.data.data.items;
      });

      // 2.0 公告列表请求数据
      // var url = common.apidomain + 'service/appnewmore';
      // var formData = new FormData();
      // formData.append('id',2);
      // formData.append('cur',1);
      // ajax(url, 'post', formData, (res) => {
      //   // console.log(res)
      //   // console.log(res.data)
      //   // console.log(res.data.data.items)
      //   this.noticeLists = res.data.data.items;
      // });
    },
    components:{Header,Customer}
  }
</script>

<style scoped>
  /*1.0 banner图部分*/
  .banner{
    margin-top: 85px;
    margin-bottom: -3px;
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
    font-size: 16px;
    height: 260px;
    width: 100%;
    background: url(../assets/newsTime.png) no-repeat center;
    -webkit-background-size: 50% 80%;
    /*background-size: 50% 80%;*/
    background-size: 53% 80%;
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
    /*width: 100%;*/
    /*padding: 0 25%;*/
    /*margin-top: 50px;*/
    /*font-size: 16px;*/
    /*width: 100%;*/
    /*padding: 0 25%;*/
    /*margin-top: 50px;*/
    font-size: 16px;
    width: 1000px;
    margin: 0 auto;
    padding-top: 60px;
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
  .newsList>ul>li>.overview{
    margin: 15px 0 ;
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
  .no-data{
    margin-bottom: 100px;
  }
</style>
