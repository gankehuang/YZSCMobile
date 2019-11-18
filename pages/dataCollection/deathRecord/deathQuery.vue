<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @tap="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">死亡记录查询</view>
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
				<!-- 是否批次 -->
				<draw-cell title="是否批次" class="checked">
					<view slot="value" class="bg-gray jus-j"><checkbox value="cb" @tap="change" :checked="checkState"/></view>
				</draw-cell>
				<!-- 耳牌号 -->
				<draw-cell title="耳牌" required="true" v-if="!checkState">
					<view slot="value" class="bg-gray jus-j">
						<image @click="qr" style="margin: 0;" src="/static/search/qr.png" mode="" class="icon"></image>
						<input type="text" @tap="selectRP(1)" placeholder="请填写耳牌号" disabled v-model="searchForm.erpaihao" />
						<uni-icon type="arrowright" color="#B2B2B2" size="16" />
					</view>
				</draw-cell>
				<draw-cell title="批次号" required="true" v-if="checkState">
					<view slot="value" class="bg-gray jus-j">
						<image @click="qr" style="margin: 0;" src="/static/search/qr.png" mode="" class="icon"></image>
						<input type="text" @tap="selectRP(2)" placeholder="请填写批次号" disabled v-model="searchForm.picihao" />
						<uni-icon type="arrowright" color="#B2B2B2" size="16" />
					</view>
				</draw-cell>
				
				<!-- 配种日期 -->
				<draw-cell title="业务日期" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.mindate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate2">
							<text style="width: 150rpx">{{ searchForm.maxdate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<!-- 死亡时间 -->
				<draw-cell title="死亡时间">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{ searchForm.siwangshijian }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<!-- 死亡原因 -->
				<draw-cell title="死亡原因">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople2">
						<!-- <text>{{ searchForm.siwangyuanyin }}</text> -->
						<input type="text" placeholder="请输入" v-model="searchForm.siwangshijian" value="" />
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<!-- 分场 -->
				<draw-cell title="分场">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="请填写" v-model="searchForm.cfavgwt" /></view>
				</draw-cell>
				<!-- 均重 -->
				<!-- <draw-cell title="均重">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="请填写" v-model="searchForm.cfavgwt" /></view>
				</draw-cell> -->
				<!-- 总重量 -->
				<!-- <draw-cell title="总重量">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="请填写" v-model="searchForm.cftogwt" /></view>
				</draw-cell> -->
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"></mpvue-picker>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker2" mode="dateSelector" @onConfirm="onConfirmDate2" @onCancelDate="onCancel2"></mpvue-picker>
		<!-- 死亡时间 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmPig"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
		<!-- 死亡原因 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker2"
			:deepLength="deepLength2"
			:pickerValueDefault="pickerValueDefault2"
			@onConfirm="onConfirmPig2"
			:pickerValueArray="pickerValueArray2"
		></mpvue-picker>
		
		<!-- 搜索选择器 -->
		<tki-tree ref="tkitree"
		@watchSearch="watchSearch"
		:range="list"
		rangeKey="name"
		confirmColor="#5089f9"
		@confirm="treeConfirm"></tki-tree>
	
	</view>
</template>

<script>
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
import common from '../../../utils/common.js';
import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器

export default {
	// 下拉刷新
	onPullDownRefresh() {
		let _this = this;
		_this.getDataList(1, 10, false);
		_this.index = 1;
		_this.page = 2;
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 上拉加载
	onReachBottom() {
		this.loadMore();
	},
	onLoad: function(options) {
		this.active = !this.active;
		this.getDataList(1, 10, false);  //获取列表
		//this.getDeathTime();
		this.getDeathType();  //获取抽屉死亡原因
	},
	data() {
		return {
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
			
			list: [],  //搜索选择器数据
			selectType: '',   //选择的字段
			
			//死亡时间
			deepLength: 1,
			pickerValueDefault: [0],
			themeColor: '#007AFF',
			pickerValueArray: [
				{ value: '1111', label: '三泉A区' }
			],
			//死亡原因
			deepLength2: 1,
			pickerValueDefault2: [0],
			pickerValueArray2: [
				{ value: '1111', label: '三泉B区' }
			],
			checkState: false,
			//搜索栏数据
			searchForm: {
				cfisbatch: 0,  //是否批次
				erpaihao: '',  //耳牌号
				cfearnoid: '',  //耳牌号id
				picihao: '',  //批次号
				cfbthnoid: '',  //批次号id
				mindate: '',  //死亡日期开始
				maxdate: '',  //死亡日期结束
				siwangshijian: '',  //死亡时间
				siwangyuanyin: '',  //死亡原因
				cfavgwt: '',   //均重
				cftogwt: ''    //总重量
			},
			showRigth: false,
			showLeft: false,
			index: 1,
			page: 2,
			tableData: [  //表数据
				{
					id: '01',
					index: '01',
					picihao: '上午',
					fbizdate: '2',
					siwangshijian: 'D0001',
					siwangyuanyin: 'Y001',
					ispici: 'xx',
					cfpkPigfenid: 'xx'
				}
			],
			columns: [  //表头
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '耳牌/批次号',
					key: 'picihao',
					width: 250
				},
				{
					title: '死亡日期',
					key: 'fbizdate',
					width: 150
				},
				{
					title: '死亡时间',
					key: 'siwangshijian',
					width: 150
				},
				{
					title: '死亡原因',
					key: 'siwangyuanyin',
					width: 200
				},
				{
					title: '是否批次',
					key: 'ispici',
					width: 200
				},
				{
					title: '存栏位置',
					key: 'cfpkPigfenid',
					width: 150
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
		tkiTree
	},
	watch: {
		checkState(e) {   //监听勾选改变状态
			//console.log(e);
			this.searchForm.cfisbatch = e ? 1 : 0;
			//console.log(this.searchForm.cfisbatch);
		}
	},
	methods: {
	/* ************************************搜索选择器相关方法******************************************** */	
		//选择确定
		treeConfirm(e) {
			//console.log(e);
			if(e[0]){
				if(this.selectType == 1){  //耳牌号
					this.searchForm.erpaihao = e[0].name
					this.searchForm.cfearnoid = e[0].id
				}else if(this.selectType == 2){  //批次号
					this.searchForm.picihao = e[0].name
					this.searchForm.cfbthnoid = e[0].id
				}
			}
		},
		selectRP(e) {  //显示搜索选择器
			this.list = [];
			if(e == 1){  //耳牌号选择
				this.selectType = 1
			}else if(e == 2){  //批次号选择
				this.selectType = 2
			}
			this.$refs.tkitree._show();
		},
		//耳牌号选择器搜索框触发事件
		watchSearch(e) {
			const _this = this
			console.log(e, this.selectType)
			let timer
			clearTimeout(timer)
			timer = setTimeout(function(){
				if(_this.selectType == 1){
					_this.getEPH(e)  //获取耳牌号
				}else if(_this.selectType == 2){
					_this.getPCH(e)  //获取批次号
				}
			}, 500)
		},
		getPCH(e){  //获取批次号
			var _this = this;
			let url = '/PigDeadRecord/FilterselectPici/1/100';
			//console.log(e);
			let params = {
				//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				picihao: e
			};
			let headers = {};
			
			common.commRequest(url, params, headers, 'get',
				function(data) {
					//console.log(data);
					let EPList = data.data;
					let listArr = []
					EPList.forEach(ele => {
						let obj = {}
						obj.id = ele.PICIID
						obj.name = ele.PICIHAO
						listArr.push(obj)
					})
					_this.list = listArr;
					
				}
			)
		},
		getEPH(e){  //获取耳牌号
			var _this = this;
			let url = '/PigDeadRecord/FilterselectErpai/1/100';
			//console.log(e);
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				erpaihao: e
			};
			let headers = {};
			
			common.commRequest(url, params, headers, 'get',
				function(data) {
					//console.log(data);
					let EPList = data.data;
					let listArr = []
					EPList.forEach(ele => {
						let obj = {}
						obj.id = ele.PIGID
						obj.name = ele.ERPAIHAO
						listArr.push(obj)
					})
					_this.list = listArr;
				}
			)
		},
		
	/* ************************************其他方法******************************************** */	
		//获取列表
		getDataList(pageNum, pageSize, isLoad) {  //获取列表数据
			var _this = this;
			_this.loadingType = 1;
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				cfisbatch: _this.searchForm.cfisbatch,  //是否批次
				erpaihao: _this.searchForm.erpaihao,  //耳牌号
				mindate: _this.searchForm.mindate,     //死亡日期开始
				maxdate: _this.searchForm.maxdate,     //死亡日期结束
				siwangshijian: _this.searchForm.siwangshijian,  //死亡时间
				siwangyuanyin: _this.searchForm.siwangyuanyin,  //死亡原因
				cfavgwt: _this.searchForm.cfavgwt,  //均重
				cftogwt: _this.searchForm.cftogwt  //总重量
			};
			//console.log(params)
			let headers = {};
			common.commRequest(`/PigDeadRecord/selectPigDeadRecord/${pageNum}/${pageSize}`, params, headers, 'post',
				function(data) {
					let getData = data.data.list;
					console.log(getData);
					if(getData.length == 0){
						_this.loadingType = 2;
						return;
					}
					getData.forEach((obj, index) => {
						obj['index'] = _this.index;
						_this.index ++;
						obj.picihao = obj.picihao ? obj.picihao : '-';
						obj.fbizdate = obj.fbizdate ? _this.formatDate(obj.fbizdate) : '-';
						obj.siwangshijian = obj.siwangshijian ? obj.siwangshijian : '-';
						obj.siwangyuanyin = obj.siwangyuanyin ? obj.siwangyuanyin : '-';
						obj.ispici = obj.ispici ? obj.ispici : '-';
						obj.cfpkPigfenid = obj.cfpkPigfenid ? obj.cfpkPigfenid : '-';
					})
					//console.log(getData)
					if(isLoad) {
						let oldData = _this.tableData;
						let loadData = [...oldData, ...getData];
						_this.tableData = loadData;
					}else {
						_this.tableData = getData;
					}
					if(getData.length < 10){
						_this.loadingType = 2;
					}else{
						_this.loadingType = 0;
					}
			})
		},
		formatDate(value) {  //时间格式转换
			let time = Number(value)
			let date = new Date(time);
			let y = date.getFullYear();
			let MM = date.getMonth() + 1;
			MM = MM < 10 ? ('0' + MM) : MM;
			let d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			return y + '-' + MM + '-' + d;
		},
		/* getDeathTime() {  //获取死亡时间
			var _this = this;
			let url = '/PigDeadRecord/selectDeadTime';
			let params = {};
			let headers = {};
			common.commRequest(url, params, headers, 'get',
				function(data) {
					let getData = data.data;
					//_this.ylarray = getData
					let getArr = [];
					getData.forEach((item, index) => {
						let obj = {}
						obj.value = item.boxid;
						obj.label = item.boxname;
						getArr.push(obj)
					})
					_this.pickerValueArray = getArr;
					
				}
			)
		}, */
		getDeathType(){  //获取死亡原因
			var _this = this;
			let url = '/PigDeadRecord/FilterselectDeadReson/1/1000';
			let params = {
				//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
			};
			let headers = {};
			common.commRequest(url, params, headers, 'get',
				function(data) {
					let getData = data.data;
					//_this.ylarray = getData
					let getArr = [];
					getData.forEach((item, index) => {
						let obj = {}
						obj.value = item.DEADREASONID;
						obj.label = item.DEADREASON;
						getArr.push(obj)
					})
					_this.pickerValueArray2 = getArr;
					
				}
			)
		},
		//抽屉是否批次状态改变事件
		change() {
			this.checkState = !this.checkState;
		},
		// 滑动底部加载
		loadMore() {
			this.getDataList(this.page, 10, true);
			this.page ++;
		},
		onConfirmPig(e) {  //死亡时间选择确认
			this.searchForm.siwangshijian = e.label;
		},
		onConfirmPig2(e) {  //死亡原因选择确认
			this.searchForm.siwangyuanyin = e.label;
		},
		selectDate() {  //筛选条件-死亡开始时间
			this.$refs.mpvuePicker.show();
		},
		onConfirmDate(e) {  //确定选择死亡开始时间
			console.log(e);
		},
		selectDate2() {  //筛选条件-死亡结束时间
			this.$refs.mpvuePicker2.show();
		},
		// 重置
		reset() {
			this.searchForm.cfisbatch = 0;  //是否批次
			this.searchForm.erpaihao = '';  //耳牌号
			this.searchForm.mindate = '';  //死亡日期开始
			this.searchForm.maxdate = '';  //死亡日期结束
			this.searchForm.siwangshijian = '';  //死亡时间
			this.searchForm.siwangyuanyin = '';  //死亡原因
			this.searchForm.cfavgwt = '';   //均重
			this.searchForm.cftogwt = '';    //总重量
		},
		// 查询
		find() {
			console.log(this.searchForm);
			this.getDataList(1, 10, false);
			this.index = 1;
			this.page = 2;
			this.$refs.popupRef1.close(); // 关闭弹窗
		},
		selectPeople() {   //死亡时间，下拉菜单
			this.$refs.pigPicker.show();
		},
		selectPeople2() {   //死亡原因，下拉菜单
			this.$refs.pigPicker2.show();
		},
		showFilter() {
			this.$refs.popupRef1.show();
		},
		//跳转详情
		rowTapHandler(row) {
			uni.navigateTo({
				url: `/pages/dataCollection/deathRecord/deathDetail?id=${encodeURIComponent(row.fid)}`
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
.checked {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.jus-j {
		background-color: #fff;
	}
}
</style>
