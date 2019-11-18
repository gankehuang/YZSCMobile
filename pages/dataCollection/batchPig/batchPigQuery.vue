<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">批次猪转舍查询</view>
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
					<view class="search-wrap-input"><input type="text" value="" @input="intSearch" placeholder="请输入筛选条件" /></view>
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
				<!-- 转群日期 -->
				<draw-cell title="转群日期" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.mindate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate1">
							<text style="width: 150rpx;">{{ searchForm.maxdate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<!-- 转群类别 -->
				<draw-cell title="转群类别" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{ searchForm.zqtype }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<draw-cell title="转出批次">
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(2)">
						<text>{{searchForm.zcpici || '请输入'}}</text>
						<uni-icon type="arrowright" color="#B2B2B2" size="16" />
					</view>
				</draw-cell>
				<draw-cell title="转入批次">
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(1)">
						<text>{{searchForm.zrpici || '请输入'}}</text>
						<uni-icon type="arrowright" color="#B2B2B2" size="16" />
					</view>
				</draw-cell>
				<draw-cell title="转出分场">  <!--字段未定-->
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="请填写" v-model="searchForm.cfavgwt" /></view>
				</draw-cell>
				<draw-cell title="是否跨分场">
					<view slot="value" class="bg-gray jus-j">
						<!-- <input type="text" placeholder="请填写" v-model="searchForm.iskfc" /> -->
						<label>
							<checkbox :checked="checkState" @tap="checkChange"/><text></text>
						</label>
					</view>
				</draw-cell>
				<draw-cell title="转入分场">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="请填写" v-model="searchForm.zrfenchang" /></view>
				</draw-cell>
				
				<!-- 转出栋舍 -->
				<!-- <draw-cell title="转出栋舍" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople1">
						<text>{{ searchForm.zcsmc }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell> -->
				<!-- 转入栋舍 -->
				<!-- <draw-cell title="转入栋舍" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople2">
						<text>{{ searchForm.zrsmc }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell> -->
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" ></mpvue-picker>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker1" mode="dateSelector" @onConfirm="onConfirmDate1" ></mpvue-picker>
		<!-- 搜索转出选择器 -->
		<tki-tree ref="tkitree"
		@watchSearch="watchSearch"
		:range="list"
		rangeKey="name"
		confirmColor="#5089f9"
		@confirm="treeConfirm"></tki-tree>
		<!-- 转群类别 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmPig"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
		<!-- 转出栋舍 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker1"
			:deepLength="deepLength1"
			:pickerValueDefault="pickerValueDefault1"
			@onConfirm="onConfirmPig1"
			:pickerValueArray="pickerValueArray1"
		></mpvue-picker>
		<!-- 转入栋舍 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker2"
			:deepLength="deepLength2"
			:pickerValueDefault="pickerValueDefault2"
			@onConfirm="onConfirmPig2"
			:pickerValueArray="pickerValueArray2"
		></mpvue-picker>
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
	onLoad: function(options) {
		const _this = this;
		_this.active = !_this.active;
		_this.getDataList(1, 10, false);  //获取列表
		setTimeout(function(){
			_this.getZqType(1);   //获取转群类别
			//_this.getZqType(2);   //获取转出栋舍
			//_this.getZqType(3);   //获取转入栋舍
		}, 500)
		
	},
	// 下拉刷新
	onPullDownRefresh() {
		let _this = this;
		_this.getDataList(1, 10, false);  //获取列表
		_this.page = 2;
		_this.index = 1;
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 上拉加载
	onReachBottom() {
		this.loadMore();
	},
	data() {
		return {
			active: true,
			index: 1,  //序号
			page: 2,  //页数
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
			
			themeColor: '#007AFF',
			//转群类型
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [   //转群类别
				{ value: '1111', label: '三泉A区' }
			],
			//转出栋舍
			deepLength1: 1,
			pickerValueDefault1: [0],
			pickerValueArray1: [   //转群类别
				{ value: '1111', label: '三泉A区' }
			],
			//转入栋舍
			deepLength2: 1,
			pickerValueDefault2: [0],
			pickerValueArray2: [   //转群类别
				{ value: '1111', label: '三泉A区' }
			],
			//搜索数据
			searchForm: {
				mindate: '', //转群日期开始
				maxdate: '', //转群日期结束
				zqtype: '',  //转群类别
				zcpici: '',  //转出批次
				zrpici: '',   //转入批次
				zcfenchang: '',  //转出分厂
				iskfc: '',   //是否跨分厂
				zrfenchang: '',  //转入分厂
			},
			checkState: false,  //搜索框是否跨分厂勾选状态
			showRigth: false,
			showLeft: false,
			tableData: [
				{
					id: '01',
					index: '01',
					iskfc: '-',
					zrfenchang: '-',
					fbizdate: '-',
					zqtype: '-',
					zcpici: '-',
					zrpici: '-',
					zcsmc: '-',
					zrsmc: '-',
					cfinwgt: '-',
					cfincnt: '-'
					
				}
			],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '是否跨分场',  
					key: 'iskfc',
					width: 150
				},
				{
					title: '转入分场',
					key: 'zrfenchang',
					width: 300
				},
				{
					title: '转群日期',
					key: 'fbizdate',
					width: 200
				},
				{
					title: '转群类别',
					key: 'zqtype',
					width: 300
				},
				{
					title: '转出批次',  
					key: 'zcpici',
					width: 300
				},
				{
					title: '转入批次',
					key: 'zrpici',
					width: 300
				},
				{
					title: '转出舍',
					key: 'zcsmc',
					width: 300
				},
				{
					title: '转入舍',
					key: 'zrsmc',
					width: 250
				},
				{
					title: '重量',
					key: 'cfinwgt',
					width: 150
				},
				{
					title: '头数',
					key: 'cfincnt',
					width: 100
				}
			],
			
			list: [],  //搜索选择器数据
			selectType: '',   //选择的字段
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

	methods: {
		/* *******************************搜索框搜索事件********************************** */
		intSearch(e){
			const _this = this
			console.log(e.detail.value);
			let timer
			clearTimeout(timer)
			timer = setTimeout(function(){
				_this.searchForm.erpaihao = e.detail.value
				_this.getDataList(1, 10, false);  //获取列表
			}, 500)
		},
		/* *******************************搜索选择器转出批次相关方法************************************* */
		//选择确定
		treeConfirm(e) {
			//console.log(e);
			if(e[0]){
				if(this.selectType == 1){  //转入批次
					this.searchForm.zrpici = e[0].name
				}else if(this.selectType == 2){  //转出批次
					this.searchForm.zcpici = e[0].name
				}
			}
		},
		//显示搜索选择器
		selectRP(e) {
			this.list = []
			if(e == 1){  //转入批次
				this.selectType = 1
			}else if(e == 2){  //转出批次
				this.selectType = 2
			}
			this.$refs.tkitree._show();
		},
		//选择器搜索框触发事件
		watchSearch(e) {
			const _this = this
			console.log(e, this.selectType)
			let timer
			clearTimeout(timer)
			timer = setTimeout(function(){
				if(_this.selectType == 1){
					_this.getZRPC(e, '')  //获取转入分厂
				}else if(_this.selectType == 2){
					_this.getZCPC(e, '')  //获取转出批次
				}
			}, 500)
		},
		//获取转出批次
		getZCPC(e, pigtypeid){
			var _this = this;
			let url = '/PigChangingPool/FilterselectOutPici/1/100';
			//console.log(e);
			let params = {
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				outpici: e,
				pigtypeid: pigtypeid     //转群类别ID
			};
			let headers = {};
			
			common.commRequest(url, params, headers, 'get',
				function(data) {
					console.log(data);
					let EPList = data.data;
					let listArr = []
					EPList.forEach(ele => {
						let obj = {}
						obj.id = ele.DONGSHE
						obj.name = ele.PICIHAO
						obj.rl = ele.RILING
						obj.pigtypeid = ele.PIGTYPEID
						obj.pigtype = ele.PIGTYPE
						obj.piciid = ele.PICIID
						listArr.push(obj)
					})
					_this.list = listArr;
					
				}
			)
		},
		//获取转入批次
		getZRPC(e, pigtypeid){
			var _this = this;
			let url = '/PigChangingPool/FilterselectInPici/1/100';
			//console.log(e);
			let params = {
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				inpici: e,
				pigtypeid: pigtypeid    //转群类别ID
			};
			let headers = {};
			
			common.commRequest(url, params, headers, 'get',
				function(data) {
					//console.log(data);
					let EPList = data.data;
					let listArr = []
					EPList.forEach(ele => {
						let obj = {}
						obj.id = ele.DONGSHE
						obj.name = ele.PICIHAO
						obj.pigtype = ele.PIGTYPE
						listArr.push(obj)
					})
					_this.list = listArr;
					
				}
			)
		},
		/* ****************************************************************** */
		//是否跨分厂选择状态改变方法
		checkChange(){
			this.checkState = !this.checkState
			this.searchForm.iskfc = this.checkState
		},
		
		getZqType(type) {  //获取转群类别,转出栋舍，转入栋舍
			var _this = this;
			let url = '';
			if(type == 1){
				 url = '/PigChangingPool/FilterselectTranstype'  //转群类别
			}else if(type == 2){
				url = '/PigChangingPool/selectInBuild/1/1000'  //转入栋舍
			}else if(type == 3){
				url = '/PigChangingPool/selectOutBuild/1/1000' //转出栋舍
			}
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
						let obj = {};
						obj.value = item.ZHUANQUNLEIBIEID;
						obj.label = item.ZHUANQUNLEIBIE;
						getArr.push(obj)
					})
					if(type == 1){
						_this.pickerValueArray = getArr;
					}else if(type == 2){
						_this.pickerValueArray1 = getArr;
					}else if(type == 3){
						_this.pickerValueArray2 = getArr;
					}
					
					
				}
			)
		},
		getDataList(pageNum, pageSize, isLoad) {  //获取列表数据
			var _this = this;
			_this.loadingType = 1;
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				zqdate: _this.searchForm.zqdate,  //业务日期
				zqtype: _this.searchForm.zqtype,  //转群类别
				zcpici: _this.searchForm.zcpici,   //转出批次
				zrpici: _this.searchForm.zrpici,  //转入批次
				zcfenchang: _this.searchForm.zcfenchang,   //转出分厂
				zrfenchang: _this.searchForm.zrfenchang,   //转入分厂
				erpaihao: _this.searchForm.erpaihao,   //耳牌号
			};
			let headers = {};
			common.commRequest(`/PigChangingPool/selectAll/${pageNum}/${pageSize}`, params, headers, 'post',
				function(data) {
					let getData = data.data.list;
					if(getData.length == 0) {
						_this.loadingType = 2;
						return;
					}
					getData.forEach((obj, index) => {
						obj['index'] = _this.index;
						_this.index ++;
						
						obj.iskfc = obj.iskfc ? obj.iskfc : '-';
						obj.zrfenchang = obj.zrfenchang ? obj.zrfenchang : '-';
						obj.fbizdate = obj.fbizdate ? _this.formatDate(obj.fbizdate) : '-';
						obj.zqtype = obj.zqtype ? obj.zqtype : '-';
						obj.zcpici = obj.zcpici ? obj.zcpici : '-';
						obj.zrpici = obj.zrpici ? obj.zrpici : '-';
						obj.zcsmc = obj.zcsmc ? obj.zcsmc : '-';
						obj.zrsmc = obj.zrsmc ? obj.zrsmc : '-';
						obj.cfinwgt = obj.cfinwgt ? obj.cfinwgt : '-';
						obj.cfincnt = obj.cfincnt ? obj.cfincnt : '-';
						
					})
					//console.log(getData);
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
		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.getDataList(_this.page, 10, true);
			_this.page ++;
		},
		onConfirmPig(e) {  //转群类别选择
			this.searchForm.zqtype = e.label;
		},
		onConfirmPig1(e) {  //转出栋舍选择
			this.searchForm.zcsmc = e.label;
		},
		onConfirmPig2(e) {  //转入栋舍选择
			this.searchForm.zrsmc = e.label;
		},
		/* **************************选择日期相关方法*********************************** */
		//选择开始日期
		selectDate() {   
			this.$refs.mpvuePicker.show();
		},
		onConfirmDate(e) {    //选择日期确定
			//console.log(e);
			this.searchForm.mindate = e.label;
		},
		//选择结束日期
		selectDate1() {   
			this.$refs.mpvuePicker1.show();
		},
		onConfirmDate1(e) {    //选择日期确定
			//console.log(e);
			this.searchForm.maxdate = e.label;
		},
		/* ************************************************************************* */
		// 重置
		reset() {
			this.searchForm.zqdate = '';
			this.searchForm.zqtype = '';
			this.searchForm.zcsmc = '';
			this.searchForm.zrsmc = '';
		},
		// 查询
		find() {
			console.log(this.searchForm)
			this.index = 1;  //将序号还原
			this.page = 2;  //将页数还原
			this.getDataList(1, 10, false);  //获取列表
			this.$refs.popupRef1.close(); // 关闭弹窗
		},
		selectPeople() {   //转群类别下拉
			this.$refs.pigPicker.show();
		},
		selectPeople1() {  //转出栋舍下拉
			this.$refs.pigPicker1.show(); 
		},
		selectPeople2() {  //转入栋舍下拉
			this.$refs.pigPicker2.show(); 
		},
		//导航栏点击显示抽屉
		showFilter() {
			this.$refs.popupRef1.show();
		},
		//详情跳转
		rowTapHandler(row) {
			uni.navigateTo({
				url: `/pages/dataCollection/batchPig/batchPigDetail?id=${row.id}`,
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
