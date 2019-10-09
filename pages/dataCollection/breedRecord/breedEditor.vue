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
					配种记录编辑
				</view>
			</view>
			
		</view>
	<!-- 内容 -->
			<view class="main">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<!-- 标题 -->
							<view class="main-wrap-contetnt-item-title">
								<view class="main-wrap-contetnt-item-title-number">
									<image class="icon-big" src="/static/assets/group.png"></image>
									<view class="title-number">1
									</view>
								</view>
								<view class="main-wrap-contetnt-item-title-text">修改配种明细</view>
								<view class="main-wrap-contetnt-item-title-del">
									<image class="icon-big" src="/static/assets/del@2x.png" mode=""></image>
								</view>
							</view>
							<!-- 与配公猪 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									与配公猪<text class="text-red">*</text>
									<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
										<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
									</view>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="LY001" />
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
							<!-- 耳牌号 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									耳牌号<text class="text-red">*</text>
									<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
										<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
									</view>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="2" />
								</view>
							</view>
							<!-- 均公重 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									均公重<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="2" />
								</view>
							</view>
							<!-- 配种员 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									配种员<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<picker @change="bindPickerChange" :value="index" :range="array1">
										<view class="picker">
											<view class="uni-input">{{array1[index]}}</view>
											<view class="dextrad-icon">
												<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
											</view>
										</view>
									</picker>
								</view>
							</view>
							<!-- 操作评分 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									操作评分<text class="text-red">*</text>
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
							<!-- 均重母 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									均重母<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="请输入转入栏位" />
								</view>
							</view>
							<!-- 配种日期 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									配种日期<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
										<view class="picker">
											<view class="uni-input">{{date}}</view>
											<view class="dextrad-icon">
												<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
											</view>
										</view>
									</picker>
								</view>
							</view>
						</view>
					</view>
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<!-- 标题 -->
							<view class="main-wrap-contetnt-item-title">
								<view class="main-wrap-contetnt-item-title-number">
									<image class="icon-big" src="/static/assets/group.png"></image>
									<view class="title-number">2
									</view>
								</view>
								<view class="main-wrap-contetnt-item-title-text">修改配种明细</view>
								<view class="main-wrap-contetnt-item-title-del">
									<image class="icon-big" src="/static/assets/del@2x.png" mode=""></image>
								</view>
							</view>
							<!-- 与配公猪 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									与配公猪<text class="text-red">*</text>
									<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
										<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
									</view>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="LY001" />
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
							<!-- 耳牌号 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									耳牌号<text class="text-red">*</text>
									<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
										<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
									</view>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="2" />
								</view>
							</view>
							<!-- 均公重 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									均公重<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="2" />
								</view>
							</view>
							<!-- 配种员 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									配种员<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<picker @change="bindPickerChange" :value="index" :range="array1">
										<view class="picker">
											<view class="uni-input">{{array1[index]}}</view>
											<view class="dextrad-icon">
												<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
											</view>
										</view>
									</picker>
								</view>
							</view>
							<!-- 操作评分 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									操作评分<text class="text-red">*</text>
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
							<!-- 均重母 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									均重母<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="请输入转入栏位" />
								</view>
							</view>
							<!-- 配种日期 -->
							<view class="main-wrap-contetnt-item-field field-nobottom">
								<view class="main-wrap-contetnt-item-field-name">
									配种日期<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
										<view class="picker">
											<view class="uni-input">{{date}}</view>
											<view class="dextrad-icon">
												<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
											</view>
										</view>
									</picker>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
         <view class="submits jus-b">
			<button type="primary" class="flexc save-btn">保存</button>
		</view>
	</view>

</template>

<script>
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
        padding:160rpx 23rpx 23rpx 23rpx;
		}
		}
</style>
