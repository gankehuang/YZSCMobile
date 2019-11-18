<template>
	<view>
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					发情记录新增
				</view>
				<view class="status-del"  @click="jumpPage" data-key="操作记录" data-jumpurl="/pages/dataCollection/ruttingRecord/ruttingQuery">
					历史记录
				</view>
			</view>
		</view>
		<!-- 内容 -->
		
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								发情日期
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectDate">
								<!-- <input type="text" value=""  placeholder="请输入"/> -->
								<text>{{subData.fbizdate}}</text>
								<image src="../../../static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin: 0rpx 15rpx 0 10rpx;"></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								诱情人员
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="subData.heatpeople" placeholder="请输入"/>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								诱情公猪
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="subData.cfbornonum" placeholder="请输入"/>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt" style="padding-top: 0rpx;">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(1)">
								<!-- <input type="text" v-model="subData.cfsownonum" placeholder="请输入" /> -->
								<text>{{subData.cfsownonum || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="main">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt" style="padding-top: 0rpx;">
					<view class="main-wrap-contetnt-item">
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								第一次发情<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="subData.cfesfrt" placeholder="请输入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								第二次发情<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="subData.cfessec" placeholder="请输入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								第三次发情<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="subData.cfesthr" placeholder="请输入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								存栏位置<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="subData.clwz" placeholder="请输入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								是否宜配种<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<label class="checkbox">
									<checkbox :checked="subData.pz" @tap="checkChange" />
								</label>
							</view>
						</view>
						
					</view>
				</view>

			</view>
			
			<!-- <view class="main-wrap" style="padding-top: 0;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="DD0001" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								合格公<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="5" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								合格母<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="5" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								弱仔数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="5" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								畸形数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入畸形数" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								木乃伊
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入木乃伊" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								死胎数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入死胎数" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								窝号
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入窝号" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								窝重<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入窝重" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								窝均重<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入窝均重" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								活仔数<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入活仔数" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								总仔数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="自动求和" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field no-bottom">
							<view class="main-wrap-contetnt-item-field-name">
								接产人<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array1">
									<view class="picker">
										<view class="uni-input">{{array1[index]}}</view>
										<view class="dextrad-icon">
											<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
										</view>
									</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
		
		
		<view class="editor-title jus-j form-seat">
			<!-- <view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>发情明细</text>
			</view> -->
			<!-- <view class="confirm-btn" >
				<button type="primary"  v-if="submitStatus" class="flexc" @click="jumpPage" data-key="单个录入" data-jumpurl="/pages/dataCollection/ruttingRecord/ruttingInput">单个录入</button>
				<button type="warn" v-if="editStatus" class="flexc">删除(3)</button>
			</view> -->
		</view>
		<!-- 列表 -->
		<!-- <view class="list list-table">
			<view class="data__wrapper">
				<ztable stickSide stickSide1 :tableData="tableData" :columns="columns" :neddCheck="neddCheck" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view> -->
		
		<!-- <view class="editor-title jus-j form-seat">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>后裔个体明细</text>
			</view>
		</view> -->
		<!-- 列表 -->
		<!-- <view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData1" :columns="columns1"  emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view> -->
		<view class="submits jus-b">
			<button type="primary" @tap="submit" class="flexc submit-btn">提交</button>
			<!-- <button type="primary" v-if="submitStatus" class="flexc add-btn" @tap="clickEdit">编辑</button> -->
			<!-- <button type="primary" v-if="editStatus" class="flexc cancel-btn" @tap="clickCancel">取消</button> -->
			<!-- <button type="primary" v-if="editStatus" class="flexc add-btn">修改</button> -->
		</view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"
		 ></mpvue-picker>
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
	import ztable from '@/components/z-table/z-table'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import common from '../../../utils/common.js';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
	export default {
		onLoad() {
			//this.getEPH('')
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				themeColor: '#007AFF',  //时间选择框主题色
				array: ['请选择配种时段', '美国', '巴西', '日本'],
				array1: ['张三', '美国', '巴西', '日本'],
				array2: ['请选择转入位置', '分娩舍1栋1单元', '分娩舍1栋2单元', '分娩舍1栋3单元', '分娩舍1栋4单元'],
				array3: ['请选择配种批次', 'PC-201365', 'PC-201565', 'PC-201355', 'PC-201360'],
				index: 0,
				date: currentDate,
				neddCheck:false,
				submitStatus:true,
				editStatus:false,
				tableData: [{
						id: '01',
						index: '01',
						sowcard: 'Y001', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx'
					},{
						id: '02',
						index: '02',
						sowcard: 'Y002', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx'
					},{
						id: '03',
						index: '03',
						sowcard: 'Y003', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx'
					},{
						id: '04',
						index: '04',
						sowcard: 'Y004', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx'
					},{
						id: '05',
						index: '05',
						sowcard: 'Y005', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx'
					},
				],
				columns: [{
						title: "序号",
						key: "index",
						width: 70,
					}, {
						title: "母猪耳牌",
						key: "sowcard",
						width: 200,
					}, {
						title: "第三次发情日期",
						key: "hgg",
						width: 220,
					}, {
						title: "第二次发情日期",
						key: "hgm",
						width: 220,
					}, {
						title: "第一次发情日期",
						key: "rzs",
						width: 220,
					}, 
				],
				tableData1: [{
						id: '01',
						index: '01',
						sowcard: 'DDZBBK31200', //仔猪国标号
						grade: '杜洛克', //品种
						boarcard: '公猪', //性别
						breeder: '1.2', //出生重
						date: '7' //左乳头
					}, {
						id: '02',
						index: '02',
						sowcard: 'DDZBBK31200', //仔猪国标号
						grade: '杜洛克', //品种
						boarcard: '公猪', //性别
						breeder: '1.2', //出生重
						date: '7' //左乳头
					}, {
						id: '03',
						index: '03',
						sowcard: 'DDZBBK31200', //仔猪国标号
						grade: '杜洛克', //品种
						boarcard: '公猪', //性别
						breeder: '1.2', //出生重
						date: '7' //左乳头
					}, {
						id: '04',
						index: '04',
						sowcard: 'DDZBBK31200', //仔猪国标号
						grade: '杜洛克', //品种
						boarcard: '公猪', //性别
						breeder: '1.2', //出生重
						date: '7' //左乳头
					},{
						id: '01',
						index: '01',
						sowcard: 'DDZBBK31200', //仔猪国标号
						grade: '杜洛克', //品种
						boarcard: '公猪', //性别
						breeder: '1.2', //出生重
						date: '7' //左乳头
					}, {
						id: '02',
						index: '02',
						sowcard: 'DDZBBK31200', //仔猪国标号
						grade: '杜洛克', //品种
						boarcard: '公猪', //性别
						breeder: '1.2', //出生重
						date: '7' //左乳头
					}, {
						id: '03',
						index: '03',
						sowcard: 'DDZBBK31200', //仔猪国标号
						grade: '杜洛克', //品种
						boarcard: '公猪', //性别
						breeder: '1.2', //出生重
						date: '7' //左乳头
					}, {
						id: '04',
						index: '04',
						sowcard: 'DDZBBK31200', //仔猪国标号
						grade: '杜洛克', //品种
						boarcard: '公猪', //性别
						breeder: '1.2', //出生重
						date: '7' //左乳头
					},{
						id: '01',
						index: '01',
						sowcard: 'DDZBBK31200', //仔猪国标号
						grade: '杜洛克', //品种
						boarcard: '公猪', //性别
						breeder: '1.2', //出生重
						date: '7' //左乳头
					},
				],
				columns1: [{
						title: "序号",
						key: "index",
						width: 70,
					}, {
						title: "仔猪国标号",
						key: "sowcard",
						width: 180,
					}, {
						title: "品种",
						key: "grade",
						width: 150,
					}, {
						title: "性别",
						key: "boarcard",
						width: 150,
					}, {
						title: "出生重",
						key: "breeder",
						width: 150,
					}, {
						title: "左乳头",
						key: "date",
						width: 200,
					},
				],
				
				subData: {
					fbizdate: '',  //发情日期
					heatpeople: '', //诱情人员
					cfbornonum: '',  //诱情公猪
					cfsownonum: '', //母猪耳牌
					cfesfrt: '',  //第一次发情
					cfessec: '',  //第二次发情
					cfesthr: '',  //第三次发情
					clwz: '',   //存栏位置
					pz: true,   //是否宜配种 (字段名未定)
				},
				
				list: [],  //搜索选择器数据
				selectType: '',   //选择的字段
				
			}
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
			tkiTree
		},
		methods: {
			/* *******************************搜索选择器转出批次相关方法************************************* */
			//选择确定
			treeConfirm(e) {
				//console.log(e);
				if(e[0]){
					if(this.selectType == 1){  //耳牌号
						this.subData.cfsownonum = e[0].name
						this.subData.cfesfrt = e[0].cfesfrt   //第一次发情
						this.subData.cfessec = e[0].cfessec   //第二次发情
						this.subData.cfesthr = e[0].cfesthr   //第三次发情
					}
				}
			},
			//显示搜索选择器
			selectRP(e) {
				this.list = []
				if(e == 1){  //转入批次
					this.selectType = 1
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
						_this.getEPH(e)  //获取耳牌号
					}
				}, 500)
			},
			//获取耳牌号
			getEPH(e){
				var _this = this;
				let url = '/PigHeatRecord/selectErpaihaoFilter/1/10';
				//console.log(e);
				let params = {
					//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAABHv/mdu1vk',    // 分场
					cfsownonum: e,
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						console.log(data);
						let EPList = data.data.list;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.pigtype
							obj.name = ele.cfsownonum    //耳牌号
							obj.cfesfrt = ele.cfesfrt    //第一次发情
							obj.cfessec = ele.cfessec    //第二次发情
							obj.cfesthr = ele.cfesthr    //第三次发情
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			
			/* ****************************************************************** */
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			selectDate: function(){  //显示时间选择框
				this.$refs.mpvuePicker.show()
			},
			//选择时间确定
			onConfirmDate: function(e) {
				//console.log(e.label);
				this.subData.fbizdate = e.label
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
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			clickEdit() {
				this.neddCheck = true;
				this.editStatus=true;
				this.submitStatus=false;
			},
			clickCancel(){
				this.neddCheck = false;
				this.editStatus=false;
				this.submitStatus=true;
			},
			
			/* **********************提交数据方法*********************************** */
			submit() {  //提交数据
				console.log(this.subData)
				this.sendData(this.subData);
			},
			sendData(params) {  //提交数据
				uni.showLoading({
					title: '提交中...'
				});
				let headers = {};
				common.commRequest(`/PigHeatRecord/insertHeatRecord`, params, headers, 'post',
					function(data) {
						console.log(data)
						if(data.status == 200){
							setTimeout(function() {
								uni.hideLoading();
								uni.showToast({
								    title: '成功',
									icon: 'success',
								    duration: 1000
								});
							}, 1000);
						}else {
							setTimeout(function() {
								uni.hideLoading();
								uni.showToast({
								    title: '失败',
									icon: 'none',
								    duration: 1000
								});
							}, 1000);
						}
						
						
						
				})
			},
			/* ******************************************************************** */
			checkChange() {  //选择框改变
				this.subData.pz = !this.subData.pz;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

	.status-header {
		padding-top: 26rpx;

		.status-title {
			padding-left: 35%;
		}
	}

	.list-table {
		margin-top: -120px;
	}
</style>
