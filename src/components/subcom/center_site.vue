<template>
  <el-collapse v-model="activeNames" style="margin-top:2%;">
    <el-collapse-item title="收货地址" name="1">
      <div class="form_el">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="联系人">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
  export default {
    data(){
      return {
        activeNames: ['1'],
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      onSubmit() {
        console.log('submit!');
      }
    },
    computed:{},
    components:{}
  }
</script>
<style scoped>
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
  color: #fff;
  cursor: pointer;
}
</style>
