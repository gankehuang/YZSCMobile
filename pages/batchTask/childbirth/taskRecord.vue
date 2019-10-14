<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				任务记录
			</view>
			<view class="right__icon">
				<image src="../../../static/search/ico-01.png" mode="" class="icon"></image>
			</view> 
		</view>
		
		<!-- 逾期任务 -->
		<view>
			<view v-for="(item, index) in list" :key="index">
				<uni-collapse ref="add" class="warp" @change="change">
					<uni-collapse-item v-for="(sub, key) in item.data" :key="key" color="#4785F3" :open="sub.open" :show-animation="sub.showAnimation" :disabled="sub.disabled" :title="sub.subName">
						<template v-if="!sub.type">
							<view class="content">{{ sub.content }}</view>
						</template>
						<template v-else>
							<uni-list>
								<uni-list-item v-for="(list, listIndex) in sub.subList" :key="listIndex" :url="url" :title="list.title" :num="list.num" :note="list.note" :thumb="list.thumb" :show-extra-icon="list.showExtraIcon" :extra-icon="list.extraIcon" :show-switch="list.showSwitch" @switchChange="change" />
							</uni-list>
						</template>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		
		<!-- 加载更多  -->
		<view class="uni-tab-bar-loading" @click="loadMore()">
			<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	//折叠列表引入文件
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniLoadMore from '@/components/uni-load-more.vue';  //  加载更多
export default {
	components: {
		uniCollapse,
		uniCollapseItem,
		uniList,
		uniListItem,
		uniLoadMore
	},
	data() {
		const listData = [{
				data: [
					{
						type: true,
						subName: '生产母猪普免',
						subList: [{
								title: '总任务项',
								num: 8
							},
							{
								title: '未完成',
								num: 2
							},
							{
								title: '已完成',
								num: 1
							},
							{
								title: '已取消',
								num: 5
							},
							{
								title: '已调整',
								num: 0
							},
							{
								title: '逾期未完成',
								num: 0
							},
							{
								title: '执行中',
								num: 0
							}
						]
					},
					{
						type: true,
						subName: '桑梓湖老场总场-A07',
						subList: [{
								title: '总任务项',
								num: 8
							},
							{
								title: '未完成',
								num: 2
							},
							{
								title: '已完成',
								num: 1
							},
							{
								title: '已取消',
								num: 5
							},
							{
								title: '已调整',
								num: 0
							},
							{
								title: '逾期未完成',
								num: 0
							},
							{
								title: '执行中',
								num: 0
							}
						]
					},
					{
						type: true,
						subName: '桑梓湖老场总场-20190601',
						subList: [{
								title: '总任务项',
								num: 8
							},
							{
								title: '未完成',
								num: 2
							},
							{
								title: '已完成',
								num: 1
							},
							{
								title: '已取消',
								num: 5
							},
							{
								title: '已调整',
								num: 0
							},
							{
								title: '逾期未完成',
								num: 0
							},
							{
								title: '执行中',
								num: 0
							}
						]
					}
				]
			},
		]
		return {
			id: '',
			list: listData,
			url: '/pages/batchTask/matchPregnant/taskRecordDetail',//点击条目跳转地址
			
			//加载更多
			status: 'more',
			loadingType: 0, // 加载更多状态
			loadingText: {
				contentdown: '查看更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
		}
	},
	//上拉加载数据
	onReachBottom() {
		this.loadMore()
	},
	methods: {
		// 滑动底部加载
		loadMore() {
			let _this = this;
			let tableData = _this.list;
			_this.loadingType = 1;
			const getData = [
				{
					type: true,
					subName: '生产母猪普免11',
					subList: [{
							title: '总任务项',
							num: 8
						},
						{
							title: '未完成',
							num: 2
						},
						{
							title: '已完成',
							num: 1
						},
						{
							title: '已取消',
							num: 5
						},
						{
							title: '已调整',
							num: 0
						},
						{
							title: '逾期未完成',
							num: 0
						},
						{
							title: '执行中',
							num: 0
						}
					]
				},
			]
			setTimeout(() => {
				let newData = [...tableData[0].data, ...getData];
				_this.list[0].data = newData;
			}, 300);
			setTimeout(() => {
				_this.loadingType = 0;
			}, 500);
		},
		change() {
			//console.log(e)
			this.$on('click', function(e){
				console.log(e);
			})
		},
		back () {
			uni.navigateBack({
			})
		}
	}
}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	
	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}
	
	.example-title__after {
		position: relative;
		color: #031e3c
	}
	
	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}
	
	.example .example-title {
		margin: 40upx 0
	}
	
	.example-body {
		padding: 30upx;
		background: #fff
	}
	
	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}
	
	.content {
		padding: 30upx;
		background: #f9f9f9;
		color: #666;
	}
	
	.button {
		font-size: 26upx;
		line-height: 90upx;
	}
	
</style>
