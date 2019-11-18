<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<view class="status-header" style="background: #007AFF; padding: 70rpx 0 20rpx 0">
				<view class="back-icon" @tap="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					生产提醒列表
				</view>
			</view>
		</view>
		
		<view class="list">
			<view class="data__wrapper" style="background: #FFFFFF;">
				<view class="indicators-warning-content tip" style="padding-top: 0px;">
					<view class="tip-item" v-for="(item, index) in tipArray" :key="index" @tap.stop="productionItem">
						<view class=""><image src="../../static/tipItem.png" style="width: 67rpx; height: 66rpx;"/></view>
						<view style="margin-top: 10rpx; margin-left: 10rpx; color: #4D4D4D; text-align: left; width: 80%;font-size: 25rpx;">{{item.title}}</view>
						<view style="margin-top: 10rpx; color: #DFE2E6;"><uni-icon type="arrowright" color="#B2B2B2" size="16"  /></view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 加载  -->
		<view class="uni-tab-bar-loading" @click="loadMore()">
			<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
	
	</view>

</template>

<script>
	//  加载更多 
	import uniLoadMore from '@/components/uni-load-more.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		// 上拉加载
		onReachBottom() {
			this.loadMore()
		},
		data() {
			return {
				tipArray: [
					{title: '您有20头超42天空返存栏，请尽快采取措施！'},
					{title: '您有15头空怀超49天存栏，请尽快采取措施！'},
					{title: '您有10头超110天未上产房存栏，请及时处理！'},
					{title: '您有20头超42天空返存栏，请尽快采取措施！'},
					{title: '您有15头空怀超49天存栏，请尽快采取措施！'},
					{title: '您有10头超110天未上产房存栏，请及时处理！'}
				],
				status: 'more',
				statusTypes: [{
					value: 'more',
					text: '加载前'
				}, {
					value: 'loading',
					text: '加载中'
				}, {
					value: 'noMore',
					text: '没有更多'
				}],
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
					
			}
		},
		components: {
			uniLoadMore,
			uniIcon,
		},

		methods: {
			// 滑动底部加载
			loadMore() {
				let _this = this;
				let arr = _this.tipArray;
				_this.loadingType = 1;
				setTimeout(() => {
					let li = [
						{title: '您有20头超42天空返存栏，请尽快采取措施！'},
						{title: '您有15头空怀超49天存栏，请尽快采取措施！'},
						{title: '您有10头超110天未上产房存栏，请及时处理！'}
					];
			
					arr.push(...li);
				}, 300);
				setTimeout(() => {
					_this.loadingType = 0;
				}, 500);
			},
			productionItem() {  //生产提醒条目
				uni.navigateTo({
					url: "/pages/message/productionRemind"
				});
			},
		}
	}
</script>

<style lang="scss">
	@import "../../common/dataCollection.scss";

	.status {
		z-index: 99999;
	}

	.status-search {

		.search-wrap-qr,
		.search-wrap-search {
			width: 10%;
			display: flex;
			align-items: center;
			margin: 0 15rpx;
		}

		.search-wrap-input {
			width: 80%;
			text-align: left;
		}
	}
	
	.list{
		padding-top: 146rpx;
	}
	.tip{
		display: flex;
		flex-direction: column;
		.tip-item{
			display: flex;
			justify-content: space-between;
			text-align: left;
			padding: 20rpx 0 10rpx 0;
		}
	}
</style>
