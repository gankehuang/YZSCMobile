<template>
	<view> 
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon"  @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					断奶记录详情
				</view>
				<view class="status-del">
					<text v-if="del">删除</text>
				</view>
			</view>

		</view>
		<!-- 内容 -->
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
								跨分场断奶<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
									<view style="display: flex;">
										<label style="display: flex;padding: 0;" >
											<radio style="transform: scale(0.7);" :disabled='!edit'  :checked="falg" @click="checked"/>
										</label>
									</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" v-if="falg">
							<view class="main-wrap-contetnt-item-field-name">
								转入分场
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<str-autocomplete v-if="edit" :stringList="stringList[0]" :importvalue="title" @select="selectOne" backgroundColor='#fff' highlightColor="#FF0000" v-model="title"></str-autocomplete>
								<input type="text" :disabled='!edit' v-model="details.trunchang"  v-else />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								母猪转入位置<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <input type="text"  placeholder="配怀一栋" /> -->
								<picker :disabled='!edit' @change="bindPickerChange1" :value="index1" :range="array1[0]">
									<view class="picker">
										<view class="uni-input">{{array1[0][index1]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								分场
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input :disabled='true' type="text"  v-model="chang" />
							</view>
						</view>
						
					</view>
				</view>
		
			</view>
		</view>
		<view class="main">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号 <text class="text-red">*</text>
								<image class="icon" src="/static/assets/scan-icon.png" @click="scancode" mode=""></image>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<str-autocomplete v-if="edit" :stringList="stringList1[0]" :importvalue="title1" @select="selectOne1"  backgroundColor='#fff' highlightColor="#FF0000" v-model="title1"></str-autocomplete>
								<input type="text" :disabled='!edit'  v-model="details.erpai"  v-else/>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								断奶数 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input :disabled='!edit' type="text" placeholder="请输入"  v-model="details.a" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								断奶均重 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input :disabled='!edit' type="text" placeholder="请输入"  v-model="details.b" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								断奶窝重 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input :disabled='!edit' type="text" placeholder="请输入"  v-model="details.c" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								哺乳天数 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input :disabled='!edit' type="text" placeholder="请输入"   v-model="details.d" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b">
			<button  @click="update" type="primary" class="flexc submit-btn">保存</button>
		</view>
	</view>

</template>

<script>
	import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue'  //输入框
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import common from '../../../utils/common.js';
	export default {
		 onLoad: function(e){
			let row = e.id.split(',')
			this.fid = `${row[row.length-1]}=`
			this.details = {
					a:row[4], // 断奶数
					b:row[5],// 断奶均重
					c:row[6],// 断奶窝重
					d:row[7],// 哺乳天数
					trunchang:row[1], // 转入分场 
					erpai:row[3], // 耳牌
				}
				this.title = row[1]  // 转入分场   
				this.title1 = row[3] // 耳牌 
				this.falg = +row[0]?true:false
			 this.tools(row[2])
			 console.log(row,this.fid)
			 
		},
		data() {
			return {
				details:{
					a:'', // 断奶数
					b:'',// 断奶均重
					c:'',// 断奶窝重
					d:'',// 哺乳天数
					trunchang:'', // 转入分场 
					erpai:'', // 耳牌
				},
				title: '', // 转入分场   
				title1: '', // 耳牌 
				chang:'一分场', // 分场 
				edit:true, // 编辑权限
				del:false, // 删除权限 
				falg:true,
				fid:'',
				stringList: ['apple','apple1'],  // 转入分场   
				stringList1: ['apple2','apple22'], // 耳牌 
				array1: [['B超', 'A超'],['b','a']], // 母猪转入位置
				index1: 0,
			}
		},
		components: {
			uniIcon,
			strAutocomplete
		},
		methods: {
			update(){
				var _this = this;
				let headers = {};
				headers['content-type'] = 'application/json';
				let params = {
					fid:_this.fid,
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCGdu1vk', // 分场 
					
					duannaishu:this.details.a, // 断奶数
					duannaijunzhong:this.details.b, // 断奶均重
					duannaiwozhong:this.details.c, // 断奶窝重
					cfoutday:this.details.d, // 哺乳天数
					// cfzrfieldid:this.title, // 转入分场
					muzhuerpai:this.stringList1[1][this.stringList1[0].indexOf(this.title1)], // 耳牌
					cfiskfc:this.falg, // 跨分场断奶
					zhuanruweizhi:this.array1[1][_this.index1]?this.array1[1][_this.index1]:'' // 转入位置 
				}
				if(this.falg) params['cfzrfieldid'] = this.stringList[1][this.stringList[0].indexOf(this.title)] // 转入分场  
				console.log(params) 
				common.commRequest(`/CtPigWeaningRecords/updateCtPigWeaningRecords`, params,headers, 'post',
					function(data) {
						console.log(data)
						if(data.status=='00000'){
							uni.navigateTo({
								url: `/pages/dataCollection/weaningRecord/weaningQuery`,
							});
						}
				})
			},
			tools(fenc){
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
								
								// _this.detali() 
								_this.index1 = _this.array1[0].findIndex(function(item){
										return item ==  fenc
								})
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
			selectOne(opt) {  //输入提示框选择
				this.title = opt
			    console.log(opt)
			},
			selectOne1(opt) {  //输入提示框选择
				this.title1 = opt
			    console.log(opt)
			},
			checked(){
				this.falg = !this.falg
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

</style>
