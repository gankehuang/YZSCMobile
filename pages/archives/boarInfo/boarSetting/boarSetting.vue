<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				种猪档案
			</view>
			<view class="right__icon">
			</view>
		</view>
		<view class="main" style="padding: 24rpx;">
			<visibleSetting :list="list" keyForName="fname"></visibleSetting>
		</view>
		
		<view class="confirm-btn">
			<button type="primary">确定</button>
		</view>
		
	</view>
</template>

<script>
import visibleSetting from '@/components/visibleSetting/visibleSetting.vue'
export default {
	components: {
		visibleSetting
	},
	data() {
		return {
			list: [{
				fname: '耳牌号',
				enable: true,
				disabled: false
			},{
				fname: '国际号', 
				enable: true,
				disabled: false
			},{
				fname: '猪只类型',
				enable: true,
				disabled: true
			},{
				fname: '再场状态',
				enable: false,
				disabled: false
			}]
		};
	},
	mounted: {
		
	}
}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.confirm-btn {
		width: 520upx;
		margin: 22upx auto;
	}
</style>
