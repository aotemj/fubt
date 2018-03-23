import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import tradingCenter from "@/components/tradingCenter"

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: home
	}, {
		path: '/trading', //交易中心
		name: 'tradingCenter',
		component: tradingCenter
	}]
})
