<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="充值码" name="first">
      <div class="user-recharge">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="欢迎使用充值码" name="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="充值码">
                <el-input v-model="form.Rechargearr" placeholder="请输入16位充值码" v-on:change.native="buton"></el-input>
                <!-- <input type="text" v-on:keyup="buton"> -->
              </el-form-item>
              <div class="false-tips fz12"><i v-show="errorMsg"></i>{{errorMsg}}</div>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-tab-pane>
    <el-tab-pane label="充值记录" name="second">
      <ul>
        <li>序号</li>
        <li>币种</li>
        <li>数量</li>
        <li>说明</li>
        <li>创建时间</li>
      </ul>
      <div class="user-rewards">
        <article v-for="(item,index) in Recharge">
          <span>{{ index + 1 }}</span>
          <span>{{ item.fcoinname }}</span>
          <span>{{ item.dividendmunber }}</span>
          <span>{{ item.sharedividendname }}</span>
          <span>{{ item.fcreatetime }}</span>
        </article>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";
  export default {
     data() {
      return {
        activeName: 'first',
        activeNames: ['1'],
        form: {
          Rechargearr : '',
        },
        Recharge:[],
        errorMsg: '',//错误提示
        pwdReg:/^[a-zA-Z0-9]{16}/,//number验证
      };
    },
    methods: {
      onSubmit() {
        if (this.form.Rechargearr == '') {
          this.errorMsg = "请输入充值码";
          return;
        }
        if(!this.pwdReg.test(this.Rechargearr)){
          this.errorMsg = "充值码为16位";
         
        }else{
          this.errorMsg = '';
        }


        var JournalUrl = common.apidomain + 'deposit/alipay_manual'
        ajax(JournalUrl, 'post', {}, (res) => {
          console.log(res);
        });
      },
      buton(){
        // console.log(1)
        if(!(/^[a-zA-Z0-9]{16}/.test(this.Rechargearr))){
          this.errorMsg = "充值码为16位";
        }
        console.log(this.form.Rechargearr.length);
        console.log(this.pwdReg.test(this.Rechargearr));
      }
    },
    created(){
      
    },
    components:{}  
  }
</script>
<style scoped>
ul {
    height: 50px;
    line-height: 50px;
    color: #c2c3c8;
    background: #11182c;
    font-size: 16px;
}

ul>li {
    width: 20%;
    float: left;
    font-size: 14px;
}


article>ul {
    height: 50px;
    line-height: 50px;
    color: #c2c3c8;
    padding-left: 2.5%;
    background: #0e1326;
}
article>ul>li {
    float: left;
    margin-right: 30px;
}
.user-rewards {
    background: #11182c;
}

.user-rewards>article {
    height: 50px;
    line-height: 50px;
}

.user-rewards>article>span {
    float: left;
    width: 20%;
    color: #c2c3c8;
    font-size: 12px;
}
button {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    background: #19233c;
    outline: medium;
    border: 0;
    margin: 0 auto;
    color: #c2c3c8;
}
.user-recharge>section>button:hover{
  background: #409EFF;
  color: #fff;
  cursor: pointer;
}
</style>
