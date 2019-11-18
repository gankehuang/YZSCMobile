<template>
	<!-- 免疫记录 -->
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="status-header">
				<view class="back__icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png" mode=""></image>
				</view>
				<view class="status__title">
					复产验收管理 
				</view>
				<!-- <view class="right__icon" @tap="filterData">
					筛选
				</view> -->
			</view>
		</view>
		<scrollTab :navList="navList" v-model="currentNavIndex" class='scroll'></scrollTab>
		
		<view class="datagrid-wrapper" v-show="currentNavIndex == 0">
			<view class="data__wrapper">
				<ztable stickSide stickSide1 :tableData="tableData"  :columns="columns" emptyText="-" @rowTap="rowTapHandler"></ztable>
			</view>
			<view class="submits jus-b">
				<button type="primary" class="flexc submit-btn" @click="jumpPage" data-key="新增" data-jumpurl="/pages/biosafety/insideInspect/insideInspectNew">新增</button>
			</view>
		</view>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 1">
			<view class="data__wrapper">
				<ztable stickSide stickSide1 :tableData="tableData" :neddCheck="true" :columns="columns" emptyText="-" @rowTap="rowTapHandler1"></ztable>
			</view>
			<view class="submits jus-b">
				<button type="primary" class="flexc submit-btn" @click="jumpPage" data-key="验收" data-jumpurl="/pages/biosafety/insideInspect/insideInspectNew">开始验收</button>
			</view>
		</view>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 2">
			<view class="data__wrapper">
				<ztable stickSide stickSide1 :tableData="tableData"  :columns="columns" emptyText="-" @rowTap="rowTapHandler2"></ztable>
			</view>
		</view>
		
		
	</view>
</template>

<script>
import ztable from '@/components/z-table/z-table'
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import collapse from '@/components/collapse/collapse.vue'
export default {
	components: {
		scrollTab,
		uniIcon,
		collapse,
		ztable
	},
	data() {
		return {
			id: '',
			currentNavIndex: 0,
			columns: [{
				title: "序号",
				key: "index",
				width: 70,
			},{
				title: "耳牌/国际码",
				key: "earno",
				width: 200,
			},{
				title: "性别",
				key: "sex",
				width: 100,
			},{
				title: "品种",
				key: "verty",
				width: 200,
			},{
				title: "最新业务",
				key: "newBusiness",
				width: 200,
			}],
			tableData: [{
				id: '123123123',
				index: 1,
				earno: 'YY002',
				sex: '公',
				verty: '大白',
				newBusiness: '调入记录',
			},{
				id: 'asjkld2',
				index: 2,
				earno: 'YY003',
				sex: '母',
				verty: '大白',
				newBusiness: '配种记录'
			},{
				id: 'zxckmhn21',
				index: 3,
				earno: 'YY004',
				sex: '公',
				verty: '大白',
				newBusiness: '死亡记录'
			},{
				id: 'asjkh2',
				index: 4,
				earno: 'YY005',
				sex: '母',
				verty: '大白',
				newBusiness: '调出记录'
			},{
				id: 'asdokuj12op5',
				index: 5,
				earno: 'YY006',
				sex: '公',
				verty: '大白',
				newBusiness: '分娩记录'
			},{
				id: '123123123',
				index: 1,
				earno: 'YY002',
				sex: '公',
				verty: '大白',
				newBusiness: '调入记录'
			},{
				id: 'asjkld2',
				index: 2,
				earno: 'YY003',
				sex: '母',
				verty: '大白',
				newBusiness: '配种记录'
			},{
				id: 'zxckmhn21',
				index: 3,
				earno: 'YY004',
				sex: '公',
				verty: '大白',
				newBusiness: '死亡记录'
			},{
				id: 'asjkh2',
				index: 4,
				earno: 'YY005',
				sex: '母',
				verty: '大白',
				newBusiness: '调出记录'
			},{
				id: 'asdokuj12op5',
				index: 5,
				earno: 'YY006',
				sex: '公',
				verty: '大白',
				newBusiness: '分娩记录'
			}],
			navList: [{
				name: '验收小组'
			},{
				name: '验收发起'
			},{
				name: '验收报告'
			}]
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
		}
	},
	methods: {
		rowTapHandler (row) {
			console.log(`row click from boarinfo ${JSON.stringify(row)}`)
		},
		rowTapHandler1 (row) {
			console.log(`row click from boarinfo ${JSON.stringify(row)}`)
			uni.navigateTo({
				url: `/pages/biosafety/insideInspect/insideInspectStart?id=${row.id}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		rowTapHandler2 (row) {
			console.log(`row click from boarinfo ${JSON.stringify(row)}`)
			uni.navigateTo({
				url: `/pages/biosafety/insideInspect/insideInspectReport?id=${row.id}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		handOnClickBack() {
			uni.navigateBack({
				
			})
		},
		// filterData(){
		// 	
		// }
	}
}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.main-container{
		padding:20rpx 30rpx;
	}
	.status__bar{
		display: flex;
		flex-direction: column;
		align-items: center;
		.status-header{
			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			padding-left: 3%;
			width: 97%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	.status-search{
		background:#3A75E7 ;
		color: #B2B2B2;
		padding:20rpx 4%;
		.search-wrap{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #FFFFFF;
			height:48rpx;
			padding:0 18rpx;
			.search-wrap-input{
				margin-left: 20rpx;
				.uni-input-placeholder{
					font-size: 28rpx;
				}
			}
		}
	}
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	.datagrid-wrapper{
		padding: 20rpx 20rpx 0;
	}
	//按钮
	.submits {
	    margin-top: 40rpx;
	    margin-bottom: 40rpx;
		padding: 0 20px;
	    button {
	        width: 100%;
	        height: 88rpx;
			font-size: 16px;
			font-family: PingFang SC;
	        &.add-btn {
	            background-color: #F05E57;
	        }
	        &.submit-btn {
	            background-color: #4684EA;
				border-radius: 30px !important;
	        }
			&.other-btn {
				width: 260rpx;
				height: 76rpx;
	            background-color: #EAA346;
				margin-bottom: 134rpx;
	        }
			 &.save-btn{
				 width: 480rpx;
				  background-color: #4684EA;
			 }
	    }
	}
	
</style>
