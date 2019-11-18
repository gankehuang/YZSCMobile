<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">导入免疫计划</view>
			</view>
		</view>
		
		<!-- 导入免疫计划 -->
		<view class="main">
			<view class="main-wrap" style="padding-top: 150rpx;">
				<!-- 数据表格 -->
				<view class="data__wrapper"><ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-"></ztable></view>
			</view>
		</view>
		<!-- 按钮  -->
		<view class="submits jus-b">
			<button form-type="submit" type="primary" class="flexc submit-btn" style="width: 520rpx;">导入</button>
		</view>
	</view>
</template>

<script>
//加载更多
import uniLoadMore from '@/components/uni-load-more.vue';
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import ztable from '@/components/z-table/z-table';
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
// 引入公共请求接口
import common from '../../../utils/common.js';
//引入时间转换
import { timeFormat } from '@/utils/dateUtils.js';
export default {
	
	components: {
		ztable,
		uniIcon,
		uniLoadMore
	},
	
	onLoad: function(options) {
		this.active = !this.active;
		this.loadingType = 1;
		this.getindex(this.pageNum, this.pageSize, false);
	},
	
	data() {
		return {
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
			
			recordIndex: 0, // 表格排序
			tableData: [],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: 70
				},
				{
					title: '免疫类型',
					key: 'immunizationType',
					width: 150
				},
				{
					title: '批次号',
					key: 'batchNum',
					width: 150
				},
				{
					title: '栋舍',
					key: 'house',
					width: 150
				},
				{
					title: '头数',
					key: 'count',
					width: 150
				},
				{
					title: '免疫项目',
					key: 'immunizationItem',
					width: 250
				},
				{
					title: '计划开始日期',
					key: 'planStartDate',
					width: 250
				},
				{
					title: '疫苗名称',
					key: 'vaccineName',
					width: 200
				}
			]
		}
	},
	methods: {
		// 获取列表数据
		getindex(pageNum, pageSize, isLoad, data) {
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				cfpigfarmid: 'Va4AAAAYuCC4/eJt' // 猪场id
				//cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
			};
			if (data) {
				params = { ...params, ...data };
			}
			console.log(params);
			common.commRequest(`/CtPigPigDrugApply/selectImmunityPlan/${pageNum}/${pageSize}`, params, headers, 'get', function(data) {
				console.log(data)
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
							id: getData[i].fid,
							index: ++_this.recordIndex,
							immunizationType: getData[i].immunitytype ? getData[i].immunitytype : '-', // 免疫类型
							batchNum: getData[i].picihao ? getData[i].picihao : '-', // 批次号
							house: getData[i].dongshe ? getData[i].dongshe : '-', // 栋舍
							count: getData[i].pccurclcount != null ? getData[i].pccurclcount : '-', // 头数（批次当前存栏头数）
							immunizationItem: getData[i].cfpronam ? getData[i].cfpronam : '-', // 免疫项目
							planStartDate: getData[i].cffactdate ? timeFormat(getData[i].cffactdate, 'yyyy-MM-dd') : '-', // 计划开始日期（分录）
							vaccineName: getData[i].cfdurgname ? getData[i].cfdurgname : '-' // 疫苗名称
						});
					}
					_this.tableData = loadData;
					uni.stopPullDownRefresh();
				} else {
					// console.log(JSON.stringify(getData));
					for (var i = 0; i < getData.length; i++) {
						_this.tableData.push({
							id: getData[i].fid,
							index: ++_this.recordIndex,
							immunizationType: getData[i].immunitytype ? getData[i].immunitytype : '-', // 免疫类型
							batchNum: getData[i].picihao ? getData[i].picihao : '-', // 批次号
							house: getData[i].dongshe ? getData[i].dongshe : '-', // 栋舍
							count: getData[i].pccurclcount != null ? getData[i].pccurclcount : '-', // 头数（批次当前存栏头数）
							immunizationItem: getData[i].cfpronam ? getData[i].cfpronam : '-', // 免疫项目
							planStartDate: getData[i].cffactdate ? timeFormat(getData[i].cffactdate, 'yyyy-MM-dd') : '-', // 计划开始日期（分录）
							vaccineName: getData[i].cfdurgname ? getData[i].cfdurgname : '-' // 疫苗名称
						});
					}
				}
				_this.loadingType = 0;
			});
		},
	}
	
	
}

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
