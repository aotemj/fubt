<template>
  <el-collapse v-model="ACNames" style="margin-top:2%;">
    <tips></tips>
    <el-collapse-item title="收货地址" name="1">
      <div class="form_el">
        <el-form ref="form" label-width="80px">
          <el-form-item label="联系人">
            <el-input v-model="username" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="phone" placeholder="请输入您的联系电话"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" >
            <el-select class="selece_box" v-model="prov">
              <el-option v-for="(option,index) in arr" :key="index" :value="option.name">
                {{ option.name }}
              </el-option>
            </el-select>
            <el-select class="selece_box" v-model="city">
              <el-option v-for="(option,index) in cityArr" :key="index" :value="option.name">
                {{ option.name }}
              </el-option>  
            </el-select>
            <el-select class="selece_box" v-model="district">
              <el-option v-for="(option,index) in districtArr" :key="index" :value="option.name">
                {{ option.name }}
              </el-option>
            </el-select>
            <input type="text" class="prova" placeholder="请输入您的详细地址" v-model="dis">
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="zipcode" placeholder="请输入邮政编码"></el-input>
          </el-form-item>
          <div class="false-tips"><i v-show="errorMsg"></i>{{errorMsg}}</div>
          <el-form-item>
            <el-button type="primary" v-on:click="onSubmit" v-show="subt">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  import arrAll from "../../kits/dropDown"
  import tips from './friendlyTips'//提示信息
  export default {
    data(){
      return {
        ACNames: ['1'],
        subt: true,
        username: '',//用户名
        phone: '',//手机号

         //三级下拉开始
        arr:arrAll,
        cityArr: [],
        districtArr: [],
        prov: '北京',
        city: '北京',
        district: '东城区',
        //三级下拉结束

        dis: '',//地址
        zipcode: '',//邮政编码
        tishi:'',
        errorMsg:'',//错误提示
        phoneReg: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
        emailReg: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      }
    },
      methods: {
        onSubmit() {if (!this.phone) {
            this.errorMsg = "请输入手机号！"
            return;
          } else if (!this.phoneReg.test(this.phone)) {
            this.errorMsg = "您输入的手机号格式不正确！"
            return;
          }else if(!this.zipcode){
            this.emailMsg = '请输入邮箱';
            return;
          }else if (!this.emailReg.test(this.zipcode)) {
            this.emailMsg = "邮箱格式错误" 
            return;
          }else {
            this.emailMsg = '';
          }
          var addressUrl = common.apidomain + 'user/submit_useraddress';
          var Jourfd = new FormData();
          Jourfd.append('name',this.username);//用户名
          Jourfd.append('phone',this.phone);//手机号
          Jourfd.append('prov',this.prov);//省
          Jourfd.append('city',this.city);//市
          Jourfd.append('dist',this.district);//区
          Jourfd.append('zipcode',this.zipcode);//邮政编码
          Jourfd.append('address',this.dis);//地址
          ajax(addressUrl, 'post', Jourfd, (res) => {
            this.$store.commit('changeDialogInfo','添加收货地址成功')
            // console.log(res)
          });
        },
        //三级联动开始
        updateCity: function() {
          for (var i in this.arr) {
              var obj = this.arr[i];
              if (obj.name == this.prov) {
                  this.cityArr = obj.sub;
                  break;
              }
          }
          this.city = this.cityArr[i].name;
        },
        updateDistrict: function() {
          for (var i in this.cityArr) {
              var obj = this.cityArr[i];
              if (obj.name == this.city) {
                  this.districtArr = obj.sub;
                  break;
              }
          }
          if (this.districtArr && this.districtArr.length > 0 && this.districtArr[i].name) {
              this.district = this.districtArr[i].name;
          } else {
              this.district = '';
          }
      },

    },
    beforeMount: function() {
        this.updateCity();
        this.updateDistrict();
    },
    watch: {
        prov: function() {
            this.updateCity();
            this.updateDistrict();
        },
        city: function() {
            this.updateDistrict();
        }
    },
    //三级下拉结束
    computed:{},
    created(){
      let Url = common.apidomain + '/user/info';
      ajax(Url, 'post', {}, (res) => {
        if(res.data.code==200){
          this.username = res.data.data.Info.fname
          this.phone = res.data.data.Info.fphone
          this.prov = res.data.data.Info.fprov
          this.city = res.data.data.Info.fcity
          this.district = res.data.data.Info.fdist
          this.dis = res.data.data.Info.faddress;
          this.zipcode = res.data.data.Info.fzipcode;

          console.log(this.prov)
          console.log(this.city)
          console.log(this.district)
          console.log(this.dis)

          this.subt = false
        }else{
          this.errorMsg = res.data.msg;
        }
        
      });
    },
    components:{
      tips,//弹窗组件
    },
    	
  }
</script>
<style scoped>
.selece_box{
  width: 30.5%;
  height: 30px;
  border-radius: 5px;
  color: #c2c3c8;
  float: left;
  margin-bottom: 20px;
}
.selece_box+.selece_box{
  margin-left: 15px;
}
.prova{
  border: 1px solid #c2c3c8;
  border-radius: 5px;
  width: 100%;
  height: 30px;
  padding-left: 4%;
  box-sizing: border-box;
  color:#c2c3c8;
}
.form_el{
  background: #11182c;
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
  cursor: pointer;
}
</style>
