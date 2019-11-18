<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				分娩
			</view>
			<view class="right__icon">
				<image src="/static/assets/search.png" mode="" class="icon"></image>
			</view> 
		</view>
		<view class="header-wrap">
			<view class="header-container">
				<view class="header-task" @tap.stop="toTask">
					<text class="task-title">预警任务</text>
					<view class="bottom">9</view>
				</view>
				<view class="header-record" @tap.stop="toRecord">
					<text class="record-title">任务记录</text>
					<view class="bottom record">查看</view>
				</view>
			</view>
		</view>
		
		<scrollTab :navList="navList" v-model="currentNavIndex" width="270rpx" :showExpend="false"></scrollTab>
		<!-- 预警任务 -->
		<view v-show="currentNavIndex == 0">
			<view class="radius_card_wrap" v-for="(item, index) in taskItem" :key="index">
				<view class="card_row">
					<view class="card_label">配种/批次</view>
					<view class="card_value">{{item.breedingBatches}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">任务名称</view>
					<view class="card_value">{{item.taskName}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划开始日期</view>
					<view class="card_value">{{item.startTime}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划结束日期</view>
					<view class="card_value">{{item.endTime}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">任务状态</view>
					<view v-if="item.taskState=='未执行'" class="card_value" style="color: #007AFF;">未执行</view>
					<view v-if="item.taskState=='执行中'" class="card_value" style="color: #45B9B0;">执行中</view>
				</view>
				<view class="card_row">
					<button v-if="item.taskState=='未执行'" type="primary" size="mini" style="padding: 0 80rpx; border-radius: 100rpx;" @tap.stop="toStartTask(item)">开始任务</button>
					<button v-if="item.taskState=='执行中'" type="primary" size="mini" style="padding: 0 80rpx;background: #45B9B0; border-radius: 100rpx;" @tap.stop="toStartTask(item)">结束任务</button>
				</view>
			</view>
			
		</view>
		<!-- 未来任务 -->
		<view v-show="currentNavIndex == 1">
			<view class="radius_card_wrap" v-for="(item, index) in taskItem" :key="index">
				<view class="card_row">
					<view class="card_label">配种/批次</view>
					<view class="card_value">{{item.breedingBatches}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">任务名称</view>
					<view class="card_value">{{item.taskName}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划开始日期</view>
					<view class="card_value">{{item.startTime}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划结束日期</view>
					<view class="card_value">{{item.endTime}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">任务状态</view>
					<view v-if="item.taskState=='未执行'" class="card_value" style="color: #007AFF;">未执行</view>
					<view v-if="item.taskState=='执行中'" class="card_value" style="color: #45B9B0;">执行中</view>
				</view>
				<view class="card_row">
					<button v-if="item.taskState=='未执行'" type="primary" size="mini" style="padding: 0 80rpx; border-radius: 100rpx;" @tap.stop="toStartTask(item)">开始任务</button>
					<button v-if="item.taskState=='执行中'" type="primary" size="mini" style="padding: 0 80rpx;background: #45B9B0; border-radius: 100rpx;" @tap.stop="toStartTask(item)">结束任务</button>
				</view>
			</view>
		</view>
		
		<!-- 加载更多  -->
		<view class="uni-tab-bar-loading" @click="loadMore()">
			<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
		
	</view>
</template>

<script>
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import ztable from '@/components/z-table/z-table'
import uniLoadMore from '@/components/uni-load-more.vue';  //  加载更多
export default {
	components: {
		scrollTab,
		ztable,
		uniLoadMore
	},
	data() {
		return {
			id: '',
			currentNavIndex: 0,
			navList: [{
				name: '今日任务'
			},{
				name: '未来任务'
			}],
			//任务列表
			taskItem: [
				{
					'breedingBatches': '桑梓湖老场总场-20190601',
					'taskName': '10日龄仔猪断奶重预估与处理',
					'startTime': '2019/10/15',
					'endTime': '2019/10/15',
					'taskState': '未执行'
				},
				{
					'breedingBatches': '桑梓湖老场总场-20190601',
					'taskName': '产后7天母猪健康情况',
					'startTime': '2019/10/15',
					'endTime': '2019/10/15',
					'taskState': '未执行'
				},
				{
					'breedingBatches': '桑梓湖老场总场-20190601',
					'taskName': '母猪背膘调整',
					'startTime': '2019/10/15',
					'endTime': '2019/10/15',
					'taskState': '执行中'
				},
				{
					'breedingBatches': '桑梓湖老场总场-20190601',
					'taskName': '驯化效果评估',
					'startTime': '2019/10/15',
					'endTime': '2019/10/15',
					'taskState': '执行中'
				},
				{
					'breedingBatches': '桑梓湖老场总场-20190601',
					'taskName': '15日龄仔猪上市计划制定',
					'startTime': '2019/10/15',
					'endTime': '2019/10/15',
					'taskState': '执行中'
				},
				{
					'breedingBatches': '桑梓湖老场总场-20190601',
					'taskName': '淘汰母猪确定',
					'startTime': '2019/10/15',
					'endTime': '2019/10/15',
					'taskState': '执行中'
				},
			],
			
			
			
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
			let tableData = _this.taskItem;
			_this.loadingType = 1;
			setTimeout(() => {
				let getData = [
					{
						'breedingBatches': '桑梓湖老场总场-20190601',
						'taskName': '母猪背膘调整',
						'startTime': '2019/10/15',
						'endTime': '2019/10/15',
						'taskState': '执行中'
					}
				];
				let newData = tableData.concat(getData);
				_this.taskItem = newData;
			}, 300);
			setTimeout(() => {
				_this.loadingType = 0;
			}, 500);
		},
		toTask(){ // 跳转预警任务 
			uni.navigateTo({
				url: '/pages/batchTask/childbirth/warningTask'
			})
		},
		toRecord(){  //跳转任务记录
			uni.navigateTo({
				url: '/pages/batchTask/childbirth/taskRecord'
			})
		},
		toStartTask(item) {  //跳转开始任务
			if(item.taskName == '母猪背膘调整') {
				uni.navigateTo({
					url: '/pages/batchTask/childbirth/startTask?item=' + encodeURIComponent(JSON.stringify(item))
				})
			} else if(item.taskName == '产后7天母猪健康情况') {
				uni.navigateTo({
					url: '/pages/batchTask/childbirth/startTask7Day?item=' + encodeURIComponent(JSON.stringify(item))
				})
			} else if(item.taskName == '10日龄仔猪断奶重预估与处理') {
				uni.navigateTo({
					url: '/pages/batchTask/childbirth/startTask10Day?item=' + encodeURIComponent(JSON.stringify(item))
				})
			} else if(item.taskName == '驯化效果评估') {
				uni.navigateTo({
					url: '/pages/batchTask/childbirth/startTask4?item=' + encodeURIComponent(JSON.stringify(item))
				})
			} else if(item.taskName == '15日龄仔猪上市计划制定') {
				uni.navigateTo({
					url: '/pages/batchTask/childbirth/startTask15Day?item=' + encodeURIComponent(JSON.stringify(item))
				})
			} else if(item.taskName == '淘汰母猪确定') {
				uni.navigateTo({
					url: '/pages/batchTask/childbirth/startTask5?item=' + encodeURIComponent(JSON.stringify(item))
				})
			}
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
	.datagrid-wrapper{
		padding: 20rpx 12rpx 0;
	}
	
	.header-container{
		display: flex;
		flex-flow: row nowrap !important;
		padding-top: 30rpx !important;
	}
	.header-task{
		border-right: 2px solid #2F68D7;
	}
	.header-task, .header-record{
		display: flex;
		width: 50%;
		display: inline;
		text-align: center;
		font-size: 14px;
		.task-title{
			color: #FFF080;
		}
		.record-title{
			color: #3CE6FF;
		}
		.bottom{
			border-radius: 50%;
			border: 3px solid #FFF080;
			width: 100rpx;
			height: 100rpx;
			margin: 10rpx auto;
			line-height: 100rpx;
			color: #FFF080;
			font-size: 35rpx;
		}
		.record{
			border: 3px solid #3CE6FF;
			color: #3CE6FF;
			font-size: 25rpx;
		}
	}
	
	
</style>
