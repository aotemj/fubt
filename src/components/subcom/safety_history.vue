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
              <ul v-show="security.length!=0">
                <li v-for="(item,index) in security">
                  <span>{{ item.fcreatetime }}</span>
                  <span>安全</span>
                  <span>{{ item.fip }}</span>
                </li>
              </ul>
              <div class="no-data" v-show ="security.length==0">暂无记录</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>

	// private String uuid;
	// // 主键ID
  //   private Integer fid;
  //   // 用户ID
  //   private Integer fuid;
  //   // 类型
  //   private Integer ftype;
  //   private String ftype_s;
  //   // 数据类型
  //   private Integer fdatatype;
  //   private String fdatatype_s;
  //   // 数据类型
  //   private Integer fcapitaltype;
  //   // 数据内容
  //   private BigDecimal fdata;
  //   // 数据内容
  //   private BigDecimal ffees;
  //   // 网络手续费
  //   private BigDecimal fbtcfees;
  //   // 描述
  //   private String fcontent;
  //   // IP
  //   private String fip;
  //   // 更新时间
  //   private Date fupdatetime;
  //   // 创建时间
    // private Date fcreatetime;

  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
  export default {
    data(){
       return {
        activeName: 'first',
        Logonlog:[],//登陆日志
        security:[],//登录配置
      };
    },
    methods:{
      
    },
    computed:{
      
    },
    created(){
      //登陆日志
      var JournalUrl = common.apidomain + 'user/user_loginlog';
      var Jourfd = new FormData();
      Jourfd.append('currentPage',1);
      ajax(JournalUrl, 'post', Jourfd, (res) => {
        this.Logonlog = res.data.data.flogs.data;
        // console.log(this.Logonlog);
      });
      //登录安全配置
      var securityUrl = common.apidomain + 'user/user_settinglog';
      var securityUrlfd = new FormData();
      securityUrlfd.append('currentPage',1);
      ajax(securityUrl, 'post', securityUrlfd, (res) => {
        // this.Logonlog = res.data.data.flogs.data;
        console.log(res.data.data.flogs.data);
      });
    },
    components:{}
  }
</script>
<style scoped>
.no-data{
  line-height: 100px;
}
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
    height: 40px;
    margin-bottom: 9px;
}

#user-panel>ul>li {
    height: 40px;
    line-height: 40px;
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
    height: 40px;
    line-height: 40px;
    display: flex;
    font-size: 14px;
}

.user_panel>ul>li>span {
    flex: 1;
    text-align: left;
    font-size: 12px;
}
</style>
