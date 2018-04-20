<template>
  <div style="margin:2% 0;">
    <div class="security">
      <div class="user-main">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="糖果奖励记录" name="1" style="background:#11182c;">
             <ul>
              <li>序号</li>
              <li>奖励币种</li>
              <li>数量</li>
              <li>说明</li>
              <li>创建时间</li>
            </ul>
            <div class="user-rewards" v-show="candy.length!=0">
              <article v-for="(item,index) in candy" :key="index">
                <span>{{ index+1 }}</span>
                <span>{{ item.fcoinname }}</span>
                <span>{{ item.dividendmunber }}</span>
                <span>{{ item.sharedividendname }}</span>
                <span>{{ item.fcreatetime|formatDateTime }}</span>
              </article>
            </div>
            <div class="no-data" v-show ="candy.length==0">暂无记录</div>
          </el-collapse-item>
        </el-collapse>
    </div>
  </div>
</div>
</template>
<script>
  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";
  import {formatDate} from '../../kits/dateFormat';//时间格式化
  export default {
   data() {
      return {
        activeNames: ['1'],
        candy:[],//糖果奖励
      };
    },
    methods: {
      handleChange(val) {

      }
    },
    computed:{},
    created(){
      var JournalUrl = common.apidomain + 'user/userDividend';
      ajax(JournalUrl, 'post', {}, (res) => {
        this.candy = res.data.data.recordLists;
        // console.log(this.candy);
      });
    },
    components:{},
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      },
      formatDateTime(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    }
  }
</script>
<style scoped>
.no-data{
  line-height: 100px;
}
ul {
    height: 60px;
    line-height: 60px;
    color: #c2c3c8;
    background: #11182c;
    font-size: 16px;
}

ul>li {
    width: 20%;
    float: left;
}


article>ul {
    height: 60px;
    line-height: 60px;
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
    height: 60px;
    line-height: 60px;
}

.user-rewards>article>span {
    float: left;
    width: 20%;
    color: #c2c3c8;
}
</style>
