<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title" :style="{ 'padding-left': statusTitleLeft }">疫苗申请分录新增</view>
				<view class="more-icon flexc ali-c" @click="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
			</view>
		</view>

		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap" style="padding-top: 130rpx;">
				<view class="main-wrap-contetnt" style="margin: 20rpx 0 0; padding-bottom: 120rpx;" v-for="(item, index) in recordArr" :key="index">
					<view class="main-wrap-contetnt-item">
						<!-- 计划类型 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								计划类型
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" v-model="item.planType.name" /> -->
								<picker @change="planTypeChange($event,item.index)" :value="planTypeIndex" :range="planTypeArr" range-key="name">
									<view class="picker">
										<view class="uni-input">{{ item.planType.name }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>
						
						<!-- 免疫类型 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								免疫类型
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" v-model="item.immunizationType.name" /> -->
								<picker @change="immunizationTypeChange($event,item.index)" :value="immunizationTypeIndex" :range="immunizationTypeArr" range-key="name">
									<view class="picker">
										<view class="uni-input">{{ item.immunizationType.name }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>
						
						<!-- 批次档案 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								批次档案
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input v-if="isProSow" type="text" placeholder="生产母猪不可点" disabled="true" />
								<str-autocomplete v-if="!isProSow"
									:stringList="batchArchivesList[0]"
									:importvalue="item.batchArchives.name"
									@select="selectBatchArchives($event, item.index)"
									backgroundColor="#fff"
									highlightColor="#FF0000"
									v-model="item.batchArchives.name"
								></str-autocomplete>
							</view>
						</view>

						<!-- 配种批次 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种批次
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input v-if="!isProSow" type="text" placeholder="生产母猪可点" disabled="true" />
								<str-autocomplete v-if="isProSow"
									:stringList="breedBatchList[0]"
									:importvalue="item.breedBatch.name"
									@select="selectBreedBatch($event, item.index)"
									backgroundColor="#fff"
									highlightColor="#FF0000"
									v-model="item.breedBatch.name"
								></str-autocomplete>
							</view>
						</view>
						
						<!-- 耳牌号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" v-model="item.earNum.name" /> -->
								<str-autocomplete
									:stringList="earNumList[0]"
									:importvalue="item.earNum.name"
									@select="selectEarNum($event, item.index)"
									backgroundColor="#fff"
									highlightColor="#FF0000"
									v-model="item.earNum.name"
								></str-autocomplete>
							</view>
						</view>
						
						<!-- 免疫项目 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								免疫项目
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" v-model="item.immunizationItem.name" /> -->
								<str-autocomplete
									:stringList="immunizationItemList[0]"
									:importvalue="item.immunizationItem.name"
									@select="selectImmunizationItem($event, item.index)"
									backgroundColor="#fff"
									highlightColor="#FF0000"
									v-model="item.immunizationItem.name"
								></str-autocomplete>
							</view>
						</view>

						<!-- 物料名称 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								物料名称
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" v-model="item.material.name" /> -->
								<str-autocomplete
									:stringList="materialList[0]"
									:importvalue="item.material.name"
									@select="selectMaterial($event, item.index)"
									backgroundColor="#fff"
									highlightColor="#FF0000"
									v-model="item.material.name"
								></str-autocomplete>
							</view>
						</view>

						<!-- 计量单位 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								计量单位
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="item.measurement.name" placeholder="请选择物料名称" disabled="true" />
							</view>
						</view>

						<!-- 申请数量 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								申请数量
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" v-model="item.aplNum" /></view>
						</view>

						<!-- 当前存栏 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">当前存栏</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" v-model="item.current" /></view>
						</view>

						<!-- 库存数量 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">库存数量</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" v-model="item.stockNum" /></view>
						</view>
						
						<!-- 免疫剂量 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">免疫剂量</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" v-model="item.immunizationAmount" /></view>
						</view>
						
						<!-- 总剂量 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">总剂量</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" v-model="item.totalAmount" /></view>
						</view>

						<button type="default" class="del-btn" style="background-color: #FFFFFF;" @click="delItem(item.index)">删除</button>
					</view>
				</view>
			</view>
		</view>

		<view class="add-item-wrap">
			<view class="add-item" @click="addItem"><text>新增</text></view>
		</view>

		<view class="submits jus-b">
			<button form-type="submit" type="primary" class="flexc submit-btn" style="width: 520rpx;" @click="updateRecords">加入</button>
		</view>
	</view>
</template>

<script>
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import ztable from '@/components/z-table/z-table';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
// 引入公共请求接口
import common from '../../../utils/common.js';
// 自动补全输入框
import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue'
export default {
	components: {
		ztable,
		uniIcon,
		mpvuePicker,
		strAutocomplete
	},
	onLoad: function(e) {
		let _this = this;
		
		_this.pigTypeId = decodeURIComponent(e.pigTypeId);
		//console.log(_this.pigTypeId);
		//是否为生产母猪
		if (_this.pigTypeId === 'Va4AAAANhPxHkde2') {
			_this.isProSow = true;
		}
		
		uni.getStorage({
			key: 'entry_record_count',
			success: function(res) {
				let data = res.data;
				//同步记录条数
				if (data) {
					_this.recordNum = data
				} else {
					_this.recordNum = 0;
				};
				//同步记录数据
				uni.getStorage({
					key: 'entry_record_arr',
					success: function(res) {
						let firstData = JSON.parse(res.data);
						if (firstData.length == 0) {
							firstData = [
								{
									index: _this.recordNum,
									//计划类型
									planType: {
										name: '',//名称
										id: ''//id
									},
									//免疫类型
									immunizationType: {
										name: '',
										id: ''
									},
									//批次档案
									batchArchives: {
										name: '',
										id: ''
									},
									// 配种批次
									breedBatch: {
										name: '',
										id: ''
									},
									// 耳牌号
									earNum: {
										name: '',
										id: ''
									},
									// 免疫项目
									immunizationItem: {
										name: '',
										id: ''
									},
									// 物料名称
									material: {
										name: '',
										id: ''
									},
									// 计量单位
									measurement: {
										name: '',
										id: ''
									},
									// 申请数量
									aplNum: 0,
									// 当前存栏
									current: 0,
									// 库存数量
									stockNum: 0,
									// 免疫剂量
									immunizationAmount: 0,
									// 总剂量
									totalAmount: 0
								}
							];
						}
						_this.recordArr = firstData;
					}
				});
			}
		});
		
		// 获取备选项
		_this.alternativeItem();
		//this.tools();
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
			statusTitleLeft: '20px',
			
			//猪只类型id
			pigTypeId: '',
			isProSow: false,//是否为生产母猪
			
			//计划类型备选
			planTypeIndex: 0,
			planTypeArr: [
				{
					name: '免疫计划',
					id: 0
				},{
					name: '补免计划',
					id: 1
				}
			],
			//免疫类型备选
			immunizationTypeIndex: 0,
			immunizationTypeArr: [
				{
					name: '猪肉免疫',
					id: 1
				},{
					name: '普免',
					id: 2
				},{
					name: '跟胎免疫',
					id: 3
				},{
					name: '后备免疫',
					id: 4
				},{
					name: '异常免疫',
					id: 5
				}
			],
			
			//批次档案
			batchArchivesList: [
				['0批次档案'],
				['1批次档案id']
			],
			//配种批次
			breedBatchList: [
				['0配种批次'],
				['1配种批次id']
			],
			//耳牌号
			batchNumIdSelected: '',
			earNumList: [
				['0耳牌号'],
				['1耳牌号id'],
				['2存栏位置'],
				['3存栏位置id']
			],
			//免疫项目
			immunizationTypeIdSelected: '',
			immunizationItemList: [
				['0免疫项目'],
				['1免疫项目id']
			],
			//物料名称
			materialList: [
				['0物料名称'],
				['1物料名称id'],
				['2计量单位'],
				['3计量单位id'],
				['4剂量'],
				['5规格']
			],
			
			//明细条目
			recordNum: 1,
			recordArr: [],

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
		}
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
		
		//获取批次档案、配种批次、物料名称等备选项
		alternativeItem() {
			let _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			
			// 获取批次档案
			let batchArchivesList = [[],[]];
			//console.log('准备获取批次档案,请求携带数据为：' + JSON.stringify({...params, pigtypeid: _this.pigTypeId}));
			common.commRequest(`/CtPigPigDrugApply/selectPicidanganFilter/1/10000`, {...params, pigtypeid: _this.pigTypeId}, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					batchArchivesList[0].push(getData[i].PICIHAO);//批次档案号
					batchArchivesList[1].push(getData[i].PICIID);//批次档案号id
				}
		
				_this.batchArchivesList = batchArchivesList;
				//console.log(JSON.stringify(_this.batchArchivesList));
			});
			// 获取配种批次
			let breedBatchList = [[],[]];
			console.log('准备获取配种批次,请求携带数据为：' + JSON.stringify(params));
			common.commRequest(`/CtPigPigDrugApply/selectBreedpiciFilter/1/10000`, params, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					breedBatchList[0].push(getData[i].BREEDPC);//批次档案号
					breedBatchList[1].push(getData[i].BREEDPICIID);//批次档案号id
				}
					
				_this.breedBatchList = breedBatchList;
				//console.log(JSON.stringify(_this.breedBatchList));
			});
			
			// 获取物料名称
			let materialList = [[],[],[],[],[],[]];
			//console.log('准备获取物料名称,请求携带数据为：' + JSON.stringify(params));
			common.commRequest(`/CtPigPigDrugApply/selectYmMaterialnameFilter/1/10000`, {}, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					materialList[0].push(getData[i].MATERIALNAME);//物料名称
					materialList[1].push(getData[i].MATERIALID);//物料名称id
					materialList[2].push(getData[i].JILIANGDANWEI);//计量单位
					materialList[3].push(getData[i].JILIANGDANWEIID);//计量单位id
					materialList[4].push(getData[i].JILIANG);//剂量
					materialList[5].push(getData[i].GUIGE);//规格
				}
					
				_this.materialList = materialList;
				//console.log(JSON.stringify(_this.materialList));
			});
		},
		//获取耳牌号备选项
		getEarNum() {
			let _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			
			let url = _this.isProSow ? '/CtPigPigDrugApply/selectBreedErpaiFilter/1/10000' : '/CtPigPigDrugApply/selectErpaiFilter/1/10000'
			let params = {
				picihaoid: _this.batchNumIdSelected
			};
			
			// 获取耳牌号
			let earNumList = [[],[],[],[]];
			//console.log('准备获取批次档案,请求携带数据为：' + JSON.stringify({...params, pigtypeid: _this.pigTypeId}));
			common.commRequest(url, params, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					earNumList[0].push(getData[i].ERPAIHAO);//耳牌号
					earNumList[1].push(getData[i].ERPAIID);//耳牌号id
					earNumList[2].push(getData[i].CLWZ);//存栏位置
					earNumList[3].push(getData[i].CLWZID);//存栏位置id
				}
		
				_this.earNumList = earNumList;
				//console.log(JSON.stringify(_this.earNumList));
			});
			
		},
		//获取免疫项目备选项
		getImmunizationItem() {
			let _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				immtypeid: _this.ImmunizationTypeIdSelected
			};
			// 获取免疫项目
			let immunizationItemList = [[],[]];
			console.log('准备获取免疫项目,请求携带数据为：' + JSON.stringify({...params, immtypeid: _this.ImmunizationTypeIdSelected}));
			common.commRequest(`/CtPigPigDrugApply/selectImmitemFilter/1/10000`, params, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					immunizationItemList[0].push(getData[i].IMMITEMNAME);//免疫项目
					immunizationItemList[1].push(getData[i].IMMITEMID);//免疫项目id
				}
		
				_this.immunizationItemList = immunizationItemList;
				console.log(JSON.stringify(_this.immunizationItemList));
			});
		},
		//选择计划类型
		planTypeChange(e,itemIndex) {
			// console.log('picker发送选择改变，携带值为', e.target.value)
			this.planTypeIndex = e.target.value
			
			let index = this.recordArr.findIndex(item=>{ // 索引 
				return item.index == itemIndex
			})
			this.recordArr[index].planType.name = this.planTypeArr[this.planTypeIndex].name
			this.recordArr[index].planType.id = this.planTypeArr[this.planTypeIndex].id
			
			console.log(this.recordArr[index].planType.name);
			console.log(this.recordArr[index].planType.id);
			
			this.planTypeIndex = 0;
		},
		//选择免疫类型
		immunizationTypeChange(e,itemIndex) {
			// console.log('picker发送选择改变，携带值为', e.target.value)
			this.immunizationTypeIndex = e.target.value
			
			let index = this.recordArr.findIndex(item=>{ // 索引 
				return item.index == itemIndex
			})
			this.recordArr[index].immunizationType.name = this.immunizationTypeArr[this.immunizationTypeIndex].name;
			this.recordArr[index].immunizationType.id = this.immunizationTypeArr[this.immunizationTypeIndex].id;
			
			//console.log(this.recordArr[index].immunizationType.name);
			//console.log(this.recordArr[index].immunizationType.id);
			
			this.immunizationTypeIndex = 0;
			//选择免疫类型后再获取免疫项目
			this.immunizationTypeIdSelected = this.immunizationTypeArr[this.immunizationTypeIndex].id;
			this.getImmunizationItem();
		},
		
		// 选择批次档案
		selectBatchArchives(opt, itemIndex) {
			//输入提示框选择 
			//console.log(opt);
			let index = this.recordArr.findIndex(item=>{ // 索引
				return item.index == itemIndex
			})
			this.recordArr[index].batchArchives.name = opt;
			this.recordArr[index].batchArchives.id = this.batchArchivesList[1][this.batchArchivesList[0].indexOf(opt)];
			//选择批次号后再根据批次号获取耳号
			this.batchNumIdSelected = this.batchArchivesList[1][this.batchArchivesList[0].indexOf(opt)];
			this.getEarNum();
		},
		// 选择配种批次
		selectBreedBatch(opt, itemIndex) {
			//输入提示框选择 
			//console.log(opt);
			let index = this.recordArr.findIndex(item=>{ // 索引
				return item.index == itemIndex
			})
			this.recordArr[index].breedBatch.name = opt;
			this.recordArr[index].breedBatch.id = this.breedBatchList[1][this.breedBatchList[0].indexOf(opt)];
			
			//选择批次号后再根据批次号获取耳号
			this.batchNumIdSelected = this.breedBatchList[1][this.breedBatchList[0].indexOf(opt)];
			this.getEarNum();
		},
		// 选择耳牌号
		selectEarNum(opt, itemIndex) {
			//输入提示框选择 
			//console.log(opt);
			let index = this.recordArr.findIndex(item=>{ // 索引
				return item.index == itemIndex
			})
			
			this.recordArr[index].earNum.name = opt;
			this.recordArr[index].earNum.id = this.earNumList[1][this.earNumList[0].indexOf(opt)];
		},
		// 选择免疫项目
		selectImmunizationItem(opt, itemIndex) {
			//输入提示框选择 
			//console.log(opt);
			let index = this.recordArr.findIndex(item=>{ // 索引
				return item.index == itemIndex
			})
			
			this.recordArr[index].immunizationItem.name = opt;
			this.recordArr[index].immunizationItem.id = this.immunizationItemList[1][this.immunizationItemList[0].indexOf(opt)];
		},
		// 选择物料名称，带出计量单位、剂量、规格
		selectMaterial(opt, itemIndex) {
			//输入提示框选择 
			//console.log(opt);
			let index = this.recordArr.findIndex(item=>{ // 索引
				return item.index == itemIndex
			})
			
			this.recordArr[index].material.name = opt;//物料名称
			this.recordArr[index].material.id = this.materialList[1][this.materialList[0].indexOf(opt)];//物料名称id
			this.recordArr[index].measurement.name = this.materialList[2][this.materialList[0].indexOf(opt)];//计量单位
			this.recordArr[index].measurement.id = this.materialList[3][this.materialList[0].indexOf(opt)];//计量单位id
			// 剂量
			// 规格
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

		addItem() {
			this.recordArr.push({
				index: ++this.recordNum,
				//计划类型
				planType: {
					name: '',//名称
					id: ''//id
				},
				//免疫类型
				immunizationType: {
					name: '',
					id: ''
				},
				//批次档案
				batchArchives: {
					name: '',
					id: ''
				},
				// 配种批次
				breedBatch: {
					name: '',
					id: ''
				},
				// 耳牌号
				earNum: {
					name: '',
					id: ''
				},
				// 免疫项目
				immunizationItem: {
					name: '',
					id: ''
				},
				// 物料名称
				material: {
					name: '',
					id: ''
				},
				// 计量单位
				measurement: {
					name: '',
					id: ''
				},
				// 申请数量
				aplNum: 0,
				// 当前存栏
				current: 0,
				// 库存数量
				stockNum: 0,
				// 免疫剂量
				immunizationAmount: 0,
				// 总剂量
				totalAmount: 0
			});
		},
		//删除明细条目
		delItem(itemIndex) {
			//console.log('将要删除一条明细,index为：' + itemIndex);
			let index = this.recordArr.findIndex(item => {
				return item.index == itemIndex;
			});
			//console.log(JSON.stringify(this.recordArr));
			this.recordArr.splice(index, 1);
		},
		//提交明细条目
		updateRecords(){
			uni.setStorageSync('entry_record_arr', JSON.stringify(this.recordArr)); 
			uni.navigateBack();
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

	background-color: white;
	color: #4d4d4d;
	line-height: 60rpx;
	font-size: 28rpx;
	&::after {
		border: none;
	}
}
</style>
