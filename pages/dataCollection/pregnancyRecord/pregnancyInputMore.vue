<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					妊检批量录入
				</view>
				
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 与配公猪 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								公猪耳牌<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入公猪耳牌号" />
							</view>
						</view>

						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								异常原因<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
									<radio-group @change="radioChange">
										<view style="display: block;">
											<view style="display: flex;">
											<label style="margin-right:15rpx;display: flex;" v-for="(item, index) in items" :key="item.value">
												<radio  style="transform: scale(0.7);" :value="item.value" :checked="index === current"  />{{item.name}}
											</label>
										
										</view></view>
									</radio-group>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="editor-title jus-j form-seat" style="margin-bottom: 16px;">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>母猪明细</text>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view>
		<view class="submits jus-b">
			<button type="primary" class="flexc add-btn">加入明细</button>
			<button type="primary" class="flexc submit-btn" @click="jumpPage" data-key="单个录入" data-jumpurl="/pages/dataCollection/pregnancyRecord/pregnancyNew">确定</button>
			
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
				index: 0,
				date: currentDate,
				items: [{
						value: 'kb',
						name: '空杯',
						checked: 'true'
					},
					{
						value: 'fq',
						name: '返情'
					},
					{
						value: 'lc',
						name: '流产'
					}
				],
				current: 0,
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
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

	.status-header {
		padding-top: 26rpx;
	}

	.main {
		.main-wrap {
			padding: 160rpx 23rpx 23rpx 23rpx;
		}
	}

	.search-item {
		width: 100%;

		.othermain {
			width: 90%;
			float: left;
			.main-wrap {
				margin-top: -160rpx;
				margin-right: 40rpx;
				.field-nobottom {
					margin-top: -40rpx;
					.main-wrap-contetnt-item-field-value {
						.text {
							margin-right: 20rpx;
							width: 150rpx;
						}
					}
				}
			}
		}

		.search-icon {
			width: 8%;
			float: left;
			.main-wrap {
				margin-left: -60rpx;
				margin-top: -160rpx;
				.field-nobottom {
					margin-left: -20rpx;
					margin-top: -40rpx;
				}
			}
			image {
				width: 18px;
				height: 18px;
				z-index: 99999;
			
			}
		}
	}


	.list-table {
		margin-top: -140px;
	}
</style>
