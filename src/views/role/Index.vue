<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">主页 / 系统管理 / 用户角色管理 / 操作员管理</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-input v-model="ruleFrom.sysUserId" placeholder="用户ID"></el-input>
				<el-input v-model="ruleFrom.realname" placeholder="用户姓名"></el-input> 
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="submitForm()">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
				 <el-button type="primary" @click="diables=true">新建</el-button>
			</div>
			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<el-dialog title="新增操作员" append-to-body :visible.sync="diables" width="50%">
			<div class="chen">
				<el-form :model="myfrom" @submit.native.prevent :rules="rules2" ref="myfrom" label-width="100px"
					class="demo-ruleForm">
					<div>
						<el-form-item label="用户登录名" prop="loginUsername">
							<el-input type="text" v-model="myfrom.loginUsername"  placeholder='输入用户登录名'></el-input>
							<span style="margin-left: 15px;color: darkgray;">初始密码：123456</span>
						</el-form-item>
						<el-form-item label="用户姓名" prop="realname">
							<el-input type="text" v-model="myfrom.realname" placeholder='输入用户姓名'></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="telphone">
							<el-input type="text" v-model="myfrom.telphone" placeholder='输入手机号'></el-input>
						</el-form-item>
						<el-form-item label="编号" prop="userNo">
							<el-input type="text" v-model="myfrom.userNo" placeholder='输入编号'></el-input>
						</el-form-item>
						<el-form-item label="请选择性别" prop="sex">
							<el-radio-group v-model="myfrom.sex">
								<el-radio :label="1">男</el-radio>
								<el-radio :label="2">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="状态" prop="state">
							<el-radio-group v-model="myfrom.state">
								<el-radio :label="1">启用</el-radio>
								<el-radio :label="0">停用</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
					<el-form-item style="width: 100%;">
						<el-button @click="diables=false">取消</el-button>
						<el-button type="primary" @click="subm('myfrom')">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/role/Indextable.vue'
	import {addUser} from '@/utils/login.js'
	export default{
		inject:["reload"],
		components:{
			Travelpermit,
			Table
		},
		 data() {
			 var validatePass = (rule, value, callback) => {
			 	let reg=/^1[3-9]\d{9}$/
			 	if (!reg.test(value)) {
			 	callback(new Error('请输入正确的手机号'))
			   } 
			   callback()
			 }
		      return {
			   diables:false,
			   Nwebu:false,
			 myfrom: {
			 	loginUsername: '',
			 	realname: '',
			     sex: 1,
			 	state: 1,
			 	telphone: '',
			 	userNo: ''
			 },
			 rules2: {
			 	loginUsername: [{
			 		required: true,
			 		message: '请输入用户登录名',
			 		trigger: 'blur'
			 	}],
			 	realname: [{
			 		message: '请输入用户姓名',
			 		required: true,
			 		trigger: 'blur'
			 	}],
			 	userNo:[{
			 		message: '请输入编号',
			 		required: true,
			 		trigger: 'blur'
			 	}],
			 	telphone: [{
			 		validator: validatePass,
			 		required: true,
			 		trigger: 'blur'
			 	}]
			 },
			 ruleFrom:{
				 sysUserId:'',
				 realname:''
			 },
			  checked:false,
			  checkedd:false,
			  secend:true,
			  secpass:'password',
			  three:true,
			  thrpass:'password'
		      }
		    },
		methods:{
			// 新增操作员
			subm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// console.log(this.myfrom)
						addUser(this.myfrom).then(res=>{
							if(res.data.code !=200){
								this.$message.error(res.data.msg);
							}else{
								this.$message.success(res.data.msg);
								this.$store.state.rolindexdilago=false
								this.reload()
							}
							
							
						})
						 } else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(){
				Object.assign(this.$data.ruleFrom,this.$options.data().ruleFrom)
			}
		}
	}
</script>

<style scoped>
	.inputBox{
		width: 100%;
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
	}
	.el-input , .el-select{
		width: 300px;
		margin-right: 20px;
		margin-bottom: 30px;
	}
	.btnbox{
		margin-bottom: 30px;
	}
	.el-button{
		margin-right: 30px;
	}
	.block{
		margin-right: 20px;
		width: 400px;
	}
	:deep(.el-date-editor--daterange.el-input__inner){
		width: 100%;
		margin-bottom: 30px;
	}
	/* 蒙尘 */
	:deep(.el-dialog){
		 border-radius: 10px !important;
	}
	:deep(.el-dialog__header){
		 border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}
	:deep(.demo-ruleForm){
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.demo-ruleForm .el-input{
		width: 200px;
	}
	.demo-ruleForm .el-form-item{
		margin-bottom: 0;
	}
	.savediv{
		width: 320px;
		display: flex;
		justify-content: space-between;
	}
	.accou{
		width: 100px;
		text-align: right;
		padding-right: 12px;
		box-sizing: border-box;
	}
	
</style>