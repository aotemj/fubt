<template>
  <div class="con-box pr">
    <tips class=""></tips>
    <Header class="header"></Header>
    <div class="inner-box">
      <div class="login-box">
        <h4>登录</h4>
        <div class="username">
          <input type="text" placeholder="请输入手机号/邮箱" v-model.trim="username">
        </div>
        <div class="pwd">
          <input type="password" placeholder="请输入密码" v-model.trim="password">
        </div>
        <div class="todos">
          <router-link to="/forgetPwd">忘记密码？</router-link>
          <router-link to="/register">免费注册</router-link>
        </div>
        <div class="false-tips fz12"><i v-show="errorMsg"></i>{{errorMsg}}</div>
        <!--<input type="button" :disabled="logging" v-model="loginBtn" class="login-btn" v-on:click="loadCurrencyList">-->
        <el-button size="midium" :disabled="logging" class="login-btn" type="primary" :loading="logging" v-on:click="loadCurrencyList">登陆</el-button>

      </div>

    </div>
  </div>
</template>
<script>
  import Header from "./header"
  import common from "../kits/domain"
  import {ajax} from "../kits/http"
  import tips from './subcom/friendlyTips'//提示信息
  export default {
    data() {
      return {
        username: 18625512982,//赵鑫磊账号
        password: 'a111111',//赵鑫磊密码
        // username: 15738818082,//任付伟账号
        // password: 'admin123',//任付伟密码
        // username: 15994026836,//杨孝喜账号
        // password: 'a123456',//杨孝喜密码
        errorMsg: '',//错误提示
        loginBtn: '登录',
        logging: false,//登录中
      }
    },
    methods: {
      login() {
        return new Promise((resolve, reject) => {
          if (!this.username) {
            this.errorMsg = '邮箱或手机号不能为空';
            return;
          } else if (!this.password) {
            this.errorMsg = '密码不能为空';
            return;
          } else if (this.password.length < 6) {
            this.errorMsg = '密码长度不能小于6!'
            return;
          } else {
            this.errorMsg = '';
          }

          this.loginBtn = '登录中...';
          this.logging = true;

          let loginUrl = common.apidomain + 'login';

          let formData = new FormData();
          formData.append('loginName', this.username);
          formData.append('password', this.password);

          ajax(loginUrl, 'post', formData, (res) => {
            this.loginBtn = '登录';
            this.logging = false;
            if (res.data.code !== 200) {
              if (res.data.msg == '帐号不存在，<a href="/user/register.html">去注册>></a>！') {
                this.errorMsg = '账号不存在！请核对后重新输入';
                reject(res);
                return;
              }
              this.errorMsg = res.data.msg;
              return;
            } else {
              resolve(res);
            }
            // console.log(res.data);
            /*
            *  用户登陆返回信息：
            *
            {
              "code":200,
              "msg":"成功",
              "time":1522911699362,
              "data":{
                "user":{
                  "fid":81240,
                  "fshowid":81240,
                  "floginname":"15994026836",
                  "fnickname":"15994026836",
                  "floginpassword":"5pOEHXHOUCki2f6aDHY4UA==",
                  "ftradepassword":"TmDIdHTo9z+9ZM6Br9V8ww==",
                  "ftelephone":"15994026836",
                  "femail":"15994026836@163.com",
                  "frealname":"杨孝喜",
                  "fidentityno":"412726199509016752",
                  "fidentitytype":0,
                  "fgoogleauthenticator":null,
                  "fgoogleurl":null,
                  "fstatus":1,
                  "fstatus_s":"正常",
                  "fhasrealvalidate":true,
                  "fhasrealvalidatetime":1512019593000,
                  "fistelephonebind":true,
                  "fismailbind":true,
                  "fgooglebind":false,
                  "isVideo":null,
                  "videoTime":null,
                  "fupdatetime":1516785584000,
                  "fareacode":"86",
                  "version":254,
                  "fintrouid":2882,
                  "finvalidateintrocount":0,
                  "fiscny":1,
                  "fiscny_s":"正常",
                  "fiscoin":1,
                  "fiscoin_s":"正常",
                  "fbirth":809884800000,
                  "flastlogintime":1522911699315,
                  "fregistertime":1512005133000,
                  "ftradepwdtime":1512019654000,
                  "fplatform":null,
                  "identitytype":0,
                  "ip":"192.168.1.11",
                  "score":0,
                  "level":0,
                  "flastip":3232235787
                },
                "token":"eyJhbGciOiJIUzI1NiJ9.eyJmaWQiOiI4MTI0MCIsImZyZWFsbmFtZSI6IuadqOWtneWWnCIsImZpc2NvaW4iOiIxIiwiZmlkZW50aXR5bm8iOiI0MTI3MjYxOTk1MDkwMTY3NTIiLCJmaWRlbnRpdHl0eXBlIjoiMCIsImZoYXNyZWFsdmFsaWRhdGUiOiJ0cnVlIiwiZmludmFsaWRhdGVpbnRyb2NvdW50IjoiMCIsImZzdGF0dXMiOiIxIiwiZnN0YXR1c19zIjoi5q2j5bi4Iiwic2NvcmUiOiIwIiwiZmdvb2dsZWF1dGhlbnRpY2F0b3IiOm51bGwsImZpc2NueSI6IjEiLCJmZ29vZ2xldXJsIjpudWxsLCJmaXNjbnlfcyI6Iuato-W4uCIsImZwbGF0Zm9ybSI6bnVsbCwiZnNob3dpZCI6IjgxMjQwIiwiZmxvZ2lubmFtZSI6IjE1OTk0MDI2ODM2IiwiZmFyZWFjb2RlIjoiODYiLCJ2aWRlb1RpbWUiOm51bGwsImZpc2NvaW5fcyI6Iuato-W4uCIsImNsYXNzIjoiY2xhc3MgY29tLnFrd2wuY29tbW9uLmR0by51c2VyLkZVc2VyIiwiZmxvZ2lucGFzc3dvcmQiOiI1cE9FSFhIT1VDa2kyZjZhREhZNFVBPT0iLCJmaXNtYWlsYmluZCI6InRydWUiLCJmdHJhZGVwYXNzd29yZCI6IlRtRElkSFRvOXorOVpNNkJyOVY4d3c9PSIsImlkZW50aXR5dHlwZSI6IjAiLCJsZXZlbCI6IjAiLCJmZW1haWwiOiIxNTk5NDAyNjgzNkAxNjMuY29tIiwiaXAiOiIxOTIuMTY4LjEuMTEiLCJmaXN0ZWxlcGhvbmViaW5kIjoidHJ1ZSIsImlzVmlkZW8iOm51bGwsImZoYXNyZWFsdmFsaWRhdGV0aW1lIjoiVGh1IE5vdiAzMCAxMzoyNjozMyBDU1QgMjAxNyIsInZlcnNpb24iOiIyNTQiLCJmbmlja25hbWUiOiIxNTk5NDAyNjgzNiIsImZyZWdpc3RlcnRpbWUiOiJUaHUgTm92IDMwIDA5OjI1OjMzIENTVCAyMDE3IiwiZnRlbGVwaG9uZSI6IjE1OTk0MDI2ODM2IiwiZmxhc3RpcCI6IjMyMzIyMzU3ODciLCJmaW50cm91aWQiOiIyODgyIiwiZmxhc3Rsb2dpbnRpbWUiOiJUaHUgQXByIDA1IDE1OjAxOjM5IENTVCAyMDE4IiwiZnVwZGF0ZXRpbWUiOiJXZWQgSmFuIDI0IDE3OjE5OjQ0IENTVCAyMDE4IiwiZmdvb2dsZWJpbmQiOiJmYWxzZSIsImZiaXJ0aCI6IkZyaSBTZXAgMDEgMDA6MDA6MDAgQ1NUIDE5OTUiLCJmdHJhZGVwd2R0aW1lIjoiVGh1IE5vdiAzMCAxMzoyNzozNCBDU1QgMjAxNyJ9.pmcjVIvL7Z-64ge2h2G3Fbb0yv7VH6Tuvj4WDhwx3SM"
              }
            }
            */

          });

        })

      },
      //加载个人资产
      loadCurrencyList() {
        this.login().then((res) => {
          this.$store.commit('userLogin', res.data.data)

          let coinUrl = common.apidomain + 'financial/index';
          let fd = new FormData();

          ajax(coinUrl, 'post', fd, (res) => {
            if (res.data.code !== 200) {
              return;
            } else {
              // this.currencyList = res.data.data.userWalletList;
              this.$store.commit('getPersonalAsset', res.data.data.userWalletList);
              localStorage.setItem('personalAsset', JSON.stringify(res.data.data.userWalletList));
              if (this.$store.state.routerTo) {
                this.$router.push({path: this.$store.state.routerTo})
              } else {
                this.$router.push({path: '/'})
              }
            }
          })


        })
      },

    },
    created() {
    },
    components: {
      Header,
      tips
    }
  }
</script>
<style scoped>
  .inner-box {
    width: 900px;
    height: 400px;
    /*background-color: green;*/
    margin: 200px auto;
    text-align: left;
  }

  .login-box {
    font-size: 16px;

  }

  .username, .pwd {
    position: relative;
  }

  .login-box input {
    border: 1px solid #fff;
    margin-bottom: 20px;
    padding: 10px 20px;
    width: 400px;
  }

  .username-tips, .pwd-tips {
    position: absolute;
    /*right:0px;*/
    left: 410px;
    font-size: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  .pwd-tips {
    /*top:110px;*/
  }

  .todos a {
    color: #fff;
    font-size: 12px;
    flex: 1;
  }

  .todos {
    /*border:1px solid #fff;*/
    position: relative;
    width: 150px;
    display: flex;
  }

  .todos::before {
    position: absolute;
    content: '';
    height: 10px;
    width: 1px;
    background-color: #fff;
    left: 64px;
    top: 50%;
    transform: translateY(-50%);
  }

  .login-btn {
    margin-top: 10px;
    width: 100px !important;
    border: none !important;
    background-color: #445895;
    border-radius:0;
  }

  /*错误提示*/
  .false-tips {
    margin-top: 20px;
    color: #e9494d;
  }

  .false-tips i {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    width: 16px;
    height: 16px;
    background: url('../assets/errorIcon.png') no-repeat center center;
    -webkit-background-size: 16px 16px;
    background-size: 16px 16px;
  }
</style>
