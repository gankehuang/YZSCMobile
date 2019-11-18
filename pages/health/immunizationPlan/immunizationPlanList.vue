<template>
	<!-- 免疫计划执行 -->
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon flexc ali-c"  @tap="back">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					免疫计划执行
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
					<image src="../../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
				</text>
			</view>
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
			</view>
			<view class="submitData jus-b">
				<button type="primary" class="flexc cancel-btn">取消计划</button>
				<button type="primary" class="flexc submit-btn" @click="putoffPlan">推迟计划</button>
			</view>
			<!-- <uni-drawer :visible="showDrawer" mode="right" @close='closeDrawer'>
			    <view style="padding:30rpx;">
			        <view class="uni-title">{{name}}</view>
			    </view>
			</uni-drawer> -->
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
				  <draw-cell title="免疫方式" required="true">
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
				  <draw-cell title="配种批次" required="true">
				  				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
				  					<text>{{searchForm.vaccineName}}</text>
				  					<uni-icon type="arrowdown" color="#333333" size="18" />
				  				</view>
				  </draw-cell>
				  <draw-cell title="执行人" required="true">
				  				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
				  					<text>{{searchForm.vaccineName}}</text>
				  					<uni-icon type="arrowdown" color="#333333" size="18" />
				  				</view>
				  </draw-cell>
				  <draw-cell title="批次号" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				  </draw-cell>
				<draw-cell title="猪场" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				</draw-cell>
				<draw-cell title="分场" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				</draw-cell>
				<draw-cell title="疫苗名称" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
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
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入下拉框
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
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
				tableData: [{
						name:'010412',
						plan: '大塘猪场',
						vaccineName:'一分场-G02',
						computerStart:'175日龄伪狂犬',
						performMan: '张三',
						status: '201'
					},
					{
						name:'010412',
						plan: '大塘猪场',
						vaccineName: '一分场-G02',
						computerStart:'175日龄伪狂犬',
						performMan: '张三',
						status: '大白'
					},{
						name:'010412',
						plan: '大塘猪场',
						vaccineName: '一分场-G02',
						computerStart:'175日龄伪狂犬',
						performMan: '张三',
						status: '大白'
					}],
					columns: [{
						title: "批次号",
						key: "name",
						width:'100'
					},{
						title: "分场",
						key: "plan",
						width:'200'
					},{
						title: "配种批次",
						key: "vaccineName",
						width:'200'
					},{
						title: "计算起点",
						key: "computerStart",
						width:'200'
					},{
						title: "免疫项目",
						key: "performMan",
						width:'200',
					},{
						title: "免疫方式",
						key: "performMan",
						width:'120',
					},{
						title: "疫苗名称",
						key: "performMan",
						width:'200',
					},{
						title: "剂量",
						key: "performMan",
						width:'200'
					},{
						title: "单位",
						key: "performMan",
						width:'200'
					},{
						title: "头数",
						key: "performMan",
						width:'200'
					},{
						title: "计划开始时间",
						key: "performMan",
						width:'200',
					},{
						title: "计划结束时间",
						key: "performMan",
						width:'200',
					},{
						title: "执行人",
						key: "performMan",
						width:'200'
					},{
						title: "执行状态",
						key: "status",
						width:'120'
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
			uniIcon
		},
		methods: {
			rowTapHandler (row) {
				uni.navigateTo({
					url: `/pages/health/immunizationPlan/immunizationPlanDetail?id=${row.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			putoffPlan(){
				uni.navigateTo({
					url: `/pages/health/immunizationPlan/immunizationPlanPutoff`,
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
			sayHellow(){
				console.log(0)
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
		width: 16rpx;
		height: 16rpx;
	}
	.main-container{
		padding-top: 130rpx;
		// padding-left: 20rpx;
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
	
	.data__wrapper {
		padding: 0 20rpx
	}
	
</style>
