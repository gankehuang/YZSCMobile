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
					精液单个录入
				</view>
				<view class="status-del"  @click="jumpPage" data-key="操作记录" data-jumpurl="/pages/dataCollection/semenTest/semenQuery">
					操作记录
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						
						<view class="main-wrap-contetnt-item-field" style="padding-top: 0;">
							<view class="main-wrap-contetnt-item-field-name">
								采精员<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入采精员" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								稀释员<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入稀释员" />
							</view>
						</view>
						
						
						
					</view>
				</view>
				
			
			
			<!-- <view class="main-wrap" style="padding-top: 0;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						
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
								合格公<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="5" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								合格母<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="5" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								弱仔数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="5" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								畸形数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入畸形数" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								木乃伊
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入木乃伊" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								死胎数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入死胎数" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								窝号
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入窝号" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								窝重<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入窝重" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								窝均重<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入窝均重" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								活仔数<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入活仔数" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								总仔数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="自动求和" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field no-bottom">
							<view class="main-wrap-contetnt-item-field-name">
								接产人<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array1">
									<view class="picker">
										<view class="uni-input">{{array1[index]}}</view>
										<view class="dextrad-icon">
											<image class="icon-small" src="/static/assets/dextrad.png" mode=""></image>
										</view>
									</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
		
		<view class="main">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								公猪耳牌<text class="text-red">*</text>
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
								原精量(ml)<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入原精量" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								颜色<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array1">
									<view class="picker">
										<view class="uni-input">{{array1[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16"  />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								气味<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array2">
									<view class="picker">
										<view class="uni-input">{{array2[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16"  />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								密度(亿ml)<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入密度" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								畸形率(%)<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入畸形率" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								活力<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入活力" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								实际稀释分数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" placeholder="请输入实际稀释分数" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								是否废弃<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<label class="checkbox">
									<checkbox value="" checked="true" />
								</label>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								精液评级<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array3">
									<view class="picker">
										<view class="uni-input">{{array3[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16"  />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								是否放精<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<label class="checkbox">
									<checkbox value="" checked="true" />
								</label>
							</view>
						</view>
						
						
					</view>
				</view>
				</view>
			</view>
		</view>
		<!-- <view class="editor-title jus-j form-seat">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>精液明细</text>
			</view>
			<view class="confirm-btn" >
				<button type="primary"  v-if="submitStatus" class="flexc" @click="jumpPage" data-key="单个录入" data-jumpurl="/pages/dataCollection/semenTest/semenInput">单个录入</button>
				<button type="warn" v-if="editStatus" class="flexc">删除(3)</button>
			</view>
		</view> -->
		<!-- 列表 -->
		<!-- <view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="neddCheck" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view> -->
		
		<!-- <view class="editor-title jus-j form-seat">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>后裔个体明细</text>
			</view>
		</view> -->
		<!-- 列表 -->
		<!-- <view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData1" :columns="columns1"  emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view> -->
		<view class="submits jus-b">
			<button type="primary" v-if="submitStatus" class="flexc submit-btn">提交</button>
			<!-- <button type="primary" v-if="submitStatus" class="flexc add-btn" @tap="clickEdit">编辑</button> -->
			<!-- <button type="primary" v-if="editStatus" class="flexc cancel-btn" @tap="clickCancel">取消</button> -->
			<!-- <button type="primary" v-if="editStatus" class="flexc add-btn">修改</button> -->
		</view>
	</view>

</template>

<script>
	import ztable from '@/components/z-table/z-table'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: ['请选择配种时段', '美国', '巴西', '日本'],
				array1: ['白色', '淡黄色'],
				array2: ['正常', '不正常'],
				array3: ['优', '良', '中', '差'],
				index: 0,
				date: currentDate,
				neddCheck:false,
				submitStatus:true,
				editStatus:false,
				tableData: [
					{
						id: '01',
						index: '01',
						sowcard: 'Y001', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
					},{
						id: '02',
						index: '02',
						sowcard: 'Y002', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
					},{
						id: '03',
						index: '03',
						sowcard: 'Y003', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
					},{
						id: '04',
						index: '04',
						sowcard: 'Y004', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
					},{
						id: '05',
						index: '05',
						sowcard: 'Y005', 
						hgg: 'xx', 
						hgm: 'xx',
						rzs: 'xx',
						qxs: 'xx',
						mny: 'xx',
						sts: 'xx',
						hts: 'xx',
					},
				],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				}, {
					title: "公猪耳号",
					key: "sowcard",
					width: 150,
				}, {
					title: "颜色",
					key: "hgg",
					width: 100,
				}, {
					title: "气味",
					key: "hgm",
					width: 100,
				}, {
					title: "原精量",
					key: "rzs",
					width: 100,
				}, {
					title: "密度",
					key: "qxs",
					width: 100,
				},{
					title: "畸形率",
					key: "mny",
					width: 100,
				}, {
					title: "死胎数",
					key: "sts",
					width: 100,
				},{
					title: "精液评级",
					key: "hts",
					width: 100,
				},],
				tableData1: [{
					id: '01',
					index: '01',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '02',
					index: '02',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '03',
					index: '03',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '04',
					index: '04',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				},{
					id: '01',
					index: '01',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '02',
					index: '02',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '03',
					index: '03',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '04',
					index: '04',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				},{
					id: '01',
					index: '01',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}],
				columns1: [{
					title: "序号",
					key: "index",
					width: 70,
				}, {
					title: "仔猪国标号",
					key: "sowcard",
					width: 180,
				}, {
					title: "品种",
					key: "grade",
					width: 150,
				}, {
					title: "性别",
					key: "boarcard",
					width: 150,
				}, {
					title: "出生重",
					key: "breeder",
					width: 150,
				}, {
					title: "左乳头",
					key: "date",
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
			ztable,
			uniIcon
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
			},clickEdit() {
				this.neddCheck = true;
				this.editStatus=true;
				this.submitStatus=false;
			},clickCancel(){
				this.neddCheck = false;
				this.editStatus=false;
				this.submitStatus=true;
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
