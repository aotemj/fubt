import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		lang:'ch-CN',//当前语言
    isLogin:true,//是否登录
	},
	mutations:{

	}
})

