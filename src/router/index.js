import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
  	path: "/",
  	redirect: '/login'
  },
  // {
  // 	  path:'/register',
  // 	  name:'register',
  // 	  component: () => import('@/views/login/Register.vue')
  // },
  {
    path: '/merchant/index',
	component: {
		render: (e) => e("router-view")
	},
	children:[
		{
			path:'',
			name: 'merchant',
			component: () => import('@/views/merchant/Index.vue')
		},
		{
			path:'/merchant/paymenttest',
			name: 'paymenttest',
			component: () => import('@/views/merchant/Paymenttest.vue')
		},
		{
			path:'/merchant/tratnsferacc',
			name: 'tratnsferacc',
			component: () => import('@/views/merchant/Transferacc.vue')
		}
	]
  },
  {
    path: '/ordercenter/index',
  	component: {
  		render: (e) => e("router-view")
  	},
  	children:[
  		{
  			path:'',
  			name: 'ordercenter',
  			component: () => import('@/views/ordercenter/Index.vue')
  		},
		{
			path:'/ordercenter/refund',
			name:'refund',
			component: () => import('@/views/ordercenter/Refund.vue')
		},
		{
			path:'/ordercenter/transferaccounts',
			name:'transferaccounts',
			component: () => import('@/views/ordercenter/Transferaccounts.vue')
		}
  	]
  },
  {
    path: '/account/index',
  	component: {
  		render: (e) => e("router-view")
  	},
  	children:[
  		{
  			path:'',
  			name: 'account',
  			component: () => import('@/views/account/Index.vue')
  		},
		{
			path:'/account/collection',
			name:'collection',
			component: () => import('@/views/account/Collection.vue')
		},
		{
			path:'/account/ledgerrecord',
			name:'ledgerrecord',
			component: () => import('@/views/account/Ledgerrecord.vue')
		}
  	]
  },
  {
    path: '/role/index',
  	component: {
  		render: (e) => e("router-view")
  	},
  	children:[
  		{
  			path:'',
  			name: 'role',
  			component: () => import('@/views/role/Index.vue')
  		},
		{
			path:'/role/management',
			name: 'management',
			component: () => import('@/views/role/Management.vue')
		}
  	]
  }
  
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router

