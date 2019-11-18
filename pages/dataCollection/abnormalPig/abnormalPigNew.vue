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
					异常猪新增
				</view>
				<!-- @tap="togglePopup('middle')"   @click="jumpPage" -->
				<view class="status-del"  @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/abnormalPig/abnormalPigQuery">
					操作记录
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text" style="font-size: 14px;margin: 0;">基本信息</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								分场<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(1)">
								<text>{{addData.fenchang || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								类型<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="picker">
										<view class="uni-input">{{array[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								栋舍
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(2)">
								<text>{{addData.dongshe || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						
					</view>
				</view>

			</view>
		</view>
		
		<!-- 待配 -->
		<view class="main" v-if="showState == 0">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text" style="font-size: 14px;margin: 0;">待配明细</view>
						</view>
						<!-- 耳号 * -->
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								耳号
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(3)">
								<text>{{DPList.erpaihao || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								上批批次号
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(4)">
								<text>{{DPList.breedpc || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								A超测定
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="DPList.fasuperdete" placeholder="请输入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								异常猪只标识
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange4" :value="index4" :range="array4">
									<view class="picker">
										<view class="uni-input">{{array4[index4]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								料量
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="DPList.fcalculate" placeholder="请输入" />
							</view>
						</view>
						<!-- 执行人 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								执行人
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(5)">
									<text>{{DPList.executorper || '请输入'}}</text>
									<uni-icon type="arrowright" color="#333333" size="16" />
								</view>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								责任人
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(6)">
									<text>{{DPList.zerenren || '请输入'}}</text>
									<uni-icon type="arrowright" color="#333333" size="16" />
								</view>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								备注
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="DPList.fremark" placeholder="请输入" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 分娩 -->
		<view class="main" v-if="showState == 1">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text" style="font-size: 14px;margin: 0;">分娩明细</view>
						</view>
						<!-- 耳号 * -->
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								耳号
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(7)">
								<text>{{FMList.erpaihao || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								批次号
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(8)">
								<text>{{FMList.breedpc || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								异常猪只标识
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<!-- <label class="radio">
									<radio value="1" /><text>助产</text>
									<radio value="2" /><text>发热</text>
									<radio value="3" /><text>不吃料</text>
									<radio value="4" /><text>带弱仔</text>
									<radio value="5" /><text>产死胎木乃伊</text>
								</label> -->
								<picker @change="bindPickerChange3" :value="index3" :range="array3">
									<view class="picker">
										<view class="uni-input">{{array3[index3]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								颜色
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(9)">
								<text>{{FMList.color || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								处理措施
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(10)">
								<text>{{FMList.promethod || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<!-- 执行人 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								执行人
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(11)">
								<text>{{FMList.executorper || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								责任人
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(12)">
								<text>{{FMList.zerenren || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								备注
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="FMList.fremark" placeholder="请输入转入栏位" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 配后 -->
		<view class="main" v-if="showState == 2">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text" style="font-size: 14px;margin: 0;">配后明细</view>
						</view>
						<!-- 耳号 * -->
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								耳号
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(13)">
								<text>{{PHList.erpaihao || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						<!-- 异常分类 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								异常分类
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(14)">
								<text>{{PHList.yichangfenlei || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						
						<!-- 标色 -->
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								标色
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="PHList.biaose" placeholder="请输入标色" />
							</view>
						</view>
						
						<!-- 处理方法 -->
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								处理方法
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(15)">
								<text>{{PHList.promethod || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						
						<!-- 执行人 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								执行人
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(16)">
								<text>{{PHList.executorper || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						
						<!-- 责任人 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								责任人
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(17)">
								<text>{{PHList.zerenren || '请输入'}}</text>
								<uni-icon type="arrowright" color="#333333" size="16" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								备注
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="PHList.fremark" placeholder="请输入" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="submits jus-b">
			<button type="primary" @tap="submit" class="flexc submit-btn">提交</button>
		</view>
		<!-- 搜索转出选择器 -->
		<tki-tree ref="tkitree"
		@watchSearch="watchSearch"
		:range="list"
		rangeKey="name"
		confirmColor="#5089f9"
		@confirm="treeConfirm"></tki-tree>
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
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
	import common from '../../../utils/common.js';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				showState: 0,
				type: '',
				index: 0,
				index3: 0,
				index4: 0,
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
				array: ['待配', '分娩', '配后'],
				array2: ['待配', '分娩', '配后'],  //类型数组
				array3: ['助产', '发热', '不吃料', '带弱仔', '产死胎木乃伊'],  //分娩-异常猪只标识
				array4: ['发热', '不吃料'],  //待配-异常猪只标识
				date: currentDate,
				neddCheck:false,
				submitStatus:true,
				editStatus:false,
				//提交的数据
				addData: {
					fenchang: '',   //分厂
					cffieldid: '',  //分厂id
					dongshe: '',    //栋舍
					fpkPigfenid: '',  //栋舍id
					abnormaltype: '待配',  //类型
					List: ''
				},
				//待配
				DPList: {
					erpaihao: '',  //耳牌号
					fearnoid: '',  //耳号id
					breedpc: '',   //上批批次号
					fbreedingbatchid: '',  //上批批次号id
					fasuperdete: '',  //A超测定
					yichangfenlei: '发热',  //异常标识
					fabnormalclassid: '', //异常分类id
					fcalculate: '',    //料量
					executorper: '',  //执行人
					fexecutorperid: '',  //执行人id
					zerenren: '',   //责任人
					fliableperid: '',  //责任人id
					fremark: '',    //备注
				},
				//分娩（产后）
				FMList: {
					erpaihao: '',    //耳号
					fearnoid: '',    //耳号id
					breedpc: '',    //批次
					fbreedingbatchid: '',    //批次id
					yichangfenlei: '助产',   //异常标识
					fabnormalclassid: '',   //异常标识id
					color: '',   //颜色
					fcolorabnormalclas: '',   //颜色id
					promethod: '',  //处理措施
					fpromethodid: '',  //处理措施id
					executorper: '',  //执行人
					fexecutorperid: '',  //执行人id
					zerenren: '',   //责任人
					fliableperid: '',   //责任人id
					fremark: '',   ///备注
				},
				//配后
				PHList: {
					erpaihao: '',   //耳号
					fearnoid: '',   //耳号id
					yichangfenlei: '',  //异常分类
					fabnormalclassid: '',  //异常分类id
					biaose: '',    //标色
					fcolorabnormalclas: '',    //标色id
					promethod: '',  //处理方法
					fpromethodid: '',  //处理方法id
					executorper: '',  //执行人
					fexecutorperid: '',  //执行人id
					zerenren: '',   //责任人
					fliableperid: '',   //责任人id
					fremark: '',    //备注
				},
				
				list: [],  //搜索选择器数据
				selectType: '',   //选择的字段
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
			uniPopup,
			tkiTree
		},
		methods: {
			/* *******************************搜索选择器转出批次相关方法************************************* */
			//选择确定
			treeConfirm(e) {
				//console.log(e);
				if(e[0]){
					if(this.selectType == 1){  //分场
						this.addData.fenchang = e[0].name
						this.addData.cffieldid = e[0].id
					}else if(this.selectType == 2){  //栋舍
						this.addData.dongshe = e[0].name
						this.addData.fpkPigfenid = e[0].id
					}else if(this.selectType == 3){   //待配耳号
						this.DPList.erpaihao = e[0].name
						this.DPList.fearnoid = e[0].id
					}else if(this.selectType == 4){  //待配上批批次号
						this.DPList.breedpc = e[0].name
						this.DPList.fbreedingbatchid = e[0].id
					}else if(this.selectType == 5){  //待配执行人
						this.DPList.executorper = e[0].name
						this.DPList.fexecutorperid = e[0].id
					}else if(this.selectType == 6){  //待配责任人
						this.DPList.zerenren = e[0].name
						this.DPList.fliableperid = e[0].id
					}else if(this.selectType == 7){  //分娩-耳牌号
						this.FMList.erpaihao = e[0].name
						this.FMList.fearnoid = e[0].id
					}else if(this.selectType == 8){  //分娩-批次号
						this.FMList.breedpc = e[0].name
						this.FMList.fbreedingbatchid = e[0].id
					}else if(this.selectType == 9){  //分娩-颜色
						this.FMList.color = e[0].name
						this.FMList.fcolorabnormalclas = e[0].id
					}else if(this.selectType == 10){  //分娩-处理措施
						this.FMList.promethod = e[0].name
						this.FMList.fpromethodid = e[0].id
					}else if(this.selectType == 11){  //分娩-执行人
						this.FMList.executorper = e[0].name
						this.FMList.fexecutorperid = e[0].id
					}else if(this.selectType == 12){  //分娩-责任人
						this.FMList.zerenren = e[0].name
						this.FMList.fliableperid = e[0].id
					}else if(this.selectType == 13){  //配后-耳号
						this.PHList.erpaihao = e[0].name
						this.PHList.fearnoid = e[0].id
					}else if(this.selectType == 14){  //配后-异常分类
						this.PHList.yichangfenlei = e[0].name
						this.PHList.fabnormalclassid = e[0].id
					}else if(this.selectType == 15){  //配后-处理方式
						this.PHList.promethod = e[0].name
						this.PHList.fpromethodid = e[0].id
					}else if(this.selectType == 16){  //配后-执行人
						this.PHList.executorper = e[0].name
						this.PHList.fexecutorperid = e[0].id
					}else if(this.selectType == 17){  //配后-责任人
						this.PHList.zerenren = e[0].name
						this.PHList.fliableperid = e[0].id
					}
				}
			},
			//显示搜索选择器
			selectRP(e) {
				this.list = []
				if(e == 1){  //分场
					this.selectType = 1
				}else if(e == 2){  //栋舍
					this.selectType = 2
				}else if(e == 3){  //待配耳号
					this.selectType = 3
				}else if(e == 4){  //待配上批批次号
					this.selectType = 4
				}else if(e == 5){  //待配执行人
					this.selectType = 5
				}else if(e == 6){  //待配责任人
					this.selectType = 6
				}else if(e == 7){  //分娩-耳牌号
					this.selectType = 7
				}else if(e == 8){  //分娩-批次号
					this.selectType = 8
				}else if(e == 9){  //分娩-颜色
					this.selectType = 9
				}else if(e == 10){  //分娩-处理方式
					this.selectType = 10
				}else if(e == 11){  //分娩-执行人
					this.selectType = 11
				}else if(e == 12){  //分娩-责任人
					this.selectType = 12
				}else if(e == 13){  //配后-耳牌号
					this.selectType = 13
				}else if(e == 14){  //配后-异常分类
					this.selectType = 14
					this.getPHYCFL('')
				}else if(e == 15){  //配后-处理方式
					this.selectType = 15
				}else if(e == 16){  //配后-执行人
					this.selectType = 16
				}else if(e == 17){  //配后-责任人
					this.selectType = 17
				}
				this.$refs.tkitree._show();
			},
			//选择器搜索框触发事件
			watchSearch(e) {
				const _this = this
				console.log(e, this.selectType)
				let timer
				clearTimeout(timer)
				timer = setTimeout(function(){
					if(_this.selectType == 1){
						_this.getFC(e)  //获取分场
					}else if(_this.selectType == 2){
						_this.getDS(e)  //获取栋舍
					}else if(_this.selectType == 3){
						_this.getDPEPH(e)  //获取待配耳号
					}else if(_this.selectType == 4 || _this.selectType == 8){
						_this.getDPSPPCH(e)  //获取上批批次号/批次号
					}else if(_this.selectType == 5 || _this.selectType == 6 || _this.selectType == 11 || _this.selectType == 12 || _this.selectType == 16 || _this.selectType == 17){
						_this.getDPZXR(e)  //获取执行人/责任人
					}else if(_this.selectType == 7){
						_this.getFMEPH(e)  //获取分娩-耳牌号
					}else if(_this.selectType == 9){
						_this.getFMYS(e)  //获取分娩-颜色
					}else if(_this.selectType == 10 || _this.selectType == 15){
						_this.getFMCLCS(e)  //获取分娩-处理方式
					}else if(_this.selectType == 13){
						_this.getPHEPH(e)  //获取配后-耳牌号
					}else if(_this.selectType == 14){
						_this.getPHYCFL(e)  //获取配后-异常分类
					}
				}, 500)
			},
			//获取分场
			getFC(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/FilterselectFenchang/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					fenchang: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.FENCHANGID
							obj.name = ele.FENCHANG
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取栋舍
			getDS(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/dongsheFilter/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					dongshe: e,
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.DONGSHEID
							obj.name = ele.DONGSHE
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取待配耳号
			getDPEPH(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/erhaoFilterE1/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					erpaihao: e,
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.ERPAIID
							obj.name = ele.ERPAIHAO
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取待配上批批次号
			getDPSPPCH(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/piciFilter/1/50';
				//console.log(e);
				let params = {
					picihao: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.PICIID
							obj.name = ele.PICIHAO
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取待配执行人
			getDPZXR(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/personFilter/1/50';
				//console.log(e);
				let params = {
					person: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.PERSONID
							obj.name = ele.PERSON
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取分娩耳号
			getFMEPH(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/erhaoFilterE3/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					erpaihao: e,
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.FID
							obj.name = ele.FNUMBER
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取分娩颜色
			getFMYS(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/colorFilter/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					color: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.COLORID
							obj.name = ele.COLOR
							listArr.push(obj)
						})
						_this.list = listArr;
					}
				)
			},
			//获取分娩处理措施
			getFMCLCS(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/handleFunFilter/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					functions: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.FUNCTIONID
							obj.name = ele.FUNCTION
							listArr.push(obj)
						})
						_this.list = listArr;
					}
				)
			},
			//获取配后耳号
			getPHEPH(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/erhaoFilterE2/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					erpaihao: e,
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.ERPAIID
							obj.name = ele.ERPAIHAO
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取配后异常分类
			getPHYCFL(e){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/yichangFilter/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					yichang: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.YICHANGID
							obj.name = ele.YICHANG
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			/* ******************************************************************* */
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
			/* **************************原始选择器方法**************************** */
			bindPickerChange: function(e) {  //类型选择
				//console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.showState = e.target.value
				this.addData.abnormaltype = this.array2[e.target.value]
			},
			bindPickerChange3: function(e) {  //分娩-异常猪只标识选择
				this.index3 = e.target.value
				this.FMList.yichangfenlei = this.array3[e.target.value]
			},
			bindPickerChange4: function(e) {  //待配-异常猪只标识选择
				this.index4 = e.target.value
				this.DPList.yichangfenlei = this.array4[e.target.value]
			},
			/* ******************************************************************** */
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
			},
			clickCancel(){
				this.neddCheck = false;
				this.editStatus=false;
				this.submitStatus=true;
			},
			/* **************************数据提交*********************************** */
			submit(){
				var _this = this;
				let url = '/TBusAbnormalPigManagement/insertTBusAbnormalPigManagement';
				let headers = {};
				if(_this.showState == 0){  //待配
					_this.addData.List = _this.DPList
				}else if(_this.showState == 1){  //分娩（产后）
					_this.addData.List = _this.FMList
				}else if(_this.showState == 2){  //配后
					_this.addData.List = _this.PHList
				}
				let params = _this.addData
				console.log('发送的数据',params)
				common.commRequest(url, params, headers, 'post',
					function(data) {
						console.log('返回的数据', data);
						if(data.status == 200){
							uni.showToast({
								title: '新增成功',
								icon: 'success',
								duration: 1000
							});
							
						}else {
							uni.showToast({
								title: '新增失败',
								icon: 'loading',
								duration: 1000
							});
						}
						
					}
				)
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
