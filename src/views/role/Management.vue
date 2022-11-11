<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">主页 / 系统管理 / 用户角色管理 / 角色管理</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-input v-model="myFrom.roleId" placeholder="角色ID"></el-input>
				<el-input v-model="myFrom.roleName" placeholder="角色名称"></el-input> 
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="serchdata()">查询</el-button>
				<el-button @click="resetdata()">重置</el-button>
				<el-button type="primary" @click="dialogVi()">新建</el-button>
			</div>
			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<el-dialog
		  title="新增角色"
		  append-to-body
		  :visible.sync="dialogVisible"
		  width="50%"
		  >
		  <div class="chen">
			<el-form :model="ruleForm"  @submit.native.prevent :rules="rules" ref="ruleForm"
				label-width="100px" class="demo-ruleForm">
				<div class="chendiv">
					<el-form-item label="角色名称" prop="roleName">
						<el-input type="text" v-model="ruleForm.roleName" placeholder='输入角色名称'></el-input>
					</el-form-item>
				</div>
				<div class="chendiv">
					<el-form-item label="请选择权限:"></el-form-item>
					<el-tree
					 ref="tree"
					  :data="data"
					  show-checkbox
					  node-key="entId"
					  :props="defaultProps">
					</el-tree>
				</div>
				<div class="chenbtnbox">
					<el-form-item>
						<el-button @click="dialogVisible=false">取消</el-button>
						<el-button type="primary" @click="subm('ruleForm')">保存</el-button>
					</el-form-item>
				</div>
			</el-form>
		  </div>
		</el-dialog>
		<Nwebuilddialog :fa="Nwebu"></Nwebuilddialog>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/role/Managementtable.vue'
	import Nwebuilddialog from '@/components/role/Nwebuilddialog.vue'
	import {showTree,plussysRoles} from '@/utils/role.js'
	export default{
		inject:["reload"],
		components:{
			Travelpermit,
			Table,
			Nwebuilddialog
		},
		 data() {
		      return {
		       dialogVisible:false,
			   Nwebu:false,
			   ruleForm: {
				   roleName:'',
			     entIdListStr:''
			   },
			   rules:{
					  roleName: [
						{ required: true, message: '请输入应用名称', trigger: 'blur' }
					  ]
			      },
			  myFrom:{
				  roleId:'',
				  roleName:''
			  },
			 
			  // 权限菜单
			    data: [],
			    defaultProps: {
					children: 'children',
					label: 'entName'
				  }
		      }
		    },
		methods:{
			// 选择权限菜单
			dialogVi(){
				showTree().then(res=>{
					this.data=res.data.data
				})
				this.dialogVisible=true
				
			},
			// 新建
			subm(formName) {
				this.ruleForm.entIdListStr=JSON.stringify(this.$refs.tree.getCheckedKeys()) 
				this.$refs[formName].validate((valid) => {
			           if (valid) {
			            plussysRoles(this.ruleForm).then(res=>{
							this.$message.success(res.data.msg)
							this.reload()
						})
			           } else {
			             console.log('error submit!!');
			             return false;
			           }
			         });
				},
			// 重置
			resetdata(){
				Object.assign(this.$data.myFrom,this.$options.data().myFrom)
			},
			// 查询
			serchdata(){
				this.$router.push({
					path:'/role/management',
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
	.delet {
		color: #E56C6C;
		cursor: pointer;
	}
	
	.xiugai {
		color: #278DE5;
		margin-right: 24px;
		cursor: pointer;
	}
	.chenbtnbox{
		width: 100%;
		margin-top: 30px;
	}
	:deep(.chenbtnbox .el-form-item__content){
		margin-left: 0 !important;
		display: flex;
		justify-content: center;
	}
	.chen img {
		width: 8px;
		height: 13px;
		margin-right: 13.5px;
	}
</style>