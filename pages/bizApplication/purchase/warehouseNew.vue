<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title" :style="{ 'padding-left': statusTitleLeft, 'flex': '2'}">采购入库新增</view>
				<view v-if="submitStatus" class="status-del" @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/bizApplication/purchase/warehouseHistory">历史记录</view>
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
						<!-- 业务类型 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								业务类型
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker name="breedpc" @change="bizTypePickerChange" :value="bizTypeIndex" :range="bizTypeArr" range-key="label">
									<view class="picker">
										<view class="uni-input">{{ bizTypeArr[index] }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>
				
						<!-- 供应商 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								供应商
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker name="breedpc" @change="supplierPickerChange" :value="supplierIndex" :range="supplierArr">
									<view class="picker">
										<view class="uni-input">{{ supplierArr[index] }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>
				
						<!-- 包装类型 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								包装类型
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker name="breedpc" @change="packageTypePickerChange" :value="packageTypeIndex" :range="packageTypeArr">
									<view class="picker">
										<view class="uni-input">{{ packageTypeArr[index] }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>
						
						<!-- 摘要 -->
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								摘要
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="summaryText" placeholder="" :disabled="flag" /></view>
						</view>

					</view>
				</view>
				
				<!-- 标题 -->
				<view class="editor-title flex ali-c">
					<view class="img">
						<image src="/static/assets/rect.png" mode=""></image>
						<text>物料信息</text>
					</view>
					<view class="editor-title-scan" @click="scancode">
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
				</view>
				<view class="main-wrap-contetnt" style="padding-bottom: 120rpx;" v-for="(item, index) in recordArr" :key="item.id">
					<view class="main-wrap-contetnt-item">
						
						<!-- 物料名称 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								物料名称
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.material" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 规格型号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								规格型号
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.model" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 计量单位 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								计量单位
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.measurement" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 批次号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								批次号
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.batchid" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 生产日期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								生产日期
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectProductionDate(index)">
								<input type="text" :value="item.productionDate" placeholder="请选择生产日期" disabled="true"/>
								<!-- <text>{{item.productionDate}}</text> -->
								<image src="../../../static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin: 0rpx 15rpx 0 10rpx;"></image>
							</view>
						</view>
						
						<!-- 到期日期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								到期日期
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectFinalDate(index)">
								<input type="text" :value="item.finalDate"  placeholder="请选择日期" disabled="true"/>
								<!-- <text>{{item.finalDate}}</text> -->
								<image src="../../../static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin: 0rpx 15rpx 0 10rpx;"></image>
							</view>
						</view>
						
						<!-- 入库数量 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								入库数量
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.warehouseNum" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 单价 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								单价
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.unitPrise" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 金额 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								金额
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.amount" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 仓库 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								仓库
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.wareroom" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 入场验收 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								入场验收
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.acceptance" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 验收说明 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								验收说明
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.acceptanceInfo" placeholder="" :disabled="flag" /></view>
						</view>
						
						<!-- 备注 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								备注
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="item.remark" placeholder="" :disabled="flag" /></view>
						</view>

						<button type="default" class="del-btn" @click="deleteItem(item.id)">删除</button>
					</view>
				</view>
			</view>
		</view>

		<view class="add-item-wrap">
			<view class="add-item" @click="addItem"><text>新增</text></view>
		</view>

		<view class="submits jus-b"><button form-type="submit" type="primary" class="flexc submit-btn" style="width: 520rpx;">加入</button></view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmProductionDate" @onCancelDate="onCancel"
		></mpvue-picker>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker1" mode="dateSelector" @onConfirm="onConfirmFinalDate" @onCancelDate="onCancel"
		></mpvue-picker>
		
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
	onLoad: function(options) {
		//this.tools()
		this.addItem();
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			flag: false,
			index: 0,
			date: currentDate,
			neddCheck: false,
			submitStatus: true,
			editStatus: false,
			statusTitleLeft: '26%',
			
			onEditeItemId: '',
			
			bizTypeIndex: 0,
			bizTypeArr: ['饲料采购', '兽药采购', '低值采购', '能源采购'],
			supplierIndex: 0,
			supplierArr: ['京东慧采'],
			packageTypeIndex: 0,
			packageTypeArr: ['袋装', '散装'],
			summaryText: '',
			
			recordNum: 0,
			recordArr: [],
			
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
		mpvuePicker
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
		
		bizTypePickerChange: function(e) {
			console.log('bizTypePicker发送选择改变，携带值为', e.target.value);
			this.bizTypeIndex = e.target.value;
		},
		supplierPickerChange: function(e) {
			console.log('supplierPicker发送选择改变，携带值为', e.target.value);
			this.supplierIndex = e.target.value;
		},
		packageTypePickerChange: function(e) {
			console.log('packageTypePicker发送选择改变，携带值为', e.target.value);
			this.packageTypeIndex = e.target.value;
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		},

		//显示时间选择框
		//生产日期
		selectProductionDate: function(id) {
			//console.log(id);
			this.onEditeItemId = id;
			this.$refs.mpvuePicker.show();
		},
		//到期日期
		selectFinalDate: function(id) {
			this.onEditeItemId = id;
			this.$refs.mpvuePicker1.show();
		},
		//选择时间确定
		//生产日期
		onConfirmProductionDate: function(e) {
			let _this = this;
			_this.recordArr[_this.onEditeItemId].productionDate = e.label;
		},
		//到期日期
		onConfirmFinalDate: function(e) {
			let _this = this;
			console.log(e.label);
			_this.recordArr[_this.onEditeItemId].finalDate = e.label;
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

		// 增加记录
		addItem() {
			let _this = this;
			console.log('加载第 '+ _this.recordNum +' 条记录。')
			_this.recordArr.push({
				id: _this.recordNum,
				index: _this.recordNum + 1,
				material: '蓝克清',
				model: '',
				measurement: '瓶',
				batchid: 'LY-99198',
				productionDate: '2019-11-01',
				finalDate: '2019-11-01',
				warehouseNum: '200',
				unitPrise: '10',
				amount: '2000',
				wareroom: '',
				acceptance: '',
				acceptanceInfo: '',
				remark: ''
			});
			_this.recordNum++;
			console.log(_this.recordArr.length);
		},
		// 删除记录
		deleteItem(id) {
			let _this = this;
			
			_this.recordArr.splice(id, 1);
			//重置记录对象id
			_this.recordNum = 0
			for(let i = 0; i < _this.recordArr.length; i++) {
				_this.recordArr[i].id = _this.recordNum;
				_this.recordNum++
			}
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

.add-item-wrap {
	height: 180rpx;
	margin: 20rpx 22rpx;
	padding: 18rpx 24rpx;
	border-radius: 30rpx;
	background-color: white;

	position: relative;
	.add-item {
		border: 2rpx dashed #cacfd9;
		border-radius: 30rpx;
		height: 100%;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		font-family: 'PingFang SC';
		font-size: 28rpx;
		color: #b2b2b2;
	}
}

.del-btn {
	position: absolute;
	right: 0;

	height: 64rpx;
	width: 180rpx;
	border: 2rpx solid #cacfd9;
	margin-top: 32rpx;
	border-radius: 32rpx;

	background-color: #FFFFFF;
	color: #4d4d4d;
	line-height: 60rpx;
	font-size: 28rpx;
}
button:after {
	border: none;
}

</style>
