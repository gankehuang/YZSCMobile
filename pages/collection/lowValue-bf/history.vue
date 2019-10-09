<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status_bar">
			<view class="status">
				<image class="status__bg" src="/static/assets/top_bg.png" mode="widthFix"></image>
				<view class="icon-back" @tap="handOnClickBack">
					<image class="icon" src="../../static/assets/back.png" mode=""></image>
				</view>
				<view class="icon-set">
					<image class="icon2" src="../../static/assets/Fill.png" mode=""></image>
				</view>
				<view class="status__title">低值申请历史记录</view>
			</view>
			<view class="status-search clearfloat">
				<view class="search-box">
					<image class="search_ico" src="/static/search/ico-01.png" mode="aspectFit"></image>
					<input class='topInput' name='input' placeholder-style="color:#808080" placeholder="请输入筛选条件" value='' />
					<image class="QR" src="/static/search/qr.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list">
			<view class="list-text l-left">共2141条，20页</view>
			<view class="list-text l-right">每页20条</view>
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="true"></ztable>
			</view>
		</view>
	</view>
</template>

<script>
	import ztable from '@/components/z-table/z-table'
	export default {
		data() {
			return {
				tableData: [{
						id: '01',
						index: '01',
						date: '2019-01-01',
						status: '一分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '02',
						index: '02',
						date: '2019-10-22',
						status: '二分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '03',
						index: '03',
						date: '2019-01-01',
						status: '一分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '04',
						index: '04',
						date: '2019-10-22',
						status: '二分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '05',
						index: '05',
						date: '2019-01-01',
						status: '一分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '06',
						index: '06',
						date: '2019-10-22',
						status: '二分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '07',
						index: '07',
						date: '2019-01-01',
						status: '一分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '08',
						index: '08',
						date: '2019-10-22',
						status: '二分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '09',
						index: '09',
						date: '2019-01-01',
						status: '一分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '10',
						index: '10',
						date: '2019-10-22',
						status: '二分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '11',
						index: '11',
						date: '2019-01-01',
						status: '一分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '12',
						index: '12',
						date: '2019-10-22',
						status: '二分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '13',
						index: '13',
						date: '2019-01-01',
						status: '一分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '14',
						index: '14',
						date: '2019-10-22',
						status: '二分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					}, {
						id: '15',
						index: '15',
						date: '2019-01-01',
						status: '一分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '16',
						index: '16',
						date: '2019-10-22',
						status: '二分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					}, {
						id: '17',
						index: '17',
						date: '2019-01-01',
						status: '一分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					},
					{
						id: '99',
						index: '99',
						date: '2019-10-22',
						status: '二分场',
						zb: 'DD001',
						classification: '毛巾',
						lynum:'2条/袋'
					}
				],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				}, {
					title: "申请日期",
					key: "date",
					width: 200,
				}, {
					title: "申请分场",
					key: "status",
					width: 100,
				}, {
					title: "组别",
					key: "zb",
					width: 200,
				}, {
					title: "物料名称",
					key: "classification",
					width: 200,
				}, {
					title: "申请数量",
					key: "lynum",
					width: 200,
				}]
			}
		},
		components: {
			ztable
		},
		onLoad() {

		},
		methods: {
			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f2f5fc;
	}

	.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}

	.clearfloat {
		zoom: 1
	}

	// 状态栏
	.status_bar {
		height: 128rpx;
		width: 100%;
		position: fixed;
		z-index: 99999;


		.status {
			position: relative;

			.icon-back {
				position: absolute;
				top: 50%;
				margin-top: -10rpx;
				padding-left: 40rpx;
				width: 10%;
				
				.icon {
					width: 16rpx;
					height: 28rpx;
				}
			}

			.icon-set {
				position: absolute;
				top: 50%;
				margin-top: -10rpx;
				right: -30rpx;
				width: 10%;
				
				.icon2 {
					width: 8rpx;
					height: 42rpx;
				}
			}

			&__bg {
				width: 100%;
			}

			&__title {
				font-family: PingFangSC-Semibold;
				font-size: 32rpx;
				color: #FFFFFF;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -10rpx;
				margin-left: -85rpx;
			}
		}

		.status-search {
			background-image: linear-gradient(192deg, #544AFF 13%, #5A5FFF 87%);
			width: 750rpx;
			margin-top: -20rpx;

			.search-box {
				display: flex;
				border: 2rpx solid #f2f2f2;
				border-radius: 4rpx;
				width: 694rpx;
				margin: 10rpx 28rpx;
				background-color: #F6F9FF;
				float: left;
				height: 24px;

				.search_ico {
					display: inline-block;
					overflow: hidden;
					margin: 20rpx 14rpx 20rpx 22rpx;
					width: 24rpx;
					height: 24rpx;
				}

				.topInput {
					border: none;
					margin-top: 5rpx;
					margin-bottom: 5rpx;
					font-size: 26rpx;
				}
				
				.QR {
					display: inline-block;
					overflow: hidden;
					float: right;
					margin: 15rpx 0 20rpx 90rpx;
					width: 24rpx;
					height: 24rpx;
				}
			}
		}
	}

	.list {
		padding-top:180rpx;
	
		.list-text {
			font-family: PingFang SC;
			font-size: 24rpx;
			color: #7A7A7A;
		}
	
		.l-right {
			margin-left: 594rpx;
			padding-bottom: 14rpx;
			margin-top: -50rpx;
		}
	
		.l-left {
			width: 50%;
			padding-left: 28rpx;
			padding-top: 25rpx;
			padding-bottom: 14rpx;
		}
		
		.data__wrapper {
			padding: 0 0 0 20rpx;
		}
		
	}

</style>
