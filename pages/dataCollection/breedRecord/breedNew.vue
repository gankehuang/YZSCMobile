<template>
	<view>
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title" :style="{'padding-left':statusTitleLeft}">
					配种记录新增
				</view>
				<view v-if="submitStatus" class="status-del" @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/breedRecord/breedQuery">
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
						<view class="main-wrap-contetnt-item-field" style="padding-top: 0;">
							<view class="main-wrap-contetnt-item-field-name">
								配种批次<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="picker">
										<view class="uni-input">{{array[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18"  />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入位置<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array3">
									<view class="picker">
										<view class="uni-input">{{array3[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18"  />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<!-- <view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								预产期
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" disabled="true" :value="'自动计算'" />
							</view>
						</view> -->
						<!-- <view class="main-wrap-contetnt-item-field">
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
						</view> -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								计划配种数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" style="font-size: 14px;"  disabled="true" :value="'自动计算'" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								累计配种数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  style="font-size: 14px;" disabled="true" :value="'自动计算'" />
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- <view class="editor-title jus-j form-seat">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>配种明细</text>
			</view>
			<view class="confirm-btn" >
				<button type="primary" v-if="submitStatus" @click="jumpPage" data-key="单个录入" data-jumpurl="/pages/dataCollection/breedRecord/breedInput"
				 class="flexc">单个录入</button>
				<button type="primary" v-if="submitStatus" @click="jumpPage" data-key="批量录入" data-jumpurl="/pages/dataCollection/breedRecord/breedInputMore"
				 class="flexc">批量录入</button>
			    <button type="warn" v-if="editStatus" class="flexc">删除(3)</button>
			</view>
		</view> -->
		
		<!-- 配种入录 -->
		
		
		
		<!-- 列表 -->
		<!-- <view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="neddCheck" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view> -->
		
		<!-- 内容 -->
				<view class="main">
					<view class="main-wrap" style="padding-top: 0;">
						<view class="main-wrap-contetnt">
							<view class="main-wrap-contetnt-item">
								<!-- 标题 -->
								<view class="main-wrap-contetnt-item-title">
									
									<view class="main-wrap-contetnt-item-title-text">添加配种明细</view>
									
								</view>
								<!-- 公猪耳号 -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										公猪耳号<text class="text-red">*</text>
										<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
											<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
										</view>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<input type="text"  style="font-size: 14px;" placeholder="请输入公猪耳号" />
									</view>
								</view>
								<!-- 均重(公)KG -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										均重(公)KG<text class="text-red">*</text>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<input type="text" value="" style="font-size: 14px;" placeholder="请输入公猪均重" />
									</view>
								</view>
								<!-- 母猪耳号 -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										母猪耳号<text class="text-red">*</text>
										<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
											<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
										</view>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<input type="text" value="" style="font-size: 14px;" placeholder="请输入母猪耳号" />
									</view>
								</view>
								<!-- 均重(母)KG -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										均重(母)KG<text class="text-red">*</text>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<input type="text" value="" style="font-size: 14px;" placeholder="请输入母猪均重" />
									</view>
								</view>
								<!-- 配种时段 -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										配种时段<text class="text-red">*</text>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<picker @change="bindPickerChange" :value="index" :range="array">
											<view class="picker"> 
												<view class="uni-input">{{array[index]}}</view>
												<view class="dextrad-icon">
													<uni-icon type="arrowright" color="#333333" />
												</view>
											</view>
										</picker>
									</view>
								</view>
								<!-- 操作评分 -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										操作评分<text class="text-red">*</text>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<view class="grade">
											<view class="grade-item">
												<view class="grade-item-name">静立</view>
												<view class="grade-item-stars">
													<view class="grade-item-stars-star">
														<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
													</view>
													<view class="grade-item-stars-star">
														<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
													</view>
													<view class="grade-item-stars-star">
														<image class="icon" src="/static/assets/star2@2x.png" mode=""></image>
													</view>
												</view>
											</view>
											<view class="grade-item">
												<view class="grade-item-name">锁住</view>
												<view class="grade-item-stars">
													<view class="grade-item-stars-star">
														<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
													</view>
													<view class="grade-item-stars-star">
														<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
													</view>
													<view class="grade-item-stars-star">
														<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
													</view>
												</view>
											</view>
											<view class="grade-item">
												<view class="grade-item-name">倒流</view>
												<view class="grade-item-stars">
													<view class="grade-item-stars-star">
														<image class="icon" src="/static/assets/star@2x.png" mode=""></image>
													</view>
													<view class="grade-item-stars-star">
														<image class="icon" src="/static/assets/star2@2x.png" mode=""></image>
													</view>
													<view class="grade-item-stars-star">
														<image class="icon" src="/static/assets/star2@2x.png" mode=""></image>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
								<!-- 猪只状态 -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										猪只状态<text class="text-red">*</text>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<input type="text" style="font-size: 14px;" disabled="true"  placeholder="自动带出" />
									</view>
								</view>
								<!-- 存栏位置 -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										存栏位置<text class="text-red">*</text>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<input type="text" disabled="true" style="font-size: 14px;"  placeholder="自动带出" />
									</view>
								</view>
								<!-- 配种类型 -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										配种类型<text class="text-red">*</text>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<input type="text" disabled="true" style="font-size: 14px;"  placeholder="自动带出" />
									</view>
								</view>
								<!-- 配种员 -->
								<view class="main-wrap-contetnt-item-field">
									<view class="main-wrap-contetnt-item-field-name">
										配种员<text class="text-red">*</text>
									</view>
									<view class="main-wrap-contetnt-item-field-value">
										<input type="text" style="font-size: 14px;"  placeholder="请填入" />
									</view>
								</view>
								
							</view>
						</view>
					
					</view>
				</view>
		
		<!-- 按钮  -->
		<view class="submits jus-b">
			<button type="primary" v-if="submitStatus" class="flexc submit-btn">提交</button>
			<!-- <button type="primary" v-if="submitStatus" class="flexc add-btn" @tap="clickEdit">编辑</button> -->
			<!-- <button type="primary" v-if="editStatus" class="flexc cancel-btn" @tap="clickCancel">取消</button> -->
			<!-- <button type="primary" v-if="editStatus" class="flexc add-btn">修改</button> -->
		</view>
	</view>

</template>

<script>
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
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
				neddCheck:false,
				submitStatus:true,
				editStatus:false,
				delcount:'',
				'statusTitleLeft':'35%',
				tableData: [{
					id: '01',
					index: '01',
					boarcard: 'DD001', //公猪耳牌
					date: '上午' ,//配种时间
					breeder: '张三', //配种员
					sowcard: 'Y001', //母猪耳牌
					grade: '2', 
					averageboar: '200', 
					averagesow: '180', 
					location: '一单元', 
					type: '后备母', 
					parity: 'xxx', 
				},{
					id: '02',
					index: '02',
					boarcard: 'DD001', //公猪耳牌
					date: '上午' ,//配种时间
					breeder: '张三', //配种员
					sowcard: 'Y001', //母猪耳牌
					grade: '2', 
					averageboar: '200', 
					averagesow: '180', 
					location: '一单元', 
					type: '后备母', 
					parity: 'xxx', 
				},{
					id: '03',
					index: '03',
					boarcard: 'DD001', //公猪耳牌
					date: '上午' ,//配种时间
					breeder: '张三', //配种员
					sowcard: 'Y001', //母猪耳牌
					grade: '2', 
					averageboar: '200', 
					averagesow: '180', 
					location: '一单元', 
					type: '后备母', 
					parity: 'xxx', 
				},{
					id: '04',
					index: '04',
					boarcard: 'DD001', //公猪耳牌
					date: '上午' ,//配种时间
					breeder: '张三', //配种员
					sowcard: 'Y001', //母猪耳牌
					grade: '2', 
					averageboar: '200', 
					averagesow: '180', 
					location: '一单元', 
					type: '后备母', 
					parity: 'xxx', 
				},{
					id: '05',
					index: '05',
					boarcard: 'DD001', //公猪耳牌
					date: '上午' ,//配种时间
					breeder: '张三', //配种员
					sowcard: 'Y001', //母猪耳牌
					grade: '2', 
					averageboar: '200', 
					averagesow: '180', 
					location: '一单元', 
					type: '后备母', 
					parity: 'xxx', 
				},{
					id: '06',
					index: '06',
					boarcard: 'DD001', //公猪耳牌
					date: '上午' ,//配种时间
					breeder: '张三', //配种员
					sowcard: 'Y001', //母猪耳牌
					grade: '2', 
					averageboar: '200', 
					averagesow: '180', 
					location: '一单元', 
					type: '后备母', 
					parity: 'xxx', 
				}],
				columns: [{
					title: "序号",
					key: "index",
					width: 70,
				},{
					title: "公猪耳牌",
					key: "boarcard",
					width: 150,
				},{
					title: "配种时段",
					key: "date",
					width: 200,
				},  {
					title: "配种员",
					key: "breeder",
					width: 150,
				},{
					title: "母猪耳牌",
					key: "sowcard",
					width: 150,
				}, {
					title: "操作评价",
					key: "grade",
					width: 150,
				},  {
					title: "均重(公)",
					key: "averageboar",
					width: 200,
				}, {
					title: "均重(母)",
					key: "averagesow",
					width: 200,
				},{
					title: "存栏位置",
					key: "location",
					width: 200,
				},{
					title: "配种类型",
					key: "type",
					width: 200,
				},{
					title: "胎次",
					key: "parity",
					width: 200,
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
			},
			clickEdit() {
				this.neddCheck = true;
				this.editStatus=true;
				this.submitStatus=false;
				this.statusTitleLeft= 0;
			},
			clickCancel() {
				this.neddCheck = false;
				this.editStatus=false;
				this.submitStatus=true;
				this.statusTitleLeft= '35%';
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

	.list-table {
		margin-top: -120px;
	}
</style>
