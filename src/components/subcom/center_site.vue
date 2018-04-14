<template>
  <el-collapse v-model="activeNames" style="margin-top:2%;">
    <el-collapse-item title="收货地址" name="1">
      <div class="form_el">
        <el-form ref="form" label-width="80px">
          <el-form-item label="联系人">
            <el-input v-model="name" placeholder="请输入姓名">{{ this.name }}</el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="phone" placeholder="请输入您的联系电话">{{ this.phone }}</el-input>
          </el-form-item>
          <el-form-item label="详细地址" >
            <el-select class="selece_box" v-model="prov">
              <el-option value="河南省">{{ this.prov }}</el-option>
              <el-option value="南省"></el-option>
            </el-select>
            <el-select class="selece_box" v-model="city">
              <el-option value="郑州市">{{ this.city }}</el-option>
              <el-option value="州市"></el-option>
            </el-select>
            <el-select class="selece_box" v-model="district">
              <el-option value="金水区" label="金水区">{{ this.district }}</el-option>
              <el-option value="水区" label="金水区"></el-option>
            </el-select>
            <input type="text" class="prova" placeholder="请输入您的详细地址" v-model="dis">
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="zipcode" placeholder="请输入邮政编码">{{ this.zipcode }}</el-input>
          </el-form-item>
          <div class="false-tips"><i v-show="errorMsg"></i>{{errorMsg}}</div>
          <el-form-item>
            <el-button type="primary" v-on:click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  // import provinces from '../../../static/lang/san.js'
  export default {
    data(){
      return {
        activeNames: ['1'],
        // arr:arrAll,
        prov: '',//省
        city: '',//市
        district: '',//区
        dis: '',//地址
        name: '',//用户名
        phone: '',//手机号
        zipcode: '',//邮政编码
        errorMsg:'',//错误提示
        phoneReg: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
        emailReg: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      }
    },
    methods: {
      onSubmit() {
       if(!this.name){
          this.errorMsg = '请输入用户名';
          return;
        }else if (!this.phone) {
          this.errorMsg = "请输入手机号！"
          return;
        } else if (!this.phoneReg.test(this.phone)) {
          this.errorMsg = "您输入的手机号格式不正确！"
          return;
        } else if (!this.prov) {
          this.errorMsg = "请选择省会城市"
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
        Jourfd.append('name',this.name);//用户名
        Jourfd.append('phone',this.phone);//手机号
        Jourfd.append('prov',this.prov);//省
        Jourfd.append('city',this.city);//市
        Jourfd.append('dist',this.district);//区
        Jourfd.append('zipcode',this.zipcode);//邮政编码
        Jourfd.append('address',this.dis);//地址
        ajax(addressUrl, 'post', Jourfd, (res) => {
          // this.errorMsg = res.data.msg;
          // return;
          console.log(res)
        });
        
      },
      
    //   updateCity: function () {
    //     for (var i in this.arr) {
    //       var obj = this.arr[i];
    //       if (obj.name == this.prov) {
    //         this.cityArr = obj.sub;
    //         break;
    //       }
    //     }
    //     this.city = this.cityArr[1].name;
    //   },
    //   updateDistrict: function () {
    //     for (var i in this.cityArr) {
    //       var obj = this.cityArr[i];
    //       if (obj.name == this.city) {
    //         this.districtArr = obj.sub;
    //         break;
    //       }
    //     }
    //     if(this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
    //       this.district = this.districtArr[1].name;
    //     } else {
    //       this.district = '';
    //     }
    //   }
    // },
    // beforeMount: function () {
    //   this.updateCity();
    //   this.updateDistrict();
    // },
    // watch: {
    //   prov: function () {
    //     this.updateCity();
    //     this.updateDistrict();
    //   },
    //   city: function () {
    //     this.updateDistrict();
    //   }
    },
    computed:{},
    components:{},
    	
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
