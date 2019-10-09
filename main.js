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
const app = new Vue({
    ...App
})
app.$mount()
