import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		lang:'ch-CN',//当前语言
    isLogin:false,//是否登录
    username:null,//用户名
    password:null,//密码
	},
	mutations:{

	}
})

