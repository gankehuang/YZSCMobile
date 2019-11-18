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
					<image src="/static/assets/more@2x.png" mode="" class="more-icon icon"></image>
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
								<input type="text" value="" placeholder="请输入单据编号" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								盘点仓库
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker :range="storeArray" :value="index" @change="pickStore">
									<view class="picker">
										<view class="uni-input">{{storeArray[index]}}</view>
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
								<input type="text" value="" placeholder="请输入物料类型" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								盘点时间
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker :range="timeArray" :value="index" @change="pickTime">
									<view class="picker">
										<view class="uni-input">{{timeArray[index]}}</view>
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
								<input type="text" value="" placeholder="请输入药品名称" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								计量单位
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入计量单位" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								批次号<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入批次号" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								库存数量
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入库存数量" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								盘点数量<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入盘点数量" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								差异数量 
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入差异数量" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								生产日期
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectDate">
								<text></text>
								<image src="/static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin-right: 15rpx;"></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								到期日期
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectDate">
								<text></text>
								<image src="/static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin-right: 15rpx;"></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								基本分类 
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入分类" />
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
								<image class="img" src="/static/assets/plus.png" mode=""></image>
							</view>
							<view class="takephotoItem">
								<image class="img" src="/static/assets/plus.png" mode=""></image>
							</view>
							<view class="takephotoItem">
								<image class="img" src="/static/assets/plus.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
	import ztable from '@/components/z-table/z-table'
	export default {
		data() {
			return {
				id: '55',
				themeColor: '#007AFF',
				pickerValueDefault: [0],
				index: 0,
				storeArray:['请选择盘点仓库','仓库一','仓库二'],
				timeArray:['请选择盘点时间','上午','中午','下午','晚上']
			}
		},
		components: {
			mpvuePicker,
			uniIcon,
			ztable
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
			pickStore(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		},
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

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
</style>