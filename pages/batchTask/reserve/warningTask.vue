<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back"><image class="icon" src="../../../static/assets/back.png" mode=""></image></view>
			<view class="status__title">预警任务</view>
			<view class="right__icon" @tap="showFilter"><image src="/static/assets/search.png" mode="" class="icon"></image></view>
		</view>

		<scrollTab :navList="navList" v-model="currentNavIndex" width="270rpx" :showExpend="false"></scrollTab>

		<!-- 逾期任务 -->
		<view v-show="currentNavIndex == 0">
			<view class="radius_card_wrap" v-for="(item, index) in YQtaskItem" :key="index">
				<view class="card_row">
					<!-- 预警label -->
					<view v-if="item.isGreen == 0" class="card_label" style="color: red;">
						<view class="warn-label">
							<view class="left_icon" style="background: #F56767;"></view>
							红色预警
						</view>
					</view>
					<view v-if="item.isGreen == 1" class="card_label" style="color: #FFB750;">
						<view class="warn-label">
							<view class="left_icon" style="background: #FFB750"></view>
							黄色预警
						</view>
					</view>
				</view>
				<view class="card_row">
					<view class="card_label">配种/批次</view>
					<view class="card_value">{{ item.batchNo || '-' }}</view>
				</view>
				<view class="card_row">
					<view class="card_label">任务名称</view>
					<view class="card_value">{{ item.taskname }}</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划开始日期</view>
					<view class="card_value">{{ item.planStartDate }}</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划结束日期</view>
					<view class="card_value">{{ item.planEndDate }}</view>
				</view>
				<view class="card_row">
					<view class="card_label">任务状态</view>
					<view v-if="item.planStatus == 1" class="card_value" style="color: #007AFF;">未执行</view>
					<view v-if="item.planStatus == 2" class="card_value" style="color: #007AFF;">已执行</view>
					<view v-if="item.planStatus == 3" class="card_value" style="color: #45B9B0;">已取消</view>
					<view v-if="item.planStatus == 4" class="card_value" style="color: #45B9B0;">执行中</view>
					<view v-if="item.planStatus == 5" class="card_value" style="color: #45B9B0;">已调整</view>
				</view>
				<view class="card_row">
					<button v-if="item.planStatus == 1" type="primary" size="mini" style="padding: 0 80rpx;" @tap.stop="toStartTask(item)">开始任务</button>
					<button v-if="item.planStatus != 1" type="primary" size="mini" style="padding: 0 80rpx;background: #45B9B0;" @tap.stop="toStartTask(item)">
						结束任务
					</button>
				</view>
			</view>
			<!-- 加载更多  -->
			<view class="uni-tab-bar-loading" @click="loadMore()"><uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more></view>
			
		</view>
		<!-- 违规任务 -->
		<view v-show="currentNavIndex == 1">
			<view class="radius_card_wrap" v-for="(item, index) in WGtaskItem" :key="index">
				
				<view class="card_row">
					<view class="card_label">单据编号</view>
					<view class="card_value">{{ item.billNo }}</view>
				</view>
				<view class="card_row">
					<view class="card_label">业务日期</view>
					<view class="card_value">{{ item.bizDate }}</view>
				</view>
				<view class="card_row">
					<view class="card_label">分场</view>
					<view class="card_value">{{ item.filedFile }}</view>
				</view>
				<view class="card_row">
					<view class="card_label">车间</view>
					<view class="card_value">{{ item.workshopName }}</view>
				</view>
				<view class="card_row">
					<view class="card_label">处理意见</view>
					<view class="card_value">{{ item.opinion }}</view>
				</view>
				<view class="card_row">
					<view class="card_label">处理状态</view>
					<view v-if="item.status == 0" class="card_value" style="color: #007AFF;">未处理</view>
					<view v-if="item.status == 1" class="card_value" style="color: #45B9B0;">处理中</view>
					<view v-if="item.status == 2" class="card_value" style="color: #45B9B0;">已处理</view>
				</view>
			</view>
			<!-- 加载更多  -->
			<view class="uni-tab-bar-loading" @click="loadMore1()"><uni-load-more :status="status1" :loadingType="loadingType1" :contentText="loadingText1"></uni-load-more></view>
			
		</view>

		
		<!-- 抽屉 -->
		<uni-drawer :visible="boolShow" :mode="'right'" @close="boolShow = false">
			<scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
				<draw-cell title="计划开始日期" required="true">
					<view slot="value" class="bg-gray jus-j">
						<text></text>
						<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
					</view>
				</draw-cell>
				<draw-cell title="计划结束日期" required="true">
					<view slot="value" class="bg-gray jus-j">
						<text></text>
						<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
					</view>
				</draw-cell>
				<draw-cell title="任务名称" required="true">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="请填写" /></view>
				</draw-cell>
				<draw-cell title="任务状态" required="true">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="请填写" /></view>
				</draw-cell>
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import scrollTab from '@/components/scroll-tab/scroll-tab';
import ztable from '@/components/z-table/z-table';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'; //引入抽屉单元格组件
import drawCell from '@/components/uni-cell/draw-cell.vue';
import uniLoadMore from '@/components/uni-load-more.vue'; //  加载更多
import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
import common from '../../../utils/common.js';
export default {
	components: {
		scrollTab,
		ztable,
		uniLoadMore,
		uniDrawer,
		drawCell
	},
	onLoad(option) {
		const _this = this
		_this.getYQList(1, 10, false)
		setTimeout(function(){
			_this.getWGList(1, 10, false)  
		}, 1000)
		if (option.id) {
			_this.id = option.id;
		}
	},
	data() {
		return {
			boolShow: false, //抽屉显示状态
			id: '',
			currentNavIndex: 0,
			navList: [
				{
					name: '逾期任务'
				},
				{
					name: '违规任务'
				}
			],
			//任务列表
			YQtaskItem: [],  //逾期任务列表数据
			WGtaskItem: [],  //违规任务列表数据
			//逾期任务加载更多
			status: 'more',
			loadingType: 0, // 加载更多状态
			loadingText: {
				contentdown: '查看更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			//违规任务加载更多
			status1: 'more',
			loadingType1: 0, // 加载更多状态
			loadingText1: {
				contentdown: '查看更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			page: 2,    //逾期任务页码
			page1: 2,    //违规任务页码
		};
	},
	// 下拉刷新
	onPullDownRefresh() {
		let _this = this
		//console.log('下拉刷新');
		if(_this.currentNavIndex == 0){  //逾期任务
			_this.page = 2
			_this.getYQList(1, 10, false) 
		}else if(_this.currentNavIndex == 1){  //违规任务
			_this.page1 = 2
			_this.getWGList(1, 10, false)  
		}
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	//上拉加载数据
	onReachBottom() {
		this.loadMore();
	},
	methods: {
		/* *****************获取逾期任务列表********************** */
		getYQList(pageNum, pageSize, isLoad){
			var _this = this;
			_this.loadingType = 1;
			let params = {
				//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				
				"batchnum": "",       //批次号
				"startDate": "",      //--任务计划开始时间,
				"endDate": "",        //--任务计划结束时间,
				"fieldId": "Va4AAAKooIidu1vk", //--分场id,
				"pageNumber": pageNum, //--页码,
				"pageSize": pageSize,  //--每页数量,
				"taskname": "",       //--任务名称,
				"workshopId": "2" ,   //--车间(0-配怀1-分娩2-后备3-保育4-育肥6-公猪站)
				
				"bizType": "",
				"isPassCheckSession": "",
				"overDays": "",
				"subBizType": "",
				"userId": "",
			};
			let headers = {};
			//console.log(params)
			common.commRequest(`/bfbAppDeal/queryexpirytask`, params, headers, 'post',
				function(data) {
					let getData = data.data.list;
					console.log(JSON.stringify(getData));
					if(getData.length == 0) {
						_this.loadingType = 2;
						return;
					}
					if(isLoad) {
						let oldData = _this.tableData;
						let loadData = [...oldData, ...getData];
						_this.YQtaskItem = loadData;
					}else {
						_this.YQtaskItem = getData;
					}
					if(getData.length < 10){
						_this.loadingType = 2;
					}else{
						_this.loadingType = 0;
					}
			})
		},
		/* *****************获取违规任务列表********************** */
		getWGList(pageNum, pageSize, isLoad){
			var _this = this;
			_this.loadingType1 = 1;
			let params = {
				//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				"startDate": "",  //任务计划开始时间  ,
				"endDate": "",    //任务计划结束时间  ,
				"fieldId": "Va4AAABzXU+du1vk",   //分场id  ,
				"ifDeal": 0,        //是否已处理(0-未处理1-已处理)  
				"pageNumber": pageNum,    //页码  ,
				"pageSize": pageSize,      //每页条数  ,
				"workshopId": "2",     //车间(0-配怀1-分娩2-后备3-保育4-育肥6-公猪站)
				
				"bizType": "",
				"isPassCheckSession": "",
				"subBizType": "",
				"userId": "",
			};
			let headers = {};
			//console.log(params)
			common.commRequest(`/bfbAppDeal/queryillegaltask`, params, headers, 'post',
				function(data) {
					//console.log(data)
					let getData = data.data.list;
					console.log(JSON.stringify(getData));
					if(getData.length == 0) {
						_this.loadingType1 = 2;
						return;
					}
					if(isLoad) {
						let oldData = _this.tableData;
						let loadData = [...oldData, ...getData];
						_this.WGtaskItem = loadData;
					}else {
						_this.WGtaskItem = getData;
					}
					if(getData.length < 10){
						_this.loadingType1 = 2;
					}else{
						_this.loadingType1 = 0;
					}
			})
		},
		/* *********************加载更多************************* */
		// 逾期任务滑动底部加载
		loadMore() {
			let _this = this;
			_this.getYQList(_this.page, 10, true)
			_this.page ++;
		},// 违规任务滑动底部加载
		loadMore1() {
			let _this = this;
			_this.getWGList(_this.page1, 10, true)
			_this.page1 ++;
		},
		toStartTask(item) {
			//跳转开始任务
			uni.navigateTo({
				url: '/pages/batchTask/matchPregnant/startTask?item=' + encodeURIComponent(JSON.stringify(item))
			});
		},
		showFilter() {
			this.boolShow = true;
		},
		find() {
			this.boolShow = false;
		},
		back() {
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="scss">
@import '@/common/baseInfo.scss';
.icon-big {
	width: 24rpx;
	height: 24rpx;
}
.datagrid-wrapper {
	padding: 20rpx 12rpx 0;
}

.header-container {
	display: flex;
	flex-flow: row nowrap !important;
	padding-top: 30rpx !important;
}
.header-task {
	border-right: 2px solid #2f68d7;
}
.header-task,
.header-record {
	display: flex;
	width: 50%;
	display: inline;
	text-align: center;
	font-size: 14px;
	.task-title {
		color: #fff080;
	}
	.record-title {
		color: #3ce6ff;
	}
	.bottom {
		border-radius: 50%;
		border: 3px solid #fff080;
		width: 100rpx;
		height: 100rpx;
		margin: 10rpx auto;
		line-height: 100rpx;
		color: #fff080;
	}
	.record {
		border: 3px solid #3ce6ff;
		color: #3ce6ff;
	}
}

//抽屉样式
.draw {
	padding: 30rpx;
	width: 500rpx;
	height: calc(100% - 118rpx);
	.bg-gray {
		background: #f5f5f5;
		padding: 16rpx 20rpx;
		font-size: 12px;
		color: #4d4d4d;
	}
}
.submits {
	position: fixed;
	bottom: 0rpx;
	left: 0;
	width: 100%;
	.flexc {
		width: 50%;
		height: 86rpx;
		&.reset-btn {
			background-color: #ffffff;
			border-top: 2px solid #f5f5f5;
		}
		&.submit-btn {
			border-top: 2px solid #4684ea;
			background-color: #4684ea;
			color: #ffffff;
		}
	}
}
</style>
