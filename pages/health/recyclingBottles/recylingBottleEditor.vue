<template>
	<view class="semen-editor">
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon flexc ali-c"  @tap="back">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					空瓶回收编辑
				</view>
			</view>
		</view>
		<view class="main-container">
			<view class="card-form card">
				<uni-cell title="分场" :value="form.name"></uni-cell>
				<uni-cell title="免疫项目" :value="form.projectName"></uni-cell>
				<uni-cell title="免疫计划" :value="form.projectName"></uni-cell>
				<uni-cell title="疫苗名称" :value="form.projectName"></uni-cell>
				<uni-cell title="领用日期" :value="form.projectName"></uni-cell>
				<uni-cell title="领用数量"  required="true">
					<view slot="value"  class="input-style">
						<input type="number" v-model="getNumber"  placeholder="请输入数量" >
					</view>
				</uni-cell>
				<uni-cell title="领用单位" :value="form.projectName"></uni-cell>
				<uni-cell title="空瓶回收批号" :value="form.projectName"></uni-cell>
				<uni-cell title="空瓶回收数量" :value="form.projectName"></uni-cell>
				<uni-cell title="执行人" :value="form.projectName"></uni-cell>
				<uni-cell title="执行状态" class="card-cell-last" :value="form.projectName"></uni-cell>
			</view>
			<view class="submits jus-b">
				<button type="primary" class="flexc submit-btn" >提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniCell from '@/components/uni-cell/uni-cell.vue'
	export default {
		data() {
			return {
				form: {
					name:'一分场',
					projectName:'自动带出',
				},
				getNumber:0
			}
				
		},
		components: {
			mpvuePicker,
			uniIcon,
			uniCell
		},
		methods: {
			back () {
				uni.navigateBack({
				})
			}
			
		},
	}
</script>

<style lang="scss">
@import '@/common/dataCollection.scss';
	.semen-editor {
		background-color: #F5F5F5;
		
		.status-header {
			padding-top: 26rpx;
		}
		.main-container {
			padding: 130rpx 30rpx 120rpx;
		}
		
		.card-form{
			margin-top: 20rpx;
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
	
		.submits {
			margin-top: 70rpx;
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
