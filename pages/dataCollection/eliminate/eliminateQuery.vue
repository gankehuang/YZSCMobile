<template>
	<view>
		<!-- 这里是状态栏 --> 
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">淘汰申请查询</view>
				<view class="more-icon flexc ali-c" @click="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
			</view>
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

				<draw-cell title="淘汰原因" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{ searchForm.vaccineName.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>

				<draw-cell title="猪只类型" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople1">
						<text>{{ searchForm.vaccineName1.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>

				<!-- 是否标准内淘汰 -->
				<draw-cell title="是否标准内淘汰" required="true">
					<view slot="value" class="bg-gray jus-j" style="background: #fff;"><checkbox @click='change' value="cb" /></view>
				</draw-cell>

				<draw-cell title="在场状态" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople2">
						<text>{{ searchForm.vaccineName2.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>

				<draw-cell title="分场" required="true">
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请填写" v-model="searchForm.vaccineName3" />
					</view>
				</draw-cell>
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<mpvue-picker  :deepLength="deepLength"  :themeColor="themeColor" ref="mpvuePicker" :pickerValueDefault="[0,0,0]" mode="dateSelector" @onConfirm="onConfirmDate" 
		 ></mpvue-picker> 
		 <mpvue-picker  :deepLength="deepLength"  :themeColor="themeColor" ref="mpvuePicker1" :pickerValueDefault="[0,0,0]" mode="dateSelector" @onConfirm="onConfirmDate1" 
		  ></mpvue-picker> 
		  
		
		<!-- 淘汰原因 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmPig"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
		<!-- 猪只类型 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker1"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmPig1"
			:pickerValueArray="pickerValueArray1"
		></mpvue-picker>
		<!-- 在场状态 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigPicker2"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmPig2"
			:pickerValueArray="pickerValueArray2"
		></mpvue-picker>
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
			title1: '', // 耳牌 
			stringList1: [['apple2','apple22']], // 耳牌 
			falg:false,
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
			pickerValueArray: [ //淘汰原因
				// { value: '1111', label: '三泉A区' },
				// { value: '1111', label: '三泉B区' },
				// { value: '1111', label: '三泉C区' },
				// { value: '1111', label: '三泉D区' },
				// { value: '1111', label: '三泉E区' }
			],
			pickerValueArray1: [ //猪只类型
				// { value: '1111', label: '三泉A区' },
				// { value: '1111', label: '三泉B区' },
				// { value: '1111', label: '三泉C区' },
				// { value: '1111', label: '三泉D区' },
				// { value: '1111', label: '三泉E区' }
			],
			pickerValueArray2: [ //在场状态
				{ value: '1', label: '在场' },
				{ value: '2', label: '调出离场' },
				{ value: '3', label: '离场' },
				{ value: '4', label: '死亡离场' },
				{ value: '5', label: '销售离场' },
				{ value: '6', label: '淘汰在场' },
				{ value: '7', label: '淘汰离场' },
				{ value: '8', label: '盘点离场' },
				{ value: '9', label: '调出在场' }
			],
			searchForm: {
				businessStartTime: "",
				businessEndTime: "",
				vaccineName:{ //淘汰原因
					id:'',
					name:''
				},
				vaccineName1:{ //猪只类型
					id:'',
					name:''
				},
				vaccineName2:{ //在场状态
					id:'',
					name:''
				},
				vaccineName3:'一分场' //  分场  
			},
			showRigth: false,
			showLeft: false,
			tableData: [
				// {
				// 	id: '1,null,null,4,5,6,7',
				// 	index: '01', //耳牌
				// 	jcrq: '上午', //耳牌
				// 	jcry: '2', //胎次
				// 	jcgg: 'D0001', //淘汰状态
				// 	sowcard: 'Y001', //淘汰原因
				// 	ycyy: 'xx', //存栏位置
				// 	pzpc: 'xx', //猪只类型
				// 	zt: 'xx', //均重
				// 	clwz: 'xx' //状态
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
					key: 'jcrq',
					width: 150
				},
				{
					title: '胎次',
					key: 'jcry',
					width: 150
				},
				{
					title: '淘汰状态',
					key: 'jcgg',
					width: 150
				},
				{
					title: '淘汰原因',
					key: 'sowcard',
					width: 250
				},
				{
					title: '存栏位置',
					key: 'ycyy',
					width: 300
				},
				{
					title: '猪只类型',
					key: 'pzpc',
					width: 150
				},
				{
					title: '均重',
					key: 'zt',
					width: 100
				},
				{
					title: '状态',
					key: 'clwz',
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
		strAutocomplete
	},

	methods: {
		selectOne1(opt) {  //输入提示框选择
			this.title1 = opt
		    // console.log(opt)
		},
		tools(){
			var _this = this;
			let headers = {};
				// 淘汰原因 
			
				let picker = []
					common.commRequest(`/PigWeedApply/selectWeedReason/1/1000`, {}, headers,'get',
						function(data) {
							// console.log(data)
							let getData = data.data;
								for (let i = 0; i < getData.length; i++) {
									picker.push({
										'value':getData[i].WEEDREASONID,
										'label':getData[i].WEEDREASON
									})
								}
								_this.pickerValueArray = picker
					})
					
				 // 猪只类型
				let picker1 = []
						common.commRequest(`/PigWeedApply/selectPigType/1/10`, {}, headers,'get',
							function(data) {
								// console.log(data)
								let getData = data.data.list;
									for (let i = 0; i < getData.length; i++) {
										picker1.push({
											'value':getData[i].boxid,
											'label':getData[i].boxname
										})
									}
									_this.pickerValueArray1 = picker1
						})
						
						// 耳牌号
						let picker2 = [[],[]]
							common.commRequest(`/PigWeedApply/selectErpaiFilter/1/100`, {cfpigfarmid: 'Va4AAAAYuCC4/eJt'}, headers,'get',
								function(data) {
									// console.log(data)
									let getData = data.data;
										for (let i = 0; i < getData.length; i++) {
											picker2[0].push(getData[i].ERPAIHAO)
											picker2[1].push(getData[i].PIGID)
										}
										_this.stringList1 = picker2
										// console.log(_this.stringList1)
							})
		
		},
		change(e){
			this.falg = !this.falg
			// console.log(this.falg)
		},
		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.loadingType = 1;
			this.getindex(++this.pageNum,this.pageSize,false)
		},
		getindex(pageNum, pageSize, isLoad,data) {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = { 
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			if(this.searchForm.businessStartTime) params['startdate'] = this.searchForm.businessStartTime // 起始日期
			if(this.searchForm.businessEndTime) params['enddate'] =  this.searchForm.businessEndTime// 结束日期
			if(this.title1) params['erpaiid'] = this.stringList1[1][this.stringList1[0].indexOf(this.title1)]// 耳牌
			if(this.searchForm.vaccineName.name) params['cfelimreasonid'] = this.searchForm.vaccineName.id// 淘汰原因
			if(this.searchForm.vaccineName1.name) params['cfpigtypeid'] = this.searchForm.vaccineName1.id// 猪只类型
			if(this.falg) params['fisweed'] =  this.falg?1:0// 标准内淘汰
			if(this.searchForm.vaccineName2.name) params['zaichangid'] =  this.searchForm.vaccineName2.id// 在场状态 
			if(data){
				params = {...params,...data}
			}
			// console.log(params) 
			common.commRequest(`/PigWeedApply/selectPigWeedApply/${pageNum}/${pageSize}`, params,headers, 'post',
				function(data) {
					// console.log(data)
					let getData = data.data.list;
					if(getData.length == 0){
						_this.loadingType = 2;
						_this.tableData = [] 
						return;
					}
					if(isLoad) {
						let loadData = []
						for (var i = 0; i < getData.length; i++) {
							loadData.push({
								id: `${getData[i].zhuzhitype},${getData[i].fapplicantidname?getData[i].fapplicantidname:'-'},${getData[i].isstandard?getData[i].isstandard:'-'},${getData[i].fid}`,
								index: ++_this.idNum, // 序号
								jcrq: getData[i].erpaihao?getData[i].erpaihao:'-', // 母猪耳牌1
								jcry: getData[i].taici?getData[i].taici:'-', // 胎次 1
								jcgg: getData[i].taotaistate?getData[i].taotaistate:'-', // 淘汰状态1
								sowcard: getData[i].taotaireason?getData[i].taotaireason:'-', // 淘汰原因1
								ycyy: getData[i].clwz?getData[i].clwz:'-', // 存栏位置
								pzpc: getData[i].zhuzhitype?getData[i].zhuzhitype:'-',// 猪只类型  
								zt: getData[i].junzhong?getData[i].junzhong:'-', //均重1
								clwz:getData[i].state?getData[i].state:'-' //状态1
						})
						} 
						_this.tableData = loadData;
						_this.loadingType = 0;
						uni.stopPullDownRefresh();
					}else {
						// console.log(JSON.stringify(getData));
						for (var i = 0; i < getData.length; i++) {
							console.log(`${getData[i].zhuzhitype},${getData[i].fapplicantidname?getData[i].fapplicantidname:'-'},${getData[i].isstandard?getData[i].isstandard:'-'},${getData[i].fid}`) 
							_this.tableData.push({
								id: `${getData[i].zhuzhitype},${getData[i].fapplicantidname?getData[i].fapplicantidname:'-'},${getData[i].isstandard?getData[i].isstandard:'-'},${getData[i].fid}`,
								index: ++_this.idNum, // 序号
								jcrq: getData[i].erpaihao?getData[i].erpaihao:'-', // 母猪耳牌
								jcry: getData[i].taici?getData[i].taici:'-', // 胎次 
								jcgg: getData[i].taotaistate?getData[i].taotaistate:'-', // 淘汰状态
								sowcard: getData[i].taotaireason?getData[i].taotaireason:'-', // 淘汰原因
								ycyy: getData[i].clwz?getData[i].clwz:'-', // 存栏位置
								pzpc: getData[i].zhuzhitype?getData[i].zhuzhitype:'-',// 猪只类型  
								zt: getData[i].junzhong?getData[i].junzhong:'-', //均重
								clwz: getData[i].state?getData[i].state:'-' //状态1
						})
					}
					_this.loadingType = 0;
					}
			})
		},
		onConfirmPig(e) { // 淘汰原因
			const _this = this;
			_this.searchForm.vaccineName.name = e.label;
			_this.searchForm.vaccineName.id = e.value[0];
		},
		onConfirmPig1(e) { // 猪只类型
			const _this = this;
			_this.searchForm.vaccineName1.name = e.label;
			_this.searchForm.vaccineName1.id = e.value[0];
		},
		onConfirmPig2(e) { // 在场状态
			const _this = this;
			_this.searchForm.vaccineName2.name = e.label;
			_this.searchForm.vaccineName2.id = e.value[0];
		},
		// onConfirmPig3(e) { // 分场
		// 	const _this = this;
		// 	_this.searchForm.vaccineName3.name = e.label;
		// 	_this.searchForm.vaccineName3.id = e.value[0];
		// },
		selectPeople() { // 淘汰原因
			this.$refs.pigPicker.show();
		},
		selectPeople1() { // 猪只类型
			this.$refs.pigPicker1.show();
		},
		selectPeople2() { // 在场状态 
			this.$refs.pigPicker2.show();
		},
		selectDate(){
			this.$refs.mpvuePicker.show()
		},
		selectDate1(){
			this.$refs.mpvuePicker1.show()
		},
		// 重置
		reset() {
			this.title1 = '';
			this.searchForm.businessStartTime = '';
			this.searchForm.businessEndTime = '';
			this.searchForm.vaccineName.name=''
			this.searchForm.vaccineName.id=''
			this.searchForm.vaccineName1.name=''
			this.searchForm.vaccineName1.id=''
			this.searchForm.vaccineName2.name=''
			this.searchForm.vaccineName2.id=''
			this.falg = false
		}, 
		// 查询
		find() {
			this.$refs.popupRef1.close(); // 关闭弹窗 
			this.pageNum = 1
			this.idNum = 0 
			this.loadingType = 1;
			
			let data = {} 
			if(this.searchForm.businessStartTime) data['startdate'] = this.searchForm.businessStartTime // 起始日期
			if(this.searchForm.businessEndTime) data['enddate'] =  this.searchForm.businessEndTime// 结束日期
			if(this.title1) data['erpaiid'] = this.stringList1[1][this.stringList1[0].indexOf(this.title1)]// 耳牌
			if(this.searchForm.vaccineName.name) data['cfelimreasonid'] = this.searchForm.vaccineName.id// 淘汰原因
			if(this.searchForm.vaccineName1.name) data['cfpigtypeid'] = this.searchForm.vaccineName1.id// 猪只类型
			if(this.falg) data['fisweed'] =  this.falg?1:0// 标准内淘汰
			if(this.searchForm.vaccineName2.name) data['zaichangid'] =  this.searchForm.vaccineName2.id// 在场状态 
			
			this.getindex(this.pageNum,this.pageSize,true,data)
		},
		showFilter() {
			this.$refs.popupRef1.show();
		},
		rowTapHandler(row) {
			console.log(row.id)
			uni.navigateTo({
				url: `/pages/dataCollection/eliminate/eliminateDetail?id=${row.id}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
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
