<template>
  <div class="range">
    <div class="trading-sub-content">
      <div id="trading-sub">
        <el-tabs v-model="activeName">
          <el-tab-pane label="FBT交易" name="first">
            <div class="C2c-header">
              <div class="C2C-header-right">
                <ul v-for="(item,index) in datalink">
                  <li><router-link to="/finance"><button>{{item.bring}}</button></router-link></li>
                  <li><router-link to="/finance"><button>{{item.full}}</button></router-link></li>
                  <li><span><router-link to="/c2c_instructions" style="color:#fff;">{{item.state}}</router-link></span></li>
                </ul>
              </div>
            </div>
            <div id="trading-table">
              <div class="trading-C2C" style="display:block;">
                <div class="C2C-box">
                  <div class="trading-left trading1" v-for="(item,index) in databuy">
                      <p class="C2C-buy">{{item.title}}</p>
                      <div class="C2C-tab">
                          <p class="tab_input">{{item.site}}&nbsp;{{item.cny}}</p>
                          <p class="tab_input">{{item.buynum}}</p>
                      </div>
                      <div class="trading-left">
                          <div class="C2C-tab C2C-input">
                              <p>{{item.scale}}&nbsp;{{item.fbt}}</p>
                              <input id="inp1" type="text" placeholder="0">
                          </div>
                          <div class="C2C-tab C2C-input">
                              <p>{{item.sum}}&nbsp;{{item.cny}}</p>
                              <input id="inp2" type="text" placeholder="0">
                          </div>
                          <div class="C2C-tab">
                              <button>{{item.buying}}</button>
                          </div>
                      </div>
                  </div>
                  <div class="trading-right" v-for="(item,index) in datasale">
                    <p class="C2C-buy">{{item.title}}</p>
                    <div class="C2C-tab">
                        <p class="tab_input">{{item.site}}&nbsp;{{item.cny}}</p>
                        <p class="tab_input">{{item.buynum}}</p>
                    </div>
                    <div class="trading-right1">
                      <div class="C2C-tab C2C-input">
                        <p>{{item.scale}}&nbsp;{{item.fbt}}</p>
                        <input id="inp3" type="text" placeholder="0">
                      </div>
                      <div class="C2C-tab C2C-input">
                        <p>{{item.sum}}&nbsp;{{item.cny}}</p>
                        <input id="inp4" type="text" placeholder="0">
                      </div>
                      <div class="C2C-tab">
                        <button>{{item.buying}}</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="trading-C2C">
                  <div class="trading-left">
                      <!-- <img src="./images/650.png" alt=""> -->
                  </div>
                  <!-- <div class="trading-right">22</div> -->
              </div>
              <div class="trading-C2C">
                  <div class="trading-left">
                      <!-- <img src="./images/650.png" alt=""> -->
                  </div>
                  <!-- <div class="trading-right">33</div> -->
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="BTC交易" name="second">BTC交易</el-tab-pane>
          <el-tab-pane label="FUC交易" name="third">
            <div class="C2c-header">
              <div class="C2C-header-right">
                <ul>
                  <li><a href="#"><button>提现</button></a></li>
                  <li><a href="#"><button>充值</button></a></li>
                  <li><a href="../C2C/information.html"><span>操作说明</span></a></li>
                </ul>
              </div>
            </div>
            <div id="trading-table">
              <div class="trading-C2C" style="display:block;">
                <div class="C2C-box">
                  <div class="trading-left trading1">
                      <p class="C2C-buy">买入FBT</p>
                      <div class="C2C-tab">
                          <p class="tab_input">买入价&nbsp;CNY</p>
                          <p class="tab_input">7.28</p>
                      </div>
                      <div class="trading-left">
                          <div class="C2C-tab C2C-input">
                              <p>买入量&nbsp;FBT</p>
                              <input id="inp1" type="text" placeholder="0">
                          </div>
                          <div class="C2C-tab C2C-input">
                              <p>金额&nbsp;CNY</p>
                              <input id="inp2" type="text" placeholder="0">
                          </div>
                          <div class="C2C-tab">
                              <button>买入</button>
                          </div>
                      </div>
                  </div>
                  <div class="trading-right">
                    <p class="C2C-buy">卖出FBT</p>
                    <div class="C2C-tab">
                        <p class="tab_input">卖出价&nbsp;CNY</p>
                        <p class="tab_input">7.28</p>
                    </div>
                    <div class="trading-right1">
                      <div class="C2C-tab C2C-input">
                        <p>卖出量&nbsp;FBT</p>
                        <input id="inp3" type="text" placeholder="0">
                      </div>
                      <div class="C2C-tab C2C-input">
                        <p>金额&nbsp;CNY</p>
                        <input id="inp4" type="text" placeholder="0">
                      </div>
                      <div class="C2C-tab">
                        <button>卖出</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <!-- <div class="trading-C2C">
                  <div class="trading-left">
                      <img src="./images/650.png" alt="">
                  </div>
                  <div class="trading-right">22</div>
              </div>
              <div class="trading-C2C">
                  <div class="trading-left">
                      <img src="./images/650.png" alt="">
                  </div>
                  <div class="trading-right">33</div>
              </div> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      	return {
				activeName: 'first',
				value:'',
				datalink:[
          {
            bring:'提现',
            full:'充值',
            state:'操作说明',
          }
        ],
        databuy:[
          {
            title:'买入FBT',
            site:'买入价',
            cny:'CNY',
            buynum:'7.88',
            scale:'买入量',
            fbt:'FBT',
            sum:'金额',
            buying:'买入'
          }
        ],
        datasale:[
          {
            title:'卖出FBT',
            site:'卖入价',
            cny:'CNY',
            buynum:'7.88',
            scale:'卖入量',
            fbt:'FBT',
            sum:'金额',
            buying:'卖入'
          }
        ]
			}

    },
    methods:{},
    computed:{},
    components:{}
  }
</script>

<style scoped>
.range{
  /*padding: 0 100px 0 100px;*/
  width:1300px;
}
#trading-sub {
    margin-top:7%;
}

#trading-table{
  position: relative;
}
.C2c-header {
    width: 100%;
    height: 60px;
}

.C2c-header>ul {
    padding-left: 10px;
}

.C2c-header>ul>li {
    float: left;
    line-height: 60px;
    margin-right: 15px;
}

.C2c-header>ul>li>a>span {
    font-size: 14px;
    color: #555;
}

.C2c-header>ul>li>a {
    color: #4197f7;
    text-decoration: none;
}

.C2c-header>ul>li>a>span>img {
    width: 20%;
    margin: -4px 5px 0 0;
}

.C2c-header>ul>li>a:hover {
    text-decoration: none;
}
.C2C-header-right>ul>li>a{
  color:#c2c3c8;
}

.C2C-header-right {
    float: right;
    width: 250px;
    height: 100%;
    /* line-height: 60px; */
}

.C2C-header-right>ul>li {
    float: left;
    margin-left: 20px;
    margin-top: 25px;
}

.C2C-header-right>ul>li>a>button {
    width: 52px;
    height: 26px;
    border: 1px solid #c2c3c8;
    border-radius: 4px;
    text-align: center;
    line-height: 21px;
    background: transparent;
    cursor: pointer;
    outline: medium;
    font-size: 15px;
}

.C2C-header-right>ul>li>a>button:hover {
    border: 1px solid #338ff5;
}

.C2C-header-right>ul>li>a>span>img {
    margin-right: 7px;
}

.C2C-header-right>ul>li:nth-child(3)>a>span:hover {
    color: #338ff5;
    cursor: pointer;
}

.C2C-header-right>ul>li:last-child>a>span:hover {
    color: #338ff5;
    cursor: pointer;
}

.trading-C2C {
    display: none;
    top: 120px;
    left: 0;
    padding: 3px 0 25px;
}

.trading-C2C>.C2C-box>.trading-left,
.trading-right {
    width: 50%;
    float: left;
}

.trading-left>.C2C-tab>button {
    background: rgb(217, 83, 79);
}

.trading-left>.C2C-tab>button:hover {
    background: rgb(201, 48, 44);
}

.trading1 {
    padding-right: 20px;
}


.C2C-buy {
    width: 100%;
    height: 40px;
    border-bottom: 2px solid #0e1326;
    line-height: 40px;
    font-size: 18px;
    padding-left: 10px;
    color: #c2c3c8;
    box-sizing: border-box;
    text-align: left;
}

.C2C-tab {
    width: 100%;
    height: 50px;
    margin-top: 40px;
}

.C2C-tab>p:first-child {
    width: 20%;
    background: #11182c;
    float: left;
    text-align: center;
    line-height: 50px;
    margin-top: 0;
}

.C2C-tab>p:last-child {
    width: 80%;
    height: 100%;
    float: right;
    text-align: right;
    padding-right: 15px;
    line-height: 44px;
    color: rgb(217, 83, 79);
    background: #1d2843;
    font-size: 19px;
    box-sizing: border-box;
}

.trading-right>.C2C-tab>p:last-child {
    color: rgb(92, 182, 92) !important;
}

.C2C-tab>button {
    width: 100%;
    height: 46px;
    text-align: center;
    line-height: 46px;
    font-size: 18px;
    border: 0;
    outline: medium;
    cursor: pointer;
}

.trading-right1>.C2C-tab>button {
    background: rgb(92, 182, 92);
}

.trading-right1>.C2C-tab>button:hover {
    background: rgb(68, 152, 68);
}

.tab_input{
  margin: 0 !important;
}

.C2C-input {
    border: 1px solid #11182c !important;
}

.C2C-input>input {
    width: 80%;
    height: 100%;
    float: right;
    border: 0;
    outline: medium;
    text-align: right;
    padding-right: 15px;
}

#inp1,
#inp2,
#inp3,
#inp4 {
    width: 80%;
    height: 100%;
    border: 0;
    outline: medium;
    text-align: right;
    padding-right: 15px;
    background: #1d2843;
    font-size: 17px;
}

</style>

