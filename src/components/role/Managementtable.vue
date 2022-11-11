<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"  style="width:100%;">
			<el-table-column prop="roleId" label="角色ID">
			</el-table-column>
			<el-table-column prop="roleName" label="角色名称">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<span class="xiugai" @click="jinjiao(scope.row.roleId)">修改</span>
					<span class="delet" @click="deljinjiao(scope.row.roleId)">删除</span>
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
		<el-dialog title="修改角色" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" status-icon @submit.native.prevent :rules="rules" ref="ruleForm"
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
							<el-button type="primary" @click="savedata">保存</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>
		<router-view></router-view>
	</div>
</template>

<script>
	import {sysRoles,showTree,showsysRoles,hasroles,changeroles,delrolse} from '@/utils/role.js'
	export default {
		inject:["reload"],
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					roleName:'',
					entIdListStr:'',
					roleId:''
				},
				rules: {
					roleName: [{
						required: true,
						message: '请输入应用名称',
						trigger: 'blur'
					}]
				},
				// 权限菜单
				  data: [],
				  defaultProps: {
					children: 'children',
					label: 'entName'
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
		created(){
			this.getDatas()
			showTree().then(res=>{
				this.data=res.data.data
			})
		},
		methods: {
			// 分页
			getData() {
				this.totalCount = this.tableData.length
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				this.currentPage = val
			},
			getDatas(n){
				sysRoles(n).then(res=>{
					this.tableData=res.data.data.records
				})
			},
			
			//修改
			jinjiao(n) {
				showsysRoles(n).then(res=>{
					this.ruleForm=res.data.data
				})
				hasroles({
					roleId:n,
					pageNumber:-1,
					pageSize:-1
				}).then(data=>{
					let arr=[]
					 data.data.data.records.forEach(item => {
					          if (!this.$refs.tree.getNode(item.entId).childNodes || !this.$refs.tree.getNode(item.entId).childNodes.length) {
					            arr.push(item.entId)
					          }
					        })
					        this.$refs.tree.setCheckedKeys(arr)
					// console.log(data.data.data.records)
				})
				this.dialogVisible=true
			},
			// 保存修改
			savedata(){
				this.ruleForm.entIdListStr=JSON.stringify(this.$refs.tree.getCheckedKeys()) 
				changeroles(this.ruleForm).then(res=>{
					this.$message.success(res.data.msg)
					this.reload()
				})
			},
			// 删除
			deljinjiao(n){
				this.$confirm('确认删除？', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							delrolse(n).then(res=>{
								this.$message({
								  type: 'success',
								  message:res.data.msg
								});
								this.reload()
							}).catch(()=>{
								this.$message({
								  type: 'erroe',
								  message:res.data.msg
								});
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
	:deep(.el-table th.el-table__cell) {
		background-color: #F5F5F5 !important;
	}

	.zz {
		color: #1C64A3;
		background-color: rgba(39, 141, 229, 0.2);
		border-radius: 4px;
		padding: 2px 5px;
		margin-right: 4px;
	}

	.sh {
		color: #1CA329;
		background-color: rgba(155, 181, 158, 0.2);
		border-radius: 4px;
		padding: 2px 5px;
		margin-right: 4px;
	}

	:deep(.el-table .cell) {
		line-height: 35px;
		white-space: nowrap;
		overflow: hidden;
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
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.chen img {
		width: 8px;
		height: 13px;
		margin-right: 13.5px;
	}

	.chen .el-form {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.chen .el-form .chendiv {
		width: 50%;
	}

	.appsecretBtn {
		width: 2.933333rem;
		height: 0.8rem;
		border: 0.026667rem solid #278DE5;
		border-radius: 0.133333rem;
		background-color: white;
		color: #278DE5;
	}

	:deep(.el-input__inner) {
		border-radius: 0.133333rem;
	}

	.el-input {
		width: 200px;
	}

	.tips {
		color: #E56C6C;
		font-size: 0.32rem;
		line-height: 28px;
		margin-bottom: 0.426667rem;
		width: 180px;
		margin-bottom: 25px;
	}

	.allin {
		border-bottom: 2px solid #C4C4C480;
		padding-bottom: 15px;
		box-sizing: border-box;
		margin-bottom: 0;
		width: 100%;
	}

	.el-checkbox-group {
		min-height: 200px;
		margin-bottom: 15px;
		margin-top: 15px;
		width: 100%;
	}

	.btnbox {
		display: flex;
		justify-content: center;
		width: 100%;
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
</style>
