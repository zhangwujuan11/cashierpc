<template>
	<div class="ltr">
		<img src="@/assets/images/houtailogo.png" alt="">
		<el-menu default-active="2" class="el-menu-vertical-demo" :collapse='false'
			background-color='#E7EBF1' router>
			<el-menu-item index="/home">
				<i class="el-icon-house"></i>
				<span slot="title">主页</span>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-user"></i>
					<span>商户中心</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/merchant/index">
						<i class="el-icon-menu"></i>
						应用管理
					</el-menu-item>
					<el-menu-item index="/merchant/paymenttest">
						<i class="el-icon-s-finance"></i>
						支付测试
					</el-menu-item>
					<el-menu-item index="/merchant/tratnsferacc">
						<i class="el-icon-refresh"></i>
						转账
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-money"></i>
					<span>订单中心</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/ordercenter/index">
						<i class="el-icon-document"></i>
						订单管理
					</el-menu-item>
					<el-menu-item index="/ordercenter/refund">
						<i class="el-icon-s-order"></i>
						退款记录
					</el-menu-item>
					<el-menu-item index="/ordercenter/transferaccounts">
						<i class="el-icon-set-up"></i>
						转账订单
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<!-- <el-submenu index="4">
				<template slot="title">
					<i class="el-icon-notebook-1"></i>
					<span>分账管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/account/index">
						<i class="el-icon-document"></i>
						帐号组管理
					</el-menu-item>
					<el-menu-item index="/account/collection">
						<i class="el-icon-s-order"></i>
						收款账号管理
					</el-menu-item>
					<el-menu-item index="/account/ledgerrecord">
						<i class="el-icon-set-up"></i>
						分账记录
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu> -->
			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-setting"></i>
					<span>系统管理</span>
				</template>
				<el-submenu index="5-1">
					<template slot="title">
						<i class="el-icon-s-check"></i>
						用户角色管理
					</template>
					<el-menu-item index="/role/index">
						<i class="el-icon-s-custom"></i>
						操作员管理
					</el-menu-item>
					<el-menu-item  index="/role/management">
						<i class="el-icon-coordinate"></i>
						角色管理
					</el-menu-item>
				</el-submenu>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
</script>

<style scoped>
	.ltr {
		width: 225px !important;
		background-color: #E7EBF1;
		margin-top: 16px;
		height: calc(100vh - 16px);
		position: fixed;
	}
	.ltr img{
		width: 200px;
	}
</style>
