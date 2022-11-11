<template>
	<div class="bassmess">
		<div class="bassmessCon">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				
				<div>
					<el-form-item label="用户登录名" prop="name">
					  <el-input v-model="ruleForm.name" disabled></el-input>
					</el-form-item>
					<el-form-item label="用户姓名" prop="username">
					  <el-input v-model="ruleForm.username"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
					  <el-input v-model="ruleForm.phone" disabled></el-input>
					</el-form-item>
					<el-form-item label="请选择性别" prop="gender">
					  <el-radio-group v-model="ruleForm.gender">
					    <el-radio label="男"></el-radio>
					    <el-radio label="女"></el-radio>
					  </el-radio-group>
					</el-form-item>
				</div>
				<div>
					<img :src="newList[0]">
					<el-upload
					  action="#"
					  list-type="picture-card"
					  :limit='3'
					  :before-upload="beforeAvatarUpload"
					  :http-request="uploadToCos"
					  >
						<i class="el-icon-upload2 avatar-uploader-icon"></i>
						<span>上传图片</span>
					</el-upload>
				</div>
			</el-form>
			<el-button  type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
		</div>
	</div>
</template>

<script>
	import { putObjects } from '@/assets/js/upload.js'
	import { Message } from 'element-ui';
	export default {
	// inject:["reload"],
	  data() {
	    var validatePass = (rule, value, callback) => {
	            if (value == '') {
	              callback(new Error('请输入用户姓名'));
	            }
			}
	    return {
	    imglist:[],
	    newList:[],
		ruleForm:{
			portrait:'',
			name:'',
			username:'',
			phone:'',
			gender:''
			},
			 
		 rules: {
		          username: [
		            { validator: validatePass,required: true, trigger: 'blur' },
		          ]
		        }
	    }
	  },
	created(){
		// 默认头像
		if(this.newList.length==0){
			this.newList.push(require('@/assets/images/ellipse.png'))
		}
	},
	 methods: {
		 // 上传图片
	   beforeAvatarUpload(file) {
	     const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif'
	     if (!isJPG) {
		   Message({
		          message: '上传二维码图片只能是 JPG/PNG/JPEG/GIF 格式!',
		          type: "error",
		          offset:80
		      })
			   this.progressFlag = false;
	     }
	     return isJPG
	   },
	   // 云储存头像
	  uploadToCos (fel) {
			this.imglist.length=0
	        this.imglist.push(fel.file)
			console.log(this.imglist)
	        putObjects(fel.file.name,fel.file).then(res=>{
	          let qrimg='https://' + res.Location
			  this.newList.length=0
	          this.newList.push(qrimg)
	        })
	      },
	  // 提交表单
	   submitForm(formName) {
	          this.$refs[formName].validate((valid) => {
	            if (valid) {
	              alert('submit!');
	            } else {
	              console.log('error submit!!');
	              return false;
	            }
	          })
	        }
	 }
	
}
</script>

<style scoped>
	.bassmess{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.bassmess .bassmessCon{
		width: 100%;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.bassmess .bassmessCon img{
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 0.8rem 0 20px 0;
	}
	.el-form{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.el-form div{
		width: 50%;
	}
	.el-form div{
		width: 200px;
	}
	:deep(.el-upload-list--picture-card){
		display: none !important;
	}
	:deep(.el-upload--picture-card){
		width: 80px;
		height: 25px;
		line-height: 25px;
		border: 1px solid #C4C4C4B2;
		border-radius: 5px;
		font-size: 0.32rem;
		color: #515151;
	}
	:deep(.el-upload--picture-card i){
		font-size: 0.32rem;
		color: #515151;
	}
	.el-button--primary{
		width: 8.8rem;
		border-radius: 0.666667rem;
	}
	
</style>