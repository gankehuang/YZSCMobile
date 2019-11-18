<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				验收报告
			</view>
			<view class="right__icon">
				<text>输出PDF</text>
			</view> 
		</view>
		
		
		<view >
			<view class="radius_card_wrap" >
				<view class="card_row" style="height: 82px;border: none;">
					<view>
						<text style="font-size: 16px;color: #4D4D4D;font-weight: 700;">复产安全管理报告</text>
						<br/>
						<text>编号：0171684110161311</text>
					</view>
					<view class="img">
						<image src="../../../static/assets/LOGO@2x.png" style="width: 168rpx; height: 50rpx;" mode=""></image>
					</view>
				</view>
				<view class="card_row"  style="height: 40px;border: none;">
					<view class="card_label">验收小组</view>
					<view class="card_value">{{taskItem.breedingBatches}}</view>
				</view>
				<view class="card_row"  style="height: 40px;border: none;">
					<view class="card_label">验收结果</view>
					<view class="card_value">{{taskItem.taskName}}</view>
				</view>
				<view class="card_row"  style="height: 40px;border: none;">
					<view class="card_label">验收时间：</view>
					<view class="card_value">{{taskItem.startTime}}</view>
				</view>
				<view class="card_row"  style="height: 40px;border: none;">
					<view class="card_label">审批状态</view>
					<view class="card_value">{{taskItem.endTime}}</view>
				</view>
			</view>
			
			<view class="radius_card_wrap" style="padding-top: 15px; padding-left: 15px;">
				<view class="card_row" style="margin-bottom: 20px;">
					<view class="card_label" style="font-size: 32rpx;color: #4785F3;">验收明细</view>
				</view>
				<view class="title">
					<text>生活区</text>
					<text class="green">验收合格</text>
				</view>
				<view class="spread">
					<view>
						<view></view>
						<text>外围道路(1/4)</text>
					</view>
					<view class="mr_0">
						<view></view>
						<text>外围道路(1/4)</text>
					</view>
				</view>
				
				<view class="title">
					<text>办公区</text>
					<text class="red">验收不合格</text>
				</view>
				<view class="spread">
					<view>
						<view></view>
						<text>外围道路(1/4)</text>
					</view>
					<view class="mr_0">
						<view></view>
						<text>外围道路(1/4)</text>
					</view>
				</view>
				
			</view>
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
			taskItem: 
				{
					'breedingBatches': '张三(组长)',
					'taskName': '张三',
					'startTime': '2019-06-01',
					'endTime': '审批中',
					'taskState': '某某猪场'
				}
			,
			status: 'more',
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
				url: '/pages/batchTask/matchPregnant/warningTask'
			})
		},
		toRecord(){  //跳转任务记录
			uni.navigateTo({
				url: '/pages/batchTask/matchPregnant/taskRecord'
			})
		},
		toStartTask(item) {  //跳转开始任务
			uni.navigateTo({
				url: '/pages/batchTask/matchPregnant/startTask?item=' + encodeURIComponent(JSON.stringify(item))
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
	.datagrid-wrapper{
		padding: 20rpx 12rpx 0;
	}
	
	.header-container{
		padding-top: 30rpx !important;
		font-size:16px !important;
		color: #fff;
		padding-left: 30px !important;
	}
	
	.card_row{
		.img{
			width: 84px;
			height: 25px;
		}
	}
	.title{
		display: flex;
		justify-content: space-between;
		padding-bottom: 20px;
		font-size: 14px;
		color: #4D4D4D;
		font-weight: 700;
		.red{
			color: #E97171;
			font-size: 12px;
			font-weight: 400;
		}
		.green{
			color: #5BD660;
			font-size: 12px;
			font-weight: 400;
		}
	}
	
	.spread{
		flex: 1;
		position: relative;
		>view{
			text-align: center;
			margin-right: 14rpx;
			float: left;
			margin-bottom: 30rpx;
			view{
				width:153px;
				height:92px;
				background:rgba(244,244,244,1);
				border-radius: 16rpx;
			}
		}
		.mr_0{
			margin-right: 0!important;
		}
	}
</style>
