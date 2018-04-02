<template>
  <div class="fund_box">
    <div class="cards">
        <div class="add_card" @click="dialogFormVisible = true">
            <p>+</p>
            <span>添加银行卡</span>
        </div>
        <el-dialog title="添加银行卡" :visible.sync="dialogFormVisible" width="30%" center>
            <el-form :model="form" id="from_add">
                <el-form-item label="开户姓名" class="border_bottom">
                    <div class="add_right">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </div>
                    <span class="hint_information">*银行卡账户名必须与您实名认证姓名一致</span>
                </el-form-item>
                
                <el-form-item label="银行卡号" class="border_bottom">
                    <div class="add_right">
                        <el-input v-model="form.card" auto-complete="off"></el-input>
                    </div>
                </el-form-item>
                    <el-form-item label="确认卡号" class="border_bottom">
                    <div class="add_right">
                        <el-input v-model="form.confirmcard" auto-complete="off"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="开户银行" class="border_bottom">
                    <el-select class="reg_select" v-model="form.AccountOpening " placeholder="请选择银行类型">
                    <el-option label="中国工商银行" value="gongshang"></el-option>
                    <el-option label="中国建设银行" value="jianshe"></el-option>
                    <el-option label="中国农业银行" value="nongye"></el-option>
                    <el-option label="中国交通银行" value="jiaotong"></el-option>
                    <el-option label="中国招商银行" value="zhaoshang"></el-option>
                    <el-option label="中国邮政储蓄银行" value="cuxu"></el-option>
                    <el-option label="中国银行" value="zhongguo"></el-option>
                    <el-option label="中国民生银行" value="minsheng"></el-option>
                    <el-option label="中国光大银行" value="guangda"></el-option>
                    <el-option label="兴业银行" value="xingye"></el-option>
                    <el-option label="上海浦东银行" value="pudong"></el-option>
                    <el-option label="中信银行" value="zhongxin"></el-option>
                    <el-option label="华夏银行" value="huaxia"></el-option>
                    </el-select>
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
          card: '',
          confirmcard: '',
          AccountOpening:'',
          ver:'',
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
.reg_select{
    width: 80%;
    float: right;
    margin-right: 3%;
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