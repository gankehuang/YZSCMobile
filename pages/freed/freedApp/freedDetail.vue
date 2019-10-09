<template>
	<view class="health-container">
		<view class="editor-title flex ali-c">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>基本信息</text>
			</view>
		</view>
		<view class="card-form card">
			<uni-cell title="批次档案" :value="form.name"></uni-cell>
			<uni-cell title="配种批次" :value="form.projectName"></uni-cell>
			<uni-cell title="业务日期" :value="form.projectName"></uni-cell>
			<uni-cell title="饲料名称" :value="form.projectName"></uni-cell>
		</view>
		<view class="editor-title flex ali-c">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>饲喂明细</text>
			</view>
		</view>
		<view class="card-form card">
			<uni-cell title="批次档案" :value="form.name"></uni-cell>
			<uni-cell title="配种批次" :value="form.projectName"></uni-cell>
			<uni-cell title="业务日期" :value="form.projectName"></uni-cell>
			<uni-cell title="栋舍" :value="form.projectName"></uni-cell>
			<uni-cell title="饲料名称" :value="form.projectName"></uni-cell>
			<uni-cell title="实际日均饲喂量" :value="form.projectName"></uni-cell>
			<uni-cell title="当日存栏" :value="form.projectName"></uni-cell>
			<uni-cell title="状态" :value="form.projectName"></uni-cell>
			<uni-cell title="饲养员" :value="form.projectName"></uni-cell>
		</view>
		<view class="submitData jus-b">
			<button type="primary" class="flexc cancel-btn">编辑</button>
			<button type="primary" class="flexc submit-btn" >提交</button>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniCell from '@/components/uni-cell/uni-cell.vue'
	// 引入弹框组件
	export default {
		data() {
			return {
				form: {
					name:'一分场',
					projectName:'自动带出',
				},
				getNumber:'',
				dayNumber:'',
				tableData: [{
						name:'哺乳仔猪',
						plan: '哺乳仔猪',
						vaccineName:'20190902-01 ',
						computerStart:'2019-01-05',
						performMan: '张三',
						status: '201'
					},
					{
						name:'哺乳仔猪',
						plan: '哺乳仔猪',
						vaccineName: '20190902-01 ',
						computerStart:'2019-01-05',
						performMan: '张三',
						status: '大白'
					},{
						name:'哺乳仔猪',
						plan: '哺乳仔猪',
						vaccineName: '20190902-01 ',
						computerStart:'2019-01-05',
						performMan: '张三',
						status: '大白'
					}],
					columns: [{
						title: "序号",
						key: "name",
						width:'100'
					},{
						title: "调整批次日龄",
						key: "plan",
						width:'200'
					},{
						title: "原批次日龄",
						key: "vaccineName",
						width:'200'
					},{
						title: "计划开始日期",
						key: "computerStart",
						width:'200'
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
		},
		methods: {
			
			
		},
	}
</script>

<style lang="scss">
	
	.health-container{
		background-color: #F5F5F5;
		padding: 0 30rpx 120rpx;
		.editor-title {
			height: 44rpx;
			.img {
				line-height: 44rpx;
				image {
					width: 12rpx;
					height: 12rpx;
					vertical-align:middle;
				}
			}
			text {
				margin-left: 14rpx;
				line-height: 44rpx;
				font-size: 32rpx;
			}
			
		}
		.card-form{
			margin-top: 0rpx;
			.input-style {
				color: #B2B2B2;
				text-align: right;
			}
			.input-style .uni-input-wrapper .uni-input-placeholder{
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
			.submitData{
				margin-top:32rpx;
				.cancel-btn {
					width: 316rpx;
					background-color: #F05E57;
					color: #FFFFFF;
				}
				.submit-btn {
					width: 316rpx;
					background-color: #4684EA;
					color: #FFFFFF;
				}
			}
		.submits {
			margin-top: 56rpx;
			margin-bottom:10rpx;
			button {
				width:520rpx;
				height:88rpx;
				&.editor-btn {
					background-color: #F05E57;
				}
				&.submit-btn {
					background-color: #4684EA;
				}
			}
		}
	}
	// .uni-checkbox .uni-checkbox-input {
	// 	border-radius: 50% !important;
	// }
</style>