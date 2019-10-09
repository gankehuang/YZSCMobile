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
					妊检记录审批
				</view>
				<view class="status-del" @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/pregnancyRecord/pregnancyQuery">
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
								检测日期
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="2017-07-23" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								检测人员
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="张三" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								检测工具
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="B超" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								提交人
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="李四" />
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
				<text>妊检明细</text>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="false" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view>
		<!-- 列表 -->
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
				index: 0,
				date: currentDate,
				tableData: [{
					id: '01',
					index: '01',
					sowcard: 'Y001', 
					ycyy: 'xx', 
					pzpc: 'xx',
					zt: 'xx',
					clzw: 'xx',
					gzeh: 'xx'
				},{
					id: '02',
					index: '02',
					sowcard: 'Y002', 
					ycyy: 'xx', 
					pzpc: 'xx',
					zt: 'xx',
					clzw: 'xx',
					gzeh: 'xx'
				},{
					id: '03',
					index: '03',
					sowcard: 'Y003', 
					ycyy: 'xx', 
					pzpc: 'xx',
					zt: 'xx',
					clzw: 'xx',
					gzeh: 'xx'
				},{
					id: '04',
					index: '04',
					sowcard: 'Y004', 
					ycyy: 'xx', 
					pzpc: 'xx',
					zt: 'xx',
					clzw: 'xx',
					gzeh: 'xx'
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
					title: "异常原因",
					key: "ycyy",
					width: 200,
				}, {
					title: "配种批次",
					key: "pzpc",
					width: 200,
				}, {
					title: "状态",
					key: "zt",
					width: 100,
				}, {
					title: "存栏位置",
					key: "clzw",
					width: 200,
				},{
					title: "公猪耳号",
					key: "gzeh",
					width: 200,
				}]
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
