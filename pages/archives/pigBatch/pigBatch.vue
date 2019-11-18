<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				批次档案
			</view>
			<view class="right__icon">
				<image src="../../../static/assets/scan.png" mode="" class="icon"></image>
				<image src="../../../static/assets/search.png" mode="" @tap="showFilter" class="icon"></image>
			</view>
		</view>
		<!-- 数据表格 -->
		<view class="data__wrapper">
			<ztable stickSide stickSide1 :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler"></ztable>
		</view>
		
		<!-- 加载  -->
		<view class="uni-tab-bar-loading" @click="loadMore()">
			<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
		
		<!-- 检索弹出层  -->
		<popup-layer ref="popupRef1" :direction="'left'" :class='{active:active}'>
			<scroll-view class="draw" scroll-y="true" style="padding-top: 65px;" >
				
				<draw-cell title="批次号" >
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请填写" v-model="searchForm.batchNum" />
					</view>
				</draw-cell>
				<draw-cell title="猪只类型" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName.name}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<draw-cell title="日龄"  >
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请填写" v-model="searchForm.rilin" />
					</view>
				</draw-cell>
				<draw-cell title="舍栋" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople1">
						<text>{{searchForm.vaccineName1.name}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<draw-cell title="分厂" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople2">
						<text>{{searchForm.vaccineName2.name}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
				<draw-cell title="批次状态"  >
					<view slot="value" class="bg-gray jus-j" @click="selectPeople3">
						<text>{{searchForm.vaccineName3.name}}</text>
						<uni-icon type="arrowright" color="#333333" size="18" />
					</view>
				</draw-cell>
		    </scroll-view>
			
		    <view class="submits jus-b">
				<view class="flexc reset-btn" @click="reset">重置</view>
				<view class="flexc submit-btn" @click="find">确定</view>
			</view>
		</popup-layer>
		<!-- 下拉菜单 -->
		<mpvue-picker :themeColor="themeColor" ref="pigPicker" 
		:deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
		 
		 <mpvue-picker :themeColor="themeColor" ref="pigPicker1" 
		 :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		  @onConfirm="onConfirmPig1" :pickerValueArray="pickerValueArray1"></mpvue-picker>
		  
		  <mpvue-picker :themeColor="themeColor" ref="pigPicker2" 
		  :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		   @onConfirm="onConfirmPig2" :pickerValueArray="pickerValueArray2"></mpvue-picker>
		   
		   <mpvue-picker :themeColor="themeColor" ref="pigPicker3" 
		   :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		    @onConfirm="onConfirmPig3" :pickerValueArray="pickerValueArray3"></mpvue-picker>
			
	</view>
</template>

<script>
	import common from '../../../utils/common.js';
	import uniLoadMore from '@/components/uni-load-more.vue';  //  加载更多
	
	import uniIcon from '@/components/uni-icon/uni-icon.vue';    //引入图标
	import popupLayer from '@/components/popup/popup-layer.vue'; // 引入弹框组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';  //引入抽屉单元格组件
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'; //引入下拉框
	
	import ztable from '@/components/z-table/z-table'
	import PageSider from '@/components/pageSider.vue'
	export default {
		components: {
			ztable,
			PageSider,
			popupLayer,
			drawCell,
			uniLoadMore,
			mpvuePicker,
			uniIcon,
		},
		data() {
			return {
				idNum:0, // 表格排序
				pageNum:1, // 页数  
				pageSize:10, // 每页数量     
				active:true,
				themeColor: '',
				deepLength: 0,
				pickerValueDefault: [0],
				
				status: 'more',
				tableData: [   //表格数据
				
				],
				columns: [     //表头数据
					{
						title: "序号",
						key: "index",
						width: 70,
					},{
						title: "猪只类型",
						key: "pigtype",
						width: 200,
					},{
						title: "批次号",
						key: "bathno",
						width: 250,
					},{
						title: "数量",
						key: "incnt",
						width: 100,
					},{
						title: "日龄",
						key: "curday",
						width: 100,
					},{
						title: "存栏位置",
						key: "regnm",
						width: 300,
					}
				],
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				pickerValueArray:[   //抽屉弹出层下拉框数据  猪只类型 
					// {'value':'1','label':'三泉A区'},
					// {'value':'11','label':'三泉B区'},
					// {'value':'111','label':'三泉C区'},
					// {'value':'1111','label':'三泉D区'},
					// {'value':'11111','label':'三泉E区'}
				],
				pickerValueArray1:[   //抽屉弹出层下拉框数据  舍栋 
					// {'value':'2','label':'三泉A区'},
					// {'value':'22','label':'三泉B区'},
					// {'value':'222','label':'三泉C区'},
					// {'value':'2222','label':'三泉D区'},
					// {'value':'22222','label':'三泉E区'}
				],
				pickerValueArray2:[   //抽屉弹出层下拉框数据  分厂 
					// {'value':'3','label':'三泉A区'},
					// {'value':'33','label':'三泉B区'},
					// {'value':'333','label':'三泉C区'},
					// {'value':'3333','label':'三泉D区'},
					// {'value':'33333','label':'三泉E区'}
				],
				pickerValueArray3:[   //抽屉弹出层下拉框数据  批次状态  
					{'value':'START','label':'开始'},
					{'value':'END','label':'结束'}
				],
				searchForm:{   //检索字段值
					vaccineName:{
								id:'',
								name:''
							},   //猪只类型
					vaccineName1:{
								id:'',
								name:''
							},   //舍栋
					vaccineName2:{
								id:'',
								name:''
							},   //分厂
					vaccineName3:{
								id:'',
								name:''
							},   // 批次状态
					rilin:'',
					batchNum:'' 
				}
			}
		},
		onReachBottom() {
			this.loadMore()
		},
		onLoad: function(options) {
			this.loadingType = 1;
			this.active = !this.active
			this.getindex(this.pageNum,this.pageSize,false)
			this.tools()
		},
		
		// 下拉刷新
		onPullDownRefresh() {
			let _this = this;
			this.pageNum = 1
			this.idNum = 0 
			this.getindex(this.pageNum,this.pageSize,true)
			// console.log('下拉刷新');
		},
		methods: {
			tools(){
				var _this = this;
				let headers = {};
				let  params = {
									cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
									cffieldid: 'Va4AAAAYuCGdu1vk' // 分场
							};
					// 猪只类型
				
					let picker = []
						common.commRequest(`/CtPigPigBatch/selectPigtypeFilter`, {}, headers,'get',
							function(data) {
								let getData = data.data;
								console.log(getData)
									for (let i = 0; i < getData.length; i++) {
										picker.push({
											'value':getData[i].pigtypeid,
											'label':getData[i].pigtypename
										})
									}
									_this.pickerValueArray = picker
						})
						
					 // 舍栋
					let picker1 = []
							common.commRequest(`/CtPigPigBatch/selectDongsheFilter/1/100`, params, headers,'get',
								function(data) {
									let getData = data.data.list;
									console.log(getData)
										for (let i = 0; i < getData.length; i++) {
											picker1.push({
												'value':getData[i].dongsheid,
												'label':getData[i].dongshe
											})
										}
										_this.pickerValueArray1 = picker1
							})
						
					// 分厂
					let picker3 = []
								common.commRequest(`/CtPigPigBatch/selectFengchangFilter/1/100`, params, headers,'get',
									function(data) {
										let getData = data.data.list;
										console.log(getData)
											for (let i = 0; i < getData.length; i++) {
												picker3.push({
													'value':getData[i].fengchangid,
													'label':getData[i].fengchang
												})
											}
											_this.pickerValueArray2 = picker3
								})
					
			
					 // 批次状态
					// let picker2 = []
					// common.commRequest(`/PigAbnormalPregRecord/selectPigClwz/1/1`, params, headers,'get',
					// 	function(data) {
					// 		let getData = data.data.list;
					// 			for (let i = 0; i < getData.length; i++) {
					// 				picker2.push({
					// 					'value':getData[i].cfpkPigfenid,
					// 					'label':getData[i].pigclwz
					// 				})
					// 			}
					// 			_this.pickerValueArray2 = picker2
					// })
						
			
			},
			getindex(pageNum, pageSize, isLoad,data) {
				var _this = this;
				let headers = {};
				headers['content-type'] = 'application/json';
				let params = {
					  "cffieldid": "Va4AAACSRUWdu1vk",
					  "cfpigfarmid": "Va4AAACSRNK4/eJt"
				};
				if(data){
					params = {...params,...data}
				}
				console.log(params)
				common.commRequest(`/CtPigPigBatch/selectAll/${pageNum}/${pageSize}`, params,headers, 'post',
					function(data) {
						// console.log(111111111111111111)
						console.log(data)
						let getData = data.data.list;
						if(getData.length == 0){
							_this.loadingType = 2;
							_this.tableData = [];
							return;
						}
						if(isLoad) {
							let oldData = _this.tableData;
							let loadData = []
							
							
							for (var i = 0; i < getData.length; i++) {
								loadData.push({
									id: getData[i].fid,
									index: ++_this.idNum, // 序号
									pigtype: getData[i].pigtype?getData[i].pigtype:'-', // 猪只类型
									bathno: getData[i].fnumber?getData[i].fnumber:'-', // 批次号
									incnt: getData[i].cfgenct?getData[i].cfgenct:'-', // 数量
									curday: getData[i].cfdays?getData[i].cfdays:'-', // 日龄
									regnm: getData[i].buildingarchives?getData[i].buildingarchives:'-', // 存栏位置
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
									pigtype: getData[i].pigtype?getData[i].pigtype:'-', // 猪只类型
									bathno: getData[i].fnumber?getData[i].fnumber:'-', // 批次号
									incnt: getData[i].cfgenct?getData[i].cfgenct:'-', // 数量
									curday: getData[i].cfdays?getData[i].cfdays:'-', // 日龄
									regnm: getData[i].buildingarchives?getData[i].buildingarchives:'-', // 存栏位置
								})
							}
							
						}
						_this.loadingType = 0;
				})
			},
			qr(){
				this.scancode()
			},
			qr1(){
				this.scancode()
			},
			rowTapHandler (row) {
				uni.navigateTo({
					url: `/pages/archives/pigBatch/pigBatchDetail/pigBatchDetail?id=${row.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			back () {
				uni.navigateBack({
				})
			},
			// 滑动底部加载
			loadMore() {
				let _this = this;
				_this.loadingType = 1;
				this.getindex(++this.pageNum,this.pageSize,false)
				
				
			},
			showFilter(){
				this.$refs.popupRef1.show();
			},
			selectPeople(){ // 下拉菜单 
				
				this.$refs.pigPicker.show()
			},
			selectPeople1(){ // 下拉菜单 
				
				this.$refs.pigPicker1.show()
			},
			selectPeople2(){ // 下拉菜单 
				
				this.$refs.pigPicker2.show()
			},
			selectPeople3(){ // 下拉菜单 
				
				this.$refs.pigPicker3.show()
			},
			reset(){   // 重置 
				this.searchForm.vaccineName.name=''
				this.searchForm.vaccineName.id=''
				this.searchForm.vaccineName1.name=''
				this.searchForm.vaccineName1.id=''
				this.searchForm.vaccineName2.name=''
				this.searchForm.vaccineName2.id=''
				this.searchForm.vaccineName3.name=''
				this.searchForm.vaccineName3.id=''
				this.searchForm.batchNum=''
				this.searchForm.rilin=''
				// console.log(this.searchForm)
			},
			find(){  // 查询 
			this.$refs.popupRef1.close() // 关闭弹窗  

			this.pageNum = 1
			this.idNum = 0 
			this.loadingType = 1;
			
			let data = {
				pigtype:this.searchForm.vaccineName.id, // 猪只类型
				buildingarchives:this.searchForm.vaccineName1.id, // 舍栋
				filefarmname:this.searchForm.vaccineName2.id, // 分厂
				cfbatchstatus:this.searchForm.vaccineName3.id, // 批次状态
				fnumber:this.searchForm.batchNum, // 批次号 
				cfdays:this.searchForm.rilin, // 日龄 
			}
			if(!data.pigtype&&!data.buildingarchives&&!data.filefarmname&&!data.cfbatchstatus&&!data.fnumber&&!data.cfdays){
				this.getindex(this.pageNum,this.pageSize,true)
				return
			}
			this.getindex(this.pageNum,this.pageSize,true,data)
			},
			onConfirmPig(e){ // 猪只类型
				const _this = this;
				_this.searchForm.vaccineName.name = e.label;
				_this.searchForm.vaccineName.id = e.value[0];
				// console.log(_this.searchForm.vaccineName)
			},
			onConfirmPig1(e){ //舍栋
				const _this = this;
				_this.searchForm.vaccineName1.name = e.label;
				_this.searchForm.vaccineName1.id = e.value[0];
				// console.log(_this.searchForm.vaccineName1)
			},
			onConfirmPig2(e){ //分厂
				const _this = this;
				_this.searchForm.vaccineName2.name = e.label;
				_this.searchForm.vaccineName2.id = e.value[0];
				console.log(_this.searchForm.vaccineName2)
			},
			onConfirmPig3(e){// 批次状态 
				const _this = this;
				_this.searchForm.vaccineName3.name = e.label;
				_this.searchForm.vaccineName3.id = e.value[0];
				// console.log(_this.searchForm.vaccineName3)
			},
		}
	}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	@import "@/common/dataCollection.scss";
	//抽屉样式
	.draw{
		padding:30rpx;
		width: 500rpx;
		height:calc(100% - 118rpx);
		.bg-gray{
			background: #f5f5f5;
			padding:16rpx 20rpx;
			font-size:12px;
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
	.submitData{
		margin-top:32rpx;
		.cancel-btn {
			width: 316rpx;
			background-color: #F05E57;
			color: #FFFFFF;
		}
		.submit-btn {
			width: 316rpx;
			background-color: #4684EA;
			color: #FFFFFF;
		}
	}
	
	
	.flex{
		display: flex;
		flex-flow: row nowrap;
		padding: 0 15px 10px 15px;
	}
	.page-wrapper{
		padding-top: 65px;
	}
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	.page__info{
		align-items: center;
		font-size: 12px;
		justify-content: space-between;
		margin: 10px 0 0;
	}
	.data__wrapper{
		padding: 0 0rpx;
	}
	
</style>
