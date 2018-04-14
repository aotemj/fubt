<template>
  <div style="margin:2% 0;">
    <div class="security">
      <div class="user-main">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="Api 申请" name="1" style="background:#11182c;">
            <div class="api_box">
                <label for="">密钥绑定IP</label>
                <input type="text" placeholder="只有绑定的IP才能够通过API进行访问,若要填写多个ip中间用,分割" v-model="key">
                <button v-on:click="IPkey">Api开启</button>
            </div>
            <!-- <div>{{this.Apikey}}</div>
            <div>{{this.Msdify}}</div> -->
            <!-- <p>温馨提示：私有秘钥允许您通过fubt开放协议提供API访问您的账户并执行交易指令，我们为您提供的秘钥非常重要，请妥善保管，Api私有秘钥(Sceret Key)：仅显示一次，若遗忘请重新。</p> -->
            <div class="modify">
                <button v-on:click="modifykey">修改秘钥绑定IP</button>
                <label for="">API 访问密钥<br />(Access Key)</label>
                <input type="text" v-model="Msdify" v-html="this.Msdify">
                <label for="" style="margin-top: 0;">API 私有密钥<br />(Secret Key)</label>
                <input type="password" v-model="Rese" v-html="this.Rese">
                <button v-on:click="Resetapi">重置API私有秘钥</button>
            </div>
          </el-collapse-item>
        </el-collapse>
    </div>
  </div>
</div>
</template>
<script>
  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";
  export default {
   data() {
      return {
        activeNames: ['1'],
        key:'',//添加api
        Msdify:'',//修改api
        Rese:'',//重置api
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
            let ApiUrl = common.apidomain + 'user/addApikey';
            let Apifd = new FormData();
            Apifd.append('ip',this.key);
            ajax(ApiUrl, 'post', Apifd, (res) => {
                // this.Apikey = res.data.msg;
                console.log(this.Apikey);
            });
        },
        //修改api
        modifykey(){
            let modifyUrl = common.apidomain + 'user/updateApiIp';
            let modifyfd = new FormData();
            modifyfd.append('ip',this.Msdify);
            ajax(modifyUrl, 'post', modifyfd, (res) => {
                // this.Msdify = res.data.msg;
                console.log(this.Msdify);
            });
        },
        //重置api
        Resetapi(){
            let ResetUrl = common.apidomain + 'user/updateApiIp';
            let Resetfd = new FormData();
            Apifd.append('ip',this.Rese);
            ajax(ResetUrl, 'post', Resetfd, (res) => {
                // this.Rese = res.data.msg;
                console.log(this.Rese);
            });
        }


    },
    computed:{},
    created(){
      
    },
    components:{}
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
