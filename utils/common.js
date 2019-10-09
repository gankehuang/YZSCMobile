/**
 * 通用的请求请求
 */
const commRequest = function(url, params, headers, requestType, callback) {
	requestType = requestType ? requestType : 'POST';
	headers = headers ? headers : {};
	uni.request({
		url: url,
		method: requestType,
		header: headers,
		data: params,
		success: data => {
			if (data.data.code === 20000) {
				callback(data.data);
			} else if(data.data.code === 60001){
				uni.showToast({
					title: "token过期，请重新登录。",
					icon: 'none'
				});
				uni.removeStorageSync('access_token');
				uni.removeStorageSync('refresh_token');
				uni.reLaunch({
					url: '../login/login',
				});
			}
			else {
				uni.showToast({
					title: data.data.msg,
					icon: 'none'
				});
			}
			uni.hideLoading();
		},
		fail: () => {
			uni.hideLoading();
			this.message = "网络连接失败";
		},
		complete: () => {}
	})
}
const goHome = function () {
 uni.switchTab({
 	url: '../appCenter/appCenter',
 });
}
export default {
	commRequest,
	goHome
}