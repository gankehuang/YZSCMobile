<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				种猪档案
			</view>
			<view class="right__icon">
				<image @click="qr1" style="margin: 0;" src="../../../static/assets/scan.png" mode="" class="icon"></image>
				<image style="margin-left:25px ;" src="../../../static/assets/search.png" @tap="showFilter" mode="" class="icon"></image>
			</view>
		</view>
		<!-- <view class="flex page__info">
			<text>共{{pageInfo.total}}条,{{ pageNum }}页</text>
			<text>
				每页{{pageInfo.pageSize}}条
				<image src="../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</text>
		</view> -->
		<!-- 表格  -->
		<view class="data__wrapper">
			<ztable stickSide stickSide1 :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler"></ztable>
		</view>
		<!-- 加载  -->
		<view class="uni-tab-bar-loading" @click="loadMore()">
			<uni-load-more :status="status"  :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
		<!-- 弹窗  -->
		<popup-layer ref="popupRef1" :direction="'left'"  :class='{active:active}'>
		   <scroll-view class="draw" scroll-y="true" style="padding-top: 65px;">
			  <draw-cell title="耳牌" >
				<view slot="value" class="bg-gray jus-j">
					<image @click="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image>
					<input type="text" placeholder="请填写" v-model="searchForm.immunePlan" />
				</view>
			  </draw-cell>
			  <draw-cell title="国际码"  >
				<view slot="value" class="bg-gray jus-j">
					<text></text>
					<input type="text" placeholder="请填写" v-model="searchForm.immuneProject" />
				</view>
			  </draw-cell>
			 <!-- <draw-cell title="配种批次" required="true">
			  				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
			  					<text>{{searchForm.vaccineName}}</text>
			  					<uni-icon type="arrowdown" color="#333333" size="18" />
			  				</view>
			  </draw-cell> -->
			  <!-- <draw-cell title="执行人" required="true">
			  				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
			  					<text>{{searchForm.vaccineName}}</text>
			  					<uni-icon type="arrowdown" color="#333333" size="18" />
			  				</view>
			  </draw-cell> -->
			  <!-- <draw-cell title="批次号" required="true">
				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
					<text>{{searchForm.vaccineName}}</text>
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			  </draw-cell> -->
			<!-- <draw-cell title="猪场" required="true">
				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
					<text>{{searchForm.vaccineName}}</text>
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			</draw-cell> -->
			<!-- <draw-cell title="分场" required="true">
				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
					<text>{{searchForm.vaccineName}}</text>
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			</draw-cell> -->
			<!-- <draw-cell title="疫苗名称" required="true">
				<view slot="value" class="bg-gray jus-j" @click="selectPeople">
					<text>{{searchForm.vaccineName}}</text>
					<uni-icon type="arrowdown" color="#333333" size="18" />
				</view>
			</draw-cell> -->
			  <!-- <draw-cell title="状态"  >
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.performMan}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
			  </draw-cell> -->
		   </scroll-view>
		   <view class="submits jus-b">
			   <view class="flexc reset-btn" @click="reset">重置</view>
			   <view class="flexc submit-btn" @click="find">确定</view>
		   </view>
		</popup-layer>
		<!-- 下拉菜单  -->
		<mpvue-picker :themeColor="themeColor" ref="pigPicker" 
		:deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
	<!-- 	<pageSider :pageNum="pageNum" :currentPage="pageInfo.page" ></pageSider> -->
	</view>
</template>

<script>
	//  加载更多 
	import uniLoadMore from '@/components/uni-load-more.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入下拉框
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import ztable from '@/components/z-table/z-table'
	import pageSider from '@/components/pageSider.vue'
	export default {
		components: {
			popupLayer,
			drawCell,
			mpvuePicker,
			ztable,
			pageSider,
			uniIcon,
			uniLoadMore
		},
		onLoad: function(options) {
			this.active = !this.active
		},
		// 下拉刷新
		onPullDownRefresh() {
			let _this = this;
			let tableData = _this.tableData;
			console.log('下拉刷新');
			setTimeout(function() {
				
					tableData.splice(5)
				uni.stopPullDownRefresh();
			}, 1000);
		},
   // 上拉加载
		onReachBottom() {
			this.loadMore()
		},
		data() {
			return {
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
				pickerValueDefault: [0],
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				// 弹窗信息 
				pickerValueArray:[
					{'value':'1111','label':'三泉A区'},
					{'value':'1111','label':'三泉B区'},
					{'value':'1111','label':'三泉C区'},
					{'value':'1111','label':'三泉D区'},
					{'value':'1111','label':'三泉E区'}
				],
				// 选项框默认值 
				searchForm:{
					immunePlan:'',
					immuneProject:'',
				},
				tableData: [{
					id: '123123123',
					index: 1,
					earno: 'YY002',
					sex: '公',
					verty: '大白',
					newBusiness: '调入记录'
				},{
					id: 'asjkld2',
					index: 2,
					earno: 'YY003',
					sex: '母',
					verty: '大白',
					newBusiness: '配种记录'
				},{
					id: 'zxckmhn21',
					index: 3,
					earno: 'YY004',
					sex: '公',
					verty: '大白',
					newBusiness: '死亡记录'
				},{
					id: 'asjkh2',
					index: 4,
					earno: 'YY005',
					sex: '母',
					verty: '大白',
					newBusiness: '调出记录'
				},{
					id: 'asdokuj12op5',
					index: 5,
					earno: 'YY006',
					sex: '公',
					verty: '大白',
					newBusiness: '分娩记录'
				},{
					id: '123123123',
					index: 1,
					earno: 'YY002',
					sex: '公',
					verty: '大白',
					newBusiness: '调入记录'
				},{
					id: 'asjkld2',
					index: 2,
					earno: 'YY003',
					sex: '母',
					verty: '大白',
					newBusiness: '配种记录'
				},{
					id: 'zxckmhn21',
					index: 3,
					earno: 'YY004',
					sex: '公',
					verty: '大白',
					newBusiness: '死亡记录'
				},{
					id: 'asjkh2',
					index: 4,
					earno: 'YY005',
					sex: '母',
					verty: '大白',
					newBusiness: '调出记录'
				},{
					id: 'asdokuj12op5',
					index: 5,
					earno: 'YY006',
					sex: '公',
					verty: '大白',
					newBusiness: '分娩记录'
				}],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				},{
					title: "耳牌/国际码",
					key: "earno",
					width: 200,
				},{
					title: "性别",
					key: "sex",
					width: 100,
				},{
					title: "品种",
					key: "verty",
					width: 200,
				},{
					title: "最新业务",
					key: "newBusiness",
					width: 200,
				}],
				pageInfo: {
					page: 1,
					pageSize: 50,
					total: 2000,
				}
			}
		},
		methods: {
			qr(){
				this.scancode()
			},
			qr1(){
				this.scancode()
			},
			// 重置 
			reset(){
				this.searchForm.immunePlan=''
				this.searchForm.immuneProject=''
			},
			// 查询 
			find(){
				this.$refs.popupRef1.close() // 关闭弹窗  
			},
			// 滑动底部加载
			loadMore() {
				let _this = this;
				let tableData = _this.tableData;
				_this.loadingType = 1;
				setTimeout(() => {
					let li = {
					id: '123123123',
					index: 1,
					earno: 'YY002',
					sex: '公',
					verty: '大白',
					newBusiness: '调入记录'
				};
					tableData.push(li);
					tableData.push(li);
					tableData.push(li);
					tableData.push(li);
					tableData.push(li);
				}, 300);
				setTimeout(() => {
					_this.loadingType = 0;
				}, 500);
			},
			onConfirmPig(){},
			selectPeople(){ // 下拉菜单 
				this.$refs.pigPicker.show()
			},
			showFilter(){
				this.$refs.popupRef1.show();
			},
			rowTapHandler (row) {
				uni.navigateTo({
					url: `/pages/archives/boarInfo/boarDetail/boarDetail?id=${row.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			back () {
				uni.navigateBack({
				})
			}
		},
		computed: {
			pageNum () {
				return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
			}
		}
	}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	@import "../../../common/dataCollection.scss";
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
		padding: 0 10rpx;
	}
	
</style>
