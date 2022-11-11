<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">主页 / 分账管理 / 账号组管理</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-input v-model="myFrom.receiverGroupId" type='number' placeholder="组ID"></el-input>
				<el-input v-model="myFrom.receiverGroupName" placeholder="组名称"></el-input> 
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="serchdata()">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
				<el-button type="primary" @click="dialogVisible=true">新建</el-button>
			</div>
			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<el-dialog
		  title="新增菜单"
		  append-to-body
		  :visible.sync="dialogVisible"
		  width="50%"
		  >
		  <div class="chen">
		  	<el-form :model="ruleForm" @submit.native.prevent :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  	  <el-form-item  label="组名称" prop="receiverGroupName">
		  	    <el-input type="text"v-model="ruleForm.receiverGroupName" placeholder='输入组名称'></el-input>
		  	  </el-form-item>
		  	  <el-form-item  label="自动分账组">
		  	    <el-radio-group size="small" v-model="ruleForm.autoDivisionFlag">
		  	       <el-radio :label="1">是</el-radio>
		  	       <el-radio :label="0">否</el-radio>
		  	     </el-radio-group>
		  	  </el-form-item>
		  	  <el-form-item>
		  		    <p class="tips">1.自动分账组：当订单分账模式为自动分账，该组下的所有正常分账状态的账号将作为订单分账对象</p>
		  			<p class="tips">2.每个商户仅有一个默认分账组，当该组更新为自动分账时，其他组将改为否</p>
		  	  </el-form-item>
		  	  <el-form-item>
		  	    <el-button>取消</el-button>
		  		<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
		  	  </el-form-item>
		  	</el-form>
		  </div>
		</el-dialog>
		
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/account/Indextable.vue'
	import {adddiv} from '@/utils/account.js'
	export default{
		inject:["reload"],
		components:{
			Travelpermit,
			Table
		},
		data(){
			return{
				ruleForm: {
					  receiverGroupName:'',
					  autoDivisionFlag:0
					},
			 rules:{
				  receiverGroupName: [
					{ required: true, message: '请输入应用名称', trigger: 'blur' }
				  ]
				},
			myFrom:{
				receiverGroupName:'',
				receiverGroupId:''
			},
			dialogVisible:false
			}
		},
		methods:{
			// 新增
			submitForm(formName) {
			       this.$refs[formName].validate((valid) => {
			         if (valid) {
			           adddiv(this.ruleForm).then(res=>{
							this.$message.success(res.data.msg);
							this.reload()
			           })
			         } else {
			           console.log('error submit!!');
			           return false;
			         }
			       });
			     },
		 // 重置
		 resetForm(){
			 Object.assign(this.$data.myFrom,this.$options.data().myFrom)
		 },
		 // 查询
		 serchdata(){
			 this.$router.push({
				 path:'/account/index',
				 query:this.myFrom
			 })
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
	.chen{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.appsecretBtn{
		width: 2.933333rem;
		height: 0.8rem;
		border: 0.026667rem solid #278DE5;
		border-radius: 0.133333rem;
		background-color: white;
		color: #278DE5;
	}
	:deep(.el-input__inner){
		border-radius: 0.133333rem;
	}
	.el-input{
		width: 200px;
	}
	.tips{
		color: #E56C6C;
		font-size: 0.32rem;
		line-height: 28px;
		margin-bottom: 0.426667rem;
		width: 180px;
		margin-bottom: 25px;
	}
	:deep(.el-form-item__error){
		top: 60% !important;
	}
	
	/deep/ input::-webkit-outer-spin-button,
	/deep/ input::-webkit-inner-spin-button {
	  -webkit-appearance: none !important;
	}
	/deep/ input[type='number'] {
	  -moz-appearance: textfield;
	}
</style>