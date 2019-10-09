<template>
	<view>
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					配种记录详情
				</view>
				<view class="status-del" v-if="!btnState" @tap="togglePopup('middle')">
					删除
				</view>
				<view class="status-del" v-if="btnState" @tap.stop="edit" >
					编辑
				</view>
			</view>
			

		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 配种日期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种日期<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array" :disabled="flag">
									<view class="picker">
										<view class="uni-input">{{array[index]}}</view>
										<view class="dextrad-icon">
											<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
										</view>
									</view>
								</picker>
							</view>
						</view>
						<!-- 配种批次 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种批次<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array3" :disabled="flag">
									<view class="picker">
										<view class="uni-input">{{array3[index]}}</view>
										<view class="dextrad-icon">
											<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
										</view>
									</view>
								</picker>
							</view>
						</view>

						<!-- 预产期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								预产期
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="自动计算" reonly="true" :disabled="flag"/>
							</view>
						</view>
						<!-- 母猪转入位置 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								母猪转入位置<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array2" :disabled="flag">
									<view class="picker">
										<view class="uni-input">{{array2[index]}}</view>
										<view class="dextrad-icon">
											<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
										</view>
									</view>
								</picker>
							</view>
						</view>
						<!-- 与配公猪 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								与配公猪
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入与配公猪" :disabled="flag" />
							</view>
						</view>

						<!-- 配种日期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种时段<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入配种时段" :disabled="flag" />
							</view>
						</view>
						
						<!-- 配种员 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种员
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array1" :disabled="flag" >
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
					<!-- 耳牌号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								公猪耳牌号
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入公猪耳牌号" :disabled="flag" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								均重公<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入均重公" :disabled="flag" />
							</view>
						</view>
					<!-- 耳牌号 -->
					<view class="main-wrap-contetnt-item-field">
						<view class="main-wrap-contetnt-item-field-name">
							母猪耳牌号
						</view>
						<view class="main-wrap-contetnt-item-field-value">
							<input type="text" value="" placeholder="请输入母猪耳牌号" :disabled="flag" />
						</view>
					</view>
					<!-- 均重母 -->
					<view class="main-wrap-contetnt-item-field">
						<view class="main-wrap-contetnt-item-field-name">
							均重母<text class="text-red">*</text>
						</view>
						<view class="main-wrap-contetnt-item-field-value">
							<input type="text" value="" placeholder="请输入均重母" :disabled="flag" />
						</view>
					</view>
					<!-- 转入栏位 -->
					<view class="main-wrap-contetnt-item-field">
						<view class="main-wrap-contetnt-item-field-name">
							转入栏位
						</view>
						<view class="main-wrap-contetnt-item-field-value">
							<input type="text" value="" placeholder="请输入转入栏位" :disabled="flag" />
						</view>
					</view>
					<view class="main-wrap-contetnt-item-field">
						<view class="main-wrap-contetnt-item-field-name">
							猪只状态
						</view>
						<view class="main-wrap-contetnt-item-field-value">
							<input type="text" value="" placeholder="请输入猪只状态" :disabled="flag" />
						</view>
					</view>
					<view class="main-wrap-contetnt-item-field">
						<view class="main-wrap-contetnt-item-field-name">
							提交人
						</view>
						<view class="main-wrap-contetnt-item-field-value">
							<input type="text" value="" :disabled="flag" />
						</view>
					</view>
					<view class="main-wrap-contetnt-item-field field-nobottom">
						<view class="main-wrap-contetnt-item-field-name">
							提交时间
						</view>
						<view class="main-wrap-contetnt-item-field-value">
							<input type="text" value="" :disabled="flag" />
						</view>
					</view>
					</view>
				</view>

			</view>
		</view>
		<view class="submits jus-b">
			<button type="primary" class="flexc save-btn" :disabled="flag">提交</button>
		</view>
		
		<!-- 删除提示框 -->
	
		
		<uni-popup :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="popview">
				<view class="out-text">确定要删除吗？</view>
				<view @click="togglePopup('')" class="out-btn1">取消</view>
				<view @click="goback()" class="out-btn2">确定</view>
			</view>
		</uni-popup>
		
	</view>

</template>

<script>
	//import uniIcons from '@/components/uni-icons/uni-icons'
	import uniPopup from '@/components/uni-popup/uni-popup'
	export default {
		components: {
			//uniIcons,
			uniPopup
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: ['请选择配种时段', '美国', '巴西', '日本'],
				array1: ['张三', '美国', '巴西', '日本'],
				array2: ['请选择转入位置', '分娩舍1栋1单元', '分娩舍1栋2单元', '分娩舍1栋3单元', '分娩舍1栋4单元'],
				array3: ['请选择配种批次', 'PC-201365', 'PC-201565', 'PC-201355', 'PC-201360'],
				index: 0,
				date: currentDate,
				btnState: true,  //删除，编辑按钮状态
				flag: true,       //是否可编辑状态
				show: false,
				type: ''
			}
		},
		onLoad(e) {
			e.id == '01' ? this.btnState = true : this.btnState = false;
				
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
			//	console.log('picker发送选择改变，携带值为', e.target.value)
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
			edit() {    //点击右上角编辑
				this.flag = false;
			},
			
			togglePopup(type) {
				this.type = type;
			},
			goback() {
				this.handOnClickBack();
				return false;
			},
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

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
	/*提示框样式*/
	.popview {
		height: 150upx;
		padding-top: 33upx;
		display: block;
		float: clear;
		width: 530upx;
	}

	.out-text {
		font-size: 28upx;
		margin-bottom: 55upx;
		display: block;
		float: clear;
		text-align: center;

	}

	.out-btn1 {
		width: 50%;
		display: inline-block;
		color: rgb(179, 179, 179);
		text-align: center;
		// margin-left: 120upx;
		// margin-right: 184upx;

	}

	.out-btn2:active,
	.out-btn1:active {
		background: #EEEEEE;
	}

	.out-btn2 {
		display: inline-block;
		text-align: center;
		color: #FF4343;
		width: 50%;
	}
	
	
</style>
