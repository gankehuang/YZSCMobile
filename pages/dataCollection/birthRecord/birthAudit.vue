<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">分娩记录编辑</view>
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
								<!-- <input type="text" v-model="detailInfo.earNum" placeholder="" /> -->
								<str-autocomplete
									:stringList="sowNumList[0]"
									:importvalue="detailInfo.earNum"
									@select="selectSow"
									backgroundColor="#ffffff"
									highlightColor="#FF0000"
									v-model="detailInfo.earNum"
								></str-autocomplete>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								合格公猪
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="detailInfo.qualifiedMale" placeholder="" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								合格母猪
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="detailInfo.qualifiedFemale" placeholder="" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								弱仔数
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="detailInfo.weakNum" placeholder="" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								畸形数
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="detailInfo.deformNum" placeholder="请输入畸形数" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								木乃伊
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="detailInfo.mummyNum" placeholder="请输入木乃伊" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								死胎数
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="detailInfo.deadNum" placeholder="请输入死胎数" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								活仔数
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="liveNum" placeholder="自动求和" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">总仔数</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="totalNum" placeholder="自动求和" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">窝号</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="detailInfo.nestId" placeholder="请输入窝号" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								窝重
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="detailInfo.totalWeight" placeholder="请输入窝重" /></view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								窝均重
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="number" v-model="detailInfo.avgWeight" placeholder="请输入窝均重" /></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="submits jus-b">
			<button type="primary" class="flexc add-btn">删除</button>
			<button type="primary" class="flexc submit-btn" @click="update">提交</button>
		</view>
	</view>
</template>

<script>
//引入通用请求接口
import common from '../../../utils/common.js';
//自动补全输入框
import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue';

export default {
	components: {
		strAutocomplete
	},
	onLoad(e) {
		this.fid = decodeURIComponent(e.id);
		console.log(this.fid);
		this.getDetail();//获取详情数据
		this.tools();//获取备选母猪耳号
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			date: currentDate,

			fid: '', //分娩记录fid
			detailInfo: {
				earNum: '',
				earNumId: '',
				qualifiedMale: 0,
				qualifiedFemale: 0,
				weakNum: 0,
				deformNum: 0,
				mummyNum: 0,
				deadNum: 0,
				nestId: 0,
				totalWeight: 0,
				avgWeight: 0
			},
			
			// 母猪耳号
			sowNumList: [['LY11993', 'LY77335']]
			//sowNumValue: '',//直接使用detailInfo.earNum
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},
		totalNum() {
			let live = parseInt(this.detailInfo.qualifiedMale) + parseInt(this.detailInfo.qualifiedFemale) + parseInt(this.detailInfo.weakNum);
			let total = live + parseInt(this.detailInfo.deformNum) + parseInt(this.detailInfo.mummyNum) + parseInt(this.detailInfo.deadNum);

			return total;
		},
		liveNum() {
			let live = parseInt(this.detailInfo.qualifiedMale) + parseInt(this.detailInfo.qualifiedFemale) + parseInt(this.detailInfo.weakNum);

			return live;
		}
		
	},
	methods: {
		//获取供选择的母猪耳号
		tools() {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt'// 猪场id
				//cffieldid: 'Va4AAAAYuCGdu1vk'// 分场
			};
		
			// 母猪耳牌号
			let sowNumList = [[], []];
			common.commRequest(`/PigBirthRecord/erpaihaoFilter/1/10000`, params, headers, 'get', function(data) {
				console.log(data);
				let getData = data.data;
				for (let i = 0; i < getData.length; i++) {
					sowNumList[0].push(getData[i].MUZHUERPAI);
					sowNumList[1].push(getData[i].MUZHUID);
				}
				_this.sowNumList = sowNumList;
				// console.log(_this.sowNumList)
			});
		},
		// 过滤框选择母猪耳号
		selectSow(opt) {
			//输入提示框选择
			this.sowNumValue = opt;
			this.detailInfo.earNum = opt;
			console.log(opt);
			this.detailInfo.earNumId = this.sowNumList[1][this.sowNumList[0].indexOf(this.sowNumValue)];
		},
		
		//获取详情信息
		getDetail() {
			console.log('开始获取详情数据。');
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				fid: _this.fid
				
				//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				//cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			
			common.commRequest(`/PigBirthRecord/selectBirthRecordByFid`, params, headers, 'get', function(data) {
				console.log(data);
				let getData = data.data;
				let info = {};

				info.earNum = getData.cfsownonum ? getData.cfsownonum : ''; // 耳牌号
				info.earNumId = getData.cfsownoid ? getData.cfsownoid : ''; // 耳牌id
				info.qualifiedMale = getData.cfimale != null ? getData.cfimale : ''; // 合格公
				info.qualifiedFemale = getData.cfifmal != null ? getData.cfifmal : ''; // 合格母
				info.weakNum = getData.cfiweak != null ? getData.cfiweak : ''; // 弱仔数
				info.deformNum = getData.cfiderm != null ? getData.cfiderm : ''; // 畸形数
				info.mummyNum = getData.cfimumy != null ? getData.cfimumy : ''; // 木乃伊
				info.deadNum = getData.cfidith != null ? getData.cfidith : ''; // 死胎数
				info.nestId = getData.cfpitno != null ? getData.cfpitno : ''; // 窝号
				info.totalWeight = getData.cffaawt != null ? getData.cffaawt : ''; // 窝重;
				info.avgWeight = getData.cfavgwt != null ? getData.cfavgwt : ''; // 窝均重

				//自动计算
				info.liveNum = info.qualifiedMale + info.qualifiedFemale + info.weakNum; //getData.cfilive != null ? getData.cfilive : ''; // 活仔数
				info.totalNum = info.liveNum + info.deformNum + info.mummyNum + info.deadNum; //getData.cfincnt != null ? getData.cfincnt : ''; // 总仔数

				_this.detailInfo = info;
			});
		},
		// 更新
		update() {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				fid: _this.fid
			};
			let data = {};
			data.cfsownoid = _this.detailInfo.earNumId;//耳号id
			data.cfimale = _this.detailInfo.qualifiedMale;//合格公
			data.cfifmal = _this.detailInfo.qualifiedFemale;//合格母
			data.cfiweak = _this.detailInfo.weakNum;//弱仔数
			data.cfiderm = _this.detailInfo.deformNum;//畸形数
			data.cfimumy = _this.detailInfo.mummyNum;//木乃伊
			data.cfidith = _this.detailInfo.deadNum;//死胎数
			data.cfilive = _this.liveNum;//活仔数
			data.cfincnt = _this.totalNum;//总仔数
			data.cfpitno = _this.detailInfo.nestId;//窝号
			data.cffaawt = _this.detailInfo.totalWeight;//窝重
			data.cfavgwt = _this.detailInfo.avgWeight;//窝均重

			params = { ...params, ...data };
			console.log(params);
			common.commRequest(`/PigBirthRecord/updatePigBirthRecord`, params, headers, 'post', function(data) {
				console.log(data);
				if (data.status == 200) {
					uni.navigateTo({
						url: `/pages/dataCollection/birthRecord/birthQuery`
					});
				}
			});
		},

		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
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
	}
}
</style>
