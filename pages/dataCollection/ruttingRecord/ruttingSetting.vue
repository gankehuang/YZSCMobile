<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon"  @click="handOnClickBack">
				<image class="icon" src="/static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				显示设置
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
				fname: '配种日期', 
				enable: true,
				disabled: true
			},{
				fname: '配种批次',
				enable: false,
				disabled: false
			},{
				fname: '预产期',
				enable: false,
				disabled: false
			},{
				fname: '转入栏舍',
				enable: false,
				disabled: false
			},{
				fname: '公猪耳号',
				enable: true,
				disabled: true
			},{
				fname: '配种时段',
				enable: false,
				disabled: false
			},{
				fname: '配种员',
				enable: false,
				disabled:false
			},{
				fname: '母猪耳号',
				enable: true,
				disabled: true
			},{
				fname: '配种评分',
				enable: false,
				disabled: false
			},{
				fname: '均重(公)',
				enable: false,
				disabled: false
			},{
				fname: '均重(母)',
				enable: false,
				disabled: false
			},{
				fname: '存栏位置',
				enable: false,
				disabled: false
			},{
				fname: '配种类型',
				enable: false,
				disabled: false
			},{
				fname: '猪只状态',
				enable: false,
				disabled: false
			},{
				fname: '提交人',
				enable: false,
				disabled: false
			},{
				fname: '提交时间',
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
		width: 520rpx;
		margin: 22rpx auto;
	}
</style>
