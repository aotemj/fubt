<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="充值码" name="first">
      <div class="user-recharge">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="欢迎使用充值码" name="1">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="充值码">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-tab-pane>
    <el-tab-pane label="充值记录" name="second">

    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
     data() {
      return {
        activeName: 'first',
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
      };
    },
    methods: {
      handleClick(tab, event) {

      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style scoped>
.user-main>header {
    height: 60px;
    line-height: 60px;
    color: #338ff5;
    background: #0e1326;
    margin: 20px 0 10px;
    font-size: 18px;
    padding-left: 2.5%;
}

.user-main>ul {
    height: 60px;
    line-height: 60px;
    color: #c2c3c8;
    background: #11182c;
    font-size: 16px;
}

.user-main>ul>li {
    width: 20%;
    float: left;
    padding-left: 2.5%;
}

.user-main>article {
    margin: 20px 0 10px;
}

.user-main>article>ul {
    height: 60px;
    line-height: 60px;
    color: #c2c3c8;
    padding-left: 2.5%;
    background: #0e1326;
}
.user-main>article>ul>li {
    float: left;
    margin-right: 30px;
}

.user-recharge {
    background: #11182c;
    height:300px;
}

p {
    height: 60px;
    border-bottom: 1px solid #262c3e;
    color: #c2c3c8;
    line-height: 60px;
    padding-left: 2.5%;
    text-align: left;
    font-size: 16px;
}

section {
    height: 260px;
    font-family: '微软雅黑';
    font-size: 14px;
    color: #c2c3c8;
    text-align: center;
    padding-top: 80px;
    background: #11182c !important;
}

input {
    width: 540px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #a0a3ab;
    background: transparent;
    margin-bottom: 13px;
    padding-left: 10px;
}

label {
    margin-right: 10px;
    font-size: 15px;
    line-height: 33px;
    float:left;
}
.recharge-text{
  margin: 0 auto;
  width: 710px;
}
button {
    width: 542px;
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
