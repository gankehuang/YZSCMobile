
<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				验收检查表
			</view>
			<view class="right__icon">
				<text @click="jumpPage" data-key="验收报告" data-jumpurl="/pages/biosafety/insideInspect/insideInspectReport">验收报告</text> 
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
				<view style="font-size: 16px;">验收明细</view>
				<view style="margin-top: 10px;">
					<!-- <view class="process">
						<view class="cirl">
							<view class="cir"></view>
							<view class="xian"></view>
							<view class="cir"></view>
						</view>
					</view>
					<view class="art">
						<view class="">繁殖分公司防疫主任</view>
						<view class="xian"></view>
						<view class="">大区总经理</view>
					</view> -->
					<view class="process">
						<view class="cir m0 success"></view>
						<view class="text">张三</view>
					</view>
					<view class="process">
						<view class="cir fail"></view>
						<view class="text">李四</view>
					</view>
					<view class="process">
						<view class="cir "></view>
						<view class="text">王五</view>
					</view>
					<view class="process">
						<view class="cir"></view>
						<view class="text">王五</view>
					</view>
					<view class="process m0">
						<view class="cir noBefore"></view>
						<view class="text">王五</view>
					</view>
					
				</view>
			</view>
		</view>
			
			<view class="radius_card_wrap details" >
				<view class="navBar">
					<view :class="{selected:flag==1}" class="complete" @click='flag=1'>预检</view>
					<view :class="{selected:flag==2}" class="complete" @click='flag=2'>采样</view>
					<view :class="{selected:flag==3}" class="not-complete" @click='flag=3'>化验</view>
					<view :class="{selected:flag==4}" class="complete" @click='flag=4'>清洗</view>
					<view :class="{selected:flag==5}" class="complete" @click='flag=5'>消毒</view>
					<view :class="{selected:flag==6}" class="complete last" @click='flag=6'>验收</view>
				</view>
				<view class="spread">
					<view>
						<view><image src="../../../static/assets/camera.png" class="camera" mode=""></image></view>
						<text>车厢</text>
					</view>
					<view>
						<view><image src="../../../static/assets/camera.png" class="camera" mode=""></image></view>
						<text>车厢</text>
					</view>
					<view>
						<view><image src="../../../static/assets/camera.png" class="camera" mode=""></image></view>
						<text>车厢</text>
					</view>
					<view class="btn">
						提交
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
			flag: 1,
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
	
	.details{
		margin: 15px !important;
		padding: 0 !important;
		flex-flow: row !important;
		box-sizing: border-box;
		
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		.navBar{
			width: 104px;
			>view{
				position: relative;
				display: flex;
				height: 152rpx;
				font-size: 32rpx;
				color: #888888;
				justify-content: center;
				align-items: center;
				// text-align: center;
				background: #F8F9FB;
				&::before {
					content: '';
					position: absolute;
					width: 46rpx;
					height: 46rpx;
					top: 50%;
					transform: translate(50%,-50%);
					right: 0;
					border-radius: 50%;
				}
			}
			.last {
				border-bottom-left-radius: 24rpx;
			}
			.complete {
				&::before {
					background-image: url(../../../static/assets/complete.png);
					background-size: contain;
				}
			}
			.not-complete {
				&::before {
					background-image: url(../../../static/assets/not-complete.png);
					background-size: contain;
				}
			}
			.selected{
				color: #4785F3;
				background: #fff;
				&::before {
					background-image: none;
					height: 12rpx;
					width: 12rpx;
					background-color: white;
					border: 10rpx solid #4785F3;
				}
			}
		}
		.spread{
			padding-top: 24px !important;
			padding-left: 25px !important;
			flex: 1;
			position: relative;
			// display: flex;
			// flex-flow: wrap;
			>view{
				text-align: center;
				margin-right: 20px;
				float: left;
				margin-bottom: 15px;
				view{
					width: 176rpx;
					height: 176rpx;
					background: rgba(244,244,244,1);
					
					display: flex;
					justify-content: center;
					align-items: center;
					.camera {
						width: 67rpx;
						height: 53rpx;
					}
				}
			}
			.btn{
				position: absolute;
				width:115px;
				height:36px;
				background:rgba(71,133,243,1);
				opacity:1;
				border-radius:35px;
				bottom: 10px;
				right: 10px;
				font-size: 16px;
				line-height: 36px;
				text-align: center;
				color: #fff;
			}
		}
	}
	
	
	.process{
		text-align: center;
		margin-right: 42px; // 动态
		float: left;
		.cir{
			position: relative;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background: #fff;
			&::before{
				content: '';
				position: absolute;
				height: 2px;
				width: 50px; // 动态
				background-color: #94D0FC; 
				top: 50%;
				transform: translateY(-50%);
				left: 20px;
			}
		}
		.noBefore{
			&::before{
				display: none;
			}
		}
		
		.success {
			background-image: url(../../../static/assets/success.png);
			background-size: contain;
		}
		.fail {
			background-image: url(../../../static/assets/fail.png);
			background-size: contain;
		}
	}
	
	
	.m0{
		margin: 0 !important;
	}
</style>
