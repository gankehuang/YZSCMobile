<template>
	<view>
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					妊检记录新增
				</view>
				<!-- @tap="togglePopup('middle')"   @click="jumpPage" -->
				<view class="status-del"  @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/pregnancyRecord/pregnancyQuery">
					操作记录
				</view>
			</view>
		</view>
		<!-- 内容 -->
	<form @submit="formSubmit">
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 配种日期 -->
						<!-- <view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								检测日期<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  :value="date" />
							</view>
						</view> -->
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								检测员
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" name="jcyname" placeholder="张三" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								检测工具<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" name="jctool" :value="index2" :range="array1[0]">
									<view class="picker">
										<view class="uni-input">{{array1[0][index2]?array1[0][index2]:'-'}} </view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						
					</view>
				</view>

			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text">添加妊检明细</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" name="cfsownonum" value="" placeholder="请输入耳牌号" /> -->
								<str-autocomplete :stringList="stringList1[0]" :importvalue="title1" @select="selectOne1"  backgroundColor='#fff' highlightColor="#FF0000" v-model="title1"></str-autocomplete>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								异常原因<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<radio-group @change="radioChange" name="ycreason">
									<view style="display: block;">
										<view style="display: flex;">
											<label style="margin-right:15rpx;display: flex;" v-for="(item, index) in items" :key="item.value">
												<radio style="transform: scale(0.7);" :value="item.value" :checked="index === current" />{{item.name}}
											</label>
				
										</view>
									</view>
								</radio-group>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b">
			<button form-type="submit" type="primary"  class="flexc submit-btn">提交</button>
		</view>
	</form>	
		
		
		<!-- // 弹窗 -->
		<!-- <uni-popup :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="popview">
				<view class="main-wrap-contetnt-item-field field-nobottom">
					<view class="main-wrap-contetnt-item-field-name">
						异常原因<text class="text-red">*</text>
					</view>
					<view class="main-wrap-contetnt-item-field-value" style="margin: 20px 0;">
						<radio-group @change="radioChange">
							<view style="display: block;">
								<view style="display: flex;">
									<label style="margin-right:15rpx;display: flex;" v-for="(item, index) in items" :key="item.value">
										<radio style="transform: scale(0.7);" :value="item.value" :checked="index === current" />{{item.name}}
									</label>
								
								</view>
							</view>
						</radio-group>
					</view>
				</view>
				<view @click="togglePopup('')" class="out-btn1">取消</view>
				<view @click="togglePopup('')" class="out-btn2">确定</view>
			</view>
		</uni-popup> -->
	</view>

</template>

<script>
	import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue'  //输入框
		// 弹窗 
	import uniPopup from '@/components/uni-popup/uni-popup'
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import ztable from '@/components/z-table/z-table'
	import common from '../../../utils/common.js'
	export default {
		onLoad: function(options) {
			this.tools()
		},
		data() {
			return {
				title1: '', // 耳牌 
				stringList1: [['apple2','apple22']], // 耳牌 
				type: '',
				index2: 0,
				items: [
					// {
					// 	value: 'kb',
					// 	name: '空杯',
					// },
					// {
					// 	value: 'fq',
					// 	name: '返情'
					// },
					// {
					// 	value: 'lc',
					// 	name: '流产'
					// }
				],
				current: 0,
				array1: [['B超', 'A超'],['b','a']],
				}
				},
		components: {
			ztable,
			uniIcon,
			drawCell,
			uniPopup,
			strAutocomplete
		},
		methods: {
			selectOne1(opt) {  //输入提示框选择
				this.title1 = opt
			    console.log(opt)
			},
			 tools(){
				var _this = this;
				let headers = {};
				let  params = {
								cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
								cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
							};

				// 异常原因
				let picker3 = []
					 common.commRequest(`/PigAbnormalPregRecord/selectAbnormal`, {}, headers,'get',
						function(data) {
							let getData = data.data;
							// console.log(JSON.stringify(getData))
								for (let i = 0; i < getData.length; i++) {
									picker3.push({
										'value':getData[i].CFABORTID,
										'name':getData[i].ABNORMAL
									})
								}
								_this.items = picker3
								// console.log(JSON.stringify(picker3))
					})
					
					// 耳牌号 
					let picker2 = [[],[]]
						common.commRequest(`/PigAbnormalPregRecord/FilterselectPig/1/10000`, params, headers,'get',
							function(data) {
								console.log(data)
								let getData = data.data;
									for (let i = 0; i < getData.length; i++) {
										picker2[0].push(getData[i].ERPAIHAO)
										picker2[1].push(getData[i].ERPAIID)
									}
									_this.stringList1 = picker2
									// console.log(_this.stringList1)
						})
					
			},
			formSubmit(e) {  //表单提交
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';				
			let  params = {
							cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
							cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
						};
			let data = e.detail.value;
			data['jctool'] = this.array1[1][_this.index2] 
			data['cfsownonum'] = this.stringList1[1][this.stringList1[0].indexOf(this.title1)]
			params = {...params,...data}
			console.log(data['cfsownonum'])
			 common.commRequest(`/PigAbnormalPregRecord/insertCtPigAbnormalPregRecord`, params, headers,'post',
				function(data) {
					console.log(JSON.stringify(data))
					if(data.status=='00000'){
						uni.navigateTo({
							url: `/pages/dataCollection/pregnancyRecord/pregnancyQuery`,
						});
					}
			})
				
			},
			scancode1(){
				this.scancode()
				setTimeout(()=>{
					this.togglePopup('middle')
				},500)
			},
			goback() {
				this.handOnClickBack();
				return false;
			},
			togglePopup(type) {
				this.type = type;
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.target.value
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
			padding: 160rpx 23rpx 0 23rpx;
			
			.main-wrap-contetnt {
				padding: 0 26rpx 44rpx 36rpx;
				
				.main-wrap-contetnt-item-title {
					padding-top: 40rpx;
					
					.main-wrap-contetnt-item-title-text {
						font-size: 14px;
						color: #4785F3;
					}
				}
			}
		}
	}

	.list-table {
		margin-top: -120px;
	}
	input{
		font-size: 14px;
	}
	
	/*提示框样式*/
	.popview {
		padding-top: 33upx;
		display: block;
		float: clear;
		width: 530upx;
	}
	
	.out-text {
		font-size: 28upx;
		margin-bottom: 55upx;
		display: block;
		float: clear;
		text-align: center;
	
	}
	
	.out-btn1 {
		width: 50%;
		display: inline-block;
		color: rgb(179, 179, 179);
		text-align: center;
		// margin-left: 120upx;
		// margin-right: 184upx;
	
	}
	
	.out-btn2:active,
	.out-btn1:active {
		background: #EEEEEE;
	}
	
	.out-btn2 {
		display: inline-block;
		text-align: center;
		color: #FF4343;
		width: 50%;
	}
</style>
