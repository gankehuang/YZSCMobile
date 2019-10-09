<template>
	<view class="content">
		<uni-nav-bar id="nav_bar" title="报表" color="#ffffff" :fixed="true" :statusBar="true" backgroundColor="#447EEF" />
		<view class="class-item">繁殖日报</view>
		<view class="swiper-item">
			<view class="g-box" v-for="(item,index1) in breedDayReports" :key="index1">
				<view class="g-box-content">
					<image :src="item.url" class="g-image" />
					<view class="g-title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="class-item">繁殖月报</view>
		<view class="swiper-item">
			<view class="g-box" v-for="(item,index1) in breedMonthReports" :key="index1">
				<view class="g-box-content">
					<image :src="item.url" class="g-image" />
					<view class="g-title">{{item.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniNavBar,
		},
		data() {
			return {
				scrollTop: 0, // scroll-view组件 距离顶部距离，点击tab时间置顶使用
				breedDayReports: [{
						title: "大区日报",
						url: "/static/assets/daqu.png",
					},
					{
						title: "分公司日报",
						url: "/static/assets/fengongsi.png",
					},
					{
						title: "猪场日报",
						url: "/static/assets/zhuchang.png",
					},
					{
						title: "分场日报",
						url: "/static/assets/fenchang.png",
					}
				],
				breedMonthReports: [{
						title: "大区月报",
						url: "/static/assets/daqu.png",
					},
					{
						title: "分公司月报",
						url: "/static/assets/fengongsi.png",
					},
					{
						title: "猪场月报",
						url: "/static/assets/zhuchang.png",
					},
					{
						title: "分场月报",
						url: "/static/assets/fenchang.png",
					}
				]
			}
		},
		onReady() {
			let _this = this;
			let view = uni.createSelectorQuery().select("#nav_bar");
			view.boundingClientRect(data => {
				_this.fixTop = data.top + data.height;
				//console.log("fixTop: " + _this.fixTop);
			}).exec()
		},
		//页面滚动执行方式
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		methods: {
			jumpTask(e) {
				let key = e.currentTarget.dataset.key;
				uni.navigateTo({
					url: '../extend-view/productList/productList?searchKey=' + key
				})
			},

		}
	}
</script>

<style lang="scss">
	$text—gray: #ABABAB;
	$headBg:#2D70F5;
	$margin_content:20rpx;
	.content {
		height: 100%;
		width: 100%;
		background: #FFFFFF;
	}

	.class-item {
		width: 100%;
		box-sizing: border-box;
		padding-top: 40rpx;
		padding-left: 32rpx;
		padding-bottom: 30rpx;
		font-weight: Semibold;
		font-family: 苹方-简 中粗体;
		font-size: 15px;
		color: #4D4D4D;

	}

	.class-name {
		font-size: 30upx;
		color: #4D4D4D;
		font-weight: bold;
	}

	.g-container {
		/* padding-top: 20upx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {
		width: 50%;
		text-align: center;
	}

	.g-box-content {
		padding-top: 58rpx;
		padding-bottom: 58rpx;
		padding-left: 32rpx;
		background: #FAFAFA;
		margin: 10rpx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}

	.g-image {
		width: 64rpx;
		height: 64rpx;
		margin: 10rpx;
	}

	.g-title {
		font-weight: Semibold;
		font-family: 苹方-简 中粗体;
		font-size: 14px;
		color: #4D4D4D;
		margin-left: 10rpx;
	}

	.swiper-item {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		border-radius: 8rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
</style>
