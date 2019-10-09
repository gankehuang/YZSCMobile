<template>
	<view class="semen-editor">
		<!-- 基本信息 -->
		<view class="editor-title flex ali-c">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>基本信息</text>
			</view>
		</view>
		<view class="card-form card">
			<view class="jus-j form-list" @tap="selectDate">
				<view class="field">
					领用日期
					<text>*</text>
				</view>
				<view class="s-value">
					{{form.pickerText}}
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					是否外购
					<text>*</text>
				</view>
				<view class="s-value">
					<label class="radio"><checkbox value="form.isOut" /></label>
				</view>
			</view>
			<view class="jus-j form-list" @tap="pigClub">
				<view class="field">
					公猪站/供应商
					<text>*</text>
				</view>
				<view class="s-value">
					{{form.pigpub}}
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			</view>
			<view class="jus-j form-list" @tap="pigClub">
				<view class="field">
					领用分场
				</view>
				<view class="s-value">
					{{form.pigpub}}
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			</view>
		</view>
		<!-- 领用明细 -->
		<view class="editor-title jus-j form-seat">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>领用明细</text>
			</view>
		</view>
		<view class="card-form card">
			<view class="jus-j form-list">
				<view class="field">
					领用份数
				</view>
				<view class="s-value d-num">
					<input type="number" v-model="form.dNum" placeholder="请输入"/>
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					领用单价
				</view>
				<view class="s-value d-num">
					<input type="digit" v-model="form.price" placeholder="请输入"/>
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					领用金额
				</view>
				<view class="s-value d-num">
					<input type="digit" v-model="form.totalPrice" placeholder="请输入"/>
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					备注
				</view>
				<view class="s-value d-num">
					<input type="digit" v-model="form.other" placeholder="请输入"/>
				</view>
			</view>
		</view>
		<view class="submits jus-b">
			<button type="primary" class="flexc editor-btn">编辑</button>
			<button type="primary" class="flexc submit-btn" @tap="toHistory">提交</button>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel" 
		 ></mpvue-picker>
		 <mpvue-picker :themeColor="themeColor" ref="pigPicker" 
		 :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		  @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
		  <popup-layer ref="popupScreen" :direction="'left'">
		     <view class="screening">
		     	<view class="title">
		     		单据编号
		     	</view>
				<view class="s-input">
					<input type="text" v-model="formScreen.dnumber" placeholder="请输入内容"/>
				</view>
				<view class="title">
					申请日期
				</view>
				<view class="jus-b date">
					<view class="jus-j start-date date-wrap">
						<input type="text" v-model="formScreen.startDate" disabled="disabled"/>
						<image src="/static/assets/date-icon.png" mode=""></image>
					</view>
					<text class="line">—</text>
					<view class="jus-j end-date date-wrap">
						<input type="text" v-model="formScreen.endDate" disabled="disabled"/>
						<image src="/static/assets/date-icon.png" mode=""></image>
					</view>
				</view>
				<view class="title">
					精液使用时间
				</view>
				<view class="s-input jus-j" @tap="useTime">
					<input type="text" v-model="formScreen.useTime" placeholder="请选择" disabled/>
					<image src="/static/assets/arrow-down-gray.png" mode=""></image>
				</view>
				<view class="title">
					分场
				</view>
				<view class="s-input jus-j" @tap="screenPigClub">
					<input type="text" v-model="formScreen.pigClub" placeholder="请选择" disabled/>
					<image src="/static/assets/arrow-down-gray.png" mode=""></image>
				</view>
				<view class="title">
					耳牌
				</view>
				<view class="s-input jus-j">
					<input type="text" v-model="formScreen.dnumber" placeholder="请选择" disabled/>
					<image src="/static/assets/arrow-down-gray.png" mode=""></image>
				</view>
				<view class="title">
					单据状态
				</view>
				<view class="s-input jus-j">
					<input type="text" v-model="formScreen.dnumber" placeholder="请选择" disabled/>
					<image src="/static/assets/arrow-down-gray.png" mode=""></image>
				</view>
				
				<view class="flex s-btn">
					<view class="s-reset btn flexc">
						重置
					</view>
					<view class="s-submit btn flexc">
						提交
					</view>
				</view>
				<!-- 使用时间弹框 -->
				<mpvue-picker :themeColor="themeColor" ref="useTimePicker"
				:deepLength="1" :pickerValueDefault="pickerValueDefault"
				 @onConfirm="onConfirmTime" :pickerValueArray="useTimeArray"></mpvue-picker>
				 <!-- 分场弹框 -->
				 <mpvue-picker :themeColor="themeColor" ref="sPicker"
				 :deepLength="1" :pickerValueDefault="pickerValueDefault"
				  @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
		     </view>
		  </popup-layer>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
	export default {
		data() {
			return {
				form: {
					pickerText:'请选择',
					pigpub:'请选择',
				},
				formScreen:{
					startDate:'2019-6-14',
					endDate:'2019-07-18',
					useTime:'',
					pigClub:''
				},
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
				useTimeArray:[
					{'value':'shangwu','label':'上午'},
					{'value':'xiawu','label':'下午'},
				],
			}
				
		},
		components: {
			mpvuePicker,
			uniIcon,
			popupLayer
		},
		methods: {
			// 选择日期
			selectDate() {
				this.$refs.mpvuePicker.show()
			},
			//确认日期
			onConfirmDate(e) {
				this.form.pickerText = e.label;
			},
			// 选择分场
			pigClub() {
				this.$refs.pigPicker.show()
			},
			//确认分场
			onConfirmPig(e) {
				this.form.pigpub = e.label;
			},
			//关联申请
			toSemen() {
				uni.navigateTo({
					url:'/pages/receive/semen/semen'
				})
			},
			//历史记录
			toHistory() {
				uni.navigateTo({
					url:'/pages/receive/semen/semenHistory'
				})
			},
			// 精液使用时间弹出框
			useTime() {
				this.$refs.useTimePicker.show()
			},
			onConfirmTime(e) {
				this.formScreen.useTime = e.label;
			},
			// 筛选选择分场
			screenPigClub() {
				this.$refs.sPicker.show()
			},
			onConfirmPig(e) {
				this.formScreen.pigClub = e.label;
			}
		},
		//点击头部
		onNavigationBarButtonTap(e){
			this.$refs.popupScreen.show();
		}
	}
</script>

<style lang="scss">
	.semen-editor {
		background-color: #F5F5F5;
		padding: 0 30upx;
		.editor-title {
			height: 80upx;
			.img {
				line-height: 80upx;
				image {
					width: 12upx;
					height: 12upx;
					vertical-align:middle;
				}
			}
			text {
				margin-left: 14upx;
				line-height: 80upx;
				font-size: 32upx;
			}
			.confirm-btn {
				width: 140upx;
				height: 54upx;
				button {
					width: 140upx;
					height: 54upx;
					font-size: 24upx;
					padding: 0;
					background-color: #4684EA;
				}
			}
			&.form-seat {
				height: 120upx;
			}
		}
		.card-form {
			height: 384upx;
			.form-list {
				height: 96upx;
				border-bottom: 1upx solid #EBEEF2;
				font-size: 28upx;
				.field {
					text {
						color: #FF6354;
						margin-left: 10upx;
					}
				}
				.s-value {
					color: #B2B2B2;
					vertical-align:middle;
					&.d-num {
						text-align: right;
					}
				}
				
			}
		}
		.submits {
			margin-top: 90upx;
			button {
				width:316upx;
				height:88upx;
				&.editor-btn {
					background-color: #FFFFFF;
					color: #4684EA;
				}
				&.submit-btn {
					background-color: #4684EA;
				}
			}
		}
	}
	.screening {
		width: 520upx;
		height: 100%;
		background-color: #FFFFFF;
		padding: 20upx 40upx;
		.title {
			margin-top: 40upx;
			color: #4D4D4D;
			font-weight: 600;
		}
		.s-input{
			height: 68upx;
			background-color: #f6f6f6;
			margin-top: 10upx;
			padding: 0 20upx;
			input{
				height: 100%;
				font-size: 24upx;
			}
			image {
				width: 26upx;
				height: 14upx;
			}
		}
		.date {
			height: 68upx;
			margin-top: 10upx;
			.line {
				color: #757575;
			}
			.date-wrap {
				background-color: #f6f6f6;
				width: 192upx;
				padding: 0 18upx;
				image {
					width: 40upx;
					height: 40upx;
				}
				input{
					height: 100%;
					font-size: 24upx;
				}
			}
		}
		.s-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 600upx;;
			height: 88upx;
			overflow: hidden;
			border-top: 2upx solid #F5F5F5;
			.btn {
				width: 50%;
				font-size: 32upx;
				font-weight: 600;
				&.s-submit {
					background-color: #4684EA;
					color: #fff;
				}
				&.s-reset {
					background-color: #fff;
					
				}
			}
		}
	}
	// .uni-checkbox .uni-checkbox-input {
	// 	border-radius: 50% !important;
	// }
</style>
