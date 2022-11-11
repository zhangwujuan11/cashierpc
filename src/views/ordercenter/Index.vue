<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">主页 / 订单中心 / 订单管理</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<div class="block">
				    <el-date-picker
				      v-model="riqi"
				      type="daterange"
				      range-separator="—"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
					  format="yyyy 年 MM 月 dd 日"
					   value-format="yyyy-MM-dd">
				    </el-date-picker>
				  </div>
				<el-input v-model="myFrom.unionOrderId" placeholder="支付/商户/渠道订单号"></el-input>
				<el-input v-model="myFrom.appId" placeholder="应用APPID"></el-input> 
				<el-select v-model="myFrom.wayCode" placeholder="支付方式">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.label">
				    </el-option>
				</el-select>
				
				<el-select v-model="myFrom.state" placeholder="支付状态">
				    <el-option
				      v-for="item in options2"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
				
				<el-select v-model="myFrom.divisionState" placeholder="分账状态">
				    <el-option
				      v-for="item in options3"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="btnbox">
				<el-button type="primary" @click='serchdata()'>查询</el-button>
				<el-button @click='resendata()'>重置</el-button>
			</div>
			<Table></Table>
		</div>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/ordercenter/Indextable.vue'
	import {payWaysss} from '@/utils/ordercenter.js'
	export default{
		components:{
			Travelpermit,
			Table
		},
		 data() {
		      return {
		        options: [],
				options2: [{
				  value:  0,
				  label: '订单生成'
				}, {
				  value: 1,
				  label: '支付中'
				}, {
				  value: 2,
				  label: '支付成功'
				}, {
				  value: 3,
				  label: '支付失败'
				}, {
				  value: 4,
				  label: '已撤销'
				},{
				  value: 5,
				  label: '已退款'
				},{
				  value: 6,
				  label: '订单关闭'
				}
				],
				options3: [{
				  value: 0,
				  label: '未发生分账'
				}, {
				  value: 1,
				  label: '等待分账任务处理'
				}, {
				  value: 2,
				  label: '分账处理中'
				}, {
				  value: 3,
				  label: '分账任务已结束'
				}],
				riqi:'',
				myFrom:{
					createdStart:'',
					createdEnd: '',
					unionOrderId:'',
					appId: '',
					wayCode:'',
					state: null,
					divisionState: null
				}
		      }
		    },
		created() {
			payWaysss().then(res=>{
				let obj=res.data.data.records
				for(var i=0;i<obj.length;i++){
					this.options.push({value:i,label:obj[i].wayName})
				}
			})
		},
		methods:{
			serchdata(){
				this.myFrom.createdStart=this.riqi[0]
				this.myFrom.createdEnd=this.riqi[1]
				this.$router.push({
					path:'/ordercenter/index',
					query:this.myFrom
				})
			},
			resendata(){
				Object.assign(this.$data.myFrom,this.$options.data().myFrom)
				this.riqi=[]
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
</style>