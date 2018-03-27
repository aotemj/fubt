import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

import '../static/reset.css'
import '../static/common.css'
import '../static/iconfont/iconfont.css'
import '../static/iconfont/iconfont.js'
import '../static/iconfont/iconfont.eot'
import '../static/iconfont/iconfont.svg'
import '../static/iconfont/iconfont.ttf'
import '../static/iconfont/iconfont.woff'

//国际化
import VueI18n from  'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale:'zh-CN',//语言标识
  messages:{
    'zh-CN':require('../static/lang/zh'),//中文语言包
    'en-US':require('../static/lang/en')//英文语言包
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
	components: {
		App,

	},
	template: '<App/>'
})
