import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
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
import forgetPwd from "@/components/forgetPwd"
import changePwdByPhone from "@/components/changePwdByCellPhone"
import changePwdByEmail from "@/components/changePwdByEmail"
import addNewPwdByPhone from "@/components/subcom/addNewPwdByPhone"
import addNewPwdByEmail from "@/components/subcom/addNewPwdByEmail"
import c2c_instructions from "@/components/subcom/c2c_instructions"
import nofind404 from "@/components/nofind404"//404

Vue.use(Router)

const router = new Router({
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
      path: '/finance',//财务中心
      name: 'finance',
      component: finance,
      meta: {auth: true}
    },
    {
      path: '/rechangeAndwithdrawDeposit',//充值&提现
      name: 'rechangeAndwithdrawDeposit',
      component: rechangeAndwithdrawDeposit
    },
    {
      path: '/rechangeRecord',//充值记录
      name: 'rechangeRecord',
      component: rechangeRecord
    },
    {
      path: '/withdrawDepositRecord',//提现记录
      name: 'withdrawDepositRecord',
      component: withdrawDepositRecord
    },
    {
      path: '/market',//行情中心
      name: 'market',
      component: market
    },
    {
      path: '/newCoins',//新币投票
      name: 'newCoins',
      component: newCoins
    },
    {
      path: '/news',//新闻
      name: 'news',
      component: news
    },
    {
      path: '/c2c',//c2c
      name: 'c2c',
      component: c2c
    },
    {
      path: '/currencyInfo',//币种资料
      name: 'currencyInfo',
      component: currencyInfo
    },
    {
      path: '/news/newsDetails/:newsId',//新闻详情
      name: 'newsDetails',
      component: newsDetails
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd
    },
    {
      path: '/changePwdByPhone',
      name: 'changePwdByPhone',
      component: changePwdByPhone
    },
    {
      path: '/changePwdByEmail',
      name: 'changePwdByEmail',
      component: changePwdByEmail
    },
    {
      path: '/addNewPwdByPhone/:phoneNum',
      name: 'addNewPwdByPhone',
      component: addNewPwdByPhone
    },
    {
      path: '/addNewPwdByEmail',
      name: 'addNewPwdByEmail',
      component: addNewPwdByEmail
    },
    {
      path: '/c2c_instructions',//操作说明
      name: 'c2c_instructions',
      component: c2c_instructions
    },
    {
      path: '/noFindPage',//nofind404页面
      name: 'nofind404',
      component: nofind404
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    store.commit('changeRouterPath', to.path);
  }
  //
  // if (!store.state.isLogin && (to.path === '/exchange')) {
  //   next({ path: '/login' })
  // }else{
  //   next()
  // }


  if (to.matched.some(m => m.meta.auth)) {

// 对路由进行验证
    if (store.state.isLogin) { // 已经登陆
      next()   // 正常跳转到你设置好的页面
    } else {
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
      next({path: '/login', query: {Rurl: to.fullPath}})
    }
  } else {
    next()
  }
})


export default router
