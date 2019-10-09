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
					食堂盘点单新增
				</view>
				<view class="status-del">
					删除
				</view>
			</view>
		</view>

		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 食堂名称 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								食堂名称<text class="text-red">*</text>
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
						
						<!-- 计量单位 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								计量单位
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="自动带出" v-bind:disabled="true" />
							</view>
						</view>
						
						<!-- 盘点数量 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								盘点数量<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="套" v-bind:disabled="true" />
							</view>
						</view>
						
						<!-- 基本分类 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								基本分类
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="80" v-bind:disabled="true" />
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- btn -->
			<view class="submits jus-b">
				<button type="primary" class="flexc add-btn" @tap="clickCancel">取消</button>
				<button type="primary"  class="flexc">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['请选择物料', '样品', '巴西', '日本'],
				index:0,
				submitStatus:true,
				editStatus:false
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		}
	}
</script>




<style lang="scss">
	@import "../../common/dataCollection.scss";

	.status-header {
		padding-top: 26rpx;

		.status-title {
			padding-left: 32%;
		}
	}
	.main {
		.main-wrap {
			padding: 160rpx 23rpx 23rpx 23rpx;
		}
	}
</style>
