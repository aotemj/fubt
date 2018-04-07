import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		lang:'ch-CN',//当前语言
    isLogin:!!localStorage.getItem('userToken'),//是否登录
    username:null,//用户名
    password:null,//密码
    userInfo:{

    },//用户信息
    token:localStorage.getItem('userToken')||'',//
    routerTo:'',//要跳转到的页面
    personalAsset:[],//个人资产
    // 弹出框信息
    message:{
      status:false,
      dataInfo:''
    }

  },
	mutations:{
    //用户登录
    userLogin(state,data){
      state.userInfo = data.user;
      state.isLogin = true;
      state.token = data.token;
      localStorage.setItem('userToken',data.token);

    },
    //用户登出
    userLogOut(state){
      state.isLogin = false;
      state.token = '';
      localStorage.setItem('userToken','');
    },
    //登录后路由跳转
    changeRouterPath(state,path){
      state.routerTo = path;
    },
    //获取个人资产列表
    getPersonalAsset(state,data){
     state.personalAsset = data;
    },
    // 4.0改变弹出框信息
    changeDialogInfo(state,data){
      state.message.status=true;
      state.message.dataInfo=data;
    },
    // 5.0关闭弹窗
    close(state){
      state.message.status=false;
      state.message.dataInfo='';
    }
  }
})

