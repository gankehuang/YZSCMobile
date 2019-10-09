<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status_bar">
			<view class="status">
				<image class="status__bg" src="/static/assets/top_bg.png" mode="widthFix"></image>
				<view class="icon-back" @tap="handOnClickBack">
					<image class="icon" src="../../static/assets/back.png" mode=""></image>
				</view>
				<view class="icon-set">
					<image class="icon2" src="../../static/assets/Fill.png" mode=""></image>
				</view>
				<view class="status__title">淘汰申请新增</view>
			</view>
		</view>

		<view class="semen-editor">
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field">
						申请日期
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						分场<text>*</text>
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
						申请人<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="sqr" range-key="name">
								<view class="uni-input">{{sqr[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						计划淘汰数<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="自动计算" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						累计淘汰数<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="自动计算" placeholder="请输入" />
						</view>
					</view>
				</view>
			</view>

			<view class="card-form2 card">
				<view class="jus-j form-list">
					<view class="field">
						耳牌号<text>*</text>
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="" placeholder="请输入耳牌号" />
						</view>
					</view>
				</view>
			</view>

			<!-- 妊娠明细 -->
			<view class="editor-title jus-j form-seat">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>妊娠明细</text>
				</view>
				<view :class="tbtn=='删除'? 'dis':''">
					<button type="primary" class="tbtn-add">批量新增</button>
				</view>
				<view :class="tbtn=='删除'? '':'dis'">
					<button type="primary" class="tbtn-del">删除</button>
				</view>
			</view>
			<view class="data__wrapper">
				<ztable :showBottomSum="false" :tableData="tableData" :columns="columns" :neddCheck="false" emptyText="-" @rowTap="rowTapHandler"></ztable>
			</view>

		</view>
		<!-- btn -->
		<view class="submits">
			<button type="primary" class="flexc submit-btn" data-key="提交" data-jumpurl="/pages/ywcj_lowvalue/history">{{bluebtn}}</button>
			<button type="primary" class="flexc editor-btn" data-key="编辑" @click="edit" data-jumpurl="/pages/ywcj_lowvalue/fledit">{{redbtn}}</button>
		</view>
	</view>
</template>

<script>
	import ztable from '@/components/z-table/z-table';

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
				bluebtn: "提交",
				redbtn: "编辑",
				tbtn: "",
				index: 0,
				fc: [{
					name: '请选择分场1'
				}, {
					name: '请选择分场2'
				}, {
					name: '请选择分场3'
				}, {
					name: '请选择分场4'
				}],
				sqr: [{
					name: '请选择申请人1'
				}, {
					name: '请选择申请人2'
				}, {
					name: '请选择申请人3'
				}, {
					name: '请选择申请人4'
				}],
				startDate: getDate('start'),
				endDate: getDate('end'),
				tableData: [{
						id: '01',
						index: '01',
						eph: 'Y001',
						ttyy: '难产',
						jz: 180,
						pch: 'XX-G01',
						zzlx: 'XX-G01'
					},
					{
						id: '02',
						index: '02',
						eph: 'Y002',
						ttyy: '难产',
						jz: 180,
						pch: 'XX-G01',
						zzlx: 'XX-G01'
					},
					{
						id: '03',
						index: '03',
						eph: 'Y003',
						ttyy: '难产',
						jz: 180,
						pch: 'XX-G01',
						zzlx: 'XX-G01'
					},
					{
						id: '04',
						index: '04',
						eph: 'Y004',
						ttyy: '难产',
						jz: 180,
						pch: 'XX-G01',
						zzlx: 'XX-G01'
					},
					{
						id: '05',
						index: '05',
						eph: 'Y005',
						ttyy: '难产',
						jz: 180,
						pch: 'XX-G01',
						zzlx: 'XX-G01'
					},
					{
						id: '06',
						index: '06',
						eph: 'Y006',
						ttyy: '难产',
						jz: 180,
						pch: 'XX-G01',
						zzlx: 'XX-G01'
					},
					{
						id: '99',
						index: '99',
						eph: 'Y099',
						ttyy: '难产',
						jz: 180,
						pch: 'XX-G01',
						zzlx: 'XX-G01'
					}
				],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				}, {
					title: "耳牌号",
					key: "eph",
					width: 200,
				}, {
					title: "淘汰原因",
					key: "ttyy",
					width: 100,
				}, {
					title: "均重",
					key: "jz",
					width: 200,
				}, {
					title: "批次号",
					key: "pch",
					width: 200,
				}, {
					title: "猪只类型",
					key: "zzlx",
					width: 200,
				}]
			}
		},
		components: {
			ztable
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			edit: function() {
				if (this.redbtn == "编辑") {
					this.redbtn = "修改",
						this.bluebtn = "取消",
						this.tbtn = "删除"
				} else {
					this.redbtn = "编辑",
						this.bluebtn = "提交",
						this.tbtn = "新增"
				}

			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #f2f5fc;
	}

	.dis {
		display: none;
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

	//xq
	.semen-editor {
		background-color: #F5F5F5;
		padding: 150rpx 30upx 124rpx 30rpx;

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

			.table-btn {
				margin-left: 250upx;
			}

			.tbtn-add {
				width: 142rpx;
				height: 54rpx;
				background-color: #3A75E7;
				font-size: 10px;
			}

			.tbtn-del {
				width: 142rpx;
				height: 54rpx;
				background-color: #F05E57;
				font-size: 12px;
			}
		}

		.card-form {
			height: 484upx;

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

		.card-form2 {
			margin-top: 20upx;

			.form-list {
				height: 96upx;
				font-size: 28upx;

				.field {
					width: 250rpx;

					text {
						color: #FF6354;
						margin-left: 10upx;
					}

					.icon {
						width: 36rpx;
						height: 36rpx;
						margin-left: 20upx;
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

		.data__wrapper {
			height: 584;
		}

	}

	//置底按钮
	.submits {
		position: fixed;
		bottom: 0;
		display: flex;
		background: #F5F5F5;
		width: 750rpx;
		height: 124rpx;
		left: 0;

		button {
			width: 316upx;
			height: 88upx;

			&.editor-btn {
				background-color: #F05E57;
				margin: 20rpx 25rpx 20rpx 40rpx;
			}

			&.submit-btn {
				background-color: #4684EA;
				margin: 20rpx 30rpx 20rpx 25rpx;
			}
		}
	}
</style>
