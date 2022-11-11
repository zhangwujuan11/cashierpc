<template>
	<div class="topmenu">
		
		
		
		<el-dropdown>
		  <span class="el-dropdown-link">
			  	<img class="ellipse" src='@/assets/images/ellipse.png'>
			  	<span>{{username}}商户</span>
				<i class="el-icon-caret-bottom"></i>
		    
		  </span>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item   @click.native="dialogVisible=true"><i class="el-icon-setting"></i>账户设置</el-dropdown-item>
		    <el-dropdown-item  @click.native="logout"><i class="el-icon-switch-button" ></i>退出登录</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
		<!-- <div class="shagnhu"  v-if="setting">
			<p @click="dialogVisible=true">
				<i class="el-icon-setting"></i>&emsp;
				账户设置
			</p>
			<p @click="logout">
				<i class="el-icon-switch-button" ></i> &emsp;
				退出登录
			</p>
		</div> -->
		
		<!-- 蒙尘 -->
		<el-dialog
		  append-to-body
		  :visible.sync="dialogVisible"
		  width="50%"
		  >
		  <div class="account">
		  	<el-tabs v-model="activeName">
		  		<el-tab-pane label="基本信息" name="first">
		  			<Bassmess></Bassmess>
		  		</el-tab-pane>
		  		<el-tab-pane label="安全信息" name="second">
		  			<Security></Security>
		  		</el-tab-pane>
		  	</el-tabs>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import Bassmess from '@/components/home/Bassmess.vue'
	import Security from '@/components/home/Security.vue'
	export default{
		data(){
			return {
				dialogVisible:false,
				 activeName: 'first',
				 username:'',
			}
		},
		components:{
			Bassmess,
			Security
		},
		created(){
			let ne=localStorage.getItem('user')
			if(ne != null){
				this.username=JSON.parse(localStorage.getItem('user')).username
			}
		},
		methods:{
			// 退出
			logout(){
				localStorage.removeItem('user')
				localStorage.removeItem('iToken')
				this.$router.push('/login')
			}
		}
	}
</script>

<style scoped>
	.topmenu{
		width: 100%;
		position: static;
		right: 0;
		display: flex;
		justify-content: right;
		height: 20px;
		margin:20px 0 0 0;
		padding-right: 25px;
		box-sizing: border-box;
	}
	.ellipse{
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}
	.topmenu div{
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.topmenu div span{
		margin-left: 15px;
		margin-right: 15px;
	}
	
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
	.topmenu div span{
		display: flex;
		align-items: center;
	}
	
	/* 蒙尘 */
	:deep(.el-dialog){
		 border-radius: 10px !important;
	}
	.account{
		width: 100%;
		background-color: white;
		position: relative;
	}
	:deep(.el-tabs__nav){
		width: 8.8rem;
		display: flex;
	}
	:deep(.el-tabs__nav-scroll){
		display: flex;
		justify-content: left;
		width: 80%;
	}
	:deep(.el-tabs__active-bar){
		height: 0.106667rem;
	}
	:deep(.el-tabs__nav-wrap::after){
		height: 1px;
	}
	
	:deep(.el-tabs__item){
		color: #515151;
	}
	:deep(.el-dialog__body){
		padding-top: 0;
	}
	:deep(.el-dialog__header){
		padding:24px 20px 10px;
	}
	
</style>