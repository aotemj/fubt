import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from '../src/store/store'
import VueClipboard from 'vue-clipboard2'//复制到剪切板
import SIdentify from './components/subcom/identify'//图片验证码
import ElementUI from 'element-ui';//elementui
import VueI18n from 'vue-i18n'//国际化

Vue.use(Vuex)
Vue.use(VueClipboard)
Vue.use(SIdentify)
Vue.use(ElementUI);
Vue.use(VueI18n)

Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css';
import '../static/reset.css'
import '../static/common.css'
import '../static/iconfont/iconfont.css'
import '../static/iconfont/iconfont.js'
import '../static/iconfont/iconfont.eot'
import '../static/iconfont/iconfont.svg'
import '../static/iconfont/iconfont.ttf'


import '../static/iconfont/iconfont.woff'

const i18n = new VueI18n({
  locale:'zh-CN',//语言标识
  messages:{
    'zh-CN':require('../static/lang/zh'),//简体中文语言包
    'en-US':require('../static/lang/en'),//英文语言包
    'zh-FN':require('../static/lang/fan'),//繁体中文
  }
})


Vue.filter('keepTwoNum',function(value){
  value = Number(value);
  return value.toFixed(2);
})


new Vue({
	el: '#app',
	router,
  i18n,
  store,
	components: {
		App,
    // VueQArt
	},
	template: '<App/>'
})
