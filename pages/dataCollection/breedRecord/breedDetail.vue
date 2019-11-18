<template>
	<view>
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">配种记录详情</view>
				<view class="status-del" v-if="!btnState" @tap="togglePopup('middle')">删除</view>
				<view class="status-del" v-if="btnState" @tap.stop="edit">编辑</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 配种日期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种日期
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="detailInfo.breedingDate" placeholder="请输入配种日期" :disabled="flag" />
							</view>
						</view>
						<!-- 配种批次 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种批次
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" :value="detailInfo.breedBatch" placeholder="请输入配种批次" :disabled="flag" />
								</view>
								
								<!-- <picker @change="bindPickerChange" :value="index" :range="array3" :disabled="flag">
									<view class="picker">
										<view class="uni-input">{{ array3[index] }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker> -->
							</view>
						</view>

						<!-- 预产期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">预产期</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="detailInfo.birthDate" placeholder="自动计算" :disabled="flag" />
							</view>
						</view>
						<!-- 转入位置 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">转入位置</view>
							<view class="main-wrap-contetnt-item-field-value">
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" :value="detailInfo.transPst" placeholder="请输入转入位置" :disabled="flag" />
								</view>
								
								<!-- <picker @change="bindPickerChange" :value="index" :range="array2" :disabled="flag">
									<view class="picker">
										<view class="uni-input">{{ array2[index] }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker> -->
							</view>
						</view>
						<!-- 公猪耳号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								公猪耳号
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="detailInfo.boarcard" placeholder="请输入公猪耳牌号" :disabled="flag" />
							</view>
						</view>
						<!-- 配种时段 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种时段
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请选择配种时段" :disabled="flag" /></view>
						</view>
						<!-- 配种员 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种员
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" :value="detailInfo.breeder" placeholder="请输入配种员" :disabled="flag" />
								</view>
								
								<!-- <picker @change="bindPickerChange" :value="index" :range="array1" :disabled="flag">
									<view class="picker">
										<view class="uni-input">{{ array1[index] }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" size="18" /></view>
									</view>
								</picker> -->
							</view>
						</view>

						<!-- 与配公猪 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">与配公猪</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="detailInfo.boarcard" placeholder="请输入与配公猪" :disabled="flag" />
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
											<uni-rate max="3" :value="detailInfo.optScore[0]" color="#D4D4D4" 
												active-color="#F06257" margin="20" size="18" 
												@change="scoreChange" :disabled="flag"></uni-rate>
										</view>
										<view class="grade-item">
											<view class="grade-item-name">锁住</view>
											<uni-rate max="3" :value="detailInfo.optScore[1]" color="#D4D4D4" 
												active-color="#F06257" margin="20" size="18" 
												@change="scoreChange1" :disabled="flag"></uni-rate>
										</view>
										<view class="grade-item">
											<view class="grade-item-name">倒流</view>
											<uni-rate max="3" :value="detailInfo.optScore[2]" color="#D4D4D4" 
												active-color="#F06257" margin="20" size="18" 
												@change="scoreChange2" :disabled="flag"></uni-rate>
										</view>

									<!-- <view class="grade-item">
										<view class="grade-item-name">静立</view>
										<view class="grade-item-stars">
											<view class="grade-item-stars-star"><image class="icon" src="/static/assets/star@2x.png" mode=""></image></view>
											<view class="grade-item-stars-star"><image class="icon" src="/static/assets/star@2x.png" mode=""></image></view>
											<view class="grade-item-stars-star"><image class="icon" src="/static/assets/star2@2x.png" mode=""></image></view>
										</view>
									</view> -->
								</view>
							</view>
						</view>
						<!-- 均重（公） -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								均重（公）
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="detailInfo.avgMale" placeholder="请输入公猪均重" :disabled="flag" /></view>
						</view>
						<!-- 耳牌号 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								母猪耳牌号
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="detailInfo.sowcard" placeholder="请输入母猪耳号" :disabled="flag" /></view>
						</view>
						<!-- 均重母 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								均重（母）
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" :value="detailInfo.avgFemale" placeholder="请输入母猪均重" :disabled="flag" />
							</view>
						</view>
						<!-- 猪只状态 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">猪只状态</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="detailInfo.pigState" placeholder="自动带出" :disabled="flag" /></view>
						</view>
						<!-- 存栏位置 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">存栏位置</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="detailInfo.savingPst" placeholder="自动带出" :disabled="flag" /></view>
						</view>
						<!-- 配种类型 -->
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">配种类型</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" :value="detailInfo.breedingType" placeholder="自动带出" :disabled="flag" /></view>
						</view>

						<!-- <view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">提交人</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" :disabled="flag" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">提交时间</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" :disabled="flag" /></view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b"><button @click="update" type="primary" class="flexc save-btn" :disabled="flag">提交</button></view>

		<!-- 删除提示框 -->
		<uni-popup :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="popview">
				<view class="out-text">确定要删除吗？</view>
				<view @click="togglePopup('')" class="out-btn1">取消</view>
				<view @click="goback()" class="out-btn2">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
//引入提示框
import uniPopup from '@/components/uni-popup/uni-popup';
//引入通用请求接口
import common from '../../../utils/common.js';
//引入时间转换
import { timeFormat } from '@/utils/dateUtils.js';
//引入评分组件
import uniRate from '@/components/uni-rate/uni-rate';

export default {
	components: {
		uniIcon,
		uniPopup,
		uniRate
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			array: ['请选择配种时段', '美国', '巴西', '日本'],
			array1: ['张三', '美国', '巴西', '日本'],
			array2: ['请选择转入位置', '分娩舍1栋1单元', '分娩舍1栋2单元', '分娩舍1栋3单元', '分娩舍1栋4单元'],
			array3: ['请选择配种批次', 'PC-201365', 'PC-201565', 'PC-201355', 'PC-201360'],
			index: 0,
			date: currentDate,
			btnState: true, //删除，编辑按钮状态
			flag: true, //是否可编辑状态
			show: false,
			type: '',
			
			fid: '', //配种记录fid
			detailInfo: null //配种记录详情
		};
	},
	onLoad(e) {
		e.id == '01' ? (this.btnState = true) : (this.btnState = false);
		this.fid = decodeURIComponent(e.fid);
		// console.log(this.fid);
		this.getDetail();
		this.scoreArr = detailInfo.optScore;
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
		bindPickerChange: function(e) {
			// console.log('picker发送选择改变，携带值为', e.target.value)
			this.index = e.target.value;
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		},

		scoreChange(e) {
			// console.log('静立 分值改变前为:' + this.detailInfo.optScore[0]);
			this.detailInfo.optScore[0] = e.value;
			// console.log('静立 分值改变后为:' + this.detailInfo.optScore[0]);
		},
		scoreChange1(e) {
			this.detailInfo.optScore[0] = e.value;
		},
		scoreChange2(e) {
			this.detailInfo.optScore[0] = e.value;
		},

		//获取详情信息
		getDetail() {
			var _this = this;
			let params = {
				fid: _this.fid,
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			let headers = {};
			common.commRequest(`/PigMatingRecord/selectByFid`, params, headers, 'get', function(data) {
				console.log(data);
				let getData = data.data;
				let info = {};
				info.breedingDate = getData.cfbreedingdate ? timeFormat(getData.cfbreedingdate, 'yyyy-MM-dd') : ''; // 配种日期
				info.breedBatch = getData.breedpc ? getData.breedpc : ''; // 配种批次
				info.birthDate = getData.cfchildbirthdate ? timeFormat(getData.cfchildbirthdate, 'yyyy-MM-dd') : ''; // 预产期
				info.transPst = getData.zrwz ? getData.zrwz : ''; // 母猪转入位置
				info.breedingTime = getData.pzapm ? getData.pzapm : ''; // 配种时段
				info.breeder = getData.pzy ? getData.pzy : ''; // 配种员
				info.boarcard = getData.cfbornonum ? getData.cfbornonum : ''; // 公猪耳牌号、与配公猪
				info.avgMale = getData.cfavemale ? getData.cfavemale : ''; // 均重公
				info.sowcard = getData.cfsownonum ? getData.cfsownonum : ''; // 母猪耳号
				info.avgFemale = getData.cfavefemale ? getData.cfavefemale : ''; // 均重（母）
				info.transPst = getData.zrwz ? getData.zrwz : ''; // 转入栏位;
				info.pigState = getData.pigstate ? getData.pigstate : ''; // 猪只状态
				info.savingPst = getData.clwz ? getData.clwz : ''; // 存栏位置
				info.breedingType = getData.peizhongtype ? getData.peizhongtype : ''; // 配种类型
				info.optScore = getData.cfscore ? getData.cfscore.toString().split('') : [0, 0, 0]; // 操作评分

				_this.detailInfo = info;
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
		edit() {
			//点击右上角编辑
			this.flag = false;
		},

		togglePopup(type) {
			this.type = type;
		},
		goback() {
			this.handOnClickBack();
			return false;
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';

.status-header {
	padding-top: 26rpx;

	.status-title {
		padding-left: 35%;
	}
}

.main {
	.main-wrap {
		padding: 160rpx 23rpx 23rpx 23rpx;
	}
}
/*提示框样式*/
.popview {
	height: 150upx;
	padding-top: 33upx;
	display: block;
	float: clear;
	width: 530upx;
}

.out-text {
	font-size: 28upx;
	margin-bottom: 55upx;
	display: block;
	float: clear;
	text-align: center;
}

.out-btn1 {
	width: 50%;
	display: inline-block;
	color: rgb(179, 179, 179);
	text-align: center;
	// margin-left: 120upx;
	// margin-right: 184upx;
}

.out-btn2:active,
.out-btn1:active {
	background: #eeeeee;
}

.out-btn2 {
	display: inline-block;
	text-align: center;
	color: #ff4343;
	width: 50%;
}
</style>
