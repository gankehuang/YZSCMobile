<template>
	<view>
		<view class="semen-editor">
			
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field biaot">
						<uni-badge size="small" text="1" type="primary"></uni-badge>修改领用明细
					</view>
					<view class="s-value d-num">
						<image class="btn-del" src="../../static/del.png"></image>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						物料名称
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" value="LY001" placeholder="请输入" />
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						计量单位
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" value="2" placeholder="请输入" />
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						申请数量
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" value="2" placeholder="请输入" />
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						规格型号<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="20/箱" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						库存数量<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="20" placeholder="请输入" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field biaot">
						<uni-badge size="small" text="2" type="primary"></uni-badge>修改领用明细
					</view>
					<view class="s-value d-num">
						<image class="btn-del" src="../../static/del.png"></image>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						物料名称
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" value="LY001" placeholder="请输入" />
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						计量单位
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" value="2" placeholder="请输入" />
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						申请数量
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" value="2" placeholder="请输入" />
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						规格型号<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="20/箱" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						库存数量<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="20" placeholder="请输入" />
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- btn -->
		<view class="btn-wrap">
			<button class="btn-save" type="primary">保存</button>
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
			height: 585upx;
			margin-bottom:20rpx;

			.form-list {
				height: 96upx;
				border-bottom: 1upx solid #EBEEF2;
				font-size: 28upx;

				.field {
					width: 140rpx;

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
	.btn-wrap {
		position:fixed; 
		bottom:0;
		display: flex;
		padding-bottom: 25upx;
		padding-top: 25rpx;
		align-items: center;
		background: #F5F5F5;
		width: 100%;
	
		.btn-save {
			font-size: 16px;
			width: 520rpx;
			height: 88rpx;
			font-family: PingFang SC;
		}
	}
</style>
