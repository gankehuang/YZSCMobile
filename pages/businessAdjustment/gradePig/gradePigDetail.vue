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
					等级/调整详情
				</view>
				<view class="status-del"  @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/businessAdjustment/gradePig/gradePigQuery">
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
									<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
										调整类型
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<!-- <input type="text" v-model="tzlx" /> -->
										<picker @change="bindPickerChange1" :disabled='!edit' :value="index1" :range="array1[0]">
											<view class="picker">
												<view class="uni-input">{{array1[0][index1]}}</view>
												<view class="dextrad-icon">
													<uni-icon type="arrowright" color="#333333" size="18" />
												</view>
											</view>
										</picker>
									</view>
								</view>
								
								<view class="main-wrap-contetnt-item-field ">
									<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
										分场
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<input type="text" disabled="true" :value="fenc" />
									</view>
								</view>
								
								<view class="main-wrap-contetnt-item-field field-nobottom">
									<view class="main-wrap-contetnt-item-field-name">
										栋舍
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<picker @change="bindPickerChange" :disabled='!edit' :value="index" :range="array[0]">
											<view class="picker">
												<view class="uni-input">{{array[0][index]}}</view>
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
						<!-- 标题 -->
						<view class="editor-title flex ali-c" style="justify-content: space-between;">
							<view class="img">
								<image src="/static/assets/rect.png" mode=""></image>
								<text>调整明细</text>
							</view>
							<button type="primary" v-if='edit'  class="new-btn" style="margin: 0;font-size: 10px;padding: 0 24px;" @click="jumpPage" data-key="明细" data-jumpurl="/pages/businessAdjustment/gradePig/gradePigEditor">新增</button>
						</view>
						<!-- 数据表格 -->
						<view class="data__wrapper"><ztable :tableData="tableData" :columns="columns"  emptyText="-"></ztable></view>
					</view>
				</view>
				
				<view class="submits jus-b">
					<button type="primary" @click="add" v-if='edit' class="flexc submit-btn">提交</button>
				</view>
			</view>
		
		</template>
		
		<script>
			import common from '../../../utils/common.js';
			// 弹窗 
			import uniPopup from '@/components/uni-popup/uni-popup'
			//引入抽屉单元格组件
			import drawCell from '@/components/uni-cell/draw-cell.vue';
			//引入图标
			import uniIcon from '@/components/uni-icon/uni-icon.vue'
			import ztable from '@/components/z-table/z-table'
			export default {
				onShow(){
					let _this = this;
					uni.getStorage({
						key: 'storage_key1',
						success: function (res) {
							let data = JSON.parse(res.data)
							_this.tables = data
							_this.Rtable(data)
							}
						})
					},
				onLoad(e) {
					
					uni.setStorageSync('storage_key1', JSON.stringify([])); 
					uni.setStorageSync('URL', JSON.stringify([this.array[1][this.index],this.array1[1][this.index1],2]));  
					console.log(JSON.parse(e.id)[0])
					console.log(JSON.parse(e.id)[1])
					this.fid = JSON.parse(e.id)[0]
					uni.setStorageSync('storage_key1', JSON.stringify([JSON.parse(e.id)[1]]));
					this.tables = [JSON.parse(e.id)[1]]
					this.Rtable([JSON.parse(e.id)[1]])
					this.tools()
				},
				data() {
					return {
						fid:'',
						edit:true, // 编辑权限
						del:false, // 删除权限 
						tables:[], // 储存录入数据 
						fenc:'一分场', // 分场 
						index: 0, // 栋社 
						index1: 0, // 调整类型 
						array: [['B超', 'A超'],['EmCFzANuR8OgqV9wN2P0kC3xSLc=','EmCFzAwR8OgqV9wN2P0kC3xSLc=']],
						array1: [['核心群调整', '生产公猪调整'],[0,1]],  
						tableData: [
						// 	{
						// 	sowcard: 'Y001',  // 耳牌
						// 	ycyy: 'xx',   // 新核心群等级
						// 	pzpc: 'xx',  // 原核心群等级
						// 	zt: 'xx',  // 原生产类型
						// 	clzw: 'xx',  // 调整后生产类型
						// 	gzeh: 'xx',  // 公猪异常原因
						// 	yycyy:'xx'  // 原异常原因
						// },
						],
						columns: [ {
							title: "耳牌",
							key: "sowcard",
							width: 200,
						}, {
							title: "新核心群等级",
							key: "ycyy",
							width: 200,
						}, {
							title: "原核心群等级",
							key: "pzpc",
							width: 200,
						}, {
							title: "原生产类型",
							key: "zt",
							width: 200,
						}, {
							title: "调整后生产类型",
							key: "clzw",
							width: 200,
						},{
							title: "公猪异常原因",
							key: "gzeh",
							width: 200,
						},{
							title: "原异常原因",
							key: "yycyy",
							width: 200,
						}]
					}
				},
				components: {
					ztable,
					uniIcon,
					drawCell,
					uniPopup
				},
				methods: {
					add(){
						var _this = this;
						let headers = {};
						headers['content-type'] = 'application/json';		
						let params = { 
								cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
								cffieldid: 'Va4AAACSR46du1vk', // 分场id
								fid:_this.fid
						};
						let Arrar = []
						if(this.tables.length!=0){
							this.tables.forEach(item=>{
							Arrar.push({
								  "cfearnoid": item.title1.id, // 耳牌id
								  "cfnewgrouptype": item.newhexin.id, // 新核心群等级id
								  "cfnewmaletype": item.newzhu.id, // 新生产类型id
								  "cfoldgrouptype": item.oldhexin.id, // 原核心群等级id
								  "cfoldmaletype": item.oldzhu.id, // 原生产类型id
								  "cfoldunmaleresult": item.oldyic.id, // 原异常原因id
								  "cfunmaleresult": item.newyic.id, // 公猪异常原因id
							})
						})
						}
						
						params['ctPigCoreGTABE'] = Arrar
						console.log(params)
						common.commRequest(`/CtPigCoreGroupTypeAdjustBill/updateCtPigCoreGroupTypeAdjustBill`, params, headers,'post',
								function(data) {
									console.log(data)
									 if(data.status=='00000'){
									 	uni.navigateTo({
									 		url: `/pages/businessAdjustment/gradePig/gradePigQuery`,
									 	});
									 }
						})
					
					},
					tools(){
						var _this = this;
						let headers = {};
						let params = { 
								cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
								cffieldid: 'Va4AAACSR46du1vk' // 分场
						};
							// 栋舍   
							let picker = [[],[]]
							 common.commRequest(`/CtPigCoreGroupTypeAdjustBill/selectDongsheFilter/1/1000`, params, headers,'get',
									function(data) {
										console.log(data)
										let getData = data.data; 
											for (let i = 0; i < getData.length; i++) {
												picker[0].push(getData[i].DONGSHE)
												picker[1].push(getData[i].DONGSHEID)
											}
											_this.array = picker 	 
								})
					},
					bindPickerChange: function(e) { // 栋舍 
						this.index = e.target.value
						uni.setStorageSync('URL', JSON.stringify([this.array[1][this.index],this.array1[1][this.index1],2]));  
					},
					bindPickerChange1: function(e) { // 调整类型 
						this.index1 = e.target.value
						uni.setStorageSync('URL', JSON.stringify([this.array[1][this.index],this.array1[1][this.index1],2]));  
					},
					Rtable(data){
						console.log(data)
						if(data.length==0) return  this.tableData = []
						let tableArr = []
						data.forEach(item=>{
							tableArr.push({
								sowcard: item.title1.name?item.title1.name:'-', // 耳牌号
								ycyy: item.newhexin.name?item.newhexin.name:'-',  // 新核心群等级
								pzpc: item.oldhexin.name?item.oldhexin.name:'-', // 原核心群等级
								zt:item.oldzhu.name?item.oldzhu.name:'-', // 原生产类型
								clzw: item.newzhu.name?item.newzhu.name:'-', // 调整后生产类型
								gzeh: item.newyic.name?item.newyic.name:'-', // 公猪异常原因
								yycyy:item.oldyic.name?item.oldyic.name:'-',// 原异常原因
							})
						})
						this.tableData = tableArr
					}
				}
			}
		</script>
		
		<style lang="scss">
			@import "../../../common/dataCollection.scss";
		
			.status-header {
				padding-top: 26rpx;
		
				.status-title {
					padding-left: 20%;
				}
				.status-del {
					flex: none;
					width: 15%;
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