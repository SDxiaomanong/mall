import axios from 'axios'
//export function request(config,success,failure){
////	1.创建axios的实例
//	const instance = axios.create({
//		baseURL: 'http://152.136.185.210:8000',
//		timeout: 5000
//	})
//	
//	instance(config)
//	  .then(res => {
//	  	success(res)
//	  })
//	  .catch(err => {
//	  	failure(err)
//	  })
//}

//export function request(config){
//	const instance = axios.create({
//		baseURL: 'http://152.136.185.210:8000',
//		timeout: 5000
//	})
//	
//	instance(config.baseConfig).then(res => {
//		config.success(res)
//	}).catch(err => {
//		config.failure(err)
//	})
//}

export function request(config){
//	1.创建axios的实例
	const instance = axios.create({
		baseURL: 'http://123.207.32.32:8000',
		timeout: 5000
	})
	
//	2.axios的拦截器
	//请求拦截
//	instance.interceptors.request.use(config => {
//		console.log(config)
//		return config
//	},err => {
//		console.log(err)
//	})
	
	//响应拦截
	instance.interceptors.response.use(res => {
		return res.data
	},err => {
		console.log(err)
	})
	
//	3.发送真正的网络请求
	return instance(config)
}
