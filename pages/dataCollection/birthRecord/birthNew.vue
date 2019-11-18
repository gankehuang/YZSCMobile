<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">分娩记录新增</view>
				<view class="status-del" @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/birthRecord/birthQuery">历史记录</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="editor-title flex ali-c" style="padding-top: 130rpx;">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>基本信息</text>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 仔猪转入批次 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								仔猪转入批次
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="childBatchIndex" :range="childBatchArr" range-key="batchNum">
									<view class="picker">
										<view class="uni-input">{{ childBatchArr[childBatchIndex].batchNum }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" /></view>
									</view>
								</picker>
							</view>
						</view>
						<!-- 母猪转入位置 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								母猪转入位置
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange1" :value="sowTransPstIndex" :range="sowTransPstArr" range-key="position">
									<view class="picker">
										<view class="uni-input">{{ sowTransPstArr[sowTransPstIndex].position }}</view>
										<view class="dextrad-icon"><uni-icon type="arrowright" color="#333333" /></view>
									</view>
								</picker>
							</view>
						</view>
						<!-- 计划分娩数 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">计划分娩数</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" disabled="true" value="自动传入" /></view>
						</view>
						<!-- 累计分娩数 -->
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">累计分娩数</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" disabled="true" value="审核回写" /></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="editor-title jus-j form-seat">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>分娩明细</text>
			</view>
			<!-- 按钮  -->
			<view class="submits jus-b" style="margin: 0;">
				<button
					form-type="submit"
					type="primary"
					class="flexc submit-btn"
					style="width: 152rpx; height: 64rpx; padding: 0 48rpx; font-size: 28rpx;"
					@click="jumpPage"
					data-key="分娩明细新增"
					data-jumpurl="/pages/dataCollection/birthRecord/birthInput"
				>
					新增
				</button>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list">
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="neddCheck" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
			</view>
		</view>
		<view class="submits jus-b"><button type="primary" v-if="submitStatus" class="flexc submit-btn">提交</button></view>
	</view>
</template>

<script>
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import ztable from '@/components/z-table/z-table';
// 引入公共请求接口
import common from '../../../utils/common.js';

export default {
	onLoad: function(options) {
		let _this = this;
		_this.active = !_this.active;
		
		uni.removeStorage({
			key: 'birthNewRecord',
			success: function (res) {
				console.log('success');
			}
		});
		//初始化新增记录
		uni.setStorageSync('birthNewRecord', JSON.stringify([])); 
	},
	onShow: function(){
		let _this = this;
		
		uni.getStorage({
			key: 'birthNewRecord',
			success: function (res) {
				let data = JSON.parse(res.data)
				console.log(data);
		    }
		});
	},

	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			//弹窗是否激活
			active: true,

			date: currentDate,
			neddCheck: false,
			submitStatus: true,
			editStatus: false,

			//仔猪转入批次
			childBatchArr: [],
			childBatchIndex: 0,
			//母猪转入位置
			sowTransPstArr: [],
			sowTransPstIndex: 0,

			tableData: [
				{
					id: '01',
					index: '01',
					sowcard: 'Y001',
					hgg: 'xx',
					hgm: 'xx',
					rzs: 'xx',
					qxs: 'xx',
					mny: 'xx',
					sts: 'xx',
					hts: 'xx',
					zzs: 'xx',
					wh: 'xx',
					wz: 'xx',
					wjz: 'xx',
					syy: 'xxx',
					jcr: 'xxx'
				},
				{
					id: '02',
					index: '02',
					sowcard: 'Y002',
					hgg: 'xx',
					hgm: 'xx',
					rzs: 'xx',
					qxs: 'xx',
					mny: 'xx',
					sts: 'xx',
					hts: 'xx',
					zzs: 'xx',
					wh: 'xx',
					wz: 'xx',
					wjz: 'xx',
					syy: 'xxx',
					jcr: 'xxx'
				}
			],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '母猪耳牌',
					key: 'sowcard',
					width: 150
				},
				{
					title: '合格公',
					key: 'hgg',
					width: 100
				},
				{
					title: '合格母',
					key: 'hgm',
					width: 100
				},
				{
					title: '弱仔数',
					key: 'rzs',
					width: 100
				},
				{
					title: '畸形数',
					key: 'qxs',
					width: 100
				},
				{
					title: '木乃伊',
					key: 'mny',
					width: 100
				},
				{
					title: '死胎数',
					key: 'sts',
					width: 100
				},
				{
					title: '活仔数',
					key: 'hts',
					width: 100
				},
				{
					title: '总仔数',
					key: 'zzs',
					width: 100
				},
				{
					title: '窝号',
					key: 'wh',
					width: 100
				},
				{
					title: '窝重',
					key: 'wz',
					width: 100
				},
				{
					title: '窝均重',
					key: 'wjz',
					width: 100
				},
				{
					title: '饲养员',
					key: 'syy',
					width: 100
				},
				{
					title: '接产人',
					key: 'jcr',
					width: 100
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
		}
	},
	components: {
		ztable,
		uniIcon
	},
	methods: {
		getPickerData() {
			var _this = this;
			let headers = {};
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};

			let childBatchArr = [];
			let sowTransPstArr = [];
			//仔猪转入批次
			common.commRequest(`/PigBirthRecord/pigIntoBreedFilter/1/10000`, params, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					childBatchArr.push({
						batchNum: getData[i].PICIHAO,
						batchId: getData[i].PICIID,
						fieldId: getData[i].CFFIELDID
					});
				}
				_this.childBatchArr = childBatchArr;
			});

			//母猪转入位置
			common.commRequest(`/PigBirthRecord/pigIntoDongsheFilter/1/10000`, params, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					sowTransPstArr.push({
						position: getData[i].DONGSHE,
						positionId: getData[i].DONGSHEID,
						fatherOrgId: getData[i].CFFARTHERORGID
					});
				}
				_this.sowTransPstArr = sowTransPstArr;
			});
		},

		//仔猪转入批次选择
		bindPickerChange: function(e) {
			console.log('仔猪转入批次picker发送选择改变，携带值为', e.target.value);
			this.childBatchIndex = e.target.value;
		},
		//母猪转入位置选择
		bindPickerChange1: function(e) {
			console.log('母猪转入位置picker发送选择改变，携带值为', e.target.value);
			this.sowTransPstIndex = e.target.value;
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

		//列表链接到新增条目明细
		rowTapHandler(row) {
			uni.navigateTo({
				url: `/pages/dataCollection/birthRecord/birthInput?index=${encodeURIComponent(row.index)}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
	}
}
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
		padding: 0 23rpx;
	}
}

.editor-title {
	padding: 0 22rpx;

	.title-icon {
		img {
			height: 12rpx;
			width: 12rpx;
		}
	}
}

.list {
	padding: 0 22rpx;

	.data__wrapper {
		padding: 0;
	}
}
</style>
