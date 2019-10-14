<template>
	<!-- 免疫记录 -->
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
				<collapse title="大塘猪场一分场" class="list" :stationData="getData">
				</collapse>
				<collapse title="大塘猪场二分场" class="list" :stationData="getData">
				</collapse>
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
import collapse from '@/components/collapse/collapse.vue'
export default {
	components: {
		scrollTab,
		uniIcon,
		collapse
	},
	data() {
		return {
			id: '',
			currentNavIndex: 0,
			navList: [{
				name: '普免'
			},{
				name: '跟胎免疫'
			},{
				name: '肉猪免疫'
			},{
				name: '异常免疫'
			},{
				name: '后备免疫'
			}],
			getData:[
				{
					name:'大塘猪场四分场-E01',
					totalTasks:18,
					finished:18,
					noFinished:18,
					beLate:18,
					cancel:18,
					doing:18,
					change:18
				}
			]
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
		}
	},
	methods: {
		handOnClickBack() {
			uni.navigateBack({
				
			})
		},
		filterData(){
			
		}
	}
}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.main-container{
		padding:20rpx 30rpx;
	}
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
