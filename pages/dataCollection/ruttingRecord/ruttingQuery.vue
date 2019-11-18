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
					<view class="search-wrap-search">
						<uni-icon type="search" color="#CACFD9"></uni-icon>
					</view>
					<view class="search-wrap-input">
						<input type="text" value="" @input="IntSearch" placeholder="请输入筛选条件" />
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
		
		<!-- 抽屉 -->
		<uni-drawer :visible="boolShow" :mode="'right'" @close="boolShow=false">
		    <scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
			    <!-- 发情日期 -->
				<draw-cell title="发情日期" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.minfaqingriqi }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.maxfaqingriqi }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<!-- 耳牌号 -->
				<draw-cell title="耳牌号"  required="true">
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(1)">
						<text>{{searchForm.erpaihao || '请输入'}}</text>
						<uni-icon type="arrowright" color="#B2B2B2" size="16" />
					</view>
				</draw-cell>
				<draw-cell title="第一次发情" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.minfaqingriqi }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.maxfaqingriqi }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<draw-cell title="第二次发情" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.minfaqingriqi }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.maxfaqingriqi }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<draw-cell title="第三次发情" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.minfaqingriqi }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate">
							<text style="width: 150rpx;">{{ searchForm.maxfaqingriqi }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				
				<!-- 分厂 -->
				<draw-cell title="分厂" required="true">
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(2)">
						<text>{{searchForm.fenchang || '请输入'}}</text>
						<uni-icon type="arrowright" color="#B2B2B2" size="16" />
					</view>
				</draw-cell>
				<!-- 单据状态 -->
				<draw-cell title="是否宜配种" required="true">
					<view slot="value" class="bg-gray jus-j">
						<label>
							<checkbox checked="true"/>
						</label>
					</view>
				</draw-cell>
			   
			</scroll-view>
				<view class="submits jus-b">
					<view class="flexc reset-btn" @click="reset">重置</view>
					<view class="flexc submit-btn" @click="find">确定</view>
				</view>
		</uni-drawer>
		
		<mpvue-picker :themeColor="themeColor"  ref="pigPicker" 
		:deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
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
	import ztable from '@/components/z-table/z-table'
	// 引入弹框组件
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniLoadMore from '@/components/uni-load-more.vue';  //  加载更多
	//引入时间转换
	import {timeFormat} from '@/utils/dateUtils.js'
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入下拉框
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import common from '../../../utils/common.js';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
	export default {
		data() {
			return {
				boolShow: false,  //抽屉显示状态
				tableData: [],
				columns: [{
						title: "序号",
						key: "index",
						width: 70,
					}, {
						title: "母猪耳牌",
						key: "cfsownonum",
						width: 200,
					}, {
						title: "第一次发情时间",
						key: "cfesfrt",
						width: 220,
					}, {
						title: "第二次发情时间",
						key: "cfessec",
						width: 220,
					},
					{
						title: "第三次发情时间",
						key: "cfesthr",
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
				searchForm:{   //搜索栏数据
					minfaqingriqi: '',
					maxfaqingriqi: '',
					erpaihao:'',    //
					fenchang:'',
					danjuzhuangtai:'',
				},
				
				list: [],  //搜索选择器数据
				selectType: '',   //选择的字段
				
				pickerValueArray:[
					{'value':'1111','label':'三泉A区'},
					{'value':'1111','label':'三泉B区'},
					{'value':'1111','label':'三泉C区'},
					{'value':'1111','label':'三泉D区'},
					{'value':'1111','label':'三泉E区'}
				],
				pageNum: 2, //页码
				index: 1   //序号
			}
		},
		components: {
			ztable,
			uniDrawer,
			uniLoadMore,
			drawCell,
			uniIcon,
			mpvuePicker,
			tkiTree
		},
		onLoad() {
			this.getDataList(1, 10, false);
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getDataList(1, 10, false);
			this.pageNum = 2;
			this.index = 1;
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载数据
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			/* *******************************搜索选择器转出批次相关方法************************************* */
			//选择确定
			treeConfirm(e) {
				//console.log(e);
				if(e[0]){
					if(this.selectType == 1){  //耳牌号
						this.searchForm.erpaihao = e[0].name
					}else if(this.selectType == 2){
						this.searchForm.fenchang = e[0].name
					}
				}
			},
			//显示搜索选择器
			selectRP(e) {
				this.list = []
				if(e == 1){  //转入批次
					this.selectType = 1
				}else if(e == 2){
					this.selectType = 2
					this.getFC(e)
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
						_this.getFC(e)  //获取分厂
					}
				}, 500)
			},
			//获取耳牌号
			getEPH(e){
				var _this = this;
				let url = '/PigHeatRecord/selectErpaihaoFilter/1/10';
				//console.log(e);
				let params = {
					//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					cfsownonum: e,
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						console.log(data);
						let EPList = data.data.list;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.pigtype
							obj.name = ele.cfsownonum    //耳牌号
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取分厂
			getFC(e){
				var _this = this;
				let url = '/PigHeatRecord/selectFengchangFilter/1/100';
				//console.log(e);
				let params = {
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					//cfsownonum: e,
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'post',
					function(data) {
						//console.log(data);
						let EPList = data.data.list;
						console.log(EPList)
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.fenchangid
							obj.name = ele.fenchang    //耳牌号
							listArr.push(obj)
						})
						_this.list = listArr;
						
						
					}
				)
			},
			/* ****************************************************************** */
			getDataList(pageNum, pageSize, isLoad) {  //获取列表数据
				var _this = this;
				_this.loadingType = 1;
				let params = {
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					minfaqingriqi: _this.searchForm.minfaqingriqi,  //开始时间
					maxfaqingriqi: _this.searchForm.maxfaqingriqi,  //结束时间
					erpaihao: _this.searchForm.erpaihao,     //耳牌号
					fenchang: _this.searchForm.fenchang,     //分厂
					danjuzhuangtai: _this.searchForm.danjuzhuangtai,  //单据状态
				};
				console.log(params)
				let headers = {};
				common.commRequest(`/PigHeatRecord/selectHeatRecord/${pageNum}/${pageSize}`, params, headers, 'post',
					function(data) {
						let getData = data.data.list;
						//console.log(data);
						if(getData.length == 0){
							_this.loadingType = 2;
							return;
						}
						getData.forEach((obj, index) => {
							obj['index'] = _this.index;
							_this.index ++;
							obj.cfsownonum = obj.cfsownonum ? obj.cfsownonum : '-';
							obj.cfesfrt = obj.cfesfrt ? _this.formatDate(obj.cfesfrt) : '-';
							obj.cfesthr = obj.cfesthr ? _this.formatDate(obj.cfesthr) : '-';
							obj.cfessec = obj.cfessec ? _this.formatDate(obj.cfessec) : '-';
						})
						//console.log(JSON.stringify(getData))
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
			selectDate(){ // 下拉菜单 
				this.$refs.pigPicker.show()
			},
			rowTapHandler(row) {
				uni.navigateTo({
					url: `/pages/dataCollection/ruttingRecord/ruttingAudit?id=${encodeURIComponent(row.fid)}`
				});
			},
			showFilter() {
				this.boolShow = true;
			},
			find() {  //抽屉查询
				this.getDataList(1, 10, false);
				this.pageNum = 2;
				this.index = 1;
				this.boolShow = false;
			},
			//搜索
			IntSearch(e){
				this.searchForm.erpaihao = e.target.value
				this.pageNum = 2;
				this.index = 1;
				this.getDataList(1, 10, false);
			},
			closeDrawer() {
			},
			// 滑动底部加载
			loadMore() {
				let _this = this;
				_this.getDataList(_this.pageNum, 10, true)
				_this.pageNum ++;
			},
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

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
		.status-search{
			box-sizing: border-box;
			width: 100%;
			position: absolute;
			bottom: 0;
			background: none;
			color: #B2B2B2;
			padding:20rpx 4%;
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
