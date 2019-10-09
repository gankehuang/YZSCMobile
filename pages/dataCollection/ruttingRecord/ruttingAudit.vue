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
					发情记录审批
				</view>
				<view class="status-del">
					操作记录
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
								发情日期
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="2017-07-23" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								诱情人员
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="PC201365" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								诱情公猪
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="1栋2单元" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="DD0001" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								第一次发情<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入原精量" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								第二次发情<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入颜色" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								存栏位置<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入气味" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								是否宜配种<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<label class="checkbox">
									<checkbox value="" checked="true" />
								</label>
							</view>
						</view>
						
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								提交人
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="张三" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field no-bottom">
							<view class="main-wrap-contetnt-item-field-name">
								提交时间
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="2019-12-02" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="editor-title jus-j form-seat">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>发情明细</text>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list list-table">
			<view class="data__wrapper">
				<ztable stickSide stickSide1 :tableData="tableData" :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view>
		
		
		<view class="submits jus-b">
			<button type="primary" class="flexc submit-btn">退回</button>
			<button type="primary" class="flexc add-btn">审核</button>
		</view>
	</view>

</template>

<script>
	import ztable from '@/components/z-table/z-table'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: ['请选择配种时段', '美国', '巴西', '日本'],
				array1: ['张三', '美国', '巴西', '日本'],
				array2: ['请选择转入位置', '分娩舍1栋1单元', '分娩舍1栋2单元', '分娩舍1栋3单元', '分娩舍1栋4单元'],
				array3: ['请选择配种批次', 'PC-201365', 'PC-201565', 'PC-201355', 'PC-201360'],
				index: 0,
				date: currentDate,
				tableData: [{
					id: '01',
					index: '01',
					sowcard: 'Y001', 
					hgg: '2019-09-09', 
					hgm: '2019-09-09',
					rzs: '2019-09-09',
					
				},{
					id: '02',
					index: '02',
					sowcard: 'Y002', 
					hgg: '2019-09-09', 
					hgm: '2019-09-09',
					rzs: '2019-09-09',
					
				},{
					id: '03',
					index: '03',
					sowcard: 'Y003', 
					hgg: '2019-09-09', 
					hgm: '2019-09-09',
					rzs: '2019-09-09',
					
				},{
					id: '04',
					index: '04',
					sowcard: 'Y004', 
					hgg: '2019-09-09', 
					hgm: '2019-09-09',
					rzs: '2019-09-09',
					
				},{
					id: '05',
					index: '05',
					sowcard: 'Y005', 
					hgg: '2019-09-09', 
					hgm: '2019-09-09',
					rzs: '2019-09-09',
					
				}],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				}, {
					title: "母猪耳牌",
					key: "sowcard",
					width: 150,
				}, {
					title: "第一次发情",
					key: "hgg",
					width: 220,
				}, {
					title: "第二次发情",
					key: "hgm",
					width: 220,
				}, {
					title: "第三次发情",
					key: "rzs",
					width: 220,
				},]
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		components: {
			ztable
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
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

	.main {
		.main-wrap {
			padding: 160rpx 23rpx 23rpx 23rpx;
		}
	}

	.list-table {
		margin-top: -120px;
	}
	
</style>
