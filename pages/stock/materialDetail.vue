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
					饲料领用分录编辑
				</view>
				<view class="status-del">
					新增
				</view>
			</view>
		</view>
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
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
								规格型号
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
								库存数量<text class="text-red">*</text>
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
							<view class="main-wrap-contetnt-item-field-btn">
								<button type="primary" size="mini" class="del-btn">删除</button>
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
								规格型号
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
								库存数量<text class="text-red">*</text>
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
							<view class="main-wrap-contetnt-item-field-btn">
								<button type="primary" size="mini" class="del-btn">删除</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b" style="padding-bottom: 15px;">
			<!-- <button type="primary" class="flexc cancel-btn" @tap="clickCancel">取消</button> -->
			<button type="primary"  class="flexc submit-btn">提交</button>
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
				id:'55',
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
			record () {
				uni.navigateTo({
					url: 'diningHallRecord?id='+this.id,
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
			padding-left: 27%;
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
			.main-wrap-contetnt-item-field-btn{
				flex: 1;
				text-align: right;
				.del-btn{
					width: 180rpx;
					height: 64rpx;
					line-height: 64rpx;
					border: 1px solid #CACFD9;
					border-radius: 32rpx;
					background-color: #fff;
					color: #4d4d4d;
					font-family: PingFang SC;
				}
			}
		}
	}
</style>
