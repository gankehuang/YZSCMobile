<template>
	<view>
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @tap="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					精液领用编辑
				</view>
				<view class="status-del" data-key="操作记录" @tap="edit">
					编辑
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 标题 -->
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text">基本明细</view>
						</view>
						<view class="main-wrap-contetnt-item-field" style="padding-top: 20rpx;">
							<view class="main-wrap-contetnt-item-field-name">
								领用日期
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectDate">
								<text></text>
								<image src="../../../static/assets/calendar.png" style="width: 40rpx;height: 40rpx;margin-right: 15rpx;"></image>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field" style="padding-top: 20rpx;">
							<view class="main-wrap-contetnt-item-field-name">
								是否外购<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<checkbox value="" checked="true" :disabled="flag"/>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								公猪站/供应商<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" :disabled="flag"/>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								领用分厂<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" :disabled="flag" />
							</view>
						</view>
						
					</view>
				</view>

			</view>
		</view>
		
		<view class="main">
			<view class="main-wrap" style="padding-top: 0;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text">领用明细</view>
						</view>
						<view class="main-wrap-contetnt-item-field" style="padding-top: 20rpx;">
							<view class="main-wrap-contetnt-item-field-name">
								领用份数<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请填写" :disabled="flag" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								领用单价<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请填写" :disabled="flag" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								领用金额<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请填写" :disabled="flag" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								备注<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请填写" :disabled="flag" />
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		
		<view class="submits jus-b">
			<button type="primary" v-if="flag" class="flexc submit-btn">反审核</button>
			<button type="primary" v-if="!flag" class="flexc" @tap="clickEdit">提交</button>
		</view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"
		 ></mpvue-picker>
	</view>

</template>

<script>
	import ztable from '@/components/z-table/z-table'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				themeColor: '#007AFF',
				// searchForm:{
				// 	businessStartTime:timeFormat(new Date(),'yyyy-MM-dd'),
				// },
				flag: true,    //控制是否可编辑状态
				index: 0,
				date: currentDate,
				neddCheck:false,
				submitStatus:true,
				editStatus:false,
				
				array: ['请选择配种时段', '1', '2', '3'],
				array1: ['请选择', '张三', '李四', '王五'],
				
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		components: {
			ztable,
			mpvuePicker,
			uniIcon
		},
		methods: {
			edit: function() {   //点击编辑
				this.flag = false;
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			selectDate: function(){
				if(this.flag){
					return;
				}
				this.$refs.mpvuePicker.show()
			},
			//选择时间确定
			onConfirmDate: function(e) {
				console.log(e);
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},clickEdit() {
				this.neddCheck = true;
				this.editStatus=true;
				this.submitStatus=false;
			},clickCancel(){
				this.neddCheck = false;
				this.editStatus=false;
				this.submitStatus=true;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

	.status-header {
		padding-top: 26rpx;

		.status-title {
			padding-left: 35%;
		}
	}

	.main {
		.main-wrap {
			padding: 160rpx 23rpx 23rpx 23rpx;
		}
	}

	.list-table {
		margin-top: -120px;
	}
</style>
