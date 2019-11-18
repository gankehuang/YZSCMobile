<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title" :style="{ 'padding-left': statusTitleLeft }">药品申请记录</view>
				<view class="more-icon flexc ali-c" @click="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
			</view>
		</view>

		<!-- 内容 -->
		<form @submit="formSubmit" @reset="formReset">
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
									<picker name="breedpc" @change="bindPickerChange" :value="index" :range="pigTypeArr" range-key="label">
										<view class="picker">
											<view class="uni-input" disabled="true">{{ detailInfo.pigType }}</view>
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
									<text>{{ detailInfo.applyDate }}</text>
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
									<picker name="breedpc" @change="bindPickerChange" :value="index" :range="applyTypeArr">
										<view class="picker">
											<view class="uni-input" disabled="true">{{ detailInfo.applyType }}</view>
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
									<picker name="breedpc" @change="bindPickerChange" :value="index" :range="materialTypeArr">
										<view class="picker">
											<view class="uni-input" disabled="true">{{ detailInfo.materialType }}</view>
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
									<picker name="breedpc" @change="bindPickerChange" :value="index" :range="fieldArr">
										<view class="picker">
											<view class="uni-input" disabled="true">{{ detailInfo.applyStockField }}</view>
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
									<picker name="breedpc" @change="bindPickerChange" :value="index" :range="groupArr">
										<view class="picker">
											<view class="uni-input">{{ detailInfo.group }}</view>
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
									<picker name="breedpc" @change="bindPickerChange" :value="index" :range="statusArr">
										<view class="picker">
											<view class="uni-input">{{ detailInfo.receiptStatus }}</view>
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
							<text>配种明细</text>
						</view>
					</view>
					
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<!-- 批次档案 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">批次档案</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="detailInfo.batchArchives" placeholder="" :disabled="flag" />
								</view>
							</view>
							
							<!-- 配种批次 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">配种批次</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="detailInfo.breedBatch" placeholder="" :disabled="flag" />
								</view>
							</view>
							
							<!-- 物料名称 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">物料名称</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="detailInfo.materialName" placeholder="" :disabled="flag" />
								</view>
							</view>
							
							<!-- 计量单位 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">
									计量单位
									<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<picker name="breedpc" @change="bindPickerChange" :value="index" :range="groupArr">
										<view class="picker">
											<view class="uni-input">{{ detailInfo.unit }}</view>
											<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
										</view>
									</picker>
								</view>
							</view>
							
							<!-- 申请数量 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">申请数量</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="detailInfo.applyNum" placeholder="" :disabled="flag" />
								</view>
							</view>
							
							<!-- 当前存栏 -->
							<view class="main-wrap-contetnt-item-field">
								<view class="main-wrap-contetnt-item-field-name">当前存栏</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="detailInfo.curSavingNum" placeholder="" :disabled="flag" />
								</view>
							</view>
							
							<!-- 库存数量 -->
							<view class="main-wrap-contetnt-item-field field-nobottom">
								<view class="main-wrap-contetnt-item-field-name">库存数量</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="detailInfo.stockNum" placeholder="" :disabled="flag" />
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>

			<!-- 按钮 -->
			<view class="submits jus-b">
				<button type="primary" class="flexc add-btn">删除</button>
				<button form-type="submit" type="primary" class="flexc submit-btn">保存</button>
			</view>
		</form>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"
		 ></mpvue-picker>
	</view>
</template>

<script>
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import ztable from '@/components/z-table/z-table';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
//引入时间转换
import { timeFormat } from '@/utils/dateUtils.js';
// 引入公共请求接口
import common from '../../../utils/common.js';
export default {
	onLoad: function(options) {
		//this.tools()；
		this.getDetail();
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			//对应fid的详情数据
			detailInfo: {
				pigType: '',// 猪只类型
				applyDate: '',// 申请日期
				applyType: '',// 领料类型
				materialType: '',// 物料类型
				applyStockField: '',// 申请库存分场
				group: '',// 组别
				receiptStatus: '',// 单据状态
				batchArchives: '',// 批次档案
				breedBatch: '',// 配种批次
				materialName: '',// 物料名称
				unit: '',// 计量单位
				applyNum: 0,// 申请数量
				curSavingNum: 0,// 当前存栏
				stockNum: 0// 库存数量
			},
			
			//picker备选数据
			pigTypeArr: ['哺乳'],
			applyTypeArr: ['领料', '退库'],
			materialTypeArr: ['药品', '疫苗'],
			fieldArr: ['一分场'],
			groupArr: ['配怀'],
			statusArr: ['保存'],
			
			index: 0,
			date: currentDate,
			neddCheck: false,
			submitStatus: true,
			editStatus: false,
			delcount: '',
			statusTitleLeft: '20px',
			
			//提交数据
			subData: {
				applyDate: currentDate  //申请日期
			}
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
		//获取详情信息
		getDetail() {
			var _this = this;
			let params = {
				mingxiid: 'jHcvx6T4WIDgU5oBWApdFJC/0uM=' //_this.fid
			};
			let headers = {};
			common.commRequest(`/CtPigPigDrugApply/selectPigDrugApplyByFid`, params, headers, 'get', function(data) {
				console.log(data);
				let getData = data.data;
				let info = {};
				
				info.pigType = getData.pigtype ? getData.pigtype : '';// 猪只类型
				info.applyDate = getData.fbizdate ? timeFormat(getData.fbizdate, 'yyyy-MM-dd') : '';// 申请日期
				info.applyType = getData.lingliaotype ? getData.lingliaotype : '';// 领料类型
				info.materialType = getData.cfmaterialtype != null ? getData.cfmaterialtype : '';// 物料类型
				info.applyStockField = getData.applykucunfenchang ? getData.applykucunfenchang : '';// 申请库存分场
				info.group = getData.zubie ? getData.zubie : '';// 组别
				info.receiptStatus = getData.danjuzhuangtai ? getData.danjuzhuangtai : '';// 单据状态
				info.batchArchives = getData.cfpigbatchid ? getData.cfpigbatchid : '';// 批次档案
				info.breedBatch = getData.cfbreedingbatchid ? getData.cfbreedingbatchid : '';// 配种批次
				info.materialName = getData.cfmaterialname ? getData.cfmaterialname : '';// 物料名称
				info.unit = getData.cfmaterialunit ? getData.cfmaterialunit : '';// 计量单位
				info.applyNum = getData.cfqty != null ? getData.cfqty : '';// 申请数量
				info.curSavingNum = getData.cfcurrqty != null ? getData.cfcurrqty : '';// 当前存栏
				info.stockNum = getData.cfstorageqty != null ? getData.cfstorageqty : '';// 库存数量
		
				_this.detailInfo = info;
				console.log(_this.detailInfo);
			});
		},
		// 更新
		update(){
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				fid:_this.fid,
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			}
			// let data = {};
			// data.cfbreedingdate = _this.detailInfo.breedingDate;//配种日期
			// data.breedpc = _this.detailInfo.breedBatch;//配种批次
			// data.cfchildbirthdate = _this.detailInfo.birthDate;//预产期
			
			console.log(params) 
			common.commRequest(`/PigMatingRecord/updateCtPigMatingRecord`, params,headers, 'post',
				function(data) {
					console.log(data)
					if(data.status==200){
						uni.navigateTo({
							url: `/pages/dataCollection/breedRecord/breedQuery`,
						});
					}
			})
		},
		//获取备选数据
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

				// 计划、累计配种数

				// 转入位置

				// 配种时段

				// 猪只状态

				// 存栏位置

				// 配种类型
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
		selectDate: function(){
			this.$refs.mpvuePicker.show()
		},
		//选择时间确定
		onConfirmDate: function(e) {
			console.log(e.label);
			this.subData.applyDate = e.label
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
</style>
