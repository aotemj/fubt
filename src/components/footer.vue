<template>
  <div class="container-footer">
    <footer>
        <ul class="footer-content">
            <li class="first-li">
                <!-- <p><img src="https://www.fubt.top//front/images/index/logo_03.png" alt=""></p> -->
                <b>FuBT.top</b>
                <p class="info-site">
                    <a href='https://pan.baidu.com/s/1dTC6h4' target='_blank'>FUC钱包下载</a>
                    &nbsp;&nbsp;
                    <a href='/notice/detail.html?id=13' target='_blank' id='ur'>费率信息</a>
                    &nbsp;&nbsp;
                    <a href="https://www.fubt.top/notice/detail.html?id=36">公司简介</a>
                    &nbsp;&nbsp;
                </p>
                <p class="site">香港地址：香港九龍長沙灣東京街31號恒邦商業大廈6樓603F室R</p>
            </li>
            <li>
                <div class="site-info">
                    <p><span>电话：</span><span class="big-font">51010294</span></p>
                    <p><span>传真：</span><span class="big-font">21726413</span></p>
                    <p><span>工作日：</span><span>9:00--18:00</span></p>
                    <p><span>节假日：</span><span>9:30--17:30</span></p>
                </div>
            </li>
            <li>
                <div class="site-info1">
                    <p>QQ群：638885953</p>
                    <p>客服QQ：2263378</p>
                    <p>客服QQ：1372664</p>
                    <p>财务QQ：2667400</p>
                </div>
            </li>
            <li>
                <div class="s-picture">
                    <img src="../assets/androidApp.png" >
                    <p>扫一扫下载APP</p>
                </div>
                <div class="s-picture">
                    <img src="../assets/weChatPublicNumber.jpg" >
                    <p>关注微信公众号</p>
                </div>
            </li>
        </ul>
        <div class="footer-bottom">
          <div id="link">
            <div class="container">
              <p>
                <span>友情链接</span>
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
          <p class="footer-bottom1">CopyRight &copy; 2013-2018 富比特交易平台 All Rights Reserved </p>
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
  width: 100%;
  /* height: 400px; */
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
}

.logo-footer {
  width: 535px;
  float: left;
}

.footer-content img {
  /* margin-right: 40px;
  margin-bottom: 30px; */
  height: 80px;
  width: 80px;
}
.s-picture{
  display: inline-block;
  margin-right: 20px;
}
.s-picture p{
  font-size: 12px;
}

.footer-content li {
  float: left;
  margin-left: 5%;
  color: #fff;
  font-size: 15px;
}

.footer-content li a {
  color: #c2c3c8;
}

.footer-content li.first-li{
  margin-left: 8.7%;
  text-align: left;
  line-height: 25px;
  color: #c2c3c8;
}
.footer-content li.first-li b{
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
  /* border-top: 1px solid #566079; */
  font-size: 12px;
}

.footer-bottom1 {
  width: 1200px;
  margin: 15px auto 0;
  margin: 0 -20px;
  overflow: hidden;
  line-height: 50px;
  background: rgba(0,0,0,.2);
  color: rgba(255,255,255,.6);
}

.site-info > p {
  margin-bottom: 5px !important;
  color: #c2c3c8;
}
.site-info1{
  line-height: 21px;
}
.site-info1 > p {
  margin-bottom: 5px !important;
  color: #c2c3c8;
}

.site-info > p > span {
  color: #c2c3c8 !important;
}
.site-info .big-font{
  font-size: 20px;
}

.info-site {
  margin: 10px 0;
}
#link{
  border-top: 1px solid #566079;
  margin-left: 8.7%;
}
#link > .container {
  /* width: 1200px; */
  /* padding-left: 8%; */
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
  /* color: #f6fefb; */
  color: rgba(255,255,255,.85)
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
    margin-left: 5%;
  }
  .footer-bottom1 {
    width: 1024px;
  }
}
footer {
  width: 1300px;
  margin: 0 auto;
}
</style>
