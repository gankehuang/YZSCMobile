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
					配种批量录入
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 与配公猪 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								公猪耳牌<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入公猪耳牌号" />
							</view>
						</view>
						<!-- 配种时段 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种时段<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="picker">
										<view class="uni-input">{{array[index]}}</view>
										<view class="dextrad-icon">
											<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
										</view>
									</view>
								</picker>
							</view>
						</view>

						<!-- 均公重 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								均重(公)<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入均重" />
							</view>
						</view>
						<!-- 配种员 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种员<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入配种员" />
							</view>
						</view>
						<!-- 操作评分 -->
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								配种评分<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<view class="grade">
									<view class="grade-item">
										<view class="grade-item-name">静立</view>
										<view class="grade-item-stars">
											<view class="grade-item-stars-star">
												<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
											</view>
											<view class="grade-item-stars-star">
												<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
											</view>
											<view class="grade-item-stars-star">
												<image class="icon" src="/static/assets/star2@2x.png" mode=""></image>
											</view>
										</view>
									</view>
									<view class="grade-item">
										<view class="grade-item-name">锁住</view>
										<view class="grade-item-stars">
											<view class="grade-item-stars-star">
												<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
											</view>
											<view class="grade-item-stars-star">
												<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
											</view>
											<view class="grade-item-stars-star">
												<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
											</view>
										</view>
									</view>
									<view class="grade-item">
										<view class="grade-item-name">倒流</view>
										<view class="grade-item-stars">
											<view class="grade-item-stars-star">
												<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
											</view>
											<view class="grade-item-stars-star">
												<image class="icon" src="/static/assets/star2@2x.png" mode=""></image>
											</view>
											<view class="grade-item-stars-star">
												<image class="icon" src="/static/assets/star2@2x.png" mode=""></image>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>

		<view class="search-item">
			<view class="main othermain">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<!-- 耳牌号 -->
							<view class="main-wrap-contetnt-item-field field-nobottom">
								<view class="main-wrap-contetnt-item-field-name">
									<view class=""></view>母猪耳牌<text class="text-red">*</text>
									<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
										<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
									</view>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input class="text" type="text" value="" placeholder="请输入母猪耳牌" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="main search-icon">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<view class="main-wrap-contetnt-item-field field-nobottom">
								<view class="main-wrap-contetnt-item-field-name-icon">
									<image class="icon" src="/static/assets/search@2x.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>


		</view>
		<!-- 列表 -->
		<view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view>
		<view class="submits jus-b">
			<button type="primary" class="flexc submit-btn">确定</button>
			<button type="primary" class="flexc add-btn">添加</button>
		</view>
	</view>

</template>

<script>
	import ztable from '@/components/z-table/z-table'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: ['请选择配种时段', '美国', '巴西', '日本'],
				array1: ['张三', '美国', '巴西', '日本'],
				index: 0,
				date: currentDate,
				tableData: [{
					id: '01',
					index: '01',
					sowcard: 'Y001', //母猪耳牌
					location: '一单元', //存栏位置
					type: '后备母', //
					parity: 'xxx'
				}, {
					id: '02',
					index: '02',
					sowcard: 'Y001', //母猪耳牌
					location: '一单元', //存栏位置
					type: '后备母', //
					parity: 'xxx'
				}, {
					id: '03',
					index: '03',
					sowcard: 'Y001', //母猪耳牌
					location: '一单元', //存栏位置
					type: '怀孕', //
					parity: 'xxx'
				}, {
					id: '04',
					index: '04',
					sowcard: 'Y001', //母猪耳牌
					location: '一单元', //存栏位置
					type: '后备母', //
					parity: 'xxx'
				}, {
					id: '05',
					index: '05',
					sowcard: 'Y001', //母猪耳牌
					location: '一单元', //存栏位置
					type: '后备母', //
					parity: 'xxx'
				}, {
					id: '06',
					index: '06',
					sowcard: 'Y001', //母猪耳牌
					location: '一单元', //存栏位置
					type: '怀孕', //
					parity: 'xxx'
				}],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				}, {
					title: "母猪耳牌号",
					key: "sowcard",
					width: 150,
				}, {
					title: "存栏位置",
					key: "location",
					width: 150,
				}, {
					title: "配种类型",
					key: "type",
					width: 150,
				}, {
					title: "胎次",
					key: "parity",
					width: 150,
				}]
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		components: {
			ztable
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
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
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

	.status-header {
		padding-top: 26rpx;
	}

	.main {
		.main-wrap {
			padding: 160rpx 23rpx 23rpx 23rpx;
		}
	}

	.search-item {
		width: 100%;

		.othermain {
			width: 90%;
			float: left;
			.main-wrap {
				margin-top: -160rpx;
				margin-right: 40rpx;
				.field-nobottom {
					margin-top: -40rpx;
					.main-wrap-contetnt-item-field-value {
						.text {
							margin-right: 20rpx;
							width: 150rpx;
						}
					}
				}
			}
		}

		.search-icon {
			width: 8%;
			float: left;
			.main-wrap {
				margin-left: -60rpx;
				margin-top: -160rpx;
				.field-nobottom {
					margin-left: -20rpx;
					margin-top: -40rpx;
				}
			}
			image {
				width: 18px;
				height: 18px;
				z-index: 99999;
			
			}
		}
	}


	.list-table {
		margin-top: -140px;
	}
</style>
