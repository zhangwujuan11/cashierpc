<template>
	<div>
		<div v-if="havetoken != null" class="header-right">
		  <span>{{usernamesh}}商户</span>
		  <el-divider direction="vertical" />
		  <span @click="logout">退出</span>
		</div>
		<div v-else>
		 <!-- <span @click='register'>注册</span>
		  <el-divider direction="vertical" /> -->
		  <span @click="dialogVisible=true">登录</span>
		</div>
		
		<!-- 登录表单 -->
		<el-dialog title="登录" append-to-body :visible.sync="dialogVisible" width="490px">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="账号：" prop="username">
						<el-input v-model="ruleForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码：" prop="password">
						<el-input v-model="ruleForm.password" type="password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="dialogVisible=false">取消</el-button>
						<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		
		
		<el-dialog title="机构选择" append-to-body :visible.sync="dialogorgin" width="490px">
			<div class="chen">
				<el-radio  v-for="(item,index) in orginid" :key="index" v-model="radio" :label="item.belongInfoId">{{item.belongInfoId}}</el-radio>
				<el-button type="primary" @click="suerorginid">确定</el-button>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	import {goLogin} from '@/utils/login.js'
	import {iToken,orginid} from '@/utils/home.js'
	export default{
		inject:["reload"],
		data(){
			return{
				havetoken:null,
				usernamesh:'',
				dialogVisible: false,
				ruleForm: {
					grant_type:'password',
					username: '',
					password: '',
					client_id:'1001',
					client_secret:'123456'
				},
				rules: {
					username: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				},
				dialogorgin:false,
				orginid:[],
				radio:''
			}
		},
		created() {
			this.havetoken=localStorage.getItem('user')
			if(this.havetoken != null){
				this.usernamesh=JSON.parse(localStorage.getItem('user')).username
			}
		},
		methods:{
			// 注册
			// register(){
			// 	this.$router.push({
			// 		path:'/register'
			// 	})
			// },
			// 登录
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						goLogin(this.ruleForm).then(res=>{
							if(res.data.code==400){
								this.$message.error(res.data.message)
							}else{
								
								
								
								// this.$message.success({
								// 	message: '登录成功',
								// 	offset: 100,
								// 	duration:600
								// })
								let userinfo={
									token:res.data.access_token,
									username:this.ruleForm.username
								}
								localStorage.setItem('user',JSON.stringify(userinfo))
								
								this.$nextTick(()=>{
									orginid(this.ruleForm.username).then(rress=>{
										this.dialogorgin=true
										this.orginid=rress.data.data
									})
									// iToken().then(resdata=>{
									// 	localStorage.setItem('iToken',JSON.stringify(resdata.data.data.iToken))
									// })
								})
								
								// this.reload()
							}
						})
					} else {
						this.$message.error("请完整填写登录信息")
						return false;
					}
				});
			},
			// 退出
			logout(){
				localStorage.removeItem('user')
				localStorage.removeItem('iToken')
				this.reload()
			},
			// 机构选择
			suerorginid(){
				
			}
		}
	}
</script>

<style scoped>
	span{
		cursor: pointer;
	}
	/* 蒙尘 */
	:deep(.el-dialog) {
		border-radius: 10px !important;
	}
	
	:deep(.el-dialog__header) {
		border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}
	
	.chen {
		width: 100%;
	}
	
	/* :deep(.el-form-item__label) {
		width: 200px !important;
	} */
	
	:deep(.chen .el-input) {
		width: 250px !important;
	}
	
</style>