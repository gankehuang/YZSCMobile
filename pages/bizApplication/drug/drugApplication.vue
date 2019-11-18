<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title" :style="{ 'padding-left': statusTitleLeft }">药品申请</view>
				<view v-if="submitStatus" class="status-del" @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/bizApplication/drug/drugAplHistory">历史记录</view>
			</view>
		</view>

		<!-- 内容 -->

		<view class="main">
			<view class="main-wrap" style="padding-top: 130rpx;">
				<!-- 标题 -->
				<view class="editor-title flex ali-c">
					<view class="img">
						<image src="/static/assets/rect.png" mode=""></image>
						<text>基本信息</text>
					</view>
				</view>
				<view class="main-wrap-contetnt" style="margin-bottom: 0;">
					<view class="main-wrap-contetnt-item">
						<!-- 猪只类型 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								猪只类型
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="pigTypeChange" :value="pigTypeIndex" :range="pigTypeArr" range-key="label">
									<view class="picker">
										<view class="uni-input">{{ pigTypeArr[pigTypeIndex].label }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>

						<!-- 申请日期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								申请日期
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectDate">
								<!-- <input type="text" :value="subData.applyDate"  placeholder="请选择日期"/> -->
								<text>{{ subData.applyDate }}</text>
								<image src="../../../static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin: 0rpx 15rpx 0 10rpx;"></image>
							</view>
						</view>

						<!-- 领料类型 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								领料类型
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="applyTypeChange" :value="applyTypeIndex" :range="applyTypeArr" range-key="label">
									<view class="picker">
										<view class="uni-input">{{ applyTypeArr[applyTypeIndex].label }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>

						<!-- 物料类型 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								物料类型
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="materialTypeChange" :value="materialTypeIndex" :range="materialTypeArr" range-key="label">
									<view class="picker">
										<view class="uni-input">{{ materialTypeArr[materialTypeIndex].label }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>

						<!-- 申请库存分场 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								申请库存分场
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="fieldChange" :value="fieldIndex" :range="fieldArr" range-key="label">
									<view class="picker">
										<view class="uni-input">{{ fieldArr[fieldIndex].label }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>

						<!-- 组别 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								组别
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="groupChange" :value="groupIndex" :range="groupArr" range-key="label">
									<view class="picker">
										<view class="uni-input">{{ groupArr[groupIndex].label }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>

						<!-- 单据状态 -->
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								单据状态
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="statusChange" :value="statusIndex" :range="statusArr" range-key="label">
									<view class="picker">
										<view class="uni-input">{{ statusArr[statusIndex].label }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="main">
			<view class="main-wrap" style="padding-top: 0;">
				<!-- 标题 -->
				<view class="editor-title flex ali-c" style="margin: 10rpx 0;">
					<view class="img">
						<image src="/static/assets/rect.png" mode=""></image>
						<text>领用明细</text>
					</view>

					<!-- 按钮  -->
					<view class="submits jus-b">
						<button
							form-type="submit"
							type="primary"
							class="flexc submit-btn"
							style="width: 224rpx; padding: 0 22rpx;"
							@click="jumpPage"
							data-key="导入免疫计划"
							data-jumpurl="/pages/bizApplication/drug/immunizationPlan"
						>
							关联免疫计划
						</button>
						<button
							form-type="submit"
							type="primary"
							class="flexc submit-btn"
							style="width: 152rpx; padding: 0 48rpx; margin-left: 20rpx;"
							@click="jumpPage"
							:data-key="addDataKey"
							:data-jumpurl="addDataJumpurl"
						>
							新增
						</button>
					</view>
				</view>

				<!-- 列表 -->
				<!-- 数据表格 -->
				<view class="data__wrapper"><ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-"></ztable></view>
			</view>
		</view>

		<!-- 按钮  -->
		<view class="submits jus-b"><button form-type="submit" type="primary" class="flexc submit-btn">提交</button></view>

		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"></mpvue-picker>
	</view>
</template>

<script>
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import ztable from '@/components/z-table/z-table';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
// 引入公共请求接口
import common from '../../../utils/common.js';
export default {
	onLoad(e) {
		console.log('onLoad');
		uni.setStorageSync('entry_record_arr', JSON.stringify([]));
		
		this.tools();
	},
	onShow() {
		console.log('onShow');
		let _this = this;
		uni.setStorageSync('entry_record_count','0')
		
		uni.getStorage({
			key: 'entry_record_arr',
			success: function(res) {
				let data = JSON.parse(res.data);
				_this.tableSubmit = data;
				_this.dataReload(data);
			}
		});
	},
	onUnload() {
		console.log('onUnload');
		// 移除临时的分录明细数据
		uni.removeStorage({
			key: 'entry_record_count',
			success: function(res) {
				//console.log('success');
			}
		});
		uni.removeStorage({
			key: 'entry_record_arr',
			success: function(res) {
				//console.log('success');
			}
		});
	},

	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			// 猪只类型
			pigTypeIndex: 0,
			pigTypeArr: [
				{
					value: 1,
					label: '未获取到备选数据'
				}
			],
			// 领料类型
			applyTypeIndex: 0,
			applyTypeArr: [
				{
					value: 1,
					label: '领料'
				},
				{
					value: 2,
					label: '退库'
				}
			],
			//物料类型
			materialTypeIndex: 0,
			materialTypeArr: [
				{
					value: 1,
					label: '药品'
				},
				{
					value: 2,
					label: '疫苗'
				}
			],
			// 申请库存分场
			fieldIndex: 0,
			fieldArr: [
				{
					value: 1,
					label: '这是当前分场'
				}
			],
			//组别
			groupIndex: 0,
			groupArr: [
				{
					value: 1,
					label: '配怀舍'
				},
				{
					value: 2,
					label: '分娩舍'
				},
				{
					value: 3,
					label: '保育舍'
				},
				{
					value: 4,
					label: '生长舍'
				},
				{
					value: 5,
					label: '育肥舍'
				},
				{
					value: 6,
					label: '后备舍'
				},
				{
					value: 7,
					label: '公猪站'
				},
				{
					value: 8,
					label: '测定站'
				},
				{
					value: 9,
					label: '隔离舍'
				}
			],
			//单据状态
			statusIndex: 0,
			statusArr: [
				{
					value: 1,
					label: '保存'
				},
				{
					value: 2,
					label: '提交'
				},
				{
					value: 4,
					label: '审核'
				},
				{
					value: 7,
					label: '关闭'
				}
			],
			date: currentDate,
			neddCheck: false,
			submitStatus: true,
			editStatus: false,
			delcount: '',
			statusTitleLeft: '35%',

			tableSubmit: [],
			tableData: [],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '批次档案',
					key: 'batchArchives',
					width: 150
				},
				{
					title: '配种批次',
					key: 'breedBatch',
					width: 150
				},
				{
					title: '物料名称',
					key: 'material',
					width: 150
				},
				{
					title: '计量单位',
					key: 'measurement',
					width: 150
				},
				{
					title: '申请数量',
					key: 'aplNum',
					width: 150
				},
				{
					title: '当前存栏',
					key: 'current',
					width: 150
				},
				{
					title: '库存数量',
					key: 'stockNum',
					width: 100
				}
			],

			//提交数据
			subData: {
				applyDate: currentDate //申请日期
			}
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},

		// 新增按钮跳转控制
		addDataKey() {
			let addType = this.materialTypeArr[this.materialTypeIndex].value;
			//console.log(addType);

			return addType === 1 ? '药品申请分录新增' : '疫苗申请分录新增';
		},
		addDataJumpurl() {
			let addType = this.materialTypeArr[this.materialTypeIndex].value;
			let pigTypeId = this.pigTypeArr[this.pigTypeIndex].value;
			//console.log(addType);

			return (addType === 1 ? '/pages/bizApplication/drug/drugEntryNew' : '/pages/bizApplication/drug/vaccineEntryNew') + `?pigTypeId=${encodeURIComponent(pigTypeId)}`;
		}
	},
	components: {
		ztable,
		uniIcon,
		mpvuePicker
	},
	methods: {
		// 获取备选数据
		tools() {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};

			// 猪只类型
			let pigType = [];
			common.commRequest(`/CtPigPigDrugApply/selectPigtypeFilter`, {}, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					pigType.push({
						value: getData[i].PIGTYPEID,
						label: getData[i].PIGTYPE
					});
				}
				_this.pigTypeArr = pigType;
			});

			// 申请库存分场
			let fieldArr = [];
			common.commRequest(`/CtPigPigDrugApply/selectKucunFenchangFilter/1/100`, {}, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					_this.fieldArr.push({
						value: getData[i].FENCHANGID,
						label: getData[i].FENCHANG
					});
				}
				//_this.pigTypeArr = pigType;
			});
		},

		//表单提交
		formSubmit(e) {
			console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
		},

		// 选择
		// 猪只类型
		pigTypeChange: function(e) {
			console.log('pigTypePicker发送选择改变，携带值为', e.target.value);
			this.pigTypeIndex = e.target.value;
		},
		// 领料类型
		applyTypeChange: function(e) {
			console.log('applyTypePicker发送选择改变，携带值为', e.target.value);
			this.applyTypeIndex = e.target.value;
		},
		// 物料类型
		materialTypeChange: function(e) {
			console.log('materialTypePicker发送选择改变，携带值为', e.target.value);
			
			//typeIndex: 该值发生变化说明切换了物料类型，重置已新建的领用明细
			let typeIndex = this.materialTypeIndex
			if(typeIndex != e.target.value) {
				uni.setStorageSync('entry_record_arr', JSON.stringify([]));
				uni.setStorageSync('entry_record_count','0');
				
				this.tableData = [];
			}
			
			this.materialTypeIndex = e.target.value;
		},
		// 申请库存分场
		fieldChange: function(e) {
			console.log('fieldPicker发送选择改变，携带值为', e.target.value);
			this.fieldIndex = e.target.value;
		},
		// 组别
		groupChange: function(e) {
			console.log('groupPicker发送选择改变，携带值为', e.target.value);
			this.groupIndex = e.target.value;
		},
		// 单据状态
		statusChange: function(e) {
			console.log('statusPicker发送选择改变，携带值为', e.target.value);
			this.statusIndex = e.target.value;
		},

		// 申请日期
		//显示时间选择框
		selectDate: function() {
			this.$refs.mpvuePicker.show();
		},
		//选择时间确定
		onConfirmDate: function(e) {
			console.log(e.label);
			this.subData.applyDate = e.label;
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
		// 取出列表展示的数据
		dataReload(data) {
			let _this = this;
			_this.tableData = [];
			//console.log(JSON.stringify(data));
			for(let i = 0; i < data.length; i++) {
				_this.tableData.push({
					index: i + 1,//data[i].index,
					batchArchives: data[i].batchArchives.name ? data[i].batchArchives.name : '-',
					breedBatch: data[i].breedBatch.name ? data[i].breedBatch.name : '-',
					material: data[i].material.name ? data[i].material.name : '-',
					measurement: data[i].measurement.name ? data[i].measurement.name : '-',
					aplNum: data[i].aplNum != null? data[i].aplNum : '-',
					current: data[i].current != null ? data[i].current : '-',
					stockNum: data[i].stockNum != null ? data[i].stockNum : '-'
				})
			};
			//console.log(JSON.stringify(_this.tableData));
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';

.status-header {
	padding-top: 26rpx;
}

.list-table {
	margin-top: -120px;
}

.main-wrap-contetnt {
	margin-bottom: 0;
}

.editor-title {
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
</style>
