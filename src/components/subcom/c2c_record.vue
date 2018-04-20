<template>
  <div class="exchange">
    <header>最近交易记录</header>
    <div class="exchange-list" v-for="(item,index) in tabList">
      <ul>
        <li>{{item.time}}</li>
        <li>{{item.type}}</li>
        <li>{{item.serial}}</li>
        <li>{{item.quantity}}</li>
        <li>{{item.unit}}</li>
        <li>{{item.total}}</li>
        <li>{{item.state}}</li>
        <li>{{item.oper}}</li>
      </ul>
    </div>
    <div id="exchange-info">
      <ul v-show="businessListings.length!==0">
        <li v-for="(item,index) in businessListings">
          <span>{{item.fcreatetime|formatDateTime}}</span>
          <span>{{item.ftype_s}}</span>
          <span>{{item.fserialnumber}}</span>
          <span>{{item.ffinishamount}}</span>
          <span>{{item.ffinishunitprice}}</span>
          <span>{{item.ffinishtotal}}</span>
          <span>{{item.fstatus_s}}</span>

          <!-- <span><a href="#" @click="dialogVisible = true">付款信息</a></span> -->
          <span><el-button type="text" @click="paymessage(item.fid)" :id="item.fid">付款信息</el-button></span>

        </li>
      </ul>
      <div class="no-data" v-show="businessListings.length==0">暂无数据</div>
    </div>

    <!-- 点击付款信息后的弹窗 -->
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      width="36%">
      <!-- :before-close="handleClose"> -->
      <span>
          <!-- 付款提示信息 -->
          <div class="paytip">
            <p>1.请按提示信息向该卖家汇款;</p>
            <p>2.请在规定时间完成付款，并点击“我已付款”，卖方确认收款后，系统将会将数字资产划分到您的账户;</p>
            <p>3.买方当日取消3笔或6笔未支付订单，会限制当天买入功能;</p>
          </div>
        <!-- 表单信息 -->
          <div class="payform">
            <el-form :model="form">
              <el-form-item label="收款方户名" :label-width="formLabelWidth">
                <el-input v-model="form.payeename" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="交易金额" :label-width="formLabelWidth">
                <el-input v-model="form.tradeamount" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="收款方式" :label-width="formLabelWidth">
                <!-- <el-select v-model="form.region" style="border: 1px solid #FFFDFF;">
                  <el-option label="银行卡" value="tyu"></el-option>
                  <el-option label="支付宝" value="15738818082"></el-option>
                </el-select> -->
                <el-select v-model="form.region" style="border: 1px solid #FFFDFF;">
                  <el-option label="储蓄卡" value=""></el-option>
                  <el-option label="支付宝" value="15738818082"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商户汇款备注ID" :label-width="formLabelWidth">
                <el-input v-model="form.remarkID" auto-complete="off" disabled></el-input>
                <!-- <span style="display:inline-block;">请务必填写</span> -->
              </el-form-item>
              <el-form-item label="流水号" :label-width="formLabelWidth">
                <el-input v-model="form.serialnumber" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="状态" :label-width="formLabelWidth">
                <el-input v-model="form.state" auto-complete="off" disabled></el-input>
              </el-form-item>
          </el-form>
            <!-- 按钮部分 -->
          <div class="button_click" v-show="buttontoggle">
            <button class="paybutton" @click="payorder">我已付款</button>
            <button class="paybutton" @click="cancelorder">取消订单</button>
          </div>
          </div>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import common from "../../kits/domain.js"
  import {ajax} from "../../kits/http.js"
  import {formatDate} from "../../kits/dateFormat";

  export default {
    data() {
      return {
        tabList: [
          {
            time: '时间',
            type: '类别',
            serial: '流水号',
            quantity: '数量',
            unit: '单价',
            total: '总价',
            state: '状态',
            oper: '操作'
          }
        ],
        businessListings: [
          // {
          //   time:'2018.3.26',
          //   type:'买单',
          //   serial:'4534433465',
          //   quantity:'87645',
          //   unit:'0.125',
          //   total:'12354',
          //   state:'已审核',
          //   oper:'操作'
          // }
        ],
        // 点击付款信息后的弹窗初始化
        dialogVisible: false,
        formLabelWidth: '140px',
        form: {
          payeename: '',//收款方户名
          tradeamount: '',//交易金额
          remarkID: '',//备注ID
          serialnumber: '',//流水号
          state: '',//状态
          region: '',//收款方式
        },
        buttontoggle: true,//按钮部分显示与隐藏

        paytype: '',//付款类型--银行卡
        bankid: '',//银行卡号
        fuserbankinfo: '',

        // 接口参数：
        ftype: '',
        fversion: '',
        fid: '',
        fstatus: '',
        ffinishtime: '',
        fpaytype: '',
      }
    },
    created() {
      this.render();//初始化渲染页面列表
    },
    methods: {
      // 1.0初始化渲染页面列表
      render() {
        var url = common.apidomain + 'trade/c2c/userEntrust';
        var fd = new FormData();
        fd.append('ftradeid', 15);
        fd.append('currentPage', 1);
        fd.append('size', 8);
        ajax(url, 'post', fd, (res) => {
          // console.log(res.data)
          console.log(res.data.data.data);
          this.businessListings = res.data.data.data;
        });
      },
      // 2.0付款信息弹窗
      paymessage(id) {
        this.businessListings.forEach((item, index) => {
          if (item.fid == id) {
            // this.businessListings = item;
            this.form.payeename = "平台名字";
            this.form.tradeamount = item.ffinishtotal;
            this.form.remarkID = item.fappealsid + '（请务必填写）';
            this.form.serialnumber = item.fserialnumber;
            this.form.state = item.fstatus_s;

            //银行卡信息
            this.paytype = item.fpaytype_s; // 付款类型
            this.bankid = item.fuserbankinfo; //银行卡号
            // 我已付款接口参数
            this.ftype = item.ftype;
            this.fversion = item.fversion;
            this.bankid = item.fuserbankinfo;
            this.fid = item.fid;
            // 取消订单接口参数
            this.fstatus = item.fstatus;
            this.ffinishtime = item.ffinishtime;
            this.fpaytype = item.fpaytype;
            this.fuserbankinfo = item.fuserbankinfo;
          }
        })
        this.dialogVisible = true;
      },
      // 3.0我已付款按钮发送请求
      payorder() {
        console.log("你点击了付款按钮");
        var url = common.apidomain + 'trade/c2c/payOrder';
        var fdpayorder = new FormData();
        fdpayorder.append('ftype', this.ftype);
        fdpayorder.append('fversion', this.fversion);

        fdpayorder.append('bankid', this.bankid);//暂时没找到这个字段

        fdpayorder.append('fid', this.fid);
        ajax(url, 'post', fdpayorder, (res) => {
          console.log(res.data);
        });
      },
      // 4.0取消订单按钮发送请求
      cancelorder() {
        console.log("你点击了取消订单按钮");
        var url = common.apidomain + 'trade/c2c/cancelOrder';
        var fdcancelorder = new FormData();
        fdcancelorder.append('fid', this.fid);
        fdcancelorder.append('fversion', this.fversion);
        fdcancelorder.append('fstatus', this.fstatus);
        fdcancelorder.append('ffinishtime', this.ffinishtime);
        fdcancelorder.append('fpaytype', this.fpaytype);
        fdcancelorder.append('fuserbankinfo', this.fuserbankinfo);
        ajax(url, 'post', fdcancelorder, (res) => {
          console.log(res.data);
        });
      },
    },
    computed: {},
    components: {},
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      },
      formatDateTime(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    }
  }
</script>
<style scoped>
  /*弹窗样式重写*/
  .paytip {
    color: #DADFF3;
    font-family: "Microsoft YaHei";

  }

  .payform {
    margin-top: 30px;
  }

  /*按钮部分*/
  .button_click {
    text-align: center;
  }

  .button_click button {
    width: 18%;
    line-height: 30px;
    cursor: pointer;
    margin: 0 auto;
    display: inline-block;
    border: 1px solid #F8FFF3;
  }

  .button_click button:first-child {
    margin-right: 50px;
    background: transparent;
  }

  .button_click button:first-child:hover {
    border: 1px solid #2972C4;
    color: #2972C4;
  }

  .button_click button:first-child:hover .paybutton {
    color: #2972C4;
  }

  .button_click button:last-child {
    background: transparent;
  }

  .button_click button:last-child:hover {
    border: 1px solid #2972C4;
  }

  .button_click button:last-child:hover .paybutton {
    color: #2972C4;
  }

  /*列表部分*/
  #exchange-info { /* 8条记录的高度，超过8条会显示滚动条 */
    height: 320px;
    overflow-Y: auto;
    overflow-X: hidden;
  }

  .exchange {
    width: 1300px;
    margin: 20px auto 50px;
  }

  .exchange > header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #c2c3c8;
    text-align: left;
    padding-left: 2%;
  }

  .exchange-list > ul {
    width: 100%;
    height: 60px;
    background: #0e1326;
    line-height: 60px;
    font-size: 14px;
  }

  .exchange-list > ul > li:first-child {
    width: 17%;
  }

  .exchange-list > ul > li:nth-child(1),
  .exchange-list > ul > li:nth-child(3) {
    width: 17%;
  }

  .exchange-list > ul > li {
    width: 10%;
    float: left;
    color: #c2c3c8;
  }

  .exchange-list > ul > li:nth-child(4),
  .exchange-list > ul > li:nth-child(5),
  .exchange-list > ul > li:nth-child(6),
  .exchange-list > ul > li:nth-child(7),
  .exchange-list > ul > li:nth-child(8) {
    text-align: center;
  }

  #exchange-info > ul > li > span:first-child {
    width: 15%;
  }

  #exchange-info > ul > li {
    height: 40px;
    background: #11182c;
  }

  #exchange-info > ul > li:hover {
    background: #0e1326;
    cursor: pointer;
  }

  #exchange-info > ul > li > span {
    display: block;
    width: 10%;
    height: 40px;
    float: left;
    line-height: 40px;
  }

  #exchange-info > ul > li > span:nth-child(3) {
    width: 10%;
  }

  #exchange-info > ul > li > span:nth-child(1),
  #exchange-info > ul > li > span:nth-child(3) {
    width: 17%;
  }

  #exchange-info > ul > li > span:nth-child(4),
  #exchange-info > ul > li > span:nth-child(5),
  #exchange-info > ul > li > span:nth-child(6),
  #exchange-info > ul > li > span:nth-child(7),
  #exchange-info > ul > li > span:nth-child(8) {
    text-align: center;
  }

  #exchange-info > ul > li > span > a {
    color: #2a7fff;
    text-decoration: none;
  }

  .no-data {
    height: 320px;
    line-height: 320px;
    background-color: #11182C;
  }
</style>
