<template>
	<view class="semen">
		<view class="semen-seach ali-c">
			<input class="seach-input" type="text" value="" placeholder="请输入查询内容"/>
		</view>
		<view class="flex page__info">
			<text>已选6条,共2492条,50页</text>
			<text>
				每页50条
				<image src="/static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</text>
		</view>
		<view class="data__wrapper">
			<ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
		</view>
		<view class="confirm-btn">
			<button type="primary" @tap="toAdd">确定</button>
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
						index: 1,
						date: '2019-10-22',
						useType: '11',
						isOutsourcing:'是',
						pigPub: '大白',
						senmenName:'维生素C',
						invoiceType:'正常',
						checked:false
					},
					{
						id:'222',
						index: 2,
						date: '2019-10-22',
						useType: '11',
						isOutsourcing:'是',
						pigPub: '大白',
						senmenName:'维生素C',
						invoiceType:'正常',
						checked:false
					},
					{
						id:'222',
						index: 3,
						date: '2019-10-22',
						useType: '11',
						isOutsourcing:'是',
						pigPub: '大白',
						senmenName:'维生素C',
						invoiceType:'正常',
						checked:false
					},
					{
						id:'222',
						index: 4,
						date: '2019-10-22',
						useType: '11',
						isOutsourcing:'是',
						pigPub: '大白',
						senmenName:'维生素C',
						invoiceType:'正常',
						checked:false
					},
					{
						id:'222',
						index: 5,
						date: '2019-10-22',
						useType: '11',
						isOutsourcing:'是',
						pigPub: '大白',
						senmenName:'维生素C',
						invoiceType:'正常',
						checked:false
					},
					{
						id:'222',
						index: 6,
						date: '2019-10-22',
						useType: '11',
						isOutsourcing:'是',
						pigPub: '大白',
						senmenName:'维生素C',
						invoiceType:'正常',
						checked:false
					}],
					columns: [{
						title: "序号",
						key: "index",
						width: 70,
					},{
						title: "申请日期",
						key: "date",
						width: 200,
					},{
						title: "领料类型",
						key: "useType",
						width: 100,
					},{
						title: "分场",
						key: "pigPub",
						width: 200,
					},{
						title: "组别",
						key: "isOutsourcing",
						width: 100,
					},{
						title: "物料名称",
						key: "senmenName",
						width: 200,
					},{
						title: "单据状态",
						key: "invoiceType",
						width: 140,
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
			},
			toAdd() {
				uni.navigateTo({
					url:'/pages/receive/lowValue/newAdd'
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
