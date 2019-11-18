<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">等级/调整查询</view>
				<view class="more-icon flexc ali-c" @click="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
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
					<view class="search-wrap-qr" @click="scancode"><image class="icon" src="/static/assets/scan-icon.png" mode=""></image></view>
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
				<!-- 配种日期 -->
				<draw-cell title="业务日期" required="true">
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

				<!-- 耳牌号 -->
				<draw-cell title="耳牌" required="true">
					<view slot="value" class="bg-gray jus-j">
						<image @click="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image>
						<!-- <input type="text" placeholder="请填写" v-model="searchForm.immuneProject" /> -->
						<str-autocomplete :stringList="stringList1[0]" :importvalue="title1" @select="selectOne1" backgroundColor='#f5f5f5' highlightColor="#FF0000" v-model="title1"></str-autocomplete>
					</view>
				</draw-cell>

				<draw-cell title="分场" required="true">
					<view slot="value" class="bg-gray jus-j">
						<text>{{ searchForm.fenc }}</text>
					</view>
				</draw-cell>

				<draw-cell title="栋舍" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{ searchForm.dongs.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>

				<draw-cell title="单据状态" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople1">
						<text>{{ searchForm.danjzz.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<!-- 开始时间 -->
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" :pickerValueDefault="[0,0,0]" @onConfirm="onConfirmDate"></mpvue-picker>
		<!-- 结束时间 -->
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker1" mode="dateSelector" :pickerValueDefault="[0,0,0]" @onConfirm="onConfirmDate1"></mpvue-picker>
		<!-- 栋舍 -->
		<mpvue-picker :themeColor="themeColor" ref="pigPicker" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<!-- 单据状态 -->
		<mpvue-picker :themeColor="themeColor" ref="pigPicker1" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirmPig1" :pickerValueArray="pickerValueArray1"></mpvue-picker>
	</view>
</template>

<script>
	import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue'  //输入框
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
		this.active = !this.active;
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
			title1: '', // 耳牌 
			stringList1: [['apple2','apple22'],[1,2]], // 耳牌 
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
			pickerValueArray: [ // 栋舍
				{ value: '1111', label: '三泉A区' },
				{ value: '1111', label: '三泉B区' }
			],
			pickerValueArray1: [ // 单据状态
				{ value: '1', label: '保存' },
				{ value: '2', label: '提交' },
				{ value: '4', label: '审核' }
			],
			searchForm: {
				businessStartTime: '', // 开始时间 timeFormat(new Date(), 'yyyy-MM-dd')
				businessEndTime: '', // 结束时间 
				fenc: '一分场', // 分场 
				dongs: { // 栋社
					name:'',
					id:''
					},
				danjzz: { // 单据状态
					name:'',
					id:''
				}
			},
			tableData: [
				// {
				// 	id: '01',
				// 	index: '01', // 序号
				// 	erpai:'1', // 耳牌 
				// 	jcrq: '上午', // 新核心群等级
				// 	jcry: '2', // 原核心群等级
				// 	jcgg: 'D0001', // 原生产类型
				// 	sowcard: 'Y001', // 调整后生产类型
				// 	ycyy: 'xx', // 公猪异常原因
				// 	pzpc: 'xx', // 原异常原因
				// 	clwz: 'xx' // 单据号
				// }
			],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '耳牌',
					key: 'erpai',
					width: 200
				},
				{
					title: '新核心群等级',
					key: 'jcrq',
					width: 200
				},
				{
					title: '原核心群等级',
					key: 'jcry',
					width: 200
				},
				{
					title: '原生产类型',
					key: 'jcgg',
					width: 200
				},
				{
					title: '调整后生产类型',
					key: 'sowcard',
					width: 200
				},
				{
					title: '公猪异常原因',
					key: 'ycyy',
					width: 200
				},
				{
					title: '原异常原因',
					key: 'pzpc',
					width: 200
				},
				{
					title: '单据号',
					key: 'clwz',
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
		uniLoadMore,
		strAutocomplete
	},

	methods: {
		tools(){
			var _this = this;
			let headers = {};
			let params = { 
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAACSR46du1vk' // 分场
			};
				// 栋舍 
				let picker = []
					common.commRequest(`/CtPigCoreGroupTypeAdjustBill/selectDongsheFilter/1/1000`, params, headers,'get',
						function(data) {
							// console.log(data)
							let getData = data.data;
								for (let i = 0; i < getData.length; i++) {
									picker.push({
										'value':getData[i].DONGSHEID,
										'label':getData[i].DONGSHE
									})
								}
								_this.pickerValueArray = picker
					}) 
					
						
						// // 耳牌号
						// let picker2 = [[],[]]
						// 	common.commRequest(`/PigWeedApply/selectErpaiFilter/1/100`, {cfpigfarmid: 'Va4AAAAYuCC4/eJt'}, headers,'get',
						// 		function(data) {
						// 			// console.log(data)
						// 			let getData = data.data;
						// 				for (let i = 0; i < getData.length; i++) {
						// 					picker2[0].push(getData[i].ERPAIHAO)
						// 					picker2[1].push(getData[i].PIGID)
						// 				}
						// 				_this.stringList1 = picker2
						// 				// console.log(_this.stringList1)
						// 	})
		
		},
		getindex(pageNum, pageSize, isLoad,data) {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = { 
					cfpigfarmid: 'Va4AAAAYuCC4/eJt' // 猪场id
			};
			if(this.searchForm.businessStartTime) params['mindate'] = this.searchForm.businessStartTime // 起始日期
			if(this.searchForm.businessEndTime) params['maxdate'] =  this.searchForm.businessEndTime// 结束日期
			// if(this.title1) params['erpaiid'] = this.stringList1[1][this.stringList1[0].indexOf(this.title1)]// 耳牌
			if(this.searchForm.dongs.name) params['dongsheid'] = this.searchForm.dongs.id// 栋舍
			if(this.searchForm.danjzz.name) params['cfbasestatus'] = this.searchForm.danjzz.id// 单据状态
			if(data){
				params = {...params,...data}
			}
			// // console.log(params) 
			common.commRequest(`/CtPigCoreGroupTypeAdjustBill/selectPigCoreGroupTypeAdjust/${pageNum}/${pageSize}`, params,headers, 'post',
				function(data) {
					// console.log(data)
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
								id: '1',//`${getData[i].zhuzhitype},${getData[i].fapplicantidname?getData[i].fapplicantidname:'-'},${getData[i].isstandard?getData[i].isstandard:'-'},${getData[i].fid}`,
								index: ++_this.idNum, // 序号
								erpai: getData[i].erpaihao?getData[i].erpaihao:'-', // 耳牌
								jcrq: getData[i].cfnewgrouptypetxt?getData[i].cfnewgrouptypetxt:'-', // 新核心群等级 
								jcry: getData[i].cfoldgrouptypetxt?getData[i].cfoldgrouptypetxt:'-', // 原核心群等级
								jcgg: getData[i].cfoldmaletypetxt?getData[i].cfoldmaletypetxt:'-', // 原生产类型
								sowcard: getData[i].cfnewmaletypetxt?getData[i].cfnewmaletypetxt:'-', // 调整后生产类型
								ycyy: getData[i].cfunmaleresulttxt?getData[i].cfunmaleresulttxt:'-',// 公猪异常原因  
								pzpc: getData[i].cfoldunmaleresulttxt?getData[i].cfoldunmaleresulttxt:'-', //原异常原因
								clwz: getData[i].zhuangtai?getData[i].zhuangtai:'-' //单据号
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
						for (var i = 0; i < getData.length; i++) {
							_this.tableData.push({
								id: encodeURIComponent(JSON.stringify([getData[i].fid,{
										newhexin:{ // 新核心群等级
											name:getData[i].cfnewgrouptypetxt, // 存放名字
											id:getData[i].cfnewgrouptype  // 存放ID
										},
										oldhexin:{ // 原核心群等级
											name:getData[i].cfoldgrouptypetxt, // 存放名字
											id:getData[i].cfoldgrouptype  // 存放ID
										}, 
										oldzhu:{ // 原生产类型
											name:getData[i].cfoldmaletypetxt, // 存放名字
											id:getData[i].cfoldmaletype  // 存放ID
										}, 
										newzhu:{ // 调整后生产类型
											name:getData[i].cfnewmaletypetxt, // 存放名字
											id:getData[i].cfnewmaletype  // 存放ID
										}, 
										newyic:{ // 公猪异常原因
											name:getData[i].cfunmaleresulttxt, // 存放名字
											id:getData[i].cfunmaleresult  // 存放ID
										}, 
										oldyic:{ // 原异常原因
											name:getData[i].cfoldunmaleresulttxt, // 存放名字
											id:getData[i].cfoldunmaleresult  // 存放ID
										}, 
										title1:{  // 耳牌
											name:getData[i].erpaihao, // 存放名字
											id:getData[i].cfearnoid  // 存放ID
										},
										id:+new Date
									}])),
								index: ++_this.idNum, // 序号
								erpai: getData[i].erpaihao?getData[i].erpaihao:'-', // 耳牌
								jcrq: getData[i].cfnewgrouptypetxt?getData[i].cfnewgrouptypetxt:'-', // 新核心群等级 
								jcry: getData[i].cfoldgrouptypetxt?getData[i].cfoldgrouptypetxt:'-', // 原核心群等级
								jcgg: getData[i].cfoldmaletypetxt?getData[i].cfoldmaletypetxt:'-', // 原生产类型
								sowcard: getData[i].cfnewmaletypetxt?getData[i].cfnewmaletypetxt:'-', // 调整后生产类型
								ycyy: getData[i].cfunmaleresulttxt?getData[i].cfunmaleresulttxt:'-',// 公猪异常原因  
								pzpc: getData[i].cfoldunmaleresulttxt?getData[i].cfoldunmaleresulttxt:'-', //原异常原因
								clwz: getData[i].zhuangtai?getData[i].zhuangtai:'-' //单据号
						})
					}
					_this.loadingType = 0;
					}
			})
		},
		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.loadingType = 1;
			this.getindex(++this.pageNum,this.pageSize,false)
			
		},
		onConfirmPig(e) { // 栋舍
			const _this = this;
			_this.searchForm.dongs.name = e.label;
			_this.searchForm.dongs.id = e.value[0];
		},
		onConfirmPig1(e) { // 单据状态
			const _this = this;
			_this.searchForm.danjzz.name = e.label;
			_this.searchForm.danjzz.id = e.value[0];
		},
		selectDate(){
			this.$refs.mpvuePicker.show()
		},
		selectDate1(){
			this.$refs.mpvuePicker1.show()
		},
		// 重置
		reset() {
			this.title1 = '' // 耳牌 
			this.searchForm.businessStartTime = '';// 开始时间 
			this.searchForm.businessEndTime = '';// 结束时间 
			this.searchForm.dongs.name = ''; // 栋社
			this.searchForm.dongs.id = '';
			this.searchForm.danjzz.name = ''; // 单据状态
			this.searchForm.danjzz.id = '';
		},
		// 查询
		find() {
			this.$refs.popupRef1.close(); // 关闭弹窗
			this.pageNum = 1
			this.idNum = 0 
			this.loadingType = 1;
			
			let data = {} 
			if(this.searchForm.businessStartTime) data['mindate'] = this.searchForm.businessStartTime // 起始日期
			if(this.searchForm.businessEndTime) data['maxdate'] =  this.searchForm.businessEndTime// 结束日期
			// if(this.title1) data['erpaiid'] = this.stringList1[1][this.stringList1[0].indexOf(this.title1)]// 耳牌
			if(this.searchForm.dongs.name) data['dongsheid'] = this.searchForm.dongs.id// 栋舍
			if(this.searchForm.danjzz.name) data['cfbasestatus'] = this.searchForm.danjzz.id// 单据状态
			
			this.getindex(this.pageNum,this.pageSize,true,data)
		},
		selectPeople() { // 栋舍 
			this.$refs.pigPicker.show();
		},
		selectPeople1() { // 单据状态 
			this.$refs.pigPicker1.show();
		},
		showFilter() {
			this.$refs.popupRef1.show();
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
		rowTapHandler(row) {
			uni.navigateTo({
				url: `/pages/businessAdjustment/gradePig/gradePigDetail?id=${row.id}`,
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
