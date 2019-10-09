<template>
	<view class="semen">
		<view class="semen-seach ali-c">
			<input class="seach-input" type="text" value="" placeholder="请输入查询内容"/>
		</view>
		<view class="flex page__info">
			<text>共2492条,50页</text>
			<text>
				每页50条
				<image src="../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</text>
		</view>		<view class="data__wrapper">
			<ztable :tableData="tableData" :columns="columns" :neddCheck="false" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
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
				tableData: [
					{
							id:'222',
							index: 5,
							date: '2019-10-22',
							useTime: '2019-10-22',
							isOutsourcing:'是',
							mallNumber: '1022',
							pigPub: '大白',
							pigLogo: 'logoPig',
							copies: '653',
							total:'125.00',
							checked:false
						}],
					columns: [{
						title: "序号",
						key: "index",
						width: 70,
					},{
						title: "领用日期",
						key: "date",
						width: 200,
					},{
						title: "领用使用时间段",
						key: "useTime",
						width: 200,
					},{
						title: "领用分场",
						key: "pigPub",
						width: 200,
					},{
						title: "是否外购",
						key: "isOutsourcing",
						width: 100,
					},{
						title: "公猪站/供应商",
						key: "pigLogo",
						width: 200,
					},{
						title: "领用份数",
						key: "copies",
						width: 120,
					},{
						title: "领用总成本",
						key: "total",
						width: 120,
					}],
					pageInfo: {
						page: 1,
						pageSize: 50,
						total: 2000,
					},
					boolShow:false,
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
				console.log(`row click from boarinfo ${JSON.stringify(row)}`)
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
