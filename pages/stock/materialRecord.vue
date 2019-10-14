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
		
		<!-- 弹窗 -->
		<popup-layer ref="popupFilter" :direction="'left'">
			<scroll-view scroll-y="true" class="draw" style="padding-top: 65px;">
				<draw-cell title="盘点日期" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text>{{searchForm.businessStartTime}}</text>
							<image src="../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate">
							<text>{{searchForm.businessEndTime}}</text>
							<image src="../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<draw-cell title="盘点时间" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectTime">
						<picker :range="array" @change="bindPickerChange" :value="index">
							<view class="picker">
								<view>{{array[index]}}</view>
							</view>
						</picker>
					</view>
				</draw-cell>
				<draw-cell title="盘点仓库" required="true">
					<view class="bg-gray jus-j" slot="value">
						<text>{{searchForm.specno}}</text>
					</view>
				</draw-cell>
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<mpvue-picker :themeColor="themeColor"  ref="pigPicker" 
		:deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import ztable from '@/components/z-table/z-table'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uniLoadMore from '@/components/uni-load-more.vue'
	import popupLayer from '@/components/popup/popup-layer.vue';
	//引入下拉框
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入时间转换
	import {timeFormat} from '@/utils/dateUtils.js'
	export default {
		components: {
			ztable,
			uniIcon,
			popupLayer,
			drawCell,
			mpvuePicker,
			uniLoadMore
		},
		data() {
			return {
				id:"",
				columns: [{
					title: "单据编号",
					key: "index",
					width:'112'
				},{
					title: "盘点日期",
					key: "name",
					width:'200'
				},{
					title: "仓库",
					key: "specno",
					width:'200'
				},{
					title: "药品名称",
					key: "unit",
					width:'200'
				},{
					title: "盘点数量",
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
						name: '毛巾',
						specno:'2019-02-21',
						unit:'件',
						stockNum: '30',
						diffNum: '25',
						storageNum:'55',
						classify:'衣服'
					},{
						index:'02',
						name: '衣服',
						specno:'20190902-01',
						unit:'件',
						stockNum: '30',
						diffNum: '25',
						storageNum:'55',
						classify:'衣服'
					},{
						index:'03',
						name: '裤子',
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
				},
				searchForm:{
					businessStartTime:timeFormat(new Date(),'yyyy-MM-dd'),
					businessEndTime:timeFormat(new Date(),'yyyy-MM-dd'),
					bussinessTime:'',
					specno: ''
				},
				index: 0,
				array: ['请选择配种时段', '1', '2', '3'],
				status: 'more',
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				deepLength:1,
				pickerValueDefault: [0],
				themeColor: '#007AFF',
				pickerValueArray:[
					{'value':'1111','label':'三泉A区'},
					{'value':'1111','label':'三泉B区'},
					{'value':'1111','label':'三泉C区'},
					{'value':'1111','label':'三泉D区'},
					{'value':'1111','label':'三泉E区'}
				],
			};
		},
		onLoad(option) {
			// console.log("idvalue"+option.id);
			if (option.id) {
				this.id = option.id
			}
		},
		methods: {
			// handOnClickBack() {
			// 	uni.navigateBack({})
			// },
			rowTapHandler(row){
				uni.navigateTo({
					url:`/pages/stock/materialDetail?id=${this.id}`,
					success: res =>{},
					fail: () => {},
					complete: () => {}
				})
			},
			filterData(){
				this.$refs.popupFilter.show();
			},
			selectDate(){
				this.$refs.pigPicker.show();
			},
			// 滑动底部加载
			loadMore() {
				let _this = this;
				let tableData = _this.tableData;
				_this.loadingType = 1;
				setTimeout(() => {
					let getData = [
						{
							index:'01',
							name: '毛巾',
							specno:'2019-02-21',
							unit:'件',
							stockNum: '30',
							diffNum: '25',
							storageNum:'55',
							classify:'衣服'
						}, {
							index:'01',
							name: '毛巾',
							specno:'2019-02-21',
							unit:'件',
							stockNum: '30',
							diffNum: '25',
							storageNum:'55',
							classify:'衣服'
						}, {
							index:'01',
							name: '毛巾',
							specno:'2019-02-21',
							unit:'件',
							stockNum: '30',
							diffNum: '25',
							storageNum:'55',
							classify:'衣服'
						}
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
		color: #B2B2B2;
	}
	.data__wrapper{
		padding: 0 10rpx;
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
			min-height: 28rpx;
		}
	}
	.submits {
		position:fixed;
		bottom:0rpx;
		left:0;
		width:100%;
		.flexc {
			width:50%;
			height:86rpx;
			&.reset-btn {
				background-color: #FFFFFF;
				border-top:2px solid #F5F5F5;
			}
			&.submit-btn {
				border-top:2px solid #4684EA;
				background-color: #4684EA;
				color: #FFFFFF;
			}
		}
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
