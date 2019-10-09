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
					妊检单个录入
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-number">
								<image class="icon-big" src="/static/assets/group.png"></image>
								<view class="title-number">1
								</view>
							</view>
							<view class="main-wrap-contetnt-item-title-text">添加妊检明细</view>
							<view class="main-wrap-contetnt-item-title-del">
								<image class="icon-big" src="/static/assets/del@2x.png" mode=""></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入耳牌号" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								异常原因<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<radio-group @change="radioChange">
									<view style="display: block;">
										<view style="display: flex;">
											<label style="margin-right:15rpx;display: flex;" v-for="(item, index) in items" :key="item.value">
												<radio style="transform: scale(0.7);" :value="item.value" :checked="index === current" />{{item.name}}
											</label>
				
										</view>
									</view>
								</radio-group>
							</view>
						</view>
					</view>
				</view><view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-number">
								<image class="icon-big" src="/static/assets/group.png"></image>
								<view class="title-number">2
								</view>
							</view>
							<view class="main-wrap-contetnt-item-title-text">添加妊检明细</view>
							<view class="main-wrap-contetnt-item-title-del">
								<image class="icon-big" src="/static/assets/del@2x.png" mode=""></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入耳牌号" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								异常原因<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<radio-group @change="radioChange">
									<view style="display: block;">
										<view style="display: flex;">
											<label style="margin-right:15rpx;display: flex;" v-for="(item, index) in items" :key="item.value">
												<radio style="transform: scale(0.7);" :value="item.value" :checked="index === current" />{{item.name}}
											</label>

										</view>
									</view>
								</radio-group>
							</view>
						</view>
					</view>
				</view><view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-number">
								<image class="icon-big" src="/static/assets/group.png"></image>
								<view class="title-number">3
								</view>
							</view>
							<view class="main-wrap-contetnt-item-title-text">添加妊检明细</view>
							<view class="main-wrap-contetnt-item-title-del">
								<image class="icon-big" src="/static/assets/del@2x.png" mode=""></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入耳牌号" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								异常原因<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<radio-group @change="radioChange">
									<view style="display: block;">
										<view style="display: flex;">
											<label style="margin-right:15rpx;display: flex;" v-for="(item, index) in items" :key="item.value">
												<radio style="transform: scale(0.7);" :value="item.value" :checked="index === current" />{{item.name}}
											</label>

										</view>
									</view>
								</radio-group>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
	
	<view class="submits jus-b">
		
		<button type="primary" class="flexc submit-btn">确定</button>
		<button type="primary" class="flexc add-btn">添加</button>
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
				index: 0,
				date: currentDate,
				items: [{
						value: 'kb',
						name: '空杯',
						checked: 'true'
					},
					{
						value: 'fq',
						name: '返情'
					},
					{
						value: 'lc',
						name: '流产'
					}
				],
				current: 0,
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
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
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
</style>
