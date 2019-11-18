<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				种猪档案
			</view>
			<!-- <view class="right__icon">
				<image src="../../../static/assets/setting.png" mode="" class="icon"></image>
			</view> -->
		</view>
		<view class="header-wrap">
			<view class="header-container">
				<view class="header-row">
					<text>耳牌：{{basicInfo.erpaihao || '-'}}</text>
					<text>国际号：{{basicInfo.guobiaohao || '-'}}</text>
				</view>
				<view class="header-row">
					<text>猪只类型：{{basicInfo.pigtype || '-'}}</text>
					<text>在场状态：{{basicInfo.zaichangzhuangtai || '-'}}</text>
				</view>
				<view class="header-row">
					<view style="justify-content: flex-end;flex: none;display:flex;align-items: center;" @tap="seeFamily">
						<text style="padding-right: 8rpx;">查看系谱</text>
						<image src="../../../../static/assets/link.png" class="icon" mode=""></image>
					</view>
				</view>
			</view>
		</view>
			
		<scrollTab :navList="navList" v-model="currentNavIndex"></scrollTab>
		<view class="radius_card_wrap" v-show="currentNavIndex == 0">
			<view class="card_row">
				<view class="card_label">品种</view>
				<view class="card_value">{{basicInfo.pigvarisname || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">公母</view>
				<view class="card_value">{{basicInfo.xingbie || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">出生日期</view>
				<view class="card_value">{{basicInfo.chushengriqi | formatDate}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">出生猪场</view>
				<view class="card_value">{{basicInfo.comepigbatch || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">出生分场</view>
				<view class="card_value">{{basicInfo.comefilebatch || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">猪只状态</view>
				<view class="card_value">{{basicInfo.pigstate || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">日龄</view>
				<view class="card_value">{{basicInfo.days || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">当前胎次</view>
				<view class="card_value">{{basicInfo.cfcurpt || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">最新业务</view>
				<view class="card_value">{{basicInfo.cflaststate || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">最新业务时间</view>
				<view class="card_value">{{basicInfo.cflastdate | formatDate}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">所在分场</view>
				<view class="card_value">{{basicInfo.suozaifenchang || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">存栏位置</view>
				<view class="card_value">{{basicInfo.buildingarchivesname || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">入群时间</view>
				<view class="card_value">{{basicInfo.cfingrp | formatDate}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">核心群</view>
				<view class="card_value">{{basicInfo.hexinqun || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">配种批次</view>
				<view class="card_value">{{basicInfo.cfbatchid || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">栏位号</view>
				<view class="card_value">{{basicInfo.cfcolumn || '-'}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">入场日期</view>
				<view class="card_value">{{basicInfo.cfinfrm | formatDate}}</view>
			</view>
			<view class="card_row">
				<view class="card_label">离场原因</view>
				<view class="card_value">{{basicInfo.cfotrsn || '-'}}</view>
			</view>
		</view>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 1">
			<ztable :tableData="breedDatas" :columns="breedColumns"></ztable>
			<!-- 加载更多  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		
	</view>
</template>

<script>
//  加载更多 
import uniLoadMore from '@/components/uni-load-more.vue';
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import ztable from '@/components/z-table/z-table'
import common from '../../../../utils/common.js';
export default {
	components: {
		scrollTab,
		ztable,
		uniLoadMore
	},
	// 上拉加载
	onReachBottom() {
		if(this.currentNavIndex == 1){
			this.loadMore();
			this.page ++;
		}
	},
	data() {
		return {
			status: 'more',
			loadingType: 0, // 加载更多状态
			loadingText: {
				contentdown: '查看更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			page: 2,
			id: '',
			currentNavIndex: 0,
			navList: [{
				name: '基本信息'
			},{
				name: '繁殖信息'
			}],
			basicInfo: '',  //基本信息
			
			breedColumns: [{
					title: "胎次",
					key: "cfcurpt",
					width: 70,
				}, {
					title: "配种时间",
					key: "cfbreedingdate",
					width: 150,
				}, {
					title: "配种员",
					key: "pzy",
					width: 120,
				}, {
					title: "与配公猪",
					key: "cfbornonum",
					width: 120,
				}, {
					title: "预产期",
					key: "cfchildbirthdate",
					width: 150,
				}, {
					title: "情期",
					key: "cfqingqi",
					width: 150,
				}, {
					title: "异常妊娠日期",
					key: "ycrsdate",
					width: 150,
				}, {
					title: "总仔数",
					key: "cfincnt",
					width: 120,
				}, {
					title: "活仔数",
					key: "cfilive",
					width: 120,
				}, {
					title: "合格(公)",
					key: "cfimale",
					width: 120,
				}, {
					title: "合格(母)",
					key: "cfifmal",
					width: 120,
				}],
			breedDatas: [{
				cfcurpt: '-',
				cfbreedingdate: '-',
				pzy: '-',
				cfbornonum: '-',
				cfchildbirthdate: '-',
				cfqingqi: '-',
				ycrsdate: '-',
				cfincnt: '-',
				cfilive: '-',
				cfimale: '-',
				cfifmal: '-'
			}],
			
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = decodeURIComponent(option.id);
			this.getData()
		}
	},
	methods: {
		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.loadingType = 1;
			_this.getBreedData(10, _this.page, true);
			
		},
		back () {
			uni.navigateBack({
			})
		},
		seeFamily () {
			uni.navigateTo({
				url: `../boarFamily/boarFamily?id=${encodeURIComponent(this.id)}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		getData() {  //获取基本信息
			var _this = this;
			//console.log(_this.id)
			let params = {
				piginfoid: _this.id, // 猪场id
			};
			let headers = {};
			common.commRequest(`/PigBoarInfo/selectBaseinformation`, params, headers, 'get',
				function(data) {
					//console.log(data);
					_this.basicInfo = data.data;
			})
		},
		getBreedData(pageNum, pageSize, isLoad) {
			var _this = this;
			let params = {};
			let headers = {};
			common.commRequest(`/PigBoarInfo/showBreedInfo/${pageNum}/${pageSize}`, params, headers, 'get',
				function(data) {
					let getData = data.data.list;
					if(getData.length == 0){
						_this.loadingType = 2;
						return;
					}
					if(isLoad) {
						let oldData = _this.breedDatas;
						let loadData = [...oldData, ...getData];
						_this.breedDatas = loadData;
					}else {
						//console.log(data.data.list);
						_this.breedDatas = getData;
					}
					_this.loadingType = 0;
			})
		}
	},
	watch:{
		currentNavIndex: function(e) {
			if(e == 1){
				this.getBreedData(10, this.page, false)
			}
		}
	},
	filters: {
      formatDate: function (value) {
		let time = Number(value)
        let date = new Date(time);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + MM + '-' + d;
      }
    }
}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	.datagrid-wrapper{
		padding: 20rpx 12rpx 0;
	}
</style>
