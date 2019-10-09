<template>
	<view>
		<view class="semen-editor">
			
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field biaot">
						<uni-badge size="small" text="1" type="primary"></uni-badge>添加领用明细
					</view>
					<view class="s-value d-num">
						<image class="btn-del" src="../../static/del.png"></image>
					</view>
				</view>
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
					<view class="s-value d-num">
						<input type="text" value="1" placeholder="请输入" />
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
				<view class="jus-j form-list">
					<view class="field">
						最近一次配种时间
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="2019-07-01" placeholder="请输入" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field biaot">
						<uni-badge size="small" text="2" type="primary"></uni-badge>添加领用明细
					</view>
					<view class="s-value d-num">
						<image class="btn-del" src="../../static/del.png"></image>
					</view>
				</view>
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
					<view class="s-value d-num">
						<input type="text" value="1" placeholder="请输入" />
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
				<view class="jus-j form-list">
					<view class="field">
						最近一次配种时间
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="2019-07-01" placeholder="请输入" />
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- btn -->
		<view class="submits">
			<button type="primary" class="flexc submit-btn" data-key="确定" data-jumpurl="/pages/ywcj_lowvalue/history">确定</button>
			<button type="primary" class="flexc editor-btn" data-key="添加" data-jumpurl="/pages/ywcj_lowvalue/fledit">添加</button>
		</view>
	</view>
</template>

<script>
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	
	export default {
		data() {
			return {
				
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
		padding: 18rpx 30upx 140rpx 30rpx;

		.card-form {
			height: 685upx;
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
