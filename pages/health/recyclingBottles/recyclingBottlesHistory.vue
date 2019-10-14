<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon flexc ali-c"  @tap="back">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					空瓶回收明细
				</view>
				<view class="more-icon flexc ali-c" @tap="showFilter">
					<image class="icon" src="/static/assets/more@2x.png"></image>
				</view>
			</view>
			
		</view>
		<view class="main-container">
			
			<view class="flex page__info">
				<text>共2492条,50页</text>
				<text>
					每页50条
					<image src="../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
				</text>
			</view>
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
			</view>
			<!-- 选页 -->
			<pageSider :pageNum="pageNum" :currentPage="pageInfo.page"></pageSider>
			
			<popup-layer ref="popupRef1" :direction="'left'" >
			   <scroll-view class="draw" scroll-y="true">
				   <draw-cell title="批次档案" required="true">
						<view slot="value" class="bg-gray jus-j" @click="selectPeople">
							<text>{{searchForm.batchRecord}}</text>
							<uni-icon type="arrowdown" color="#333333" size="18" />
						</view>
				   </draw-cell>
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
				  <draw-cell title="免疫计划" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.immunePlan}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				  </draw-cell>
				  <draw-cell title="免疫项目" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.immuneProject}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				  </draw-cell>
				  <draw-cell title="疫苗名称" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				  </draw-cell>
				  <draw-cell title="领用日期" required="true" >
					   <view slot="value" class="jus-j">
							<view class="bg-gray jus-j" @click="selectDate">
								<text>{{searchForm.recipientStartTime}}</text>
								<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
							</view>
						   <text>—</text>
						   <view class="bg-gray jus-j" @click="selectDate">
							   <text>{{searchForm.recipientEndTime}}</text>
							   <image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
						   </view>
					   </view>
				  </draw-cell>
				  </draw-cell>
				  <draw-cell title="空瓶回收批号" >
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.recyclingNum}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				  </draw-cell>
				  <draw-cell title="执行人"  >
						<view slot="value" class="bg-gray jus-j" @click="selectPeople">
							<text>{{searchForm.performMan}}</text>
							<uni-icon type="arrowdown" color="#333333" size="18" />
						</view>
				  </draw-cell>
				 <draw-cell title="状态"  >
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.performMan}}</text>
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
	</view>
	
</template>

<script>
	import ztable from '@/components/z-table/z-table'
	import popupLayer from '@/components/popup/popup-layer.vue';
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入下拉框
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	// 引入 选页
	import pageSider from '@/components/pageSider.vue';
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
					{'value':'1111','label':'三泉E区'},
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
				tableData: [{
						name:'一分场',
						plan: '配种后72天腹泻',
						vaccineName:'腹泻药',
						performMan: '张三',
						status: '201'
					},
					{
						name:'二分场',
						plan: '配种后72天腹泻',
						vaccineName: '腹泻药',
						performMan: '张三',
						status: '大白'
					},{
						name:'三分场',
						plan: '配种后72天腹泻',
						vaccineName: '腹泻药',
						performMan: '张三',
						status: '大白'
					}],
					columns: [{
						title: "分场",
						key: "name"
					},{
						title: "免疫计划",
						key: "plan",
						width:'200'
					},{
						title: "疫苗名称",
						key: "vaccineName"
					},{
						title: "执行人",
						key: "performMan",
						width:'100'
					},{
						title: "执行状态",
						key: "status"
					}],
					pageInfo: {
						page: 1,
						pageSize: 50,
						total: 2000,
					}
				}
				
		},
		components: {
			ztable,
			popupLayer,
			drawCell,
			mpvuePicker,
			uniIcon,
			pageSider
		},
		methods: {
			rowTapHandler (row) {
				uni.navigateTo({
					url: `/pages/health/recyclingBottles/recylingBottleEditor?id=${row.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			checkbox(e) {
				console.log(e.detail.value)//id
			},
			//选页
			selectPage() {
				this.$refs.popupRef.show();
			},
			selectPages(e) {
				console.log(e)
			},
			showFilter(){
				this.$refs.popupRef1.show();
				this.showDrawer=true
			},
			closeDrawer(){
				this.showDrawer=false
			},
			selectPeople(){
				this.$refs.pigPicker.show()
			},
			selectDate(){
				this.$refs.mpvuePicker.show()
			},
			back () {
				uni.navigateBack({
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
	 @import "../../../common/dataCollection.scss";
	 .status-header {
	 	padding-top: 26rpx;
	 }
	 .status-title{
		 padding-left: 8%;
	 }
	.semen-seach {
		height: 88rpx;
		background-color: #5089F9;
		.seach-input {
			width: 680rpx;
			height: 60rpx;
			font-size: 20rpx;
			padding-left: 16rpx;
			margin-left: 20rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
		}
	}
	.confirm-btn {
		width: 520rpx;
		margin: 22rpx auto;
	}
	.page__info{
		height: 60rpx;
		align-items: center;
		font-size: 24rpx;
		justify-content: space-between;
		margin: 10rpx 0 0;
		color: #7A7A7A;
		padding: 0 20rpx;
	}
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	.main-container{
		padding-top: 146rpx;
		// padding-left: 20rpx;
	}
	.data__wrapper {
		padding: 0 20rpx;
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
		bottom:-40rpx;
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
	
</style>
