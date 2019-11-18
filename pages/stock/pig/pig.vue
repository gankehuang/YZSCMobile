<template>

	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					猪只盘点单
				</view>
				<view class="status-del" @tap="record">
					历史记录
				</view>
			</view>
		</view>
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text">基本信息</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								单据号
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入单据号" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								抽盘类型
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker :range="array1" :value="index" @change="bindPickerChange">
									<view class="picker">
										<view class="uni-input">{{array1[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								盘点日期
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectDate">
								<text></text>
								<image src="/static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin-right: 15rpx;"></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								猪场\分场
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker :range="array2" :value="index" @change="bindPickerChange">
									<view class="picker">
										<view class="uni-input">{{array2[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="main-wrap" style="padding-top: 10px;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text">猪只扫码</view>
							<view class="main-wrap-contetnt-item-field-name-icon" style="padding-left: 90rpx;" @click="scancode">
								<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								猪只耳号<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入猪只耳号" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								状态<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入状态" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								胎次<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入胎次" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								栏位<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入栏位" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								最新业务日期<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectDate">
								<text></text>
								<image src="/static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin-right: 15rpx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b" style="padding-bottom: 15px;">
			<!-- <button type="primary" class="flexc cancel-btn" @tap="clickCancel">取消</button> -->
			<button type="primary" class="flexc submit-btn">提交</button>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirmDate" @onCancelDate="onCancel"
		 ></mpvue-picker>
	</view>

</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import ztable from '@/components/z-table/z-table'
	export default {
		data() {
			return {
				id: '55',
				form: {
					name: '一分场',
					projectName: '自动带出',
				},
				themeColor: '#007AFF',
				pickerValueDefault: [0],
				index: 0,
				array1: ['请选择抽盘类型', '类型1', '类型2', '类型3'],
				array2: ['请选择分场', '分场1', '分场2', '分场3'],
			}
		},
		components: {
			mpvuePicker,
			uniIcon,
			ztable,
		},
		methods: {
			record() {
				uni.navigateTo({
					url: 'pigRecord?id=' + this.id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			selectDate: function(){
				this.$refs.mpvuePicker.show()
			},
			rowTapHandler(row){
				console.log(row)
			},
			checkbox(e){
				console.log(e)
			}
		},
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

	.status-header {
		padding-top: 26rpx;

		.status-title {
			padding-left: 35%;
		}
	}
	.main {
		.main-wrap {
			padding: 160rpx 23rpx 0rpx 23rpx;
			.takePhotoList {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0;
			
				.takephotoItem {
					background: white;
					border-radius: 22rpx;
					height: 214rpx;
					width: 214	rpx;
					margin-right: 24rpx;
					display: flex;
					justify-content: center;
					align-items: center;
			
					.img {
						width: 54rpx;
						height: 54rpx;
						vertical-align: middle;
						}
					&:last-child{
						margin-right: 0;
					}
				}
			}
		}
	}
// ============================================
	.health-container {
		background-color: #F5F5F5;
		padding: 130rpx 30rpx 120rpx;

		.editor-title {
			height: 54rpx;

			.img {
				line-height: 54rpx;

				.image {
					width: 12rpx;
					height: 12rpx;
					vertical-align: middle;
				}
				.sca {
					width: 40rpx;
					height: 40rpx;
					margin-left: 30rpx;
					margin-top: -10rpx;
				}
			}

			text {
				margin-left: 14rpx;
				line-height: 54rpx;
				font-size: 32rpx;
			}

			.btn {
				line-height: 54rpx;

				button {
					width: 140rpx;
					height: 54rpx;
					line-height: 54rpx;
					vertical-align: middle;
					font-size: 24rpx;
					text-align: center;
					padding: 0px;
				}
			}
		}

		.takePhotoList {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.takephotoItem {
				background: white;
				border-radius: 22rpx;
				height: 216rpx;
				width: 216rpx;
				margin-right: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.img {
					width: 53rpx;
					height: 53rpx;
					vertical-align: middle;
				}

				;
			}
		}

		.submits {
			margin-top: 56rpx;
			margin-bottom: 10rpx;

			button {
				width: 320rpx;
				height: 88rpx;

				&.cancel-btn {
					background-color: #F05E57;
				}

				&.submit-btn {
					background-color: #4684EA;
				}
			}
		}

		.card-form {
			margin-top: 0rpx;

			.input-style {
				color: #B2B2B2;
				text-align: right;
			}

			.input-style .uni-input-wrapper .uni-input-placeholder {
				color: #B2B2B2;
				text-align: right;
				font-size: 28rpx;
			}
		}

		.editor-title {
			height: 80rpx;

			.confirm-btn {
				width: 140rpx;
				height: 54rpx;

				button {
					width: 140rpx;
					height: 54rpx;
					font-size: 24rpx;
					padding: 0;
					background-color: #4684EA;
				}
			}

			&.form-seat {
				height: 120rpx;
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

		.page__info {
			align-items: center;
			font-size: 12px;
			justify-content: space-between;
			margin: 10px 0 0;
		}
	}
</style>
