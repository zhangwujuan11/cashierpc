<template>
	<div class="datable">
		<el-table
		:data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" 
		 style="width:100%;"
		 >
			<el-table-column
			  label="支付金额"
			 >
			 <template slot-scope="scope">
				 ￥ {{scope.row.amount | amount}}
			 </template>
			</el-table-column>
			<el-table-column
			  label="退款金额"
			 >
			 <template slot-scope="scope">
			 	￥ {{scope.row.refundAmount | amount}}
			 </template>
			</el-table-column>
			<el-table-column
			  label="手续费"
			 >
			 <template slot-scope="scope">
			 	￥ {{scope.row.mchFeeAmount | amount}}
			 </template>
			 </el-table-column>
			<el-table-column
			  label="订单号"
			  style="overflow-x: hidden;white-space: nowrap;"
			  width='280'
			  >
			  <template  slot-scope="scope">
				  <span class="zz">支付</span>{{scope.row.payOrderId}}<br>
				  <span class="sh">商户</span>{{scope.row.mchOrderNo}}
			  </template>
			</el-table-column>
			<el-table-column
			   label="支付方式"
			  >
			  <template slot-scope="scope">
				  {{scope.row.ext.wayName}}
			  </template>
			</el-table-column>
			<el-table-column
			   prop="state"
			   label="支付状态"
			  >
			  <template slot-scope="scope">
				  {{scope.row.state | state}}
			  </template>
			</el-table-column>
			<el-table-column
			   label="分账状态"
			>
			  <template slot-scope="scope">
			  		{{scope.row.divisionState | divisionState}}
			  </template>>
			</el-table-column>
			<el-table-column
			   prop="createdAt"
			   label="创建日期"
			   width='300'
			  >
			</el-table-column>
			<el-table-column
			   label="操作"
			  >
			  <template slot-scope="scope">
				  <span style="color: #1a79ff;cursor: pointer;" @click="jinhao(scope.row.payOrderId)">详情</span>
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
		    title="订单详情"
		    append-to-body
		    :visible.sync="dialogVisible"
		    width="50%"
		    >
		    <div class="chen">
		    	<p>
		    		<span>服务商号：{{orderinfo.isvNo}}</span>
		    	</p>
				<p>
					<span>支付订单号：<span class="dingdan">{{orderinfo.payOrderId}}</span></span>
				</p>
				<p>
					<span>商户号：{{orderinfo.mchNo}}</span>
				</p>
				<p>
					<span>商户订单号：{{orderinfo.mchOrderNo}}</span>
				</p>
		    	<p>
		    		<span>商户名称：{{orderinfo.mchName}}</span>
		    	</p>
				<p>
					<span>应用APPID：{{orderinfo.appId}}</span>
				</p>
				<p>
					<span>订单状态：{{orderinfo.state | state}}</span>
				</p>
				<p>
					<span>支付金额：<span class="zhifu">{{orderinfo.amount | amount}}</span></span>
				</p>
		    	<p>
		    		<span>手续费：<span class="shouxu">{{orderinfo.mchFeeAmount | amount}}</span></span>
		    	</p>
		    	<p>
		    		<span>商家费率：{{orderinfo.mchFeeRate}}</span>
		    	</p>
		    	<p>
		    		<span>支付错误码：{{orderinfo.errCode}}</span>
		    	</p>
		    	<p>
		    		<span>支付错误描述：{{orderinfo.errMsg}}</span>
		    	</p>
				<p>
		    		<span>订单失效时间：{{orderinfo.expiredTime}}</span>
		    	</p>
		    	<p>
		    		<span>支付成功时间：{{orderinfo.successTime}}</span>
		    	</p>
		    	<p>
		    		<span>创建时间：{{orderinfo.createdAt}}</span>
		    	</p>
		    	<p>
		    		<span>更新时间：{{orderinfo.updatedAt}}</span>
		    	</p>
		    	<!-- border -->
		    	<p class="fengeborder"></p>
		    	
		    	<p>
		    		<span>商品标题：{{orderinfo.subject}}</span>
		    	</p>
		    	<p>
		    		<span>商品描述：{{orderinfo.body}}</span>
		    	</p>
		    	<p>
		    		<span>接口代码：{{orderinfo.payOrderId}}</span>
		    	</p>
				<p>
					<span>货币代码：{{orderinfo.currency}}</span>
				</p>
		    	<p>
		    		<span>支付方式：{{orderinfo.wayCode}}</span>
		    	</p>
		    	<p>
		    		<span>客户端IP：{{orderinfo.clientIp}}</span>
		    	</p>
		    	<p>
		    		<span>用户标识：{{orderinfo.channelUser}}</span>
		    	</p>
				<p>
					渠道订单号：{{orderinfo.channelOrderNo}}
				</p>
				<p>
					异步通知地址：{{orderinfo.notifyUrl}}
				</p>
				<p>
					页面跳转地址：{{orderinfo.returnUrl}}
				</p>
				<p>
					退款次数：{{orderinfo.refundTimes}}
				</p>
				<p>
					退款总额：{{orderinfo.refundAmount|amount}}
				</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p>
					订单分账模式：{{orderinfo.divisionMode|divisionMode}}
				</p>
				<p>
					分账状态：{{orderinfo.divisionState|divisionState}}
				</p>
				<p>
					最新分账发起时间：{{orderinfo.divisionLastTime}}
				</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p>
					扩展参数：{{orderinfo.extParam}}
				</p>
		    </div>
		  </el-dialog>
		  <router-view></router-view>
	</div>
</template>

<script>
	import {payWays,payOrder} from '@/utils/ordercenter.js'
	export default{
		filters:{
			amount(e){
				return e/100
			},
			state(e){
				if(e==0){
					return '订单生成'
				}else if(e==1){
					return '支付中'
				}else if(e==2){
					return '支付成功'
				}else if(e==3){
					return '支付失败'
				}else if(e==4){
					return '已撤销'
				}else if(e==5){
					return '已退款'
				}else if(e==6){
					return '订单关闭'
				}
			},
			divisionState(e){
				if(e==0){
					return '未发生分账'
				}else if(e==1){
					return '等待分账任务处理'
				}else if(e==2){
					return '分账处理中'
				}else if(e==3){
					return '分账任务已结束'
				}
			},
			divisionState(e){
				if(e==0){
					return '未发生分账'
				}else if(e==1){
					return '等待分账任务处理'
				}else if(e==2){
					return '分账处理中'
				}else if(e==3){
					return '分账任务已结束'
				}
			},
			divisionMode(e){
				if(e==0){
					return '该笔订单不允许分账'
				}else if(e==1){
					return '支付成功按配置自动完成分账'
				}else if(e==2){
					return '商户手动分账(解冻商户金额)'
				}
			}
		},
		data(){
			return{
				tableData: [],
			    dialogVisible:false,
				orderinfo:{},
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
			jinhao(n){
				this.dialogVisible=true
				payOrder(n).then(res=>{
					this.orderinfo=res.data.data
				})
			},
			getDatas(n){
				payWays(n).then(res=>{
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
	.chen{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	p img{
		width: 50px;
		height: 18px;
	}
	.dingdan {
		color: #2751E5;
		background-color: rgba(39, 81, 229, 0.2);
		border: 1px solid rgba(39, 81, 229, 0.5);
		border-radius: 4px;
		padding:2px 5px;
	}
	
	.shouxu {
		color: #E527B0;
		background-color: rgba(229, 39, 176, 0.2);
		border: 1px solid rgba(229, 39, 176, 0.5);
		border-radius: 4px;
		padding:2px 5px;
	}
	
	.zhifu {
		color: #27E53A;
		background-color: rgba(39, 229, 58, 0.2);
		border: 1px solid rgba(39, 229, 58, 0.5);
		border-radius: 4px;
		padding: 2px 5px;
	}
	
	.fengeborder {
		border-top: 1px solid rgba(196, 196, 196, 0.5);
		width: 100%;
		margin: 0.32rem 0;
	}
	/deep/ .el-table .cell{
	    white-space:pre-line;
	}
</style>