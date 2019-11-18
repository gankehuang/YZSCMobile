import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.scancode = function() {
	uni.scanCode({
		success: (res) => {
			uni.showModal({
				title: "弹窗标题",
				content: res.result,
				showCancel: false,
				confirmText: "确定"
			})
		}
	});
};
Vue.prototype.handOnClickBack = function() {
	uni.navigateBack({});
};
Vue.prototype.jumpPage = function(e) {
	let key = e.currentTarget.dataset.key;
	let jumpurl = e.currentTarget.dataset.jumpurl;
	if(jumpurl){
		uni.navigateTo({
			url: jumpurl+'?searchKey=' + key
		})
	}else{
		uni.showToast({
			title: "功能开发中！",
			icon: 'none'
		});
	}
};
Vue.prototype.yzUploadFile = function(imageSrc, url, callback) {
	uni.uploadFile({
		url: url,
		filePath: imageSrc,
		fileType: 'image',
		name: 'data',
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
const app = new Vue({
    ...App
})
app.$mount()
