<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title" style="flex: 2; padding-left: 27%;">采购入库历史记录</view>
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
						<input type="text" placeholder="请填写单据标号" v-model="searchFormSubmit.receiptId" />
					</view>
				</draw-cell>
				
				<!-- 入库日期 -->
				<draw-cell title="入库日期">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text>{{ searchFormSubmit.warehouseStartDate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate1">
							<text>{{ searchFormSubmit.warehouseEndDate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
					<text>-</text>
				</draw-cell>
				
				<!-- 业务类型 -->
				<draw-cell title="业务类型">
					<view slot="value" class="bg-gray jus-j" @click="selectBizType">
						<text>{{ searchFormSubmit.bizType.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>

				<!-- 物料类型 -->
				<draw-cell title="物料类型">
					<view slot="value" class="bg-gray jus-j" @click="selectMaterialType">
						<text>{{ searchFormSubmit.materialType.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 物料名称 -->
				<draw-cell title="物料名称">
					<view slot="value" class="bg-gray jus-j" @click="selectMaterial">
						<text>{{ searchFormSubmit.material.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 仓库 -->
				<draw-cell title="仓库">
					<view slot="value" class="bg-gray jus-j" @click="selectWareroom">
						<text>{{ searchFormSubmit.wareroom.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
				<!-- 单据状态 -->
				<draw-cell title="单据状态" style="padding-bottom: 65px;">
					<view slot="value" class="bg-gray jus-j" @click="selectReceiptStatus">
						<text>{{ searchFormSubmit.receiptStatus.name }}</text>
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

		<!-- 业务类型 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="bizTypePicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmbizType"
			:pickerValueArray="searchForm.bizType"
		></mpvue-picker>
		
		<!-- 仓库 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="wareroomPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmwareroom"
			:pickerValueArray="searchForm.wareroom"
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
	// 下拉刷新
	onPullDownRefresh() {
		let _this = this;
		this.pageNum = 1;
		this.idNum = 0;
		//this.getindex(this.pageNum, this.pageSize, true);
		console.log('下拉刷新');
	},
	// 上拉加载
	onReachBottom() {
		console.log('上拉加载');
		//this.loadMore();
	},
	onLoad: function(options) {
		this.active = !this.active;
		this.loadingType = 1;
		//this.getindex(this.pageNum, this.pageSize, false);
		//this.tools();
	},
	data() {
		return {
			idNum: 0, // 表格排序
			pageNum: 1, // 页数
			pageSize: 10, // 每页数量
			items: [
				// 异常原因
			],
			itemsId: '',
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

			searchFormSubmit: {//  展示/提交 的查询表单内容
				receiptId: 'JYLYSQ-20190601-001',
				warehouseStartDate: timeFormat(new Date(), 'yyyy-MM-dd'),
				warehouseEndDate: timeFormat(new Date(), 'yyyy-MM-dd'),
				bizType: {
					id: '',
					name: ''
				},
				materialType: {
					id: '',
					name: ''
				},
				material: {
					id: '',
					name: ''
				},
				wareroom: {
					id: '',
					name: ''
				},
				receiptStatus: {
					id: '',
					name: ''
				}
			},
			searchForm: {
				receiptId: 'JYLYSQ-20190601-001',//单据编号
				warehouseStartDate: timeFormat(new Date(), 'yyyy-MM-dd'), // 申请日期
				warehouseEndDate: timeFormat(new Date(), 'yyyy-MM-dd'), // 申请日期
				// 业务类型
				bizType: [
					{ 
						value: '01',
						label: '兽药'
					},{ 
						value: '02',
						label: '饲料'
					}
				],
				// 物料类型
				materialType: [
					{ 
						value: '01',
						label: '疫苗'
					},{ 
						value: '02',
						label: '药品'
					}
				],
				// 物料名称
				material: [
					{ 
						value: '01',
						label: '870'
					}
				],
				// 仓库
				wareroom: [
					{ 
						value: '01',
						label: '兽药仓库'
					},{ 
						value: '02',
						label: '低值仓库'
					}
				],
				// 单据状态
				receiptStatus: [
					{ 
						value: '01',
						label: '保存'
					},{ 
						value: '02',
						label: '提交'
					},{ 
						value: '03',
						label: '审核'
					}
				]
			},
			showRigth: false,
			showLeft: false,
			// 表格数据
			tableData: [
				{
					id: '01',
					index: '01',
					materialName: '安定痛',
					batchId: 'LY99143',
					warehouseNum: '10',
					measurement: '瓶',
					warehouseDate: '2019-06-13',
					model: '药品',
					warehouseAmount: '-',
					acceptanceInfo: '-',
					receiptId:'-'
				},{
					id: '02',
					index: '02',
					materialName: '蓝耳',
					batchId: 'LY99143',
					warehouseNum: '10',
					measurement: '瓶',
					warehouseDate: '2019-06-13',
					model: '疫苗',
					warehouseAmount: '-',
					acceptanceInfo: '-',
					receiptId:'-'
				}
			],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '物料名称',
					key: 'materialName',
					width: 150
				},
				{
					title: '批次号',
					key: 'batchId',
					width: 150
				},
				{
					title: '入库数量',
					key: 'warehouseNum',
					width: 150
				},
				{
					title: '单位',
					key: 'measurement',
					width: 150
				},
				{
					title: '入库日期',
					key: 'warehouseDate',
					width: 200
				},
				{
					title: '规格型号',
					key: 'model',
					width: 150
				},
				{
					title: '入库金额',
					key: 'warehouseAmount',
					width: 100
				},
				{
					title: '验收说明',
					key: 'acceptanceInfo',
					width: 100
				},
				{
					title: '单据号',
					key: 'receiptId',
					width: 100
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
		// 获取查询数据
		/* tools() {
			var _this = this;
			let headers = {};
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cfwareroomid: 'Va4AAAAYuCGdu1vk' // 仓库
			};
			// 检测工具

			let picker = [];
			common.commRequest(`/PigAbnormalPregRecord/selectJcTools/1/1`, params, headers, 'get', function(data) {
				let getData = data.data.list;
				for (let i = 0; i < getData.length; i++) {
					picker.push({
						value: getData[i].cftulnm,
						label: getData[i].jctoolname
					});
				}
				_this.pickerValueArray1 = picker;
			});
		}, */
		
		// 获取列表数据
		/* getindex(pageNum, pageSize, isLoad, data) {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cfwareroomid: 'Va4AAAAYuCGdu1vk' // 仓库
			};
			if (data) {
				params = { ...params, ...data };
			}
			console.log(params);
			common.commRequest(`/PigAbnormalPregRecord/selectAll/${pageNum}/${pageSize}`, params, headers, 'post', function(data) {
				// console.log(data)
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
							index: ++_this.idNum, // 序号
							jcrq: timeFormat(getData[i].fbizdate, 'yyyy-MM-dd') ? timeFormat(getData[i].fbizdate, 'yyyy-MM-dd') : '-', // 检测日期
							jcry: getData[i].jcyname ? getData[i].jcyname : '-', // 检测人员 1
							
						});
					}
					_this.tableData = loadData;
					uni.stopPullDownRefresh();
				} else {
					// console.log(JSON.stringify(getData));
					for (var i = 0; i < getData.length; i++) {
						_this.tableData.push({
							id: getData[i].fid,
							index: ++_this.idNum, // 序号
							jcrq: timeFormat(getData[i].fbizdate, 'yyyy-MM-dd') ? timeFormat(getData[i].fbizdate, 'yyyy-MM-dd') : '-', // 检测日期
							jcry: getData[i].jcyname ? getData[i].jcyname : '-', // 检测人员 1
							
						});
					}
				}
				_this.loadingType = 0;
			});
		}, */
		
		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.loadingType = 1;
			//this.getindex(++this.pageNum, this.pageSize, false);
		},
		
		onConfirmMaterialType(e) {
			// 物料类型
			const _this = this;
			_this.searchFormSubmit.materialType.name = e.label;
			_this.searchFormSubmit.materialType.id = e.value[0];
		},
		onConfirmbizType(e) {
			// 业务类型
			const _this = this;
			_this.searchFormSubmit.bizType.name = e.label;
			_this.searchFormSubmit.bizType.id = e.value[0];
		},
		onConfirmwareroom(e) {
			// 仓库
			const _this = this;
			_this.searchFormSubmit.wareroom.name = e.label;
			_this.searchFormSubmit.wareroom.id = e.value[0];
		},
		onConfirmMaterial(e) {
			// 物料名称
			const _this = this;
			_this.searchFormSubmit.material.name = e.label;
			_this.searchFormSubmit.material.id = e.value[0];
		},
		onConfirmReceiptStatus(e) {
			// 单据状态
			const _this = this;
			_this.searchFormSubmit.receiptStatus.name = e.label;
			_this.searchFormSubmit.receiptStatus.id = e.value[0];
		},
		onConfirmDate(e) {
			// 开始时间
			const _this = this;
			_this.searchFormSubmit.warehouseStartDate = e.label;
		},
		onConfirmDate1(e) {
			// 结束时间
			const _this = this;
			_this.searchFormSubmit.warehouseEndDate = e.label;
		},
		
		selectDate() {
			this.$refs.mpvuePicker.show();
		},
		selectDate1() {
			this.$refs.mpvuePicker1.show();
		},
		
		// 重置
		reset() {
			this.searchFormSubmit.receiptId = 'JYLYSQ-20190601-001';//单据编号
			this.searchFormSubmit.warehouseStartDate = timeFormat(new Date(), 'yyyy-MM-dd');
			this.searchFormSubmit.warehouseEndDate = timeFormat(new Date(), 'yyyy-MM-dd');
			this.searchFormSubmit.materialType.id = '';
			this.searchFormSubmit.materialType.name = '';
			this.searchFormSubmit.bizType.id = '';
			this.searchFormSubmit.bizType.name = '';
			this.searchFormSubmit.wareroom.id = '';
			this.searchFormSubmit.wareroom.name = '';
			this.searchFormSubmit.material.id = '';
			this.searchFormSubmit.material.name = '';
			this.searchFormSubmit.rowStatus.id = '';
			this.searchFormSubmit.rowStatus.name = '';
			this.searchFormSubmit.receiptStatus.id = '';
			this.searchFormSubmit.receiptStatus.name = '';
		},
		
		// 查询
		 find() {
			this.$refs.popupRef1.close(); // 关闭弹窗
			this.pageNum = 1;
			this.idNum = 0;
			this.loadingType = 1;
			/* let data = {
				jcyname: this.searchForm.vaccineName.id, // 检测员
				
			};
			// console.log(data)
			this.getindex(this.pageNum, this.pageSize, false, data); */
		}, 
		
		selectMaterialType() {
			// 物料类型
			this.$refs.materialTypePicker.show();
		},
		selectBizType() {
			// 业务类型
			this.$refs.bizTypePicker.show();
		},
		selectWareroom() {
			// 仓库
			this.$refs.wareroomPicker.show();
		},
		selectMaterial() {
			// 物料名称
			this.$refs.materialPicker.show();
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
				//url: `/pages/dataCollection/pregnancyRecord/pregnancyAudit?id=${row.id}`,
				url: `/pages/bizApplication/drug/drugAplDetail?id=${row.id}`,
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
