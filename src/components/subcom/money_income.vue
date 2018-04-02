<template>
  <div class="push_box">
    <el-form ref="form" :model="form" label-width="80px">
       <el-form-item class="Unit border_bottom" label="账户余额">
        <span>0.2507245</span>
      </el-form-item>
      <el-form-item label="资产类型" class="border_bottom">
        <el-select class="reg_select" v-model="form.assets" placeholder="【定期不可提前取回】90天收益3.75%收益-合年化15%">
          <el-option label="【定期不可提前取回】90天收益3.75%收益-合年化15%" value="shouyi"></el-option>
          <el-option label="【定期不可提前取回】180天收益率7.5%-折合年化率15%" value="shouyi"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收益类型" class="border_bottom">
        <el-select class="reg_select" v-model="form.region" placeholder="TKC">
          <el-option label="TKC" value="TKC"></el-option>
          <el-option label="FUC" value="FUC"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量" class="border_bottom">
        <el-input v-model="form.num" min="100" placeholder="最小数量为100"></el-input>
      </el-form-item>
      <el-form-item label="交易密码" prop="pass" class="border_bottom">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入交易密码"></el-input>
      </el-form-item>
      <el-form-item cla="label border_bottom" label="短信验证">
        <el-input v-model="form.ver" placeholder="请收入验证码"></el-input>
        <p class="Verification">
          <span>|</span>&nbsp;
          <span>发送验证码</span>
        </p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </el-form-item>
    </el-form>
    <div class="empty"></div>
    <Monemy></Monemy>
  </div>
</template>
<script>
  import Monemy from "./moneyRecord.vue"
  export default {
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        form: {
          assets: '',
          region: '',
          num:'',
          ver:''
        },
        ruleForm2: {
          pass: '',
          checkPass: '',
        },
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created(){},
    computed:{},
    components:{
      Monemy,//存币记录
    }
  }
</script>
<style scoped>
.border_bottom{
  margin-bottom: 10px;
}
.push_box{
  padding-top: 2%;
}
.Unit {
  text-align: left;
}
button {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    background: #0e1326;
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
.reg_select{
  width: 100%;
}
.empty{
  width: 100%;
  height: 20px;
  background: #1e253d;
}
.Verification{
  float: right;
  position:absolute;
  top:0px;
  right: 4%;
  cursor: pointer;
}
</style>