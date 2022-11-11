<template>
	<div class="channel">
		<el-form :model="ruleForm"  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item  prop="pass">
			<el-input type="text" v-model="ruleForm.wayCode" placeholder='支付方式代码'></el-input>
		  </el-form-item>
		  <el-form-item prop="checkPass">
			<el-input  type="text" v-model="ruleForm.wayName" placeholder='支付方式名称'></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="submitForm()">查询</el-button>
			<el-button @click="resetForm()">重置</el-button>
		  </el-form-item>
		</el-form>
		<div class="datable">
			<el-table
			:data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
			 style="width:100%;"
			 >
				<el-table-column
				  prop="wayCode"
				  label="支付方式代码"
				  width='250'>
				</el-table-column>
				<el-table-column
				  prop="wayName"
				  label="支付方式名称"
				  >
				</el-table-column>
				<el-table-column label="状态" >
					<template slot-scope="scope">
						{{scope.row.ext.passageState | passageState}}
					</template>
				</el-table-column>
				<el-table-column
				  label="操作"
				  >
				  <template>
					  <span class="control">
						  配置
					  </span>
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
			  <!-- <p class="next"> <el-button >上一步</el-button></p> -->
		</div>
	</div>
</template>

<script>
	import {payPass} from '@/utils/merchant.js'
	export default{
		props:['paymentdata'],
		filters:{
			passageState(e){
				if(e==0){
					return '禁用'
				}else if(e==1){
					return '启用'
				}
			}
		},
		
		 data() {
		      return {
		        ruleForm: {
		          wayCode: '',
		          wayName: '',
		          appId:''
		        },
				tableData:[],
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
				this.getDatas(this.paymentdata)
			},
		    methods: {
				getDatas(n){
					payPass({
						appId:n
					}).then(res=>{
						this.tableData=res.data.data.records
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
		      submitForm() {
				  this.ruleForm.appId=this.paymentdata
		        payPass(this.ruleForm).then(res=>{
					this.tableData=res.data.data.records
				})
		      },
		      resetForm() {
		        Object.assign(this.$data.ruleForm,this.$options.data().ruleForm)
		      }
		    },
			watch: {
			       paymentdata(v) {
			           this.getDatas(v)
			       },
				   tableData(){
				   	this.getData()
				   }
			   }
	}
</script>

<style scoped>
	.el-select{
		width: 100%;
	}
	.el-form{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.el-form-item{
		width: 100%;
		display: flex;
		justify-content: left;
	}
	:deep(.el-form-item__content){
		margin-left: 0 !important;
	}
	:deep(.el-input--suffix .el-input__inner){
		padding-right: 0.4rem !important;
		width: 200px;
	}
	
	.el-table{
		 display: block;
		 overflow-x: auto;
	}
	.channel{
		padding-top: 1.6rem;
	}
	:deep(.el-table th.el-table__cell){
		background-color: #F5F5F5 !important;
	}
	
	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf){
		border-bottom: none !important;
	}
	.next{
		width: 100%;
		height: 1.28rem;
		text-align: center;
		padding-bottom: 20px;
	}
	.el-table::before {
		height:0;
	}
	/* .el-button{
		border: 1px solid #278DE580;
		color: #278DE5;
	} */
	.datable{
		height: 358px;
		overflow: hidden;
		overflow-y: scroll;
	}
	.control{
		color: #278DE5;
	}
	.el-table--fit{
		min-height: 288px;
	}
	.datable::-webkit-scrollbar {
	    display: none; /* Chrome Safari */
	}
</style>