<template>
	<view>
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					配种记录审核
				</view>
				<view class="status-del">
					历史记录
				</view>
			</view>

		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 配种日期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种日期<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="picker">
										<view class="uni-input">{{array[index]}}</view>
										<view class="dextrad-icon">
											<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种批次<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array3">
									<view class="picker">
										<view class="uni-input">{{array3[index]}}</view>
										<view class="dextrad-icon">
											<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								预产期
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="自动计算" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								母猪转入位置<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array2">
									<view class="picker">
										<view class="uni-input">{{array2[index]}}</view>
										<view class="dextrad-icon">
											<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								本月计划数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="自动传入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								累计配种数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" value="审核回写" />
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="editor-title jus-j form-seat">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>配种明细</text>
			</view>
			<view class="confirm-btn">
				<button type="warn" class="flexc">删除(3)</button>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view>
		<view class="submits jus-b">
			<button type="primary" class="flexc submit-btn">提交</button>
			<button type="primary" class="flexc add-btn">编辑</button>
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
					grade: '2', //配种评分
					sowcard: 'Y001', //母猪耳牌
					boarcard: 'DD001', //公猪耳牌
					breeder: '张三', //配种员
					date: '上午' //配种时间
				}, {
					id: '02',
					index: '02',
					grade: '2', //配种评分
					sowcard: 'Y001', //母猪耳牌
					boarcard: 'DD001', //公猪耳牌
					breeder: '张三', //配种员
					date: '上午' //配种时间
				}, {
					id: '03',
					index: '03',
					grade: '2', //配种评分
					sowcard: 'Y001', //母猪耳牌
					boarcard: 'DD001', //公猪耳牌
					breeder: '张三', //配种员
					date: '上午' //配种时间
				}, {
					id: '04',
					index: '04',
					grade: '2', //配种评分
					sowcard: 'Y001', //母猪耳牌
					boarcard: 'DD001', //公猪耳牌
					breeder: '张三', //配种员
					date: '上午' //配种时间
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
					title: "配种评分",
					key: "grade",
					width: 150,
				}, {
					title: "公猪耳牌",
					key: "boarcard",
					width: 150,
				}, {
					title: "配种员",
					key: "breeder",
					width: 150,
				}, {
					title: "配种时间",
					key: "date",
					width: 200,
				}, ]
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
