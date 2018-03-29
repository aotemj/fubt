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
      <ul>
        <li>序号</li>
        <li>币种</li>
        <li>数量</li>
        <li>说明</li>
        <li>创建时间</li>
      </ul>
      <div class="user-rewards">
        <article>
          <span>1</span>
          <span>FBT</span>
          <span>1352.021</span>
          <span>asdfasdasd</span>
          <span>2018 3 12 11:30</span>
        </article>
      </div>
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
ul {
    height: 50px;
    line-height: 50px;
    color: #c2c3c8;
    background: #11182c;
    font-size: 16px;
}

ul>li {
    width: 20%;
    float: left;
    font-size: 14px;
}


article>ul {
    height: 50px;
    line-height: 50px;
    color: #c2c3c8;
    padding-left: 2.5%;
    background: #0e1326;
}
article>ul>li {
    float: left;
    margin-right: 30px;
}
.user-rewards {
    background: #11182c;
}

.user-rewards>article {
    height: 50px;
    line-height: 50px;
}

.user-rewards>article>span {
    float: left;
    width: 20%;
    color: #c2c3c8;
    font-size: 12px;
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
