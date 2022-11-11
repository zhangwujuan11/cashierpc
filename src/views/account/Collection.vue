<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">主页 / 分账管理 / 收款账号管理</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-select v-model="myFrom.appId" placeholder="全部应用">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
				
				
				<el-input v-model="myFrom.receiverId" placeholder="分账接收者ID[精准]"></el-input>
				<el-input v-model="myFrom.receiverAlias" placeholder="接收者账号别名[模糊]"></el-input> 
				<el-input v-model="myFrom.receiverGroupId" placeholder="组ID[精准]"></el-input> 
				
				<el-select v-model="myFrom.state" placeholder="账号状态">
				    <el-option
				      v-for="item in options2"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="btnbox">
				<el-button type="primary">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
				<el-button  @click="dialo(myFrom.appId)" type="primary">新建</el-button>
			</div>
			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<el-dialog
		  title="绑定分账接收者账号"
		  append-to-body
		  :visible.sync="dialogVisible"
		  width="50%"
		  >
		  <div class="chen">
		  	<el-form :model="ruleForm"  @submit.native.prevent  ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  	  <p>
				  绑定分账接收者账号
			  </p>
			  <p>
				  当前应用：
				  <span>
					  {{rest}}
				  </span>
			  </p>
		  	  <p>
		  		   
						选择要加入到的账号分组：
					<br>
					<el-select v-model="ruleForm.aa" placeholder="支付状态">
					    <el-option
					      v-for="item in options3"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
		  	  </p>
		  	  <el-form-item>
		  	    <el-button @click="dialogVisible=false">取消</el-button>
		  		<el-button type="primary" @click="submitForm('ruleForm')">发送绑定请求</el-button>
		  	  </el-form-item>
		  	</el-form>
		  </div>
		</el-dialog>
		
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/account/Collectiontable.vue'
	import {mchApps} from '@/utils/merchant.js'
	import {divisionReceiverGroups} from '@/utils/account.js'
	
	export default{
		components:{
			Travelpermit,
			Table
		},
		data(){
			return{
				options: [],
				options2: [{
				  value: 0,
				  label: '暂停分账'
				}, {
				  value: 1,
				  label: '正常分账'
				}],
				options3: [],
				value3: '',
				ruleForm: {
					  aa:''
					},
			dialogVisible:false,
			myFrom:{
				appId:'',
				state:null,
				receiverId:'',
				receiverAlias:'',
				receiverGroupId:''
			},
			rest:''
			}
		},
		created() {
			mchApps().then(res=>{
				let obj=res.data.data.records
				for(var i=0;i<obj.length;i++){
					this.options.push({
						value:obj[i].appName + '[' + obj[i].appId + ']',
						label:obj[i].appName + '[' + obj[i].appId + ']'
					})
				}
			})
		},
		methods:{
			// 重置
			resetForm(){
				Object.assign(this.$data.myFrom,this.$options.data().myFrom)
			},
			// 新增开始
			dialo(n){
				if(n==''){
					this.$message.error("请先选择应用")
				}else{
					divisionReceiverGroups().then(res=>{
						let objs=res.data.data.records
						this.options3=[]
						for(var i=0;i<objs.length;i++){
							this.options3.push({
								value:objs[i].receiverGroupName,
								label:objs[i].receiverGroupName
							})
						}
						this.dialogVisible=true
						this.rest=n
					})
				}
				
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
		align-items: center;
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