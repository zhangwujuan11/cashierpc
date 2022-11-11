<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width:100%;padding-bottom: 2.6rem;">
			<el-table-column prop="appId" label="应用APPID">
			</el-table-column>
			<el-table-column prop="appName" label="应用名称">
			</el-table-column>
			<el-table-column  label="状态">
				<template slot-scope="scope">
					{{scope.row.state | state}}
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建日期" width="300">
			</el-table-column>
			<el-table-column  label="操作"  width="320">
				<template slot-scope="scope" class="rebox">
					<span @click="modify(scope.row)">修改</span>&nbsp;&nbsp;
					<span @click="configuration(scope.row.appId)">支付配置</span>&nbsp;&nbsp;
					<el-dropdown>
					  <span class="el-dropdown-link">
					    更多<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item>支付测试</el-dropdown-item>
					    <el-dropdown-item>发起转账</el-dropdown-item>
					    <el-dropdown-item @click.native='delmchApp(scope.row.appId)'> <span style="color: red;">删除</span></el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
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
		<el-dialog title="修改应用" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm"  @submit.native.prevent :rules="rules" ref="ruleForm"
					label-width="100px" class="demo-ruleForm">
					<el-form-item label="应用APPID">
						<el-input type="text" v-model="ruleForm.appId" placeholder='输入应用APPID' disabled></el-input>
					</el-form-item>
					<el-form-item label="应用名称" prop="appName">
						<el-input type="text" v-model="ruleForm.appName" placeholder='输入应用名称'></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-radio-group size="small" v-model="ruleForm.state">
							<el-radio :label="0">停用</el-radio>
							<el-radio :label="1">启用</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="私钥AppSecret" prop="appSecret">
						<el-input type="text" v-model="ruleForm.appSecret" placeholder='输入应用名称' disabled></el-input>
						<button class="appsecretBtn" @click="getappsecret">随机生成私钥</button>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" :rows="3" placeholder="请输入备注信息" v-model="ruleForm.remark">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click='dialogVisible=false'>取消</el-button>
						<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
		 		</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<!-- 支付配置 -->
		<el-dialog append-to-body :visible.sync="paymentVisible" width="50%" custom-class="paymentdialog">
			<div class="account">
				<el-tabs v-model="activeName">
					<el-tab-pane label="支付参数配置" name="first">
						<Payment :paymentdata="paymentdata"></Payment>
					</el-tab-pane>
					<el-tab-pane label="支付通道配置" name="second">
						<Channel :paymentdata="paymentdata"></Channel>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/merchant/Payment.vue'
	import Channel from '@/components/merchant/Channel.vue'
	import {mchApps,updatamchApps,delmchApps} from '@/utils/merchant.js'
	export default {
		inject:["reload"],
		filters:{
			state(e){
				if(e==1){
					return '启用'
				}else if(e==0){
					return '禁用'
				}
			}
		},
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					appId: '',
					appName: '',
					appSecret: '',
					remark: '',
					state: null
				},
				rules: {
					appName: [{
						required: true,
						message: '请输入应用名称',
						trigger: 'blur'
					}],
					appSecret: [{
						required: true,
						message: '请生成秘钥',
						trigger: 'blur'
					}]
				},

				paymentVisible: false,
				activeName: 'first',
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5,
				paymentdata:''
			}

		},
		components:{
			Payment,
			Channel
		},
		mounted() {
			this.getDatas()
		},
		methods: {
			getDatas(n){
				mchApps(n).then(res=>{
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
			// 支付配置
			configuration(n) {
				this.paymentVisible = true
				this.paymentdata=n
			},
			// 修改
			modify(n) {
				this.ruleForm=n
				this.dialogVisible = true
			},
			// 生成私钥
			getappsecret(){
				let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
				let tempStr=''
				for(var i=0; i<32; ++i){
					tempStr += chars.charAt(Math.floor(Math.random() * 32 ));
				}
				this.ruleForm.appSecret=tempStr
			},
			// 确认修改
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			           if (valid) {
			             updatamchApps(this.ruleForm).then(res=>{
							 this.$message.success(res.data.msg)
							 this.reload()
						 })
			           } else {
			             this.$message.error('请填写完整信息')
			             return false;
			           }
			         });
			},
			// 删除
			delmchApp(n){
				 this.$confirm('确认删除', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							delmchApps(n).then(res=>{
								this.$message({
								  type: 'success',
								  message: res.data.msg
								})
								this.reload()
							}).catch(()=>{
								this.$message.error('删除失败')
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
	.datable {
		margin-top: 30px;
		width: 100%;
	}

	:deep(.el-table th.el-table__cell) {
		background-color: #F5F5F5 !important;
	}

	.cell span {
		color: #278DE5;
		margin-right: 0.533333rem;
	}

	.cell span img {
		width: 0.24rem;
		height: 0.24rem;
		margin-left: 0.186667rem;
	}

	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
		border-bottom: none !important;
		cursor: pointer;
	}

	.el-table::before {
		height: 0;
	}

	:deep(.el-table__row td:last-child) {
		position: relative;
	}

	/* 蒙尘 */
	:deep(.el-dialog) {
		border-radius: 10px !important;
	}

	:deep(.el-dialog__header) {
		border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}

	.appsecretBtn {
		width: 150px;
		height: 30px;
		border: 0.026667rem solid #278DE5;
		border-radius: 5px;
		background-color: white;
		color: #278DE5;
		margin-left: 50px;
	}

	:deep(.el-input__inner) {
		border-radius: 0.133333rem;
	}

	.el-textarea {
		width: 180px;
		height: 80px;
	}

	.el-form-item__content .el-input {
		width: 50%;
	}

	:deep(.el-form-item__label) {
		width: 150px !important;
	}


	.account {
		width: 100%;
		background-color: white;
		position: relative;
	}

	:deep(.el-tabs__nav) {
		width: 8.8rem;
		display: flex;
	}

	:deep(.el-tabs__nav-scroll) {
		display: flex;
		justify-content: left;
		width: 80%;
	}

	:deep(.el-tabs__active-bar) {
		height: 0.106667rem;
	}

	:deep(.el-tabs__nav-wrap::after) {
		height: 1px;
	}

	:deep(.el-tabs__item) {
		color: #515151;
	}

	:deep(.paymentdialog .el-dialog__body) {
		padding-top: 0;
	}

	:deep(.paymentdialog .el-dialog__header) {
		border: none;
	}

	:deep(.paymentdialog .el-dialog__header) {
		padding: 24px 20px 10px;
	}
	:deep(.el-form-item__error){
			left: 6% !important;
		}
</style>
