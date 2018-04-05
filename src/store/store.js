import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		lang:'ch-CN',//当前语言
    isLogin:false,//是否登录
    username:null,//用户名
    password:null,//密码
    userInfo:{

    },//用户信息
    token:'',//
    routerTo:'',//要跳转到的页面

	},
	mutations:{
    //用户登录
    userLogin(state,data){
      state.userInfo = data.user;
      state.isLogin = true;
      state.token = data.token
    },
    //用户登出
    userLogOut(state){
      state.isLogin = false;
    },
    //登录后路由跳转
    changeRouterPath(state,path){
      state.routerTo = path;
    },

	}
})

