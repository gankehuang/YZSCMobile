<template>
	<view class="semen">
		<!-- <view class="semen-seach ali-c">
			<input class="seach-input" type="text" value="" placeholder="请输入查询内容"/>
		</view>
		<view class="flex page__info">
			<text>已选6条,共2492条,50页</text>
			<text>
				每页50条
				<image src="/static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</text>
		</view> -->
		<view class="data__wrapper">
			<ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
		</view>
		<!-- <view class="confirm-btn">
			<button type="warn" @tap="toAdd">不发情后备母猪处理</button>
			<button type="primary" @tap="toAdd">淘汰申请</button>
		</view> -->
		<view class="submits jus-b" v-if="flag">
			<button type="warn" class="flexc submit-btn" style="width: 50%;background: red;">不发情后备母猪处理</button>
			<button type="primary" class="flexc" @tap="clickEdit">淘汰申请</button>
		</view>
		
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
				flag: false,
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
						title: "耳牌号",
						key: "date",
						width: 200,
					},{
						title: "后备批次号",
						key: "useType",
						width: 230,
					},{
						title: "日领",
						key: "pigPub",
						width: 200,
					},{
						title: "标准批次",
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
				this.flag = true;
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
	@import "../../common/dataCollection.scss";
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
		width: 350upx;
		font-size: 30upx;
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
