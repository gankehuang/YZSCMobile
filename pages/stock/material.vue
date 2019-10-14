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
					药品盘点单新增
				</view>
				<view class="status-del" @tap="record">
					<image src="../../static/assets/more@2x.png" mode="" class="more-icon icon"></image>
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
								单据编号
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								盘点仓库
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker :range="array" :value="index" @change="bindPickerChange">
									<view class="picker">
										<view class="uni-input">{{array[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								领料类型
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								盘点时间
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker :range="array" :value="index" @change="bindPickerChange">
									<view class="picker">
										<view class="uni-input">{{array[index]}}</view>
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
								<image src="../../static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin-right: 15rpx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 药品扫描 -->
		<view class="main">
			<view class="main-wrap" style="padding-top: 10px;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text">药品扫码</view>
							<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
								<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								药品名称
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								计量单位
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								批次号<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								库存数量
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								盘点数量<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								差异数量 
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								生产日期
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectDate">
								<text></text>
								<image src="../../static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin-right: 15rpx;"></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								到期日期
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectDate">
								<text></text>
								<image src="../../static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin-right: 15rpx;"></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								基本分类 
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="main-wrap" style="padding-top: 0px;">
				<view class="main-wrap-content">
					<view class="mian-wrap-content-item">
						<view class="editor-title flex ali-c">
							<view class="img">
								<image src="/static/assets/rect.png" mode=""></image>
								<text>上传图片</text>
							</view>
						</view>
						<view class="takePhotoList">
							<view class="takephotoItem">
								<image class="img" src="../../static/assets/plus.png" mode=""></image>
							</view>
							<view class="takephotoItem">
								<image class="img" src="../../static/assets/plus.png" mode=""></image>
							</view>
							<view class="takephotoItem">
								<image class="img" src="../../static/assets/plus.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="health-container">
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>基本信息</text>
				</view>
			</view>
			<view class="card-form card">
				<uni-cell title="单据编号" :value="form.projectName"></uni-cell>
				<uni-cell title="盘点仓库" :value="form.projectName"></uni-cell>
				<uni-cell title="领料类型" :value="form.projectName"></uni-cell>
				<uni-cell title="盘点时间" :value="form.projectName"></uni-cell>
				<uni-cell title="盘点日期" :value="form.projectName"></uni-cell>
			</view>
			<view class="editor-title flex ali-c jus-b">
				<view class="img">
					<image class="image" src="/static/assets/rect.png" mode=""></image>
					<text>药品扫码</text>
					<image class="sca" @click="scancode" src="/static/assets/scan-icon.png" mode=""></image>
				</view>
				<view class="btn">
					<button type="primary" @click="jumpPage" data-jumpurl="materialNew">新增</button>
				</view>
			</view>

			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
			</view>

			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>上传图片</text>
				</view>
			</view>
			<view class="takePhotoList">
				<view class="takephotoItem">
					<image class="img" src="../../static/assets/plus.png" mode=""></image>
				</view>
				<view class="takephotoItem">
					<image class="img" src="../../static/assets/plus.png" mode=""></image>
				</view>
				<view class="takephotoItem">
					<image class="img" src="../../static/assets/plus.png" mode=""></image>
				</view>
			</view>
			<view class="submits jus-b">
				<button type="primary" class="flexc cancel-btn" @tap="clickCancel">取消</button>
				<button type="primary" class="flexc submit-btn">确定</button>
			</view>
		</view> -->
		<view class="submits jus-b" style="padding-bottom: 15px;">
			<button type="primary" class="flexc submit-btn">提交</button>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirmDate" @onCancelDate="onCancel"
		 ></mpvue-picker>
	</view>

</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniCell from '@/components/uni-cell/uni-cell.vue'
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	import ztable from '@/components/z-table/z-table'
	import popupLayer from '@/components/popup/popup-layer.vue';
	export default {
		data() {
			return {
				id: '55',
				form: {
					name: '一分场',
					projectName: '自动带出',
				},
				columns: [{
					title: "序号",
					key: "index",
					width: '100'
				}, {
					title: "物料名称",
					key: "name",
					width: '200'
				}, {
					title: "规格型号",
					key: "specno",
					width: '200'
				}, {
					title: "计量单位",
					key: "unit",
					width: '200'
				}, {
					title: "盘点数量",
					key: "stockNum",
					width: '200'
				}, {
					title: "差异数量",
					key: "diffNum",
					width: '200'
				}, {
					title: "库存数量",
					key: "storageNum",
					width: '200'
				}, {
					title: "物料基本分类",
					key: "classify",
					width: '200'
				}],
				tableData: [{
					index: '01',
					name: '毛巾',
					specno: '2019-02-21',
					unit: '件',
					stockNum: '30',
					diffNum: '25',
					storageNum: '55',
					classify: '衣服'
				}, {
					index: '02',
					name: '衣服',
					specno: '20190902-01',
					unit: '件',
					stockNum: '30',
					diffNum: '25',
					storageNum: '55',
					classify: '衣服'
				}, {
					index: '03',
					name: '裤子',
					specno: '20190902-01',
					unit: '件',
					stockNum: '30',
					diffNum: '25',
					storageNum: '55',
					classify: '衣服'
				}],
				themeColor: '#007AFF',
				pickerValueDefault: [0],
				index: 0,
				array: ['请选择配种时段', '1', '2', '3'],
			}
		},
		components: {
			mpvuePicker,
			uniIcon,
			uniCell,
			ztable,
			drawCell,
			popupLayer,
		},
		methods: {
			record() {
				uni.navigateTo({
					url: 'materialRecord?id=' + this.id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			selectDate: function(){
				this.$refs.mpvuePicker.show()
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		},
	}
</script>

<style lang="scss">
	@import "../../common/dataCollection.scss";

	.status-header {
		padding-top: 26rpx;

		.status-title {
			padding-left: 32%;
		}
		.more-icon.icon{
			padding-right: 5%;
			width: 8rpx;
			height: 42rpx;
		}
	}
	.submits {
		margin-top: 0rpx;
		margin-bottom: 30rpx;
	
		button {
			width: 316rpx;
			height: 88rpx;
	
			&.cancel-btn {
				background-color: #F05E57;
				}
	
			&.submit-btn {
				background-color: #4684EA;
				}
			}
		}
	.main {
		.main-wrap {
			padding: 160rpx 23rpx 23rpx 23rpx;
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
//----------------------------------------------------------
// 	.health-container {
// 		background-color: #F5F5F5;
// 		padding: 130rpx 30rpx 120rpx;
// 
// 		.editor-title {
// 			height: 64rpx;
// 
// 			.img {
// 				line-height: 54rpx;
// 
// 				.image {
// 					width: 12rpx;
// 					height: 12rpx;
// 					vertical-align: middle;
// 				}
// 				.sca {
// 					width: 40rpx;
// 					height: 40rpx;
// 					margin-left: 30rpx;
// 					margin-top: -10rpx;
// 				}
// 			}
// 
// 			text {
// 				margin-left: 14rpx;
// 				line-height: 54rpx;
// 				font-size: 32rpx;
// 			}
// 
// 			.btn {
// 				button {
// 					width: 140rpx;
// 					height: 54rpx;
// 					line-height: 54rpx;
// 					vertical-align: middle;
// 					font-size: 24rpx;
// 					text-align: center;
// 					padding: 0px;
// 				}
// 			}
// 		}
// 		
// 		.takePhotoList {
// 			display: flex;
// 			align-items: center;
// 			justify-content: space-between;
// 			padding-bottom: 32rpx;
// 
// 			.takephotoItem {
// 				background: white;
// 				border-radius: 22rpx;
// 				height: 214rpx;
// 				width: 214	rpx;
// 				margin-right: 24rpx;
// 				display: flex;
// 				justify-content: center;
// 				align-items: center;
// 
// 				.img {
// 					width: 54rpx;
// 					height: 54rpx;
// 					vertical-align: middle;
// 				}
// 			&:last-child{
// 				margin-right: 0;
// 			}
// 			}
// 		}
// 
// 		.submits {
// 			margin-top: 0rpx;
// 			margin-bottom: 30rpx;
// 
// 			button {
// 				width: 316rpx;
// 				height: 88rpx;
// 
// 				&.cancel-btn {
// 					background-color: #F05E57;
// 				}
// 
// 				&.submit-btn {
// 					background-color: #4684EA;
// 				}
// 			}
// 		}
// 
// 		.card-form {
// 			margin-top: 0rpx;
// 			.input-style {
// 				color: #B2B2B2;
// 				text-align: right;
// 			}
// 
// 			.input-style .uni-input-wrapper .uni-input-placeholder {
// 				color: #B2B2B2;
// 				text-align: right;
// 				font-size: 28rpx;
// 			}
// 		}
// 
// 		.editor-title {
// 			height: 80rpx;
// 
// 			.confirm-btn {
// 				width: 140rpx;
// 				height: 54rpx;
// 
// 				button {
// 					width: 140rpx;
// 					height: 54rpx;
// 					font-size: 24rpx;
// 					padding: 0;
// 					background-color: #4684EA;
// 				}
// 			}
// 
// 			&.form-seat {
// 				height: 120rpx;
// 			}
// 		}
// 
// 		//抽屉样式
// 		.draw {
// 			padding: 30rpx;
// 			width: 500rpx;
// 			height: calc(100% - 118rpx);
// 
// 			.bg-gray {
// 				background: #f5f5f5;
// 				padding: 16rpx 20rpx;
// 				font-size: 12px;
// 				color: #4d4d4d;
// 			}
// 		}
// 
// 		.page__info {
// 			align-items: center;
// 			font-size: 12px;
// 			justify-content: space-between;
// 			margin: 10px 0 0;
// 		}
// 	}
</style>