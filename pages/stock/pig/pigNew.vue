<template>

	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					猪只盘点单新增
				</view>
				<view class="status-del" @tap="record">
					删除
				</view>
			</view>
		</view>

		<view class="health-container">
			<view class="card-form card">
				<uni-cell title="猪只耳号" required="true" :value="form.projectName"></uni-cell>
				<uni-cell title="状态" required="true" :value="form.projectName"></uni-cell>
				<uni-cell title="胎次" required="true" :value="form.projectName"></uni-cell>
				<uni-cell title="栏位" required="true" :value="form.projectName"></uni-cell>
				<uni-cell title="最新业务日期" required="true" :value="form.projectName"></uni-cell>
			</view>

			<!-- btn -->
			<view class="submits jus-b">
				<button type="primary" class="flexc cancel-btn" @tap="clickCancel">取消</button>
				<button type="primary" class="flexc submit-btn">确定</button>
			</view>
		</view>
	</view>

</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniCell from '@/components/uni-cell/uni-cell.vue'
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	import ztable from '@/components/z-table/z-table'
	import popupLayer from '@/components/popup/popup-layer.vue';
	import PageSider from '@/components/pageSider.vue'
	export default {
		data() {
			return {
				id: '55',
				form: {
					name: '一分场',
					projectName: '自动带出',
				},
				columns: [{
					title: "序号",
					key: "index",
					width: '100'
				}, {
					title: "物料名称",
					key: "name",
					width: '200'
				}, {
					title: "规格型号",
					key: "specno",
					width: '200'
				}, {
					title: "计量单位",
					key: "unit",
					width: '200'
				}, {
					title: "盘点数量",
					key: "stockNum",
					width: '200'
				}, {
					title: "差异数量",
					key: "diffNum",
					width: '200'
				}, {
					title: "库存数量",
					key: "storageNum",
					width: '200'
				}, {
					title: "物料基本分类",
					key: "classify",
					width: '200'
				}],
				tableData: [{
					index: '01',
					name: '毛巾',
					specno: '2019-02-21',
					unit: '件',
					stockNum: '30',
					diffNum: '25',
					storageNum: '55',
					classify: '衣服'
				}, {
					index: '02',
					name: '衣服',
					specno: '20190902-01',
					unit: '件',
					stockNum: '30',
					diffNum: '25',
					storageNum: '55',
					classify: '衣服'
				}, {
					index: '03',
					name: '裤子',
					specno: '20190902-01',
					unit: '件',
					stockNum: '30',
					diffNum: '25',
					storageNum: '55',
					classify: '衣服'
				}],
				pageInfo: {
					page: 1,
					pageSize: 50,
					total: 2000,
				}

			}
		},
		components: {
			mpvuePicker,
			uniIcon,
			uniCell,
			ztable,
			drawCell,
			popupLayer,
			PageSider
		},
		methods: {
			record() {
				uni.navigateTo({
					url: 'materialRecord?id=' + this.id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		computed: {
			pageNum() {
				return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

	.status-header {
		padding-top: 26rpx;

		.status-title {
			padding-left: 32%;
		}
	}

	.health-container {
		background-color: #F5F5F5;
		padding: 130rpx 30rpx 120rpx;

		.editor-title {
			height: 54rpx;

			.img {
				line-height: 54rpx;

				.image {
					width: 12rpx;
					height: 12rpx;
					vertical-align: middle;
				}
				.sca {
					width: 40rpx;
					height: 40rpx;
					margin-left: 30rpx;
					margin-top: -10rpx;
				}
			}

			text {
				margin-left: 14rpx;
				line-height: 54rpx;
				font-size: 32rpx;
			}

			.btn {
				line-height: 54rpx;

				button {
					width: 140rpx;
					height: 54rpx;
					vertical-align: middle;
					font-size: 24rpx;
					text-align: center;
					padding: 0px;
				}
			}
		}

		.takePhotoList {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.takephotoItem {
				background: white;
				border-radius: 22rpx;
				height: 216rpx;
				width: 216rpx;
				margin-right: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.img {
					width: 53rpx;
					height: 53rpx;
					vertical-align: middle;
				}
			}
		}

		.submits {
			margin-top: 56rpx;
			margin-bottom: 10rpx;

			button {
				width: 320rpx;
				height: 88rpx;

				&.cancel-btn {
					background-color: #F05E57;
				}

				&.submit-btn {
					background-color: #4684EA;
				}
			}
		}

		.card-form {
			margin-top: 30rpx;

			.input-style {
				color: #B2B2B2;
				text-align: right;
			}

			.input-style .uni-input-wrapper .uni-input-placeholder {
				color: #B2B2B2;
				text-align: right;
				font-size: 28rpx;
			}
		}

		.editor-title {
			height: 80rpx;

			.confirm-btn {
				width: 140rpx;
				height: 54rpx;

				button {
					width: 140rpx;
					height: 54rpx;
					font-size: 24rpx;
					padding: 0;
					background-color: #4684EA;
				}
			}

			&.form-seat {
				height: 120rpx;
			}
		}

		//抽屉样式
		.draw {
			padding: 30rpx;
			width: 500rpx;
			height: calc(100% - 118rpx);

			.bg-gray {
				background: #f5f5f5;
				padding: 16rpx 20rpx;
				font-size: 12px;
				color: #4d4d4d;
			}
		}

		.page__info {
			align-items: center;
			font-size: 12px;
			justify-content: space-between;
			margin: 10px 0 0;
		}
	}
</style>
