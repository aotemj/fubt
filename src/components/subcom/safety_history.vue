<template>
  <div>
    <div class="security">
      <div id="user-panel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">
            <div class="user_panel" style="display:block;">
              <ul>
                  <li>登录时间</li>
                  <li>登录IP</li>
              </ul>
              <ul>
                <li>
                  <span>18-02-27 10:53:48</span>
                  <span>1.192.60.236</span>
                </li>
                <li>
                  <span>18-02-27 10:53:48</span>
                  <span>1.192.60.236</span>
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
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
       return {
        activeName: 'first'
      };
    },
    methods:{
      handleClick(tab, event) {

      }
    },
    computed:{},
    created(){},
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
}

#user-panel>ul>li:first-child {
    margin: 0 79px 0 30px;
}

#user-panel>ul {
    height: 60px;
    margin-bottom: 9px;
}

#user-panel>ul>li {
    height: 60px;
    line-height: 60px;
    float: left;
    font-size: 18px;
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
}

.user_panel>ul:first-child>li {
    flex: 1;
}

.user_panel>ul>li {
    height: 60px;
    line-height: 60px;
    display: flex;
}

.user_panel>ul>li>span {
    flex: 1;
    text-align: left;
}
</style>
