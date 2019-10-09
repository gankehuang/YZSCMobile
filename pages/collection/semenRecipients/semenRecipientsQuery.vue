<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @tap="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					精液领用历史记录
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
					<view class="search-wrap-qr" @tap="scancode">
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<!-- 列表 -->
		<view class="list">
			<view class="data__wrapper">
				<ztable :tableData="tableData" stickSide stickSide1 :columns="columns" :neddCheck="false" emptyText="-"
				 :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
			</view>
		</view>
		<!-- 加载  -->
		<view class="uni-tab-bar-loading" @click="loadMore()">
			<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>

		<!-- 弹窗 -->
		<popup-layer ref="popupRef1" :direction="'left'" :class='{active:active}'>
			<scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
				<!-- 单据编号 -->
				<draw-cell title="单据编号" required="true">
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请填写" v-model="searchForm.immunePlan" />
					</view>
				</draw-cell>
				<!-- 申请日期 -->
				<draw-cell title="申请日期" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text>{{searchForm.businessStartTime}}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate">
							<text>{{searchForm.businessEndTime}}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<!-- 精液使用时间 -->
				<draw-cell title="精液使用时间" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<!-- 分厂 -->
				<draw-cell title="分厂" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<!-- 耳牌 -->
				<draw-cell title="耳牌" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<!-- 单据状态 -->
				<draw-cell title="单据状态" required="true">
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
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"></mpvue-picker>
		<mpvue-picker :themeColor="themeColor" ref="pigPicker" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>

	</view>

</template>

<script>
	//  加载更多 
	import uniLoadMore from '@/components/uni-load-more.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	//引入时间转换
	import {
		timeFormat
	} from '@/utils/dateUtils.js'
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入下拉框
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import ztable from '@/components/z-table/z-table'

	export default {
		onLoad: function(options) {
			this.active = !this.active
		},
		// 下拉刷新
		onPullDownRefresh() {
			let _this = this;
			let tableData = _this.tableData;
			console.log('下拉刷新');
			setTimeout(function() {


				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 上拉加载
		onReachBottom() {
			this.loadMore()
		},
		data() {
			return {
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
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				deepLength: 1,
				pickerValueDefault: [0],
				themeColor: '#007AFF',
				pickerValueArray: [{
						'value': '1111',
						'label': '上午'
					},
					{
						'value': '1111',
						'label': '中午'
					},
					{
						'value': '1111',
						'label': '下午'
					}
				],
				searchForm: {
					businessStartTime: timeFormat(new Date(), 'yyyy-MM-dd'),
					businessEndTime: timeFormat(new Date(), 'yyyy-MM-dd'),
					immunePlan: '',
					immuneProject: '',
					vaccineName: '',
					recyclingNum: '',
				},
				showRigth: false,
				showLeft: false,
				tableData: [{
						id: '01',
						index: '01',
						sqrq: '四分厂',
						sqfc: '2',
						eph: '2',
						sqfs: '5',
						jysysj: '5'

					},
					{
						id: '01',
						index: '01',
						sqrq: '四分厂',
						sqfc: '2',
						eph: '2',
						sqfs: '5',
						jysysj: '5'

					},
					{
						id: '01',
						index: '01',
						sqrq: '四分厂',
						sqfc: '2',
						eph: '2',
						sqfs: '5',
						jysysj: '5'

					},
					{
						id: '01',
						index: '01',
						sqrq: '四分厂',
						sqfc: '2',
						eph: '2',
						sqfs: '5',
						jysysj: '5'
					},
				],
				columns: [{
						title: "序号",
						key: "index",
						width: 70,
					}, {
						title: "申请日期",
						key: "sqrq",
						width: 150,
					}, {
						title: "申请分厂",
						key: "sqfc",
						width: 150,
					}, {
						title: "耳牌号",
						key: "eph",
						width: 150,
					}, {
						title: "申请份数",
						key: "sqfs",
						width: 150,
					}, {
						title: "精液使用时间",
						key: "jysysj",
						width: 150,
					}
				],
			}
		},
		components: {
			ztable,
			popupLayer,
			drawCell,
			mpvuePicker,
			uniIcon,
			uniLoadMore
		},

		methods: {
			// 滑动底部加载
			loadMore() {
				let _this = this;
				let tableData = _this.tableData;
				_this.loadingType = 1;
				setTimeout(() => {
					let li = [{
							id: '01',
							index: '01',
							sqrq: '四分厂',
							sqfc: '2',
							eph: '2',
							sqfs: '5',
							jysysj: '5'

						},
						{
							id: '01',
							index: '01',
							sqrq: '四分厂',
							sqfc: '2',
							eph: '2',
							sqfs: '5',
							jysysj: '5'

						},
						{
							id: '01',
							index: '01',
							sqrq: '四分厂',
							sqfc: '2',
							eph: '2',
							sqfs: '5',
							jysysj: '5'

						},
						{
							id: '01',
							index: '01',
							sqrq: '四分厂',
							sqfc: '2',
							eph: '2',
							sqfs: '5',
							jysysj: '5'

						},
					];

					tableData.push(...li);
				}, 300);
				setTimeout(() => {
					_this.loadingType = 0;
				}, 500);
			},
			onConfirmPig() {},
			selectDate() {
				this.$refs.mpvuePicker.show()
			},
			// 重置 
			reset() {
				this.searchForm.immunePlan = ''
				this.searchForm.immuneProject = ''
				this.searchForm.vaccineName = ''
				this.searchForm.recyclingNum = ''

			},
			// 查询 
			find() {
				this.$refs.popupRef1.close() // 关闭弹窗  
			},
			selectPeople() { // 下拉菜单 
				this.$refs.pigPicker.show()
			},
			showFilter() {
				this.$refs.popupRef1.show();
			},
			rowTapHandler(row) {
				uni.navigateTo({
					url: `/pages/collection/semenRecipients/semenRecipientsDetail?id=${row.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
		bottom: -40rpx;
		left: 0;
		width: 100%;

		.flexc {
			width: 50%;
			height: 86rpx;

			&.reset-btn {
				background-color: #FFFFFF;
				border-top: 2px solid #F5F5F5;
			}

			&.submit-btn {
				border-top: 2px solid #4684EA;
				background-color: #4684EA;
				color: #FFFFFF;
			}
		}
	}
</style>
