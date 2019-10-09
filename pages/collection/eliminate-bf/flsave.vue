<template>
	<view>
		<view class="semen-editor">
			
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field biaot">
						<uni-badge size="small" text="1" type="primary"></uni-badge>修改淘汰明细
					</view>
					<view class="s-value d-num">
						<image class="btn-del" src="../../static/del.png"></image>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						耳牌号<text>*</text>
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
					<view class="s-value d-num">
						<picker @change="bindPickerChange" :value="index" :range="lllx" range-key="name">
							<view class="uni-input">{{erph[index].name}}</view>
						</picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						淘汰原因<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="ttyy" range-key="name">
								<view class="uni-input">{{ttyy[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						重量<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="" placeholder="请输入重量" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						标准内淘汰<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="bzntt" range-key="name">
								<view class="uni-input">{{bzntt[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field biaot">
						<uni-badge size="small" text="1" type="primary"></uni-badge>修改淘汰明细
					</view>
					<view class="s-value d-num">
						<image class="btn-del" src="../../static/del.png"></image>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						耳牌号<text>*</text>
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
					<view class="s-value d-num">
						<picker @change="bindPickerChange" :value="index" :range="erph" range-key="name">
							<view class="uni-input">{{erph[index].name}}</view>
						</picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						淘汰原因<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="ttyy" range-key="name">
								<view class="uni-input">{{ttyy[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						重量<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="" placeholder="请输入重量" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						标准内淘汰<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="bzntt" range-key="name">
								<view class="uni-input">{{bzntt[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- btn -->
		<view class="btn-wrap">
			<button class="btn-query" @click="jumpPage" data-key="保存" data-jumpurl="query2" type="primary">保存</button>
		</view>
	</view>
</template>

<script>
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	
	export default {
		data() {
			return {
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
				bzntt: [{
					name: '是1'
				}, {
					name: '否2'
				}],
				ttyy: [{
					name: '请选择淘汰原因1'
				}, {
					name: '请选择淘汰原因2'
				}, {
					name: '请选择淘汰原因3'
				}, {
					name: '请选择淘汰原因4'
				}]
				
			}
		},
		components: {uniBadge},
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
		padding: 18rpx 30upx 100rpx 30rpx;

		.card-form {
			height: 485upx;
			margin-bottom:20rpx;

			.form-list {
				height: 96upx;
				border-bottom: 1upx solid #EBEEF2;
				font-size: 28upx;

				.field {
					width: 280rpx;

					text {
						color: #FF6354;
						margin-left: 10upx;
					}
					
					.icon {
						width: 36rpx;
						height: 36rpx;
						margin-left: 40upx;
					}
				}

				.s-value {
					color: #B2B2B2;
					vertical-align: middle;

					&.d-num {
						text-align: right;
					}
				}
				
				.biaot{
					width: 250rpx;
					
					text {
						color: #fff;
					}
				}
				.btn-del{
					width: 37rpx;
					height: 40rpx;
					margin-top: 20rpx;
				}
			}
			
		}
		
		.two{
			margin-top: 20rpx;
		}
	}

	//置底按钮
	.btn-wrap {
		padding-bottom: 67upx;
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
