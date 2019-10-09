<template>
	<view>
		<view class="semen-editor">
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field">
						单据编号<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						申请日期
					</view>
					<view class="r-date">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
						<text class="date-text">至</text>
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						精液使用时间
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="sytime" range-key="name">
								<view class="uni-input">{{sytime[index].name}}</view>
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
				<view class="jus-j form-list">
					<view class="field">
						耳牌号
					</view>
					<view class="s-value d-num">
						<picker @change="bindPickerChange" :value="index" :range="lllx" range-key="name">
							<view class="uni-input">{{erph[index].name}}</view>
						</picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						单据状态
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="buff" range-key="name">
								<view class="uni-input">{{buff[index].name}}</view>
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
				sytime: [{
					name: '请选择精液使用时间1'
				}, {
					name: '请选择精液使用时间2'
				}, {
					name: '请选择精液使用时间3'
				}, {
					name: '请选择精液使用时间4'
				}],
				buff: [{
					name: '请选择单据状态1'
				}, {
					name: '请选择单据状态2'
				}, {
					name: '请选择单据状态3'
				}, {
					name: '请选择单据状态4'
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
			height: 585upx;

			.form-list {
				height: 96upx;
				border-bottom: 1upx solid #EBEEF2;
				font-size: 28upx;

				.field {
					width: 140rpx;

					text {
						color: #FF6354;
						margin-left: 10upx;
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
