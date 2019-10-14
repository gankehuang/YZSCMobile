<template>
	<view>
		<!-- 标题 -->
		<view class="content-container">
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>基本信息</text>
				</view>
			</view>

			<!-- 表单 -->
			<view class="card-form card">
				<uni-cell title="配种批次" :value="form.projectName"></uni-cell>
				<uni-cell title="任务名称" :value="form.projectName"></uni-cell>
				<uni-cell title="任务日期" :value="form.projectName"></uni-cell>
				<uni-cell title="检测头数" :value="form.projectName"></uni-cell>
				<uni-cell title="执行人" :value="form.projectName"></uni-cell>
				<uni-cell title="猪场" :value="form.projectName"></uni-cell>
				<uni-cell title="分厂" :value="form.projectName"></uni-cell>
			</view>

			<!-- 标题 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>测料调膘明细</text>
				</view>
				<view class="scan-icon" @click="scancode"><image class="icon" src="/static/assets/scan-icon.png" mode=""></image></view>
				<button type="primary" class="new-btn" @click="pageToNew">新增</button>
			</view>

			<!-- 数据表格 -->
			<view class="data__wrapper"><ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-"></ztable></view>

			<view class="submitData">
				<button type="primary" class="edit-btn">编辑</button>
				<button type="primary" class="submit-btn">提交</button>
			</view>
			<!-- 选页 -->
			<pageSider :pageNum="pageNum" :currentPage="pageInfo.page"></pageSider>
		</view>
	</view>
</template>

<script>
import uniCell from '@/components/uni-cell/uni-cell.vue';
// 引入 加载更多
import uniLoadMore from '@/components/uni-load-more.vue';
// 引入 图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
// 引入 弹窗
import popupLayer from '@/components/popup/popup-layer.vue';
// 引入 抽屉单元格
import drawCell from '@/components/uni-cell/draw-cell.vue';
// 引入 下拉框
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
// 引入 表格
import ztable from '@/components/z-table/z-table.vue';
// 引入 选页
import pageSider from '@/components/pageSider.vue';
// 引入 时间转换
import { timeFormat } from '@/utils/dateUtils.js';
export default {
	components: {
		uniCell,
		uniLoadMore,
		uniIcon,
		popupLayer,
		drawCell,
		mpvuePicker,
		ztable,
		pageSider
	},
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
					index: '01',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
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
					title: '序号',
					key: 'index',
					width: '100'
				},
				{
					title: '调整批次日龄',
					key: 'plan',
					width: '200'
				},
				{
					title: '原批次日龄',
					key: 'vaccineName',
					width: '200'
				},
				{
					title: '调整原因',
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
		},
		onNavigationBarButtonTap() {
			// 跳转至历史记录
			uni.navigateTo({
				url: `/pages/freed/fatMeasurement/measurementHistory`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		pageToNew() {
			uni.navigateTo({
				url: `/pages/freed/fatMeasurement/measurementNew`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
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
.content-container {
	background-color: #f5f5f5;
	padding: 0 30rpx 120rpx;
	.editor-title {
		height: 90rpx;
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

		.scan-icon {
			margin-top: 8rpx;
			margin-left: 30rpx;
		}

		.new-btn {
			margin-right: 0;
			line-height: 60rpx;
			width: 150rpx;

			font-size: 28rpx;
			background-color: #4684ea;
			color: #ffffff;
		}
	}
	//表单样式
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
	.submits {
		position: fixed;
		bottom: 0rpx;
		left: 0;
		width: 100%;
		.flexc {
			width: 50%;
			height: 86rpx;
			&.reset-btn {
				background-color: #ffffff;
				border-top: 2px solid #f5f5f5;
			}
			&.submit-btn {
				border-top: 2px solid #4684ea;
				background-color: #4684ea;
				color: #ffffff;
			}
		}
	}
	.submitData {
		display: flex;
		margin-top: 32rpx;
		.edit-btn {
			width: 316rpx;
			background-color: #f05e57;
			color: #ffffff;
		}
		.submit-btn {
			width: 316rpx;
			background-color: #4684ea;
			color: #ffffff;
		}
	}
}
</style>
