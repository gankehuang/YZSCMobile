<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				黄色预警
			</view>
			<!-- <view class="right__icon">
				<image src="../../../static/assets/setting.png" mode="" class="icon"></image>
			</view> -->
		</view>
	
		<scrollTab :navList="navList" activeTextColor="#F8CA4F" width="110rpx" v-model="currentNavIndex"></scrollTab>
		
		<view class="radius_card_wrap" v-show="currentNavIndex == 0">
			
			<view class="main">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<view class="left" style="background: #FF6354;">恶化</view>
							<view class="right">您管理的大塘猪场一分场批次号大唐一分厂-A01“配种计划完成率”为80%，低于标准90%请及时处理</view>
						</view>
						<view class="main-wrap-contetnt-item time">2019/01/02</view>
					</view>
					

				</view>
			</view>
			<view class="main">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<view class="left" style="background: #4380FF;">维持</view>
							<view class="right">您管理的大塘猪场一分场批次号大唐一分厂-A01“配种计划完成率”为80%，低于标准90%请及时处理</view>
						</view>
						<view class="main-wrap-contetnt-item time">2019/01/02</view>
					</view>
			
				</view>
			</view>
			<view class="main">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<view class="left" style="background: #6EC96C;">改善</view>
							<view class="right">您管理的大塘猪场一分场批次号大唐一分厂-A01“配种计划完成率”为80%，低于标准90%请及时处理</view>
						</view>
						<view class="main-wrap-contetnt-item time">2019/01/02</view>
					</view>
			
				</view>
			</view>
			<view class="main">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<view class="left" style="background: #6EC96C;">改善</view>
							<view class="right">您管理的大塘猪场一分场批次号大唐一分厂-A01“配种计划完成率”为80%，低于标准90%请及时处理</view>
						</view>
						<view class="main-wrap-contetnt-item time">2019/01/02</view>
					</view>
			
				</view>
			</view>
			<view class="main">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<view class="left" style="background: #4380FF;">维持</view>
							<view class="right">您管理的大塘猪场一分场批次号大唐一分厂-A01“配种计划完成率”为80%，低于标准90%请及时处理</view>
						</view>
						<view class="main-wrap-contetnt-item time">2019/01/02</view>
					</view>
			
				</view>
			</view>
		
			
		</view>
		<view class="datagrid-wrapper radius_card_wrap" v-show="currentNavIndex == 1">
			<view class="main">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<view class="left" style="background: #FF6354;">恶化</view>
							<view class="right">您管理的大塘猪场一分场批次号大唐一分厂-A01“配种计划完成率”为80%，低于标准90%请及时处理</view>
						</view>
						<view class="main-wrap-contetnt-item time">2019/01/02</view>
					</view>
					

				</view>
			</view>
		</view>
		<view class="datagrid-wrapper radius_card_wrap" v-show="currentNavIndex == 2">
			<view class="main">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<view class="left" style="background: #6EC96C;">改善</view>
							<view class="right">您管理的大塘猪场一分场批次号大唐一分厂-A01“配种计划完成率”为80%，低于标准90%请及时处理</view>
						</view>
						<view class="main-wrap-contetnt-item time">2019/01/02</view>
					</view>
			
				</view>
			</view>
		</view>
		<view class="datagrid-wrapper radius_card_wrap" v-show="currentNavIndex == 3">
			<view class="main">
				<view class="main-wrap">
					<view class="main-wrap-contetnt">
						<view class="main-wrap-contetnt-item">
							<view class="left" style="background: #6EC96C;">改善</view>
							<view class="right">您管理的大塘猪场一分场批次号大唐一分厂-A01“配种计划完成率”为80%，低于标准90%请及时处理</view>
						</view>
						<view class="main-wrap-contetnt-item time">2019/01/02</view>
					</view>
			
				</view>
			</view>
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
			navList: [
				{
					name: '后备'
				},{
					name: '配怀'
				},{
					name: '分娩'
				},{
					name: '公猪'
				},
			],
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
	.radius_card_wrap{
		padding-left: 0;
	}
	
	.main {
		.main-wrap {
			padding: 20rpx 20rpx 20rpx 20rpx;
			.time{
				display: flex;
				font-size: 16rpx;
				color: #B2B2B2;
				justify-content: flex-end !important;
			}
			.main-wrap-contetnt-item{
				display: flex;
				justify-content: center;
				background: #F9F9F9;
				border-radius: 20rpx;
				width: 100%;
				padding: 10rpx;
				.left{
					width: 120rpx;
					height: 100rpx;
					background: #FF6354;
					color: #fff;
					text-align: center;
					line-height: 100rpx;
					border-radius: 50%;
				}
				.right{
					width: 95%;
					margin-left: 5%;
					font-size: 28rpx;
					color: #4D4D4D;
				}
				
			}
		}
	}
	
	//item样式
	.topBox{
		margin: 10rpx 20rpx;
		.left{
			width: 100rpx;
			height: 100rpx;
			background: #FF6354;
			color: #fff;
			border-radius:50%;
			font-size: 24rpx;
			text-align: center;
			line-height: 100rpx;
		}
	}
	.bottomBox{
		width: 100%;
	}
	
	//顶部颜色
	.status__bar{
		background: #F8CA4F;
	}
	
</style>
