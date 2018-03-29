<template>
  <div>
    <div class="security">
      <div class="user-main">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="奖励记录" name="1" style="background:#11182c;">
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
          </el-collapse-item>
        </el-collapse>
    </div>
  </div>
</div>
</template>
<script>
  export default {
   data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {

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
</style>
