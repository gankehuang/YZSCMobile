<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="/static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				批次档案详情
			</view>
			
		</view>
		<view class="header-wrap" v-if="appear">
			<swiper class="swiper" style="height: 200rpx;padding-bottom: 20rpx;" mode="default" :dots-styles="dotsStyles"
			 indicator-dots="true">
				<swiper-item>
					<view class="header-container">
						<view class="header-row">
							<text>批次号：{{topNav1.a}}</text>
							<text>日龄：{{topNav1.b}}</text>
						</view>
						<view class="header-row">
							<text>猪只类型：{{topNav1.c}}</text>
							<text>栋舍：<text style="font-size: 12px;">{{topNav1.d}}</text> </text>
						</view>
						<view class="header-row">
							<text>分场：{{topNav1.e}}</text>
							<text>当前存栏：{{topNav1.f}}</text>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="header-container">
						<view class="header-row">
							<text>批次总头数：{{topNav1.g}}</text>
							<text>累计死亡数：{{topNav1.h}}</text>
						</view>
						<view class="header-row">
							<text>累计转出数：{{topNav1.i}}</text>
							<text>累计销售数：{{topNav1.j}}</text>
						</view>
						<view class="header-row">
							<text>弱仔数：{{topNav1.k}}</text>
							<text>启用状态：{{topNav1.l | state}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>

		</view>
		
		<view class="navList"><scrollTab :navList="navList" v-model="currentNavIndex" :showExpend="true"></scrollTab></view>
		<scroll-view class="scroll-view" scroll-y>
		
			<view class="data-wrapper">
				<view class="datagrid-wrapper" v-show="currentNavIndex == 0">
					<ztable :tableData="pigsData" stickSide stickSide1 :columns="pigsColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 1">
					<ztable :tableData="pigLetIn" :columns="pigletInColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 2">
					<ztable :tableData="importSeed" :columns="importSeedColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 3">
					<ztable :tableData="purRecord" :columns="purRecordColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 4">
					<ztable :tableData="fatpigIn" :columns="fatpigInColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 5">
					<ztable :tableData="saleRecord" :columns="saleRecordColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 6">
					<ztable :tableData="fatpigOut" :columns="fatpigOutColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 7">
					<ztable :tableData="fileOut" :columns="fileOutColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 8">
					<ztable :tableData="supRecord" :columns="supRecordColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 9">
					<ztable :tableData="immRecord" :columns="immRecordColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 10">
					<ztable :tableData="drugUse" :columns="drugUseColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
				<view class="datagrid-wrapper" v-show="currentNavIndex == 11">
					<ztable :tableData="feedUse" :columns="feedUseColumn"></ztable>
					<!-- 加载  -->
					<view class="uni-tab-bar-loading" @click="loadMore()">
						<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</view>
			</view>
			</scroll-view>
	</view>
	
	
	
</template>
<script>
	import common from '../../../../utils/common.js';
	import scrollTab from '@/components/scroll-tab/scroll-tab'
	import ztable from '@/components/z-table/z-table'
	import uniLoadMore from '@/components/uni-load-more.vue'; //  加载更多
	let observer = null;
	var self;
	export default {
		components: {
			scrollTab,
			uniLoadMore,
			ztable
		},
		data() {
			return {
				topNav1:{
					a:'-', // 批次号
					b:'-', //   日龄
					c:'-', // 猪只类型
					d:'-', //   栋社·
					e:'-', // ·分场
					f:'-', // 当前存栏数
					g:'-', // 批次总头数  
					h:'-', // 死亡数
					i:'-', //  累计转出数
					j:'-', // 销售数
					k:'-', // 弱崽数
					l:'-', // 启用状态 
				},
				idNum:0, // 表格排序
				pageNum:1,
				pageSize:10,
				appear: false,
				title: 'intersectionObserver',
				dotsStyles: {
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				id: '',
				status: 'more',
				currentNavIndex: 0,
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				navList: [{
					name: '猪只列表'
				}, {
					name: '仔猪转入'
				}, {
					name: '引种记录'
				}, {
					name: '采购记录'
				}, {
					name: '肉猪调入'
				}, {
					name: '销售记录'
				}, {
					name: '肉猪调出'
				}, {
					name: '档案调出'
				}, {
					name: '饲喂记录'
				}, {
					name: '免疫记录'
				}, {
					name: '兽药领用'
				}, {
					name: '饲料领用'
				}],
				pigsData: [],
				pigsColumn: [{
					title: "序号",
					key: "index",
					width: 70,
				}, { // 猪只列表
					title: "耳牌",
					key: "earno",
					width: 220,
				}, {
					title: "国标码",
					key: "indno",
					width: 280,
				}, {
					title: "栋舍",
					key: "regnm",
					width: 200,
				}, {
					title: "存栏状态",
					key: "status",
					width: 150,
				}],
				pigletInColumn: [{ // 仔猪调入
					title: "业务日期",
					key: "bizDate",
					width: 200
				}, {
					title: "耳牌",
					key: "earno",
					width: 220
				}, {
					title: "配种次数",
					key: "count",
					width: 120
				}, {
					title: "总仔数",
					key: "incnt",
					width: 160
				}, {
					title: "活仔数",
					key: "ilive",
					width: 160
				}, {
					title: "窝重",
					key: "faawt",
					width: 160
				}, {
					title: "均重",
					key: "avgWeight",
					width: 160
				}, {
					title: "合格公猪",
					key: "imale",
					width: 180
				}, {
					title: "合格母猪",
					key: "ifmal",
					width: 180
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}],
				pigLetIn: [],
				importSeedColumn: [{ //引种记录
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "总重量",
					key: "weight",
					width: 200
				}, {
					title: "总头数",
					key: "incnt",
					width: 160
				}, {
					title: "总金额",
					key: "money",
					width: 160
				}, {
					title: "引种类型",
					key: "type",
					width: 160
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}, {
					title: "调出单位",
					key: "outUnit",
					width: 200
				}],
				importSeed: [],
				purRecordColumn: [{ // 采购记录
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "总重量",
					key: "weight",
					width: 160
				}, {
					title: "总头数",
					key: "incnt",
					width: 160
				}, {
					title: "总金额",
					key: "money",
					width: 160
				}, {
					title: "采购日龄",
					key: "curday",
					width: 160
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}, {
					title: "来源猪场",
					key: "fromPigfarm",
					width: 200
				}],
				purRecord: [],
				fatpigInColumn: [{ // 肉猪调入
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "调入重量",
					key: "weight",
					width: 160
				}, {
					title: "调入头数",
					key: "incnt",
					width: 160
				}, {
					title: "总金额",
					key: "money",
					width: 160
				}, {
					title: "调入日龄",
					key: "curday",
					width: 160
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}],
				fatpigIn: [],
				saleRecordColumn: [{ // 销售记录
					title: "销售头数",
					key: "bizdate",
					width: 200
				}, {
					title: "销售重量",
					key: "weight",
					width: 160
				}, {
					title: "其中赠送头数",
					key: "outCnt",
					width: 160
				}, {
					title: "销售品种",
					key: "money",
					width: 160
				}, {
					title: "批次号",
					key: "curday",
					width: 160
				}],
				saleRecord: [],
				fatpigOutColumn: [{ // 肉猪调出
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "调出重量",
					key: "weight",
					width: 200
				}, {
					title: "调出头数",
					key: "outcnt",
					width: 200
				}, {
					title: "总金额",
					key: "money",
					width: 200
				}, {
					title: "批次日龄",
					key: "curday",
					width: 200
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}],
				fatpigOut: [],
				fileOutColumn: [{ // 档案调出
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "耳牌号",
					key: "earno",
					width: 200
				}, {
					title: "猪只品种",
					key: "verity",
					width: 200
				}, {
					title: "重量",
					key: "weight",
					width: 200
				}, {
					title: "内调类型",
					key: "type",
					width: 200
				}, {
					title: "调出分场",
					key: "outPigfen",
					width: 200
				}, {
					title: "单据号",
					key: "fnumber",
					width: 240
				}],
				fileOut: [],
				supRecordColumn: [{ //饲喂记录
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "分场",
					key: "pigfen",
					width: 200
				}, {
					title: "栋舍",
					key: "regnm",
					width: 200
				}, {
					title: "组别",
					key: "group",
					width: 200
				}, {
					title: "批次号",
					key: "bthno",
					width: 200
				}, {
					title: "实际饲喂重量",
					key: "weight",
					width: 200
				}, {
					title: "当日存栏",
					key: "incnt",
					width: 200
				}, {
					title: "实际日均饲喂量",
					key: "avgFeeding",
					width: 200
				}, {
					title: "饲料名称",
					key: "feedName",
					width: 200
				}, {
					title: "标准饲喂品种名称",
					key: "standarName",
					width: 280
				}],
				supRecord: [],
				immRecordColumn: [{ // 免疫记录
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "分场",
					key: "pigfen",
					width: 200
				}, {
					title: "免疫类型",
					key: "immType",
					width: 160
				}, {
					title: "免疫项目",
					key: "immProject",
					width: 200
				}, {
					title: "实际开始日期",
					key: "actStartDate",
					width: 200
				}, {
					title: "实际完成日期",
					key: "actEndDate",
					width: 200
				}, {
					title: "计划完成日期",
					key: "planDate",
					width: 200
				}, {
					title: "相差天数",
					key: "offsetDay",
					width: 120
				}, {
					title: "疫苗分类",
					key: "immCategory",
					width: 150
				}, {
					title: "计量",
					key: "num",
					width: 100
				}, {
					title: "免疫方法",
					key: "method",
					width: 160
				}, {
					title: "实际完成头数",
					key: "factNum",
					width: 240
				}],
				immRecord: [],
				drugUseColumn: [{ // 兽药领用
					title: "业务日期",
					key: "bizdate",
					width: 200
				}, {
					title: "药品名称",
					key: "drugName",
					width: 140
				}, {
					title: "规格",
					key: "model",
					width: 140
				}, {
					title: "计量单位",
					key: "unit",
					width: 140
				}, {
					title: "领用数量",
					key: "num",
					width: 140
				}, {
					title: "当前存栏",
					key: "curcnt",
					width: 140
				}, {
					title: "领料类型",
					key: "pickType",
					width: 140
				}, {
					title: "免疫项目",
					key: "project",
					width: 140
				}, {
					title: "实际成分",
					key: "factPart",
					width: 140
				}, {
					title: "物料分类",
					key: "group",
					width: 140
				}],
				drugUse: [],
				feedUseColumn: [{ // 饲料领用
					title: "业务日期",
					key: "bizdate",
					width: 160
				}, {
					title: "物料名称",
					key: "materialName",
					width: 140
				}, {
					title: "计量单位",
					key: "unit",
					width: 140
				}, {
					title: "领用数量",
					key: "num",
					width: 140
				}, {
					title: "料塔",
					key: "tower",
					width: 160
				}, {
					title: "栋舍",
					key: "regnm",
					width: 160
				}, {
					title: "实际成本",
					key: "factCost",
					width: 140
				}, {
					title: "单据编号",
					key: "fnumber",
					width: 200
				}, {
					title: "仓库",
					key: "wareHouse",
					width: 200
				}],
				feedUse: []
			}
		},
		onLoad(option) {
			self = this
			self.loadingType = 1;
			if (option.id) {
				this.id = `${option.id}=` 
			}
			this.topNav()
			this.getindex(this.pageNum, this.pageSize)
			console.log(this.id)
		},
		onReachBottom() {
			this.loadMore()
		},
		onReady() {
			observer = uni.createIntersectionObserver(this);
			observer.relativeTo('.scroll-view').observe('.data-wrapper', (res) => {
				if (res.intersectionRatio > 0 && !this.appear) {
					this.appear = true;
				} else if (!res.intersectionRatio > 0 && this.appear) {
					this.appear = false; 
				}
			})
		},
		onUnload() {
			if (observer) {
				observer.disconnect()
			}
		},
		watch:{
			currentNavIndex(old,newVal){
				self.loadingType = 1;
				console.log(old,newVal)
				self.pageNum = 1
				self.getindex(self.pageNum, self.pageSize) 
			}
		},
		filters:{
			state(date){
				if(date==0){
					return '保存'
				}else if(date==1){
					return '启用'
				}else if(date==2){
					return '禁用'
				}else{
					return date 
				}
			}
		},
		methods: {
			topNav(){ // 加载头部数据 
				var _this = this;
				let headers = {};
				headers['content-type'] = 'application/json';
					let params = {
						fid:_this.id
					};
				 
				common.commRequest("/CtPigPigBatch/selectAll/1/1", params,headers, 'post',
					function(data) {
						let getData = data.data.list;
						_this.topNav1={
								a:getData[0].fnumber?getData[0].fnumber:'-' , // 批次号
								b:getData[0].cfdays?getData[0].cfdays:'-'  , //   日龄
								c:getData[0].pigtype?getData[0].pigtype:'-' ,// , // 猪只类型
								d:getData[0].buildingarchives?getData[0].buildingarchives:'-'  , //   栋社·
								e:getData[0].filefarmname?getData[0].filefarmname:'-'  , // ·分场
								f:getData[0].cfgenct?getData[0].cfgenct:'-'  , // 当前存栏数
								g:getData[0].cfincnt?getData[0].cfincnt:'-'  , // 批次总头数  
								h:getData[0].cfalldeathqty?getData[0].cfalldeathqty:'-'  , // 死亡数
								i:getData[0].cfalloutqty?getData[0].cfalloutqty:'-'  , //  累计转出数
								j:getData[0].cfallsellqty?getData[0].cfallsellqty:'-'  , // 销售数
								k:getData[0].cfweakqty?getData[0].cfweakqty:'-'  , // 弱崽数
								l:getData[0].cfdeletedstatus?getData[0].cfdeletedstatus:'-'  , // 启用状态 
							},
						console.log(JSON.stringify(getData));
				})
			},
			getindex(pageNum, pageSize) {
				let params,url;
				var _this = this;
				let headers = {};
				let index = _this.currentNavIndex
				// headers['content-type'] = 'application/json';
				if(index==0){
					params = {
						fparentid:_this.id
					};
				}else{
					params = {
						cfpigbatchid:_this.id
					};
				}
				
				switch (index){
					case 0: // 猪只列表
					url = "/CtPigPigBatch/selectByFParentId"
					
						break;
					case 1: //仔猪转入
					url = "/CtPigPigBatch/selectLetPigInByBatchId"
						break;
					case 2: //引种记录
					url = "/CtPigPigBatch/selectYinzhongByBatchId"
						break;
					case 3: //采购记录
					url = "/CtPigPigBatch/selectCaiGouByBatchId"
						break;
					case 4: //肉猪调入
					url = "/CtPigPigBatch/selectFatpigInByBatchId"
						break;
					case 5: //销售记录
					url = "/CtPigPigBatch/selectSalePigInfo"
						break;
					case 6: //肉猪调出
					url = "/CtPigPigBatch/selectFatPigOutByBatchid"
						break;
					case 7: //档案调出
					url = "/CtPigPigBatch/selectFileOutByBatchid"
						break;
					case 8: //饲喂记录
					url = "/CtPigPigBatch/selectSiweiByBatchId"
						break;
					case 9: //免疫记录
					url = "/CtPigPigBatch/selectMainyiByBatchId"
						break;
					case 10: //兽药领用
					url = "/CtPigPigBatch/selectDrugsUseInfo"
						break;
					case 11: //饲料领用
					url = "/CtPigPigBatch/selectSiliaoGetByBatchId"
						break;
				}
				 
				common.commRequest(`${url}/${pageNum}/${pageSize}`, params,headers, 'get',
					function(data) {
						let getData = data.data.list;
						console.log(JSON.stringify(getData));
						if(getData.length == 0){
							_this.loadingType = 2;
							return;
						}
						_this.table(index,getData)
							
						_this.loadingType = 0;
				})
			},
			table(index,getData){
				switch (index){
					case 0: // 猪只列表
					for (var i = 0; i < getData.length; i++) {
						
						this.pigsData.push({// 猪只列表
					index: ++_this.idNum,
					earno: getData[i].fnumber?getData[i].fnumber:'-',
					indno: getData[i].cfindno?getData[i].cfindno:'-',
					regnm: getData[i].buildingarchives?getData[i].buildingarchives:'-',
					status: getData[i].cunlanzhaungtai?getData[i].cunlanzhaungtai:'-'
				})
					}
						break;
					case 1: //仔猪转入
					for (var i = 0; i < getData.length; i++) {
						
						this.pigLetIn.push({// 仔猪调入
					bizDate: getData[i].fbizdate?getData[i].fbizdate:'-',
					earno: getData[i].cfsownonum?getData[i].cfsownonum:'-',
					count: getData[i].matingcount?getData[i].matingcount:'-',
					incnt: getData[i].cfincnt?getData[i].cfincnt:'-',
					ilive: getData[i].cfilive?getData[i].cfilive:'-',
					faawt: getData[i].cffaawt?getData[i].cffaawt:'-',
					avgWeight: getData[i].cfavgwt?getData[i].cfavgwt:'-',
					imale: getData[i].cfimale?getData[i].cfimale:'-',
					ifmal: getData[i].cfifmal?getData[i].cfifmal:'-',
					fnumber: getData[i].fnumber?getData[i].fnumber:'-'
				})
					}
						break;
					case 2: //引种记录
					for (var i = 0; i < getData.length; i++) {
						
						this.importSeed.push({//引种记录
					bizdate: getData[i].yewuriqi?getData[i].yewuriqi:'-',
					weight: getData[i].zongzhongliang?getData[i].zongzhongliang:'-',
					incnt: getData[i].zongtoushu?getData[i].zongtoushu:'-',
					money: getData[i].zongjine?getData[i].zongjine:'-',
					type: getData[i].yinzhongleixing?getData[i].yinzhongleixing:'-',
					fnumber: getData[i].danjubianhao?getData[i].danjubianhao:'-',
					outUnit: getData[i].diaochudanwei?getData[i].diaochudanwei:'-'
				})
					}
						break;
					case 3: //采购记录
					for (var i = 0; i < getData.length; i++) {
						
						this.purRecord.push({// 采购记录
					bizdate: getData[i].fbizdate?getData[i].fbizdate:'-',
					weight: getData[i].cfweght?getData[i].cfweght:'-',
					incnt: getData[i].cfincnt?getData[i].cfincnt:'-',
					money: getData[i].cfmoney?getData[i].cfmoney:'-',
					curday: getData[i].cfinday?getData[i].cfinday:'-',
					fnumber: getData[i].fnumber?getData[i].fnumber:'-',
					fromPigfarm: getData[i].pigarchives?getData[i].pigarchives:'-'
				})
					}
						break;
					case 4: //肉猪调入
					for (var i = 0; i < getData.length; i++) {
						
						this.fatpigIn.push({
					bizdate: getData[i].fbizdate?getData[i].fbizdate:'-',
					weight: getData[i].foutweight?getData[i].foutweight:'-',
					incnt: getData[i].foutqty?getData[i].foutqty:'-',
					money: getData[i].fmoney?getData[i].fmoney:'-',
					curday: getData[i].fpigbatchdays?getData[i].fpigbatchdays:'-',
					fnumber: getData[i].diaochupigfarm?getData[i].diaochupigfarm:'-'
				})
					}
						break;
					case 5: //销售记录
					for (var i = 0; i < getData.length; i++) {
						
						this.saleRecord.push({
					bizdate: getData[i].salecount?getData[i].salecount:'-',
					weight: getData[i].totalweight?getData[i].totalweight:'-',
					outCnt: getData[i].givecount?getData[i].givecount:'-',
					money: getData[i].salepz?getData[i].salepz:'-',
					curday: getData[i].cfpigbatchid?getData[i].cfpigbatchid:'-'
				})
					}
						break;
					case 6: //肉猪调出
					for (var i = 0; i < getData.length; i++) {
						
						this.fatpigOut.push({
					bizdate: getData[i].fbizdate?getData[i].fbizdate:'-',
					weight: getData[i].foutweight?getData[i].foutweight:'-',
					outcnt: getData[i].foutqty?getData[i].foutqty:'-',
					money: getData[i].fmoney?getData[i].fmoney:'-',
					curday: getData[i].fpigbatchdays?getData[i].fpigbatchdays:'-',
					fnumber: getData[i].diaochupigfarm?getData[i].diaochupigfarm:'-'
				})
					}
						break;
					case 7: //档案调出
					for (var i = 0; i < getData.length; i++) {
						
						this.fileOut.push({
					bizdate: getData[i].fbizdate?getData[i].fbizdate:'-',
					earno: getData[i].cfcfarmnumber?getData[i].cfcfarmnumber:'-',
					verity: getData[i].pigpz?getData[i].pigpz:'-',
					weight: getData[i].cfweight?getData[i].cfweight:'-',
					type: getData[i].cftransfertypename?getData[i].cftransfertypename:'-',
					outPigfen: getData[i].dcfield?getData[i].dcfield:'-',
					fnumber: getData[i].fnumber?getData[i].fnumber:'-'
				})
					}
						break;
					case 8: //饲喂记录
					for (var i = 0; i < getData.length; i++) {
						
						this.supRecord.push({
					bizdate: getData[i].ywrq?getData[i].ywrq:'-',
					pigfen: getData[i].filepigfarmname?getData[i].filepigfarmname:'-',
					regnm: getData[i].dongshe?getData[i].dongshe:'-',
					group: getData[i].zubie?getData[i].zubie:'-',
					bthno: getData[i].cfbthno?getData[i].cfbthno:'-',
					weight: getData[i].cffctwt?getData[i].cffctwt:'-',
					incnt: getData[i].cfincnt?getData[i].cfincnt:'-',
					avgFeeding: getData[i].cfactualfeedingdays?getData[i].cfactualfeedingdays:'-',
					feedName: getData[i].bzslpzmc?getData[i].bzslpzmc:'-',
					standarName: getData[i].slmc?getData[i].slmc:'-'
				})
					}
						break;
					case 9: //免疫记录
					for (var i = 0; i < getData.length; i++) {
						
						this.immRecord.push({
					bizdate: getData[i].fbizdate?getData[i].fbizdate:'-',
					pigfen: getData[i].field?getData[i].field:'-',
					immType: getData[i].immunitytype?getData[i].immunitytype:'-',
					immProject: getData[i].immunityitem?getData[i].immunityitem:'-',
					actStartDate: getData[i].cfactualstartdate?getData[i].cfactualstartdate:'-',
					actEndDate: getData[i].cfactualdate?getData[i].cfactualdate:'-',
					planDate:getData[i].cfenddate?getData[i].cfenddate:'-',
					offsetDay: getData[i].cfdiffday?getData[i].cfdiffday:'-',
					immCategory: getData[i].vacvariety?getData[i].vacvariety:'-',
					num: getData[i].cfdosisvalue?getData[i].cfdosisvalue:'-',
					method: getData[i].immuneway?getData[i].immuneway:'-',
					factNum: getData[i].cfcomcnt?getData[i].cfcomcnt:'-'
				})
					}
						break;
					case 10: //兽药领用
					for (var i = 0; i < getData.length; i++) {
						
						this.drugUse.push({
					bizdate: getData[i].fbizdate?getData[i].fbizdate:'-',
					drugName: getData[i].drugsname?getData[i].drugsname:'-',
					model: getData[i].model?getData[i].model:'-',
					unit: getData[i].measureunit?getData[i].measureunit:'-',
					num: getData[i].useqty?getData[i].useqty:'-',
					curcnt: getData[i].cfcurcnt?getData[i].cfcurcnt:'-',
					pickType: getData[i].reveicetype?getData[i].reveicetype:'-',
					project: getData[i].immuneitem?getData[i].immuneitem:'-',
					factPart: getData[i].outlaycost?getData[i].outlaycost:'-',
					group: getData[i].materialgroup?getData[i].materialgroup:'-'
				})
					}
						break;
					case 11: //饲料领用
					for (var i = 0; i < getData.length; i++) {
						
						this.feedUse.push({
					bizdate: getData[i].yewuriqi?getData[i].yewuriqi:'-',
					materialName: getData[i].wuliaomingcheng?getData[i].wuliaomingcheng:'-',
					unit: getData[i].jiliangdanwei?getData[i].jiliangdanwei:'-',
					num: getData[i].lingyongshuliang?getData[i].lingyongshuliang:'-',
					tower: getData[i].liaota?getData[i].liaota:'-',
					regnm: getData[i].dongshe?getData[i].dongshe:'-',
					factCost: getData[i].shijichengben?getData[i].shijichengben:'-',
					fnumber: getData[i].danjubianhao?getData[i].danjubianhao:'-',
					wareHouse: getData[i].cangku?getData[i].cangku:'-'
				})
					}
						break;
				}
				
			},
			back() {
				uni.navigateBack({})
			}, // 滑动底部加载
			// 滑动底部加载
			loadMore() {
				let _this = this;
				_this.loadingType = 1;
				this.getindex(++this.pageNum,this.pageSize)
			},
		}
	}
</script>
<style lang="scss">
	@import "@/common/baseInfo.scss";
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	 
 .navList{
	 top:300rpx;
 }
	.data-wrapper{
		height: 1300rpx;
	}
	
</style>
