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
			<view class="jus-j form-list" @tap="pigClub">
				<view class="field">
					仓库
					<text>*</text>
				</view>
				<view class="s-value">
					{{form.pigpub}}
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					领用分场
				</view>
				<view class="s-value">
					{{form.branch}}
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					组别
				</view>
				<view class="s-value">
					{{form.classPig}}
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
				<view class="s-value">
					药品
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					领用数量
				</view>
				<view class="s-value">
					2
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					计量单位
				</view>
				<view class="s-value">
					条
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					规格
				</view>
				<view class="s-value">
					20条/箱
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
			<button type="primary" class="flexc submit-btn" >提交</button>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel" 
		 ></mpvue-picker>
		 <mpvue-picker :themeColor="themeColor" ref="pigPicker" 
		 :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		  @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
		  
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
					branch:'一分厂',
					classPig:'保育'
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
					input {
						font-size: 28upx;
					}
				}
				
			}
		}
		.submits {
			margin: 90upx 0;
			button {
				width:316upx;
				height:88upx;
				&.editor-btn {
					background-color: #ffffff;
					color: #4684EA;
				}
				&.submit-btn {
					background-color: #4684EA;
				}
			}
		}
	}
	
</style>
