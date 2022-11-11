<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">主页 / 商户中心 / 支付测试</div>
		</Travelpermit>
		<div class="box">
			<el-select v-model="value" placeholder="请选择" @change='selectthis(options[value])'>
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<p class="tips">您尚未配置任何支付方式</p>
		</div>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import {payways,mchApps} from '@/utils/merchant.js'
	export default{
		components:{
			Travelpermit
		},
		  data() {
		      return {
		        options: [],
		        value: 0
		      }
		    },
		created(){
			mchApps().then(res=>{
				for (var i=0;i<res.data.data.records.length;i++) {
					let obj={
						value:i,
						label: res.data.data.records[i].appName + '[' + res.data.data.records[i].appId + ']',
						ndata:res.data.data.records[i].appId
					}
					this.options.push(obj)
				}
				payways(this.options[0].ndata).then(res=>{
					console.log(res)
				})
			})
			
		},
		methods:{
			selectthis(n){
				payways(n.ndata).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped>
	.el-select{
		width: 48%;
		height: 25px;
	}
	.tips{
		width: 100%;
		text-align: center;
		margin-top: 40px;
	}
</style>