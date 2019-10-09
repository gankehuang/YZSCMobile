<template>
	<view class="health-container">
		<view class="card-form card"  style="margin-top: 26rpx;">
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../../static/assets/rect.png" mode=""></image>
					<text>基本信息</text>
				</view>
			</view>
			<uni-cell title="组别" :value="form.name"></uni-cell>
			<uni-cell title="配种批次" :value="form.projectName"></uni-cell>
			<uni-cell title="保健对象" :value="form.projectName"></uni-cell>
			<uni-cell title="保健药物名称" :value="form.projectName"></uni-cell>
			<uni-cell title="剂量" :value="form.projectName"></uni-cell>
			<uni-cell title="头数" :value="form.projectName"></uni-cell>
			<uni-cell title="投药方式" :value="form.projectName"></uni-cell>
			<uni-cell title="操作人" :value="form.projectName"></uni-cell>
			<uni-cell title="实际日期" :value="form.projectName" class="noBorder"></uni-cell>
		</view>
		<view class="card-form card circle-mark"  style="padding-bottom: 76rpx;padding-top: 48rpx;">
			<view class="editor-title flex ali-c jus-j" >
				<view class="img">
					<image src="../../../static/assets/rect.png" mode=""></image>
					<text>照片信息</text>
				</view>
			</view>
			<view class="takePhotoList">
				<view class="takephotoItem">
					<image class="img" src="../../../static/assets/plus.png" mode=""></image>
				</view>
				<view class="takephotoItem">
					<image class="img" src="../../../static/assets/plus.png" mode=""></image>
				</view>
				<view class="takephotoItem">
					<image class="img" src="../../../static/assets/plus.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="card-form card circle-mark">
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>领料关联</text>
				</view>
			</view>
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns"  emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
			</view>
		</view>
		<view class="submits jus-b">
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
						plan: '14日龄蓝耳',
						vaccineName:'50ml',
						computerStart:'瓶',
						performMan: '张三',
						status: '201'
					},
					{
						name:'哺乳仔猪',
						plan: '14日龄蓝耳',
						vaccineName: '50ml',
						computerStart:'瓶',
						performMan: '张三',
						status: '大白'
					},{
						name:'哺乳仔猪',
						plan: '14日龄蓝耳',
						vaccineName: '50ml',
						computerStart:'瓶',
						performMan: '张三',
						status: '大白'
					}],
					columns: [{
						title: "单据编号",
						key: "name",
						width:'200'
					},{
						title: "疫苗",
						key: "plan",
						width:'200'
					},{
						title: "规格",
						key: "vaccineName",
						width:'200'
					},{
						title: "单位",
						key: "computerStart",
						width:'100',
					},{
						title: "数量",
						key: "computerStart",
						width:'100'
					}]
			}
				
		},
		components: {
			mpvuePicker,
			uniIcon,
			uniCell,
			ztable,
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
			filterData(e){
				console.log(e)
			}
			
		},
	}
</script>

<style lang="scss">
	
	.health-container{
		background-color: #F5F5F5;
		padding: 0 30rpx 120rpx;
		.editor-title {
			height: 50rpx;
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
		.noBorder{
			border-bottom: none;
			padding-bottom: 44rpx;
		}
		.circle-mark{
			border-top: 1px dashed #EFEFEF;
			position:relative;
			.takephotoItem{
				box-shadow:0px 0px 16px rgba(0,0,0,0.08);
			}
			&:before{
				content: "";
				position: absolute;
				width: 32rpx;
				height: 32rpx;
				background: #F5F5F5;
				border-radius: 50%;
				left: -16rpx;
				top: -16rpx;
			}
			&:after{
				content: "";
				position: absolute;
				width: 32rpx;
				height: 32rpx;
				background: #F5F5F5;
				border-radius: 50%;
				right: -16rpx;
				top: -16rpx;
			}
		}
		.takePhotoList{
			display:flex;
			align-items:center;
			justify-content:space-between;
			.takephotoItem{
				background: white;
				border-radius: 22rpx;
				height:216rpx;
				width:216rpx;
				margin-right:24rpx;
				display:flex;
				justify-content:center;
				align-items:center;
				.img {
					width: 53rpx;
					height: 53rpx;
					vertical-align:middle;
				};
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
</style>
