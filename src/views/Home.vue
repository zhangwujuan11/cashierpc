<template>
  <div class="maincon">
	  <div class="home">
		 <div class="infobox transaction">
		 	<p>今日交易金额</p>
			<p>
				<span class="jine">￥{{homedatalist.todayAmount}}</span>
				共{{homedatalist.todayPayCount}}笔
			</p>
			<h5></h5>
			<p class="transactionbotrtonm"> 
				<span>昨日交易金额：￥{{homedatalist.todayAmount}}</span>
				<span>近七天交易金额：￥{{homedatalist.payWeek}}</span>
			</p>
		 </div> 
		 <ul class="userinfo">
			 <li class="infobox" @click="dialogVisible=true" style="cursor: pointer;">
				<div class="informationLeft">
					<img src="@/assets/images/ellipse.png">
					<div>Hello，{{username}}商户 <br> <span>超级管理员</span></div>
				</div>
					<img class="diandian" src="@/assets/images/diandiandain.png">
			 </li>
			 <li class="infobox">
				 <p style="margin-top: 0;">交易总金额</p>
				 <p class="bigfont">￥{{total.totalAmount}}</p>
			 </li>
			 <li class="infobox">
				 <p style="margin-top: 0;">交易总笔数</p>
				 <p class="bigfont">{{total.totalCount}}笔</p>
			 </li>
		 </ul>
		 <Indexchart></Indexchart>
		 <Piechart></Piechart>
	  </div>
	  
	  <!-- 蒙尘 -->
	  <el-dialog
	    title="商户信息"
	    append-to-body
	    :visible.sync="dialogVisible"
	    width="50%"
	    >
	    <div class="chen">
	    	<p>
	    		<span>商户号：</span>{{shanhuinfo.mchNo}}
	    	</p>
	    	<p>
	    		<span>商户名称：</span>{{shanhuinfo.mchName}}
	    	</p>
	    	<p>
	    		<span>商户简称：</span>{{shanhuinfo.contactName}}
	    	</p>
	    	<p>
	    		商户类型：<span class="sh">{{shanhuinfo.type | type}}</span>
	    	</p>
	    	<p>
	    		<span>联系人姓名：</span>{{shanhuinfo.mchShortName}}
	    	</p>
	    	<p>
	    		<span>联系人手机号：</span>{{shanhuinfo.contactTel}}
	    	</p>
	    	<p>
	    		<span>联系人邮箱：</span>{{shanhuinfo.contactEmail}}
	    	</p>
	    </div>
	  </el-dialog>
	  
  </div>
</template>
<script>
	import Indexchart from'@/components/home/Indexchart.vue'
	import Piechart from'@/components/home/Piechart.vue'
	import {payAmountWeek,numCount,shanhuinfo} from '@/utils/home.js'
	export default{
		filters:{
			type(e){
				if(e==1){
					return '普通商户'
				}else if(e==2){
					return '特约商户'
				}
			}
		},
		data(){
			return{
				dialogVisible:false,
				homedatalist:{},
				username:JSON.parse(localStorage.getItem('user')).username,
				total:{},
				shanhuinfo:{}
			}
		},
		mounted(){
				payAmountWeek().then(res=>{
					this.homedatalist=res.data.data
				})
				numCount().then(res=>{
					this.total=res.data.data
				})
				shanhuinfo().then(res=>{
					this.shanhuinfo=res.data.data
				})
		},
		components:{
			Indexchart,
			Piechart
		}
	}
</script>
<style scoped>
	.home{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.transaction{
		width: 48%;
		height: 280px;
	}
	.jine{
		font-size: 20px;
		margin-right: 10px;
	}
	.transaction h5{
		border-bottom: 1px solid #C4C4C480;
		padding-top: 128px;
		box-sizing: border-box;
		margin-bottom: 0;
	}
	.transactionbotrtonm{
		display: flex;
		justify-content: space-between;
		margin-top: 0;
	}
	.informationLeft{
		display: flex;
		align-items: center;
		font-size: 18px;
	}
	.informationLeft img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 10px;
	}
	.informationLeft span{
		font-size: 14px;
		line-height:38px;
	}
	.diandian{
		width:24px;
		height: 24px;
		position: absolute;
		right: 15px;
		top: 11px;
	}
	.userinfo{
		width: 47%;
		margin: 0;
	}
	.userinfo li{
		height: 82px;
		box-sizing: border-box;
		margin-bottom: 20px;
	}
	.bigfont{
		font-size: 18px;
	}
	
	/* 蒙尘 */
	p{
		font-size: 14px;
		margin-bottom:25px;
		width: 100%;
		display: flex;
		align-items: center;
	}
	p img{
		width: 50px;
		height: 18px;
	}
	:deep(.el-dialog){
		 border-radius: 10px !important;
	}
	:deep(.el-dialog__header){
		 border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}
	.sh{
		padding: 4px;
		border: 1px solid #b7eb8f;
		background-color: #f6ffed;
		color: #52c41a;
		border-radius: 4px;
	}
</style>
