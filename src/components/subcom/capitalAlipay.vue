<template>
  <div class="fund_box">
    <div class="cards">
        <div class="add_card" @click="dialogFormVisible = true">
            <p>+</p>
            <span>添加支付宝</span>
        </div>
        <el-dialog title="添加支付宝" :visible.sync="dialogFormVisible" width="30%" center>
            <el-form :model="form" id="from_add">
                <el-form-item label="姓名" class="border_bottom">
                    <div class="add_right">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </div>
                    <span class="hint_information">*支付宝姓名必须与您实名认证姓名一致</span>
                </el-form-item>
                <el-form-item label="账号" class="border_bottom">
                    <div class="add_right">
                        <el-input v-model="form.account" auto-complete="off"></el-input>
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
                <el-button type="primary" @click="dialogFormVisible = false">提交</el-button>
            </div>
        </el-dialog>
    </div>
  </div>
</template>
<script>
  
  export default {
    data(){
      return {
        active: false,
        sites:[
            {name:'FBT'},
            {name:'FUC'},
            {name:'BTC'},
            {name:'FUC'},
            {name:'FUC'},
            {name:'FUC'},
            {name:'FUC'},
            {name:'FUC'}
        ],
        dialogFormVisible: false,
        form: {
          name: '',
          account: '',
          ver: ''
        }
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
    width: 250px;
    height: 130px;
    border: 1px solid #c2c3c8;
    border-radius:5px;
    cursor: pointer;
}
.hint_information{
    display: inline-block;
    margin-left: 20%;
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