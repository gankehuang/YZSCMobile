<template>
	<view class="content">
		<uni-nav-bar id="nav_bar" title="控制台" color="#ffffff" :fixed="true" :statusBar="true" backgroundColor="#447EEF" />

		<!-- 导航栏 -->
		<!-- 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素 -->
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
										<!-- 							1 -->
			<view v-for="(tab,index) in tabBars" :key="tab.id" @click="ontabtap" :data-id="tab.id" :id="tab.id" :data-current="index" class="nav__list">
				<view class="nav__item" :class="{'active1': tabIndex == index}">
					<text class="nav__item__text">{{tab.name}}</text>
					<view class="nav__item__line"></view>
				</view>
			</view> 
		</scroll-view>
		<view class="line-h"></view>
		<!-- 		当前所在滑块的 index 												滑动动画时长 		1-->
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1;height:100%;" :duration="300" @change="ontabchange">
					<swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
						<scroll-view class="scroll-v list" scroll-y @scrolltolower="loadMore(index1)">
							<!-- 下拉加载 -->
							<!-- #ifdef APP-PLUS-NVUE  --> 
							<refresh class="refresh" @refresh="onrefresh(index1)" @pullingdown="onpullingdown" :display="tab.refreshing ? 'show' : 'hide'">
								<div class="refresh-view" style="display: none;">
									<image class="refresh-icon" :src="refreshIcon" :style="{width: (tab.refreshing || pulling) ? 0: '32px'}" :class="{'refresh-icon-active': tab.refreshFlag}"></image>
									<image class="loading-icon" :src="loadingIcon" v-if="tab.refreshing"></image>
									<text class="loading-text">{{tab.refreshText}}</text>
								</div>
							</refresh>
							<!-- #endif --> 
							<view class="g-container">
								<block v-for="(newsitem, index3) in tab.data[index1]" :key="newsitem.id">
									<view class="g-box"  @tap.stop="jumpTask" :data-key="newsitem.title" :data-jumpurl="newsitem.jumpurl">
									<view class="g-box-content" style="position: relative;">
										<image :src="newsitem.url" class="g-image"  />
										<image @tap.stop="change" :data-title="newsitem.title" v-show="falg" :src="changeurl(newsitem.title)"  style="height: 30rpx;width: 30rpx; position: absolute;top: 8rpx;right: 8rpx;" />
										<view class="g-title" >{{newsitem.title}}</view>
									</view></view> 
								</block>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>


	</view>
</template>

<script>
	import tuiSticky from "@/components/sticky/sticky"
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	// 缓存每页最多
	const MAX_CACHE_DATA = 50;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;
	
	export default {
		components: {
			uniNavBar,
			tuiSticky
		},
		data() {
			return {
				changeURL:1, 
				fixTop: 0, //吸顶离顶部距离1
				scrollTop: 0, // scroll-view组件 距离顶部距离，点击tab时间置顶使用
				tabIndex: 0,
				currentTab: 0,
				scrollLeft: 0,
				scrollInto: "",
				cacheTab: [],
				manageMode: false,
				falg:false,
				newsList: [],
				tabData: 'tabDatabaseDoc',
				myUsualUses: [
					{
						title: "种猪档案",
						url: "/static/consoleIcon/archives/boarInfo.png",
						jumpurl: '/pages/archives/boarInfo/boarInfo'
					},
					{
						title: "批次档案",
						url: "/static/consoleIcon/archives/pigBatch.png",
						jumpurl: '/pages/archives/pigBatch/pigBatch'
					},
					{
						title: "配种批次",
						url: "/static/consoleIcon/archives/matingInfo.png",
						jumpurl: '/pages/archives/matingBatch/matingInfo'
					},
				],
				tabBars: [
					{
						name: '基本档案',
						id: 'baseDoc',
					}, {
						name: '数据采集',
						id: 'dataColect',
					}, {
						name: '业务申请',
						id: 'busApply',
					}, {
						name: '物质领用',
						id: 'material_rec',
					}, {
						name: '批次任务单',
						id: 'batchTask',
					}
					// , {
					// 	name: '管理标准化',
					// 	id: 'managestandard',
					// }
					, {
						name: '生物安全',
						id: 'bio_safe',
					}, {
						name: '盘点',
						id: 'inventory',
					}, {
						name: '业务调整',
						id: 'busChange',
					}, {
						name: '健康管理',
						id: 'healthManage',
					}, {
						name: '饲喂管理',
						id: 'feedManage',
					}, {
						name: '车辆管理',
						id: 'carManage',
					},
				],
			}


		},
		onLoad() {
			this.tabBars.forEach((tabBar) => {
				this.newsList.push({
					data: [ [{
				title: "种猪档案",
				url: "/static/consoleIcon/archives/boarInfo.png",
				jumpurl: '/pages/archives/boarInfo/boarInfo'
			},
			{
				title: "批次档案",
				url: "/static/consoleIcon/archives/pigBatch.png",
				jumpurl: '/pages/archives/pigBatch/pigBatch'
			},
			{
				title: "配种批次",
				url: "/static/consoleIcon/archives/matingInfo.png",
				jumpurl: '/pages/archives/matingBatch/matingInfo'
			},
		],
		[{
				title: "精液检测",
				url: "/static/consoleIcon/dataCollection/semenTest.png",
				jumpurl: '/pages/dataCollection/semenTest/semenNew'
			},
			{
				title: "妊娠记录",
				url: "/static/consoleIcon/dataCollection/pregnancyRecord.png",
				jumpurl: '/pages/dataCollection/pregnancyRecord/pregnancyNew'
			},
			{
				title: "配种记录",
				url: "/static/consoleIcon/dataCollection/breedRecord.png",
				jumpurl: '/pages/dataCollection/breedRecord/breedNew'
			},
			{
				title: "分娩记录",
				url: "/static/consoleIcon/dataCollection/birthRecord.png",
				jumpurl: '/pages/dataCollection/birthRecord/birthNew'
			},
			{
				title: "发情记录",
				url: "/static/consoleIcon/dataCollection/ruttingRecord.png",  
				jumpurl: '/pages/dataCollection/ruttingRecord/ruttingNew'
			},
			{
				title: "生产猪转群",
				url: "/static/consoleIcon/dataCollection/pigProduction.png",
				jumpurl: '/pages/dataCollection/pigProduction/productionNew'
			},
			{
				title: "死亡记录",
				url: "/static/consoleIcon/dataCollection/deathRecord.png",
				jumpurl: '/pages/dataCollection/deathRecord/deathNew'
			},
			{
				title: "断奶记录",
				url: "/static/consoleIcon/dataCollection/weaningRecord.png",
				jumpurl: '/pages/dataCollection/weaningRecord/weaningNew'
			},
			{
				title: "批次猪转舍",
				url: "/static/consoleIcon/dataCollection/batchPig.png",
				jumpurl: '/pages/dataCollection/batchPig/batchPigNew'
			},
			{
				title: "异常猪管理",
				url: "/static/consoleIcon/dataCollection/abnormalPig.png",
				jumpurl: '/pages/dataCollection/abnormalPig/abnormalPigNew'
			},
			{
				title: "后备猪健康",
				url: "/static/consoleIcon/dataCollection/reservePig.png",
				jumpurl: '/pages/dataCollection/reservePig/reservePigNew'
			},
			{
				title: "不发情备猪",
				url: "/static/consoleIcon/dataCollection/anestrus.png",
				jumpurl: '/pages/dataCollection/anestrus/anestrusNew'
			},
			{
				title: "淘汰申请",
				url: "/static/consoleIcon/dataCollection/eliminate.png",
				jumpurl: '/pages/dataCollection/eliminate/eliminateNew'
			}
		],
		[
			{
				title: "药品申请",
				url: "/static/consoleIcon/bizApplication/drug.png",
				jumpurl: '/pages/bizApplication/drug/drugApplication'
			},
			{
				title: "采购申请",// 蓝湖采购入库
				url: "/static/consoleIcon/bizApplication/purchase.png",
				jumpurl: '/pages/bizApplication/purchase/warehouseNew'
			}
		],
		[{
				title: "精液领用",
				url: "/static/consoleIcon/receive/semen.png",
				jumpurl: '/pages/receive/semen/semenReceiveAudit'
			},
			{
				title: "药品领用",
				url: "/static/consoleIcon/receive/drug.png",
				// jumpurl: '/pages/receive/drug/applyFor'
			},
			{
				title: "饲料领用",
				url: "/static/consoleIcon/receive/feed.png"
			},
			{
				title: "低值领用",
				url: "/static/consoleIcon/receive/lowValue.png",
				// jumpurl: '/pages/receive/lowValue/select'
			}
		],
		[{
				title: "后备",
				url: "/static/consoleIcon/batchTask/reserve.png",
				jumpurl: "/pages/batchTask/reserve/matchPregnant"
			},
			{
				title: "公猪站",
				url: "/static/consoleIcon/batchTask/boarsStation.png",  
				jumpurl: "/pages/batchTask/boarsStation/matchPregnant"
			},
			{
				title: "配怀",
				url: "/static/consoleIcon/batchTask/matchPregnant.png",
				jumpurl: '/pages/batchTask/matchPregnant/matchPregnant'
			},
			{
				title: "分娩",
				url: "/static/consoleIcon/batchTask/childbirth.png",
				jumpurl: '/pages/batchTask/childbirth/matchPregnant'
			},
			{
				title: "保育",
				url: "/static/consoleIcon/batchTask/childCare.png",  
				jumpurl: '/pages/batchTask/childCare/matchPregnant'
			},
			{
				title: "育肥",
				url: "/static/consoleIcon/batchTask/fatten.png",
				jumpurl: '/pages/batchTask/fatten/matchPregnant'
			}
		],
		[
			{
				title: "人",
				url: "/static/consoleIcon/biosafety/people.png",
				jumpurl: '/pages/biosafety/people/people'
			},{
				title: "物",
				url: "/static/consoleIcon/biosafety/matter.png",
				jumpurl: '/pages/biosafety/matter/matter'
			},{
				title: "车",
				url: "/static/consoleIcon/biosafety/car.png",
				jumpurl: '/pages/biosafety/car/car'
			},
			{
				title: "场外巡检",
				url: "/static/consoleIcon/biosafety/outsideInspect.png"
			},
			{
				title: "场内巡检",
				url: "/static/consoleIcon/biosafety/insideInspect.png",
				jumpurl: '/pages/biosafety/insideInspect/insideInspectGroup'
			}
		],
		 [{
				title: "药品盘点",
				url: "/static/consoleIcon/stock/material.png",
				// jumpurl: "/pages/stock/material/material"
			},
			{
				title: "猪只盘点",
				url: "/static/consoleIcon/stock/pig.png",
				jumpurl: "/pages/stock/pig/pig"
			},
			{
				title: "饲料盘点",
				url: "/static/consoleIcon/stock/feed.png",
				// jumpurl:"/pages/stock/feed"
			},
			{
				title: "低值品盘点",
				url: "/static/consoleIcon/stock/lowValue.png",
				// jumpurl:"/pages/stock/lowValue"
			},
			{
				title: "食堂盘点",
				url: "/static/consoleIcon/stock/diningHall.png",
				// jumpurl: "/pages/stock/diningHall"
			}
		],
		 [{
				title: "个体信息",
				url: "/static/consoleIcon/businessAdjustment/personalData.png",
				jumpurl: '/pages/businessAdjustment/personalData/personalDataNew'
			},
			{
				title: "猪群等级",
				url: "/static/consoleIcon/businessAdjustment/gradePig.png",
				jumpurl: '/pages/businessAdjustment/gradePig/gradePigNew'
			}
		],
		 [{
				title: "免疫计划",
				url: "/static/consoleIcon/health/immunizationPlan.png",
				jumpurl: '/pages/health/immunizationPlan/immunizationPlanList'
			},
			{
				title: "免疫记录",
				url: "/static/consoleIcon/health/immunizationRecord.png",
				jumpurl: '/pages/health/immunizationRecord/immunizationRecord'
			},
			// {
			// 	title: "免疫调整",
			// 	url: "/static/consoleIcon/health/immunizationAdjust.png",
			// 	jumpurl: '/pages/health/immunizationPlan/immunizationAdjust'
			// },
			{
				title: "空瓶回收",
				url: "/static/consoleIcon/health/recyclingBottle.png",
				jumpurl: '/pages/health/recyclingBottles/recyclingBottlesHistory'
			}
		],
		 [{
				title: "测膘调料",
				url: "/static/consoleIcon/freed/fatMeasurement.png",
				jumpurl: '/pages/freed/fatMeasurement/measurementRecord'
			},
			
			{
				title: "称重管理",
				url: "/static/consoleIcon/freed/weighing.png"
			}
		],
		[{
				title: "车辆备案",
				url: "/static/consoleIcon/vehicle/vehicleManagement.png"
			},
			{
				title: "过磅",
				url: "/static/consoleIcon/vehicle/vehicleWeighing.png"
			}]
		]            																		
				});
			});
			
			
		},
		onShow() {  //页面打开
			const _this = this;
			uni.getStorage({
				key: 'falg',
				success: function (res) {
					//console.log(res.data);
					_this.falg = res.data;
				}
			});
		},
		onHide() {  //页面关闭
			const myUsualUses = this.myUsualUses;
			uni.setStorage({
				key: 'myUsualUses',
				data: myUsualUses
			});
		},
		
		methods: { 
			change(title1){
				let title = title1.currentTarget.dataset.title
				//console.log(title)
				let src = this.myUsualUses.find(item=>{
					return item.title == title
				})
				let index;
				if(src){ // sub
					index = this.myUsualUses.findIndex(item=>{
						return item.title == title
					})
					this.myUsualUses.splice(index,1)
				}else{ // add 
					let often;
					for(let i=0;i<this.newsList[0].data.length;i++){
						let a = this.newsList[0].data[i]
						for(let j =0; j<a.length; j++) {
							//console.log(title)
							if(a[j].title == title){
								this.myUsualUses.push(a[j])
								break;
							}
						}
						
						// often = this.newsList[0].data[i].find(item=>{
						// 	return item.title == title
						// })
						// 
						// if(often) break 
					}
					//console.log(often)
					
				}
			},
			sub(index){
				this.myUsualUses.splice(index,1)
			},
			changeurl(title){
				let src = this.myUsualUses.find(item=>{
					return item.title == title
				})
				
				if(src) return '/static/sub.png'
				else return '/static/add.png'
			},
			changeMode() {
				this.falg = !this.falg;
			},
			jumpTask(e) {
				if(this.falg) return  
				let key = e.currentTarget.dataset.key;
				let jumpurl = e.currentTarget.dataset.jumpurl;
				if (jumpurl) {
					uni.navigateTo({
						url: jumpurl + '?searchKey=' + key
					})
				} else {
					uni.showToast({
						title: "功能开发中！",
						icon: 'none'
					});
				}
			},
			getList(index) {
				let activeTab = this.newsList[index];
				let tabData = this.tabData;
				let list = [];
				list.push(newsData[tabData])
				activeTab.data = activeTab.data.concat(list);
			},
			loadMore(e) {
				//setTimeout(() => {
					this.getList(this.tabIndex);
				//}, 500)
			}, 
			async ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.tabData = "tabData" + e.currentTarget.dataset.id;
				this.switchTab(index);
			},
			async ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			
				
			},
			async switchTab(index) {
				if (this.newsList[index].data.length === 0) {
					this.getList(index);
				}
				if (this.tabIndex === index) {
					return;
				}
				// 缓存 tabId
				if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
					let isExist = this.cacheTab.indexOf(this.tabIndex);
					if (isExist < 0) {
						this.cacheTab.push(this.tabIndex);
						//console.log("cache index:: " + this.tabIndex);
					}
				}
				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;

				// 释放 tabId
				if (this.cacheTab.length > MAX_CACHE_PAGE) {
					let cacheIndex = this.cacheTab[0];
					this.clearTabData(cacheIndex);
					this.cacheTab.splice(0, 1);
				}
			},
			clearTabData(e) {
				this.newsList[e].data.length = 0;
				this.newsList[e].loadingText = "加载更多...";
			},
			refreshData() {},
			onrefresh(e) {
				var tab = this.newsList[this.tabIndex];
				if (!tab.refreshFlag) {
					return;
				}
				tab.refreshing = true;
				tab.refreshText = "正在刷新...";

				setTimeout(() => {
					this.refreshData();
					this.pulling = true;
					tab.refreshing = false;
					tab.refreshText = "已刷新";
					setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
						this.pulling = false;
					}, 500);
				}, 2000);
			},
			onpullingdown(e) {
				var tab = this.newsList[this.tabIndex];
				if (tab.refreshing || this.pulling) {
					return;
				}
				if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
					tab.refreshFlag = true;
					tab.refreshText = "释放立即刷新";
				} else {
					tab.refreshFlag = false;
					tab.refreshText = "下拉可以刷新";
				}
			}
		}
	}
</script>


<style lang="scss">
	$text—gray: #ABABAB;
	$pageBg:#EFF6F9;
	$headBg:#2D70F5;
	$margin_content:20rpx;

	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	

	// 状态栏
	.status_bar {
		height: 128rpx;
		width: 100%;
		position: fixed;
		z-index: 99999;

		.status {
			position: relative;

			.icon-back {
				position: absolute;
				top: 50%;
				margin-top: -26rpx;
				padding-left: 40rpx;
				width: 10%;
			}

			&__bg {
				width: 100%;
			}

			&__title {
				font-family: PingFangSC-Semibold;
				font-size: 32rpx;
				color: #FFFFFF;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -30rpx;
				margin-left: -68rpx;
			}
		}
	}

	/* #endif */

	.content {
		width: 100%;
		height: 80%;
		background: $pageBg;
		padding-bottom: 100px;
	}

	.scroll-h {
		display: flex;
		width: 100%;
		flex-direction: row;
		white-space: nowrap;
	}

	.nav__list {
		flex: 1;
		padding: 10upx 0;
		box-sizing: border-box;
		letter-spacing: 5upx;
		text-indent: 1upx;
		display: inline-block;
		align-items: flex-end;

		.nav__item {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			font-size: 14px;
			margin: 0 30rpx;
			width: fit-content;
			white-space: nowrap;

			&.active1 {
				.nav__item__text {
					color: #2C71F5;
				}

				.nav__item__line {
					height: 6rpx;
					background-color: #2C71F5;
					border-radius: 4rpx;
					transition: all .6s;
					width: 50rpx;
					margin-bottom: 5px;
				}
			}

			.nav__item__text {
				transition: all .1s;
				color: #4D4D4D;
			}
		}
	}

	.uni-tab-item-title {
		color: #4D4D4D;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.class-box {}

	.class-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 0rpx;
	}

	.class-name {
		font-size: 30upx;
		color: #4D4D4D;
		font-weight: bold;
	}

	.g-container {
		/* padding-top: 20upx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {

		width: 25%;
		text-align: center;
	}

	.g-box-content {
		margin: 10rpx;
		margin-bottom: 20rpx;
		// background: #F5F5F5;
	}

	.g-image {
		width: 100rpx;
		height: 100rpx;
		margin-top: 10rpx;
	}

	.g-title {
		color: #4D4D4D;
		font-size: 13px;
		font-family: PingFang SC Regular;
		font-weight: Regular;
		
		line-height: 1.6;
	}

	.swiper-item {

		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
</style>