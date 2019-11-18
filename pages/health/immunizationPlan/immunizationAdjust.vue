<template>
	<!-- 免疫调整 -->
	<view class="health-container">
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon flexc ali-c" @tap="back"><image class="icon" src="/static/assets/back.png"></image></view>
				<view class="status-title">免疫计划调整</view>
				<view class="more-icon flexc ali-c" @tap="showFilter"><image class="icon" src="/static/assets/more@2x.png"></image></view>
			</view>
		</view>
		<view class="main-container">
			<!-- 标题 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>基本信息</text>
				</view>
			</view>
			<!-- 表单 -->
			<view class="card-form card">
				<uni-cell title="猪场" :value="form.name"></uni-cell>
				<uni-cell title="分场" :value="form.projectName"></uni-cell>
				<uni-cell title="业务日期" :value="form.projectName"></uni-cell>
				<uni-cell title="免疫类型" :value="form.projectName"></uni-cell>
				<uni-cell title="调整类型" :value="form.projectName"></uni-cell>
				<uni-cell title="调整原因" required="true">
					<view slot="value" class="input-style"><input v-model="getNumber" placeholder="请输入原因" /></view>
				</uni-cell>
				<uni-cell title="推迟天数">
					<view slot="value" class="input-style"><input v-model="dayNumber" placeholder="请输入天数" /></view>
				</uni-cell>
			</view>
			<!-- 标题 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>调整明细</text>
				</view>
				<button type="primary" class="filter-btn" @click="pageToNew">过滤</button>
			</view>
			<!-- 数据表格 -->
			<view class="data__wrapper"><ztable :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable></view>
			<!-- 按钮 -->
			<view class="submits jus-b"><button type="primary" class="flexc submit-btn">提交</button></view>
			
			<popup-layer ref="popupRef" :direction="'right'"><list-page @selectPages="selectPages"></list-page></popup-layer>
		</view>
	</view>
</template>

<script>
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import uniCell from '@/components/uni-cell/uni-cell.vue';
import ztable from '@/components/z-table/z-table.vue';
// 引入弹框组件
import popupLayer from '@/components/popup/popup-layer.vue';
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
					plan: '哺乳仔猪',
					vaccineName: '20190902-01 ',
					computerStart: '2019-01-05',
					performMan: '张三',
					status: '201'
				},
				{
					name: '哺乳仔猪',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01 ',
					computerStart: '2019-01-05',
					performMan: '张三',
					status: '大白'
				},
				{
					name: '哺乳仔猪',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01 ',
					computerStart: '2019-01-05',
					performMan: '张三',
					status: '大白'
				}
			],
			columns: [
				{
					title: '猪只类型',
					key: 'name',
					width: '200'
				},
				{
					title: '免疫项目',
					key: 'plan',
					width: '200'
				},
				{
					title: '批次号',
					key: 'vaccineName',
					width: '200'
				},
				{
					title: '计划开始日期',
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
	components: {
		mpvuePicker,
		uniIcon,
		uniCell,
		ztable,
		popupLayer
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
		back() {
			uni.navigateBack({});
		},
		showFilter() {
			this.$refs.popupRef1.show();
			this.showDrawer = true;
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';

.health-container {
	background-color: #f5f5f5;

	.status-header {
		padding-top: 26rpx;
	}
	.status-title{
		padding-left: 8%;
	}
	
	.main-container {
		padding: 130rpx 30rpx 120rpx;
	}
	.editor-title {
		height: 44rpx;
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
		.filter-btn {
			margin-right: 0;
			line-height: 60rpx;
			width: 150rpx;

			font-size: 28rpx;
			background-color: #4684ea;
			color: #ffffff;
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
// .uni-checkbox .uni-checkbox-input {
// 	border-radius: 50% !important;
// }
</style>
