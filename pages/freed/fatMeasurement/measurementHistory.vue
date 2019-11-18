<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="status-header">
				<view class="back__icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png" mode=""></image>
				</view>
				<view class="status__title" style="padding-right: 40rpx;">
					批次日龄调整记录
				</view>
				<view class="right__icon" @tap="filterData">
					<image class="icon" src="/static/assets/more@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="header-wrap">
			<view class="status-search">
				<view class="search-wrap">
					<view class="search-wrap-search">
						<uni-icon type="search" color="#CACFD9"></uni-icon>
					</view>
					<view class="search-wrap-input">
						<input type="text" value="" placeholder="请输入筛选条件" />
					</view>
				</view>
			</view>
		</view>
		<!-- 选页信息 -->
		<view class="page-info">
			<text>共2000条,50页</text>
			<view>
				<text style="font-size: 24rpx;">每页50条</text>
				<image src="../../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</view>
		</view>
		<!-- 数据列表 -->
		<view class="list">
			<view class="data__wrapper">
				<ztable :tableData="tableData" stickSide stickSide1 :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniCell from '@/components/uni-cell/uni-cell.vue';
// 引入 表格
import ztable from '@/components/z-table/z-table.vue';

export default {
	components: {
		uniCell,
		ztable,
		uniIcon
	},
	data() {
		return {
			tableData: [
				{
					index: 'ZZPDD-01',
					plan: '怀孕',
					vaccineName: '28',
					computerStart: '15-17',
					performMan: '张三'
				},
				{
					index: '02',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '03',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '04',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '05',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				}
			],
			columns: [
				{
					title: '耳牌号',
					key: 'index',
					width: '200'
				},
				{
					title: '状态',
					key: 'plan',
					width: '200'
				},
				{
					title: '天数',
					key: 'vaccineName',
					width: '200'
				},
				{
					title: '标准背膘',
					key: 'computerStart',
					width: '200'
				}
			]
		};
	},
	methods: {
		scancode1() {
			this.scancode();
			setTimeout(() => {
				this.togglePopup('middle');
			}, 500);
		}
	},
	computed: {
		pageNum() {
			return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize);
		}
	},
	onReady() {
	    this.pageSiderPosition();
	}
};
</script>

<style lang="scss">
@import "@/common/baseInfo.scss";
//@import '../../../common/dataCollection.scss';

.status__bar{
		display: flex;
		flex-direction: column;
		align-items: center;
		.status-header{
			position: absolute;
			top: 42%;
			left: 0;
			right: 0;
			padding-left: 40rpx;
			width: 95%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.right__icon .icon {
			    width: 7rpx;
			    height: 36rpx;
			}
		}
	}
	.status-search{
		background:#3A75E7 ;
		color: #B2B2B2;
		padding:20rpx 4%;
		.search-wrap {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #ffffff;
			height: 60rpx;
			padding: 0 18rpx;
			border-radius: 12rpx;
			.uni-icon-search {
				line-height: 25px;
			}
			.search-wrap-input {
				width: 90%;
				margin-left: 20rpx;
				text-align: left;
				.uni-input-placeholder {
					font-size: 28rpx;
				}
			}
		}
	}

.page-info {
	display: flex;
	height: 60rpx;
	align-items: center;
	font-size: 24rpx;
	justify-content: space-between;
	color: #7a7a7a;
	padding: 0 20rpx;
	image {
		height: 16rpx;
		width: 16rpx;
	}
}
.list {
	padding-top: 0;

	.data__wrapper {
		padding: 0 20rpx;
	}
}
</style>
