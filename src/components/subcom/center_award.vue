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
            <div class="user-rewards" v-show="reward.length!=0">
              <article v-for="(item,index) in reward">
                <span>{{ index + 1 }}</span>
                <span>{{ item.fcoinname }}</span>
                <span>{{ item.fcoinname }}</span>
                <span>{{ item.finfo }}</span>
                <span>{{ item.fcreatetime }}</span>
              </article>
            </div>
             <div class="no-data" v-show ="reward.length==0">暂无记录</div>
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
        reward:[],//奖励记录
      };
    },
    methods: {
      handleChange(val) {

      }
    },
    computed:{},
    created(){
      var JournalUrl = common.apidomain + 'user/rewardlog'
      ajax(JournalUrl, 'post', {}, (res) => {
        this.reward = res.data.data;
        // console.log(res);
      });
    },
    components:{}
  }
</script>
<style scoped>
.no-data{
  line-height: 100px;
}
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
