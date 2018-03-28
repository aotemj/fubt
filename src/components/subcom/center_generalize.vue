<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="一级推广" name="first">
      <div class="promotion">
        <article>
          <p>推广人数：<span>1</span>人</p>
          <p> 邀请链接：<span>http://fubt.top/user/register.html?uid=80986</span><span>复制链接</span></p>
        </article>
        <ul>
          <li>序号</li>
          <li>登录名</li>
          <li>用户</li>
          <li>邮箱</li>
          <li>手机号</li>
          <li>注册时间</li>
        </ul>
        <div class="promotion-list">
          <ul>
            <li>
              <span>1</span>
              <span>18210625886</span>
              <span>杨孝喜</span>
              <span>1530469928@qq.com</span>
              <span>18210625886</span>
              <span>18-02-27 10:53:48</span>
            </li>
          </ul>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="二级推广" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="三级推广" name="third">
      <div class="promotion">
        <article>
            <p>推广人数：<span>1</span>人</p>
            <p> 邀请链接：<span>http://fubt.top/user/register.html?uid=80986</span><span>复制链接</span></p>
        </article>
        <ul>
          <li>序号</li>
          <li>登录名</li>
          <li>用户</li>
          <li>邮箱</li>
          <li>手机号</li>
          <li>注册时间</li>
        </ul>
        <div class="promotion-list">
          <ul>
            <li>
              <span>1</span>
              <span>18210625886</span>
              <span>杨孝喜</span>
              <span>1530469928@qq.com</span>
              <span>18210625886</span>
              <span>18-02-27 10:53:48</span>
            </li>
          </ul>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data(){
      return {
        activeName: 'first'
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    computed:{},
    components:{}
  }
</script>
<style scoped>
.promotion {
    width: 100%;
    background: #11182c;
}

.promotion>ul>li{
  margin-left:1.5%;
}

.promotion>article>p,
.promotion>ul>li,
.promotion>ul>li>span {
    color: #c2c3c8;
}

.promotion>article {
    padding: 25px 30px;
    text-align:left;
}

.promotion>article>p:first-child {
    font-size: 22px;
}

.promotion>article>p:last-child,
.promotion>article>p:last-child>span:last-child {
    font-size: 14px;
}

.promotion>article>p:last-child {
    margin-top: 20px;
}

.promotion>article>p:last-child>span:last-child {
    border: 1px solid #c2c3c8;
    border-radius: 5px;
    padding: 4px 5px;
    cursor: pointer;
    margin-left: 45px;
}

.promotion>ul {
    height: 60px;
    line-height: 60px;
}

.promotion>ul>li {
    width: 16%;
    float: left;
    font-size: 16px;
}

.promotion-list>ul>li {
    height: 50px;
    line-height: 50px;
    cursor: pointer;
}

.promotion-list>ul>li:nth-child(4),
li:nth-child(5) {
    padding-left: 0;
}

.promotion-list>ul>li>span {
    display: inline-block;
    width: 16%;
    color: #c2c3c8;
    font-size: 14px;
}

</style>
