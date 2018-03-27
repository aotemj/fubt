<template>
  <div class="container-footer">
    <footer>
        <ul class="footer-content">
            <li>
                <p><img src="https://www.fubt.top//front/images/index/logo_03.png" alt=""></p>
                <p class="info-site">
                    <a href='https://pan.baidu.com/s/1dTC6h4' target='_blank'>FUC钱包下载</a>
                    <a href='/notice/detail.html?id=13' target='_blank' id='ur'>费率信息</a>
                    <a href="https://www.fubt.top/notice/detail.html?id=36">公司简介</a>
                </p>
                <p class="site">香港地址：香港九龍長沙灣東京街31號恒邦商業大廈6樓603F室R</p>
            </li>
            <li>
                <!-- <img src="../../static/assets/images/index/er_03.jpg" alt=""> -->
                <p>扫一扫下载APP</p>
            </li>
            <li>
                <div class="site-info">
                    <p><span>电话：</span><span>51010294</span></p>
                    <p><span>传真：</span><span>21726413</span></p>
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
        </ul>
          <div id="link">
        <div class="container">
            <p>
                <span>友情链接</span>
                <a href="https://uncoinex.com/home">
                    <span>澳洲U网</span>
                </a>
            </p>
        </div>
    </div>
    <div class="footer-bottom">
        <p class="footer-bottom1">CopyRight &copy; 2013-2018 富比特交易平台 All Rights Reserved </p>
    </div>
    </footer>
  </div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		created(){

		},
		methods:{

		},
		computed:{}
	}
</script>
<style scoped>
.container-footer {
    width: 100%;
    height: 400px;
    background: #030f27;
    float: left;
}
.index-footer {
    height: 400px;
    background: #152a4e;
}

.footer-content {
    height: 200px;
    margin-top: 100px;
}

.logo-footer {
    width: 535px;
    float: left;
}

.footer-content img {
    margin-right: 40px;
    margin-bottom: 30px;
}

.footer-content li {
    float: left;
    margin-left: 8%;
    color: #fff;
    font-size: 15px;
}

.footer-content li a {
    color: #c2c3c8;
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
    font-family: '黑体';
}

.footer-info p:first-child {
    margin-top: 35px;
}

.footer-bottom {
    width: 100%;
    text-align: center;
    color: #f6fefb;
    border-top: 1px solid #566079;
    font-size: 12px;
}

.footer-bottom1 {
    width: 1200px;
    margin: 15px auto 0;
}

.site-info>p {
    margin-bottom: 5px !important;
    color: #c2c3c8;
}

.site-info1>p {
    margin-bottom: 5px !important;
    color: #c2c3c8;
}

.site-info>p>span {
    color: #c2c3c8 !important;
}

.info-site {
    margin-bottom: 10px;
}

#link>.container {
    width: 1200px;
    padding-left: 8%;
    margin: 10px 0 15px;
    text-align: left;
}

#link>.container>p {
    width: 90%;
    font-size: 17px;
    color: #f6fefb;
}

#link>.container>p>span {
    font-size: 16px;
    color: #f6fefb;
}

#link>.container>p>a {
    text-decoration: none;
    margin: 15px;
    color: rgb(193, 193, 193);
    font-size: 16px;
}

@media screen and (max-width: 1300px) {
    #link>.container {
        width: 1024px;
    }
    .footer-content li {
        margin-left: 5%;
    }
    .footer-bottom1 {
        width: 1024px;
    }
}
</style>
