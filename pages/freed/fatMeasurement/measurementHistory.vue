<template>
	<view>
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">批次日龄调整记录</view>
				<view class="more-icon flexc ali-c" @click="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
			</view>
			<!-- 搜索框 -->
			<view class="status-search">
				<view class="search-wrap">
					<view class="search-wrap-search"><image class="icon" src="/static/assets/search@2x.png" mode=""></image></view>
					<view class="search-wrap-input"><input type="text" value="" placeholder="请输入搜索条件" /></view>
					<!-- <view class="search-wrap-qr" @click="scancode"><image class="icon" src="/static/assets/scan-icon.png" mode=""></image></view> -->
				</view>
			</view>
		</view>

		<!-- 选页信息 -->
		<view class="page-info">
			<text>共{{ pageInfo.total }}条,{{ pageNum }}页</text>
			<text>
				每页50条
				<image src="../../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</text>
		</view>
		<!-- 数据列表 -->
		<view class="list">
			<view class="data__wrapper">
				<ztable :tableData="tableData" stickSide stickSide1 :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
			</view>
		</view>
		<!-- 选页 -->
		<pageSider :pageNum="pageNum" :currentPage="pageInfo.page"></pageSider>
	</view>
</template>

<script>
import uniCell from '@/components/uni-cell/uni-cell.vue';
// 引入 表格
import ztable from '@/components/z-table/z-table.vue';
// 引入 选页
import pageSider from '@/components/pageSider.vue';

export default {
	components: {
		uniCell,
		ztable,
		pageSider
	},
	data() {
		return {
			tableData: [
				{
					index: 'ZZPDD-01',
					plan: '怀孕',
					vaccineName: '28',
					computerStart: '15-17',
					performMan: '张三'
				},
				{
					index: '02',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '03',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '04',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '05',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				}
			],
			columns: [
				{
					title: '耳牌号',
					key: 'index',
					width: '200'
				},
				{
					title: '状态',
					key: 'plan',
					width: '200'
				},
				{
					title: '天数',
					key: 'vaccineName',
					width: '200'
				},
				{
					title: '标准背膘',
					key: 'computerStart',
					width: '200'
				}
			],
			pageInfo: {
				page: 1,
				pageSize: 50,
				total: 2000
			}
		};
	},
	methods: {
		scancode1() {
			this.scancode();
			setTimeout(() => {
				this.togglePopup('middle');
			}, 500);
		}
	},
	computed: {
		pageNum() {
			return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize);
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';

.status {
	z-index: 99999;
	.status-title {
		padding-left: 8%;
	}
}
.status-search {
	border-radius: 3px;
	.search-wrap {
		padding: 10rpx 25rpx;
	}
	.search-wrap-qr,
	.search-wrap-search {
		width: 10%;
		display: flex;
		align-items: center;
		margin: 0 15rpx;
	}
	.search-wrap-input {
		width: 80%;
		text-align: left;
	}
}

.page-info {
	display: flex;
	height: 60rpx;
	align-items: center;
	font-size: 24rpx;
	justify-content: space-between;
	color: #7a7a7a;
	padding: 260rpx 20rpx 0;
	image {
		height: 16rpx;
		width: 16rpx;
	}
}
.list {
	padding-top: 0;
	
	.data__wrapper {
		padding: 0 20rpx;
	}
}
</style>
