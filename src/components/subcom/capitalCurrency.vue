<template>
  <div class="fund_box">
    <div class="cards">
        <div class="add_card" @click="dialogFormVisible = true">
            <p>+</p>
            <span>添加币种地址</span>
        </div>
        <el-dialog title="添加币种地址" :visible.sync="dialogFormVisible" width="30%" center>
            <el-form :model="form" id="from_add">
                <el-form-item label="提现管理" class="border_bottom">
                    <div class="add_right">
                        <el-input v-model="form.adminis" auto-complete="off"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="备注" class="border_bottom">
                    <div class="add_right">
                        <el-input v-model="form.remarks" auto-complete="off"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="交易密码" prop="pass" class="border_bottom">
                    <div class="add_right">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入交易密码"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="短信验证" class="border_bottom">
                    <div class="add_right">
                        <el-input v-model="form.ver" placeholder="请输入验证码"></el-input>
                        <p class="Verification">
                            <span>|</span>&nbsp;
                            <span>发送验证码</span>
                        </p>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
  </div>
</template>
<script>

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
        dialogFormVisible: false,
        form: {
          adminis: '',
          remarks: '',
          ver: ''
        },
         ruleForm2: {
          pass: '',
          checkPass: '',
        },
      }
    },
    methods:{
    },
    created(){},
    computed:{},
    components:{

    }
  }
</script>
<style scoped>
.border_bottom{
    margin-bottom: 10px;
}
#from_add{
    width: 90%;
}
.add_right{
    width: 80%;
    float: right;
    margin-right: 3%;
}
.add_card{
    width: 275px;
    height: 135px;
    border: 1px solid #c2c3c8;
    border-radius:5px;
    cursor: pointer;
}
.add_card>p{
    width: 30px;
    height: 30px;
    border: 1px solid #c2c3c8;
    border-radius: 50%;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin: 15% auto 5px;
}
.Verification{
  float: right;
  position:absolute;
  top: 0px;
  right: 6%;
  cursor: pointer;
}
button {
    width: 70%;
    height: 35px;
    border-radius: 5px;
    background: #19233c;
    outline: medium;
    border: 0;
    margin: 0 auto;
    color: #c2c3c8;
    margin-left: 14%;
}
.user-recharge>section>button:hover{
  background: #409EFF;
  color: #fff;
  cursor: pointer;
}
.dialog-footer{
    margin-top: -30px;
}
</style>
