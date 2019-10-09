<template>
	<view class="health-container">
		<view class="editor-title flex ali-c">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>基本信息</text>
			</view>
		</view>
		<view class="card-form card">
			<uni-cell title="任务日期" :value="form.projectName"></uni-cell>
			<uni-cell title="栋舍" :value="form.projectName"></uni-cell>
			<uni-cell title="组别" :value="form.projectName"></uni-cell>
			<uni-cell title="实际日均饲喂量" :value="form.projectName"></uni-cell>
			<uni-cell title="当日存栏" :value="form.projectName"></uni-cell>
			<uni-cell title="饲料名称" :value="form.projectName"></uni-cell>
			<uni-cell title="饲养员" :value="form.projectName"></uni-cell>
		</view>
		<view class="editor-title flex ali-c">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>饲喂明细</text>
			</view>
		</view>
		<view class="data__wrapper">
			<ztable :tableData="tableData" :columns="columns" :neddCheck="true"  emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
		</view>
		<view class="submitData jus-b">
			<button type="primary" class="flexc cancel-btn">编辑</button>
			<button type="primary" class="flexc submit-btn" >提交</button>
		</view>
		
		<popup-layer ref="popupRef1" :direction="'left'" >
		   <scroll-view class="draw" scroll-y="true">
		       <draw-cell title="业务日期" required="true">
				   <view slot="value" class="jus-j">
						<view class="bg-gray jus-j" @click="selectDate" >
							<text>{{searchForm.businessStartTime}}</text>
							<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						</view>
					   <text>—</text>
					   <view class="bg-gray jus-j" @click="selectDate">
						   <text>{{searchForm.businessEndTime}}</text>
						   <image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
					   </view>
				   </view>
			   </draw-cell>
			  <draw-cell title="猪场" required="true">
				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
					<text>{{searchForm.immunePlan}}</text>
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			  </draw-cell>
			  <draw-cell title="分场" required="true">
				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
					<text>{{searchForm.immuneProject}}</text>
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			  </draw-cell>
			  <draw-cell title="配种批次" required="true">
			  				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
			  					<text>{{searchForm.vaccineName}}</text>
			  					<uni-icon type="arrowdown" color="#333333" size="18" />
			  				</view>
			  </draw-cell>
			  <draw-cell title="批次档案" required="true">
			  				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
			  					<text>{{searchForm.vaccineName}}</text>
			  					<uni-icon type="arrowdown" color="#333333" size="18" />
			  				</view>
			  </draw-cell>
			  <draw-cell title="饲料名称" required="true">
			  				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
			  					<text>{{searchForm.vaccineName}}</text>
			  					<uni-icon type="arrowdown" color="#333333" size="18" />
			  				</view>
			  </draw-cell>
		   </scroll-view>
		   <view class="submits jus-b">
			   <view class="flexc reset-btn">重置</view>
			   <view class="flexc submit-btn">确定</view>
		   </view>
		</popup-layer>
		<mpvue-picker  :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"
		 ></mpvue-picker>
		 <mpvue-picker :themeColor="themeColor" ref="pigPicker" 
		 :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		  @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
		
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
	//引入时间转换
	import {timeFormat} from '@/utils/dateUtils.js'
	export default {
		data() {
			return {
				showDrawer:false,
				deepLength:1,
				pickerValueDefault: [0],
				themeColor: '#007AFF',
				pickerValueArray:[
					{'value':'1111','label':'三泉A区'},
					{'value':'1111','label':'三泉B区'},
					{'value':'1111','label':'三泉C区'},
					{'value':'1111','label':'三泉D区'},
					{'value':'1111','label':'三泉E区'}
				],
				searchForm:{
					batchRecord:'请选择',
					businessStartTime:timeFormat(new Date(),'yyyy-MM-dd'),
					businessEndTime:timeFormat(new Date(),'yyyy-MM-dd'),
					immunePlan:'请选择',
					immuneProject:'请选择',
					vaccineName:'请选择',
					recipientStartTime:timeFormat(new Date(),'yyyy-MM-dd'),
					recipientEndTime:timeFormat(new Date(),'yyyy-MM-dd'),
					recyclingNum:'清选择',
					performMan:'请选择'
				},
				form: {
					name:'一分场',
					projectName:'自动带出',
				},
				getNumber:'',
				dayNumber:'',
				tableData: [{
						index:'01',
						plan: '哺乳仔猪',
						vaccineName:'20190902-01 ',
						computerStart:'2019-01-05',
						performMan: '张三'
					},
					{
						index:'02',
						plan: '哺乳仔猪',
						vaccineName: '20190902-01 ',
						computerStart:'2019-01-05',
						performMan: '张三'
					},{
						index:'03',
						plan: '哺乳仔猪',
						vaccineName: '20190902-01 ',
						computerStart:'2019-01-05',
						performMan: '张三'
					}],
					columns: [{
						title: "序号",
						key: "index",
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
						title: "调整原因",
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
			drawCell,
			popupLayer
		},
		computed: {
			pageNum () {
				return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
			}
		},
		methods: {
			checkbox(e) {
				console.log(e.detail.value)//id
			},
			rowTapHandler (row) {
				uni.navigateTo({
					url: `/pages/freed/freedApp/freedDetail`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			//选页
			selectPage() {
				this.$refs.popupRef.show();
			},
			selectPages(e) {
				console.log(e)
			},
			onNavigationBarButtonTap(){
				this.$refs.popupRef1.show();
				this.showDrawer=true
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
	//抽屉样式
		.draw{
			padding:30rpx;
			width: 500rpx;
			height:calc(100% - 118rpx);
			.bg-gray{
				background: #f5f5f5;
				padding:16rpx 20rpx;
				font-size:12px;
				color: #4d4d4d;
			}
		}
		.submits {
			position:fixed;
			bottom:0rpx;
			left:0;
			width:100%;
			.flexc {
				width:50%;
				height:86rpx;
				&.reset-btn {
					background-color: #FFFFFF;
					border-top:2px solid #F5F5F5;
				}
				&.submit-btn {
					border-top:2px solid #4684EA;
					background-color: #4684EA;
					color: #FFFFFF;
				}
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