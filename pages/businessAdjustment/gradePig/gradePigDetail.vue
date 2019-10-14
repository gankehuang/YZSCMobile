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
					等级/调整详情
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
						
						<view class="main-wrap-contetnt-item-field" style="padding-top: 0;flex-direction: column;">
							<view class="abreast">
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
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									原耳牌
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<input type="text" value="" placeholder="自动带出" class="abreast_font" />
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" style="flex-direction: column;">
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name">
									新核心群等级
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="核心群一级" />
								</view>
							</view>
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									原核心群等级
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<input type="text" value="" placeholder="自动带出" class="abreast_font" />
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" style="flex-direction: column;">
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name">
									原公猪猪只状态
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="生产公猪" />
								</view>
							</view>
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									调整后公猪猪只状态
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<input type="text" value="" placeholder="自动带出" class="abreast_font" />
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" style="flex-direction: column;">
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name">
									公猪异常原因
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" value="" placeholder="精液少" />
								</view>
							</view>
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									原异常原因
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<input type="text" value="" placeholder="自动带出" class="abreast_font" />
								</view>
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
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
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
		components:{
			uniIcon
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
	.abreast{
		display: flex;
		justify-content: space-between;
		font-weight: 700;
		
	}
	.abreast_font{
		font-size: 12px !important;
		font-weight: 400 !important;
	}
</style>
