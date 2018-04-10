<template>
  <div>
    <div class="security">
      <div id="user-panel">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first">
            <div class="user_panel">
              <ul>
                  <li>登录时间</li>
                  <li>登录IP</li>
              </ul>
              <ul>
                <li v-for="(item,index) in Logonlog">
                  <span>{{ item.fupdatetime }}</span>
                  <span>{{ item.fip }}</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">
            <div class="user_panel">
              <ul>
                <li>登录时间</li>
                <li>最近安全设置</li>
                <li>登录IP</li>
              </ul>
              <ul>
                <li>
                  <span>18-02-27 10:53:48</span>
                  <span>安全</span>
                  <span>192.168.1.96</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  export default {
    data(){
       return {
        activeName: 'first',
        Logonlog:[],//登陆日志
      };
    },
    methods:{
      
    },
    computed:{},
    created(){
      var JournalUrl = common.apidomain + 'user/user_loginlog';
      var Jourfd = new FormData();
      Jourfd.append('currentPage',1);

      ajax(JournalUrl, 'post', Jourfd, (res) => {
        this.Logonlog = res.data.data.flogs.data;
        // console.log(this.Logonlog);
      });
    },
    components:{}
  }
</script>
<style scoped>
#user-panel>ul,
.user_panel,
.security>ul {
    color: #c2c3c8;
    background: #0e1326;
}

#user-panel {
    width: 100%;
    margin-bottom: 3%;
}

#user-panel>ul>li:first-child {
    margin: 0 79px 0 30px;
}

#user-panel>ul {
    height: 50px;
    margin-bottom: 9px;
}

#user-panel>ul>li {
    height: 50px;
    line-height: 50px;
    float: left;
    font-size: 12px;
    font-family: '微软雅黑';
    cursor: pointer;
}

#user-panel>ul>li:hover {
    color: #338ff5;
}
.user_panel {
    width: 100%;
}

.user_panel>ul {
    padding: 0 30px;
}

.user_panel>ul:first-child {
    display: flex;
    font-size: 16px;
}

.user_panel>ul:first-child>li {
    flex: 1;
}

.user_panel>ul>li {
    height: 50px;
    line-height: 50px;
    display: flex;
}

.user_panel>ul>li>span {
    flex: 1;
    text-align: left;
    font-size: 12px;
}
</style>
