<template>
	<div class="configuration">
		<div>
			<ul>
				<li
				v-for="(item,index) in liList"
				:key="index"
				>	<p>
						<center class="imgbox" :style="{background:item.bgColor}">
							<img :src="item.icon">
						</center>
						<span>
							<strong>{{item.ifName}}</strong> <br>
							未开通
						</span>
					</p>
					
					<span class="ameter">填写参数 <i class="el-icon-arrow-right"></i></span>
				</li>
				<li  v-if="liList == null"  class="nodata">
					<span>NODATA</span>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script> 
	import {payConfigs} from '@/utils/merchant.js'
	export default{
		props:['paymentdata'],
		data(){
			return{
				liList:[],
				nodata:false
			}
		},
		created(){
			this.getData(this.paymentdata)
		},
		methods:{
			getData(n){
				payConfigs({
					appId:n
				}).then(res=>{
					this.liList=res.data.data
					if(this.liList!=null){
						for(var i=0;i<this.liList.length;i++){
							if(this.liList[i].icon==null){
								this.liList[i].icon=require('@/assets/images/Rectangle18.png')
							}
						}
					}
					
				})
			},
			
		},
		 watch: {
		        paymentdata(v) {
		            this.getData(v)
		        }
		    }
	}
</script>

<style scoped>
	.configuration{
		width:100%;
		height: 440px;
		overflow: hidden;
		overflow-y: scroll;
		/* scrollbar-width: none; */
		/* -ms-overflow-style: none; */
	}
	/* .configuration::-webkit-scrollbar {
	    display: none; 
	} */
	
	.configuration ul{
		width: 100%;
		margin-top: 26px;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.configuration ul li{
		width: 48%;
		margin-bottom:20px;
		border: 1px solid #c4c4c4;
		border-radius:10px;
		padding:15px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.configuration ul li p{
		display: flex;
		align-items: center;
	}
	.configuration ul li .imgbox{
		margin: 0;
		width:150px;
		height:90px;
		border-radius:10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.configuration ul li p span{
		margin-left: 15px;
		cursor: pointer;
	}
	.configuration ul li img{
		width: 96px;
		height: 86px;
	}
	.configuration ul .nodata{
		width: 100%;
		height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		font-size: 30px;
	}
	.next{
		width: 100%;
		height: 1.28rem;
		background-color: white;
		text-align: center;
	}
	.configuration::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
	.ameter{
		cursor: pointer;
		color: #1a79ff;
	}
</style>