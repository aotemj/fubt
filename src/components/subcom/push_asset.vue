<template>
  <div class="push_box">
    <el-form ref="form" :model="form" label-width="80px">
       <el-form-item class="Unit" label="账户余额">
        <span>0.2507245</span>
      </el-form-item>
      <el-form-item label="卖方UID">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="资产类型">
        <el-select class="reg_select" v-model="form.region" placeholder="TKC">
          <el-option label="TKC" value="TKC"></el-option>
          <el-option label="FUC" value="FUC"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="form.num" placeholder="最小数量为100"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="交易密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入交易密码"></el-input>
      </el-form-item>
      <el-form-item label="短信验证">
        <el-input v-model="form.ver" placeholder="请输入验证码"></el-input>
        <p class="Verification">
          <span>|</span>&nbsp;
          <span>发送验证码</span>
        </p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交PUSH</el-button>
      </el-form-item>
    </el-form>
    <div class="empty"></div>
    <Push></Push>
  </div>
</template>
<script>
  import Push from "./pushRecord.vue"
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
          id: '',
          region: '',
          num:'',
          price:'',
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
     Push,//push记录
    }
  }
</script>
<style scoped>
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
  top: -14px;
  right: 4%;
  cursor: pointer;
}
</style>