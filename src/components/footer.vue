<template>
  <div class="container-footer">
    <footer>
        <ul class="footer-content">
            <li class="first-li">
                <!-- <p><img src="https://www.fubt.top//front/images/index/logo_03.png" alt=""></p> -->
                <b>FuBT.top</b>
                <p class="info-site">
                    <a href='https://pan.baidu.com/s/1dTC6h4' target='_blank'>FUC{{$t('m.index_Thepursetodownload')}}</a>
                    &nbsp;&nbsp;
                    <a href='/notice/detail.html?id=13' target='_blank' id='ur'>{{$t('m.index_Therateinformation')}}</a> 
                    &nbsp;&nbsp;
                    <a href="https://www.fubt.top/notice/detail.html?id=36">{{$t('m.index_companyprofile')}}</a>
                    &nbsp;&nbsp;
                </p>
                <p class="site">{{$t('m.index_address')}}</p>
            </li>
            <li>
                <div class="site-info">
                    <p><span>{{$t('m.index_Telephone')}}：</span><span class="big-font">51010294</span></p>
                    <p><span>{{$t('m.index_Fax')}}：</span><span class="big-font">21726413</span></p>
                    <p><span>{{$t('m.index_Workingdays')}}：</span><span>9:00--18:00</span></p>
                    <p><span>{{$t('m.index_holiday')}}：</span><span>9:30--17:30</span></p>
                </div>
            </li>
            <li>
                <div class="site-info1">
                    <p>{{$t('m.index_QQgroup')}}：638885953</p>
                    <p>{{$t('m.index_CustomerserviceQQ')}}：2263378</p>
                    <p>{{$t('m.index_CustomerserviceQQ')}}：1372664</p>
                    <p>{{$t('m.index_FinancialQQ')}}：2667400</p>
                </div>
            </li>
            <li>
                <div class="s-picture">
                    <img src="../assets/androidApp.png" >
                    <p>{{$t('m.footer_app_download')}}</p>
                </div>
                <div class="s-picture">
                    <img src="../assets/weChatPublicNumber.jpg" >
                    <p>{{$t('m.index_WeChat')}}</p>
                </div>
            </li>
        </ul>
        <div class="footer-bottom">
          <div id="link">
            <div class="container">
              <p>
                <span>{{$t('m.footer_link')}}</span>
                &nbsp;&nbsp;&nbsp;
                <a href="https://uncoinex.com/home" target="_blank">
                    <span>澳洲U网</span>
                </a>
                <a href="https://www.yyex.com" target="_blank">
                    <span>YYEX交易平台</span>
                </a>
                <a href="http://www.qukuainews.cn" target="_blank">
                    <span>区块链中文网</span>
                </a>
                <a href="https://www.chainfor.com/" target="_blank">
                    <span>链向财经</span>
                </a>
                <a href="http://jgy.com" target="_blank">
                    <span>九个亿财经</span>
                </a>
                <a href="http://www.btc798.com" target="_blank">
                    <span>比特币之家</span>
                </a>
              </p>
            </div>
          </div>
          <p class="footer-bottom1">CopyRight &copy; 2013-2018 {{$t('m.index_FuBT')}} All Rights Reserved </p> 
        </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
<style scoped>
.container-footer {
  min-width: 100%;
  background: #030f27;
  float: left;
}
.index-footer {
  height: 400px;
  background: #152a4e;
}

.footer-content {
  height: 150px;
  margin-top: 100px;
  width: 1200px;
  display: inline-block;
}

.logo-footer {
  width: 535px;
  float: left;
}

.footer-content img {
  height: 80px;
  width: 80px;
}
.s-picture {
  display: inline-block;
  margin-right: 20px;
}
.s-picture p {
  font-size: 12px;
}

.footer-content li {
  float: left;
  margin-left: 4%;
  color: #fff;
  font-size: 15px;
}

.footer-content li a {
  color: #c2c3c8;
}

.footer-content li.first-li {
  text-align: left;
  line-height: 25px;
  color: #c2c3c8;
  margin-left: 5%;
}
.footer-content li.first-li b {
  font-size: 35px;
}

.footer-info {
  width: 300px;
  height: 200px;
  border-left: 1px dashed #e1eae9;
  float: left;
}

.footer-info p {
  text-align: center;
  color: #cbd4d6;
  margin-bottom: 5px;
  font-size: 16px;
  font-family: "黑体";
}

.footer-info p:first-child {
  margin-top: 35px;
}

.footer-bottom {
  width: 100%;
  text-align: center;
  color: #f6fefb;
  font-size: 12px;
}

.footer-bottom1 {
  margin: 15px auto 0;
  line-height: 50px;
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.6);
}
.site {
  max-width: 431px;
}
.site-info,
.site-info1 {
  text-align: left;
}
.site-info > p {
  margin-bottom: 5px !important;
  color: #c2c3c8;
}
.site-info1 {
  line-height: 21px;
}
.site-info1 > p {
  margin-bottom: 5px !important;
  color: #c2c3c8;
}

.site-info > p > span {
  color: #c2c3c8 !important;
}
.site-info .big-font {
  font-size: 20px;
}

.info-site {
  margin: 10px 0;
}
#link {
  border-top: 1px solid #566079;
  margin-left: 6%;
  width: 1200px;
  display: inline-block;
}
#link > .container {
  margin: 10px 0 15px;
  text-align: left;
}

#link > .container > p {
  width: 90%;
  font-size: 17px;
  color: #f6fefb;
}

#link > .container > p > span {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
}

#link > .container > p > a {
  text-decoration: none;
  margin: 15px;
  color: rgb(193, 193, 193);
  font-size: 15px;
}

@media screen and (max-width: 1300px) {
  #link > .container {
    width: 1024px;
  }
  .footer-content li {
    margin-left: 4%;
  }
}
</style>
