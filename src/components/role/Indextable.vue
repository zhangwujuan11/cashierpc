<template>
	<div class="datable">
		<el-table
		:data="tableData"
		 style="width:100%;"
		 >
			<el-table-column
			  prop="sysUserId"
			  label="用户ID"
			 >
			</el-table-column>
			<el-table-column
			  prop="realname"
			  label="姓名"
			 >
			</el-table-column>
			<el-table-column
			  label="性别"
			 >
			 <template slot-scope="scope">
				 {{scope.row.sex | sex}}
			 </template>
			 </el-table-column>
			<el-table-column
			  label="头像"
			  >
			  <template slot-scope="scope">
				  <img class="avauel" :src="scope.row.avatarUrl" alt="">
			  </template>
			</el-table-column>
			<el-table-column
			   prop="userNo"
			   label="编号"
			  >
			</el-table-column>
			<el-table-column
			   prop="telphone"
			   label="手机号"
			  >
			</el-table-column>
			<el-table-column
			   label="超管"
			  >
			  <template slot-scope="scope">
			  {{scope.row.isAdmin | isAdmin}}</template>>
			</el-table-column>
			<el-table-column
			   prop="state"
			   label="状态"
			   width='220'
			  >
			  <template slot-scope="scope">
				  <el-switch
				    v-model="scope.row.state"
				    active-text="启用"
				    inactive-text="停用"
					@change="SwitchChange(scope.row.state,scope.row.sysUserId)" :active-value="1" :inactive-value="0"
					inactive-color="#ff4949"
					>
				  </el-switch>
			  </template>
			</el-table-column>
			<el-table-column
			   prop="createdAt"
			   label="创建时间"
			  >
			</el-table-column>
			<el-table-column
			   prop="updatedAt"
			   label="修改时间"
			  >
			</el-table-column>
			<el-table-column
			   label="操作"
			   width='200'
			  >
			  <template slot-scope="scope">
				  <span style="color: #1a79ff;cursor: pointer;margin-right: 15px;" @click="dia(scope.row.sysUserId)">变更角色</span>
				  <span style="color: #1a79ff;cursor: pointer;margin-right: 15px;" @click="changee(scope.row.sysUserId)">修改</span>
				  <span style="color: red;cursor: pointer;" @click="elada(scope.row.sysUserId)">删除</span>
			  </template>>
			</el-table-column>
		  </el-table>
		  
		  
		  <!-- 蒙尘 -->
		 <el-dialog
		    title="修改操作员"
		    append-to-body
		    :visible.sync="dialogVisible2"
		    width="50%"
		    >
		    <div class="chen">
		  	<el-form :model="myfrom"  @submit.native.prevent :rules="rules" ref="myfrom" label-width="100px" class="demo-ruleForm">
		  	  <div>
		  		 <el-form-item  label="用户登录名">
		  		   <el-input type="text" v-model="myfrom.appid" disabled></el-input>
		  		 </el-form-item>
		  		 <el-form-item   label="用户姓名"  prop="appname">
		  		   <el-input type="text" v-model="myfrom.appname" placeholder='输入用户姓名'></el-input>
		  		 </el-form-item>
		  		 <el-form-item   label="手机号">
		  		   <el-input type="text" v-model="myfrom.appname" placeholder='输入手机号'></el-input>
		  		 </el-form-item>
		  		 <el-form-item   label="编号">
		  		   <el-input type="text" v-model="myfrom.appname" placeholder='输入编号'></el-input>
		  		 </el-form-item>
		  		 <el-form-item  label="请选择性别">
		  		   <el-radio-group v-model="myfrom.status">
		  		      <el-radio :label="1">男</el-radio>
		  		      <el-radio :label="2">女</el-radio>
		  		    </el-radio-group>
		  		 </el-form-item>
		  		 <el-form-item label="状态">
		  		   <el-radio-group v-model="myfrom.statuss">
		  		      <el-radio :label="1">启用</el-radio>
		  		      <el-radio :label="2">停用</el-radio>
		  		    </el-radio-group>
		  		 </el-form-item> 
		  	  </div>
		  	  <div>
		  		  <p class="accou">账户安全</p>
		  		  <div class="savediv">
		  			 <el-form-item label="重置密码:">
		  				<el-checkbox v-model="checked"></el-checkbox>
		  			 </el-form-item>
		  			 <el-form-item label="恢复默认密码:" v-if="checked">
		  				<el-checkbox v-model="checkedd"></el-checkbox>
		  			 </el-form-item>
		  		  </div>	
		  		  <div v-if="!checkedd && checked">
		  			<el-form-item label="新密码" prop="pass">
		  					<el-input show-password  v-model="myfrom.pass" placeholder="请输入新密码"></el-input>
		  			</el-form-item>
		  			<el-form-item label="确认密码" prop="checkPass">
		  				<el-input show-password v-model="myfrom.checkPass" placeholder="请确认密码"></el-input>
		  			</el-form-item> 
		  		  </div>
		  	  </div>
		  	  <el-form-item style="width: 100%;">
		  	    <el-button>取消</el-button>
		  		<el-button type="primary" @click="subm('myfrom')">保存</el-button>
		  	  </el-form-item>
		  	</el-form>
		    </div>
		  </el-dialog>
		  
		  
		  
		  <!-- 蒙尘 -->
		 <el-dialog
		    title="分配角色"
		    append-to-body
		    :visible.sync="dialogVisible"
		    width="50%"
		    >
		    <div class="chen">
		    	<p class="allin">
		    		<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
		    	</p>
		    	<div></div>
		    	<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
		    	  <el-checkbox v-for="(item,index) in cities" :label="item.roleName" :key="index"></el-checkbox>
		    	</el-checkbox-group>
				<p class="btnbox">
					<el-button type="primary" @click="dialogVisible=false">取消</el-button>
					<el-button @click="saveroles()">保存</el-button>
				</p>
		    </div>
		  </el-dialog>
		  
		  <router-view></router-view>
	</div>
</template>

<script>
	import {sysUsers,addsysuser,sysRoles,hasrrols,relaschan,delsysUsers} from '@/utils/role.js'
	export default{
		inject:["reload"],
		filters:{
			sex(e){
				if(e==1){
					return '男'
				}else if(e==2){
					return '女'
				}
			},
			isAdmin(e){
				if(e==0){
					return '否'
				}else if(e==1){
					return '是'
				}
			}
		},
		data(){
			return{
				tableData: [],
			    dialogVisible:false,
				dialogVisible2:false,
				myfrom: {
				  appid:'',
				  appname:'',
				  status:1,
				  appsecret:'',
				  textarea:'',
				},
				rules:{
				  appname: [
					{ required: true, message: '请输入应用名称', trigger: 'blur' }
				  ]
				   },
				checkAll: false,
				checkedCities: [],
				cities: [],
				isIndeterminate: false,
				checked:false,
				checkedd:false,
				userId:'',
				Allcity:[]

					}
				},
		created() {
			this.getDatas()
			this.getRoles()
		},
		methods:{
			// 操作员管理列表
			getDatas(n){
				sysUsers(n).then(res=>{
					this.tableData=res.data.data.records
				})
			},
			// 状态操作
			SwitchChange(n,i){
				let textab=''
				if(n==0){
				  textab='停用'
				}else if(n==1){
					textab='启用'
				}
				this.$confirm('确认' + textab + '该用户？', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					addsysuser({
						ap:i,
						state:n
					}).then(res=>{
						this.$message({
						  type: 'success',
						  message:res.data.msg
						})
						this.reload()
					})
				  
				}).catch(() => {
				  this.$message({
				    type: 'info',
				    message: '已取消'
				  }) 
					this.reload()
				})
			},
			// 角色列表
			getRoles(){
				sysRoles().then(res=>{
					this.cities=res.data.data.records
					let obj={}
					for(var i=0;i<this.cities.length;i++){
						this.Allcity.push(this.cities[i].roleName)
					}
				})
			},
			// 变更角色获取
			dia(n){
				this.checkedCities=[]
				this.userId=n
				hasrrols({
					userId:n,
					pageSize:-1
				}).then(res=>{
				let dataList=res.data.data.records
				if(res.data.data.records.length != 0){
					let obj={}
					for(var i=0;i<dataList.length;i++){
						this.checkedCities.push(dataList[i].roleId)
					}
				}else{
					this.checkedCities=[]
				}
					this.dialogVisible=true
				})
				
			},
			// 保存变更
			saveroles(){
				relaschan({
					userId:this.userId,
					roleIdListStr: JSON.stringify(this.checkedCities)
				}).then(res=>{
					this.$message.success("变更成功")
					this.reload()
				})
			},
			
			
			
			changee(n){
				this.dialogVisible2=true
			},
			handleCheckAllChange(val) {
				if(val){
						this.checkedCities=this.Allcity
				}else{
					this.checkedCities=[]
				}
			  // this.checkedCities == val ? this.Allcity : [];
			  this.isIndeterminate = false;
			  // console.log(this.checkedCities)
			},
			handleCheckedCitiesChange(value) {
			  let checkedCount = value.length;
			  this.checkAll = checkedCount === this.cities.length;
			  this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			elada(n){
				this.$confirm('确认删除？', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					delsysUsers(n).then(res=>{
						this.$message({
						  type: 'success',
						  message:res.data.msg
						})
						this.reload()
					})
				  
				}).catch(() => {
				  this.$message({
				    type: 'info',
				    message: '已取消'
				  }) 
					this.reload()
				})
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
	.allin{
		border-bottom:2px solid #C4C4C480;
		padding-bottom: 15px;
		box-sizing: border-box;
		margin-bottom: 0;
		width: 100%;
	}
	.el-checkbox-group{
		min-height: 200px;
		margin-bottom: 15px;
		margin-top: 15px;
		width: 100%;
	}
	.btnbox{
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.avauel{
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}
	/deep/ .el-table .cell{
	    white-space:pre-line;
	}
</style>