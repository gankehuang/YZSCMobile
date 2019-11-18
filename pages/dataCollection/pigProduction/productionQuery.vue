<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">生产猪转群查询</view>
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
					<view class="search-wrap-input"><input type="text" @input="seatInt" value="" placeholder="请输入筛选条件" /></view>
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
				<!-- 耳牌号 -->
				<draw-cell title="耳牌号" required="true">
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(1)">
						<text>{{ searchForm.erpaihao }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<!-- 母猪上产房 -->
				<draw-cell title="母猪上产房" required="true">
					<view slot="value" class="bg-gray jus-j">
						<label>
							<checkbox :checked="searchForm.isspz" @tap="changeMXSCF"/>
						</label>
					</view>
				</draw-cell>
				<!-- 转入栏舍 -->
				<draw-cell title="转入栏舍" required="true">
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(2)">
						<text>{{ searchForm.zrlsmc }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<!-- 跨分场 -->
				<draw-cell title="跨分场" required="true">
					<view slot="value" class="bg-gray jus-j">
						<label>
							<checkbox :checked="searchForm.iskfc" @tap="changeKFC"/>
						</label>
					</view>
				</draw-cell>
				<!-- 转入分场 -->
				<draw-cell title="转入分场" required="true">
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(3)">
						<text>{{ searchForm.zrfenchang }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<!-- 分场 -->
				<draw-cell title="分场" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{ searchForm.breedpc }}</text>
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
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker1" mode="dateSelector" @onConfirm="onConfirmDate1"></mpvue-picker>
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmPig"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
		<!-- 搜索转出选择器 -->
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
import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
import common from '../../../utils/common.js';

export default {
	
	// 下拉刷新
	onPullDownRefresh() {
		let _this = this
		//console.log('下拉刷新');
		_this.index = 1
		_this.page = 2
		_this.getDataList(1, 10, false)
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 上拉加载
	onReachBottom() {
		this.loadMore();
	},
	onLoad(options) {
		this.active = !this.active;
		this.getDataList(1, 10, false)
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
			deepLength: 1,
			pickerValueDefault: [0],
			themeColor: '#007AFF',
			pickerValueArray: [
				{ value: '1111', label: '三泉A区' },
				{ value: '1111', label: '三泉B区' },
				{ value: '1111', label: '三泉C区' },
				{ value: '1111', label: '三泉D区' },
				{ value: '1111', label: '三泉E区' }
			],
			searchForm: {
				businessStartTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				businessEndTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				immunePlan: '',
				immuneProject: '',
				zrbreedpc: '',
				pigstate: ''
			},
			showRigth: false,
			showLeft: false,
			tableData: [
				{
					id: '01',
					index: '1',
					erpaihao: '-',
					pigstate: '-',
					jedays: '-',
					zrbreedpc: '-',
					cfisspz: '-'
				},
			],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '耳牌号',
					key: 'erpaihao',
					width: 150
				},
				{
					title: '状态',
					key: 'pigstate',
					width: 150
				},
				{
					title: '天数',
					key: 'jedays',
					width: 150
				},
				{
					title: '配种批次',
					key: 'zrbreedpc',
					width: 150
				},
				{
					title: '存栏位置',
					key: 'cfisspz',  //（未定）
					width: 200
				}
			],
			page: 2,
			index: 1,
			searchForm: {
				mindate: '',   //最小时间
				maxdate: '',   //最大时间
				erpaihao: '',  //耳牌号
				isspz: false,    //母猪上产房
				zrlsmc: '',  //转入栏舍
				iskfc: false,   //跨分场
				zrfenchang: '',  //转入分场
				cffieldid: '',  //分厂
			},
			
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
		/* *******************************搜索选择器转出批次相关方法************************************* */
		//选择确定
		treeConfirm(e) {
			//console.log(e);
			if(e[0]){
				if(this.selectType == 1){  //耳牌号
					this.searchForm.erpaihao = e[0].name
				}else if(this.selectType == 2){  //转入栏舍
					this.searchForm.zrlsmc = e[0].name
				}else if(this.selectType == 3){   //转入分场
					this.searchForm.zrfenchang = e[0].name
				}
			}
		},
		//显示搜索选择器
		selectRP(e) {
			this.list = []
			if(e == 1){  //耳牌号
				this.selectType = 1
			}else if(e == 2){  //转入栏舍
				this.selectType = 2
			}else if(e == 3){  //转入分场
				this.selectType = 3
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
					_this.getEPH(e)  //获取耳牌号
				}else if(_this.selectType == 2){
					_this.getZRLS(e)  //获取转入栏舍
				}else if(_this.selectType == 3){
					_this.getZRFC(e)  //转入分场
				}
			}, 500)
		},
		//获取耳牌号
		getEPH(e){
			var _this = this;
			let url = '/PigAdjustableOrder/selectErpaiFilter/1/50';
			//console.log(e);
			let params = {
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				erpaihao: e
			};
			let headers = {};
			
			common.commRequest(url, params, headers, 'get',
				function(data) {
					console.log(data);
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
		//获取转入栏舍
		getZRLS(e){
			var _this = this;
			let url = '/PigAdjustableOrder/selectInpen/1/50';
			//console.log(e);
			let params = {
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				zhuanrulanshe: e,
			};
			let headers = {};
			
			common.commRequest(url, params, headers, 'get',
				function(data) {
					//console.log(data);
					let EPList = data.data;
					let listArr = []
					EPList.forEach(ele => {
						let obj = {}
						obj.id = ele.DONGSHEID
						obj.name = ele.DONGSHE
						listArr.push(obj)
					})
					_this.list = listArr;
					
				}
			)
		},
		//获取转入分厂
		getZRFC(e){
			var _this = this;
			let url = '/PigAdjustableOrder/selectZrfield/1/50';
			//console.log(e);
			let params = {
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				zrfenchang: e,
			};
			let headers = {};
			common.commRequest(url, params, headers, 'get',
				function(data) {
					console.log(data);
					let EPList = data.data;
					let listArr = []
					EPList.forEach(ele => {
						let obj = {}
						obj.id = ele.FENCHANGID
						obj.name = ele.FENCHANG
						listArr.push(obj)
					})
					_this.list = listArr;
					
				}
			)
		},
		/* ******************************头部搜索框搜索************************************ */
		seatInt(e){
			console.log(e.target.value)
			this.searchForm.erpaihao = e.target.value
			this.getDataList(1, 10, false)
		},
		/* ****************************************************************** */
		getDataList(pageNum, pageSize, isLoad) {  //获取列表数据
			var _this = this;
			_this.loadingType = 1;
			let params = {
				//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				
				mindate: _this.searchForm.mindate,   //最小时间
				maxdate: _this.searchForm.maxdate,   //最大时间
				erpaihao: _this.searchForm.erpaihao,  //耳牌号
				isspz: _this.searchForm.isspz,    //母猪上产房
				zrlsmc: _this.searchForm.zrlsmc,  //转入栏舍
				iskfc: _this.searchForm.iskfc,   //跨分场
				zrfenchang: _this.searchForm.zrfenchang,  //转入分场
				cffieldid: _this.searchForm.cffieldid,  //分厂
				
			};
			let headers = {};
			//console.log(params)
			common.commRequest(`/PigAdjustableOrder/selectAll/${pageNum}/${pageSize}`, params, headers, 'post',
				function(data) {
					let getData = data.data.list;
					console.log(getData);
					if(getData.length == 0) {
						_this.loadingType = 2;
						return;
					}
					getData.forEach((obj, index) => {
						obj['index'] = _this.index;
						_this.index ++;
						obj.erpaihao = obj.erpaihao ? obj.erpaihao : '-';
						obj.pigstate = obj.pigstate ? obj.pigstate : '-';
						obj.jedays = obj.jedays ? obj.jedays : '-';
						obj.zrbreedpc = obj.zrbreedpc ? obj.zrbreedpc : '-';
						obj.cfisspz = obj.cfisspz ? obj.cfisspz : '-';
						
					})
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
		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.getDataList(_this.page, 10, true)
			_this.page ++;
		},
		onConfirmPig(e) {
			console.log(e);
		},
		/* **************************使劲选择器相关方法********************************** */
		//开始时间
		onConfirmDate(e){
			console.log(e.label)
			this.searchForm.mindate = e.label
		},
		selectDate() {
			this.$refs.mpvuePicker.show();
		},
		//结束时间
		onConfirmDate1(e) {
			this.searchForm.maxdate = e.label
		},
		selectDate1() {
			this.$refs.mpvuePicker1.show();
		},
		/* ***************************************************************************** */
		// 重置
		reset() {
			this.searchForm.mindate = '';  //最小时间
			this.searchForm.maxdate = '';  //最大时间
			this.searchForm.erpaihao = '';  //耳牌号
			this.searchForm.isspz = false;  //母猪上产房
			this.searchForm.zrlsmc = '';    //转入栏舍
			this.searchForm.iskfc = false;   //跨分场
			this.searchForm.zrfenchang = '';  //转入分场
			this.searchForm.cffieldid = '';  //分厂
			
		},
		// 查询
		find() {
			this.index = 1
			this.page = 2
			this.getDataList(1, 10, false)
			this.$refs.popupRef1.close(); // 关闭弹窗
		},
		//母猪上产房状态改变
		changeMXSCF(){
			this.searchForm.isspz = !this.searchForm.isspz
		},
		//是否跨分厂状态改变
		changeKFC(){
			this.searchForm.iskfc = !this.searchForm.iskfc
		},
		selectPeople() {
			// 下拉菜单
			this.$refs.pigPicker.show();
		},
		showFilter() {  //导航栏点击显示抽屉
			this.$refs.popupRef1.show();
		},
		rowTapHandler(row) {
			uni.navigateTo({
				url: `/pages/dataCollection/pigProduction/productionDetail?id=${row.id}`,
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
.checked {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.jus-j {
		background-color: #fff;
	}
}
</style>
