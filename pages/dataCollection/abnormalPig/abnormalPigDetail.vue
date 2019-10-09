<template>
	<view>
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon"  @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					异常猪记录详情
				</view>
				<view class="status-del">
					<!-- 删除 -->
				</view>
			</view>

		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-field" style="padding-top: 0;">
							<view class="main-wrap-contetnt-item-field-name">
								是否跨分场
							</view>
							<view class="main-wrap-contetnt-item-field-value" style="display: flex;">
								<radio-group >
									<view style="display: block;">
										<view style="display: flex;">
											<label style=";padding: 0;display: flex;" >
												<radio style="transform: scale(0.7);margin-left: 30px;"  :checked="falg3" @click="checked3"/>
											</label>
										</view>
									</view>
								</radio-group>
							</view>
						</view>
						
						<!-- 转入分场 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入分场
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array2">
									<view class="picker">
										<view class="uni-input">{{array2[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						
						<!-- 转出批次 * -->
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								转出批次<text class="text-red">*</text>
								<image @click="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入转出批次" />
							</view>
						</view>
						
						<!-- 转入批次 -->
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								转入批次
								<image @click="qr" style="margin: 0;margin-left: 5px;" src="../../../static/search/qr.png" mode="" class="icon"></image>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入转入批次" />
							</view>
						</view>
						
						<!-- 转群类别 * -->
						<view class="main-wrap-contetnt-item-field" >
							<view class="main-wrap-contetnt-item-field-name">
								转群类别<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array2">
									<view class="picker">
										<view class="uni-input">{{array2[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						
						<!-- 转出日龄 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转出日龄
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="默认带出" />
							</view>
						</view>
						
						<!-- 转入舍 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入舍
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="默认带出" />
							</view>
						</view>
						
						<!-- 转出舍 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转出舍
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="默认带出" />
							</view>
						</view>
						
						<!-- 总重量 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								总重量<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入总重量" />
							</view>
						</view>
						
						<!-- 头数 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								头数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入头数" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b">
			<button type="primary" class="flexc submit-btn">保存</button>
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
				falg3:'',
				array: ['请选择配种时段', '美国', '巴西', '日本'],
				array1: ['张三', '美国', '巴西', '日本'],
				array2: ['请选择转入位置', '分娩舍1栋1单元', '分娩舍1栋2单元', '分娩舍1栋3单元', '分娩舍1栋4单元'],
				array3: ['请选择配种批次', 'PC-201365', 'PC-201565', 'PC-201355', 'PC-201360'],
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
			checked3(){
				this.falg3 = !this.falg3
			},
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

input{
	font-size: 14px;
}
	.status-header {
		padding-top: 26rpx;

		.status-title {
			padding-left: 35%;
		}
	}

	.main {
		.main-wrap {
			padding: 160rpx 23rpx 23rpx 23rpx;
		}
	}
</style>
