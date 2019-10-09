<template>
	<view class="health-container">
		<view class="editor-title flex ali-c">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>基本信息</text>
			</view>
		</view>
		<view class="card-form card">
			<uni-cell title="配种批次" :value="form.name"></uni-cell>
			<uni-cell title="组别" :value="form.projectName"></uni-cell>
			<uni-cell title="分场" :value="form.projectName"></uni-cell>
			<uni-cell title="记录时间" :value="form.projectName"></uni-cell>
			<uni-cell title="记录日期" :value="form.projectName"></uni-cell>
		</view>
		<view class="editor-title flex ali-c jus-j form-seat">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>记录明细</text>
			</view>
			<view class="confirm-btn" @tap="filterData">
				<button type="primary" class="flexc">批量新增</button>
			</view>
		</view>
		<view class="data__wrapper">
			<ztable :tableData="tableData" :columns="columns" :neddCheck="true"  emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
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
	import ztable from '@/components/z-table/z-table'
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
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
						name:'01',
						plan: '生产母猪',
						vaccineName:'母猪产后消炎针 ',
						computerStart:'注射',
						performMan: '张三',
						status: '201'
					},
					{
						name:'02',
						plan: '生产母猪',
						vaccineName: '母猪产后消炎针 ',
						computerStart:'注射',
						performMan: '张三',
						status: '大白'
					},{
						name:'03',
						plan: '生产母猪',
						vaccineName: '母猪产后消炎针 ',
						computerStart:'注射',
						performMan: '张三',
						status: '大白'
					}],
					columns: [{
						title: "序号",
						key: "name",
						width:'100'
					},{
						title: "保健对象",
						key: "plan",
						width:'200'
					},{
						title: "保健药物名称及剂量",
						key: "vaccineName",
						width:'300'
					},{
						title: "投药方式",
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
			ztable,
			popupLayer
		},
		computed: {
			pageNum () {
				return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
			}
		},
		methods: {
			//选页
			selectPage() {
				this.$refs.popupRef.show();
			},
			selectPages(e) {
				console.log(e)
			},
			filterData(){
				
			}
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
	}
	// .uni-checkbox .uni-checkbox-input {
	// 	border-radius: 50% !important;
	// }
</style>
