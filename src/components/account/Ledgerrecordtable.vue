<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"  style="width:100%;">
			<el-table-column prop="province" label="分账金额">
				<template slot-scope="scope">
					￥{{scope.row.calDivisionAmount | calDivisionAmount}}
				</template>
			</el-table-column>
			<el-table-column prop="batchOrderId" label="分账批次号">
			</el-table-column>
			<el-table-column prop="payOrderId" label="支付订单号">
			</el-table-column>
			<el-table-column prop="ifCode" label="接口代码">
			</el-table-column>
			<el-table-column label="订单金额">
				<template slot-scope="scope">
					{{scope.row.payOrderAmount | calDivisionAmount}}
				</template>>
			</el-table-column>
			<el-table-column label="分账基数">
				<template slot-scope="scope">
					{{scope.row.payOrderDivisionAmount | calDivisionAmount}}
				</template>
			</el-table-column>
			<el-table-column prop="receiverAlias" label="分账别名">
			</el-table-column>
			<el-table-column prop="accNo" label="接收账号">
			</el-table-column>
			<el-table-column prop="accName" label="账号姓名">
			</el-table-column>
			<el-table-column prop="relationTypeName" label="分账关系类型">
			</el-table-column>
			<el-table-column prop="shou2" label="分账比例">
				<template slot-scope="scope">
					{{scope.row.divisionProfit | divisionProfit}}
				</template>
			</el-table-column>
			<el-table-column  label="分账状态">
				<template slot-scope="scope">
					{{scope.row.state | state}}
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建日期" width="250">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<span @click="jinhao(scope.row.recordId)" style="color: #1a79ff;cursor: pointer;">详情</span>
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
		<el-dialog title="记录详情" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<p>
					<span>分账记录ID：{{dialogList.recordId}}</span>
				</p>
				<p>
					<span>商户号：{{dialogList.mchNo}}</span>
				</p>
				<p>
					<span>应用ID：{{dialogList.appId}}</span>
				</p>
				<p>
					<span>支付接口代码：{{dialogList.ifCode}}</span>
				</p>
				<p>系统支付订单号：{{dialogList.payOrderId}}</p>
				<p>
					<span>支付订单渠道支付订单号： <br> {{dialogList.payOrderChannelOrderNo}}</span>
				</p>
				<p><span>订单金额：{{dialogList.payOrderAmount | calDivisionAmount}}</span></p>
				<p>
					<span>分账基数：{{dialogList.payOrderDivisionAmount | calDivisionAmount}}（订单金额-手续费-退款金额）</span>
				</p>
				<p>
					<span>系统分账批次号：{{dialogList.batchOrderId}}</span>
				</p>
				<p>上游分账批次号：{{dialogList.channelBatchOrderId}}</p>
				<p>
					<span>状态：<span class="dingdan">{{dialogList.state | state}}</span></span>
				</p>
				<p>
					<span>分账接收者ID：{{dialogList.receiverId}}</span>
				</p>
				<p>
					<span>收款账号组ID：{{dialogList.receiverGroupId}}</span>
				</p>
				<p><span>收款账号别名：{{dialogList.receiverAlias}}</span></p>
				<p>
					<span>分账接收账号类型：{{dialogList.accType | accType}}</span>
				</p>
				<p>
					<span>分账接收账号：{{dialogList.accNo}}</span>
				</p>
				<p>
					<span>分账接收账号名称：{{dialogList.accName}}</span>
				</p>
				<p>
					<span>分账关系类型：{{dialogList.relationType}}</span>
				</p>
				<p>
					<span>分账关系类型名称：{{dialogList.relationTypeName}}</span>
				</p>
				<p>
					<span>实际分账比例：{{dialogList.divisionProfit | divisionProfit}}</span>
				</p>
				<p>
					<span>分账金额：{{dialogList.calDivisionAmount | calDivisionAmount}}</span>
				</p>
				<p>创建时间：{{dialogList.createdAt}}</p>
				<p>更新时间：{{dialogList.updatedAt}}</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p>上游返回数据包：{{dialogList.channelRespResult}}</p>
			</div>
		</el-dialog>

		<router-view></router-view>
	</div>
</template>

<script>
	import {records,recordinfo} from '@/utils/account.js'
	export default {
		filters:{
			calDivisionAmount(e){
				return e/100
			},
			divisionProfit(e){
				return (e*100).toFixed(2) + '%'
			},
			state(e){
				if(e==0){
					return '待分账'
				}else if(e==1){
					return '分账成功'
				}else if(e==2){
					return '分账失败'
				}
			},
			accType(e){
				if(e==0){
					return '个人'
				}else if(e==1){
					return '商户'
				}
			}
		},
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					appid: '',
					appname: '',
					status: 1,
					appsecret: '',
					textarea: ''
				},
				rules: {
					appname: [{
						required: true,
						message: '请输入应用名称',
						trigger: 'blur'
					}]
				},
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5,
				dialogList:{}
			}
		},
		created(){
			this.getDatas()
		},
		methods: {
			getDatas(n){
				records(n).then(res=>{
					this.tableData=res.data.data.records
				})
			},
			jinhao(n) {
				this.dialogVisible = true
				recordinfo(n).then(res=>{
					this.dialogList=res.data.data
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
		},
		watch:{
			tableData(){
				this.getData()
			},
			$route(n){
				this.getDatas(n.query)
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
	p{
		width: 48%;
		font-size: 14px;
		margin-bottom:25px;
		display: flex;
		align-items: center;
	}
	:deep(.el-dialog){
		 border-radius: 10px !important;
	}
	:deep(.el-dialog__header){
		 border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}
	
	p img{
		width: 50px;
		height: 18px;
	}

	.chen {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
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
	.dingdan {
		color: #1C64A3;
		background-color: rgba(39, 141, 229, 0.2);
		border-radius: 4px;
		padding:  2px 5px;
		margin-right:4px;
		border: 1px solid #278DE580;
	}
	/deep/ .el-table .cell{
	    white-space:pre-line;
	}
</style>
