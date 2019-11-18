<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title" style="padding-left: 35%">配种记录新增</view>
				<view class="status-del" @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/breedRecord/breedQuery">历史记录</view>
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
						<!-- 配种批次 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种批次
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="breedBatchIndex" :range="breedBatchArr" range-key="label">
									<view class="picker">
										<view class="uni-input">{{ breedBatchArr[breedBatchIndex].label }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>
						<!-- 计划配种数 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">计划配种数</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="breedBatchArr[breedBatchIndex].planNum" placeholder="自动带出" name="planNum" style="font-size: 14px;" disabled="true" />
							</view>
						</view>
						<!-- 累计配种数 -->
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">累计配种数</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input
									type="text"
									:value="breedBatchArr[breedBatchIndex].totalNum"
									placeholder="自动带出"
									style="font-size: 14px;"
									disabled="true"
								/>
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
				<!-- 表单内容 -->
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 母猪耳号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								母猪耳号
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" :value="sowSelected.sowNum" style="font-size: 14px;" placeholder="请输入母猪耳号" disabled="true" /> -->
								<str-autocomplete
									:stringList="sowNumList[0]"
									:importvalue="sowNumValue"
									@select="selectSow"
									backgroundColor="#fff"
									highlightColor="#FF0000"
									v-model="sowNumValue"
								></str-autocomplete>
								
								<view class="main-wrap-contetnt-item-field-value-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- 均重(母)KG -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								均重(母)KG
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="avgFemale" style="font-size: 14px;" placeholder="kg" /></view>
						</view>
						<!-- 转入位置 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入位置
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange1" :value="transPstIndex" :range="transPstArr" range-key="label">
									<view class="picker">
										<view class="uni-input">{{ transPstArr[transPstIndex].label }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>

						<!-- 公猪耳号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								公猪耳号
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" :value="boarSelected.boarNum" style="font-size: 14px;" placeholder="请输入公猪耳号" disabled="true" /> -->
								<str-autocomplete
									:stringList="boarNumList[0]"
									:importvalue="boarNumValue"
									@select="selectBoar"
									backgroundColor="#fff"
									highlightColor="#FF0000"
									v-model="boarNumValue"
								></str-autocomplete>
								<view class="main-wrap-contetnt-item-field-value-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- 谱系 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								系谱
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="boarSelected.pedigree" style="font-size: 14px;" placeholder="" disabled="true"/>
							</view>
						</view>
						<!-- 均重(公)KG -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								均重(公)KG
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="number" v-model="avgMale" style="font-size: 14px;" placeholder="kg" />
							</view>
						</view>

						<!-- 配种时段 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种时段
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange2" :value="breedTimeIndex" :range="breedTimeArr" range-key="time">
									<view class="picker">
										<view class="uni-input">{{ breedTimeArr[breedTimeIndex].time }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker>
							</view>
						</view>
						<!-- 操作评分 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								操作评分
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<view class="grade">
									<view class="grade-item">
										<view class="grade-item-name">静立</view>
										<uni-rate max="3" :value="scoreArr[0]" color="#D4D4D4" active-color="#F06257" margin="20" size="18" @change="scoreChange"></uni-rate>
									</view>
									<view class="grade-item">
										<view class="grade-item-name">锁住</view>
										<uni-rate max="3" :value="scoreArr[1]" color="#D4D4D4" active-color="#F06257" margin="20" size="18" @change="scoreChange1"></uni-rate>
									</view>
									<view class="grade-item">
										<view class="grade-item-name">倒流</view>
										<uni-rate max="3" :value="scoreArr[2]" color="#D4D4D4" active-color="#F06257" margin="20" size="18" @change="scoreChange2"></uni-rate>
									</view>
								</view>
							</view>
						</view>
						<!-- 猪只状态 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">猪只状态</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="sowSelected.pigState" style="font-size: 14px;" disabled="true" placeholder="自动带出" />
							</view>
						</view>
						<!-- 存栏位置 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">存栏位置</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="sowSelected.savingPst" style="font-size: 14px;" disabled="true" placeholder="自动带出" />
							</view>
						</view>
						<!-- 配种类型 -->
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">配种类型</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="sowSelected.breedType" style="font-size: 14px;" disabled="true" placeholder="自动带出" />
							</view>
						</view>
						<!-- 配种员 -->
						<!-- <view class="main-wrap-contetnt-item-field field-nobottom">
								<view class="main-wrap-contetnt-item-field-name">
									配种员<text class="text-red">*</text>
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" style="font-size: 14px;"  placeholder="请填入" />
								</view>
							</view> -->
					</view>
				</view>
			</view>
		</view>

		<!-- 按钮  -->
		<view class="submits jus-b"><button form-type="submit" type="primary" class="flexc submit-btn" @click="dataSubmit">提交</button></view>
	</view>
</template>

<script>
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import ztable from '@/components/z-table/z-table';
import uniRate from '@/components/uni-rate/uni-rate.vue';
// 引入公共请求接口
import common from '../../../utils/common.js';
// 引入弹框组件
import popupLayer from '@/components/popup/popup-layer.vue';
//自动补全输入框
import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue';

export default {
	onLoad: function(options) {
		this.isBreedingField(); //判断是否批次配种分场
		this.tools(); //获取配种批次
		this.active = !this.active;
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			//是否可编辑
			flag: false,
			// 弹窗激活
			active: true,
			// 弹窗搜索输入间隔
			searchTimer: 0,

			// 配种批次(包括计划、累计配种数)
			breedBatchArr: [],
			breedBatchIndex: 0,

			// 转入位置选择
			transPstArr: [],
			transPstIndex: 0,
			// 配种时段选择
			breedTimeArr: [
				{
					id: 1,
					time: '上午'
				},
				{
					id: 2,
					time: '下午'
				},
				{
					id: 3,
					time: '夜间'
				}
			],
			breedTimeIndex: 0,

			// 母猪耳号列表
			sowNumList: [
				['0母猪耳号'],
				['1耳号ID'],
				['2猪只状态'],
				['3猪只状态id'],
				['4存栏位置'],
				['5存栏位置id'],
				['6配种类型'],
				['7配种类型id']
			],
			sowNumValue: '',
			sowSelected: null,
			avgFemale: '',
			
			// 公猪耳号列表
			boarNumList: [
				['0公猪耳号'],
				['1公猪耳号id'],
				['2系谱'],
				['3系谱id'],
			],
			boarNumValue: '',
			boarSelected: null,
			avgMale: '',

			//操作得分
			scoreArr: [0, 0, 0],

			date: currentDate
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
		uniRate,
		popupLayer,
		strAutocomplete
	},
	methods: {

		// 清除艘所输入定时器
		clearTimer() {
			if (this.searchTimer) {
				clearTimeout(this.searchTimer);
			}
		},
		handleQuery(event) {
			this.clearTimer();
			console.log(event.timeStamp);
			this.searchTimer = setTimeout(() => {
				console.log(event.timeStamp);
				// console.log(this.lastTime)
				// if (this.lastTime - event.timeStamp === 0) {
				this.$http.post('/api/vehicle').then(res => {
					console.log(res.data.data);
					this.changeColor(res.data.data);
				});
				// }
			}, 2000);
		},
		// 用户输入母猪耳牌
		sowNumChange(e) {
			console.log('母猪耳号输入发生改变。');
		},
		// 用户输入公猪耳牌
		boarNumChange(e) {
			console.log('公猪耳号输入发生改变。');
		},


		// 过滤框选择母猪耳号
		selectSow(opt) {
			//console.log(opt);
			//输入提示框选择
			this.sowNumValue = opt;
			this.sowSelected = {};
			
			this.sowSelected.sowNum = this.sowNumValue;//母猪耳号
			this.sowSelected.sowNumId = this.sowNumList[1][this.sowNumList[0].indexOf(this.sowNumValue)];
			this.sowSelected.pigState = this.sowNumList[2][this.sowNumList[0].indexOf(this.sowNumValue)];//猪只状态
			this.sowSelected.pigStateId = this.sowNumList[3][this.sowNumList[0].indexOf(this.sowNumValue)];
			this.sowSelected.savingPst = this.sowNumList[4][this.sowNumList[0].indexOf(this.sowNumValue)];//存栏位置
			this.sowSelected.savingPstId = this.sowNumList[5][this.sowNumList[0].indexOf(this.sowNumValue)];
			this.sowSelected.breedType = this.sowNumList[6][this.sowNumList[0].indexOf(this.sowNumValue)];//配种类型
			this.sowSelected.breedTypeId = this.sowNumList[7][this.sowNumList[0].indexOf(this.sowNumValue)];
			//console.log(this.sowSelected);
		},

		// 选择公猪耳号
		selectBoar(opt) {
			console.log(opt);
			this.boarNumValue = opt;
			this.boarSelected = {};
			
			this.boarSelected.boarNum = this.boarNumValue;//公猪耳号
			this.boarSelected.boarNumId = this.boarNumList[1][this.boarNumList[0].indexOf(this.boarNumValue)];
			this.boarSelected.pedigree = this.boarNumList[2][this.boarNumList[0].indexOf(this.boarNumValue)];//系谱
			this.boarSelected.pedigreeId = this.boarNumList[3][this.boarNumList[0].indexOf(this.boarNumValue)];
			console.log(this.boarSelected);
		},

		// 判断是否批次配种分场
		isBreedingField() {
			var _this = this;
			let headers = {};
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			
			common.commRequest(`/PigMatingRecord/ifBreedFenchang`, params, headers, 'get', function(data) {
				let getData = data.data;
				console.log(JSON.stringify(getData));
				
				if(getData[0].FID) {
					_this.flag = true;
				};
			});
		},
		// 获取供选择的配种批次
		tools() {
			var _this = this;
			let headers = {};
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};

			let picker = []; // 配种批次
			let transPst = []; // 转入位置

			//配种批次
			common.commRequest(`/PigMatingRecord/selectBreedPici/1/5`, params, headers, 'get', function(data) {
				let getData = data.data.list;
				console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					picker.push({
						value: getData[i].cfbatchid,
						label: getData[i].breedpc,
						planNum: getData[i].jhpzs,
						totalNum: getData[i].ljpzs
					});
				}
				_this.breedBatchArr = picker;

				//根据获取到的配种批次号 获取母猪耳号
				_this.sowNumSearch();
				//获取公猪耳号
				_this.boarNumSearch();
			});

			// 转入位置
			common.commRequest(`/PigMatingRecord/selectZrwz/1/5`, params, headers, 'get', function(data) {
				let getData = data.data.list;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					transPst.push({
						value: getData[i].boxid,
						label: getData[i].boxname
					});
				}

				_this.transPstArr = transPst;
			});
		},
		//表单提交
		formSubmit(e) {
			console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
			let paramsdata = e.detail.value;
			uni.request({
				url: 'http://192.168.91.121:8709/PigMatingRecord/insertCtPigMatingRecord',
				method: 'POST',
				data: paramsdata,
				success: data => {
					console.log(JSON.stringify(data));
					// if (data.data.data) {
					// 	let callbackdata = JSON.parse(data.data.data);
					// 	callback(callbackdata);
					// 	//uni.hideLoading();
					// } else {
					// 	uni.showToast({
					// 		title: data.data.msg,
					// 		icon: 'none'
					// 	});
					// }
				},
				fail: () => {
					this.message = '网络连接失败';
				},
				complete: () => {}
			});
		},

		//分值改变
		scoreChange(e) {
			//console.log('静立 分值改变前为:' + this.scoreArr[0]);
			this.scoreArr[0] = e.value;
			//console.log('静立 分值改变后为:' + this.scoreArr[0]);
		},
		scoreChange1(e) {
			this.scoreArr[1] = e.value;
		},
		scoreChange2(e) {
			this.scoreArr[2] = e.value;
		},

		//获取母猪耳号
		sowNumSearch() {
			let _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfbatchid: 'Va4AAAewU7z8qPq9', //_this.breedBatchArr[_this.breedBatchIndex].value
				//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				//cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			let sowNumList = [[],[],[],[],[],[],[],[]];
			// 获取母猪耳号
			console.log('准备获取母猪耳号,请求携带数据为：' + JSON.stringify(params));
			common.commRequest(`/PigMatingRecord/selectMuZhuErhao/1/10000`, params, headers, 'get', function(data) {
				console.log('已获取到母猪耳号');
				let getData = data.data.list;
				//console.log(getData);
				for (let i = 0; i < getData.length; i++) {
					sowNumList[0].push(getData[i].erpaihao);//母猪耳牌号
					sowNumList[1].push(getData[i].muzhuerpaiid);//母猪耳号id
					sowNumList[2].push(getData[i].pigstate);//猪只状态
					sowNumList[3].push(getData[i].cfpkStateid);//猪只状态id
					sowNumList[4].push(getData[i].cunlanweizhi);//存栏位置
					sowNumList[5].push(getData[i].cfpkPigfenid);//存栏位置id
					sowNumList[6].push(getData[i].peizhongleixing);//配种类型
					sowNumList[7].push(getData[i].peizhongleixingid);//配种类型id
					
				}

				_this.sowNumList = sowNumList;
				console.log(JSON.stringify(_this.sowNumList));
			});
		},
		//获取公猪耳号
		boarNumSearch(earNum = '') {
			let _this = this;
			let headers = {};
			let params = {
				//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				//cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
				//erpaihao: earNum // 耳号
			};
			let boarNumList = [[],[],[],[]];
			// 获取公猪耳号
			console.log('准备获取公猪耳号,请求携带数据为：' + JSON.stringify(params));
			common.commRequest(`/PigMatingRecord/selectGongZhuErhao/1/10`, params, headers, 'get', function(data) {
				console.log('已获取到公猪耳号');
				let getData = data.data.list;
				//console.log(getData);
				for (let i = 0; i < getData.length; i++) {
					boarNumList[0].push(getData[i].erpaihao);//公猪耳牌号
					boarNumList[1].push(getData[i].gongzhuerpaiid);//公猪耳牌号
					boarNumList[2].push(getData[i].xipu);//公猪耳牌号
					boarNumList[3].push(getData[i].xipuid);//公猪耳牌号
				}

				_this.boarNumList = boarNumList;
				console.log(JSON.stringify(_this.boarNumList));
			});
		},

		/* formSubmit(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			}, */
		bindPickerChange: function(e) {
			console.log('配种批次picker发送选择改变，携带值为', e.target.value);
			this.breedBatchIndex = e.target.value;

			this.sowNumSearch(); //获取母猪耳号列表
			this.boarNumSearch(); //获取公猪耳号列表
		},
		bindPickerChange1: function(e) {
			console.log('转入位置picker发送选择改变，携带值为', e.target.value);
			this.transPstIndex = e.target.value;
			console.log(this.transPstIndex);

			//
		},
		bindPickerChange2: function(e) {
			console.log('配种时段picker发送选择改变，携带值为', e.target.value);
			this.breedTimeIndex = e.target.value;

			//
		},

		bindDateChange: function(e) {
			this.date = e.target.value;
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

		//提交数据整理
		submitData() {
			let _this = this;
			let subData = {};

			subData.cfbatchid = _this.breedBatchArr[_this.breedBatchIndex].value; // 配种批次id
			subData.jhpzs = _this.breedBatchArr[_this.breedBatchIndex].planNum; //计划配种数
			subData.ljpzs = _this.breedBatchArr[_this.breedBatchIndex].totalNum; //累计配种数
			subData.muzhuerpaiid = _this.sowSelected.sowNumId; // 母猪耳号id
			subData.cfavefemale = _this.avgFemale; // 母猪均重
			subData.zrwz = _this.transPstArr[_this.transPstIndex].value; // 转入位置id
			subData.gongzhuerpaiid = _this.boarSelected.boarNumId; // 公猪耳号id
			subData.xipuid = _this.boarSelected.pedigreeId;// 系谱id
			subData.cfavemale = _this.avgMale; // 公猪均重
			subData.pzapm = _this.breedTimeIndex; // 配种时段id
			subData.cfscore = _this.scoreArr.join(''); // 操作评分
			subData.cfpkStateid = _this.sowSelected.pigStateId; // 猪只状态id
			subData.cfpkPigfenid = _this.sowSelected.savingPstId; // 存栏位置id
			subData.peizhongleixingid = _this.sowSelected.breedTypeId; // 配种类型id

			return subData;
		},
		//提交数据
		dataSubmit() {
			let _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			let data = _this.submitData();//整理数据
			params = {...params, ...data};
			console.log(params);
			
			//发送请求
			common.commRequest(`/PigMatingRecord/insertCtPigMatingRecord`, params, headers,'post',
				function(data) {
					console.log(data)
					if(data.status==200){
						uni.navigateTo({
							url: `/pages/dataCollection/breedRecord/breedQuery`,
						});
					}
			})
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

.editor-title {
	display: flex;
	justify-content: space-between;

	// 标题
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
