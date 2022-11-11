<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">主页 / 订单中心 / 转账订单</div>
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
				<el-input v-model="myFrom.unionOrderId" placeholder="转账/商户/渠道订单号"></el-input>
				<el-input v-model="myFrom.appId" placeholder="应用APPID"></el-input> 
				<el-select v-model="myFrom.state" placeholder="转账状态">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="serchdata()">查询</el-button>
				<el-button @click='resetfrom'>重置</el-button>
			</div>
			<Table></Table>
		</div>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/ordercenter/Transfertable.vue'
	export default{
		components:{
			Travelpermit,
			Table
		},
		 data() {
		      return {
		        options: [{
		          value: 0,
		          label: '订单生成'
		        }, {
		          value: 1,
		          label: '转账中'
		        }, {
		          value: 2,
		          label: '转账成功'
		        }, {
		          value: 3,
		          label: '转账失败'
		        }, {
		          value: 4,
		          label: '订单关闭'
		        }],
		        value: '',
				riqi:[],
				myFrom:{
					createdStart:'',
					createdEnd:'',
					unionOrderId:'',
					appId:'',
					state:null
				}
		      }
		    },
		methods:{
			// 重置
			resetfrom(){
				Object.assign(this.$data.myFrom,this.$options.data().myFrom)
				this.riqi=[]
			},
			// 查询
			serchdata(){
				this.myFrom.createdStart=this.riqi[0]
				this.myFrom.createdEnd=this.riqi[1]
				this.$router.push({
					path:'/ordercenter/transferaccounts',
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
</style>