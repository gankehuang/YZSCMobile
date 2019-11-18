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
					妊检记录详情
				</view>
				<view class="status-del" >
					<text v-if="del">删除</text>
					
				</view>
			</view>

		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								检测员<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index1" :range="array[0]"  :disabled='!edit'>
									<view class="picker">
										<view class="uni-input">{{ array[0][index1]?array[0][index1]:'-' }}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								检测工具<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange1" :value="index2" :range="array1[0]"  :disabled='!edit'>
									<view class="picker">
										<view class="uni-input">{{array1[0][index2]?array1[0][index2]:'-'}}</view>
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
		
		<view class="main">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 与配公猪 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<str-autocomplete v-if="edit" :stringList="stringList1[0]" :importvalue="title1" @select="selectOne1"  backgroundColor='#fff' highlightColor="#FF0000" v-model="title1"></str-autocomplete>
								<input type="text" :disabled='true' v-else  :placeholder="details.i" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								异常原因<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<radio-group @change="radioChange">
									<view style="display: block;">
										<view style="display: flex;">
											<label style="margin-right:15rpx;display: flex;" v-for="(item, index) in items" :key="item.value">
												<radio :disabled='!edit' style="transform: scale(0.7);" :value="item.value" :checked="index == current" />{{item.name}}
											</label>
										
										</view>
									</view>
								</radio-group>
							</view>
						</view>
						
						
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								公猪
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true"  :placeholder="details.a" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								系谱
								
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true"  :placeholder="details.b" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种天数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true"  :placeholder="details.c" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种胎次
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true"  :placeholder="details.d" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种批次
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true"  :placeholder="details.e" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								存栏位置<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true" style="text-align: center;"  :placeholder="details.f" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field ">
							<view class="main-wrap-contetnt-item-field-name">
								提交人
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true"  :placeholder="details.g" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								提交日期
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true"  :placeholder="details.h" />
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b" v-if="edit" >
			<button @click="update" type="primary" class="flexc submit-btn">保存</button>
		</view>
	</view>

</template>

<script>
	import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue'  //输入框
	import common from '../../../utils/common.js';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		 onLoad: function(e){
			// console.log(e.id)
			this.fid = `${e.id}=`
			 this.tools()
			 
		},
		data() {
			return {
				title1: '', // 耳牌 
				stringList1: [['apple2','apple22']], // 耳牌 
				fid:'',
				details:{
					a:'', // 公猪耳牌
					b:'',// 系谱
					c:'',// 配种天数
					d:'',// 配种胎次
					e:'',// 配种批次
					f:'',// 存栏位置
					g:'',// 提交人
					h:'',// 提交日期
					i:'',// 母猪耳牌 
				},
				edit:true, // 编辑权限
				del:false, // 删除权限 
				itemsId:'',
				current:-1,
				array: [], // 检测员  
				array1: [['B超', 'A超'],['b','a']], // 检测工具 
				index1: -1,
				index2: -1,
				items: [], // 异常原因 
			}
		},
		components:{uniIcon,strAutocomplete},
		methods: {
			selectOne1(opt) {  //输入提示框选择
				this.title1 = opt
			    console.log(opt)
			},
			update(){
				var _this = this;
				let headers = {};
				headers['content-type'] = 'application/json';
				let params = {
					fid:_this.fid,
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCGdu1vk', // 分场
					jcyname:this.array[1][_this.index1]?this.array[1][_this.index1]:'', // 检测员
					jctool:this.array1[1][_this.index2], // 检测工具
					ycreason:this.itemsId, // 异常原因
					cfsownonum:this.stringList1[1][this.stringList1[0].indexOf(this.title1)] // 母猪耳牌
				}
				console.log(params) 
				common.commRequest(`/PigAbnormalPregRecord/updateCtPigAbnormalPregRecord`, params,headers, 'post',
					function(data) {
						console.log(data)
						if(data.status=='000000'){
							uni.navigateTo({
								url: `/pages/dataCollection/pregnancyRecord/pregnancyQuery`,
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
									 // 检测员
							let picker1 = [[],[]]
								 common.commRequest(`/PigAbnormalPregRecord/FilterselectPeizhongyuan/1/100`, params, headers,'get',
									function(data) {
										let getData = data.data 
										// console.log(JSON.stringify(getData))
											for (let i = 0; i < getData.length; i++) {
												picker1[0].push(getData[i].PEIZHONGYUAN)
												picker1[1].push(getData[i].PEIZHONGYUANID)
											}
											_this.array = picker1 
											// console.log(JSON.stringify(picker1))
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
															_this.detalis(_this.fid)
												})
									})
						
					
						
					
					
						
			
			},
			detalis(fid) {
				var _this = this;
				let headers = {};
				// headers['content-type'] = 'application/json';
				let params = {
						fid
				};
				common.commRequest(`/PigAbnormalPregRecord/selectByFid`, params,headers, 'get',
					function(data) {
						let getData = data.data
							console.log(JSON.stringify(getData));
							_this.details = {
												a:getData.cfbornonum?getData.cfbornonum:'-', // 公猪耳牌
												b:getData.xipu?getData.xipu:'-',// 系谱
												c:getData.breedday?getData.breedday:'-',// 配种天数
												d:getData.breedtc?getData.breedtc:'-', // 配种胎次
												e:getData.breedpc?getData.breedpc:'-',// 配种批次
												f:getData.clwz?getData.clwz:'-',// 存栏位置
												g:getData.creator?getData.creator:'-',// 提交人
												h:getData.fcreatetime?getData.fcreatetime:'-',// 提交日期
												i:getData.cfsownonum?getData.cfsownonum:'-',// 母猪耳牌 
											}
							_this.title1 = getData.cfsownonum?getData.cfsownonum:'-'
							_this.index2 = _this.array1[0].findIndex(function(item){
								return item == getData.jctool
							})
							_this.index1 = _this.array[0].findIndex(function(item){
									return item == getData.jcyname
							})
							_this.current = _this.items.findIndex(function(item){
									return item.name == getData.ycreason
							})
							_this.itemsId = _this.items[_this.current].value
						
				})
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
				
				this.itemsId = evt.detail.value
				
				console.log(this.itemsId)
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.target.value
			},
			bindPickerChange1: function(e) {
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


</style>
