<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				配种批次
			</view>
			<view class="right__icon">
				<image @click="qr1" style="margin: 0;" src="../../../static/assets/scan.png" mode="" class="icon"></image>
				<image style="margin-left:25px ;" src="../../../static/assets/search.png" @tap="showFilter" mode="" class="icon"></image>
			</view>
		</view>
	
		<!-- 表格  -->
		<view class="data__wrapper">
			<ztable stickSide stickSide1 :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler"></ztable>
		</view>
		<!-- 加载  -->
		<view class="uni-tab-bar-loading" @click="loadMore()">
			<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
		<!-- 弹窗  -->
		<popup-layer ref="popupRef1" :direction="'left'" :class='{active:active}'>
		   <scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
			  <draw-cell title="批次号" >
				<view slot="value" class="bg-gray jus-j" @click="selectBatch">
					<image @click.stop="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image>
					<input type="text" disabled="true" placeholder="请选择批次号" v-model="searchForm.batchNum.name"/>
					<uni-icon type="arrowright" color="#333333" size="18" />
				</view>
			  </draw-cell>
			  <draw-cell title="栋舍"  >
				<view slot="value" class="bg-gray jus-j" @click="''">
					<text></text>
					<input type="text" disabled="true" placeholder="请填写栋舍"/>
					<uni-icon type="arrowright" color="#333333" size="18" />
				</view>
			  </draw-cell>
		   </scroll-view>
		   <view class="submits jus-b">
			   <view class="flexc reset-btn" @click="reset">重置</view>
			   <view class="flexc submit-btn" @click="find">确定</view>
		   </view>
		</popup-layer>
		<!-- 下拉菜单  -->
		<mpvue-picker :themeColor="themeColor" ref="batchPicker" 
		:deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirmBatch" :pickerValueArray="batchNumArr"></mpvue-picker>
	<!-- 	<pageSider :pageNum="pageNum" :currentPage="pageInfo.page" ></pageSider> -->
	</view>
</template>

<script>
	//引入时间转换
	import { timeFormat } from '@/utils/dateUtils.js';
	//加载更多 
	import uniLoadMore from '@/components/uni-load-more.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入下拉框
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	//引入列表组件
	import ztable from '@/components/z-table/z-table';
	import pageSider from '@/components/pageSider.vue';
	//引入通用请求接口
	import common from '../../../utils/common.js';
	export default {
		components: {
			popupLayer,
			drawCell,
			mpvuePicker,
			ztable,
			pageSider,
			uniIcon,
			uniLoadMore
		},
		onLoad: function(options) {
			this.active = !this.active;
			this.getindex(1, 10, false);
			this.searchTab();
		},
		// 下拉刷新
		onPullDownRefresh() {
			let _this = this;
			let tableData = _this.tableData;
			console.log('下拉刷新');
			this.getindex(1, 10, false);
			setTimeout(function() {
				tableData.splice(5);
				uni.stopPullDownRefresh();
			}, 1000);
		},
   // 上拉加载
		onReachBottom() {
			this.loadMore()
		},
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				
				idNum: 0,
				active: true, 
				status: 'more',
				statusTypes: [{
					value: 'more',
					text: '加载前'
				}, {
					value: 'loading',
					text: '加载中'
				}, {
					value: 'noMore',
					text: '没有更多'
				}],
				pickerValueDefault: [0],
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				
				// 查询框数据
				//批次号选择
				batchNumArr:[],
				
				// 选项框默认值 
				searchForm:{
					batchNum: {
						name: '',
						id: ''
					}
				},
				tableData: [],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				},{
					title: "配种批次号",
					key: "batchNum",
					width: 200,
				},{
					title: "当前存栏",
					key: "currentNum",
					width: 150,
				},{
					title: "累计死淘",
					key: "totalElimination",
					width: 150,
				},{
					title: "平均配种时间",
					key: "avgBreedTime",
					width: 200,
				}]
			}
		},
		methods: {
			//获取列表数据
			getindex(pageNum, pageSize, isLoad, data) {
				var _this = this;
				let headers = {};
				//headers['content-type'] = 'application/json';
				let params = {
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
				};
				if (data) {
					params = { ...params, ...data };
				}
				//console.log('开始获取列表数据');
				common.commRequest(`/PigBreedingBatch/selectPigBreedingBatch/${pageNum}/${pageSize}`, params, headers, 'get', function(data) {
					let getData = data.data.list;
					//console.log(JSON.stringify(getData));
					if (isLoad) {
						let oldData = _this.tableData;
						let loadData = [];
						if (getData.length == 0) {
							_this.loadingType = 2;
							return;
						}
						for (var i = 0; i < getData.length; i++) {
							loadData.push({
								id: getData[i].fid, // fid
								index: ++_this.idNum, // 序号
								batchNum: getData[i].fnumber ? getData[i].fnumber : '-', // 配种批次号
								currentNum: getData[i].cfcurrqty != null ? getData[i].cfcurrqty : '-', //当前存栏
								totalElimination: getData[i].swttcount != null ? getData[i].swttcount : '-', //累计死淘数
								avgBreedTime: getData[i].cfavgbreeddate != null ? timeFormat(getData[i].cfavgbreeddate, 'yyyy-MM-dd') : '-'//平均配种时间
							});
						}
						_this.tableData = loadData;
						console.log(loadData);
						uni.stopPullDownRefresh();
					} else {
						for (var i = 0; i < getData.length; i++) {
							_this.tableData.push({
								id: getData[i].fid, // fid
								index: ++_this.idNum, // 序号
								batchNum: getData[i].fnumber ? getData[i].fnumber : '-', // 配种批次号
								currentNum: getData[i].cfcurrqty != null ? getData[i].cfcurrqty : '-', //当前存栏
								totalElimination: getData[i].swttcount != null ? getData[i].swttcount : '-', //累计死淘数
								avgBreedTime: getData[i].cfavgbreeddate != null ? timeFormat(getData[i].cfavgbreeddate, 'yyyy-MM-dd') : '-'//平均配种时间
							});
						}
					}
					_this.loadingType = 0;
				});
			},
			
			// 查询栏
			searchTab() {
				var _this = this;
				let headers = {};
				headers['content-type'] = 'application/json';
				let params = {
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
				};
				// 配种批次
				let batchNumPicker = [];
				common.commRequest(`/PigBreedingBatch/selectPcList/10000/1`, params, headers, 'get', function(data) {
					let getData = data.data.list;
					console.log(JSON.stringify(getData));
					for (let i = 0; i < getData.length; i++) {
						batchNumPicker.push({
							value: getData[i].fid,
							label: getData[i].fnumber
						});
					}
					_this.batchNumArr = batchNumPicker;
					// console.log(JSON.stringify(_this.batchNumArr));
				});
			},
			
			qr(){
				this.scancode()
			},
			qr1(){
				this.scancode()
			},
			// 重置 
			reset(){
				this.searchForm.batchNum.name = '';
				this.searchForm.batchNum. id = '';
			},
			// 查询 
			find(){
				this.$refs.popupRef1.close() // 关闭弹窗  
			},
			// 滑动底部加载
			loadMore() {
				let _this = this;
				_this.loadingType = 1;
				this.getindex(++this.pageNum, this.pageSize, false);
			},
			
			//
			showFilter(){
				this.$refs.popupRef1.show();
			},
			//选择批次号
			selectBatch(){
				this.$refs.batchPicker.show()
			},
			onConfirmBatch(e){
				// 批次号
				//console.log(e);
				const _this = this;
				_this.searchForm.batchNum.name = e.label;
				_this.searchForm.batchNum.id = e.value[0];
			},
			
			
			rowTapHandler (row) {
				uni.navigateTo({
					url: `/pages/archives/matingBatch/matingDetail/matingDetail?id=${row.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
	@import "../../../common/dataCollection.scss";
	//抽屉样式
	.draw{
		padding:30rpx;
		width: 500rpx;
		height:calc(100% - 118rpx);
		.bg-gray{
			background: #f5f5f5;
			padding:16rpx 20rpx;
			font-size:12px;
			color: #4d4d4d;
		}
	}
	.submits {
		position:fixed;
		bottom:-40rpx;
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
	.submitData{
		margin-top:32rpx;
		.cancel-btn {
			width: 316rpx;
			background-color: #F05E57;
			color: #FFFFFF;
		}
		.submit-btn {
			width: 316rpx;
			background-color: #4684EA;
			color: #FFFFFF;
		}
	}
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
	
</style>
