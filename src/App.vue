<template>
  <div id="app">
	  <Saidmenu v-if="!(path ==='/login') && !(path ==='/register')"></Saidmenu>
	  <Topmenu v-if="!(path ==='/login') && !(path ==='/register')"></Topmenu>
	
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
	import Saidmenu from '@/components/Saidmenu.vue'
	import Topmenu from '@/components/Topmenu.vue'
	import { iToken } from '@/utils/home.js'
	export default {
	  components: {
		  Saidmenu,
		  Topmenu,
	  },
	  provide(){//刷新
	    return{
	      reload:this.reload
	    }
	  },
	  data(){
		  return{
			  isRouterAlive:true,
			  path:''
		  }
	  },
	  mounted(){
	            this.path = this.$route.path;
	          },
	  methods:{
	  	reload(){
	  	  this.isRouterAlive=false;
	  	  this.$nextTick(function(){
	  	    this.isRouterAlive=true
	  	  })
	  	}
	  },
	  watch:{
	  	$route(to,from){
	  		this.path = to.path
	  	}
	  },
	}
</script>

<style>

</style>
