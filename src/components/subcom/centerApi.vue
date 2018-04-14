<template>
  <div style="margin:2% 0;">
    <tips></tips>
    <div class="security">
      <div class="user-main">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="Api 申请" name="1" style="background:#11182c;">
            <div class="api_box">
                <label for="">密钥绑定IP</label>
                <input type="text" placeholder="只有绑定的IP才能够通过API进行访问,若要填写多个ip中间用,分割" v-model="key">
                <button v-on:click="IPkey" v-show="ApiIP">Api开启</button>
            </div>
            <p v-show="ApiIP">温馨提示：私有秘钥允许您通过fubt开放协议提供API访问您的账户并执行交易指令，我们为您提供的秘钥非常重要，请妥善保管，Api私有秘钥(Sceret Key)：仅显示一次，若遗忘请重新。</p>
            <div class="modify" v-show="keyshow">
                <button v-on:click="modifykey">修改秘钥绑定IP</button>
                <label for="">API 访问密钥<br />(Access Key)</label>
                <input type="text" v-model="Msdify" disabled>
                <label for="" style="margin-top: 0;">API 私有密钥<br />(Secret Key)</label>
                <input type="password" v-model="Rese" disabled>
                <button v-on:click="Resetapi">重置API私有秘钥</button>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-dialog title="温馨提示" :visible.sync="centerDialogVisible" width="35%" center>
            <span style="color:#c2c3c8">{{ this.keytext }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</div>
</template>
<script>
  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";
  import tips from './friendlyTips'//提示信息
  export default {
   data() {
      return {
        centerDialogVisible: false,
        keytext:'',
        activeNames: ['1'],
        key:'',//添加api
        Msdify:'',//修改api
        Rese:'',//重置api
        Apikey:'',
        keyshow:false,
        ApiIP:true,
      };
    },
    methods: {
        /*
        点击开启pai按钮时--弹出对话框 res.data.msg 点击对话框确定按钮之后
        温馨提示隐藏
        显示api访问秘钥text/input 、api私有秘钥text/input
        点击修改秘钥 弹出对话框修改成功
        点击重置api  弹出res.data.msg新秘钥对话框
        */ 
        //添加api
        IPkey(){
            // centerDialogVisible = true
            let ApiUrl = common.apidomain + 'user/addApikey';
            let Apifd = new FormData();
            Apifd.append('ip',this.key);
            ajax(ApiUrl, 'post', Apifd, (res) => {
                this.Apikey = res.data.msg;
                this.keytext = this.Apikey
                // console.log(this.Apikey);
            });
            this.keyshow = true;
            this.ApiIP = false;
            this.centerDialogVisible = true
        },
        //修改api
        modifykey(){
            let modifyUrl = common.apidomain + 'user/updateApiIp';
            let modifyfd = new FormData();
            modifyfd.append('ip',this.Msdify);
            ajax(modifyUrl, 'post', modifyfd, (res) => {
                this.$store.commit('changeDialogInfo','修改成功')
                // console.log(this.Msdify);
            });
        },
        //重置api
        Resetapi(){
            let ResetUrl = common.apidomain + 'user/resetApiKey';
            let Resetfd = new FormData();
            Resetfd.append('ip',this.Rese);
            ajax(ResetUrl, 'post', Resetfd, (res) => {
                this.Rese = res.data.msg;
                this.keytext = this.Rese
                // console.log(this.Rese);
            });
            this.centerDialogVisible = true
        }
    },
    computed:{},
    created(){
        this.keyshow = true
        let Url = common.apidomain + 'user/apikey';
        ajax(Url, 'post', {}, (res) => {
            this.Msdify = res.data.data.api.apiaccesskey;
            this.Rese = res.data.data.api.apisecretkey;
        });
    },
    components:{
        tips,//弹窗组件
    }
  }
</script>
<style scoped>
.api_box,.modify {
    width: 45%;
    margin: 0 auto;
    line-height: 30px;
    color: #c2c3c8;

}
.api_box input{
    width: 85%;
    height: 30px;
    border: 1px solid #c2c3c8;
    color: #c2c3c8;
    border-radius:5px; 
    margin: 10% auto 5%;
    padding-left: 3%;
    box-sizing: border-box;
}
.modify input{
    width: 85%;
    height: 30px;
    border: 1px solid #c2c3c8;
    color: #c2c3c8;
    border-radius:5px; 
    margin: 1% auto 5%;
    padding-left: 3%;
    box-sizing: border-box;
    float: right;
}
.api_box button{
    width: 85%;
    height: 30px;
    border-radius: 5px;
    background: #19233c;
    color: #c2c3c8;
    float:right;
    margin-right: 2px;
    cursor: pointer;
}
.modify button{
    width: 40%;
    height: 30px;
    float: right;
     border-radius: 5px;
    background: #19233c;
    color: #c2c3c8;
    cursor: pointer;
}
.api_box label{
    float: left;
    font-size: 14px;
}
.modify label{
    display: inline-block;
    width: 15%;
    float: left;
    margin-top: 5%;
}

p{
    padding-top: 5%;
    width: 47%;
    margin: 0 auto;
    margin-bottom: 10%;
    color: #c2c3c8;
}
</style>
