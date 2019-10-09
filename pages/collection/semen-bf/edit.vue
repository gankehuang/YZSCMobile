<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status_bar">
			<view class="status">
				<image class="status__bg" src="/static/assets/top_bg.png" mode="widthFix"></image>
				<view class="icon-back" @tap="handOnClickBack">
					<image class="icon" src="../../static/assets/back.png" mode=""></image>
				</view>
				<view class="status__title">低值申请记录编辑</view>
			</view>
		</view>

		<view class="semen-editor">
			<!-- 基本明细 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>基本明细</text>
				</view>
			</view>
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field">
						申请日期
						
					</view>
					<view class="s-value d-num">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						                        <view class="uni-input">{{date}}</view>
						                    </picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						精液使用日期
					</view>
					<view class="s-value d-num">
						<picker @change="bindPickerChange" :value="index" :range="lllx" range-key="name">
							<view class="uni-input">{{lllx[index].name}}</view>
						</picker>
						<!-- <input type="text" value="" placeholder="请选择领料类型" /> -->
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						配种次数
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="zb" range-key="name">
								<view class="uni-input">{{pzcs[index].name}}</view>
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
						总份数
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="20" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						申请人
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="sqr" range-key="name">
								<view class="uni-input">{{sqr[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<!-- 基本明细 -->
			<view class="editor-title jus-j form-seat">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>基本明细</text>
				</view>
			</view>
			<view class="card-form card ly">
				<view class="jus-j form-list">
					<view class="field">
						母猪耳牌
					</view>
					<view class="s-value d-num">
						<input type="text" value="2019-06-01" placeholder="请输入" />
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						申请领用份数
					</view>
					<view class="s-value d-num">
						<input type="text" value="2" placeholder="请输入" />
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						第几次配种 
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="1" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						一配公猪
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="Y001" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						二配公猪
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="D045" placeholder="请输入" />
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- btn -->
		<view class="btn-wrap">
			<button class="btn-query" data-key="查询" data-jumpurl="query2" type="primary">反审核</button>
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
				index: 0,
				lllx: [{name:'请选择领料类型1'},{name: '请选择领料类型2'}, {name:'请选择领料类型3'}, {name:'请选择领料类型4'}],
				fc: [{name:'请选择分场1'},{name: '请选择分场2'}, {name:'请选择分场3'}, {name:'请选择分场4'}],
				zb: [{name:'请选择组别1'},{name: '请选择组别2'}, {name:'请选择组别3'}, {name:'请选择组别4'}],
				sqr: [{name:'请选择申请人1'},{name: '请选择申请人2'}, {name:'请选择申请人3'}, {name:'请选择申请人4'}],
				startDate:getDate('start'),
				endDate:getDate('end')
			}
		},
		components: {
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #f2f5fc;
	}

	// 状态栏
	.status_bar {
		height: 128rpx;
		width: 100%;
		position: fixed;
		z-index: 99999;

		.status {
			position: relative;

			.icon-back {
				position: absolute;
				top: 50%;
				margin-top: -10rpx;
				padding-left: 40rpx;
				width: 10%;

				.icon {
					width: 16rpx;
					height: 28rpx;
				}
			}

			.icon-set {
				position: absolute;
				top: 50%;
				margin-top: -10rpx;
				right: -30rpx;
				width: 10%;

				.icon2 {
					width: 8rpx;
					height: 42rpx;
				}
			}

			&__bg {
				width: 100%;
			}

			&__title {
				font-family: PingFangSC-Semibold;
				font-size: 32rpx;
				color: #FFFFFF;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -10rpx;
				margin-left: -85rpx;
			}
		}
	}

	//领用明细
	.semen-editor {
		background-color: #F5F5F5;
		padding: 130rpx 30upx 0 30rpx;

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

			&.form-seat {
				height: 120upx;
			}
		}

		.card-form {
			height: 584upx;

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
		
		.ly{
			height: 488upx;
		}
	}

	//置底按钮
	.btn-wrap {
		padding-top: 92rpx;
		padding-bottom: 68rpx;
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
