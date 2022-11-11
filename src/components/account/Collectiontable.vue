<template>
	<div class="datable">
		<el-table
		:data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" 
		 style="width:100%;"
		 @row-click="jinhao"
		 >
			<el-table-column
			  prop="province"
			  label="绑定ID"
			 >
			</el-table-column>
			<el-table-column
			  prop="tui"
			  label="渠道类型"
			 >
			</el-table-column>
			<el-table-column
			  prop="shou"
			  label="账号别名"
			 >
			 </el-table-column>
			<el-table-column
			  prop="city"
			  label="组名称"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="分账接收账号"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="分账接收账号名称"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="分账关系类型"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="状态"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="绑定成功时间"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="默认分账比例"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="操作"
			  >
			  <template slot-scope="scope">
				  <span style="color: #1a79ff;">修改</span>
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
		 <!-- <el-dialog
		    title="修改菜单"
		    append-to-body
		    :visible.sync="dialogVisible"
		    width="50%"
		    >
		    <div class="chen">
		    	<el-form :model="ruleForm" status-icon @submit.native.prevent :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		    	  <el-form-item  label="组名称" prop="appname">
		    	    <el-input type="text" v-model="ruleForm.appid" placeholder='输入组名称'></el-input>
		    	  </el-form-item>
		    	  <el-form-item  label="自动分账组">
		    	    <el-radio-group size="small" v-model="ruleForm.status">
		    	       <el-radio :label="1">是</el-radio>
		    	       <el-radio :label="2">否</el-radio>
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
		  </el-dialog> -->
		  
		  <router-view></router-view>
	</div>
</template>

<script>
	import {divisionReceivers} from '@/utils/account.js'
	export default{
		data(){
			return{
				tableData: [],
			    dialogVisible:false,
				ruleForm: {
					  appid:'',
					  appname:'',
					  status:1,
					  appsecret:'',
					  textarea:''
					},
					 rules:{
						  appname: [
							{ required: true, message: '请输入应用名称', trigger: 'blur' }
						  ]
					    },
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
		created() {
			this.getDatas()
		},
		methods:{
			// 收款账号列表
			getDatas(n){
				divisionReceivers(n).then(res=>{
					this.tableData=res.data.data.records

					// console.log(res.data.data)
				})
			},
			jinhao(n){
				this.dialogVisible=true
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
			watch:{
				// $route(n){
				// 	this.getDatas(n.query)
				// },
				tableData(){
					this.getData()
				}
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
</style>