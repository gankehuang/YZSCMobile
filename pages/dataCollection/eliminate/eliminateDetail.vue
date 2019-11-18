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
					淘汰申请详情
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
						
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								分场
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true" :value="fenc" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								计划淘汰数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" disabled="true" :value="jhtt" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field ">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								累计淘汰数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"   disabled="true" :value="ljtt" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								申请人
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :disabled='!edit' :value="index" :range="array2[0]">
									<view class="picker">
										<view class="uni-input">{{array2[0][index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								淘汰类型
							</view> 
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange3" :disabled='!edit' :value="index3" :range="array3[0]">
									<view class="picker">
										<view class="uni-input">{{array3[0][index3]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								正常淘汰
							</view>
							<view class="main-wrap-contetnt-item-field-value" style="display: flex;">
										<view style="display: flex;">
											<label style=";padding: 0;display: flex;" >
												<radio :disabled='!edit' style="transform: scale(0.7);margin-left: 30px;" :checked="falg3" @click="checked3" />
											</label>
										</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 标题 -->
				<view class="editor-title flex ali-c" style="justify-content: space-between;">
					<view class="img">
						<image src="/static/assets/rect.png" mode=""></image>
						<text>淘汰明细</text>
					</view>
					<button type="primary" v-if='edit'  class="new-btn" style="margin: 0;font-size: 10px;padding: 0 24px;" @click="jumpPage" data-key="明细" data-jumpurl="/pages/dataCollection/eliminate/eliminateEditor">录入</button>
				</view>
				<!-- 数据表格 -->
				<view class="data__wrapper"><ztable :tableData="tableData" :columns="columns"  emptyText="-"></ztable></view>
				
				<!-- 标题 -->
				<view class="editor-title flex ali-c">
					<view class="img">
						<image src="/static/assets/rect.png" mode=""></image>
						<text>上传照片</text> 
					</view>
				</view>
				<view class="main-wrap-contetnt camera" style="padding-bottom: 0;" >
					<image-grid  :options="mode.factModifyInfo.imageList" @chooseImage="chooseImage" @delImg="delImg" :isEditable="edit"/>
				</view>

			</view>
		</view>
		
		<view class="submits jus-b">
			<button type="primary" v-if='edit' class="flexc submit-btn">保存</button>
		</view>
	</view>

</template>

<script>
	import common from '../../../utils/common.js';
	import imageGrid from '@/components/myimage-grid/image-grid.vue'
	// 弹窗 
	import uniPopup from '@/components/uni-popup/uni-popup'
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import ztable from '@/components/z-table/z-table'
	var _self;
	export default {
		onShow(){
					_self = this;
					uni.getStorage({
						key: 'storage_key',
						success: function (res) {
							let data = JSON.parse(res.data)
							_self.tables = data
							_self.Rtable(data)
		    }
		})
				},
				onLoad(e) {
					_self = this;
					console.log(e)
					let str = e.id.split(',')
					
					this.fid = `${str[3]}=` 
					if(str[1]){ // 淘汰类型 
						this.index33 = str[0]
					}
					if(str[2]){ // 申请 
						this.index11 = str[1]
					}
					this.falg3 = str[2]?true:false
					uni.setStorageSync('hid','0')
					uni.removeStorage({
							key: 'storage_key',
							success: function (res) {
								// console.log('success');
							}
							});
					uni.setStorageSync('storage_key', JSON.stringify([])); 
					this.tools()
				},
		data() {
			return {
				count1:0,
				fid:'',
				tables:[], // 储存录入数据 
				edit:true, // 编辑权限
				del:false, // 删除权限 
				jhtt:'', // 计划淘汰
				ljtt:'', // 累计淘汰 
				fenc:'一分场',
				falg3:false, // 正常淘汰 
				index: 0, // 申请人 
				index11: '', // 申请人 1
				index3: 0, // 淘汰类型 
				index33: '', // 淘汰类型 1
				array2: [['B超', 'A超']], // 申请人 
				array3:[[1,2]], // 淘汰类型 
				mode: {
					factModifyInfo:{
						imageList:[]//照片
					}
					
				},
				tableData: [],
				columns: [ {
					title: "耳牌号",
					key: "sowcard",
					width: 150,
				}, {
					title: "淘汰原因",
					key: "ycyy",
					width: 200,
				}, {
					title: "配种批次",
					key: "pzpc",
					width: 300,
				}, {
					title: "批次号",
					key: "zt",
					width: 100,
				}, {
					title: "猪只类型",
					key: "clzw",
					width: 200,
				},{
					title: "猪只状态",
					key: "gzeh",
					width: 200,
				},{
					title: "胎次",
					key: "tc",
					width: 200,
				},{
					title: "标准内淘汰",
					key: "tt",
					width: 200,
				}]
			}
		},
		components: {
			ztable,
			uniIcon,
			drawCell,
			uniPopup,
			imageGrid
		},
		methods: {
			Rtable(data){
				// console.log(data)
				if(data.length==0) return 
				let tableArr = []
				data.forEach(item=>{
					tableArr.push({
						sowcard: item.title1.name?item.title1.name:'-', // 耳牌号
						ycyy: item.ttyy.name?item.ttyy.name:'-',  // 淘汰原因
						pzpc: item.pzpc.name?item.pzpc.name:'-', // 配种批次
						zt:item.pch.name?item.pch.name:'-', // 批次号
						clzw: item.zzlx.name?item.zzlx.name:'-', // 猪只类型
						gzeh: item.zzzt.name?item.zzzt.name:'-', // 猪只状态
						tc:item.tc?item.tc:'-', // 胎次
						tt:item.isbz==1?'主动':'被动'  // 标准内淘汰
					})
				})
				_self.tableData = tableArr
			},
			tools(){
				var _this = this;
				let headers = {};
				let params = { 
						cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
						cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
				};
				let picker2 = []
				 common.commRequest(`/PigWeedApply/selectTaotaiMxByfparentid/1/1`, {fparentid:_self.fid}, headers,'post',
						function(data) {
							// console.log(data,_self.fid)
							let getData = data.data; 
							let getData1 = getData.ctPigWeedApplyEntriesVoList
							if(getData1.length==0) return 
								for (let i = 0; i < getData1.length; i++) {
									picker2.push({
												title1:{  // 耳牌
													name:getData1[i].erpaihao, // 存放名字
													id:getData1[i].cfearnoid  // 存放ID
												},
												ttyy:{ // 淘汰原因
													name:getData1[i].taotaiyuanyin, // 存放名字
													id:getData1[i].cfelimreasonid  // 存放ID
												},
												pzpc:{ // 配种批次
													name:getData1[i].peizhongpicihao, // 存放名字
													id:getData1[i].cfbreedingbatchid  // 存放ID
												}, 
												pch:{ // 批次号 
													name:getData1[i].picihao, // 存放名字
													id:getData1[i].cfbthnoid  // 存放ID
												}, 
												zzlx:{ // 猪只类型
													name:getData1[i].zhuzhizhuangtai, // 存放名字
													id:getData1[i].cfpigtypeid  // 存放ID
												}, 
												zzzt:{ // 猪只状态
													name:getData1[i].zhuzhizhuangtai, // 存放名字
													id:getData1[i].cfpigstateid  // 存放ID
												}, 
												tc:getData1[i].cfparit, // 胎次 
												isbz:getData1[i].fstandardelimination, // 标准内淘汰
												kg:getData1[i].cfavgweight, // 公斤
												id:++_this.count1,
											})
								}
								
								_this.tables = picker2
								_self.Rtable(_this.tables)
								uni.setStorageSync('storage_key', JSON.stringify(_this.tables)); 
								uni.setStorageSync('hid', _this.count1); 
						})
					// 申请人  
					let picker = [[],[]]
					 common.commRequest(`/PigWeedApply/selectActorFilter/1/1000`, params, headers,'get',
							function(data) {
								// console.log(data)
								let getData = data.data; 
									for (let i = 0; i < getData.length; i++) {
										picker[0].push(getData[i].RENYUAN)
										picker[1].push(getData[i].RENYUANID)
									}
									_this.array2 = picker 
									_this.index = _this.array2[0].findIndex(item=>{
										return item == _this.index11 
									})
									
								
							})
					
						// 淘汰类型   
					let picker1 = [[],[]]
					 common.commRequest(`/PigWeedApply/selectPigType/1/100`, {}, headers,'get',
							function(data) {
								// console.log(data)
								let getData = data.data.list; 
									for (let i = 0; i < getData.length; i++) {
										picker1[0].push(getData[i].boxname)
										picker1[1].push(getData[i].boxid)
									}
									_this.array3 = picker1
									_this.index3 = _this.array3[0].findIndex(item=>{
										return item == _this.index33
									})
									_this.select()
									
							})  
							
					
			},
			delImg(object){
				_self.mode.factModifyInfo.imageList.splice(object.index, 1); 
			},
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed'],
					count: 1,
					success: (chooseImageRes) => {
						
						for (let i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
							var imageSrc = chooseImageRes.tempFilePaths[i]
							_self.yzUploadFile(imageSrc,function(data){
							
									let len = _self.mode.factModifyInfo.imageList.length;
									
									_self.mode.factModifyInfo.imageList.splice(len-1,0, imageSrc);
								}
							);
						}
					}
				})
			},
			checked3(){
				this.falg3 = !this.falg3
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindPickerChange3: function(e) { // 淘汰类型 
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index3 = e.target.value
				this.select()
			},
			select(){
				let [name,id,url] = [this.array3[0][this.index3],this.array3[1][this.index3]] 
					switch (name){
						case '后备母猪':
						// console.log('后备母猪')
						url = `/PigWeedApply/selectWeedcnumHb`
							break;
						case '生产母猪':
						// console.log('生产母猪')
						url = `/PigWeedApply/selectWeedcnumSc`
							break;
						default:
						// console.log('公猪')
						url = `/PigWeedApply/selectWeedcnumGz`
							break;
					}
				let headers = {};
				let params = { 
						cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
						cffieldid: 'Va4AAACSR46du1vk' // 分场
				};
				 common.commRequest(url, params, headers,'get',
											function(data) {
												console.log(data)
												let getData = data.data; 
												_self.jhtt = getData[0].JHTTS
										})
										
				 common.commRequest(`/PigWeedApply/selectWeedcnumLj`, {...params,pigtypeid:id}, headers,'get',
															function(data) {
																// console.log(data)
																let getData = data.data; 
																_self.ljtt = getData[0].BYLJTT?getData[0].BYLJTT:'-' 
														})
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
