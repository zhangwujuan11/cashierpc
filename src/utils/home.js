import request from '@/utils/request.js'
import axios from 'axios'

// 用户名获取itoken
export function iToken(){
	// console.log(JSON.parse(localStorage.getItem('user')).username)
	return axios({
		url:'https://1to2to3.cn/merchant/mer/anon/auth/validate',
		method:'POST',
		data:{
			"username": JSON.parse(localStorage.getItem('user')).username,
			// "orgId":JSON.parse(localStorage.getItem('userinfo')).orgId
		}
		
		
	})
}


// 组织id
export function orginid(data){
	return request({
		url:'mer/sysUsers/userOrgs',
		method:'get',
		params:{username:data}
	})
}
// 周交易总金额
export function payAmountWeek(data){
	return request({
		url:'/mer/mainChart/payAmountWeek',
		method:'get',
		data
	})
}

// 商户总数量、服务商总数量、总交易金额、总交易笔数
export function numCount (){
	return request({
		url:'/mer/mainChart/numCount',
		method:'get'
	})
}

// eachert统计
export function payCount(data){
	return request({
		url:'/mer/mainChart/payCount',
		method:'get',
		params:data
	})
}

// 支付方式统计
export function typeCount(data){
	return request({
		url:'/mer/mainChart/payTypeCount',
		method:'get',
		params:data
	})
}



// 商户详情
export function shanhuinfo(){
	return request({
		url:"/mer/mainChart",
		method:'get',
	})
}

