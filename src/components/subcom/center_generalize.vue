<template>
  <el-tabs v-model="activeName" style="margin-bottom:3%;">
    <el-tab-pane label="一级推广" name="first">
      <div class="promotion">
        <article>
          <p>推广人数：<span>{{ oneExtensionpeople.finvalidate }}</span>人</p>
          <p> 邀请链接：<span id="text">http://fubt.top/user/register.html?uid={{ oneExtensionpeople.fid }}</span><span>复制链接</span></p>
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
          <ul v-show="oneExtension.length!=0">
            <li v-for="(item,index) in oneExtension">
              <span>{{ index + 1 }}</span>
              <span>{{ item.floginname }}</span>
              <span>{{ item.frealname }}</span>
              <span>{{ item.femail }}</span>
              <span>{{ item.ftelephone }}</span>
              <span>{{ item.fregistertime }}</span>
            </li>
          </ul>
          <div class="no-data" v-show ="oneExtension.length==0">暂无记录</div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="二级推广" name="second">
      <div class="promotion">
        <article>
          <p>推广人数：<span>{{ Twopeople.finvalidate }}</span>人</p>
          <p> 邀请链接：<span id="text">http://fubt.top/user/register.html?uid={{ Twopeople.fid }}</span><span>复制链接</span></p>
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
          <ul v-show="Twopromotion.length!=0">
            <li v-for="(item,index) in Twopromotion">
              <span>{{ index + 1 }}</span>
              <span>{{ item.floginname }}</span>
              <span>{{ item.frealname }}</span>
              <span>{{ item.femail }}</span>
              <span>{{ item.ftelephone }}</span>
              <span>{{ item.fregistertime }}</span>
            </li>
          </ul>
          <div class="no-data" v-show ="Twopromotion.length==0">暂无记录</div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="三级推广" name="third">
      <div class="promotion">
        <article>
          <p>推广人数：<span>{{ Threepeople.finvalidate }}</span>人</p>
          <p> 邀请链接：<span id="text">http://fubt.top/user/register.html?uid={{ Threepeople.fid }}</span><span>复制链接</span></p>
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
          <ul v-show="Threepromotion.length!=0">
            <li v-for="(item,index) in Threepromotion">
              <span>{{ index + 1 }}</span>
              <span>{{ item.floginname }}</span>
              <span>{{ item.frealname }}</span>
              <span>{{ item.femail }}</span>
              <span>{{ item.ftelephone }}</span>
              <span>{{ item.fregistertime }}</span>
            </li>
          </ul>
          <div class="no-data" v-show ="Threepromotion.length==0">暂无记录</div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import common from "../../kits/domain";
  import {ajax} from "../../kits/http";
  export default {
    data(){
      return {
        activeName: 'first',
        oneExtension:[],//一级推广
        oneExtensionpeople:{},//推广人数
        Twopromotion:[],//二级推广
        Twopeople:{},//推广人数
        Threepromotion:[],//三级推广
        Threepeople:{},//推广人数
      }
    },
    methods:{
      
    },
    created(){
      // 一级推广
      var oneExtensionUrl = common.apidomain + 'user/intro'
      ajax(oneExtensionUrl, 'post', {}, (res) => {
        //请求推广列表数据
        this.oneExtension = res.data.data.fUserList;
        //请求推广人数
        this.oneExtensionpeople = res.data.data;
      });
      // // 二级推广
      var Twopromotionurl = common.apidomain + 'user/secondIntro'
      ajax(Twopromotionurl, 'post', {}, (res) => {
        //请求推广列表数据
        this.Twopromotion = res.data.data.fUserList;
        //请求推广人数
        this.Twopeople = res.data.data;

      });
      // //三级推广
      var ThreeExtensionUrl = common.apidomain + 'user/thirdIntro'
      ajax(ThreeExtensionUrl, 'post', {}, (res) => {
        //请求推广列表数据
        this.Threepromotion = res.data.data.fUserList;
        //请求推广人数
        this.Threepeople = res.data.data;
      });
    },
    computed:{

    },
    components:{}
  }
</script>
<style scoped>
  .no-data{
    line-height: 100px;
  }
.promotion {
    width: 100%;
    background: #11182c;
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
    height: 50px;
    line-height: 50px;
}

.promotion>ul>li {
    width: 16.5%;
    float: left;
    font-size: 14px;
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
    font-size: 12px;
}

</style>
