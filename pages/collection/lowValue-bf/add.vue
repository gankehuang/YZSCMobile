<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status_bar">
			<view class="status">
				<image class="status__bg" src="/static/assets/top_bg.png" mode="widthFix"></image>
				<view class="icon-back" @tap="handOnClickBack">
					<image class="icon" src="../../static/assets/back.png" mode=""></image>
				</view>
				<view class="icon-set">
					<image class="icon2" src="../../static/assets/Fill.png" mode=""></image>
				</view>
				<view class="status__title">低值申请新增</view>
			</view>
		</view>

		<view class="semen-editor">
			<!-- 基本信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>基本信息</text>
				</view>
			</view>
			<view class="card-form card">
				<view class="jus-j form-list">
					<view class="field">
						申请日期
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						                        <view class="uni-input">{{date}}</view>
						                    </picker>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						领料类型
					</view>
					<view class="s-value d-num">
						<picker @change="bindPickerChange" :value="index" :range="lllx" range-key="name">
							<view class="uni-input">{{lllx[index].name}}</view>
						</picker>
						<!-- <input type="text" value="" placeholder="请选择领料类型" /> -->
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						分场
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="fc" range-key="name">
								<view class="uni-input">{{fc[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						组别
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="zb" range-key="name">
								<view class="uni-input">{{zb[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						备注
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="jus-j form-list">
					<view class="field">
						申请人<text>*</text>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<picker @change="bindPickerChange" :value="index" :range="sqr" range-key="name">
								<view class="uni-input">{{sqr[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 申请明细 -->
			<view class="editor-title jus-j form-seat">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>申请明细</text>
				</view>
				<view class="table-btn">
					<button type="primary" :class="tbtn=='新增'? 'tbtn-add':'tbtn-del'">{{tbtn}}</button>
				</view>
			</view>
			<view class="data__wrapper">
				<ztable :showBottomSum="true" :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
			</view>

		</view>
		<!-- btn -->
		<view class="submits">
			<button type="primary" class="flexc editor-btn" @click="jumpPage" data-key="编辑" data-jumpurl="/pages/ywcj_lowvalue/fledit">{{redbtn}}</button>
			<button type="primary" class="flexc submit-btn" @click="jumpPage" data-key="提交" data-jumpurl="/pages/ywcj_lowvalue/history">提交</button>
		</view>
	</view>
</template>

<script>
	import ztable from '@/components/z-table/z-table';

	function getDate(type) {
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
	export default {
		data() {
			return {
				date: getDate({
					format: true
				}),
				redbtn:"编辑",
				tbtn:"新增",
				index: 0,
				lllx: [{name:'请选择领料类型1'},{name: '请选择领料类型2'}, {name:'请选择领料类型3'}, {name:'请选择领料类型4'}],
				fc: [{name:'请选择分场1'},{name: '请选择分场2'}, {name:'请选择分场3'}, {name:'请选择分场4'}],
				zb: [{name:'请选择组别1'},{name: '请选择组别2'}, {name:'请选择组别3'}, {name:'请选择组别4'}],
				sqr: [{name:'请选择申请人1'},{name: '请选择申请人2'}, {name:'请选择申请人3'}, {name:'请选择申请人4'}],
				startDate:getDate('start'),
				endDate:getDate('end'),
				tableData: [{
						id: '01',
						index: '01',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: true
					},
					{
						id: '02',
						index: '02',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: false
					},
					{
						id: '03',
						index: '03',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: true
					},
					{
						id: '04',
						index: '04',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: false
					},
					{
						id: '05',
						index: '05',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: true
					},
					{
						id: '06',
						index: '06',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: false
					},
					{
						id: '07',
						index: '07',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: true
					},
					{
						id: '08',
						index: '08',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: false
					},
					{
						id: '09',
						index: '09',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: true
					},
					{
						id: '99',
						index: '99',
						name: '毛巾',
						unit: '条',
						specs: 2,
						lynum: 10,
						checked: false
					}
				],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				}, {
					title: "物料名称",
					key: "name",
					width: 200,
				}, {
					title: "计量单位",
					key: "unit",
					width: 100,
				}, {
					title: "规格",
					key: "specs",
					width: 200,
				}, {
					title: "领用数量",
					key: "lynum",
					width: 200,
				}]
			}
		},
		components: {
			ztable
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			edit: function() {
				if(this.redbtn == "编辑"){
					this.redbtn = "修改",
					this.tbtn = "删除"
				}else{
					this.redbtn = "编辑",
					this.tbtn = "新增"
				}
				
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #f2f5fc;
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
				margin-top: -10rpx;
				padding-left: 40rpx;
				width: 10%;

				.icon {
					width: 16rpx;
					height: 28rpx;
				}
			}

			.icon-set {
				position: absolute;
				top: 50%;
				margin-top: -10rpx;
				right: -30rpx;
				width: 10%;

				.icon2 {
					width: 8rpx;
					height: 42rpx;
				}
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
				margin-top: -10rpx;
				margin-left: -85rpx;
			}
		}
	}

	//xq
	.semen-editor {
		background-color: #F5F5F5;
		padding: 130rpx 30upx 124rpx 30rpx;

		.editor-title {
			height: 80upx;

			.img {
				line-height: 80upx;

				image {
					width: 12upx;
					height: 12upx;
					vertical-align: middle;
				}
			}

			text {
				margin-left: 14upx;
				line-height: 80upx;
				font-size: 32upx;
			}

			.confirm-btn {
				width: 140upx;
				height: 54upx;

				button {
					width: 140upx;
					height: 54upx;
					font-size: 24upx;
					padding: 0;
					background-color: #4684EA;
				}
			}

			&.form-seat {
				height: 120upx;
			}
			
			.tbtn-add{
				width: 142rpx;
				height: 54rpx;
				background-color: #4F77AA;
				font-size: 12px;
			}
			.tbtn-del{
				width: 142rpx;
				height: 54rpx;
				background-color: #F05E57;
				font-size: 12px;
			}
		}

		.card-form {
			height: 584upx;

			.form-list {
				height: 96upx;
				border-bottom: 1upx solid #EBEEF2;
				font-size: 28upx;

				.field {
					width: 140rpx;

					text {
						color: #FF6354;
						margin-left: 10upx;
					}
				}

				.s-value {
					color: #B2B2B2;
					vertical-align: middle;

					&.d-num {
						text-align: right;
					}
				}

			}
		}

		.data__wrapper {
			height: 584;
		}

	}

	//置底按钮
	.submits {
		position: fixed;
		bottom: 0;
		display: flex;
		background: #F5F5F5;
		width: 750rpx;
		height: 124rpx;
		left: 0;

		button {
			width: 316upx;
			height: 88upx;

			&.editor-btn {
				background-color: #F05E57;
				margin: 20rpx 25rpx 20rpx 40rpx;
			}

			&.submit-btn {
				background-color: #4684EA;
				margin: 20rpx 30rpx 20rpx 25rpx;
			}
		}
	}
</style>
