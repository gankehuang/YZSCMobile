<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="status-header">
				<view class="back__icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png" mode=""></image>
				</view>
				<view class="status__title">
					盘点差异明细
				</view>
			</view>
		</view>
		
		<scrollTab :navList="navList" v-model="currentNavIndex"></scrollTab>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 0">
			<view class="flex page__info">
				<text>共{{pageInfo.total}}条,{{ pageNum }}页</text>
				<text>
					每页{{pageInfo.pageSize}}条
					<image src="../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
				</text>
			</view>
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler"></ztable>
			</view>
			<PageSider :pageNum="pageNum" :currentPage="pageInfo.page"></PageSider>
		</view>
		
		<view class="datagrid-wrapper" v-show="currentNavIndex == 1">
			
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler"></ztable>
			</view>
			<PageSider :pageNum="pageNum" :currentPage="pageInfo.page"></PageSider>
		</view>
		
		<view class="datagrid-wrapper" v-show="currentNavIndex == 2">
			
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler"></ztable>
			</view>
			<PageSider :pageNum="pageNum" :currentPage="pageInfo.page"></PageSider>
		</view>
		
		
		
	</view>
</template>

<script>
	import scrollTab from  '@/components/scroll-tab/scroll-tab'
	import ztable from '@/components/z-table/z-table'
	import PageSider from '@/components/pageSider.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniCell from '@/components/uni-cell/uni-cell.vue'
	export default {
		components: {
			ztable,
			PageSider,
			uniIcon,
			uniCell,
			scrollTab
		},
		data() {
			return {
				id:"",
				currentNavIndex: 0,
				navList: [{
					name: '状态差异'
				},{
					name: '栏位差异'
				},{
					name: '胎次差异'
				},{
					name: '业务日期差异'
				},{
					name: '存栏差异'
				}],
				array: ['一分厂配怀舍8栋', '样品', '巴西', '日本'],
				index:0,
				form: {
					name:'一分场',
					projectName:'自动带出',
				},
				columns: [{
					title: "单据编号",
					key: "index",
					width:'200'
				},{
					title: "存栏位置",
					key: "name",
					width:'200'
				},{
					title: "抽检数量",
					key: "specno",
					width:'200'
				},{
					title: "状态差异",
					key: "unit",
					width:'200'
				},{
					title: "栏位差异",
					key: "stockNum",
					width:'200'
				},{
					title: "差异数量",
					key: "diffNum",
					width:'200'
				},{
					title: "库存数量",
					key: "storageNum",
					width:'200'
				},{
					title: "物料基本分类",
					key: "classify",
					width:'200'
				}],
				tableData: [{
						index:'01',
						name: '一分厂怀舍8栋',
						specno:'2019-02-21',
						unit:'件',
						stockNum: '30',
						diffNum: '25',
						storageNum:'55',
						classify:'衣服'
					},{
						index:'02',
						name: '一分厂怀舍8栋',
						specno:'20190902-01',
						unit:'件',
						stockNum: '30',
						diffNum: '25',
						storageNum:'55',
						classify:'衣服'
					},{
						index:'03',
						name: '一分厂怀舍8栋',
						specno:'20190902-01',
						unit:'件',
						stockNum: '30',
						diffNum: '25',
						storageNum:'55',
						classify:'衣服'
					}],
				pageInfo: {
					page: 1,
					pageSize: 50,
					total: 2000,
				}
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			}
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
				}
			}
		}
	}
	
	.card-form{
		margin:30rpx 23rpx 23rpx;
		.input-style {
			color: #B2B2B2;
			text-align: right;
		}
		.input-style .uni-input-wrapper .uni-input-placeholder{
			color: #B2B2B2;
			text-align: right;
			font-size: 28rpx;
		}
		.main-wrap-contetnt-item-field-name{
			line-height: 80rpx;
		}
		.text-red {
		    color: red;
		    margin: 0 10rpx;
		}
	}

	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	.icon-small {
	    width: 25rpx;
	    height: 25rpx;
	}
	
	.picker {
	    display: flex;
		.uni-input{
			padding: 0px;
		}
	    .dextrad-icon {
	        margin-left: 10rpx;
	    }
	}

	.datagrid-wrapper {
		padding: 20rpx 12rpx 0;
	}
</style>
