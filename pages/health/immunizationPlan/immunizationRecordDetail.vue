<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="status-header">
				<view class="back__icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png" mode=""></image>
				</view>
				<view class="status__title">
					免疫记录
				</view>
				<view class="right__icon" @tap="filterData">
					筛选
				</view>
			</view>
		</view>
		<view class="header-wrap">
			<view class="status-search">
				<view class="search-wrap">
					<view class="search-wrap-search">
						<uni-icon type="search" color="#CACFD9"></uni-icon>
					</view>
					<view class="search-wrap-input">
						<input type="text" value="" placeholder="请输入筛选条件" />
					</view>
				</view>
			</view>
		</view>
		<scrollTab :navList="navList" v-model="currentNavIndex"></scrollTab>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 0">
			<view class="main-container">
				<view class="card-form card">
					<uni-cell title="任务类型" :value="form.name"></uni-cell>
					<uni-cell title="任务名称" :value="form.projectName"></uni-cell>
					<uni-cell title="计划日期" :value="form.projectName"></uni-cell>
					<uni-cell title="任务状态" :value="form.projectName"></uni-cell>
					<uni-cell title="完成日期" :value="form.projectName"></uni-cell>
				</view>
				<view class="card-form card" style="margin-top: 20rpx;">
					<uni-cell title="任务类型" :value="form.name"></uni-cell>
					<uni-cell title="任务名称" :value="form.projectName"></uni-cell>
					<uni-cell title="计划日期" :value="form.projectName"></uni-cell>
					<uni-cell title="任务状态" :value="form.projectName"></uni-cell>
					<uni-cell title="完成日期" :value="form.projectName"></uni-cell>
				</view>
			</view>
		</view>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 1">
			
		</view>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 2">
			
		</view>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 3">
			
		</view>
		<view class="datagrid-wrapper" v-show="currentNavIndex == 4">
		
		</view>
		
	</view>
</template>

<script>
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniCell from '@/components/uni-cell/uni-cell.vue'
export default {
	components: {
		scrollTab,
		uniIcon,
		uniCell
	},
	data() {
		return {
			id: '',
			currentNavIndex: 0,
			form: {
				name:'一分场',
				projectName:'自动带出',
			},
			navList: [{
				name: '总任务'
			},{
				name: '已执行'
			},{
				name: '已取消'
			},{
				name: '未执行'
			},{
				name: '已逾期'
			}]
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
		}
	},
	methods: {
		handOnClickBack () {
			uni.navigateBack({
			})
		}
	}
}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.status__bar{
		display: flex;
		flex-direction: column;
		align-items: center;
		.status-header{
			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			padding-left: 3%;
			width: 97%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	.main-container{
		padding:20rpx 30rpx;
		.list{
			margin-bottom: 30rpx;
		}
		.detail-item{
			background: #FFFFFF;
			border-radius: 8rpx;
			padding:26rpx 20rpx 10rpx;
			.detail-header{
				font-size: 28rpx;
				color: #333333;
				.colorBlock{
					background: #3A75E7;
					width: 5rpx;
					height: 18rpx;
					display: inline-block;
					margin-right: 10rpx;
				}
			}
			.detail-body{
				.detail-row{
					padding:14rpx 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					border-bottom:1px solid #CBCBCB;
					&:last-child{
						border-bottom: none;
					}
					.detail-row-item{
						width: 25%;
						text-align: center;
						.num{
							color: #333333;
							font-weight: bold;
							font-size: 36rpx;
						},
						.title{
							color:#999999;
							font-size: 24rpx;
						}
					}
					text{
						display: block;
						text-align: center;
					}
				}
			}
		}
	}
	.status-search{
		background:#3A75E7 ;
		color: #B2B2B2;
		padding:20rpx 4%;
		.search-wrap{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #FFFFFF;
			height:48rpx;
			padding:0 18rpx;
			.search-wrap-input{
				margin-left: 20rpx;
				.uni-input-placeholder{
					font-size: 28rpx;
				}
			}
		}
	}
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	.datagrid-wrapper{
		padding: 20rpx 12rpx 0;
	}
</style>
