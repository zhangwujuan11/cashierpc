<template>
	<div class="datable">
		<el-table
		:data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" 
		 style="width:100%;"
		 
		 >
			<el-table-column
			  prop="receiverGroupId"
			  label="组ID"
			 >
			</el-table-column>
			<el-table-column
			  prop="receiverGroupName"
			  label="组名称"
			 >
			</el-table-column>
			<el-table-column
			  prop="shou"
			  label="自动分账组"
			 >
			 <template slot-scope="scope">
				 {{scope.row.autoDivisionFlag | autoDivisionFlag}}
			 </template>
			 </el-table-column>
			<el-table-column
			  prop="createdBy"
			  label="创建人"
			  >
			</el-table-column>
			<el-table-column
			   prop="createdAt"
			   label="创建时间"
			   width='280'
			  >
			</el-table-column>
			<el-table-column
			   label="操作"
			  >
			  <template slot-scope="scope">
				  <span @click='jinhao(scope.row.receiverGroupId)' style="color: #1a79ff;cursor: pointer;margin-right: 30px;">修改</span>
				  <span @click="deldata(scope.row.receiverGroupId)" style="color: red;cursor: pointer;">删除</span>
			  </template>
			</el-table-column>
		  </el-table>
		  <el-pagination
		  	background
		  	@current-change="handleCurrentChange" 
		  	:current-page="currentPage"
		  	:page-sizes="pageSizes" 
		  	:page-size="PageSize" 
		  	layout="prev, pager, next"
		  	:total="totalCount">
		  </el-pagination>
		  
		  <!-- 蒙尘 -->
		  <el-dialog
		    title="修改菜单"
		    append-to-body
		    :visible.sync="dialogVisible"
		    width="50%"
		    >
		    <div class="chen">
		    	<el-form :model="ruleForm"  @submit.native.prevent :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		    	  <el-form-item  label="组名称" prop="receiverGroupName">
		    	    <el-input type="text" v-model="ruleForm.receiverGroupName" placeholder='输入组名称'></el-input>
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
		    	    <el-button @click="dialogVisible=false">取消</el-button>
		    		<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
		    	  </el-form-item>
		    	</el-form>
		    </div>
		  </el-dialog>
		  <router-view></router-view>
	</div>
</template>

<script>
	import {divisionReceiverGroups,adddiv,divinfo,updatadivinfo,deldivi} from '@/utils/account.js'
	export default{
		inject:["reload"],
		filters:{
			autoDivisionFlag(e){
				if(e==0){
					return '否'
				}else if(e==1){
					return '是'
				}
			}
		},
		data(){
			return{
				tableData: [],
			    dialogVisible:false,
				ruleForm: {
					  autoDivisionFlag:null,
					  receiverGroupName:''
					},
					 rules:{
						  receiverGroupName: [
							{ required: true, message: '请输入应用名称', trigger: 'blur' }
						  ]
					    },
				receiverGroupId:'',
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5
					}
				},
		created(){
			this.getDatas()
		},
		methods:{
			// 列表
			getDatas(n){
				divisionReceiverGroups(n).then(res=>{
					this.tableData=res.data.data.records
				})
			},
			// 修改
			jinhao(n){
				this.dialogVisible=true
				divinfo(n).then(res=>{
					this.ruleForm.autoDivisionFlag=res.data.data.autoDivisionFlag
					this.ruleForm.receiverGroupName=res.data.data.receiverGroupName
					this.receiverGroupId=res.data.data.receiverGroupId
				})
			},
			// 分页
			getData() {
				this.totalCount = this.tableData.length
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				this.currentPage = val
			},
			// 确认修改
			submitForm(formName) {
			       this.$refs[formName].validate((valid) => {
			         if (valid) {
						this.ruleForm.receiverGroupId=this.receiverGroupId
			           updatadivinfo(this.ruleForm).then(res=>{
							this.$message.success(res.data.msg);
							this.reload()
			           })
			         } else {
			           console.log('error submit!!');
			           return false;
			         }
			       });
			     },
		 // 删除
		 deldata(n){
			 this.$confirm('确认删除?', {
			           confirmButtonText: '确定',
			           cancelButtonText: '取消',
			           type: 'warning'
			         }).then(() => {
						deldivi(n).then(res=>{
							this.$message({
							  type: 'success',
							  message:res.data.msg
							})
							this.reload()
						})
			          
			         }).catch(() => {
			           this.$message({
			             type: 'info',
			             message: '已取消删除'
			           });          
			         });
			 
		 }
		},
		watch:{
			$route(n){
				this.getDatas(n.query)
			},
			tableData(){
				this.getData()
			}
		}
		
	}
</script>

<style scoped>
	:deep(.el-table th.el-table__cell){
		background-color: #F5F5F5 !important;
	}
	.zz{
		color: #1C64A3;
		background-color: rgba(39, 141, 229, 0.2);
		border-radius: 4px;
		padding:  2px 5px;
		margin-right:4px;
	}
	.sh{
		color: #1CA329;
		background-color: rgba(155, 181, 158, 0.2);
		border-radius: 4px;
		padding:  2px 5px;
		margin-right: 4px;
	}
	:deep(.el-table .cell){
		line-height: 35px;
		white-space: nowrap;
		overflow: hidden;
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
		top: 58% !important;
	}
</style>