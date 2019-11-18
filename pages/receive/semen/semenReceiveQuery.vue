<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @tap="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">精液领用历史记录</view>
				<view class="more-icon flexc ali-c" @tap="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
			</view>
			<!-- 搜索框(圆) -->
			<!-- <view class="status-search">
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
			</view> -->
			<!-- 搜索框（方） -->
			<view class="status-search">
				<view class="search-wrap">
					<view class="search-wrap-search"><uni-icon type="search" color="#CACFD9"></uni-icon></view>
					<view class="search-wrap-input"><input type="text" value="" placeholder="请输入筛选条件" /></view>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<!-- 列表 -->
		<view class="list">
			<view class="data__wrapper">
				<ztable :tableData="tableData" stickSide stickSide1 :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
			</view>
		</view>
		<!-- 加载  -->
		<view class="uni-tab-bar-loading" @click="loadMore()"><uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more></view>

		<!-- 弹窗 -->
		<popup-layer ref="popupRef1" :direction="'left'" :class="{ active: active }">
			<scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
				<!-- 单据编号 -->
				<draw-cell title="单据编号" required="true">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="请填写" v-model="searchForm.immunePlan" /></view>
				</draw-cell>
				<!-- 申请日期 -->
				<draw-cell title="申请日期" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate" style="flex: 1;">
							<text>{{ searchForm.businessStartTime }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text style="margin: 0 5px;">—</text>
						<view class="bg-gray jus-j" @click="selectDate1" style="flex: 1;">
							<text>{{ searchForm.businessEndTime }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<!-- 精液使用时间 -->
				<draw-cell title="精液使用时间" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{ searchForm.vaccineName.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 耳牌 -->
				<draw-cell title="耳牌" required="true">
					<view slot="value" class="bg-gray jus-j" >
						<input type="text" placeholder="请填写" v-model="title1" />
					</view>
				</draw-cell>
				<!-- 单据状态 -->
				<draw-cell title="单据状态" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople1">
						<text>{{ searchForm.vaccineName1.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<!-- 分厂 -->
				<draw-cell title="分厂">
					<view slot="value" class="bg-gray jus-j" >
					<input type="text" disabled="true" :value="fenc" />
					</view>
				</draw-cell>
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<mpvue-picker   :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" :pickerValueDefault="[0,0,0]"
		 ></mpvue-picker>
		 <mpvue-picker   :themeColor="themeColor" ref="mpvuePicker1" mode="dateSelector" @onConfirm="onConfirmDate1" :pickerValueDefault="[0,0,0]"
		  ></mpvue-picker>
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmPig"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker1"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmPig1"
			:pickerValueArray="pickerValueArray1"
		></mpvue-picker>
	</view>
</template>

<script>
	import common from '../../../utils/common.js';
//  加载更多
import uniLoadMore from '@/components/uni-load-more.vue';
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
//引入时间转换
import { timeFormat } from '@/utils/dateUtils.js';
// 引入弹框组件
import popupLayer from '@/components/popup/popup-layer.vue';
//引入抽屉单元格组件
import drawCell from '@/components/uni-cell/draw-cell.vue';
//引入下拉框
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import ztable from '@/components/z-table/z-table';

export default {
	onLoad: function(options) {
		this.active = !this.active
		this.loadingType = 1;
		this.getindex(this.pageNum,this.pageSize,false)
		this.tools()
	},
	// 下拉刷新
	onPullDownRefresh() {
		let _this = this;
		this.pageNum = 1
		this.idNum = 0 
		this.getindex(this.pageNum,this.pageSize,true)
	},
	// 上拉加载
	onReachBottom() {
		this.loadMore();
	},
	data() {
		return {
			idNum:0, // 表格排序
			pageNum:1, // 页数  
			pageSize:10, // 每页数量   
			active: true,
			status: 'more',
			statusTypes: [
				{
					value: 'more',
					text: '加载前'
				},
				{
					value: 'loading',
					text: '加载中'
				},
				{
					value: 'noMore',
					text: '没有更多'
				}
			],
			loadingType: 0, // 加载更多状态
			loadingText: {
				contentdown: '查看更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			deepLength: 1,
			pickerValueDefault: [0],
			themeColor: '#007AFF',
			pickerValueArray: [
				{
					value: '1111',
					label: '上午'
				}
			],
			pickerValueArray1: [
				{
					value: '1111',
					label: '上午'
				}
			],
			searchForm: {
				businessStartTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				businessEndTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				immunePlan: '', // 单据编号
				vaccineName: { // 精液使用时间
					name:'',
					id:''
				},
				vaccineName1: { // 单据状态
					name:'',
					id:''
				},
			},
			fenc:'一分场',
			title1:'',
			showRigth: false,
			showLeft: false,

			tableData: [
				
			],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '领用分厂',
					key: 'dnumber',
					width: 300
				},
				{
					title: '领用份数',
					key: 'date',
					width: 200
				},
				{
					title: '领用单价',
					key: 'status',
					width: 200
				},
				{
					title: '领用金额',
					key: 'useTime',
					width: 200
				},
				{
					title: '领用日期',
					key: 'useTimeOld',
					width: 200
				},
				{
					title: '备注',
					key: 'useName',
					width: 200
				}
			]
		};
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
		getindex(pageNum, pageSize, isLoad,data) {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = { 
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			// if(this.title1) params['cfsownoid'] = this.stringList1[1][this.stringList1[0].indexOf(this.title1)] // 母猪耳牌
			// if(this.searchForm.businessStartTime) params['mincfweaningdate'] = this.searchForm.businessStartTime// 最小断奶日期
			// if(this.searchForm.businessEndTime) params['maxcfweaningdate'] = this.searchForm.businessEndTime// 最大断奶日期
			// if(this.searchForm.vaccineName.name) params['cfiskfc'] = this.searchForm.vaccineName.id// 是否跨分场
			// if(this.title) params['cfzrfieldid'] = this.stringList[1][this.stringList[0].indexOf(this.title)] // 转入分场
			if(data){
				params = {...params,...data}
			}
			common.commRequest(`/CtPigSemenCollar/ctPigSemenCollarAll/${pageNum}/${pageSize}`, params,headers, 'post',
				function(data) {
					console.log(data)
					let getData = data.data.list;
					
					if(isLoad) {
						if(getData.length == 0){
							_this.loadingType = 2;
							_this.tableData = []
							return;
						}
						let loadData = []
						for (var i = 0; i < getData.length; i++) {
							loadData.push({
								id: getData[i].fid,
								index: ++_this.idNum, // 序号
								dnumber: getData[i].fenchang?getData[i].fenchang:'-', // 领用分厂
								date: getData[i].cfincnt?getData[i].cfincnt:'-', // 领用份数 
								status:getData[i].cfcost/getData[i].cfincnt?getData[i].cfcost/getData[i].cfincnt:'-' , // 领用单价 1 
								useTime: getData[i].cfcost?getData[i].cfcost:'-', // 领用金额
								useTimeOld: getData[i].fbizdate?getData[i].fbizdate:'-', // 领用日期
								useName: getData[i].cfrmark?getData[i].cfrmark:'-' // 备注  
						})
						} 
						_this.tableData = loadData;
						_this.loadingType = 0;
						uni.stopPullDownRefresh();
					}else {
						if(getData.length == 0){
							_this.loadingType = 2;
							return;
						}
						// console.log(JSON.stringify(getData));
						for (var i = 0; i < getData.length; i++) {
							_this.tableData.push({
								id: getData[i].fid,
								index: ++_this.idNum, // 序号
								dnumber: getData[i].fenchang?getData[i].fenchang:'-', // 领用分厂
								date: getData[i].cfincnt?getData[i].cfincnt:'-', // 领用份数 
								status:getData[i].cfcost/getData[i].cfincnt?getData[i].cfcost/getData[i].cfincnt:'-' , // 领用单价 1 
								useTime: getData[i].cfcost?getData[i].cfcost:'-', // 领用金额
								useTimeOld: getData[i].fbizdate?getData[i].fbizdate:'-', // 领用日期
								useName: getData[i].cfrmark?getData[i].cfrmark:'-' // 备注  
						})
					}
					_this.loadingType = 0;
					}
			})
		},
		tools(){
			var _this = this;
			let headers = {};
			let  params = {
								cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
								cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
						};
						
					// 耳牌号
					// let picker2 = [[],[]]
					// 	common.commRequest(`/CtPigWeaningRecords/selectPig/1/10000`, {cfpigfarmid: 'Va4AAAAYuCC4/eJt'}, headers,'get',
					// 		function(data) {
					// 			// console.log(data)
					// 			let getData = data.data;
					// 				for (let i = 0; i < getData.length; i++) {
					// 					picker2[0].push(getData[i].ERPAIHAO)
					// 					picker2[1].push(getData[i].ERPAIID)
					// 				}
					// 				_this.stringList1 = picker2
					// 				// console.log(_this.stringList1)
					// 	})
		},
		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.loadingType = 1;
			this.getindex(++this.pageNum,this.pageSize,false)
		},
		onConfirmPig(e) {
			const _this = this;
			_this.searchForm.vaccineName.name = e.label;
			_this.searchForm.vaccineName.id = e.value[0];
		},
		onConfirmPig1(e) {
			const _this = this;
			_this.searchForm.vaccineName1.name = e.label;
			_this.searchForm.vaccineName1.id = e.value[0];
		},
		onConfirmDate(e){ 
			// console.log(e)
			const _this = this;
			_this.searchForm.businessStartTime = e.label;
			
		},
		onConfirmDate1(e){ 
			// console.log(e)
			const _this = this;
			_this.searchForm.businessEndTime = e.label;
			
		},
		selectDate(){
			this.$refs.mpvuePicker.show()
		},
		selectDate1(){
			this.$refs.mpvuePicker1.show()
		},
		// 重置
		reset() {
			this.searchForm.businessStartTime = '';
			this.searchForm.businessEndTime = '';
			this.searchForm.immunePlan = '';
			this.title1 = '';
			this.searchForm.vaccineName.name = '';
			this.searchForm.vaccineName.id = '';
			this.searchForm.vaccineName1.name = '';
			this.searchForm.vaccineName1.id = '';
		},
		// 查询
		find() {
			this.$refs.popupRef1.close(); // 关闭弹窗
			this.pageNum = 1
			this.idNum = 0 
			this.loadingType = 1;
			let data = {} 
			// if(this.title1) data['cfsownoid'] = this.stringList1[1][this.stringList1[0].indexOf(this.title1)] // 母猪耳牌
			// if(this.searchForm.businessStartTime) data['mincfweaningdate'] = this.searchForm.businessStartTime// 最小断奶日期
			// if(this.searchForm.businessEndTime) data['maxcfweaningdate'] = this.searchForm.businessEndTime// 最大断奶日期
			// if(this.searchForm.vaccineName.name) data['cfiskfc'] = this.searchForm.vaccineName.id// 是否跨分场
			// if(this.title) data['cfzrfieldid'] = this.stringList[1][this.stringList[0].indexOf(this.title)] // 转入分场
			
			console.log(data)
			
			
			
			
			
			// this.getindex(this.pageNum,this.pageSize,true,data)
		},
		selectPeople() {
			// 下拉菜单
			this.$refs.pigPicker.show();
		},
		selectPeople1() {
			// 下拉菜单
			this.$refs.pigPicker1.show();
		},
		showFilter() {
			this.$refs.popupRef1.show();
		},
		rowTapHandler(row) {
			uni.navigateTo({
				url: `/pages/receive/semen/semenReceiveDetail?id=${row.id}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';
.status {
	z-index: 99999;
	height: 220rpx;

	.status-header {
		margin-top: 8rpx;
	}
	.status-title {
		padding-left: 40rpx;
	}
}

// 	.status-search {
//
// 		.search-wrap-qr,
// 		.search-wrap-search {
// 			width: 10%;
// 			display: flex;
// 			align-items: center;
// 			margin: 0 15rpx;
// 		}
//
// 		.search-wrap-input {
// 			width: 80%;
// 			text-align: left;
// 		}
// 	}
.status-search {
	box-sizing: border-box;
	width: 100%;
	position: absolute;
	bottom: 0;
	background: none;
	color: #b2b2b2;
	padding: 20rpx 4%;
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
.list {
	padding-top: 240rpx;
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
			background-color: #ffffff;
			border-top: 2px solid #f5f5f5;
		}

		&.submit-btn {
			border-top: 2px solid #4684ea;
			background-color: #4684ea;
			color: #ffffff;
		}
	}
}
</style>
