import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import exchange from "@/components/exchange"
import finance from "@/components/finance"
import market from "@/components/market"
import newCoins from "@/components/newCoins"
import news from "@/components/news"
import c2c from "@/components/c2c"
import rechangeAndwithdrawDeposit from "@/components/rechange&widthdrawDeposit"//充值&提现
import rechangeRecord from "@/components/rechangeRecord"//充值
import withdrawDepositRecord from "@/components/withdrawDepositRecord"//提现
import currencyInfo from "@/components/subcom/currencyInfo"//币种资料
import newsDetails from "@/components/newsDetails"
import user from "@/components/user"
import login from "@/components/login"
import register from "@/components/register"
Vue.use(Router)

const router =  new Router({
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
      path:'/rechangeAndwithdrawDeposit',//充值&提现
      name:'rechangeAndwithdrawDeposit',
      component:rechangeAndwithdrawDeposit
    },
    {
      path:'/rechangeRecord',//充值记录
      name:'rechangeRecord',
      component:rechangeRecord
    },
    {
      path:'/withdrawDepositRecord',//提现记录
      name:'withdrawDepositRecord',
      component:withdrawDepositRecord
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
    },
    {
      path:'/currencyInfo',//币种资料
      name:'currencyInfo',
      component:currencyInfo
    },
    {
      path:'/news/newsDetails',
      name:'newsDetails',
      component:newsDetails
    },
    {
      path:'/user',
      name:'user',
      component:user
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:register
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  next()
})

export default router
