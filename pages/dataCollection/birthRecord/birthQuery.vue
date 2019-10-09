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
					分娩记录查询
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
				<ztable :tableData="tableData" :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
			</view>
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		
		<!-- 弹窗 -->
		<popup-layer ref="popupRef1" :direction="'left'" :class='{active:active}'>
		    <scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
			   <!-- 耳牌号 -->
			   <draw-cell title="公猪耳牌"  required="true">
					<view slot="value" class="bg-gray jus-j">
						<image @click="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image>
						<input type="text" placeholder="请填写" v-model="searchForm.immuneProject" />
					</view>
			   </draw-cell>
			   <!-- 合格公 -->
			   <draw-cell title="合格公"  required="true">
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请填写" v-model="searchForm.immunePlan" />
					</view>
			   </draw-cell>
			   <!-- 合格母 -->
			   <draw-cell title="合格母" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" /> 
					</view>
			    </draw-cell>
			   <!-- 畸形数 -->
			   <draw-cell title="畸形数"  required="true">
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请填写" v-model="searchForm.immunePlan" />
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
				status: 'more',
				loadingType: 0, // 加载更多状态
				
				showDrawer: false,
				tableData: [{
						id: '01',
						index: '01',
						fmrq: '上午',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y001',
						hgg: 'xx',
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
						zzs: 'xx',
						wh: 'xx',
						wz: 'xx',
						wjz: 'xx',
						syy: 'xxx',
						jcr: 'xxx',
						tjr: 'xxx',
						tjsj: 'xxxx'
					}, {
						id: '02',
						index: '02',
						fmrq: '上午',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y002',
						hgg: 'xx',
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
						zzs: 'xx',
						wh: 'xx',
						wz: 'xx',
						wjz: 'xx',
						syy: 'xxx',
						jcr: 'xxx',
						tjr: 'xxx',
						tjsj: 'xxxx'
					}, {
						id: '03',
						index: '03',
						fmrq: '上午',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y003',
						hgg: 'xx',
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
						zzs: 'xx',
						wh: 'xx',
						wz: 'xx',
						wjz: 'xx',
						syy: 'xxx',
						jcr: 'xxx',
						tjr: 'xxx',
						tjsj: 'xxxx'
					}, {
						id: '04',
						index: '04',
						fmrq: '上午',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y004',
						hgg: 'xx',
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
						zzs: 'xx',
						wh: 'xx',
						wz: 'xx',
						wjz: 'xx',
						syy: 'xxx',
						jcr: 'xxx',
						tjr: 'xxx',
						tjsj: 'xxxx'
					}, {
						id: '05',
						index: '05',
						fmrq: '上午',
						zzzrpc: '2',
						mzzyzw: 'xxx',
						sowcard: 'Y005',
						hgg: 'xx',
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
						zzs: 'xx',
						wh: 'xx',
						wz: 'xx',
						wjz: 'xx',
						syy: 'xxx',
						jcr: 'xxx',
						tjr: 'xxx',
						tjsj: 'xxxx'
				}],
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				columns: [{
						title: "序号",
						key: "index",
						width: 70,
					}, {
						title: "分娩日期",
						key: "fmrq",
						width: 150,
					}, {
						title: "仔猪转入批次",
						key: "zzzrpc",
						width: 200,
					}, {
						title: "母猪转入位置",
						key: "mzzyzw",
						width: 200,
					},
					{
						title: "母猪耳牌",
						key: "sowcard",
						width: 150,
					}, {
						title: "合格公",
						key: "hgg",
						width: 100,
					}, {
						title: "合格母",
						key: "hgm",
						width: 100,
					}, {
						title: "弱仔数",
						key: "rzs",
						width: 100,
					}, {
						title: "畸形数",
						key: "qxs",
						width: 100,
					}, {
						title: "木乃伊",
						key: "mny",
						width: 100,
					}, {
						title: "死胎数",
						key: "sts",
						width: 100,
					}, {
						title: "活仔数",
						key: "hts",
						width: 100,
					}, {
						title: "总仔数",
						key: "zzs",
						width: 100,
					}, {
						title: "窝号",
						key: "wh",
						width: 100,
					}, {
						title: "窝重",
						key: "wz",
						width: 100,
					}, {
						title: "窝均重",
						key: "wjz",
						width: 100,
					}, {
						title: "饲养员",
						key: "syy",
						width: 100,
					}, {
						title: "接产人",
						key: "jcr",
						width: 100,
					}, {
						title: "提交人",
						key: "tjr",
						width: 100,
					}, {
						title: "提交时间",
						key: "tjsj",
						width: 100,
					}
				],
				searchForm:{
					businessStartTime:timeFormat(new Date(),'yyyy-MM-dd'),
					businessEndTime:timeFormat(new Date(),'yyyy-MM-dd'),
					immunePlan:'',
					immuneProject:'',
					vaccineName:'',
					recyclingNum:'',
				},
				pickerValueArray:[
					{'value':'1111','label':'1'},
					{'value':'1111','label':'2'},
					{'value':'1111','label':'3'},
					{'value':'1111','label':'4'},
					{'value':'1111','label':'5'}
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
			rowTapHandler(row) {
				uni.navigateTo({
					url: `/pages/dataCollection/birthRecord/birthAudit?id=${row.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			showFilter() {
				this.$refs.popupRef1.show();
			},
			selectPeople(){ // 下拉菜单 
				this.$refs.pigPicker.show()
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
							id: '01',
							index: '01',
							fmrq: '上午',
							zzzrpc: '2',
							mzzyzw: 'xxx',
							sowcard: 'Y001',
							hgg: 'xx',
							hgm: 'xx',
							rzs: 'xx',
							qxs: 'xx',
							mny: 'xx',
							sts: 'xx',
							hts: 'xx',
							zzs: 'xx',
							wh: 'xx',
							wz: 'xx',
							wjz: 'xx',
							syy: 'xxx',
							jcr: 'xxx',
							tjr: 'xxx',
							tjsj: 'xxxx'
						}, {
							id: '01',
							index: '01',
							fmrq: '上午',
							zzzrpc: '2',
							mzzyzw: 'xxx',
							sowcard: 'Y001',
							hgg: 'xx',
							hgm: 'xx',
							rzs: 'xx',
							qxs: 'xx',
							mny: 'xx',
							sts: 'xx',
							hts: 'xx',
							zzs: 'xx',
							wh: 'xx',
							wz: 'xx',
							wjz: 'xx',
							syy: 'xxx',
							jcr: 'xxx',
							tjr: 'xxx',
							tjsj: 'xxxx'
						}, {
							id: '01',
							index: '01',
							fmrq: '上午',
							zzzrpc: '2',
							mzzyzw: 'xxx',
							sowcard: 'Y001',
							hgg: 'xx',
							hgm: 'xx',
							rzs: 'xx',
							qxs: 'xx',
							mny: 'xx',
							sts: 'xx',
							hts: 'xx',
							zzs: 'xx',
							wh: 'xx',
							wz: 'xx',
							wjz: 'xx',
							syy: 'xxx',
							jcr: 'xxx',
							tjr: 'xxx',
							tjsj: 'xxxx'
						}, {
							id: '01',
							index: '01',
							fmrq: '上午',
							zzzrpc: '2',
							mzzyzw: 'xxx',
							sowcard: 'Y001',
							hgg: 'xx',
							hgm: 'xx',
							rzs: 'xx',
							qxs: 'xx',
							mny: 'xx',
							sts: 'xx',
							hts: 'xx',
							zzs: 'xx',
							wh: 'xx',
							wz: 'xx',
							wjz: 'xx',
							syy: 'xxx',
							jcr: 'xxx',
							tjr: 'xxx',
							tjsj: 'xxxx'
						}, {
							id: '01',
							index: '01',
							fmrq: '上午',
							zzzrpc: '2',
							mzzyzw: 'xxx',
							sowcard: 'Y001',
							hgg: 'xx',
							hgm: 'xx',
							rzs: 'xx',
							qxs: 'xx',
							mny: 'xx',
							sts: 'xx',
							hts: 'xx',
							zzs: 'xx',
							wh: 'xx',
							wz: 'xx',
							wjz: 'xx',
							syy: 'xxx',
							jcr: 'xxx',
							tjr: 'xxx',
							tjsj: 'xxxx'
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
</style>
