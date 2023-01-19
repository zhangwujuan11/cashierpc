

const { defineConfig } = require('@vue/cli-service')
module.exports = {
		publicPath: process.env.NODE_ENV == 'development' ? '/payment_pc/' : '/payment_pc/',
		devServer: {
			host: '', //target host
			port: 8080,
			//proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
			proxy: {
				[process.env.VUE_APP_BASE_API]: {
					target: 'http://10.10.10.139:7800',
					// ws: true,
					changeOrigin: true,
					pathRewrite: {
						['^' + process.env.VUE_APP_BASE_API]: ''
						// '^/api': ''
					}
				}
			},
		}
}