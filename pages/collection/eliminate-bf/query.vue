<template>
	<view>
		<view class="semen-editor">
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field">
						业务开始日期<text>*</text>
					</view>
					<view class="s-value">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						业务结束日期
					</view>
					<view class="s-value">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						耳牌号<text>*</text>
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
					<view class="s-value d-num">
						<picker @change="bindPickerChange" :value="index" :range="lllx" range-key="name">
							<view class="uni-input">{{erph[index].name}}</view>
						</picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						淘汰原因
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="ttyy" range-key="name">
								<view class="uni-input">{{ttyy[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						猪只类型
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="zzlx" range-key="name">
								<view class="uni-input">{{zzlx[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						是否标准内淘汰
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							 <checkbox value="" checked="true" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						在场状态
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="zczt" range-key="name">
								<view class="uni-input">{{zczt[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						分场
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="fc" range-key="name">
								<view class="uni-input">{{fc[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- btn -->
		<view class="btn-wrap">
			<button class="btn-query" @click="jumpPage" data-key="查询" data-jumpurl="query2" type="primary">查询</button>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				date: getDate({
					format: true
				}),
				redbtn: "编辑",
				tbtn: "新增",
				index: 0,
				erph: [{
					name: '请选择耳牌号1'
				}, {
					name: '请选择耳牌号2'
				}, {
					name: '请选择耳牌号3'
				}, {
					name: '请选择耳牌号4'
				}],
				fc: [{
					name: '请选择分场1'
				}, {
					name: '请选择分场2'
				}, {
					name: '请选择分场3'
				}, {
					name: '请选择分场4'
				}],
				zczt: [{
					name: '请选择在场状态1'
				}, {
					name: '请选择在场状态2'
				}, {
					name: '请选择在场状态3'
				}, {
					name: '请选择在场状态4'
				}],
				zzlx: [{
					name: '请选择猪只类型1'
				}, {
					name: '请选择猪只类型2'
				}, {
					name: '请选择猪只类型3'
				}, {
					name: '请选择猪只类型4'
				}],
				ttyy: [{
					name: '请选择淘汰原因1'
				}, {
					name: '请选择淘汰原因2'
				}, {
					name: '请选择淘汰原因3'
				}, {
					name: '请选择淘汰原因4'
				}],
				startDate: getDate('start'),
				endDate: getDate('end')
			}
		},
		components: {},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background: #f2f5fc;
	}

	//xq
	.semen-editor {
		background-color: #F5F5F5;
		padding: 20rpx 30upx 124rpx 30rpx;

		.editor-title {
			height: 80upx;

			.img {
				line-height: 80upx;

				image {
					width: 12upx;
					height: 12upx;
					vertical-align: middle;
				}
			}

			text {
				margin-left: 14upx;
				line-height: 80upx;
				font-size: 32upx;
			}

			.confirm-btn {
				width: 140upx;
				height: 54upx;

				button {
					width: 140upx;
					height: 54upx;
					font-size: 24upx;
					padding: 0;
					background-color: #4684EA;
				}
			}

			.tbtn-add {
				width: 142rpx;
				height: 54rpx;
				background-color: #4F77AA;
				font-size: 12px;
			}

			.tbtn-del {
				width: 142rpx;
				height: 54rpx;
				background-color: #F05E57;
				font-size: 12px;
			}
		}

		.card-form {
			height: 785upx;

			.form-list {
				height: 96upx;
				border-bottom: 1upx solid #EBEEF2;
				font-size: 28upx;

				.field {
					width: 200rpx;

					text {
						color: #FF6354;
						margin-left: 10upx;
					}
					
					.icon {
						width: 36rpx;
						height: 36rpx;
						margin-left: 40upx;
					}
				}
				
				.r-date{
					width: 450rpx;
					position: fixed;
					display: flex;
					margin-left: 200rpx;
					
					.date-text{
						padding-top: 20rpx;
					}
				}

				.s-value {
					color: #B2B2B2;
					vertical-align: middle;

					&.d-num {
						text-align: right;
					}
				}

			}
		}

	}

	//置底按钮
	.btn-wrap {
		position: fixed;
		bottom: 0;
		display: flex;
		padding-bottom: 182upx;
		padding-top: 25rpx;
		align-items: center;
		background: #F5F5F5;
		width: 100%;

		.btn-query {
			font-size: 16px;
			width: 520rpx;
			height: 88rpx;
			font-family: PingFang SC;
		}
	}
</style>
