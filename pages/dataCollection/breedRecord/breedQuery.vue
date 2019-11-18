<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">配种记录查询</view>
				<view class="more-icon" @click="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
			</view>
			<!-- 搜索框 -->
			<view class="status-search">
				<view class="search-wrap">
					<view class="search-wrap-search"><uni-icon type="search" color="#CACFD9"></uni-icon></view>
					<view class="search-wrap-input"><input type="text" value="" placeholder="请输入筛选条件" /></view>
					<view class="search-wrap-qr" @click="scancode"><image class="icon" src="/static/assets/scan-icon.png" mode=""></image></view>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<!-- 列表 -->
		<view class="list">
			<view class="data__wrapper">
				<ztable :tableData="tableData" stickSide stickSide1 :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
			</view>
		</view>

		<!-- 加载  -->
		<view class="uni-tab-bar-loading" @click="loadMore()"><uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more></view>

		<!-- 弹窗 -->
		<popup-layer ref="popupRef1" :direction="'left'" :class="{ active: active }">
			<scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
				<!-- 配种日期 -->
				<draw-cell title="业务日期" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate" style="flex: 1;">
							<text>{{ searchForm.businessStartTime }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate1" style="flex: 1;">
							<text>{{ searchForm.businessEndTime }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<!-- 配种批次 -->
				<draw-cell title="配种批次" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectBatch">
						<text>{{ searchForm.breedBatchFilter.name }}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" style="transform: rotate(-90deg);" />
					</view>
				</draw-cell>
				<!-- 耳牌号 -->
				<draw-cell title="耳牌" required="true">
					<view slot="value" class="bg-gray jus-j">
						<!-- <image @click="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image> -->
						<!-- <input type="text" placeholder="请填写" v-model="searchForm.earNumFilter" /> -->
						<str-autocomplete
							:stringList="sowNumList[0]"
							:importvalue="sowNumValue"
							@select="selectSow"
							backgroundColor="#f5f5f5"
							highlightColor="#FF0000"
							v-model="sowNumValue"
						></str-autocomplete>
					</view>
				</draw-cell>
				<!-- 与配公猪 -->
				<draw-cell title="与配公猪" required="true">
					<view slot="value" class="bg-gray jus-j">
						<!-- <image @click="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image> -->
						<!-- <input type="text" placeholder="请填写" v-model="searchForm.breedBoarFilter" /> -->
						<str-autocomplete
							:stringList="boarNumList[0]"
							:importvalue="boarNumValue"
							@select="selectBoar"
							backgroundColor="#f5f5f5"
							highlightColor="#FF0000"
							v-model="boarNumValue"
						></str-autocomplete>
					</view>
				</draw-cell>
				<!-- 配种类型 -->
				<draw-cell title="配种类型" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectBreedType">
						<text>{{ searchForm.breedTypeFilter.name }}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" style="transform: rotate(-90deg);" />
					</view>
				</draw-cell>
				<!-- 分场 -->
				<draw-cell title="分场" required="true">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="" :value="fieldName" disabled="true" /></view>
				</draw-cell>
			</scroll-view>
			<view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<!-- 开始日期 -->
		<mpvue-picker
			:pickerValueDefault="[0, 0, 0]"
			:themeColor="themeColor"
			ref="mpvuePicker"
			mode="dateSelector"
			@onConfirm="onConfirmDate"
			@onCancelDate="onCancel"
		></mpvue-picker>
		<!-- 结束日期 -->
		<mpvue-picker
			:pickerValueDefault="[0, 0, 0]"
			:themeColor="themeColor"
			ref="mpvuePicker1"
			mode="dateSelector"
			@onConfirm="onConfirmDate1"
			@onCancelDate="onCancel"
		></mpvue-picker>
		<!-- 配种批次 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="batchPicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmBatch"
			:pickerValueArray="breedBatchArr"
		></mpvue-picker>
		<!-- 配种类型 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="breedTypePicker"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmBreedType"
			:pickerValueArray="breedTypeArr"
		></mpvue-picker>
	</view>
</template>

<script>
//  加载更多
import uniLoadMore from '@/components/uni-load-more.vue';
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
//引入时间转换
import { timeFormat } from '@/utils/dateUtils.js';
// 引入弹框组件
import popupLayer from '@/components/popup/popup-layer.vue';
//引入抽屉单元格组件
import drawCell from '@/components/uni-cell/draw-cell.vue';
//引入下拉框
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import ztable from '@/components/z-table/z-table';
//引入通用请求接口
import common from '../../../utils/common.js';
//自动补全输入框
import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue';

export default {
	onLoad: function(options) {
		this.active = !this.active;
		this.getindex(this.pageNum, this.pageSize, false);
		this.tools();
	},
	data() {
		return {
			idNum: 0, // 表格排序
			pageNum: 1, // 页数
			pageSize: 10, // 每页数量
			active: true,
			status: 'more',
			statusTypes: [
				{
					value: 'more',
					text: '加载前'
				},
				{
					value: 'loading',
					text: '加载中'
				},
				{
					value: 'noMore',
					text: '没有更多'
				}
			],
			loadingType: 0, // 加载更多状态
			loadingText: {
				contentdown: '查看更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			deepLength: 1,
			pickerValueDefault: [0],
			themeColor: '#007AFF',
			
			//分场名称
			fieldName:'',

			// 配种批次
			breedBatchArr: [],
			// 母猪耳号
			sowNumList: [['LY11993', 'LY77335']],
			sowNumValue: '',
			// 公猪耳号
			boarNumList: [['GZ746', 'abcd5678']],
			boarNumValue: '',
			// 配种类型
			breedTypeArr: [
				{
					value: '1',
					label: '后备配种',
				},{
					value: '2',
					label: '断奶配种'
				},{
					value: '3',
					label: '反情配种'
				},{
					value: '4',
					label: '空怀配种'
				},{
					value: '5',
					label: '流产配种'
				}
			],
			breedTypeIndex: 0,
			// 分场
			fieldArr: [],
			fieldIndex: '',

			searchForm: {
				businessStartTime: '', // 检测日期
				businessEndTime: '', // 检测日期
				breedBatchFilter: {
					// 配种批次
					id: '',
					name: ''
				},
				breedBoarFilter: '', // 与配公猪
				earNumFilter: '', // 耳牌
				breedTypeFilter: {
					// 配种类型
					id: '',
					name: ''
				},
				fieldId: ''
			},
			tableData: [],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '公猪耳牌',
					key: 'boarcard',
					width: 150
				},
				{
					title: '配种时段',
					key: 'breedingTime',
					width: 200
				},
				{
					title: '配种员',
					key: 'breeder',
					width: 150
				},
				{
					title: '母猪耳牌',
					key: 'sowcard',
					width: 150
				},
				{
					title: '操作评分',
					key: 'optScore',
					width: 150
				},
				{
					title: '均重(公)',
					key: 'avgMale',
					width: 200
				},
				{
					title: '均重(母)',
					key: 'avgFemale',
					width: 200
				},
				{
					title: '存栏位置',
					key: 'savingPst',
					width: 200
				}

				/* ,{
					title: '配种员id',
					key: 'breederId',
					width: 150
				},{
					title: '配种批次id',
					key: 'breedBatchId',
					width: 150
				},{
					title: '配种日期',
					key: 'breedingDate',
					width: 150
				},{
					title: '配种类型',
					key: 'breedingType',
					width: 200
				},{
					title: '母猪转入位置',
					key: 'transPst',
					width: 200
				},{
					title: '配种批次',
					key: 'breedBatch',
					width: 150
				},{
					title: '猪只状态',
					key: 'pigState',
					width: 150
				},{
					title: '开始时间',
					key: 'startDate',
					width: 150
				},{
					title: '结束时间',
					key: 'endDate',
					width: 150
				} */
			]
		};
	},
	components: {
		ztable,
		popupLayer,
		drawCell,
		mpvuePicker,
		uniIcon,
		uniLoadMore,
		strAutocomplete
	},
	// 下拉刷新
	onPullDownRefresh() {
		let _this = this;
		this.pageNum = 1;
		this.idNum = 0;
		this.getindex(this.pageNum, this.pageSize, true);
		console.log('下拉刷新');
	},
	// 上拉加载
	onReachBottom() {
		this.loadMore();
		// 加载更多
	},

	methods: {
		// 工具栏
		tools() {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};

			// 配种批次
			let breedBatchPicker = [];
			common.commRequest(`/PigMatingRecord/FilterselectBreedpc/1/10000`, params, headers, 'get', function(data) {
				let getData = data.data;
				console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					breedBatchPicker.push({
						value: getData[i].BREEDPCID,
						label: getData[i].BREEDPC
					});
				}
				_this.breedBatchArr = breedBatchPicker;
				console.log(JSON.stringify(_this.breedBatchArr));
			});

			// 母猪耳牌号
			let sowNumList = [[], []];
			common.commRequest(`/PigMatingRecord/FilterselectMuzhuErpai/1/10000`, params, headers, 'get', function(data) {
				console.log(data);
				let getData = data.data;
				for (let i = 0; i < getData.length; i++) {
					sowNumList[0].push(getData[i].ERPAIHAO);
					sowNumList[1].push(getData[i].ERPAIID);
				}
				_this.sowNumList = sowNumList;
				//console.log('获取到的母猪耳牌为：' + _this.sowNumList)
			});
			
			// 公猪耳牌号
			let boarNumList = [[], []];
			common.commRequest(`/PigMatingRecord/FilterselectGongzhuErpai/1/10000`, params, headers, 'get', function(data) {
				console.log(data);
				let getData = data.data;
				for (let i = 0; i < getData.length; i++) {
					boarNumList[0].push(getData[i].ERPAIHAO);
					boarNumList[1].push(getData[i].ERPAIID);
				}
				_this.boarNumList = boarNumList;
				console.log('获取到的公猪耳牌为：' + _this.boarNumList)
			});

			// 配种类型
			let breedTypePicker = [];
			common.commRequest(`/PigMatingRecord/selectBreederInfo/1/5`, params, headers, 'get', function(data) {
				let getData = data.data.list;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					breedTypePicker.push({
						value: getData[i].boxid,
						label: getData[i].boxname
					});
				}
				_this.breedTypeArr = breedTypePicker;
			});
			
			// 分场名称
			common.commRequest(`/PigMatingRecord/ifBreedFenchang`, params, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				
				_this.fieldName = getData[0].FENCHANG;
			});

		},
		getindex(pageNum, pageSize, isLoad, data) {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
				cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			if (data) {
				params = { ...params, ...data };
			}
			common.commRequest(`/PigMatingRecord/selectAll/${pageNum}/${pageSize}`, params, headers, 'post', function(data) {
				//console.log(data)
				let getData = data.data.list;
				if (isLoad) {
					let oldData = _this.tableData;
					let loadData = [];
					if (getData.length == 0) {
						_this.loadingType = 2;
						return;
					}
					for (var i = 0; i < getData.length; i++) {
						loadData.push({
							fid: getData[i].fid, // fid
							index: ++_this.idNum, // 序号
							boarcard: getData[i].cfbornonum ? getData[i].cfbornonum : '-', // 公猪耳牌号
							breedingTime: getData[i].pzapm ? getData[i].pzapm : '-', // 配种时段
							breeder: getData[i].pzy ? getData[i].pzy : '-', // 配种员
							sowcard: getData[i].cfsownonum ? getData[i].cfsownonum : '-', // 母猪耳牌号
							optScore: getData[i].cfscore ? getData[i].cfscore : '-', // 操作评分
							avgMale: getData[i].cfavemale ? getData[i].cfavemale : '-', // 均重（公）
							avgFemale: getData[i].cfavefemale ? getData[i].cfavefemale : '-', // 均重（母）
							savingPst: getData[i].clwz ? getData[i].clwz : '-', // 存栏位置

							breederId: getData[i].cfactorid ? getData[i].cfactorid : '-', // 配种员id
							breedBatchId: getData[i].cfbatchid ? getData[i].cfbatchid : '-', // 配种批次id
							breedingDate: timeFormat(getData[i].cfbreedingdate, 'yyyy-MM-dd') ? timeFormat(getData[i].cfbreedingdate, 'yyyy-MM-dd') : '-', // 配种日期
							breedingType: getData[i].peizhongtype ? getData[i].peizhongtype : '-', // 配种类型
							transPst: getData[i].zrwz ? getData[i].zrwz : '-', // 母猪转入位置
							breedBatch: getData[i].breedpc ? getData[i].breedpc : '-', // 配种批次
							pigState: getData[i].pigstate ? getData[i].pigstate : '-', // 猪只状态
							startDate: getData[i].startdate ? getData[i].startdate : '-', // 开始时间
							endDate: getData[i].enddate ? getData[i].enddate : '-' // 结束时间
						});
					}
					_this.tableData = loadData;
					console.log(_this.tableData);
					uni.stopPullDownRefresh();
				} else {
					//console.log(JSON.stringify(getData));
					for (var i = 0; i < getData.length; i++) {
						_this.tableData.push({
							id: '01', // 详情编辑状态
							fid: getData[i].fid, // fid
							index: ++_this.idNum, // 序号
							boarcard: getData[i].cfbornonum ? getData[i].cfbornonum : '-', // 公猪耳牌号
							breedingTime: getData[i].pzapm ? getData[i].pzapm : '-', // 配种时段
							breeder: getData[i].pzy ? getData[i].pzy : '-', // 配种员
							sowcard: getData[i].cfsownonum ? getData[i].cfsownonum : '-', // 母猪耳牌号
							optScore: getData[i].cfscore ? getData[i].cfscore : '-', // 操作评分
							avgMale: getData[i].cfavemale ? getData[i].cfavemale : '-', // 均重（公）
							avgFemale: getData[i].cfavefemale ? getData[i].cfavefemale : '-', // 均重（母）
							savingPst: getData[i].clwz ? getData[i].clwz : '-', // 存栏位置

							breederId: getData[i].cfactorid ? getData[i].cfactorid : '-', // 配种员id
							breedBatchId: getData[i].cfbatchid ? getData[i].cfbatchid : '-', // 配种批次id
							breedingDate: timeFormat(getData[i].cfbreedingdate, 'yyyy-MM-dd') ? timeFormat(getData[i].cfbreedingdate, 'yyyy-MM-dd') : '-', // 配种日期
							breedingType: getData[i].peizhongtype ? getData[i].peizhongtype : '-', // 配种类型
							transPst: getData[i].zrwz ? getData[i].zrwz : '-', // 母猪转入位置
							breedBatch: getData[i].breedpc ? getData[i].breedpc : '-', // 配种批次
							pigState: getData[i].pigstate ? getData[i].pigstate : '-', // 猪只状态
							startDate: getData[i].startdate ? getData[i].startdate : '-', // 开始时间
							endDate: getData[i].enddate ? getData[i].enddate : '-' // 结束时间
						});
					}
				}
				_this.loadingType = 0;
			});
		},

		// 过滤框选择母猪耳号
		selectSow(opt) {
			//输入提示框选择
			this.sowNumValue = opt;
			console.log(opt);
			this.searchForm.earNumFilter = this.sowNumList[1][this.sowNumList[0].indexOf(this.sowNumValue)];
		},
		// 过滤框选择公猪耳号
		selectBoar(opt) {
			//输入提示框选择
			this.boarNumValue = opt;
			console.log(opt);
			this.searchForm.breedBoarFilter = this.boarNumList[1][this.boarNumList[0].indexOf(this.boarNumValue)];
		},

		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.loadingType = 1;
			this.getindex(++this.pageNum, this.pageSize, false);
		},

		onConfirmDate(e) {
			// 开始时间
			// console.log(e)
			const _this = this;
			_this.searchForm.businessStartTime = e.label;
		},
		onConfirmDate1(e) {
			// 结束时间
			// console.log(e)
			const _this = this;
			_this.searchForm.businessEndTime = e.label;
		},
		onConfirmBatch(e) {
			// 配种批次
			//console.log(e);
			const _this = this;
			_this.searchForm.breedBatchFilter.name = e.label;
			_this.searchForm.breedBatchFilter.id = e.value[0];
		},
		onConfirmBreedType(e) {
			// 配种类型
			const _this = this;
			_this.searchForm.breedTypeFilter.name = e.label;
			_this.searchForm.breedTypeFilter.id = e.value[0];
			//console.log(_this.searchForm.breedTypeFilter.id)
		},

		selectDate() {
			this.$refs.mpvuePicker.show();
		},
		selectDate1() {
			this.$refs.mpvuePicker1.show();
		},

		// 重置
		reset() {
			this.searchForm.businessStartTime = '';
			this.searchForm.businessEndTime = '';
			this.searchForm.breedBatchFilter.name = '';
			this.searchForm.breedBatchFilter.id = '';
			this.searchForm.breedBoarFilter = '';
			this.boarNumValue = '';
			this.searchForm.earNumFilter = '';
			this.sowNumValue = '';
			this.searchForm.breedTypeFilter.name = '';
			this.searchForm.breedTypeFilter.id = '';
		},
		// 查询
		find() {
			this.$refs.popupRef1.close() // 关闭弹窗
			this.pageNum = 1
			this.idNum = 0 
			this.loadingType = 1;
			let data = {};
			
			if(this.searchForm.businessStartTime) data['startdate'] = this.searchForm.businessTime // 起始时间
			if(this.searchForm.businessEndTime)	data['enddate'] = this.searchForm.businessEndTime // 终止时间
			if(this.searchForm.breedBatchFilter.id) data['cfbatchid'] = this.searchForm.breedBatchFilter.id // 配种批次 
			if(this.searchForm.earNumFilter) data['cfsownonum'] = this.searchForm.earNumFilter // 母猪耳牌
			if(this.searchForm.breedBoarFilter) data['cfbornonum'] = this.searchForm.breedBoarFilter // 公猪耳牌
			if(this.searchForm.breedTypeFilter.id)data['peizhongleixingid'] = this.searchForm.breedTypeFilter.id // 配种类型 
			
			console.log(data);
			//this.getindex(this.pageNum,this.pageSize,true,data)
		},

		// 下拉菜单
		selectBreedType() {
			this.$refs.breedTypePicker.show();
		},
		selectBatch() {
			this.$refs.batchPicker.show();
		},
		showFilter() {
			this.$refs.popupRef1.show();
		},
		rowTapHandler(row) {
			uni.navigateTo({
				//	url: `/pages/dataCollection/breedRecord/breedAudit?id=${row.id}`,
				url: `/pages/dataCollection/breedRecord/breedDetail?id=${row.id}&fid=${encodeURIComponent(row.fid)}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';

.status {
	z-index: 99999;
	height: 220rpx;

	.status-header {
		margin-top: 8rpx;
	}
	.status-title {
		padding-left: 40rpx;
	}
}

// 	.status-search {
//
// 		.search-wrap-qr,
// 		.search-wrap-search {
// 			width: 10%;
// 			display: flex;
// 			align-items: center;
// 			margin: 0 15rpx;
// 		}
//
// 		.search-wrap-input {
// 			width: 80%;
// 			text-align: left;
// 		}
// 	}
.status-search {
	box-sizing: border-box;
	width: 100%;
	position: absolute;
	bottom: 0;
	background: none;
	color: #b2b2b2;
	padding: 20rpx 4%;
	.search-wrap {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: #ffffff;
		height: 60rpx;
		padding: 0 18rpx;
		border-radius: 12rpx;
		.uni-icon-search {
			line-height: 25px;
		}
		.search-wrap-input {
			width: 90%;
			margin-left: 20rpx;
			text-align: left;
			.uni-input-placeholder {
				font-size: 28rpx;
			}
		}
	}
}
.list {
	padding-top: 240rpx;
}

//抽屉样式
.draw {
	padding: 30rpx;
	width: 500rpx;
	height: calc(100% - 118rpx);
	.bg-gray {
		background: #f5f5f5;
		padding: 16rpx 20rpx;
		font-size: 12px;
		color: #4d4d4d;
	}
}
.submits {
	position: fixed;
	bottom: -40rpx;
	left: 0;
	width: 100%;
	.flexc {
		width: 50%;
		height: 86rpx;
		&.reset-btn {
			background-color: #ffffff;
			border-top: 2px solid #f5f5f5;
		}
		&.submit-btn {
			border-top: 2px solid #4684ea;
			background-color: #4684ea;
			color: #ffffff;
		}
	}
}
.submitData {
	margin-top: 32rpx;
	.cancel-btn {
		width: 316rpx;
		background-color: #f05e57;
		color: #ffffff;
	}
	.submit-btn {
		width: 316rpx;
		background-color: #4684ea;
		color: #ffffff;
	}
}
</style>
