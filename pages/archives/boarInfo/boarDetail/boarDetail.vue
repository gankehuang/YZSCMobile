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
					<text>耳牌：YY19120001</text>
					<text>国际号：YYZBBK118120001</text>
				</view>
				<view class="header-row">
					<text>猪只类型：生产母猪</text>
					<text>在场状态：在场</text>
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
				<view class="card_value">大白</view>
			</view>
			<view class="card_row">
				<view class="card_label">公母</view>
				<view class="card_value">母</view>
			</view>
			<view class="card_row">
				<view class="card_label">出生日期</view>
				<view class="card_value">2018/01/01</view>
			</view>
			<view class="card_row">
				<view class="card_label">出生猪场</view>
				<view class="card_value">安塘猪场</view>
			</view>
			<view class="card_row">
				<view class="card_label">出生分场</view>
				<view class="card_value">安塘总场</view>
			</view>
			<view class="card_row">
				<view class="card_label">猪只状态</view>
				<view class="card_value">怀孕</view>
			</view>
			<view class="card_row">
				<view class="card_label">日龄</view>
				<view class="card_value">400</view>
			</view>
			<view class="card_row">
				<view class="card_label">当前胎次</view>
				<view class="card_value">0</view>
			</view>
			<view class="card_row">
				<view class="card_label">最新业务</view>
				<view class="card_value">配种</view>
			</view>
			<view class="card_row">
				<view class="card_label">最新业务时间</view>
				<view class="card_value">2019-05-01</view>
			</view>
			<view class="card_row">
				<view class="card_label">所在分场</view>
				<view class="card_value">400</view>
			</view>
			<view class="card_row">
				<view class="card_label">存栏位置</view>
				<view class="card_value">配怀舍一栋</view>
			</view>
			<view class="card_row">
				<view class="card_label">入群时间</view>
				<view class="card_value">2019/05/01</view>
			</view>
			<view class="card_row">
				<view class="card_label">核心群</view>
				<view class="card_value">核心群一级</view>
			</view>
			<view class="card_row">
				<view class="card_label">配种批次</view>
				<view class="card_value">安塘一分场-A01</view>
			</view>
			<view class="card_row">
				<view class="card_label">栏位号</view>
				<view class="card_value">1</view>
			</view>
			<view class="card_row">
				<view class="card_label">入场日期</view>
				<view class="card_value">2018/01/01</view>
			</view>
			<view class="card_row">
				<view class="card_label">离场原因</view>
				<view class="card_value">-</view>
			</view>
			<view class="card_row">
				<view class="card_label">入场日期</view>
				<view class="card_value">-</view>
			</view>
			<view class="card_row">
				<view class="card_label">入场日期</view>
				<view class="card_value">-</view>
			</view>
		</view>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 1">
			<ztable :tableData="breedDatas" :columns="breedColumns"></ztable>
		</view>
		
	</view>
</template>

<script>
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import ztable from '@/components/z-table/z-table'
export default {
	components: {
		scrollTab,
		ztable
	},
	data() {
		return {
			id: '',
			currentNavIndex: 0,
			navList: [{
				name: '基本信息'
			},{
				name: '繁殖信息'
			}],
			breedColumns: [{
					title: "胎次",
					key: "curpt",
					width: 70,
				}, {
					title: "配种时间",
					key: "breedingDate",
					width: 150,
				}, {
					title: "配种员",
					key: "breedtor",
					width: 120,
				}, {
					title: "与配公猪",
					key: "borno",
					width: 120,
				}, {
					title: "预产期",
					key: "birthDate",
					width: 150,
				}, {
					title: "情期",
					key: "estrus",
					width: 150,
				}, {
					title: "异常妊娠日期",
					key: "errorStrusDate",
					width: 150,
				}, {
					title: "总仔数",
					key: "incnt",
					width: 120,
				}, {
					title: "活仔数",
					key: "ilive",
					width: 120,
				}, {
					title: "合格(公)",
					key: "imale",
					width: 120,
				}, {
					title: "合格(母)",
					key: "ifmal",
					width: 120,
				}],
			breedDatas: [{
				curpt: 1,
				breedingDate: '2019/05/05',
				breedtor: '张三',
				borno: 'D037',
				birthDate: '2019/05/05',
				estrus: '2019/05/05',
				errorStrusDate: '15',
				incnt: 100,
				ilive: 80,
				imale: 50,
				ifmal: 30
			}],
			immunityColumns: [{
				title: "项目",
				key: "project",
				width: 150,
			},{
				title: "物料名称",
				key: "material",
				width: 150,
			},{
				title: "生产厂家",
				key: "factory",
				width: 150,
			},{
				title: "使用方法",
				key: "useMethod",
				width: 120,
			},{
				title: "计量单位",
				key: "unit",
				width: 100,
			},{
				title: "数量",
				key: "cnt",
				width: 70,
			},{
				title: "物料分类",
				key: "materialGroup",
				width: 120,
			},{
				title: "日期",
				key: "bizDate",
				width: 150,
			}]
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
		}
	},
	methods: {
		back () {
			uni.navigateBack({
			})
		},
		seeFamily () {
			uni.navigateTo({
				url: `../boarFamily/boarFamily?id=${this.id}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
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
