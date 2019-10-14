<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				任务记录详情列表
			</view>
			<view class="right__icon">
				<image src="../../../static/search/ico-01.png" mode="" class="icon"></image>
			</view> 
		</view>
		
		<view>
			<view class="radius_card_wrap" v-for="(item, index) in taskItem" :key="index" @tap="toDetail">
				<view class="card_row">
					<view class="card_label">任务类型</view>
					<view class="card_value">{{item.taskType}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">任务名称</view>
					<view class="card_value">{{item.taskName}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划日期</view>
					<view class="card_value">{{item.planTime}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">任务状态</view>
					<view v-if="item.taskState=='未执行'" class="card_value" style="color: #007AFF;">未执行</view>
					<view v-if="item.taskState=='执行中'" class="card_value" style="color: #F56767;">已取消</view>
				</view>
				<view class="card_row">
					<view class="card_label">完成日期</view>
					<view class="card_value">{{item.finishTime}}</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import ztable from '@/components/z-table/z-table'
export default {
	components: {
		scrollTab,
		ztable
	},
	data() {
		return {
			id: '',
			currentNavIndex: 0,
			navList: [{
				name: '逾期任务'
			},{
				name: '违规任务'
			}],
			//任务列表
			taskItem: [
				{
					'taskType': '免疫',
					'taskName': '12月第2周猪瘟',
					'planTime': '2019/10/15',
					'finishTime': '-',
					'taskState': '未执行'
				},
				{
					'taskType': '免疫',
					'taskName': '12月第2周猪瘟',
					'planTime': '2019/10/15',
					'finishTime': '-',
					'taskState': '未执行'
				},
				{
					'taskType': '免疫',
					'taskName': '12月第2周猪瘟',
					'planTime': '2019/10/15',
					'finishTime': '-',
					'taskState': '未执行'
				},
			],
			
			
			
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
		}
	},
	methods: {
		toDetail(){ // 跳转详情
			uni.navigateTo({
				url: '/pages/batchTask/matchPregnant/taskRecordDetailDetail'
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
		}
		.record{
			border: 3px solid #3CE6FF;
			color: #3CE6FF;
		}
	}
	
	
</style>
