<template>
	<view class="health-container">
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon flexc ali-c" @tap="back"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">免疫记录明细</view>
			</view>
		</view>
		<!-- 免疫记录明细 -->
		<view class="main-container">
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../../static/assets/rect.png" mode=""></image>
					<text>计划信息</text>
				</view>
			</view>
			<view class="card-form card">
				<uni-cell title="执行状态" :value="form.name"></uni-cell>
				<uni-cell title="任务类型" :value="form.projectName"></uni-cell>
				<uni-cell title="任务名称" :value="form.projectName"></uni-cell>
				<uni-cell title="配种批次" :value="form.projectName"></uni-cell>
				<uni-cell title="计划开始时间" :value="form.projectName"></uni-cell>
				<uni-cell title="计划结束时间" class="card-cell-last" :value="form.projectName"></uni-cell>
			</view>
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../../static/assets/rect.png" mode=""></image>
					<text>执行信息</text>
				</view>
			</view>
			<view class="card-form card">
				<uni-cell title="猪只类型" :value="form.name"></uni-cell>
				<uni-cell title="计算起点" :value="form.projectName"></uni-cell>
				<uni-cell title="疫苗种类" :value="form.projectName"></uni-cell>
				<uni-cell title="疫苗名称" class="card-cell-last" :value="form.projectName"></uni-cell>
			</view>
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../../static/assets/rect.png" mode=""></image>
					<text>头数</text>
				</view>
			</view>
			<view class="card-form card">
				<uni-cell title="实际头数" :value="form.name"></uni-cell>
				<uni-cell title="出血头数" :value="form.projectName"></uni-cell>
				<uni-cell title="补大头数" :value="form.projectName"></uni-cell>
				<uni-cell title="剂量" :value="form.projectName"></uni-cell>
				<uni-cell title="单位" :value="form.projectName"></uni-cell>
				<uni-cell title="免疫方式" :value="form.projectName"></uni-cell>
				<uni-cell title="执行人" :value="form.projectName"></uni-cell>
				<uni-cell title="完成时间" class="card-cell-last" :value="form.projectName"></uni-cell>
			</view>

			<view class="editor-title flex ali-c jus-j">
				<view class="img">
					<image src="../../../static/assets/rect.png" mode=""></image>
					<text>照片</text>
				</view>
			</view>
			<view class="takePhotoList">
				<view class="takephotoItem"><image class="img" src="../../../static/assets/plus.png" mode=""></image></view>
				<view class="takephotoItem"><image class="img" src="../../../static/assets/plus.png" mode=""></image></view>
				<view class="takephotoItem"><image class="img" src="../../../static/assets/plus.png" mode=""></image></view>
			</view>
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../../static/assets/rect.png" mode=""></image>
					<text>调整明细</text>
				</view>
			</view>
			<view class="data__wrapper"><ztable :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable></view>
			<view class="submits jus-b"><button type="primary" class="flexc submit-btn">提交</button></view>
		</view>
	</view>
</template>

<script>
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import uniCell from '@/components/uni-cell/uni-cell.vue';
import ztable from '@/components/z-table/z-table';
// 引入弹框组件
export default {
	data() {
		return {
			form: {
				name: '一分场',
				projectName: '自动带出'
			},
			getNumber: '',
			dayNumber: '',
			tableData: [
				{
					name: '哺乳仔猪',
					plan: '14日龄蓝耳',
					vaccineName: '50ml',
					computerStart: '瓶',
					performMan: '张三',
					status: '201'
				},
				{
					name: '哺乳仔猪',
					plan: '14日龄蓝耳',
					vaccineName: '50ml',
					computerStart: '瓶',
					performMan: '张三',
					status: '大白'
				},
				{
					name: '哺乳仔猪',
					plan: '14日龄蓝耳',
					vaccineName: '50ml',
					computerStart: '瓶',
					performMan: '张三',
					status: '大白'
				}
			],
			columns: [
				{
					title: '单据编号',
					key: 'name',
					width: '200'
				},
				{
					title: '疫苗',
					key: 'plan',
					width: '200'
				},
				{
					title: '规格',
					key: 'vaccineName',
					width: '200'
				},
				{
					title: '单位',
					key: 'computerStart',
					width: '100'
				},
				{
					title: '数量',
					key: 'computerStart',
					width: '100'
				}
			]
		};
	},
	components: {
		mpvuePicker,
		uniIcon,
		uniCell,
		ztable
	},
	computed: {
		pageNum() {
			return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize);
		}
	},
	methods: {
		//选页
		selectPage() {
			this.$refs.popupRef.show();
		},
		selectPages(e) {
			console.log(e);
		},
		filterData(e) {
			console.log(e);
		},
		back() {
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="scss">
@import '@/common/dataCollection.scss';
.health-container {
	background-color: #f5f5f5;
	//padding: 0 30rpx 120rpx;
	.status-header {
		padding-top: 26rpx;
	}

	.main-container {
		padding: 130rpx 30rpx 120rpx;
	}

	.editor-title {
		height: 50rpx;
		.img {
			line-height: 44rpx;
			image {
				width: 12rpx;
				height: 12rpx;
				vertical-align: middle;
			}
		}
		text {
			margin-left: 14rpx;
			line-height: 44rpx;
			font-size: 32rpx;
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
	.card-form {
		margin-top: 0rpx;

		.input-style {
			color: #b2b2b2;
			text-align: right;
		}
		.input-style .uni-input-wrapper .uni-input-placeholder {
			color: #b2b2b2;
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
				background-color: #4684ea;
			}
		}
		&.form-seat {
			height: 120rpx;
		}
	}

	.submits {
		margin-top: 56rpx;
		margin-bottom: 10rpx;
		button {
			width: 520rpx;
			height: 88rpx;
			&.editor-btn {
				background-color: #f05e57;
			}
			&.submit-btn {
				background-color: #4684ea;
			}
		}
	}
}
</style>
