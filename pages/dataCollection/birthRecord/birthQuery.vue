<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">分娩记录查询</view>
				<view class="more-icon flexc ali-c" @tap="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
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
				<ztable :tableData="tableData" :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
			</view>
			<view class="uni-tab-bar-loading" @click="loadMore()"><uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more></view>
		</view>

		<!-- 弹窗 -->
		<popup-layer ref="popupRef1" :direction="'left'" :class="{ active: active }">
			<scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
				<!-- 分娩日期 -->
				<draw-cell title="分娩日期" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate">
							<text>{{ searchForm.businessStartTime }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
						<text>—</text>
						<view class="bg-gray jus-j" @click="selectDate1">
							<text>{{ searchForm.businessEndTime }}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</draw-cell>
				<!-- 母猪 -->
				<draw-cell title="母猪" required="true">
					<view slot="value" class="bg-gray jus-j">
						<!-- <input type="text" placeholder="请填写" v-model="searchForm.sowNum" /> -->
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
				<!-- 公猪 -->
				<draw-cell title="公猪" required="true">
					<view slot="value" class="bg-gray jus-j">
						<!-- <input type="text" placeholder="请填写" v-model="searchForm.boarNum" /> -->
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
				<!-- 配种批次 -->
				<draw-cell title="配种批次" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectBatch">
						<text>{{ searchForm.breedBatchFilter.name }}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" style="transform: rotate(-90deg);" />
					</view>
				</draw-cell>
				<!-- 栋舍 -->
				<draw-cell title="栋舍" required="true">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="请填写" v-model="searchForm.house" /></view>
				</draw-cell>
				<!-- 分场 -->
				<draw-cell title="分场" required="true">
					<view slot="value" class="bg-gray jus-j"><input type="text" placeholder="自动带出" :value="fieldName" disabled="true" /></view>
				</draw-cell>
				<!-- 胎次 -->
				<draw-cell title="胎次" required="true">
					<view slot="value" class="jus-j">
						<view class="bg-gray jus-j" style="margin-right: 3%;"><input type="text" placeholder="" :value="searchForm.birthNumStart" /></view>
						<text>—</text>
						<view class="bg-gray jus-j" style="margin-left: 3%;"><input type="text" placeholder="" :value="searchForm.birthNumEnd" /></view>
					</view>
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
	</view>
</template>

<script>
import ztable from '@/components/z-table/z-table';
// 引入弹框组件
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
// 加载更多
import uniLoadMore from '@/components/uni-load-more.vue';
//引入时间转换
import { timeFormat } from '@/utils/dateUtils.js';
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
// 引入弹框组件
import popupLayer from '@/components/popup/popup-layer.vue';
//引入抽屉单元格组件
import drawCell from '@/components/uni-cell/draw-cell.vue';
//引入下拉框
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
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
			active: true,
			idNum: 0, // 表格排序
			pageNum: 1, // 页数
			pageSize: 10, // 每页数量
			boolShow: false, //抽屉显示状态
			status: 'more',
			loadingType: 0, // 加载更多状态
			//mpvue-picker配置
			deepLength: 1,
			pickerValueDefault: [0],
			themeColor: '#007AFF',

			loadingText: {
				contentdown: '查看更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '母猪耳牌号',
					key: 'sowNum',
					width: 150
				},
				{
					title: '仔猪转入批次',
					key: 'childBatch',
					width: 200
				},
				{
					title: '总仔数',
					key: 'totalNum',
					width: 200
				},
				{
					title: '合格公',
					key: 'qualifiedMale',
					width: 150
				},
				{
					title: '合格母',
					key: 'qualifiedFemale',
					width: 100
				},
				{
					title: '弱仔数',
					key: 'weakNum',
					width: 100
				},
				{
					title: '难产',
					key: 'isDifficult',
					width: 100
				}
			],

			fieldName: '',

			// 配种批次
			breedBatchArr: [],
			breedBatchIndex: 0,
			// 母猪耳号
			sowNumList: [['LY11993', 'LY77335']],
			sowNumValue: '',
			// 公猪耳号
			boarNumList: [['GZ746', 'abcd5678']],
			boarNumValue: '',
			//列表数据
			tableData: [],

			// 更多搜索弹出框选中内容
			searchForm: {
				businessStartTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				businessEndTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				sowNum: '',
				boarNum: '',
				breedBatchFilter: {
					name: '',
					id: ''
				},
				house: '',
				field: '',
				birthNumStart: '',
				birthNumEnd: ''
			}
		};
	},
	components: {
		ztable,
		uniDrawer,
		uniLoadMore,
		popupLayer,
		drawCell,
		uniIcon,
		mpvuePicker,
		strAutocomplete
	},
	// 下拉刷新
	onPullDownRefresh() {
		let _this = this;
		let tableData = _this.tableData;
		console.log('下拉刷新');
		this.getindex(1, 10, false);
		setTimeout(function() {
			tableData.splice(5);
			uni.stopPullDownRefresh();
		}, 1000);
	},
	//上拉加载数据
	onReachBottom() {
		this.loadMore();
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

			// 母猪耳牌号
			let sowNumList = [[], []];
			common.commRequest(`/PigAbnormalPregRecord/FilterselectPig/1/10000`, params, headers, 'get', function(data) {
				console.log(data);
				let getData = data.data;
				for (let i = 0; i < getData.length; i++) {
					sowNumList[0].push(getData[i].ERPAIHAO);
					sowNumList[1].push(getData[i].ERPAIID);
				}
				_this.sowNumList = sowNumList;
				// console.log(_this.sowNumList)
			});

			// 公猪耳牌号
			let boarNumList = [[], []];
			common.commRequest(`/PigAbnormalPregRecord/FilterselectPig/1/10000`, params, headers, 'get', function(data) {
				console.log(data);
				let getData = data.data;
				for (let i = 0; i < getData.length; i++) {
					boarNumList[0].push(getData[i].ERPAIHAO);
					boarNumList[1].push(getData[i].ERPAIID);
				}
				_this.boarNumList = boarNumList;
				// console.log(_this.boarNumList)
			});

			// 配种批次
			let breedBatchPicker = [];
			common.commRequest(`/PigBirthRecord/breedpcFilter/1/10000`, params, headers, 'get', function(data) {
				let getData = data.data;
				//console.log(JSON.stringify(getData));
				for (let i = 0; i < getData.length; i++) {
					breedBatchPicker.push({
						value: getData[i].BREEDPCID,
						label: getData[i].BREEDPC
					});
				}
				_this.breedBatchArr = breedBatchPicker;
				console.log(JSON.stringify(_this.breedBatchArr));
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
		},

		//获取列表数据
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
			common.commRequest(`/PigBirthRecord/selectBirthRecord/${pageNum}/${pageSize}`, params, headers, 'post', function(data) {
				let getData = data.data.list;
				//console.log(JSON.stringify(getData));
				if (isLoad) {
					let oldData = _this.tableData;
					let loadData = [];
					if (getData.length == 0) {
						_this.loadingType = 2;
						return;
					}
					for (var i = 0; i < getData.length; i++) {
						loadData.push({
							id: getData[i].fid, // fid
							index: ++_this.idNum, // 序号
							sowNum: getData[i].cfbornonum ? getData[i].cfbornonum : '-', // 母猪耳牌号
							childBatch: getData[i].pigbatchnum ? getData[i].pigbatchnum : '-', //仔猪转入批次（哺乳仔批次号）
							totalNum: getData[i].cfincnt != null ? getData[i].cfincnt : '-', //总仔数
							qualifiedMale: getData[i].cfimale != null ? getData[i].cfimale : '-', //合格公
							qualifiedFemale: getData[i].cfifmal != null ? getData[i].cfifmal : '-', //合格母
							weakNum: getData[i].cfiweak != null ? getData[i].cfiweak : '-', //弱仔数
							isDifficult: getData[i].cfisdifficult != null ? (getData[i].cfisdifficult === 0 ? '否' : '是') : '-' //难产
						});
					}
					_this.tableData = loadData;
					console.log(loadData);
					uni.stopPullDownRefresh();
				} else {
					for (var i = 0; i < getData.length; i++) {
						_this.tableData.push({
							id: getData[i].fid, // fid
							index: ++_this.idNum, // 序号
							sowNum: getData[i].cfbornonum ? getData[i].cfbornonum : '-', // 母猪耳牌号
							childBatch: getData[i].pigbatchnum ? getData[i].pigbatchnum : '-', //仔猪转入批次（哺乳仔批次号）
							totalNum: getData[i].cfincnt != null ? getData[i].cfincnt : '-', //总仔数
							qualifiedMale: getData[i].cfimale != null ? getData[i].cfimale : '-', //合格公
							qualifiedFemale: getData[i].cfifmal != null ? getData[i].cfifmal : '-', //合格母
							weakNum: getData[i].cfiweak != null ? getData[i].cfiweak : '-', //弱仔数
							isDifficult: getData[i].cfisdifficult != null ? (getData[i].cfisdifficult === 0 ? '否' : '是') : '-' //难产
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
			this.searchForm.sowNum = this.sowNumList[1][this.sowNumList[0].indexOf(this.sowNumValue)];
		},
		// 过滤框选择公猪耳号
		selectBoar(opt) {
			//输入提示框选择
			this.boarNumValue = opt;
			console.log(opt);
			this.searchForm.boarNum = this.boarNumList[1][this.boarNumList[0].indexOf(this.boarNumValue)];
		},

		rowTapHandler(row) {
			uni.navigateTo({
				url: `/pages/dataCollection/birthRecord/birthAudit?id=${encodeURIComponent(row.id)}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		showFilter() {
			this.$refs.popupRef1.show();
		},
		find() {
			this.$refs.popupRef1.close();
		},

		//弹出日期选择框
		selectDate() {
			// 开始时间
			this.$refs.mpvuePicker.show();
		},
		selectDate1() {
			// 结束时间
			this.$refs.mpvuePicker1.show();
		},
		//日期选择确认
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
		
		//选择配种批次
		selectBatch() {
			this.$refs.batchPicker.show();
		},
		onConfirmBatch(e) {
			// 配种批次
			//console.log(e);
			const _this = this;
			_this.searchForm.breedBatchFilter.name = e.label;
			_this.searchForm.breedBatchFilter.id = e.value[0];
		},
		

		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.loadingType = 1;
			this.getindex(++this.pageNum, this.pageSize, false);
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
	.data__wrapper {
		padding: 0 20rpx;
	}
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
</style>
