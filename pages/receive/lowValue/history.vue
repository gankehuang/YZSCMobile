<template>
	<view class="semen">
		<view class="semen-seach ali-c">
			<input class="seach-input" type="text" value="" placeholder="请输入查询内容"/>
		</view>
		<view class="flex page__info">
			<text>已选6条,共2492条,50页</text>
			<text>
				每页50条
				<image src="/static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
			</text>
		</view>	
		<view class="data__wrapper">
			<ztable :tableData="tableData" :columns="columns" :neddCheck="false" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
		</view>
		<view class="confirm-btn">
			<button type="primary">确定</button>
		</view>
		<PageSider :pageNum="pageNum" :currentPage="pageInfo.page" @selectPage="selectPage"></PageSider>
		<popup-layer ref="popupRef" :direction="'right'">
		    <list-page
			 @selectPages="selectPages"
			 >
			 </list-page>
		</popup-layer>
		<popup-layer ref="popupScreen" :direction="'left'">
		   <view class="screening">
		   	<view class="title">
		   		单据编号
		   	</view>
						<view class="s-input">
							<input type="text" v-model="formScreen.dnumber" placeholder="请输入内容"/>
						</view>
						<view class="title">
							领用日期
						</view>
						<view class="jus-b date">
							<view class="jus-j start-date date-wrap">
								<input type="text" v-model="formScreen.startDate" disabled="disabled"/>
								<image src="/static/assets/date-icon.png" mode=""></image>
							</view>
							<text class="line">—</text>
							<view class="jus-j end-date date-wrap">
								<input type="text" v-model="formScreen.endDate" disabled="disabled"/>
								<image src="/static/assets/date-icon.png" mode=""></image>
							</view>
						</view>
						<view class="title">
							低值物料名称
						</view>
						<view class="s-input jus-j" @tap="useTime">
							<input type="text" v-model="formScreen.useTime" placeholder="请选择" disabled/>
							<image src="/static/assets/arrow-down-gray.png" mode=""></image>
						</view>
						<view class="title">
							分场
						</view>
						<view class="s-input jus-j" @tap="screenPigClub">
							<input type="text" v-model="formScreen.pigClub" placeholder="请选择" disabled/>
							<image src="/static/assets/arrow-down-gray.png" mode=""></image>
						</view>
						<view class="title">
							组别
						</view>
						<view class="s-input jus-j" @tap="screenPigClub">
							<input type="text" v-model="formScreen.pigClub" placeholder="请选择" disabled/>
							<image src="/static/assets/arrow-down-gray.png" mode=""></image>
						</view>
						<view class="title">
							仓库
						</view>
						<view class="s-input jus-j">
							<input type="text" v-model="formScreen.dnumber" placeholder="请选择" disabled/>
							<image src="/static/assets/arrow-down-gray.png" mode=""></image>
						</view>
						<view class="title">
							单据状态
						</view>
						<view class="s-input jus-j">
							<input type="text" v-model="formScreen.dnumber" placeholder="请选择" disabled/>
							<image src="/static/assets/arrow-down-gray.png" mode=""></image>
						</view>
						
						<view class="flex s-btn">
							<view class="s-reset btn flexc">
								重置
							</view>
							<view class="s-submit btn flexc">
								提交
							</view>
						</view>
						<!-- 物料名称弹框 -->
						<mpvue-picker :themeColor="themeColor" ref="useTimePicker"
						:deepLength="1" :pickerValueDefault="pickerValueDefault"
						 @onConfirm="onConfirmTime" :pickerValueArray="useTimeArray"></mpvue-picker>
						 <!-- 分场弹框 -->
						 <mpvue-picker :themeColor="themeColor" ref="sPicker"
						 :deepLength="1" :pickerValueDefault="pickerValueDefault"
						  @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
		   </view>
		</popup-layer>
	</view>
</template>

<script>
	import ztable from '@/components/z-table/z-table'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import PageSider from '@/components/pageSider.vue'
	// 引入弹框组件
	import popupLayer from '@/components/popup/popup-layer.vue';
	// 引入page组件
	import listPage from '@/components/popup-list-page';
	export default {
		data() {
			return {
				formScreen:{
					startDate:'2019-6-14',
					endDate:'2019-07-18',
					useTime:'',
					pigClub:''
				},
				pickerValueArray:[
					{'value':'1111','label':'三泉A区'},
					{'value':'1111','label':'三泉B区'},
					{'value':'1111','label':'三泉C区'},
					{'value':'1111','label':'三泉D区'},
					{'value':'1111','label':'三泉E区'},
				],
				useTimeArray:[
					{'value':'shangwu','label':'防火手套'},
					{'value':'xiawu','label':'防火卫衣'},
				],
				tableData: [
					{
							id:'222',
							index: 5,
							date: '2019-10-22',
							useType: '11',
							isOutsourcing:'是',
							pigPub: '大白',
							senmenName:'维生素C',
							invoiceType:'正常',
							checked:false
						}],
					columns: [{
						title: "序号",
						key: "index",
						width: 70,
					},{
						title: "申请日期",
						key: "date",
						width: 200,
					},{
						title: "领料类型",
						key: "useType",
						width: 100,
					},{
						title: "分场",
						key: "pigPub",
						width: 200,
					},{
						title: "组别",
						key: "isOutsourcing",
						width: 100,
					},{
						title: "物料名称",
						key: "senmenName",
						width: 200,
					},{
						title: "单据状态",
						key: "invoiceType",
						width: 100,
					}],
					pageInfo: {
						page: 1,
						pageSize: 50,
						total: 2000,
					},
					boolShow:false,
				}
				
		},
		components: {
			ztable,
			PageSider,
			popupLayer,
			listPage,
			mpvuePicker
		},
		methods: {
			rowTapHandler (row) {
				console.log(`row click from boarinfo ${JSON.stringify(row)}`)
			},
			checkbox(e) {
				console.log(e.detail.value)//id
			},
			//选页
			selectPage() {
				this.$refs.popupRef.show();
			},
			selectPages(e) {
				console.log(e)
			},
			// 精液使用时间弹出框
			useTime() {
				this.$refs.useTimePicker.show()
			},
			onConfirmTime(e) {
				this.formScreen.useTime = e.label;
			},
			// 筛选选择分场
			screenPigClub() {
				this.$refs.sPicker.show()
			},
			onConfirmPig(e) {
				this.formScreen.pigClub = e.label;
			}
		},
		computed: {
			pageNum () {
				return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
			}
		},
		//点击头部
		onNavigationBarButtonTap(e){
			this.$refs.popupScreen.show();
		}
	}
</script>

<style lang="scss">
	.semen-seach {
		height: 88upx;
		background-color: #5089F9;
		.seach-input {
			width: 680upx;
			height: 60upx;
			font-size: 20upx;
			padding-left: 16upx;
			margin-left: 20upx;
			background-color: #ffffff;
			border-radius: 10upx;
		}
	}
	.confirm-btn {
		width: 520upx;
		margin: 22upx auto;
	}
	.page__info{
		height: 60upx;
		align-items: center;
		font-size: 24upx;
		justify-content: space-between;
		margin: 10upx 0 0;
		color: #7A7A7A;
		padding: 0 20upx;
	}
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	.screening {
		width: 520upx;
		height: 100%;
		background-color: #FFFFFF;
		padding: 20upx 40upx;
		.title {
			margin-top: 40upx;
			color: #4D4D4D;
			font-weight: 600;
		}
		.s-input{
			height: 68upx;
			background-color: #f6f6f6;
			margin-top: 10upx;
			padding: 0 20upx;
			input{
				height: 100%;
				font-size: 24upx;
			}
			image {
				width: 26upx;
				height: 14upx;
			}
		}
		.date {
			height: 68upx;
			margin-top: 10upx;
			.line {
				color: #757575;
			}
			.date-wrap {
				background-color: #f6f6f6;
				width: 192upx;
				padding: 0 18upx;
				image {
					width: 40upx;
					height: 40upx;
				}
				input{
					height: 100%;
					font-size: 24upx;
				}
			}
		}
		.s-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 600upx;;
			height: 88upx;
			overflow: hidden;
			border-top: 2upx solid #F5F5F5;
			.btn {
				width: 50%;
				font-size: 32upx;
				font-weight: 600;
				&.s-submit {
					background-color: #4684EA;
					color: #fff;
				}
				&.s-reset {
					background-color: #fff;
					
				}
			}
		}
	}
</style>
