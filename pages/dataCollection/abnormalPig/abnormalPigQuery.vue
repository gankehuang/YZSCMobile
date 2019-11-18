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
					异常猪查询
				</view>
				<view class="more-icon flexc ali-c" @click="showFilter">
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
		<view class="uni-tab-bar-loading" @click="loadMore()">
			<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
		
			<!-- 弹窗 -->
		<popup-layer ref="popupRef1" :direction="'left'"  :class='{active:active}'>
		   <scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
			   <!-- 配种日期 -->
		       <draw-cell title="业务日期" >
				   <view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate(1)" >
							<text style="width: 150rpx;">{{searchForm.mindate || '请选择'}}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					   <text>—</text>
					   <view class="bg-gray jus-j" @click="selectDate(2)">
						   <text style="width: 150rpx;">{{searchForm.maxdate || '请选择'}}</text>
						   <image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
					   </view>
				   </view>
			   </draw-cell>
			    <!-- 耳牌号 -->
			   <draw-cell title="耳牌" >
					<view slot="value" class="bg-gray jus-j">
						<image @click="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image>
						<text @tap="selectRP(1)">{{searchForm.erpaihao || '请输入'}}</text>
						<uni-icon type="arrowright" color="#333333" size="16" @tap="selectRP(1)"/>
					</view>
			   </draw-cell>
			   <!-- 分场 -->
			  <draw-cell title="分场" >
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(2)">
						<text>{{searchForm.fenchang}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" /> 
					</view>
			   </draw-cell>
			    <!-- 猪舍 -->
			   <draw-cell title="猪舍" >
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(3)">
						<text>{{searchForm.dongshe}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" /> 
					</view>
			    </draw-cell>
				 <!-- 异常分类 -->
				<draw-cell title="异常分类" >
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(4)">
						<text>{{searchForm.yichangfenlei}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" /> 
					</view>
				</draw-cell>
			   <!-- 助产 -->
			   <!-- <draw-cell title="助产" class='checked'>
			   				<view slot="value" class="bg-gray jus-j">
			   					 <checkbox value="cb" />
			   				</view>
			   </draw-cell> -->
			    <!-- 发热 -->
			   <!-- <draw-cell title="发热" class='checked'>
			   				<view slot="value" class="bg-gray jus-j">
			   					 <checkbox value="cb" />
			   				</view>
			   </draw-cell> -->
			    <!-- 不吃料 -->
			   <!-- <draw-cell title="不吃料" class='checked'>
			   				<view slot="value" class="bg-gray jus-j">
			   					 <checkbox value="cb" />
			   				</view>
			   </draw-cell> -->
			    <!-- 带弱仔 -->
			   <!-- <draw-cell title="带弱仔"  class='checked'>
			   				<view slot="value" class="bg-gray jus-j">
			   					 <checkbox value="cb" />
			   				</view>
			   </draw-cell> -->
			    <!-- 产死胎木乃伊 -->
			  <!-- <draw-cell title="产死胎木乃伊" class='checked'>
			   				<view slot="value" class="bg-gray jus-j">
			   					 <checkbox value="cb" />
			   				</view>
			   </draw-cell> -->
			   <!-- 颜色 -->
			  <draw-cell title="颜色">
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(5)">
						<text>{{searchForm.color}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" /> 
					</view>
			   </draw-cell>
				 <!-- 执行人 -->
			   <draw-cell title="执行人" >
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(6)">  
						<text>{{searchForm.executorper}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" /> 
					</view>
			    </draw-cell>
				 <!-- 责任人 -->
			   <!-- <draw-cell title="责任人" >
					<view slot="value" class="bg-gray jus-j" @tap="selectRP(6)">
						<text>{{searchForm.zerenren}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" /> 
					</view>
			    </draw-cell> -->
			   
			  </scroll-view>
			  <view class="submits jus-b">
					   <view class="flexc reset-btn" @click="reset">重置</view>
					   <view class="flexc submit-btn" @click="find">确定</view>
			  </view>
		</popup-layer>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"
		 ></mpvue-picker>
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
	//  加载更多 
	import uniLoadMore from '@/components/uni-load-more.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	//引入时间转换
	import {timeFormat} from '@/utils/dateUtils.js'
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入下拉框
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import ztable from '@/components/z-table/z-table'
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
	import common from '../../../utils/common.js';

	export default {
		onLoad: function(options) {
			this.active = !this.active
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
			this.loadMore()
		},
		data() {
			return {
				active:true,
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
				
				page: 2,  //页数
				index: 1, //序号
				
				deepLength:1,
				pickerValueDefault: [0],
				themeColor: '#007AFF',
				pickerValueArray:[
					{'value':'1111','label':'三泉A区'},
					{'value':'1111','label':'三泉B区'},
					{'value':'1111','label':'三泉C区'},
					{'value':'1111','label':'三泉D区'},
					{'value':'1111','label':'三泉E区'}
				],
				selectDateType: '',   //时间选择标识
				searchForm:{
					mindate: '',  //开始时间
					maxdate: '',  //结束时间
					erpaihao: '',  //耳牌号
					erhaoid: '',  //耳牌号id
					fenchang: '',  //分场
					cffieldid: '',  //分场id
					dongshe: '',  //猪舍
					fpkPigfenid: '',  //猪舍id
					yichangfenlei: '',  //异常分类
					yichangfenleiid: '',  //异常分类id
					color: '',     //颜色
					colorid: '',     //颜色id
					executorper: '',   //执行人
					executorperid: '',   //执行人id
					zerenren: '',   //责任人
					liableperid: '',  //责任人id
				},
				list: [],  //搜索选择器数据
				selectType: '',   //选择的字段
				
				showRigth: false,
				showLeft: false,
				tableData: [
					{
						id: '01',
						index: '01',
						erpaihao: '上午',     
						breedpc: '2',
						yichangfenlei: 'D0001',
						executorper: 'Y001',
						zerenren: 'xx',
					}
				],
				columns: [
					{
						title: "序号",
						key: "index",
						width: 70,
					}, {
						title: "耳号",
						key: "erpaihao",  
						width: 200,
					}, {
						title: "批次号",
						key: "breedpc", 
						width: 200,
					}, {
						title: "异常分类",
						key: "yichangfenlei",
						width: 200,
					},
					{
						title: "执行人",
						key: "executorper",
						width: 150,
					}, {
						title: "责任人",
						key: "zerenren",
						width: 200,
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
			uniLoadMore,
			tkiTree
		},
	
		methods: {
			/* *******************************搜索选择器转出批次相关方法************************************* */
			//选择确定
			treeConfirm(e) {
				//console.log(e);
				if(e[0]){
					if(this.selectType == 1){  //耳号
						this.searchForm.erpaihao = e[0].name
						this.searchForm.erhaoid = e[0].id
					}else if(this.selectType == 2){  //分厂
						this.searchForm.fenchang = e[0].name
						this.searchForm.cffieldid = e[0].id
					}else if(this.selectType == 3){   //猪舍
						this.searchForm.dongshe = e[0].name
						this.searchForm.fpkPigfenid = e[0].id
					}else if(this.selectType == 4){  //异常分类
						this.searchForm.yichangfenlei = e[0].name
						this.searchForm.yichangfenleiid = e[0].id
					}else if(this.selectType == 5){  //颜色
						this.searchForm.color = e[0].name
						this.searchForm.colorid = e[0].id
					}else if(this.selectType == 6){  //执行人
						this.searchForm.executorper = e[0].name
						this.searchForm.executorperid = e[0].id
					}else if(this.selectType == 7){  //责任人
						this.searchForm.zerenren = e[0].name
						this.searchForm.fliableperid = e[0].id
					}
				}
			},
			//显示搜索选择器
			selectRP(e) {
				this.list = []
				if(e == 1){  //耳号
					this.selectType = 1
				}else if(e == 2){  //分场
					this.selectType = 2
				}else if(e == 3){  //猪舍
					this.selectType = 3
				}else if(e == 4){  //异常分类
					this.selectType = 4
				}else if(e == 5){  //颜色
					this.selectType = 5
				}else if(e == 6){  //执行人 
					this.selectType = 6
				}else if(e == 7){  //责任人
					this.selectType = 7
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
						_this.getDPEPH(e)  //获取耳号
					}else if(_this.selectType == 2){
						_this.getFC(e)  //获取分场
					}else if(_this.selectType == 3){
						_this.getDS(e)  //获取猪舍
					}else if(_this.selectType == 4){
						_this.getPHYCFL(e)  //获取异常分类
					}else if(_this.selectType == 5){
						_this.getFMYS(e)  //获取颜色
					}else if(_this.selectType == 6){
						_this.getDPZXR(e)  //获取执行人/责任人
					}
				}, 500)
			},
			//获取分场
			getFC(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/FilterselectFenchang/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					fenchang: e,
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
			//获取栋舍
			getDS(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/dongsheFilter/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					dongshe: e,
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
			//获取待配耳号
			getDPEPH(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/erpaiFilter/1/50';
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
							obj.id = ele.PIGID
							obj.name = ele.ERPAIHAO
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取待配上批批次号
			getDPSPPCH(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/piciFilter/1/50';
				//console.log(e);
				let params = {
					picihao: e,
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
			//获取待配执行人
			getDPZXR(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/personFilter/1/50';
				//console.log(e);
				let params = {
					person: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.PERSONID
							obj.name = ele.PERSON
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取分娩耳号
			getFMEPH(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/erhaoFilterE3/1/50';
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
							obj.id = ele.FID
							obj.name = ele.FNUMBER
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取分娩颜色
			getFMYS(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/colorFilter/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					color: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.COLORID
							obj.name = ele.COLOR
							listArr.push(obj)
						})
						_this.list = listArr;
					}
				)
			},
			//获取分娩处理措施
			getFMCLCS(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/handleFunFilter/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					functions: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.FUNCTIONID
							obj.name = ele.FUNCTION
							listArr.push(obj)
						})
						_this.list = listArr;
					}
				)
			},
			//获取配后耳号
			getPHEPH(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/erhaoFilterE2/1/50';
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
							obj.id = ele.ERPAIID
							obj.name = ele.ERPAIHAO
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取配后异常分类
			getPHYCFL(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/yichangFilter/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					yichang: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.YICHANGID
							obj.name = ele.YICHANG
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
				let params = this.searchForm;
				let headers = {};
				//console.log(params)
				common.commRequest(`/TBusAbnormalPigManagement/selectAbnormalPigManagement/${pageNum}/${pageSize}`, params, headers, 'post',
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
							obj.erpaihao = obj.erpaihao ? obj.erpaihao : '-';  //耳牌号
							obj.breedpc = obj.breedpc ? obj.breedpc : '-';  //批次
							obj.yichangfenlei = obj.yichangfenlei ? obj.yichangfenlei : '-';  //异常分类
							obj.executorper = obj.executorper ? obj.executorper : '-';  //执行人
							obj.zerenren = obj.zerenren ? obj.zerenren : '-';  //责任人   
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
			/* *********************************************************************** */
			// 滑动底部加载
			loadMore() {
				let _this = this;
				_this.getDataList(_this.page, 10, true)
				_this.page ++;
			},
			onConfirmPig(){},
			/* ************************时间选择************************************** */
			selectDate(e){
				this.selectDateType = e
				this.$refs.mpvuePicker.show()
			},
			onConfirmDate(e){
				console.log(e)
				if(this.selectDateType == 1){  //开始时间
					this.searchForm.mindate = e.label
				}else {    //结束时间
					this.searchForm.maxdate = e.label
				}
			},
			/* *********************************************************************** */
			// 重置 
			reset(){
				this.searchForm = {
					mindate: '',  //开始时间
					maxdate: '',  //结束时间
					erpaihao: '',  //耳牌号
					erhaoid: '',  //耳牌号id
					fenchang: '',  //分场
					cffieldid: '',  //分场id
					dongshe: '',  //猪舍
					fpkPigfenid: '',  //猪舍id
					yichangfenlei: '',  //异常分类
					yichangfenleiid: '',  //异常分类id
					color: '',     //颜色
					colorid: '',     //颜色id
					executorper: '',   //执行人
					executorperid: '',   //执行人id
					zerenren: '',   //责任人
					liableperid: '',  //责任人id
				}
			},
			// 查询 
			/* *********************查询数据提交*************************** */
			find(){
				//console.log(this.searchForm)
				this.index = 1
				this.page = 2
				this.getDataList(1, 10, false)
				this.$refs.popupRef1.close() // 关闭弹窗  
			},
			/* ************************************************************8 */
			selectPeople(){ // 下拉菜单 
				this.$refs.pigPicker.show()
			},
			showFilter(){
				this.$refs.popupRef1.show();
			},
			rowTapHandler(row) {
				uni.navigateTo({
					url: `/pages/dataCollection/abnormalPig/abnormalPigDetail?id=${row.id}`,
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
	
	.checked{
		    display: flex;
			align-items: center;
			justify-content: space-between;
			.jus-j{
				background-color:#fff;
			}
	}
</style>
