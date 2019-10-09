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
		<!-- <view class="flex page__info">
			<text>共{{pageInfo.total}}条,{{ pageNum }}页</text>
			<text>
				每页{{pageInfo.pageSize}}条
				<image src="../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</text>
		</view> -->
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
						<input type="text" placeholder="请填写" v-model="searchForm.vaccineName" />
					</view>
				</draw-cell>
				<draw-cell title="猪只类型" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				</draw-cell>
				<draw-cell title="日龄"  >
					<view slot="value" class="bg-gray jus-j">
						<input type="text" placeholder="请填写" v-model="searchForm.immuneProject" />
					</view>
				</draw-cell>
				<draw-cell title="舍栋" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				</draw-cell>
				<draw-cell title="分厂" required="true">
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.vaccineName}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
					</view>
				</draw-cell>
				<draw-cell title="批次状态"  >
					<view slot="value" class="bg-gray jus-j" @click="selectPeople">
						<text>{{searchForm.performMan}}</text>
						<uni-icon type="arrowdown" color="#333333" size="18" />
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
		<!-- 分页 -->
		<!-- <PageSider :pageNum="pageNum" :currentPage="pageInfo.page" ></PageSider> -->
	</view>
</template>

<script>
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
				active:true,
				themeColor: '',
				deepLength: 0,
				pickerValueDefault: [1],
				
				status: 'more',
				tableData: [   //表格数据
					{
						id: '123123123',
						index: 1,
						pigtype: '哺乳仔猪',
						bathno: '0024',
						incnt: '201',
						curday: '24',
						regnm: '育肥舍2栋'
					},{
						id: '1231232423',
						index: 1,
						pigtype: '哺乳仔猪',
						bathno: '00252',
						incnt: '201',
						curday: '554',
						regnm: '育肥舍2栋'
					},{
						id: '1231232423',
						index: 1,
						pigtype: '哺乳仔猪',
						bathno: '00252',
						incnt: '201',
						curday: '554',
						regnm: '育肥舍2栋'
					},{
						id: '1231232423',
						index: 1,
						pigtype: '哺乳仔猪',
						bathno: '00252',
						incnt: '201',
						curday: '554',
						regnm: '育肥舍2栋'
					}
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
						width: 100,
					},{
						title: "数量",
						key: "incnt",
						width: 200,
					},{
						title: "日龄",
						key: "curday",
						width: 100,
					},{
						title: "存栏位置",
						key: "regnm",
						width: 150,
					}
				],
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				pickerValueArray:[   //抽屉弹出层下拉框数据
					{'value':'1111','label':'三泉A区'},
					{'value':'1111','label':'三泉B区'},
					{'value':'1111','label':'三泉C区'},
					{'value':'1111','label':'三泉D区'},
					{'value':'1111','label':'三泉E区'}
				],
				searchForm:{   //检索字段值
					vaccineName:'',   //批次号
					immuneProject:'',
				},
				// pageInfo: {
				// 	page: 1,
				// 	pageSize: 50,
				// 	total: 2000,
				// }
			}
		},
		onReachBottom() {
			this.loadMore()
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
		methods: {
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
				let tableData = _this.tableData;
				_this.loadingType = 1;
				setTimeout(() => {
					let getData = [
						{
							id: '2222222',
							index: 1,
							pigtype: '哺乳仔猪',
							bathno: '0026',
							incnt: '201',
							curday: '24',
							regnm: '育肥舍2栋'
						},
						{
							id: '333333',
							index: 2,
							pigtype: '哺乳仔猪',
							bathno: '0027',
							incnt: '201',
							curday: '24',
							regnm: '育肥舍3栋'
						},
						{
							id: '333333',
							index: 3,
							pigtype: '哺乳仔猪',
							bathno: '0027',
							incnt: '201',
							curday: '24',
							regnm: '育肥舍3栋'
						},
						{
							id: '333333',
							index: 4,
							pigtype: '哺乳仔猪',
							bathno: '0027',
							incnt: '201',
							curday: '24',
							regnm: '育肥舍3栋'
						},
						{
							id: '333333',
							index: 5,
							pigtype: '哺乳仔猪',
							bathno: '0027',
							incnt: '201',
							curday: '24',
							regnm: '育肥舍3栋'
						},
						{
							id: '333333',
							index: 6,
							pigtype: '哺乳仔猪',
							bathno: '0027',
							incnt: '201',
							curday: '24',
							regnm: '育肥舍3栋'
						},
						{
							id: '333333',
							index: 7,
							pigtype: '哺乳仔猪',
							bathno: '0027',
							incnt: '201',
							curday: '24',
							regnm: '育肥舍3栋'
						}
					];
					let newData = tableData.concat(getData);
					_this.tableData = newData;
				}, 300);
				
				setTimeout(() => {
					_this.loadingType = 0;
				}, 500);
			},
			showFilter(){
				this.$refs.popupRef1.show();
			},
			selectPeople(){ // 下拉菜单 
				
				this.$refs.pigPicker.show()
			},
			reset(){   // 重置 
				this.searchForm.vaccineName=''
				this.searchForm.immuneProject=''
			},
			find(){  // 查询 
				this.$refs.popupRef1.close() // 关闭弹窗  
			},
			onConfirmPig(e){
				const _this = this;
				_this.searchForm.vaccineName = e.label;
				console.log(e)
				
			},
		},
		computed: {
			// pageNum () {
			// 	return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
			// }
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
