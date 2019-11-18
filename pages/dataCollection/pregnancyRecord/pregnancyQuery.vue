<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/rectangle11@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					妊检记录查询
				</view>
				<view class="more-icon flexc ali-c" @click="showFilter">
					<image class="icon" src="/static/assets/more@2x.png"></image>
				</view>
			</view>
			<!-- 搜索框(圆) -->
			<!-- <view class="status-search">
				<view class="search-wrap">
					<view class="search-wrap-search">
						<image class="icon" src="/static/assets/search@2x.png" mode=""></image>
					</view>
					<view class="search-wrap-input">
						<input type="text" value="" placeholder="请输入筛选条件" />
					</view>
					<view class="search-wrap-qr" @click="scancode">
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
				</view>
			</view> -->
			<!-- 搜索框（方） -->
			<view class="status-search">
				<view class="search-wrap">
					<view class="search-wrap-search">
						<uni-icon type="search" color="#CACFD9"></uni-icon>
					</view>
					<view class="search-wrap-input">
						<input type="text" value="" placeholder="请输入筛选条件" />
					</view>
					<view class="search-wrap-qr" @click="scancode">
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 内容 -->
				<!-- 列表 -->
				<view class="list">
					<view class="data__wrapper">
						<ztable :tableData="tableData" stickSide stickSide1 :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false" @rowTap="rowTapHandler"></ztable>
					</view>
				</view>
				<!-- 加载  -->
				<view class="uni-tab-bar-loading" @click="loadMore()">
					<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
				</view>
				
					<!-- 弹窗 -->
				<popup-layer ref="popupRef1" :direction="'left'" :class='{active:active}'>
				   <scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
					   <!-- 检测日期 -->
				       <draw-cell title="检测日期">
						   <view slot="value" class="jus-j">
								<view class="bg-gray jus-j" @click="selectDate" style="flex: 1;" >
									<text>{{searchForm.businessTime}}</text>
									<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
								</view>
								<text>—</text>
								<view class="bg-gray jus-j" @click="selectDate1" style="flex: 1;" >
									<text>{{searchForm.businessEndTime}}</text>
									<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
								</view>
						   </view>
						   <text>-</text>
					   </draw-cell>
					   
					   <!-- 检测员 -->
					   <draw-cell title="检测员">
							<view slot="value" class="bg-gray jus-j" @click="selectPeople">
								<text>{{searchForm.vaccineName.name}}</text>
								<uni-icon type="arrowright" color="#333333" size="18" /> 
							</view>
					    </draw-cell>
						
					   <!-- 耳牌号 -->
					   <draw-cell title="母猪耳牌">
					   				<view slot="value" class="bg-gray jus-j">
					   					<image @click="qr" style="margin: 0;" src="/static/search/qr.png" mode="" class="icon"></image>
					   					<!-- <input type="text" placeholder="请填写" v-model="searchForm.immuneProject" /> -->
										<str-autocomplete :stringList="stringList1[0]" :importvalue="title1" @select="selectOne1"  backgroundColor='#f5f5f5' highlightColor="#FF0000" v-model="title1"></str-autocomplete>
					   				</view>
					   </draw-cell>
					   <!-- 异常原因 -->
					   <view class="main-wrap-contetnt-item-field field-nobottom">
					   	<view class="main-wrap-contetnt-item-field-name" style="font-weight: 700;">
					   		异常原因
					   	</view>
					   	<view class="main-wrap-contetnt-item-field-value">
					   		<radio-group @change="radioChange">
					   			<view style="display: block;">
					   				<view style="display: flex;">
					   					<label style="margin-right:15rpx;display: flex;" v-for="(item, index) in items" :key="item.value">
					   						<radio style="transform: scale(0.7);" :value="item.value" :checked="index === searchForm.current" />{{item.name}}
					   					</label>
					   				
					   				</view>
					   			</view>
					   		</radio-group>
					   	</view>
					   </view>
					    <!-- 配种批次 -->
					   <draw-cell title="配种批次" >
					   	<view slot="value" class="bg-gray jus-j" @click="selectPeople1">
					   		<text>{{searchForm.vaccineName1.name}}</text>
					   		<uni-icon type="arrowright" color="#333333" size="18" /> 
					   	</view>
					    </draw-cell>
					    <!-- 分场 -->
					   <draw-cell title="分场">
					   	<view slot="value" class="bg-gray jus-j">
							<input type="text" placeholder="请填写" v-model="searchForm.vaccineName2" />
					   		<!-- <text>{{searchForm.vaccineName2.name}}</text>
					   		<uni-icon type="arrowright" color="#333333" size="18" /> -->
					   	</view>
					    </draw-cell>
					  </scroll-view>
					  <view class="submits jus-b">
					  			   <view class="flexc reset-btn" @click="reset">重置</view>
					  			   <view class="flexc submit-btn" @click="find">确定</view>
					  </view>
				</popup-layer>
				<!-- @onCancelDate="onCancel" -->
				<mpvue-picker  :deepLength="deepLength"  :themeColor="themeColor" ref="mpvuePicker" :pickerValueDefault="[0,0,0]" mode="dateSelector" @onConfirm="onConfirmDate" 
				 ></mpvue-picker> 
				 <mpvue-picker  :deepLength="deepLength"  :themeColor="themeColor" ref="mpvuePicker1" :pickerValueDefault="[0,0,0]" mode="dateSelector" @onConfirm="onConfirmDate1" 
				  ></mpvue-picker> 
				 
				 <!-- 检测员 -->
				  <mpvue-picker :themeColor="themeColor"  ref="pigPicker" 
				 :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
				  @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
				
				 <!-- 配种批次 -->
				 <mpvue-picker :themeColor="themeColor"  ref="pigPicker1" 
				:deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
				 @onConfirm="onConfirmPig1" :pickerValueArray="pickerValueArray1"></mpvue-picker>
			</view>
		
		</template>
		
		<script>
			import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue'  //输入框
			import common from '../../../utils/common.js';
			//  加载更多 
			import uniLoadMore from '@/components/uni-load-more.vue';
			//引入图标
			import uniIcon from '@/components/uni-icon/uni-icon.vue'
			//引入时间转换
			import {timeFormat} from '@/utils/dateUtils.js'
			// 引入弹框组件
			import popupLayer from '@/components/popup/popup-layer.vue';
			//引入抽屉单元格组件
			import drawCell from '@/components/uni-cell/draw-cell.vue';
			//引入下拉框
			import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
			import ztable from '@/components/z-table/z-table'
		
			export default {
				// 下拉刷新
				onPullDownRefresh() {
					let _this = this;
					this.pageNum = 1
					this.idNum = 0 
					this.getindex(this.pageNum,this.pageSize,true)
					// console.log('下拉刷新');
						
				},
				// 上拉加载
						onReachBottom() {
							this.loadMore()
						},
						onLoad: function(options) {
							this.active = !this.active
							this.loadingType = 1;
							this.getindex(this.pageNum,this.pageSize,false)
							this.tools()
						},
				data() {
					return {
						title1: '', // 耳牌 
						stringList1: [['apple2','apple22']], // 耳牌 
						idNum:0, // 表格排序
						pageNum:1, // 页数  
						pageSize:10, // 每页数量     
						items: [ // 异常原因 
						],
						itemsId:'',
						active:true,
						status: 'more',
						statusTypes: [{
							value: 'more',
							text: '加载前'
						}, {
							value: 'loading',
							text: '加载中'
						}, {
							value: 'noMore',
							text: '没有更多'
						}],
						loadingType: 0, // 加载更多状态
						loadingText: {
							contentdown: '查看更多',
							contentrefresh: '正在加载...',
							contentnomore: '没有更多数据了'
						},
						deepLength:1,
						pickerValueDefault: [0], // 默认第几个 
						themeColor: '#007AFF', // 下拉框颜色
						pickerValueArray:[ // 检测员
							
						],
						pickerValueArray1:[ // 配种批次
							
						],
						searchForm:{
							businessTime:'', // 检测日期 
							businessEndTime:'', // 检测日期 
							vaccineName:{
								id:'',
								name:''
							}, //检测员
							vaccineName1:{
								id:'',
								name:''
							}, //配种批次
							vaccineName2:'一分场', //存栏位置
							current: '', // 异常原因 
						},
						showRigth: false,
						showLeft: false,
						// 表格数据
						tableData: [],
						columns: [{
								title: "序号",
								key: "index",
								width: 70,
							}, {
								title: "检测日期",
								key: "jcrq",
								width: 150,
							}, {
								title: "检测人员",
								key: "jcry",
								width: 150,
							}, {
								title: "检测工具",
								key: "jcgg",
								width: 150,
							},
							{
								title: "母猪耳牌",
								key: "sowcard",
								width: 150,
							}, {
								title: "异常原因",
								key: "ycyy",
								width: 200,
							}, {
								title: "配种批次",
								key: "pzpc",
								width: 150,
							}, {
								title: "状态",
								key: "zt",
								width: 100,
							}, {
								title: "存栏位置",
								key: "clwz",
								width: 200,
							}, {
								title: "公猪耳牌",
								key: "gzep",
								width: 150,
							}, {
								title: "提交人",
								key: "tjr",
								width: 100,
							}, {
								title: "提交时间",
								key: "tjsj",
								width: 150,
							}
						],
					}
				},
				components: {
					ztable,
					popupLayer,
					drawCell,
					mpvuePicker,
					uniIcon,
					uniLoadMore,
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
										
							// 配种批次
							let picker = []
								common.commRequest(`/PigAbnormalPregRecord/selectBreedpc/1/10000`, params, headers,'get',
									function(data) {
										let getData = data.data;
											for (let i = 0; i < getData.length; i++) {
												picker.push({
													'value':getData[i].BREEDPCID,
													'label':getData[i].BREEDPC
												})
											}
											_this.pickerValueArray1 = picker
								})
							// 	
							
							//  // 检测员
							let picker1 = []
									common.commRequest(`/PigAbnormalPregRecord/FilterselectPeizhongyuan/1/100`, params, headers,'get',
										function(data) {
											console.log(data)
											let getData = data.data;
												for (let i = 0; i < getData.length; i++) {
													picker1.push({
														'value':getData[i].PEIZHONGYUANID,
														'label':getData[i].PEIZHONGYUAN
													})
												}
												_this.pickerValueArray = picker1
									})
								
						
								
					
					},
					getindex(pageNum, pageSize, isLoad,data) {
						var _this = this;
						let headers = {};
						headers['content-type'] = 'application/json';
						let params = { 
							
								cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
								cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
						};
						if(this.searchForm.vaccineName.id) params['cfactorid'] = this.searchForm.vaccineName.id // 检测员 
						if(this.searchForm.businessTime) params['mindate'] = this.searchForm.businessTime // 起始时间
						if(this.searchForm.businessEndTime)	params['maxdate'] = this.searchForm.businessEndTime // 终止时间
						if(this.title1) params['cfsownoid'] = this.stringList1[1][this.stringList1[0].indexOf(this.title1)] // 母猪耳牌
						if(this.itemsId) params['cfabortid'] = this.itemsId // 异常原因  
						if(this.searchForm.vaccineName1.id)	params['cfbreedingbatchid'] = this.searchForm.vaccineName1.id // 配种批次 
						 
						if(data){
							params = {...params,...data}
						}
						console.log(params)
						common.commRequest(`/PigAbnormalPregRecord/selectAll/${pageNum}/${pageSize}`, params,headers, 'post',
							function(data) {
								// console.log(data)
								let getData = data.data.list;
								if(isLoad) {
									let oldData = _this.tableData;
									let loadData = []
									if(getData.length == 0){
										_this.loadingType = 2; 
										_this.tableData = []
										return;
									}
									for (var i = 0; i < getData.length; i++) {
										loadData.push({
											id: getData[i].fid,
											index: ++_this.idNum, // 序号
											jcrq: timeFormat(getData[i].fbizdate,'yyyy-MM-dd')?timeFormat(getData[i].fbizdate,'yyyy-MM-dd'):'-', // 检测日期
											jcry: getData[i].jcyname?getData[i].jcyname:'-', // 检测人员 1
											jcgg: getData[i].jctool?getData[i].jctool:'-', // 检测工具
											sowcard: getData[i].cfsownonum?getData[i].cfsownonum:'-', // 母猪耳牌
											ycyy: getData[i].ycreason?getData[i].ycreason:'-', // 异常原因
											pzpc: getData[i].breedpc?getData[i].breedpc:'-', // 配种批次 1
											zt: getData[i].cfbasestatus?getData[i].cfbasestatus:'-', // 状态
											clwz: getData[i].clwz?getData[i].clwz:'-', // 存栏位置
											gzep: getData[i].cfbornonum?getData[i].cfbornonum:'-', // 公猪耳牌
											tjr: getData[i].creator?getData[i].creator:'-', // 提交人
											tjsj: timeFormat(getData[i].mindate,'yyyy-MM-dd')?timeFormat(getData[i].mindate,'yyyy-MM-dd'):'-' // 提交时间
										})
									} 
									_this.tableData = loadData;
									uni.stopPullDownRefresh();
								}else {
									// console.log(JSON.stringify(getData));
									for (var i = 0; i < getData.length; i++) {
										_this.tableData.push({
											id: getData[i].fid,
											index: ++_this.idNum, // 序号
											jcrq: timeFormat(getData[i].fbizdate,'yyyy-MM-dd')?timeFormat(getData[i].fbizdate,'yyyy-MM-dd'):'-', // 检测日期
											jcry: getData[i].jcyname?getData[i].jcyname:'-', // 检测人员 1
											jcgg: getData[i].jctool?getData[i].jctool:'-', // 检测工具
											sowcard: getData[i].cfsownonum?getData[i].cfsownonum:'-', // 母猪耳牌
											ycyy: getData[i].ycreason?getData[i].ycreason:'-', // 异常原因
											pzpc: getData[i].breedpc?getData[i].breedpc:'-', // 配种批次 1
											zt: getData[i].cfbasestatus?getData[i].cfbasestatus:'-', // 状态
											clwz: getData[i].clwz?getData[i].clwz:'-', // 存栏位置
											gzep: getData[i].cfbornonum?getData[i].cfbornonum:'-', // 公猪耳牌
											tjr: getData[i].creator?getData[i].creator:'-', // 提交人
											tjsj: timeFormat(getData[i].mindate,'yyyy-MM-dd')?timeFormat(getData[i].mindate,'yyyy-MM-dd'):'-' // 提交时间
										})
									}
									
									
									
								}
								_this.loadingType = 0;
						})
					},
					radioChange(evt) {
						for (let i = 0; i < this.items.length; i++) {
							if (this.items[i].value === evt.target.value) {
								this.searchForm.current = i;
								break;
							}
						}
						
						this.itemsId = evt.detail.value
						
						// console.log(this.itemsId)
					},
					// 滑动底部加载
					loadMore() {
						let _this = this;
						_this.loadingType = 1;
						this.getindex(++this.pageNum,this.pageSize,false)
					},
					onConfirmPig(e){ // 检测员
						const _this = this;
						_this.searchForm.vaccineName.name = e.label;
						_this.searchForm.vaccineName.id = e.value[0];
						// console.log(e)
					},
					onConfirmPig1(e){ // 检测工具
						const _this = this;
						_this.searchForm.vaccineName1.name = e.label;
						_this.searchForm.vaccineName1.id = e.value[0];
						// console.log(_this.searchForm.vaccineName1.id)
					},
					onConfirmDate(e){ 
						// console.log(e)
						const _this = this;
						_this.searchForm.businessTime = e.label;
						
					},
					onConfirmDate1(e){
						// console.log(e)
						const _this = this;
						_this.searchForm.businessEndTime = e.label;
						
					},
					selectDate(){
						this.$refs.mpvuePicker.show()
					},
					selectDate1(){
						this.$refs.mpvuePicker1.show()
					},
					// 重置 
					reset(){
						this.searchForm.businessTime=''
						this.searchForm.businessEndTime='' // timeFormat(new Date(),'yyyy-MM-dd')
						this.searchForm.vaccineName.name=''
						this.searchForm.vaccineName.id=''
						this.searchForm.vaccineName1.name=''
						this.searchForm.vaccineName1.id=''
						this.searchForm.current= ''
						this.itemsId = "" 
						this.title1 = ' '
						
					},
					// 查询 
					find(){
						this.$refs.popupRef1.close() // 关闭弹窗  
						this.pageNum = 1
						this.idNum = 0 
						this.loadingType = 1;
						let data = {}
						if(this.searchForm.vaccineName.id) data['cfactorid'] = this.searchForm.vaccineName.id // 检测员 
						if(this.searchForm.businessTime) data['mindate'] = this.searchForm.businessTime // 起始时间
						if(this.searchForm.businessEndTime)	data['maxdate'] = this.searchForm.businessEndTime // 终止时间
						if(this.title1) data['cfsownoid'] = this.stringList1[1][this.stringList1[0].indexOf(this.title1)] // 母猪耳牌
						if(this.itemsId) data['cfabortid'] = this.itemsId // 异常原因  
						if(this.searchForm.vaccineName1.id)	data['cfbreedingbatchid'] = this.searchForm.vaccineName1.id // 配种批次 
						// console.log(data)
						this.getindex(this.pageNum,this.pageSize,true,data)
					},
					selectPeople(){ // 检测员
						this.$refs.pigPicker.show()
					},
					selectPeople1(){ // 检测工具
						this.$refs.pigPicker1.show()
					},
					showFilter(){
						this.$refs.popupRef1.show();
					},
					rowTapHandler(row) {
						uni.navigateTo({
							//url: `/pages/dataCollection/pregnancyRecord/pregnancyAudit?id=${row.id}`,
							url: `/pages/dataCollection/pregnancyRecord/pregnancyDetail?id=${row.id}`,
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					},
				}
			}
		</script>
		
		<style lang="scss">
			@import "../../../common/dataCollection.scss";
		
			.status {
					z-index: 99999;
					height: 220rpx;
					
					.status-header {
						margin-top: 8rpx;
					}
					.status-title {
						padding-left: 40rpx;
					}
				}
			
			// 	.status-search {
			// 
			// 		.search-wrap-qr,
			// 		.search-wrap-search {
			// 			width: 10%;
			// 			display: flex;
			// 			align-items: center;
			// 			margin: 0 15rpx;
			// 		}
			// 
			// 		.search-wrap-input {
			// 			width: 80%;
			// 			text-align: left;
			// 		}
			// 	}
				.status-search{
					box-sizing: border-box;
					width: 100%;
					position: absolute;
					bottom: 0;
					background: none;
					color: #B2B2B2;
					padding:20rpx 4%;
					.search-wrap {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						background: #ffffff;
						height: 60rpx;
						padding: 0 18rpx;
						border-radius: 12rpx;
						.uni-icon-search {
							line-height: 25px;
						}
						.search-wrap-input {
							width: 90%;
							margin-left: 20rpx;
							text-align: left;
							.uni-input-placeholder {
								font-size: 28rpx;
							}
						}
					}
				}
				.list {
					padding-top: 240rpx;
				}
		
			//抽屉样式
			.draw {
				padding: 30rpx;
				width: 500rpx;
				height: calc(100% - 118rpx);
		
				.bg-gray {
					background: #f5f5f5;
					padding: 16rpx 20rpx;
					font-size: 12px;
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
		</style>
		