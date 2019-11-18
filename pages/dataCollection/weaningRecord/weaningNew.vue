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
					断奶记录新增
				</view>
				<view class="status-del"  @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/weaningRecord/weaningQuery">
					历史记录
				</view>
			</view>
		</view>
		<!-- 内容 -->
<form @submit="formSubmit">
		<view class="main">
			<view class="main-wrap" style="padding-top: 130rpx;">
			<!-- 标题 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>基本信息</text>
				</view>
			</view>
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								跨分场断奶<text class="text-red">*</text>
							</view>
						<view class="main-wrap-contetnt-item-field-value">
									<view style="display: flex;">
										<label style="display: flex; padding-right: 0;" >
											<radio style="transform: scale(0.7);" :checked="falg" @click="checked"/> 
										</label>
									</view>
						</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" v-if="falg">
							<view class="main-wrap-contetnt-item-field-name">
								转入分场
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <picker @change="bindPickerChange" :value="index" :range="array[0]" >
									<view class="picker">
										<view class="uni-input">{{array[0][index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker> -->
								<str-autocomplete :stringList="stringList[0]" :importvalue="title" @select="selectOne" backgroundColor='#fff' highlightColor="#FF0000" v-model="title"></str-autocomplete>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								母猪转入位置<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange1" :value="index1" :range="array1[0]">
									<view class="picker">
										<view class="uni-input">{{array1[0][index1]}}</view>
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
			<view class="main-wrap" style="padding-top: 0;">
				<!-- 标题 -->
				<view class="editor-title flex ali-c">
					<view class="img">
						<image src="/static/assets/rect.png" mode=""></image>
						<text>断奶明细</text>
					</view>
				</view>
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text" value="" placeholder="DD0001" name='muzhuerpai' /> -->
								<str-autocomplete :stringList="stringList1[0]" :importvalue="title1" @select="selectOne1"  backgroundColor='#fff' highlightColor="#FF0000" v-model="title1"></str-autocomplete>
								<view class="main-wrap-contetnt-item-field-value-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								断奶数 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入断奶数" name='duannaishu' />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								断奶窝重 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入断奶窝重" name='duannaiwozhong' />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								断奶均重 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入断奶均重" name='duannaijunzhong' />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								哺乳天数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入哺乳天数" name='cfoutday' />
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
	</view>

</template>

<script>
	import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue'  //输入框
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import common from '../../../utils/common.js';
	export default {
		onLoad: function(options) {
			this.tools()
		},
		data() {
			return {
				//死亡原因输入框提示
				title: '', // 转入分场   
				title1: '', // 耳牌 
				stringList: ['apple','apple1'],  // 转入分场   
				stringList1: ['apple2','apple22'], // 耳牌 
				falg:true,
				// index: 0,
				index1: 0,
				// array: [['B超', 'A超'],['b','a']], // 转入分场 
				array1: [['B超', 'A超'],['b','a']], // 母猪转入位置
			}
		},
		components: {
			uniIcon,
			strAutocomplete
		},
		methods: {
			selectOne(opt) {  //输入提示框选择
				this.title = opt
			    console.log(opt)
			},
			selectOne1(opt) {  //输入提示框选择
				this.title1 = opt
			    console.log(opt)
			},
			formSubmit(e) {  //表单提交
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';				
			let  params = {
							cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
							cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
						};
						// console.log(e.detail.value)
			let data = e.detail.value;
			data['zhuanruweizhi'] = this.array1[1][_this.index1]  // 母猪转入位置  zhuanruweizhi 
			data['cfiskfc'] = this.falg?1:0  // 是否跨分场  cfiskfc     muzhuerpai
			data['muzhuerpai'] =this.stringList1[1][this.stringList1[0].indexOf(this.title1)]   // 耳牌        muzhuerpai
			if(this.falg) data['cfzrfieldid'] = this.stringList[1][this.stringList[0].indexOf(this.title)]  // 转入分场 cfzrfieldid  
			params = {...params,...data}
			console.log(params) 
			// 			
			// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			 common.commRequest(`/CtPigWeaningRecords/insertCtPigWeaningRecords`, params, headers,'post',
				function(data) {
					console.log(data)
					if(data.status=='00000'){
						uni.navigateTo({
							url: `/pages/dataCollection/weaningRecord/weaningQuery`,
						});
					}
			})
				
			},
			tools(){
				var _this = this;
				let headers = {};
				let  params = {
									cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
									cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
							};
							
					// 转入位置
				let picker = [[],[]]
				 common.commRequest(`/CtPigWeaningRecords/selectZhuanruweizhi/1/10`, params, headers,'get',
						function(data) {
							let getData = data.data; 
							// console.log(JSON.stringify(getData))
								for (let i = 0; i < getData.length; i++) {
									picker[0].push(getData[i].ZHUANRUWEIZHI)
									picker[1].push(getData[i].ZHUANRUWEIZHIID)
								}
								_this.array1 = picker 
								// console.log(JSON.stringify(picker))
						})
						
						// 转入分场
						let picker1 = [[],[]]
							common.commRequest(`/CtPigWeaningRecords/selectZhuanrufenchang/1/1000`, params, headers,'get',
								function(data) {
									// console.log(data)
									let getData = data.data;
										for (let i = 0; i < getData.length; i++) {
											picker1[0].push(getData[i].FENCHANG)
											picker1[1].push(getData[i].FENCHANGID)
										}
										_this.stringList = picker1
										// console.log(_this.stringList)
							})
							
						// 耳牌号
						let picker2 = [[],[]]
							common.commRequest(`/CtPigWeaningRecords/selectPig/1/10000`, {cfpigfarmid: 'Va4AAAAYuCC4/eJt'}, headers,'get',
								function(data) {
									// console.log(data)
									let getData = data.data;
										for (let i = 0; i < getData.length; i++) {
											picker2[0].push(getData[i].ERPAIHAO)
											picker2[1].push(getData[i].ERPAIID)
										}
										_this.stringList1 = picker2
										// console.log(_this.stringList1)
							})
			},
			checked(){
				this.falg = !this.falg
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindPickerChange1: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.target.value
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
