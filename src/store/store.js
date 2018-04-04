import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		lang:'ch-CN',//当前语言
    isLogin:false,//是否登录
    username:null,//用户名
    password:null,//密码
    userInfo:{},//用户信息
    routerTo:'',//要跳转到的页面
	},
	mutations:{
    //用户登录
    userLogin(state,data){
      state.userInfo = data;
      state.isLogin = data;
    },
    userLogOut(state){
      state.isLogin = false;
    },
    changeRouterPath(state,path){
      state.routerTo = path;
    }
	}
})

