<template>
	<view class="health-container">
		<view class="editor-title flex ali-c">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>基本信息</text>
			</view>
		</view>
		<view class="card-form card">
			<uni-cell title="任务日期" :value="form.projectName"></uni-cell>
			<uni-cell title="栋舍" :value="form.projectName"></uni-cell>
			<uni-cell title="组别" :value="form.projectName"></uni-cell>
			<uni-cell title="实际日均饲喂量" :value="form.projectName"></uni-cell>
			<uni-cell title="当日存栏" :value="form.projectName"></uni-cell>
			<uni-cell title="饲料名称" :value="form.projectName"></uni-cell>
			<uni-cell title="饲养员" :value="form.projectName"></uni-cell>
		</view>

		<view class="submitData jus-b"><button type="primary" class="flexc submit-btn">提交</button></view>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import uniCell from '@/components/uni-cell/uni-cell.vue';

export default {
	data() {
		return {
			form: {
				name: '一分场',
				projectName: '自动带出'
			},
			getNumber: '',
			dayNumber: '',
			pageInfo: {
				page: 1,
				pageSize: 50,
				total: 2000
			}
		};
	},
	components: {
		uniIcon,
		uniCell
	},
	computed: {
		pageNum() {
			return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize);
		}
	},
	methods: {
		//选页
		selectPage() {
			this.$refs.popupRef.show();
		},
		selectPages(e) {
			console.log(e);
		},
		onNavigationBarButtonTap() {
			// 跳转至历史记录
			uni.navigateTo({
				url: `/pages/freed/freedApp/freedHistory`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style lang="scss">
// 引入状态栏样式
@import '../../../common/dataCollection.scss';

.health-container {
	background-color: #f5f5f5;
	padding: 0 30rpx 120rpx;
	.editor-title {
		height: 80rpx;
		.img {
			line-height: 44rpx;
			image {
				width: 12rpx;
				height: 12rpx;
				vertical-align: middle;
			}
		}
		text {
			margin-left: 14rpx;
			line-height: 44rpx;
			font-size: 32rpx;
		}
	}
	.card-form {
		margin-top: 0rpx;
		.input-style {
			color: #b2b2b2;
			text-align: right;
		}
		.input-style .uni-input-wrapper .uni-input-placeholder {
			color: #b2b2b2;
			text-align: right;
			font-size: 28rpx;
		}
	}

	//抽屉样式
	.draw {
		padding: 30rpx;
		width: 500rpx;
		height: calc(100% - 118rpx);
		.bg-gray {
			background: #f5f5f5;
			padding: 16rpx 20rpx;
			font-size: 12px;
			color: #4d4d4d;
		}
	}
	.submits {
		position: fixed;
		bottom: 0rpx;
		left: 0;
		width: 100%;
		.flexc {
			width: 50%;
			height: 86rpx;
			&.reset-btn {
				background-color: #ffffff;
				border-top: 2px solid #f5f5f5;
			}
			&.submit-btn {
				border-top: 2px solid #4684ea;
				background-color: #4684ea;
				color: #ffffff;
			}
		}
	}
	.submitData {
		margin-top: 32rpx;
		.cancel-btn {
			width: 316rpx;
			background-color: #f05e57;
			color: #ffffff;
		}
		.submit-btn {
			width: 316rpx;
			background-color: #4684ea;
			color: #ffffff;
		}
	}
}
// .uni-checkbox .uni-checkbox-input {
// 	border-radius: 50% !important;
// }
</style>
