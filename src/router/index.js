import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import exchange from "@/components/exchange"
import finance from "@/components/finance"
import market from "@/components/market"
import newCoins from "@/components/newCoins"
import news from "@/components/news"
import c2c from "@/components/c2c"

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'home',
		component: home
	}, {
		path: '/exchange', //交易中心
		name: 'exchange',
		component: exchange
	},
  {
    path:'/finance',//财务中心
    name:'finance',
    component:finance
  },
  {
    path:'/market',//行情中心
    name:'market',
    component:market
  },
    {
      path:'/newCoins',//新币投票
      name:'newCoins',
      component:newCoins
    },
    {
      path:'/news',//新闻
      name:'news',
      component:news
    },
    {
      path:'/c2c',//c2c
      name:'c2c',
      component:c2c
    }
  ]
})
