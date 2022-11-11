<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">主页 / 分账管理 / 分账记录</div>
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
				<el-input v-model="myFrom.receiverId" placeholder="分账接受者ID"></el-input>
				<el-input v-model="myFrom.receiverGroupId" placeholder="分账账号组ID"></el-input> 
				<el-input v-model="myFrom.appId" placeholder="应用APPID"></el-input> 
				<el-input v-model="myFrom.payOrderId" placeholder="支付订单号"></el-input> 
				<el-input v-model="myFrom.accNo" placeholder="分账接收账号"></el-input>
				<el-select v-model="myFrom.state" placeholder="应用状态">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="btnbox">
				<el-button type="primary" @click='serchdata'>查询</el-button>
				<el-button @click='resendata()'>重置</el-button>
			</div>
			<Table></Table>
		</div>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/account/Ledgerrecordtable.vue'
	export default{
		components:{
			Travelpermit,
			Table
		},
		data(){
			return{
				options: [{
				  value: 0,
				  label: '待分账'
				}, {
				  value: 1,
				  label: '分账成功'
				}, {
				  value: 2,
				  label: '分账失败'
				}],
				riqi:[],
				myFrom:{
					createdStart:'',
					createdEnd:'',
					receiverId:'',
					receiverGroupId:'',
					appId:'',
					payOrderId:'',
					accNo:'',
					state:null
				}
			}
		},
		methods:{
			// 重置
			resendata(){
				Object.assign(this.$data.myFrom,this.$options.data().myFrom)
				this.riqi=[]
			},
			//查询
			 serchdata(){
				 this.myFrom.createdStart=this.riqi[0]
				 this.myFrom.createdEnd=this.riqi[1]
				 this.$router.push({
					 path:'/account/ledgerrecord',
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
	.chen p span{
		color: #E56C6C;
	}
	.chen p{
		margin-bottom: 15px;
	}
	
</style>