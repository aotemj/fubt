import Vue from 'vue'
import Vuex from 'vuex'
import common from '../kits/domain'
import {ajax} from '../kits/http'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'ch-CN',//当前语言
    isLogin: !!localStorage.getItem('userToken'),//是否登录
    username: null,//用户名
    password: null,//密码
    userInfo: {},//用户信息
    token: localStorage.getItem('userToken') || '',//
    routerTo: '',//要跳转到的页面
    personalAsset: JSON.parse(localStorage.getItem('personalAsset')) || [],//个人资产
    // 弹出框信息
    message: {
      status: false,
      dataInfo: '',
      skipurl: ''//要跳转的路由（第三个参数）
    },
    voteTipsStatus: false,//投票状态

    phoneResetSecond: '',//忘记密码-手机找回-下一步按钮第二次调用接口/validate/reset_phone时候，返回的数据（下一步需要这个字段值当做参数传递要保存下来）

    //市场信息
    marketList: [],
    marketLoading: true,
  },
  mutations: {
    //用户登录
    userLogin(state, data) {
      state.userInfo = data.user;
      state.isLogin = true;
      state.token = data.token;
      localStorage.setItem('userToken', data.token);
      console.log(state.userInfo);
    },
    //用户登出
    userLogOut(state) {
      state.isLogin = false;
      state.token = '';
      localStorage.setItem('userToken', '');
      router.push({path: '/'});//点击退出到首页
      let url = common.apidomain + 'user/logout';
      ajax(url, 'post', {}, (res) => {
      });
    },
    //登录后路由跳转
    changeRouterPath(state, path) {
      state.routerTo = path;
    },
    //获取个人资产列表
    getPersonalAsset(state, data) {
      state.personalAsset = data;
    },
    // 4.0改变弹出框信息-友情提示-加入第三个跳转路由参数之 前 的
    // changeDialogInfo(state,data){
    //   state.message.status=true;
    //   state.message.dataInfo=data;
    // },
    changeDialogInfo(state, data) {//加入第三个跳转路由参数之 后 的
      state.message.status = true;
      state.message.dataInfo = data.dataInfo;
      state.message.skipurl = data.skipurl;
      // console.log(state.message.skipurl);
    },
    // 5.0关闭弹窗-加入第三个跳转路由参数之前的
    // close(state){
    //   state.message.status=false;
    //   state.message.dataInfo='';
    //   state.voteTipsStatus = false;//关闭外层弹窗
    // }
    close(state) {//加入第三个跳转路由参数之 后 的
      state.message.status = false;
      state.message.dataInfo = '';
      state.voteTipsStatus = false;//关闭外层弹窗
      // console.log(state.message.skipurl);
      router.push({path: state.message.skipurl});
    },

    // 6.0将忘记密码-手机找回-下一步按钮第二次调用接口返回的数据保存起来：设置phoneResetSecond的方法
    setphoneResetSecond(state, data) {
      state.phoneResetSecond = data;
    },
    //  获取市场信息
    getMarket(state, data) {
      state.marketList = data;
      state.marketLoading = false;
    }
  }
})

