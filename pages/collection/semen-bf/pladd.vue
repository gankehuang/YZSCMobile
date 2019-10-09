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
					筛选
				</view>
				<view class="status__title">精液申请批量录入</view>
			</view>
		</view>

		<view class="semen-editor">
			<view class="card-form2 card">
				<view class="jus-j form-list">
					<view class="field">
						母猪耳牌<text>*</text>
						<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
					</view>
					<view class="s-value">
						<view class="s-value d-num">
							<input type="text" value="" placeholder="请输入母猪耳牌" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="data__wrapper">
				<ztable :showBottomSum="false" :tableData="tableData" :columns="columns" :neddCheck="true" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable>
			</view>

		</view>
		<!-- btn -->
		<view class="submits">
			<button type="primary" class="flexc editor-btn" data-key="加入明细" data-jumpurl="/pages/ywcj_lowvalue/fledit">加入明细</button>
			<button type="primary" class="flexc submit-btn" data-key="确定" data-jumpurl="/pages/ywcj_lowvalue/history">确定</button>
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
				redbtn:"修改",
				tbtn:"删除",
				index: 0,
				lllx: [{name:'请选择领料类型1'},{name: '请选择领料类型2'}, {name:'请选择领料类型3'}, {name:'请选择领料类型4'}],
				fc: [{name:'请选择分场1'},{name: '请选择分场2'}, {name:'请选择分场3'}, {name:'请选择分场4'}],
				pzcs: [{name:'请选择配种次数1'},{name: '请选择配种次数2'}, {name:'请选择配种次数3'}, {name:'请选择配种次数4'}],
				sqr: [{name:'请选择申请人1'},{name: '请选择申请人2'}, {name:'请选择申请人3'}, {name:'请选择申请人4'}],
				startDate:getDate('start'),
				endDate:getDate('end'),
				tableData: [{
						id: '01',
						index: '01',
						mzep: 'Y001',
						pz: '8',
						sq: '张三',
						lynum: 22,
						checked: true
					},
					{
						id: '02',
						index: '02',
						mzep: 'Y002',
						pz: '4',
						sq: '张三',
						lynum: 33,
						checked: false
					},
					{
						id: '03',
						index: '03',
						mzep: 'Y003',
						pz: '5',
						sq: '张三',
						lynum: 44,
						checked: true
					},
					{
						id: '04',
						index: '04',
						mzep: 'Y004',
						pz: '1',
						sq: '张三',
						lynum: 55,
						checked: false
					},
					{
						id: '05',
						index: '05',
						mzep: 'Y003',
						pz: '2',
						sq: '张三',
						lynum: 53,
						checked: true
					},
					{
						id: '06',
						index: '06',
						mzep: 'Y002',
						pz: '3',
						sq: '张三',
						lynum: 56,
						checked: false
					},
					{
						id: '07',
						index: '07',
						mzep: 'Y001',
						pz: '9',
						sq: '张三',
						lynum: 53,
						checked: true
					},
					{
						id: '08',
						index: '08',
						mzep: 'Y003',
						pz: '8',
						sq: '张三',
						lynum: 45,
						checked: false
					},
					{
						id: '09',
						index: '09',
						mzep: 'Y002',
						pz: '7',
						sq: '张三',
						lynum: 23,
						checked: true
					},
					{
						id: '99',
						index: '99',
						mzep: 'Y004',
						pz: '8',
						sq: '张三',
						lynum: 53,
						checked: false
					}
				],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				}, {
					title: "母猪耳牌",
					key: "mzep",
					width: 200,
				}, {
					title: "第几次配种",
					key: "pz",
					width: 100,
				}, {
					title: "申请",
					key: "sq",
					width: 200,
				}, {
					title: "申请领用份数",
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

		.card-form2 {
			margin-bottom: 20upx;
			margin-top:20upx;
			
			.form-list {
				height: 96upx;
				font-size: 28upx;
			
				.field {
					width: 250rpx;
					
					text {
						color: #FF6354;
						margin-left: 10upx;
					}
					
					.icon {
					    width: 36rpx;
					    height: 36rpx;
						margin-left: 20upx;
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
