<template>
	<div class="maincon">
		<Travelpermit></Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-input v-model="myfrom.appId"  placeholder="输入应用APPID"></el-input>
				<el-input v-model="myfrom.appName" placeholder="输入应用名称"></el-input>
				 <el-select v-model="myfrom.state" placeholder="应用状态">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="serchcoed(myfrom)">查询</el-button>
				<el-button  @click="resetForm()">重置</el-button>
				<el-button type="primary" @click="dialogVisible=true">新建</el-button>
			</div>
			<Table></Table>
		</div>
		
		<!-- 蒙尘 -->
		<el-dialog
		  title="新增应用"
		  append-to-body
		  :visible.sync="dialogVisible"
		  width="50%"
		  >
		  <div class="chen">
			<el-form :model="ruleForm"  @submit.native.prevent :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item   label="应用名称"  prop="appName">
				<el-input type="text" v-model="ruleForm.appName" placeholder='输入应用名称'></el-input>
			  </el-form-item>
			  <el-form-item  label="状态">
				<el-radio-group size="small" v-model="ruleForm.state">
				   <el-radio :label="1">启用</el-radio>
				   <el-radio :label="0">停用</el-radio>
				 </el-radio-group>
			  </el-form-item>
			 <el-form-item label="私钥AppSecret" prop="appSecret">
			    <el-input type="text" v-model="ruleForm.appSecret" placeholder='输入应用名称' disabled></el-input> <br>
				<button class="appsecretBtn" @click="getappsecret">随机生成私钥</button>
			 </el-form-item>
			  <el-form-item label="备注">
			   <el-input
				 type="textarea"
				 :rows="3"
				 placeholder="请输入备注信息"
				 v-model="ruleForm.remark">
			   </el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button>取消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		</el-dialog>
		
		
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/merchant/Indextable.vue'
	import {addmchApps} from '@/utils/merchant.js'
	export default{
		inject:["reload"],
		components:{
			Travelpermit,
			Table
		},
		 data() {
		      return {
		        options: [{
		          value: 0,
		          label: '禁用'
		        }, {
		          value: 1,
		          label: '启用'
		        }],
		        myfrom:{
					state:null,
					appName:'',
					appId:''
				},
				dialogVisible:false,
				ruleForm: {
				  appName:'',
				  appSecret:'',
				  remark:'',
				  state:1
				},
				rules:{
					  appName: [
						{ required: true, message: '请输入应用名称', trigger: 'blur' }
					  ],
					  appSecret: [
					  		{ required: true, message: '请输入私钥或点击随机生成私钥', trigger: 'blur' }
					  ]
				    }
		      }
		    },
		methods:{
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			           if (valid) {
			             addmchApps(this.ruleForm).then(res=>{
							 this.$message.success(res.data.msg)
							this.reload()
						 })
			           } else {
			             this.$message.error('请填写完整信息')
			             return false;
			           }
			         });
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
			// 重置
			 resetForm() {
					 Object.assign(this.$data.myfrom, this.$options.data().myfrom)
			      },
		   // 查询
		   serchcoed(n){
		   	this.$router.push({
		   		path:'/merchant/index',
		   		query:n
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
	}
	.el-input , .el-select{
		width: 250px;
		margin-right: 20px;
	}
	.btnbox{
		margin-top: 30px;
	}
	.el-button{
		margin-right: 30px;
	}
	
	/* 蒙尘 */
	:deep(.el-dialog){
		 border-radius: 10px !important;
	}
	:deep(.el-dialog__header){
		 border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}
	:deep(.el-form-item__label){
		width: 150px !important;
	}
	.appsecretBtn{
		width: 150px;
		height: 30px;
		border: 0.026667rem solid #278DE5;
		border-radius: 5px;
		background-color: white;
		color: #278DE5;
		margin-left: 50px;
	}
	:deep(.el-input__inner){
		border-radius: 0.133333rem;
	}
	.el-textarea{
		width: 180px;
		height: 80px;
	}
	.el-form-item__error{
		left: 6%;
	}
</style>