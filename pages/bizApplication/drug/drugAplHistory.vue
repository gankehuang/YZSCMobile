<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title" style="flex: 2; padding-left: 27%;">药品申请历史记录</view>
				<view class="status-del" @click="showFilter">更多查询</view>
				<!-- <view class="more-icon flexc ali-c" @click="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view> -->
			</view>
			<!-- 搜索框 -->
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
				<!-- 单据编号 -->
				<draw-cell title="单据编号">
					<view slot="value" class="bg-gray jus-j">
						<image @click="qr" style="margin: 0;" src="/static/search/qr.png" mode="" class="icon"></image>
						<input type="text" placeholder="请填写单据标号" v-model="searchFormShow.receiptId" />
					</view>
				</draw-cell>
				
				<!-- 申请日期 -->
				<draw-cell title="申请日期">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text>{{ searchFormShow.applyStartDate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate1">
							<text>{{ searchFormShow.applyEndDate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
					<text>-</text>
				</draw-cell>

				<!-- 物料类型 -->
				<draw-cell title="物料类型">
					<view slot="value" class="bg-gray jus-j" @click="selectMaterialType">
						<text>{{ searchFormShow.materialType.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 领料类型 -->
				<draw-cell title="领料类型">
					<view slot="value" class="bg-gray jus-j" @click="selectApplyType">
						<text>{{ searchFormShow.applyType.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 猪只类型 -->
				<draw-cell title="猪只类型">
					<view slot="value" class="bg-gray jus-j" @click="selectPigType">
						<text>{{ searchFormShow.pigType.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 分场 -->
				<draw-cell title="分场">
					<view slot="value" class="bg-gray jus-j" @click="selectField">
						<text>{{ searchFormShow.field.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 物料名称 -->
				<draw-cell title="物料名称">
					<view slot="value" class="bg-gray jus-j" @click="selectMaterial">
						<text>{{ searchFormShow.material.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 行状态 -->
				<draw-cell title="行状态">
					<view slot="value" class="bg-gray jus-j" @click="selectRowStatus">
						<text>{{ searchFormShow.rowStatus.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 单据状态 -->
				<draw-cell title="单据状态" style="padding-bottom: 65px;">
					<view slot="value" class="bg-gray jus-j" @click="selectReceiptStatus">
						<text>{{ searchFormShow.receiptStatus.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<!-- @onCancelDate="onCancel" -->
		
		<!-- 开始日期 -->
		<mpvue-picker
			:deepLength="deepLength"
			:themeColor="themeColor"
			ref="mpvuePicker"
			:pickerValueDefault="[0, 0, 0]"
			mode="dateSelector"
			@onConfirm="onConfirmDate"
		></mpvue-picker>
		<!-- 结束日期 -->
		<mpvue-picker
			:deepLength="deepLength"
			:themeColor="themeColor"
			ref="mpvuePicker1"
			:pickerValueDefault="[0, 0, 0]"
			mode="dateSelector"
			@onConfirm="onConfirmDate1"
		></mpvue-picker>

		<!-- 物料类型 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="materialTypePicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmMaterialType"
			:pickerValueArray="searchForm.materialType"
		></mpvue-picker>

		<!-- 领料类型 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="applyTypePicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmApplyType"
			:pickerValueArray="searchForm.applyType"
		></mpvue-picker>
		
		<!-- 猪只类型 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="pigTypePicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmPigType"
			:pickerValueArray="searchForm.pigType"
		></mpvue-picker>
		
		<!-- 分场 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="fieldPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmField"
			:pickerValueArray="searchForm.field"
		></mpvue-picker>
		
		<!-- 物料名称 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="materialPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmMaterial"
			:pickerValueArray="searchForm.material"
		></mpvue-picker>
		
		<!-- 行状态 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="rowStatusPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmRowStatus"
			:pickerValueArray="searchForm.rowStatus"
		></mpvue-picker>
		
		<!-- 单据状态 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="receiptStatus"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmReceiptStatus"
			:pickerValueArray="searchForm.receiptStatus"
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
	components: {
		ztable,
		popupLayer,
		drawCell,
		mpvuePicker,
		uniIcon,
		uniLoadMore
	},
	data() {
		return {
			recordIndex: 0, // 表格排序
			pageNum: 1, // 页数
			pageSize: 10, // 每页数量
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
			pickerValueDefault: [0], // 默认第几个
			themeColor: '#007AFF', // 下拉框颜色

			searchFormShow: {//  展示的查询表单内容
				receiptId: 'JYLYSQ-20190601-001',
				applyStartDate: timeFormat(new Date(), 'yyyy-MM-dd'),
				applyEndDate: timeFormat(new Date(), 'yyyy-MM-dd'),
				materialType: {
					id: '',
					name: ''
				},
				applyType: {
					id: '',
					name: ''
				},
				pigType: {
					id: '',
					name: ''
				},
				field: {
					id: '',
					name: ''
				},
				material: {
					id: '',
					name: ''
				},
				rowStatus: {
					id: '',
					name: ''
				},
				receiptStatus: {
					id: '',
					name: ''
				}
			},
			//提交的查询表单数据
			searchFormSubmit: {},
			searchForm: {//查询表单备选数据
				receiptId: 'JYLYSQ-20190601-001',//单据编号
				applyStartDate: timeFormat(new Date(), 'yyyy-MM-dd'), // 申请日期
				applyEndDate: timeFormat(new Date(), 'yyyy-MM-dd'), // 申请日期
				// 物料类型
				materialType: [
					{ 
						value: 1,
						label: '药品'
					},{ 
						value: 2,
						label: '疫苗'
					}
				],
				// 领料类型
				applyType: [
					{ 
						value: 1,
						label: '领料'
					},{ 
						value: 2,
						label: '退库'
					}
				],
				// 猪只类型
				pigType: [],
				// 分场
				field: [
					{ 
						value: '01',
						label: '一分场'
					}
				],
				// 物料名称
				material: [
					{ 
						value: '01',
						label: '毛巾'
					}
				],
				materialVaccine: [],
				materialDrug: [],
				
				
				// 行状态： 空 =-1,新增=0,保存=1,提交=2,作废=3,审核=4,下达=5,冻结=6,关闭=7,完工=8,完成=90,发布=10,结案=11,变更中=-2,历史版本=-3
				rowStatus: [
					{
						value: -1,
						label: ''
					},{
						value: 0,
						label: '新增'
					},{ 
						value: 1,
						label: '保存'
					},{ 
						value: 2,
						label: '提交'
					},{
						value: 3,
						label: '作废'
					},{
						value: 4,
						label: '审核'
					},{
						value: 5,
						label: '下达'
					},{
						value: 6,
						label: '冻结'
					},{
						value: 7,
						label: '关闭'
					},{
						value: 8,
						label: '完工'
					},{
						value: 90,
						label: '完成'
					},{
						value: 10,
						label: '发布'
					},{
						value: 11,
						label: '结案'
					},{
						value: -2,
						label: '变更中'
					},{
						value: -3,
						label: '历史版本'
					}
				],
				// 单据状态
				receiptStatus: [
					{ 
						value: 1,
						label: '保存'
					},{ 
						value: 2,
						label: '提交'
					},{ 
						value: 4,
						label: '审核'
					},{ 
						value: 7,
						label: '关闭'
					}
				]
			},
			showRigth: false,
			showLeft: false,
			// 表格数据
			tableData: [],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '药品名称',
					key: 'drugName',
					width: 150
				},
				{
					title: '申请数量',
					key: 'applyNum',
					width: 150
				},
				{
					title: '药品类型',
					key: 'drugType',
					width: 150
				},
				{
					title: '申请日期',
					key: 'applyDate',
					width: 150
				},
				{
					title: '分场',
					key: 'field',
					width: 200
				},
				{
					title: '猪只类型',
					key: 'pigType',
					width: 150
				},
				{
					title: '免疫项目',
					key: 'immunizationItem',
					width: 100
				}
			]
		};
	},
	methods: {
		// 获取查询数据
		tools() {
			var _this = this;
			let headers = {};
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			
			// 猪只类型
			let pigType = [];
			common.commRequest(`/CtPigPigDrugApply/selectPigtypeFilter`, {}, headers, 'get', function(data) {
				let getData = data.data;
				for (let i = 0; i < getData.length; i++) {
					pigType.push({
						value: getData[i].PIGTYPEID,
						label: getData[i].PIGTYPE
					});
				}
				_this.searchForm.pigType = pigType;
			});
			
			// 物料名称（物料类型为疫苗）
			let vaccine = [];
			common.commRequest(`/CtPigPigDrugApply/selectYmlsMaterialnameFilter/1/1000`, {}, headers, 'get', function(data) {
				let getData = data.data;
				for (let i = 0; i < getData.length; i++) {
					vaccine.push({
						value: getData[i].MATERIALID,
						label: getData[i].MATERIALNAME
					});
				}
				_this.searchForm.materialVaccine = vaccine;
			});
			// 物料名称（物料类型为药品）
			let drug = [];
			common.commRequest(`/CtPigPigDrugApply/selectYplsMaterialnameFilter/1/1000`, {}, headers, 'get', function(data) {
				let getData = data.data;
				for (let i = 0; i < getData.length; i++) {
					drug.push({
						value: getData[i].MATERIALID,
						label: getData[i].MATERIALNAME
					});
				}
				_this.searchForm.materialDrug = drug;
			});
		},
		
		// 获取列表数据
		getindex(pageNum, pageSize, isLoad, data) {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			if (data) {
				params = { ...params, ...data };
			}
			//console.log(params);
			common.commRequest(`/CtPigPigDrugApply/selectPigDrugApply/${pageNum}/${pageSize}`, params, headers, 'post', function(data) {
				//console.log(data)
				let getData = data.data.list;
				if (isLoad) {
					let oldData = _this.tableData;
					let loadData = [];
					if (getData.length == 0) {
						_this.loadingType = 2;
						return;
					}
					for (var i = 0; i < getData.length; i++) {
						loadData.push({
							id: getData[i].fid,
							index: ++_this.recordIndex,
							drugName: getData[i].drugname ? getData[i].drugname : '-', // 药品名称
							applyNum: getData[i].cfqty != null ? getData[i].cfqty : '-', // 申请数量
							drugType: getData[i].drugtype ? getData[i].drugtype : '-', // 药品类型
							applyDate: getData[i].fbizdate ? timeFormat(getData[i].fbizdate, 'yyyy-MM-dd') : '-', // 申请日期
							field: getData[i].fenchang ? getData[i].fenchang : '-', // 分场
							pigType: getData[i].pigtype ? getData[i].pigtype : '-', // 猪只类型
							immunizationItem: getData[i].mianyixiangmu ? getData[i].mianyixiangmu : '-', // 免疫项目
						});
					}
					_this.tableData = loadData;
					uni.stopPullDownRefresh();
				} else {
					// console.log(JSON.stringify(getData));
					for (var i = 0; i < getData.length; i++) {
						_this.tableData.push({
							id: getData[i].fid,
							index: ++_this.recordIndex,
							drugName: getData[i].drugname ? getData[i].drugname : '-', // 药品名称
							applyNum: getData[i].cfqty != null ? getData[i].cfqty : '-', // 申请数量
							drugType: getData[i].drugtype ? getData[i].drugtype : '-', // 药品类型
							applyDate: getData[i].fbizdate ? timeFormat(getData[i].fbizdate, 'yyyy-MM-dd') : '-', // 申请日期
							field: getData[i].fenchang ? getData[i].fenchang : '-', // 分场
							pigType: getData[i].pigtype ? getData[i].pigtype : '-', // 猪只类型
							immunizationItem: getData[i].mianyixiangmu ? getData[i].mianyixiangmu : '-', // 免疫项目
						});
					}
				}
				_this.loadingType = 0;
			});
		},
		
		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.loadingType = 1;
			this.getindex(++this.pageNum, this.pageSize, false, _this.searchFormSubmit);
		},
		
		onConfirmMaterialType(e) {
			// 物料类型
			const _this = this;
			_this.searchFormShow.materialType.name = e.label;
			_this.searchFormShow.materialType.id = e.value[0];
			
			//重置物料名称
			_this.searchFormShow.material.name = '';
			_this.searchFormShow.material.id = '';
			//判断物料类型
			if(e.value[0] === 1) {
				//药品
				_this.searchForm.material = _this.searchForm.materialDrug;
			} else {
				//疫苗
				_this.searchForm.material = _this.searchForm.materialVaccine;
			};
		},
		onConfirmApplyType(e) {
			// 领料类型
			const _this = this;
			_this.searchFormShow.applyType.name = e.label;
			_this.searchFormShow.applyType.id = e.value[0];
		},
		onConfirmPigType(e) {
			// 猪只类型
			const _this = this;
			_this.searchFormShow.pigType.name = e.label;
			_this.searchFormShow.pigType.id = e.value[0];
		},
		onConfirmField(e) {
			// 分场
			const _this = this;
			_this.searchFormShow.field.name = e.label;
			_this.searchFormShow.field.id = e.value[0];
		},
		onConfirmMaterial(e) {
			// 存栏位置
			const _this = this;
			_this.searchFormShow.material.name = e.label;
			_this.searchFormShow.material.id = e.value[0];
		},
		onConfirmRowStatus(e) {
			// 行状态
			const _this = this;
			_this.searchFormShow.rowStatus.name = e.label;
			_this.searchFormShow.rowStatus.id = e.value[0];
		},
		onConfirmReceiptStatus(e) {
			// 单据状态
			const _this = this;
			_this.searchFormShow.receiptStatus.name = e.label;
			_this.searchFormShow.receiptStatus.id = e.value[0];
		},
		onConfirmDate(e) {
			// 开始时间
			const _this = this;
			_this.searchFormShow.applyStartDate = e.label;
		},
		onConfirmDate1(e) {
			// 结束时间
			const _this = this;
			_this.searchFormShow.applyEndDate = e.label;
		},
		
		selectDate() {
			this.$refs.mpvuePicker.show();
		},
		selectDate1() {
			this.$refs.mpvuePicker1.show();
		},
		
		// 重置
		reset() {
			this.searchFormShow.receiptId = 'JYLYSQ-20190601-001';//单据编号
			this.searchFormShow.applyStartDate = timeFormat(new Date(), 'yyyy-MM-dd');
			this.searchFormShow.applyEndDate = timeFormat(new Date(), 'yyyy-MM-dd');
			this.searchFormShow.materialType.id = '';
			this.searchFormShow.materialType.name = '';
			this.searchFormShow.applyType.id = '';
			this.searchFormShow.applyType.name = '';
			this.searchFormShow.pigType.id = '';
			this.searchFormShow.pigType.name = '';
			this.searchFormShow.field.id = '';
			this.searchFormShow.field.name = '';
			this.searchFormShow.material.id = '';
			this.searchFormShow.material.name = '';
			this.searchFormShow.rowStatus.id = '';
			this.searchFormShow.rowStatus.name = '';
			this.searchFormShow.receiptStatus.id = '';
			this.searchFormShow.receiptStatus.name = '';
		},
		
		// 查询
		find() {
			let _this = this;
			_this.$refs.popupRef1.close(); // 关闭弹窗
			_this.pageNum = 1;
			_this.recordIndex = 0;
			_this.loadingType = 1;
			//准备提交的数据
			_this.searchFormSubmit = {
				//单据编号
				mindate: _this.searchFormShow.applyStartDate,//申请日期（开始）
				maxdate: _this.searchFormShow.applyEndDate,//申请日期（结束）
				cfmaterialtype: _this.searchFormShow.materialType.id,//物料类型id
				//lingliaotype: _this.searchFormShow.applyType.id,//领料类型id 暂无数据
				cfpigtypeid: _this.searchFormShow.pigType.id,//猪只类型id
				//分场
				cfmaterialnumid: _this.searchFormShow.material.id,//物料名称id
				fbasestatus: _this.searchFormShow.rowStatus.id,//行状态id
				danjuzhuangtai: _this.searchFormShow.receiptStatus.id//单据状态id
			};
			console.log(_this.searchFormSubmit);
			this.getindex(this.pageNum, this.pageSize, true, _this.searchFormSubmit);
		}, 
		
		selectMaterialType() {
			// 物料类型
			this.$refs.materialTypePicker.show();
		},
		selectApplyType() {
			// 领料类型
			this.$refs.applyTypePicker.show();
		},
		selectPigType() {
			// 猪只类型
			this.$refs.pigTypePicker.show();
		},
		selectField() {
			// 分场
			this.$refs.fieldPicker.show();
		},
		selectMaterial() {
			// 物料名称
			this.$refs.materialPicker.show();
		},
		selectRowStatus() {
			// 行状态
			this.$refs.rowStatusPicker.show();
		},
		selectReceiptStatus() {
			// 检测工具
			this.$refs.receiptStatus.show();
		},
		
		// 打开弹窗
		showFilter() {
			this.$refs.popupRef1.show();
		},
		
		// 列表项链接
		rowTapHandler(row) {
			console.log('将链接到：药品申请记录')
			 uni.navigateTo({
				url: `/pages/bizApplication/drug/drugAplDetail?id=${encodeURIComponent(row.id)}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			}); 
		}
	},
	onLoad: function(options) {
		this.active = !this.active;
		this.loadingType = 1;
		this.getindex(this.pageNum, this.pageSize, false);
		this.tools();
	},
	// 下拉刷新
	onPullDownRefresh() {
		let _this = this;
		this.pageNum = 1;
		this.recordIndex = 0;
		this.getindex(this.pageNum, this.pageSize, true, _this.searchFormSubmit);
		console.log('下拉刷新');
	},
	// 上拉加载
	onReachBottom() {
		console.log('上拉加载');
		//this.loadMore();
	},
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
