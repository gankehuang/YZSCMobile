<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">个体信息查询</view>
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
					<view class="search-wrap-input"><input type="text" value="" @input="intSerach" placeholder="请输入筛选条件" /></view>
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
				
				<!-- 耳牌号 -->
				<draw-cell title="耳牌" required="true">
					<view slot="value" class="bg-gray jus-j">
						<image @click="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image>
						<text @tap="selectRP(1)">{{ searchForm.cfnewearno }}</text>
						<uni-icon type="arrowright" color="#333333" size="18"  @tap="selectRP(1)" />
					</view>
				</draw-cell>
				<draw-cell title="品种" required="true">
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请输入" v-model="searchForm.fnewpigvarieties" />
					</view>
				</draw-cell>
				<draw-cell title="品系" required="true">
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请输入" v-model="searchForm.fnewpigpx" />
					</view>
				</draw-cell>
				<draw-cell title="胎次" required="true">
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请输入" v-model="searchForm.fnewparity" />
					</view>
				</draw-cell>
				
				<!-- <draw-cell title="猪只类型" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{ searchForm.vaccineName }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell> -->
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"></mpvue-picker>
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
	onLoad: function(options) {
		this.active = !this.active;
		this.getDataList(1, 10, false)
	},
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
				cfnewearno: '',  //耳牌
				fnewpigvarieties: '',    //品种
				fnewpigpx: '',   //品系
				fnewparity: ''    //胎次
			},
			
			list: [],  //搜索选择器数据
			selectType: '',   //选择的字段
			
			showRigth: false,
			showLeft: false,
			page: 2,  //页数
			index: 1, //序号
			tableData: [
				/* {
					id: '01',
					index: '01',
					cfnewearno: '耳牌',
					fnewpigvarieties: '2',    //品种
					fnewpigpx: 'D0001',   //品系
					fnewparity: 'Y001',    //胎次
					fnewbirth: 'xx',   //出生日期
					fnewindno: 'xx',   //国标号
					cfoldearno: 'xx',   //原耳牌             
					foldoigvarieties: 'xx', //原品种 
					foldpigpx: 'xx',  //原品系 
					foldparity: 'xx',     //原胎次
					foldbirth: 'xxx',   //原出生日期
					foldindno: 'xxxx'  //原国标号
				} */
			],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '耳牌',
					key: 'cfnewearno',
					width: 200
				},
				{
					title: '品种',
					key: 'fnewpigvarieties',
					width: 150
				},
				{
					title: '品系',
					key: 'fnewpigpx',
					width: 150
				},
				{
					title: '胎次',
					key: 'fnewparity',
					width: 150
				},
				{
					title: '出生日期',
					key: 'fnewbirth',
					width: 150
				},
				{
					title: '国标号',
					key: 'fnewindno',
					width: 100
				},
				{
					title: '原耳牌',
					key: 'cfoldearno',  
					width: 200
				},
				{
					title: '原品种',
					key: 'foldoigvarieties',
					width: 150
				},
				{
					title: '原品系',
					key: 'foldpigpx',
					width: 100
				},
				{
					title: '原胎次',
					key: 'foldparity',
					width: 150
				},
				{
					title: '原出生日期',
					key: 'foldbirth',
					width: 150
				},
				{
					title: '原国标号',
					key: 'foldindno',
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

	methods: {
		/* *******************************搜索选择器转出批次相关方法************************************* */
		//选择确定
		treeConfirm(e) {
			//console.log(e);
			if(e[0]){
				if(this.selectType == 1){  //耳牌号
					this.searchForm.cfnewearno = e[0].name
				}
			}
		},
		//显示搜索选择器
		selectRP(e) {
			this.list = []
			if(e == 1){  //耳牌号
				this.selectType = 1
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
				}
			}, 500)
		},
		//获取耳牌号
		getEPH(e){
			var _this = this;
			let url = '/CtPigBatchAdjustEarnoBill/selectErpaiFilter/1/50';
			//console.log(e);
			let params = {
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				erpaihao: e,
			};
			let headers = {};
			
			common.commRequest(url, params, headers, 'get',
				function(data) {
					//console.log(data);
					let EPList = data.data;
					let listArr = []
					EPList.forEach(ele => {
						let obj = {}
						obj.id = ele.PIGD
						obj.name = ele.ERPAIHAO
						listArr.push(obj)
					})
					_this.list = listArr;
					
				}
			)
		},
		
		/* *****************************获取列表信息************************************* */
		getDataList(pageNum, pageSize, isLoad) {  //获取列表数据
			var _this = this;
			_this.loadingType = 1;
			let params = {
				//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				
				cfnewearno: _this.searchForm.cfnewearno,  //耳牌
				fnewpigvarieties: _this.searchForm.fnewpigvarieties,    //品种
				fnewpigpx: _this.searchForm.fnewpigpx,   //品系
				fnewparity: _this.searchForm.fnewparity,    //胎次
				
			};
			let headers = {};
			//console.log(params)
			common.commRequest(`/CtPigBatchAdjustEarnoBill/selectPigAdjustEarnoBill/${pageNum}/${pageSize}`, params, headers, 'post',
				function(data) {
					let getData = data.data.list;
					//console.log(JSON.stringify(getData));
					if(getData.length == 0) {
						_this.loadingType = 2;
						return;
					}
					getData.forEach((obj, index) => {
						obj['index'] = _this.index;
						_this.index ++;
						obj.cfnewearno = obj.cfnewearno ? obj.cfnewearno : '-';  //耳牌号
						obj.fnewpigvarieties = obj.fnewpigvarieties ? obj.fnewpigvarieties : '-';  //品种
						obj.fnewpigpx = obj.fnewpigpx ? obj.fnewpigpx : '-';  //品系
						obj.fnewparity = obj.fnewparity ? obj.fnewparity : '-';  //胎次
						obj.fnewbirth = obj.fnewbirth ? _this.formatDate(obj.fnewbirth) : '-';  //出生日期
						obj.fnewindno = obj.fnewindno ? obj.fnewindno : '-';  //国标号
						obj.cfoldearno = obj.cfoldearno ? obj.cfoldearno : '-';  //原耳牌 
						obj.foldoigvarieties = obj.foldoigvarieties ? obj.foldoigvarieties : '-';  //原品种 
						obj.foldpigpx = obj.foldpigpx ? obj.foldpigpx : '-';  //原品系  
						obj.foldparity = obj.foldparity ? obj.foldparity : '-';  //原胎次
						obj.foldbirth = obj.foldbirth ? _this.formatDate(obj.foldbirth) : '-';  //原出生日期
						obj.foldindno = obj.foldindno ? obj.foldindno : '-';  //原国标号
					
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
		onConfirmPig() {},
		selectDate() {
			this.$refs.mpvuePicker.show();
		},
		// 重置
		reset() {
			this.searchForm.cfnewearno = '';
			this.searchForm.fnewpigvarieties = '';
			this.searchForm.fnewpigpx = '';
			this.searchForm.fnewparity = '';
		},
		// 抽屉查询
		find() {
			this.index = 1
			this.page = 2
			this.getDataList(1, 10, false)
			this.$refs.popupRef1.close(); // 关闭弹窗
		},
		//搜索
		intSerach(e){
			const _this = this
			console.log(e.target.value)
			let timer = null
			clearTimeout(timer)
			timer = setTimeout(function(){
				_this.searchForm.cfnewearno = e.target.value
				_this.index = 1
				_this.page = 2
				_this.getDataList(1, 10, false)
			}, 1000)
			
		},
		selectPeople() {
			// 下拉菜单
			this.$refs.pigPicker.show();
		},
		showFilter() {
			this.$refs.popupRef1.show();
		},
		rowTapHandler(row) {
			uni.setStorage({
				key: 'personalDataItem',
				data: row
			});
			uni.navigateTo({
				url: `/pages/businessAdjustment/personalData/personalDataDetail?id=${row.id}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
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
