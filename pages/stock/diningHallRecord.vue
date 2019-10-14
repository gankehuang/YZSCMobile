<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="status-header">
				<view class="back__icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png" mode=""></image>
				</view>
				<view class="status__title">
					盘点记录
				</view>
				<view class="right__icon" @tap="filterData">
					筛选
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
						<input type="text" value="" placeholder="仓库/日期/单据号" />
					</view>
				</view>
			</view>
		</view>
		<view class="flex page__info">
			<text>共{{pageInfo.total}}条,{{ pageNum }}页</text>
			<text>
				每页{{pageInfo.pageSize}}条
				<image src="../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</text>
		</view>
		<view class="list">
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler"></ztable>				
			</view>
			<!-- 加载更多  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import ztable from '@/components/z-table/z-table'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniLoadMore from '@/components/uni-load-more.vue'
	export default {
		components: {
			ztable,
			uniIcon,
			uniLoadMore
		},
		data() {
			return {
				id:"",
				columns: [{
					title: "序号",
					key: "index",
					width:'100'
				},{
					title: "食材名称",
					key: "name",
					width:'200'
				},{
					title: "盘点数量",
					key: "stockNum",
					width:'200'
				},{
					title: "类别",
					key: "classify",
					width:'200'
				},{
					title: "计量单位",
					key: "unit",
					width:'200'
				}],
				tableData: [{
						index:'01',
						name: '毛巾',
						stockNum: '30',
						classify:'衣服',
						unit:'件'
					},{
						index:'02',
						name: '衣服',
						stockNum: '30',
						classify:'衣服',
						unit:'件'
					},{
						index:'03',
						name: '裤子',
						stockNum: '30',
						classify:'衣服',
						unit:'件'
					}],
				pageInfo: {
					page: 1,
					pageSize: 50,
					total: 2000,
				},
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
			console.log("idvalue"+option.id);
			if (option.id) {
				this.id = option.id
			}
		},
		methods: {
			handOnClickBack() {
				uni.navigateBack({})
			},
			// 滑动底部加载
			loadMore() {
				let _this = this;
				let tableData = _this.tableData;
				_this.loadingType = 1;
				setTimeout(() => {
					let getData = [
						{
							index:'03',
							name: '裤子',
							stockNum: '30',
							classify:'衣服',
							unit:'件'
						},
						{
							index:'04',
							name: '毛巾',
							stockNum: '30',
							classify:'衣服',
							unit:'件'
						},
						{
							index:'05',
							name: '毛巾',
							stockNum: '30',
							classify:'衣服',
							unit:'件'
						},
					];
					let newData = tableData.concat(getData);
					_this.tableData = newData;
				}, 300);
				
				setTimeout(() => {
					_this.loadingType = 0;
				}, 500);
			},
		},
		computed: {
			pageNum () {
				return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	
	.flex{
		display: flex;
		flex-flow: row nowrap;
		padding: 0 15px 10px 15px;
	}
	.page-wrapper{
		padding-top: 65px;
	}
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	.page__info{
		align-items: center;
		font-size: 12px;
		justify-content: space-between;
		margin: 10px 0 0;
		font-family: PingFang SC;
	}
	.data__wrapper{
		padding: 0 10rpx;
	}

	.status__bar {
		display: flex;
		flex-direction: column;
		align-items: center;

		.status-header {
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

	.main-container {
		padding: 20rpx 30rpx;

		.list {
			margin-bottom: 30rpx;
		}

		.detail-item {
			background: #FFFFFF;
			border-radius: 8rpx;
			padding: 26rpx 20rpx 10rpx;

			.detail-header {
				font-size: 28rpx;
				color: #333333;

				.colorBlock {
					background: #3A75E7;
					width: 5rpx;
					height: 18rpx;
					display: inline-block;
					margin-right: 10rpx;
				}
			}

			.detail-body {
				.detail-row {
					padding: 14rpx 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					border-bottom: 1px solid #CBCBCB;

					&:last-child {
						border-bottom: none;
					}

					.detail-row-item {
						width: 25%;
						text-align: center;

						.num {
							color: #333333;
							font-weight: bold;
							font-size: 36rpx;
						}

						,
						.title {
							color: #999999;
							font-size: 24rpx;
						}
					}

					text {
						display: block;
						text-align: center;
					}
				}
			}
		}
	}

	.status-search {
		background: #3A75E7;
		color: #B2B2B2;
		padding: 20rpx 4%;

		.search-wrap {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #FFFFFF;
			height: 48rpx;
			padding: 0 18rpx;

			.search-wrap-input {
				margin-left: 20rpx;

				.uni-input-placeholder {
					font-size: 28rpx;
					color: #B2B2B2;
					font-family: PingFang SC;
				}
			}
		}
	}

	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}

	.datagrid-wrapper {
		padding: 20rpx 12rpx 0;
	}
</style>
