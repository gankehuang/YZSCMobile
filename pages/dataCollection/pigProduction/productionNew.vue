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
					生产猪转群新增
				</view>
				<!-- @tap="togglePopup('middle')"   @click="jumpPage" -->
				<view class="status-del"  @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/pigProduction/productionQuery">
					操作记录
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 配种日期 -->
						<!-- <view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								检测日期<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  :value="date" />
							</view>
						</view> -->
						
						<view class="main-wrap-contetnt-item-field" style="padding-top: 0;">
							<view class="main-wrap-contetnt-item-field-name">
								分场<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array2">
									<view class="picker">
										<view class="uni-input">{{array2[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							
						<view class="main-wrap-contetnt-item-field-value" style="width: 100%;display: flex;">
							<radio-group @change="radioChange">
								<view style="display: block;">
									<view style="display: flex;">
										<label style="flex: 1;padding: 0;display: flex;" >
											母猪上产妇<radio style="transform: scale(0.7);margin-left: 30px;"  :checked="falg" @click="checked"/>
										</label>
										<!-- <label  style="flex: 1;padding: 0;display: flex;" >
											母猪上产妇<radio style="transform: scale(0.7);"  :checked="falg1" @click="checked1"/>
										</label> -->
									</view>
								</view>
							</radio-group>
							<radio-group @change="radioChange">
								<view style="display: block;">
									<view style="display: flex;">
										<label style="flex: 1;padding: 0;" >
											母猪上产妇<radio style="transform: scale(0.7);margin-left: 30px;"  :checked="falg1" @click="checked1"/>
										</label>
										<!-- <label  style="flex: 1;padding: 0;display: flex;" >
											母猪上产妇<radio style="transform: scale(0.7);"  :checked="falg1" @click="checked1"/>
										</label> -->
									</view>
								</view>
							</radio-group>
						</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入分场
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请选择转入分场" />
							</view>
						</view>
						
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入栏舍
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请选择转入栏舍" />
							</view>
						</view>
						
						<!-- <view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								检测工具<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array2">
									<view class="picker">
										<view class="uni-input">{{array2[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view> -->
						
					</view>
				</view>

			</view>
		</view>
		<!-- <view style="    padding: 0 11px 0 15px;    margin-bottom: 20px;">
			<view class="editor-title jus-j form-seat" style="padding: 0;background: #fff;border-radius: 15px;    padding: 10px 13px 10px 18px;">
				 <view class="main-wrap-contetnt-item-field-name">
				 	耳牌号<text class="text-red">*</text>
				 </view>
				<view class="main-wrap-contetnt-item-field-name-icon"  style="flex:1;margin-left: 5px;display: flex;">
					<image class="icon" src="/static/assets/scan-icon.png" @click="scancode" mode=""></image>
					<input type="text" value="" style="flex: 1;text-align: right;" placeholder="请输入耳牌号" />
				</view>
				<view class="titleicon">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>妊检记录明细</text>
				</view>
				<view class="confirm-btn" >
					<button type="primary" v-if="submitStatus" @click="jumpPage" data-key="单个录入" data-jumpurl="/pages/dataCollection/pregnancyRecord/pregnancyInput"
					 class="flexc">单个录入</button>
					<button type="primary" v-if="submitStatus" @click="jumpPage" data-key="批量录入" data-jumpurl="/pages/dataCollection/pregnancyRecord/pregnancyInputMore"
					 class="flexc">批量录入</button>
					<button type="warn" v-if="editStatus" class="flexc">删除(3)</button>
				</view>
			</view>
		</view> -->
		<!-- 列表 -->
	<!-- 	<view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" :neddCheck="neddCheck" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view> -->
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap" style="padding-top: 0;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text" style="font-size: 14px;margin: 0;">生产猪转群明细</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号 <text class="text-red">*</text>
								<image class="icon" src="/static/assets/scan-icon.png" @click="scancode" mode=""></image>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入断奶数" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								母猪上产房 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" style="display: flex;">
								<radio-group @change="radioChange">
									<view style="display: block;">
										<view style="display: flex;">
											<label style=";padding: 0;display: flex;" >
												<radio style="transform: scale(0.7);margin-left: 30px;"  :checked="falg2" @click="checked2"/>
											</label>
											<!-- <label  style="flex: 1;padding: 0;display: flex;" >
												母猪上产妇<radio style="transform: scale(0.7);"  :checked="falg1" @click="checked1"/>
											</label> -->
										</view>
									</view>
								</radio-group>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入栏舍 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入转入栏舍" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								头数 <text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入头数" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								跨分场
							</view>
							<view class="main-wrap-contetnt-item-field-value" style="display: flex;">
								<radio-group @change="radioChange">
									<view style="display: block;">
										<view style="display: flex;">
											<label style=";padding: 0;display: flex;" >
												<radio style="transform: scale(0.7);margin-left: 30px;"  :checked="falg3" @click="checked3"/>
											</label>
											<!-- <label  style="flex: 1;padding: 0;display: flex;" >
												母猪上产妇<radio style="transform: scale(0.7);"  :checked="falg1" @click="checked1"/>
											</label> -->
										</view>
									</view>
								</radio-group>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入分场
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入转入分场" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								总重量
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  placeholder="请输入总重量" />
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b">
			<button type="primary" v-if="submitStatus" class="flexc submit-btn">提交</button>
		</view>
		
		<!-- // 弹窗 -->
		<uni-popup :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="popview">
				<view class="main-wrap-contetnt-item-field field-nobottom">
					<view class="main-wrap-contetnt-item-field-name">
						异常原因<text class="text-red">*</text>
					</view>
					<view class="main-wrap-contetnt-item-field-value" style="margin: 20px 0;">
						<radio-group @change="radioChange">
							<view style="display: block;">
								<view style="display: flex;">
									<label style="margin-right:15rpx;display: flex;" v-for="(item, index) in items" :key="item.value">
										<radio style="transform: scale(0.7);" :value="item.value" :checked="index === current" />{{item.name}}
									</label>
								
								</view>
							</view>
						</radio-group>
					</view>
				</view>
				<view @click="togglePopup('')" class="out-btn1">取消</view>
				<view @click="togglePopup('')" class="out-btn2">确定</view>
			</view>
		</uni-popup>
	</view>

</template>

<script>
	// 弹窗 
	import uniPopup from '@/components/uni-popup/uni-popup'
	//引入抽屉单元格组件
	import drawCell from '@/components/uni-cell/draw-cell.vue';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import ztable from '@/components/z-table/z-table'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				falg:'',
				falg1:'',
				falg2:'',
				falg3:'',
				type: '',
				index: 0,
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
				array2: ['B超', 'A超'],
				date: currentDate,
				neddCheck:false,
				submitStatus:true,
				editStatus:false,
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
			ztable,
			uniIcon,
			drawCell,
			uniPopup
		},
		methods: {
			checked(){
				this.falg = !this.falg
			},
			checked1(){
				this.falg1 = !this.falg1
			},checked2(){
				this.falg2 = !this.falg1
			},checked3(){
				this.falg3 = !this.falg3
			},
			scancode1(){
				this.scancode()
				setTimeout(()=>{
					this.togglePopup('middle')
				},500)
			},
			goback() {
				this.handOnClickBack();
				return false;
			},
			togglePopup(type) {
				this.type = type;
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
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
	input{
		font-size: 14px;
	}
	
	/*提示框样式*/
	.popview {
		padding-top: 33upx;
		display: block;
		float: clear;
		width: 530upx;
	}
	
	.out-text {
		font-size: 28upx;
		margin-bottom: 55upx;
		display: block;
		float: clear;
		text-align: center;
	
	}
	
	.out-btn1 {
		width: 50%;
		display: inline-block;
		color: rgb(179, 179, 179);
		text-align: center;
		// margin-left: 120upx;
		// margin-right: 184upx;
	
	}
	
	.out-btn2:active,
	.out-btn1:active {
		background: #EEEEEE;
	}
	
	.out-btn2 {
		display: inline-block;
		text-align: center;
		color: #FF4343;
		width: 50%;
	}
</style>
