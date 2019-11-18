<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title" :style="{ 'padding-left': statusTitleLeft }">关联发货单</view>
				<view class="more-icon flexc ali-c" @click="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
			</view>
		</view>

		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap" style="padding-top: 130rpx; padding-bottom: 50rpx;">
				<view class="main-wrap-contetnt" style="margin: 20rpx 0 0; padding-bottom: 120rpx;" v-for="item in recordArr" :key="item.id">
					<view class="main-wrap-contetnt-item">
						<!-- 单据号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								单据号
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.receiptId" placeholder="" :disabled="flag" /></view>
						</view>

						<!-- 发货日期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								发货日期
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.sendDate" placeholder="" :disabled="flag" /></view>
						</view>

						<!-- 供应商 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								供应商
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.supplier" placeholder="" :disabled="flag" /></view>
						</view>

						<!-- 单据状态 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								单据状态
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.receiptStatus" placeholder="" :disabled="flag" /></view>
						</view>

						<button type="primary" class="link-btn">关联</button>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 弹窗 -->
		<popup-layer ref="popupRef1" :direction="'left'" :class="{ active: active }">
			<scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
				
				<!-- 发货日期 -->
				<draw-cell title="发货日期">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text>{{ searchFormSubmit.sendStartDate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate1">
							<text>{{ searchFormSubmit.sendEndDate }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
					<text>-</text>
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
				
				<!-- 供应商 -->
				<draw-cell title="供应商">
					<view slot="value" class="bg-gray jus-j" @click="selectSupplier">
						<text>{{ searchFormSubmit.supplier.name }}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		
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
		<!-- 物料名称 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="materialPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmMaterial"
			:pickerValueArray="searchForm.material"
		></mpvue-picker>
		<!-- 供应商 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="supplierPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmSupplier"
			:pickerValueArray="searchForm.supplier"
		></mpvue-picker>

	</view>
</template>

<script>

//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import ztable from '@/components/z-table/z-table';
//引入下拉框
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
// 引入公共请求接口
import common from '../../../utils/common.js';
// 引入弹框组件
import popupLayer from '@/components/popup/popup-layer.vue';
//引入抽屉单元格组件
import drawCell from '@/components/uni-cell/draw-cell.vue';
//引入时间转换
import { timeFormat } from '@/utils/dateUtils.js';

export default {
	onLoad: function(options) {
		this.active = !this.active;
		this.loadingType = 1;
		
		//this.tools()
		this.addItem();
		this.addItem();
		this.addItem();
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			active: true,
			flag: false,
			index: 0,
			date: currentDate,
			neddCheck: false,
			submitStatus: true,
			editStatus: false,
			statusTitleLeft: '20px',
			
			recordNum: 0,
			recordArr: [],
			
			deepLength: 1,
			pickerValueDefault: [0], // 默认第几个
			themeColor: '#007AFF', // 下拉框颜色
			
			// 展示/提交 的查询表单内容
			searchFormSubmit: {
				sendStartDate: timeFormat(new Date(), 'yyyy-MM-dd'),
				sendEndDate: timeFormat(new Date(), 'yyyy-MM-dd'),
				materialType: {
					id: '',
					name: ''
				},
				material: {
					id: '',
					name: ''
				},
				supplier: {
					id: '',
					name: ''
				}
			},
			// 查询表单中供选择的数据
			searchForm: {
				sendStartDate: timeFormat(new Date(), 'yyyy-MM-dd'), // 发货开始日期
				sendEndDate: timeFormat(new Date(), 'yyyy-MM-dd'), // 发货结束日期
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
				// 供应商
				supplier: [
					{ 
						value: '01',
						label: '兽药仓库'
					},{ 
						value: '02',
						label: '低值仓库'
					}
				]
			},
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	components: {
		ztable,
		uniIcon,
		mpvuePicker,
		drawCell,
		popupLayer
	},
	methods: {
		tools() {
			var _this = this;
			let headers = {};
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};

			let picker = []; // 配种批次
			let planNum = 0; // 计划配种数
			let totalNum = 0; // 累计配种数

			common.commRequest(`/PigMatingRecord/selectBreedPici/1/5`, params, headers, 'get', function(data) {
				let getData = data.data.list;
				console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					picker.push({
						value: getData[i].boxid,
						label: getData[i].boxname
					});
				}
				_this.breedBatchArr = picker;

			});
		},

		//表单提交
		formSubmit(e) {
			console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		},

		//显示时间选择框
		// 开始时间
		selectDate() {
			this.$refs.mpvuePicker.show();
		},
		// 结束时间
		selectDate1() {
			this.$refs.mpvuePicker1.show();
		},
		// 选择时间确认
		onConfirmDate(e) {
			// 开始时间
			const _this = this;
			_this.searchFormSubmit.sendStartDate = e.label;
		},
		onConfirmDate1(e) {
			// 结束时间
			const _this = this;
			_this.searchFormSubmit.sendEndDate = e.label;
		},
		
		// 选择物料类型
		selectMaterialType() {
			this.$refs.materialTypePicker.show();
		},
		// 选择物料类型确认
		onConfirmMaterialType(e) {
			const _this = this;
			_this.searchFormSubmit.materialType.name = e.label;
			_this.searchFormSubmit.materialType.id = e.value[0];
		},
		
		// 选择物料名称
		selectMaterial() {
			this.$refs.materialPicker.show();
		},
		// 选择物料名称确认
		onConfirmMaterial(e) {
			const _this = this;
			_this.searchFormSubmit.material.name = e.label;
			_this.searchFormSubmit.material.id = e.value[0];
		},
		
		// 选择供应商
		selectSupplier() {
			this.$refs.supplierPicker.show();
		},
		// 选择供应商确认
		onConfirmSupplier(e) {
			const _this = this;
			_this.searchFormSubmit.supplier.name = e.label;
			_this.searchFormSubmit.supplier.id = e.value[0];
		},
		
		// 重置查询弹窗
		reset() {
			this.searchFormSubmit.sendStartDate = timeFormat(new Date(), 'yyyy-MM-dd');
			this.searchFormSubmit.sendEndDate = timeFormat(new Date(), 'yyyy-MM-dd');
			this.searchFormSubmit.materialType.id = '';
			this.searchFormSubmit.materialType.name = '';
			this.searchFormSubmit.material.id = '';
			this.searchFormSubmit.material.name = '';
			this.searchFormSubmit.supplier.id = '';
			this.searchFormSubmit.supplier.name = '';
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
		
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		clickEdit() {
			this.neddCheck = true;
			this.editStatus = true;
			this.submitStatus = false;
			this.statusTitleLeft = 0;
		},
		clickCancel() {
			this.neddCheck = false;
			this.editStatus = false;
			this.submitStatus = true;
			this.statusTitleLeft = '35%';
		},
		
		//加载项目
		addItem() {
			let _this = this;
			let recordNum = ++_this.recordNum;
			
			console.log('加载第 '+ recordNum +' 条记录。')
			_this.recordArr.push({
				id: recordNum,
				index: recordNum,
				receiptId: 'FHS6494198416',
				sendDate: '2019-01-01',
				supplier: '武汉某某公司',
				receiptStatus: '已审核'
			});
		},
		
		// 打开查询弹窗
		showFilter() {
			this.$refs.popupRef1.show();
		},
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';

.status-header {
	padding-top: 26rpx;
}

.list-table {
	margin-top: -240rpx;
}

.main-wrap-contetnt-item {
	position: relative;
}

.editor-title {
	// 标题
	display: flex;
	justify-content: space-between;

	height: 90rpx;
	.img {
		line-height: 44rpx;
		image {
			width: 12rpx;
			height: 12rpx;
			vertical-align: middle;
		}
	}
	text {
		margin-left: 14rpx;
		line-height: 44rpx;
		font-size: 32rpx;
	}

	.submits {
		.submit-btn {
			font-size: 28rpx;
			height: 64rpx;
		}
	}
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

.link-btn {
	position: absolute;
	right: 0;

	height: 64rpx;
	width: 180rpx;
	border: 2rpx solid #cacfd9;
	margin-top: 32rpx;
	border-radius: 32rpx;

	background-color: #4684EA;
	color: #FFFFFF;
	line-height: 60rpx;
	font-size: 28rpx;
}
</style>
