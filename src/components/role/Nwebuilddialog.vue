<template>
	
</template>

<script>
	import {apiysUsers,register} from '@/utils/role.js'
	import {charkname,onetwo} from '@/utils/login.js'
	export default {
		inject:["reload"],
		props: ["fa"],
		data() {
			
			
			return {
				
			}
		},
		methods: {
			

		}
	}
</script>

<style scoped>
	:deep(.el-dialog) {
		border-radius: 10px !important;
	}

	:deep(.el-dialog__header) {
		border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}

	:deep(.demo-ruleForm) {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.demo-ruleForm .el-input {
		width: 200px;
	}

	.savediv {
		width: 320px;
		display: flex;
		justify-content: space-between;
	}

	.accou {
		width: 100px;
		text-align: right;
		padding-right: 12px;
		box-sizing: border-box;
	}
</style>
