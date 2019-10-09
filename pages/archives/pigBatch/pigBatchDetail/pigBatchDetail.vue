<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="/static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				批次档案详情
			</view>
			
		</view>
		<view class="header-wrap" v-if="appear">
			<swiper class="swiper" style="height: 200rpx;padding-bottom: 20rpx;" mode="default" :dots-styles="dotsStyles"
			 indicator-dots="true">
				<swiper-item>
					<view class="header-container">
						<view class="header-row">
							<text>批次号：YY19120001</text>
							<text>日龄：124</text>
						</view>
						<view class="header-row">
							<text>猪只类型：生产母猪</text>
							<text>栋舍：二分场分娩舍2栋</text>
						</view>
						<view class="header-row">
							<text>分场：大塘猪场二分场</text>
							<text>当前存栏：24</text>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="header-container">
						<view class="header-row">
							<text>批次总头数：102</text>
							<text>累计死亡数：2</text>
						</view>
						<view class="header-row">
							<text>累计转出数：40</text>
							<text>累计销售数：5</text>
						</view>
						<view class="header-row">
							<text>弱仔数：2</text>
							<text>启用状态：启用</text>
						</view>
					</view>
				</swiper-item>
			</swiper>

		</view>
		
		<view class="navList"><scrollTab :navList="navList" v-model="currentNavIndex" :showExpend="true"></scrollTab></view>
		<scroll-view class="scroll-view" scroll-y>
		
			<view class="data-wrapper">
				<view class="datagrid-wrapper" v-show="currentNavIndex == 0">
					<ztable :tableData="pigsData" stickSide stickSide1 :columns="pigsColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 1">
					<ztable :tableData="pigLetIn" :columns="pigletInColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 2">
					<ztable :tableData="importSeed" :columns="importSeedColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 3">
					<ztable :tableData="purRecord" :columns="purRecordColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 4">
					<ztable :tableData="fatpigIn" :columns="fatpigInColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 5">
					<ztable :tableData="saleRecord" :columns="saleRecordColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 6">
					<ztable :tableData="fatpigOut" :columns="fatpigOutColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 7">
					<ztable :tableData="fileOut" :columns="fileOutColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 8">
					<ztable :tableData="supRecord" :columns="supRecordColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 9">
					<ztable :tableData="immRecord" :columns="immRecordColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 10">
					<ztable :tableData="drugUse" :columns="drugUseColumn"></ztable>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 11">
					<ztable :tableData="feedUse" :columns="feedUseColumn"></ztable>
				</view>
			</view>
			</scroll-view>
	</view>
	
	
	
</template>
<script>
	import scrollTab from '@/components/scroll-tab/scroll-tab'
	import ztable from '@/components/z-table/z-table'
	import uniLoadMore from '@/components/uni-load-more.vue'; //  加载更多
	let observer = null;
	export default {
		components: {
			scrollTab,
			uniLoadMore,
			ztable
		},
		data() {
			return {
				appear: false,
				title: 'intersectionObserver',
				dotsStyles: {
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				id: '',
				status: 'more',
				currentNavIndex: 0,
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				navList: [{
					name: '猪只列表'
				}, {
					name: '仔猪转入'
				}, {
					name: '引种记录'
				}, {
					name: '采购记录'
				}, {
					name: '肉猪调入'
				}, {
					name: '销售记录'
				}, {
					name: '肉猪调出'
				}, {
					name: '档案调出'
				}, {
					name: '饲喂记录'
				}, {
					name: '免疫记录'
				}, {
					name: '兽药领用'
				}, {
					name: '饲料领用'
				}],
				pigsData: [{
					index: 1,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}, {
					index: 2,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}, {
					index: 3,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}, {
					index: 4,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}, {
					index: 5,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}, {
					index: 6,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}, {
					index: 7,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}, {
					index: 8,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}, {
					index: 9,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}, {
					index: 10,
					earno: 'EPH242828',
					indno: 'DDZBBK517004301',
					regnm: '大塘二场育肥舍',
					status: '在场'
				}],
				pigsColumn: [{
					title: "序号",
					key: "index",
					width: 70,
				}, { // 猪只列表
					title: "耳牌",
					key: "earno",
					width: 220,
				}, {
					title: "国标码",
					key: "indno",
					width: 280,
				}, {
					title: "栋舍",
					key: "regnm",
					width: 200,
				}, {
					title: "存栏状态",
					key: "status",
					width: 150,
				}],
				pigletInColumn: [{ // 仔猪调入
					title: "业务日期",
					key: "bizDate",
					width: 200
				}, {
					title: "耳牌",
					key: "earno",
					width: 220
				}, {
					title: "配种次数",
					key: "count",
					width: 120
				}, {
					title: "总仔数",
					key: "incnt",
					width: 160
				}, {
					title: "活仔数",
					key: "ilive",
					width: 160
				}, {
					title: "窝重",
					key: "faawt",
					width: 160
				}, {
					title: "均重",
					key: "avgWeight",
					width: 160
				}, {
					title: "合格公猪",
					key: "imale",
					width: 180
				}, {
					title: "合格公猪",
					key: "ifmal",
					width: 180
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}],
				pigLetIn: [{
					bizDate: '2019/09/08',
					earno: 'ZBSLS0002',
					count: 2,
					incnt: 10,
					ilive: 9,
					faawt: 12.5,
					avgWeight: 15.24,
					imale: 5,
					ifmal: 3,
					fnumber: 'ZZZRR0001'
				}],
				importSeedColumn: [{ //引种记录
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "总重量",
					key: "weight",
					width: 200
				}, {
					title: "总头数",
					key: "incnt",
					width: 160
				}, {
					title: "总金额",
					key: "money",
					width: 160
				}, {
					title: "引种类型",
					key: "type",
					width: 160
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}, {
					title: "调出单位",
					key: "outUnit",
					width: 200
				}],
				importSeed: [{
					bizdate: '2019/05/12',
					weight: 2000,
					incnt: 100,
					money: 40000,
					type: '普通引种',
					fnumber: 'YZJL024024',
					outUnit: '大溪猪场'
				}],
				purRecordColumn: [{ // 采购记录
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "总重量",
					key: "weight",
					width: 160
				}, {
					title: "总头数",
					key: "incnt",
					width: 160
				}, {
					title: "总金额",
					key: "money",
					width: 160
				}, {
					title: "采购日龄",
					key: "curday",
					width: 160
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}, {
					title: "来源猪场",
					key: "fromPigfarm",
					width: 200
				}],
				purRecord: [{
					bizdate: '2018/08/08',
					weight: 2000,
					incnt: 100,
					money: 8000,
					curday: 20,
					fnumber: 'CGJL2002',
					fromPigfarm: '大溪猪场01'
				}],
				fatpigInColumn: [{ // 肉猪调入
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "调入重量",
					key: "weight",
					width: 160
				}, {
					title: "调入头数",
					key: "incnt",
					width: 160
				}, {
					title: "总金额",
					key: "money",
					width: 160
				}, {
					title: "调入日龄",
					key: "curday",
					width: 160
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}],
				fatpigIn: [{
					bizdate: '2018/08/08',
					weight: 1500,
					incnt: 120,
					money: 900,
					curday: 120,
					fnumber: 'RZDR-00012'
				}],
				saleRecordColumn: [{ // 销售记录
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "调出重量",
					key: "weight",
					width: 160
				}, {
					title: "调出头数",
					key: "outCnt",
					width: 160
				}, {
					title: "总金额",
					key: "money",
					width: 160
				}, {
					title: "批次日龄",
					key: "curday",
					width: 160
				}, {
					title: "调入单位",
					key: "inUnit",
					width: 200
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}],
				saleRecord: [{
					bizdate: '2019/08/08',
					weight: 1200,
					outCnt: 100,
					money: 24000,
					curday: 50,
					inUnit: '大溪二分场',
					fnumber: 'XSJL00242'
				}],
				fatpigOutColumn: [{ // 肉猪调出
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "调入重量",
					key: "weight",
					width: 200
				}, {
					title: "调入头数",
					key: "outcnt",
					width: 200
				}, {
					title: "总金额",
					key: "money",
					width: 200
				}, {
					title: "批次日龄",
					key: "curday",
					width: 200
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}],
				fatpigOut: [{
					bizdate: '2019/08/08',
					weight: 1500,
					outcnt: 120,
					money: 30000,
					curday: 120,
					fnumber: 'RZDS-09201'
				}],
				fileOutColumn: [{ // 档案调出
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "耳牌号",
					key: "earno",
					width: 200
				}, {
					title: "猪只品种",
					key: "verity",
					width: 200
				}, {
					title: "重量",
					key: "weight",
					width: 200
				}, {
					title: "内调类型",
					key: "type",
					width: 200
				}, {
					title: "调出分场",
					key: "outPigfen",
					width: 200
				}, {
					title: "单据号",
					key: "fnumber",
					width: 240
				}],
				fileOut: [{
					bizdate: '2019/08/08',
					earno: 'ZZSS00204',
					verity: '育肥猪',
					weight: 1200,
					type: '内调后备母猪',
					outPigfen: '大塘猪场2分场',
					fnumber: 'DADC02040'
				}],
				supRecordColumn: [{ //饲喂记录
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "分场",
					key: "pigfen",
					width: 200
				}, {
					title: "栋舍",
					key: "regnm",
					width: 200
				}, {
					title: "组别",
					key: "group",
					width: 200
				}, {
					title: "批次号",
					key: "bthno",
					width: 200
				}, {
					title: "实际饲喂重量",
					key: "weight",
					width: 200
				}, {
					title: "当日存栏",
					key: "incnt",
					width: 200
				}, {
					title: "实际日均饲喂量",
					key: "avgFeeding",
					width: 200
				}, {
					title: "饲料名称",
					key: "feedName",
					width: 200
				}, {
					title: "标准饲喂品种名称",
					key: "standarName",
					width: 280
				}],
				supRecord: [{
					bizdate: '2019/08/08',
					pigfen: '大溪三分场',
					regnm: '育肥舍2栋',
					group: '育肥舍',
					bthno: 'ASJ2J9294',
					weight: 1252,
					incnt: 124,
					avgFeeding: 120,
					feedName: '教槽料',
					standarName: '教槽料0527'
				}],
				immRecordColumn: [{ // 免疫记录
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "分场",
					key: "pigfen",
					width: 200
				}, {
					title: "免疫类型",
					key: "immType",
					width: 160
				}, {
					title: "免疫项目",
					key: "immProject",
					width: 200
				}, {
					title: "实际开始日期",
					key: "actStartDate",
					width: 200
				}, {
					title: "实际完成日期",
					key: "actEndDate",
					width: 200
				}, {
					title: "计划完成日期",
					key: "planDate",
					width: 200
				}, {
					title: "相差天数",
					key: "offsetDay",
					width: 120
				}, {
					title: "疫苗分类",
					key: "immCategory",
					width: 150
				}, {
					title: "计量",
					key: "num",
					width: 100
				}, {
					title: "免疫方法",
					key: "method",
					width: 160
				}, {
					title: "实际完成头数",
					key: "factNum",
					width: 240
				}],
				immRecord: [{
					bizdate: '2019/08/08',
					pigfen: '大溪三分场',
					immType: '普免',
					immProject: '口蹄疫防疫',
					actStartDate: '2019/04/02',
					actEndDate: '2019/04/05',
					planDate: '2019/04/05',
					offsetDay: 0,
					immCategory: '药品',
					num: 200,
					method: '颈注',
					factNum: 120
				}],
				drugUseColumn: [{ // 兽药领用
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "药品名称",
					key: "drugName",
					width: 140
				}, {
					title: "规格",
					key: "model",
					width: 140
				}, {
					title: "计量单位",
					key: "unit",
					width: 140
				}, {
					title: "领用数量",
					key: "num",
					width: 140
				}, {
					title: "当前存栏",
					key: "curcnt",
					width: 140
				}, {
					title: "领料类型",
					key: "pickType",
					width: 140
				}, {
					title: "免疫项目",
					key: "project",
					width: 140
				}, {
					title: "实际成分",
					key: "factPart",
					width: 140
				}, {
					title: "物料分类",
					key: "group",
					width: 140
				}],
				drugUse: [{
					bizdate: '2019/04/18',
					drugName: '蓝耳疫苗',
					model: '12支/箱',
					unit: '箱',
					num: 12,
					curcnt: 144,
					pickType: '领用',
					project: '蓝耳防疫',
					factPart: '二氧化碳',
					group: '兽药'
				}],
				feedUseColumn: [{ // 饲料领用
					title: "业务日期",
					key: "bizdate",
					width: 160
				}, {
					title: "物料名称",
					key: "materialName",
					width: 140
				}, {
					title: "计量单位",
					key: "unit",
					width: 140
				}, {
					title: "领用数量",
					key: "num",
					width: 140
				}, {
					title: "料塔",
					key: "tower",
					width: 160
				}, {
					title: "栋舍",
					key: "regnm",
					width: 160
				}, {
					title: "实际成本",
					key: "factCost",
					width: 140
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}, {
					title: "仓库",
					key: "wareHouse",
					width: 200
				}],
				feedUse: [{
					bizdate: '2018/11/18',
					materialName: '小猪料',
					unit: '40kg/袋',
					num: 20,
					tower: '无',
					regnm: '芦田一分场',
					factCost: 800,
					fnumber: 'SYLY-2024024',
					wareHouse: '芦田兽药仓库'
				}]
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
		},
		onReachBottom() {
			this.loadMore()
		},
		onReady() {
			observer = uni.createIntersectionObserver(this);
			observer.relativeTo('.scroll-view').observe('.data-wrapper', (res) => {
				if (res.intersectionRatio > 0 && !this.appear) {
					this.appear = true;
				} else if (!res.intersectionRatio > 0 && this.appear) {
					this.appear = false;
				}
			})
		},
		onUnload() {
			if (observer) {
				observer.disconnect()
			}
		},
		methods: {
			back() {
				uni.navigateBack({})
			}, // 滑动底部加载
			// 滑动底部加载
			loadMore() {
				let _this = this;
				let pigsData = _this.pigsData;
				_this.loadingType = 1;
				let getData = [];
				setTimeout(() => {
					let getData = [{
						index: 1,
						earno: 'EPH242828',
						indno: 'DDZBBK517004301',
						regnm: '大塘二场育肥舍',
						status: '在场'
					}, {
						index: 2,
						earno: 'EPH242828',
						indno: 'DDZBBK517004301',
						regnm: '大塘二场育肥舍',
						status: '在场'
					}, {
						index: 3,
						earno: 'EPH242828',
						indno: 'DDZBBK517004301',
						regnm: '大塘二场育肥舍',
						status: '在场'
					}, {
						index: 4,
						earno: 'EPH242828',
						indno: 'DDZBBK517004301',
						regnm: '大塘二场育肥舍',
						status: '在场'
					}, {
						index: 5,
						earno: 'EPH242828',
						indno: 'DDZBBK517004301',
						regnm: '大塘二场育肥舍',
						status: '在场'
					}, {
						index: 6,
						earno: 'EPH242828',
						indno: 'DDZBBK517004301',
						regnm: '大塘二场育肥舍',
						status: '在场'
					}];
					let newData = pigsData.concat(getData);
					_this.pigsData = newData;
				}, 300);

				setTimeout(() => {
					_this.loadingType = 0;
				}, 500);
			},
		}
	}
</script>
<style lang="scss">
	@import "@/common/baseInfo.scss";
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	 
 .navList{
	 top:300rpx;
 }
	.data-wrapper{
		height: 1300rpx;
	}
	
</style>
