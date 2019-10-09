<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					发情记录查询
				</view>
				<view class="more-icon flexc ali-c" @tap="showFilter">
					<image class="icon" src="/static/assets/more@2x.png"></image>
				</view>
			</view>
			<!-- 搜索框 -->
			<view class="status-search">
				<view class="search-wrap">
					<view class="search-wrap-search">
						<image class="icon" src="/static/assets/search@2x.png" mode=""></image>
					</view>
					<view class="search-wrap-input">
						<input type="text" value="" placeholder="请输入筛选条件" />
					</view>
					<view class="search-wrap-qr" @click="scancode">
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<!-- 列表 -->
		<view class="list">
			<view class="data__wrapper">
				<ztable stickSide stickSide1 :tableData="tableData" :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
			</view>
			<!-- 加载更多  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		
		<!-- 弹窗 -->
		<popup-layer ref="popupRef1" :direction="'left'" :class='{active:active}'>
		    <scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
			    <!-- 发情日期 -->
		        <draw-cell title="发情日期" required="true">
				    <view slot="value" class="bg-gray jus-j" @click="selectDate">
						<text>{{searchForm.businessStartTime}}</text>
						<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
					</view>
			   </draw-cell>
			   <!-- 诱情人员 -->
			   <draw-cell title="诱情人员"  required="true">
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请填写" v-model="searchForm.immunePlan" />
					</view>
			   </draw-cell>
			   <!-- 诱情公猪 -->
			   <draw-cell title="诱情公猪"  required="true">
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请填写" v-model="searchForm.immuneProject" />
					</view>
			   </draw-cell>
			   <!-- 提交人 -->
			   <draw-cell title="提交人" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" /> 
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
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';  //  加载更多
	//引入时间转换
	import {timeFormat} from '@/utils/dateUtils.js'
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入下拉框
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	export default {
		data() {
			return {
				showDrawer: false,
				tableData: [{
						id: '01',
						index: '01',
						fmrq: '上午',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y001',
					}, {
						id: '02',
						index: '02',
						fmrq: '上午',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y002'
					}, {
						id: '03',
						index: '03',
						fmrq: '上午',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y003'
					}, {
						id: '04',
						index: '04',
						fmrq: '上午',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y004'
					}, {
						id: '05',
						index: '05',
						fmrq: '20190901',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y005'
				}],
				columns: [{
						title: "序号",
						key: "index",
						width: 70,
					}, {
						title: "母猪耳牌",
						key: "fmrq",
						width: 200,
					}, {
						title: "第一次发情时间",
						key: "zzzrpc",
						width: 220,
					}, {
						title: "第二次发情时间",
						key: "mzzyzw",
						width: 220,
					},
					{
						title: "第三次发情时间",
						key: "sowcard",
						width: 200,
					}, 
				],
				status: 'more',
				loadingType: 0, // 加载更多状态
				deepLength:1,
				pickerValueDefault: [0],
				themeColor: '#007AFF',
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				searchForm:{
					businessStartTime:timeFormat(new Date(),'yyyy-MM-dd'),
					businessEndTime:timeFormat(new Date(),'yyyy-MM-dd'),
					immunePlan:'',
					immuneProject:'',
					vaccineName:'',
					recyclingNum:'',
				},
				pickerValueArray:[
					{'value':'1111','label':'三泉A区'},
					{'value':'1111','label':'三泉B区'},
					{'value':'1111','label':'三泉C区'},
					{'value':'1111','label':'三泉D区'},
					{'value':'1111','label':'三泉E区'}
				],
			}
		},
		components: {
			ztable,
			popupLayer,
			uniLoadMore,
			drawCell,
			uniIcon,
			mpvuePicker
		},
		onLoad() {},
		// 下拉刷新
		onPullDownRefresh() {
			let _this = this;
			let tableData = _this.tableData;
			console.log('下拉刷新');
			setTimeout(function() {
				tableData.splice(5)
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载数据
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			selectDate(){ // 下拉菜单 
				this.$refs.pigPicker.show()
			},
			rowTapHandler(row) {
				uni.navigateTo({
					url: `/pages/dataCollection/ruttingRecord/ruttingAudit?id=${row.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			showFilter() {
				this.$refs.popupRef1.show();
			},
			closeDrawer() {
			},
			// 滑动底部加载
			loadMore() {
				let _this = this;
				let tableData = _this.tableData;
				_this.loadingType = 1;
				setTimeout(() => {
					let getData = [
						{
							id: '03',
							index: '03',
							fmrq: '上午',
							zzzrpc: '2',
							mzzyzw: 'xxx',
							sowcard: 'Y003'
						}, {
							id: '04',
							index: '04',
							fmrq: '上午',
							zzzrpc: '2',
							mzzyzw: 'xxx',
							sowcard: 'Y004'
						}, {
							id: '05',
							index: '05',
							fmrq: '20190901',
							zzzrpc: '2',
							mzzyzw: 'xxx',
							sowcard: 'Y005'
						}
					];
					let newData = tableData.concat(getData);
					_this.tableData = newData;
				}, 300);
				
				setTimeout(() => {
					_this.loadingType = 0;
				}, 500);
			},
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

	.status {
		z-index: 99999;
	}

	.status-search {

		.search-wrap-qr,
		.search-wrap-search {
			width: 10%;
			display: flex;
			align-items: center;
			margin: 0 15rpx;
		}

		.search-wrap-input {
			width: 80%;
			text-align: left;
		}
	}//抽屉样式
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
</style>
