let baseurl = 'http://10.88.3.141:9090';
/**
 * 通用的请求请求
 */
const commRequest = function(actionurl, params,headers, requestType, callback) {
	requestType = requestType ? requestType : 'POST';
	let url = '';
	let paramsdata = [];
    let apiType =  0;
	if (actionurl == '/login') {
		//登录接口
		url = 'login.url';
		paramsdata = {
			url: url,
			action: actionurl,
			method: requestType,
			apiType: 0,
			params: params
		}
	} else {
		// uni.showLoading({
		// 	title: '加载中'
		// });
		headers['Authentication'] = uni.getStorageSync('Authentication');
		if(headers['content-type']='application/json'){
			apiType = 2
		}else{
			apiType = 0
		}
		//养殖生产通用接口
		url = 'jlyzscmobile.url';  //jlyzscmobile.url  蒋力     //yzscmobile.url  周俊锋
		paramsdata = {
			url: url,
			action: actionurl,
			method: requestType,
			apiType: apiType,
			headers: headers,
			params: params
		}
	}
	uni.request({
		url: baseurl + '/api/common/gateway/requestThird',
		method: 'POST',
		data: paramsdata,
		success: data => {
			if (data.data.data) {
				let callbackdata = JSON.parse(data.data.data);
				callback(callbackdata);
				uni.hideLoading();
			} else {
				uni.showToast({
					title: data.data.msg,
					icon: 'none'
				});
			}
			//uni.hideLoading();
		},
		fail: () => {
			//uni.hideLoading();
			this.message = "网络连接失败";
		},
		complete: () => {}
	})
}
const refreshToken = function(url, params, requestType, successback) {
	
	let headers = {};
	headers['Content-Type'] = 'application/json';
	uni.request({
		url: baseurl + '/api/comm/mobile/oauth/access_token',
		method: 'POST',
		header: headers,
		data: {
			'refreshToken': uni.getStorageSync('refresh_token')
		},
		success: data => {
			if (data.data.code === 20000) {
				uni.setStorageSync('access_token', data.data.data.access_token);
				uni.setStorageSync('refresh_token', data.data.data.refresh_token);
				headers['YS-Authorization'] = data.data.data.access_token;
				uni.request({
					url: url,
					method: requestType,
					header: headers,
					data: params,
					success: data => {
						if (data.data) {
							successback(data.data);
						} else {
							successback(data);
						}
					},
					fail: () => {
						this.message = "网络连接失败";
					},
					complete: () => {}
				})
			}
		},
		fail: () => {
			this.message = "网络连接失败";
		},
		complete: () => {}
	})
}

//单图片上传
const yzUploadFile = function(imageSrc, url, callback) {  //图片路径， 上传地址， 上传回调
	console.log(uni.getStorageSync('Authentication'))
	let token = uni.getStorageSync('Authentication')
	console.log(imageSrc)
	uni.uploadFile({
		url:  baseurl + url,
		filePath: imageSrc,
		header: {
			'Authentication': token,
		}, 
		name: 'file',
		success: (res) => {
			uni.showToast({
				title: '上传成功',
				icon: 'success',
				duration: 1000
			});
			callback(res);
		},
		fail: (err) => {
			console.log('uploadImage fail', err);
			uni.showModal({
				content: err.errMsg,
				showCancel: false
			});
		}
	});
};
//多图片上传
const imgsUploadFile = function(imageList, url, sendDate){ //图片数组， 上传地址， 上传参数
	//文件路径封装
	let imgs = imageList.map((value, index) => {
	    return {
			name: "image" + index,  //
			url: value
		}
	});
	uni.uploadFile({
	    url: url, 
	    files: imgs,
	    formData: sendDate,
	    header:{"Content-Type": "multipart/form-data"},
	    success: (res) => {
	        if (res.statusCode === 200) {
	            uni.showToast({
	                title: "上传成功!"
	            });
	        }
	    }
	})
}
export default {
	commRequest,
	refreshToken,
	yzUploadFile,
	imgsUploadFile
}