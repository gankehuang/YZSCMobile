<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				系谱
			</view>
			<view class="right__icon">
			</view>
		</view>
		
		<view class="family_wrapper">
			
			<view class="family_column">
				<view class="ball_item self">
					<view class="ball green">
						本猪
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
			</view>
			
			<view class="family_column">
				<view class="ball_item father" style="margin-bottom: 200%;">
					<view class="ball">
						父
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				<view class="ball_item mather">
					<view class="ball red">
						母
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
			</view>
			
			<view class="family_column">
				<view class="ball_item father" style="margin-bottom: 10%;">
					<view class="ball">
						父父
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				<view class="ball_item mather" style="margin-bottom: 200%;">
					<view class="ball">
						父母
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				<view class="ball_item father" style="margin-bottom: 10%;">
					<view class="ball red">
						母母
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				
				<view class="ball_item mather">
					<view class="ball red">
						母父
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
			</view>
			
			<view class="family_column">
				<view class="ball_item father">
					<view class="ball">
						父父父
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				<view class="ball_item mather">
					<view class="ball">
						父父母
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				<view class="ball_item father">
					<view class="ball">
						父母父
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				
				<view class="ball_item mather">
					<view class="ball">
						父母母
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				<view class="ball_item father">
					<view class="ball red">
						母母母
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				
				<view class="ball_item mather">
					<view class="ball red">
						母母父
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				<view class="ball_item father">
					<view class="ball red">
						母父母
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
				<view class="ball_item mather">
					<view class="ball red">
						母父父
					</view>
					<text class="ball_text">
						DDZBBK517004301
					</text>
				</view>
				
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: ''
			};
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
		},
		methods: {
			back () {
				uni.navigateBack({
				})
			},
		}
	}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.family_wrapper{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
		min-height: calc(100vh - 65px)
	}
	.ball_item{
		width: 120rpx;
		word-break: break-all;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.father{
		border-left: 1px solid lightgray;
		border-top: 1px solid lightgray;
	}
	.mather{
		border-left: 1px solid lightgray;
		border-bottom: 1px solid lightgray;
	}
	.self{
		border-bottom: 1px solid lightgray;
		border-top: 1px solid lightgray;
	}
	.ball{
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		color: white;
		background-color: #70ADFF;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		&.green{
			background-color: #76D0A1;
		}
		&.red{
			background-color: #EFA6A6;
		}
	}
	.ball_text{
		font-size: 20rpx;
	}
</style>
