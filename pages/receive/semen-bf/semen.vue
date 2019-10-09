<template>
	<view class="semen">
		<view class="semen-seach ali-c">
			<input class="seach-input" type="text" value="" placeholder="请输入查询内容"/>
		</view>
		<view class="flex page__info">
			<text>共2492条,50页</text>
			<text>
				每页50条
				<image src="/static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</text>
		</view>		<view class="data__wrapper">
			<ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
		</view>
		<view class="confirm-btn">
			<button type="primary" @tap="toSemenAdd">确定</button>
		</view>
		<PageSider :pageNum="pageNum" :currentPage="pageInfo.page" @selectPage="selectPage"></PageSider>
		<popup-layer ref="popupRef" :direction="'right'">
		    <list-page
			 @selectPages="selectPages"
			 >
			 </list-page>
		</popup-layer>
	</view>
</template>

<script>
	import ztable from '@/components/z-table/z-table'
	import PageSider from '@/components/pageSider.vue'
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
	// 引入page组件
	import listPage from '@/components/popup-list-page';
	export default {
		data() {
			return {
				tableData: [{
						id:'111',
						index: 5,
						dnumber: 'YY0065215521',
						date: '2019-10-22',
						status: '大白',
						useTime: '2019-10-22',
						useTimeOld: 5,
						useName: 'YY006',
						mallNumber: '1022',
						pigPub: '大白',
						pigLogo: 'logoPig',
						breeding: 5,
						copies: 'YY006',
						lastTime: '2019-10-22',
						status: '大白',
						onePig: '5',
						twoPig: '1',
						checked:true
					},
					{
							id:'222',
							index: 5,
							dnumber: 'YY0065215521',
							date: '2019-10-22',
							status: '大白',
							useTime: '2019-10-22',
							useTimeOld: 5,
							useName: 'YY006',
							mallNumber: '1022',
							pigPub: '大白',
							pigLogo: 'logoPig',
							breeding: 5,
							copies: 'YY006',
							lastTime: '2019-10-22',
							status: '大白',
							onePig: '5',
							twoPig: '1',
							checked:false
						}],
					columns: [{
						title: "序号",
						key: "index",
						width: 70,
					},{
						title: "单据号",
						key: "dnumber",
						width: 200,
					},{
						title: "申请日期",
						key: "date",
						width: 200,
					},{
						title: "状态",
						key: "status",
						width: 100,
					},{
						title: "精液使用时间",
						key: "useTime",
						width: 200,
					},{
						title: "精液使用时间段",
						key: "useTimeOld",
						width: 200,
					},{
						title: "申请人",
						key: "useName",
						width: 100,
					},{
						title: "总份数",
						key: "mallNumber",
						width: 100,
					},{
						title: "猪场",
						key: "pigPub",
						width: 200,
					},{
						title: "母猪耳牌",
						key: "pigLogo",
						width: 200,
					},{
						title: "第几次配种",
						key: "breeding",
						width: 200,
					},{
						title: "申请领用份数",
						key: "copies",
						width: 160,
					},{
						title: "最近一次配种时间",
						key: "lastTime",
						width: 200,
					},{
						title: "一配公猪",
						key: "onePig",
						width: 100,
					},{
						title: "二配公猪",
						key: "twoPig",
						width: 100,
					}],
					pageInfo: {
						page: 1,
						pageSize: 50,
						total: 2000,
					}
				}
				
		},
		components: {
			ztable,
			PageSider,
			popupLayer,
			listPage
		},
		methods: {
			rowTapHandler (row) {
				uni.navigateTo({
					url:'/pages/receive/semen/senmenAdd'
				})
			},
			checkbox(e) {
				console.log(e.detail.value)//id
			},
			//选页
			selectPage() {
				this.$refs.popupRef.show();
			},
			selectPages(e) {
				console.log(e)
			},
			toSemenAdd() {
				uni.navigateTo({
					url:'/pages/receive/semen/senmenAdd'
				})
			}
		},
		computed: {
			pageNum () {
				return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
			}
		}
	}
</script>

<style lang="scss">
	.semen-seach {
		height: 88upx;
		background-color: #5089F9;
		.seach-input {
			width: 680upx;
			height: 60upx;
			font-size: 20upx;
			padding-left: 16upx;
			margin-left: 20upx;
			background-color: #ffffff;
			border-radius: 10upx;
		}
	}
	.confirm-btn {
		width: 520upx;
		margin: 22upx auto;
	}
	.page__info{
		height: 60upx;
		align-items: center;
		font-size: 24upx;
		justify-content: space-between;
		margin: 10upx 0 0;
		color: #7A7A7A;
		padding: 0 20upx;
	}
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
</style>
