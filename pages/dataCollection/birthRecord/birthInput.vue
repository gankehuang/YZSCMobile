<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title" style="padding-left: 35%;">分娩单个录入</view>
				<view class="status-del" @click="openPopup">生成后裔个体</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 耳牌号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号
								<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" value="" placeholder="DD0001" /> -->
								<str-autocomplete
									:stringList="sowNumList[0]"
									:importvalue="sowNumValue"
									@select="selectSow"
									backgroundColor="#ffffff"
									highlightColor="#FF0000"
									v-model="sowNumValue"
								></str-autocomplete>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								合格公
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="5" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								合格母
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="5" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								弱仔数
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="5" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								畸形数
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请输入畸形数" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								木乃伊
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请输入木乃伊" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								死胎数
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请输入死胎数" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								活仔数
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请输入活仔数" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">总仔数</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="自动求和" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">窝号</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请输入窝号" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								窝重
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请输入窝重" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								窝均重
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请输入窝均重" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								接产人
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请输入接产人" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field no-bottom">
							<view class="main-wrap-contetnt-item-field-name">
								饲养员
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" value="" placeholder="请输入饲养员" /> -->
								<picker @change="bindPickerChange" :value="feederIndex" :range="feederArr" range-key="feederName">
									<view class="picker">
										<view class="uni-input">{{ feederArr[feederIndex].feederName }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" /></view>
									</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="submits jus-b">
			<button type="primary" class="flexc add-btn">取消</button>
			<button type="primary" class="flexc submit-btn">确定</button>
		</view>

		<!-- 生成后裔个体 -->
		<uni-popup ref="childList" type="center">
			<!-- 列表 -->
			<view class="list" style="padding-top: 0;">
				<view class="data__wrapper" style="padding: 0;">
					<ztable :tableData="childData" :columns="childColumns" :neddCheck="false" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="submits jus-b"><button type="primary" class="flexc submit-btn">确定</button></view>
		</uni-popup>
	</view>
</template>

<script>
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
//引入改造弹窗
import uniPopup from '@/components/uni-popup/uni-popup.vue';
//引入列表组件
import ztable from '@/components/z-table/z-table';
// 引入公共请求接口
import common from '../../../utils/common.js';
//自动补全输入框
import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue';

export default {
	components: {
		uniIcon,
		uniPopup,
		ztable,
		strAutocomplete
	},
	onLoad: function(options) {
		let _this = this;
		_this.active = !_this.active;
		_this.getPickerData();
		
		uni.getStorage({
			key: 'birthNewRecord',
			success: function(res) {
				console.log(JSON.parse(res.data));
			}
		})
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			//新增记录的索引，由上一页面传入
			recordIndex: 0,
			
			date: currentDate,
			
			//新增记录数据earNum
			birthNewRecord: [],
			//当前记录数据
			detailInfo: {
				earNum: '',//耳牌号
				earNumId: '',//耳牌号id
				qualifiedMale: 0,//合格公
				qualifiedFemale: 0,//合格母
				weakNum: 0,//弱仔数
				deformNum: 0,//畸形数
				mummyNum: 0,//木乃伊
				deadNum: 0,//死胎数
				//computed活仔数(totalNum)、总仔数(liveNum)自动求和计算
				nestId: 0,//窝号
				totalWeight: 0,//窝重
				avgWeight: 0,//窝均重
				midwife: ''//接产人
				//饲养员picker选择
			},

			//饲养员
			feederArr: [],
			feederIndex: 0,
			
			// 母猪耳号
			sowNumList: [['LY11993', 'LY77335']],
			sowNumValue: '',

			//后裔个体列表数据
			childData: [
				{
					index: '1',
					childLabel: 'PLGZ039',
					variety: '杜洛克',
					sex: '公',
					birthWeight: '72kg',
					leftNipple: '-',
					rightNipple: '-',
					batchId: 'LY9292'
				},
				{
					index: '2',
					childLabel: 'PLGZ040',
					variety: '杜洛克',
					sex: '母',
					birthWeight: '72kg',
					leftNipple: '-',
					rightNipple: '-',
					batchId: 'LY9292'
				}
			],
			//后裔个体列表字段
			childColumns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '仔猪国标号',
					key: 'childLabel',
					width: 150
				},
				{
					title: '品种',
					key: 'variety',
					width: 150
				},
				{
					title: '性别',
					key: 'sex',
					width: 100
				},
				{
					title: '出生重',
					key: 'birthWeight',
					width: 150
				},
				{
					title: '左乳头',
					key: 'leftNipple',
					width: 150
				},
				{
					title: '右乳头',
					key: 'rightNipple',
					width: 150
				},
				{
					title: '批次号',
					key: 'batchId',
					width: 150
				}
			]
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},
		//总仔数
		totalNum() {
			let live = parseInt(this.detailInfo.qualifiedMale) + parseInt(this.detailInfo.qualifiedFemale) + parseInt(this.detailInfo.weakNum);
			let total = live + parseInt(this.detailInfo.deformNum) + parseInt(this.detailInfo.mummyNum) + parseInt(this.detailInfo.deadNum);
		
			return total;
		},
		//活仔数
		liveNum() {
			let live = parseInt(this.detailInfo.qualifiedMale) + parseInt(this.detailInfo.qualifiedFemale) + parseInt(this.detailInfo.weakNum);
		
			return live;
		}
	},
	methods: {
		//获取picker的数据
		getPickerData() {
			var _this = this;
			let headers = {};
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt' // 猪场id
				//cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			
			// 母猪耳牌号
			let sowNumList = [[], []];
			common.commRequest(`/PigBirthRecord/erpaihaoFilter/1/100`, params, headers, 'get', function(data) {
				//console.log(data);
				let getData = data.data;
				for (let i = 0; i < getData.length; i++) {
					sowNumList[0].push(getData[i].MUZHUERPAI);
					sowNumList[1].push(getData[i].MUZHUID);
				}
				_this.sowNumList = sowNumList;
				// console.log(_this.sowNumList)
			});
			
			let feederArr = [];
			//饲养员
			common.commRequest(`/PigBirthRecord/breederFilter/1/10000`, params, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					feederArr.push({
						feederName: getData[i].SIYANGYUAN,
						feederId: getData[i].SIYANGYUANID,
						pigfarmId: getData[i].CFBELONGZCID
					});
				}
				_this.feederArr = feederArr;
			});
			
		},
		// 选择母猪耳号
		selectSow(opt) {
			//输入提示框选择
			this.sowNumValue = opt;
			this.detailInfo.earNum = opt;
			console.log(opt);
			this.detailInfo.earNumId = this.sowNumList[1][this.sowNumList[0].indexOf(this.sowNumValue)];
		},
		
		bindPickerChange: function(e) {
			console.log('饲养员picker发送选择改变，携带值为', e.target.value);
			this.feederIndex = e.target.value;
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

		// 打开生成后裔个体弹窗
		openPopup() {
			this.$refs.childList.open();
		},
		closePopup() {
			this.$refs.childList.close();
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';

.status-header {
	padding-top: 26rpx;
}

.main {
	.main-wrap {
		padding: 160rpx 23rpx 0 23rpx;
		.main-wrap-contetnt {
			padding-bottom: 0;
		}
	}
}
</style>
