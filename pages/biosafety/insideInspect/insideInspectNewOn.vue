<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				验收小组创建
			</view>
			<view class="right__icon">
				<!-- <image src="/static/assets/search.png" mode="" class="icon"></image> -->
			</view> 
		</view>
		<!-- <view class="">
			<view class="">
				<view>
					检验流程
				</view>
				<view class="process">
					<view></view>
					<view>繁殖分公司防疫主任</view>
				</view>
			</view>
		</view> -->
		<view class="header-wrap">
			<view class="header-container">
				<view style="font-size: 16px;">检验流程</view>
				<view>
					<view class="process">
						<view class="cirl">
							<view class="cir success"></view>
							<view class="xian"></view>
							<view class="cir fail"></view>
						</view>
					</view>
					<view class="art">
						<view class="">繁殖分公司防疫主任</view>
						<view class="xian"></view>
						<view class="">大区总经理</view>
					</view>
				<!-- 	<view class="process">
						<view class="cir m0"></view>
						<view class="text">繁殖分公司防疫主任</view>
					</view>
					<view class="xian"></view>
					<view class="process">
						<view class="cir"></view>
						<view class="text">大区总经理</view>
					</view> -->
					
				</view>
			</view>
		</view>
		
		<view >
			<view class="radius_card_wrap" >
				<view class="card_row" style="height: 46px;">
					<view class="card_label" style="color: #4785F3;">创建信息</view>
				</view>
				<view class="card_row"  style="height: 46px;">
					<view class="card_label">创建人 ：</view>
					<view class="card_value">{{taskItem.breedingBatches}}</view>
				</view>
				<view class="card_row"  style="height: 46px;">
					<view class="card_label">创建时间：</view>
					<view class="card_value">{{taskItem.taskName}}</view>
				</view>
				<view class="card_row"  style="height: 46px;">
					<view class="card_label">单据状态：</view>
					<view class="card_value">{{taskItem.startTime}}</view>
				</view>
				<view class="card_row"  style="height: 46px;">
					<view class="card_label">猪场 ：</view>
					<view class="card_value">{{taskItem.endTime}}</view>
				</view>
			</view>
			
			<view class="radius_card_wrap" >
				<view class="card_row">
					<view class="card_label" style="color: #4785F3;">成员列表</view>
				</view>
				<view class="table fw">
					<view>序号</view>
					<view>级别</view>
					<view>岗位</view>
					<view>姓名</view>
				</view>
				<view class="table" >
					<view>01</view>
					<view>组长</view>
					<view>大区总经理</view>
					<view>张三</view>
				</view>
				<view class="table" >
					<view>01</view>
					<view>组长</view>
					<view>大区总经理</view>
					<view>张三</view>
				</view>
				<view class="table" >
					<view>01</view>
					<view>组长</view>
					<view>大区总经理</view>
					<view>张三</view>
				</view>
				<view class="table" >
					<view>01</view>
					<view>组长</view>
					<view>大区总经理</view>
					<view>张三</view>
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
					'breedingBatches': '',
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
	
	.header-wrap {
		background-color: #F5F5F5;
		.header-container {
			padding-top: 30rpx !important;
			font-size:16px !important;
			color: #fff;
			padding-left: 30px !important;
		}
	}
	
	.table{
		display: flex;
		height: 92rpx;
		align-items: center;
		border-bottom: 1rpx solid #F3F3F3;
		view{
			flex: 1;
			text-align:center;
			color: #4D4D4D;
		}
	}
	.fw {
		background-color: #F9FCFF;
		font-weight: 700;
		border: none;
	}
	
	.process{
		margin-top: 10px;
		.cirl{
			display: flex;
			align-items: center;
			.cir{
				width: 20px;
				height: 20px;
				border-radius: 50%;
				background: #fff;
			}
			.success {
				background-image: url(../../../static/assets/success.png);
				background-size: contain;
			}
			.fail {
				background-image: url(../../../static/assets/fail.png);
				background-size: contain;
			}
			.xian{
				width: 175px;
				height: 2px;
				background: #70ADFF;
			}
		}
	}
	.art{
		display: flex;
		margin-top: 5px;
		align-items: center;

		.xian{
			width: 50px;
			height: 2px;
		}
	}
	
	
	.m0{
		margin: 0 !important;
	}
</style>
