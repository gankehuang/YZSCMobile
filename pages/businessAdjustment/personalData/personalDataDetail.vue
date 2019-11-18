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
					个体信息详情
				</view>
				<view class="status-del">
					<!-- 删除 -->
				</view>
			</view>

		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						
						<view class="main-wrap-contetnt-item-field" style="flex-direction: column;">
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name">
									耳牌号<text class="text-red">*</text>
									<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
										<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
									</view>
								</view>
								<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(1)">
									<!-- <input type="text" v-model="personalDataItem.cfnewearno" value="" placeholder="请输入耳牌号" /> -->
									<text>{{personalDataItem.cfnewearno || '请输入'}}</text>
									<uni-icon type="arrowright" color="#B2B2B2" size="16" />
								</view>
							</view>
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									原耳牌
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<!-- <input type="text" v-model="personalDataItem.cfoldearno" value="" placeholder="自动带出" class="abreast_font" /> -->
									<text class="abreast_font">{{personalDataItem.cfoldearno}}</text>
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" style="flex-direction: column;">
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name">
									品种
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="personalDataItem.fnewpigvarieties" value="" placeholder="请输入品种" />
								</view>
							</view>
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									原品种
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<!-- <input type="text" v-model="personalDataItem.foldoigvarieties" value="" placeholder="自动带出" class="abreast_font" /> -->
									<text class="abreast_font">{{personalDataItem.foldoigvarieties}}</text>
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" style="flex-direction: column;">
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name">
									品系
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="personalDataItem.fnewpigpx" value="" placeholder="请输入品系" />
								</view>
							</view>
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									原品系
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<!-- <input type="text" v-model="personalDataItem.foldpigpx" value="" placeholder="自动带出" class="abreast_font" /> -->
									<!-- <text class="abreast_font">{{personalDataItem.foldpigpx}}</text> -->
									<text class="abreast_font">{{personalDataItem.foldpigpx}}</text>
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" style="flex-direction: column;">
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name">
									胎次
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="personalDataItem.fnewparity" value="" placeholder="请输入胎次" />
								</view>
							</view>
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									原胎次
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<!-- <input type="text" v-model="personalDataItem.foldparity" value="" placeholder="自动带出" class="abreast_font" /> -->
									<text class="abreast_font">{{personalDataItem.foldparity}}</text>
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" style="flex-direction: column;">
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name">
									出生日期
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="personalDataItem.fnewbirth" value="" placeholder="请输入出生日期" />
								</view>
							</view>
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									原出生日期
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<!-- <input type="text" v-model="personalDataItem.foldbirth" value="" placeholder="自动带出" class="abreast_font" /> -->
									<text class="abreast_font">{{personalDataItem.foldbirth}}</text>
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" style="flex-direction: column;">
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name">
									国标号
								</view>
								<view class="main-wrap-contetnt-item-field-value">
									<input type="text" v-model="personalDataItem.fnewindno" value="" placeholder="请输入国标号" />
								</view>
							</view>
							
							<view class="abreast">
								<view class="main-wrap-contetnt-item-field-name abreast_font">
									原国标号
								</view>
								<view class="main-wrap-contetnt-item-field-value ">
									<!-- <input type="text" v-model="personalDataItem.foldindno" value="" placeholder="自动带出" class="abreast_font" /> -->
									<text class="abreast_font">{{personalDataItem.foldindno}}</text>  
								</view>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								调整原因<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="personalDataItem.fadjustreason" placeholder="请输入调整原因" />
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b">
			<button type="primary" @tap="submit" class="flexc submit-btn">保存</button>
		</view>
		
		<!-- 搜索转出选择器 -->
		<tki-tree ref="tkitree"
		@watchSearch="watchSearch"
		:range="list"
		rangeKey="name"
		confirmColor="#5089f9"
		@confirm="treeConfirm"></tki-tree>
	</view>

</template>

<script>
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
	import common from '../../../utils/common.js';
	export default {
		onLoad(options) {
			const _this = this
			uni.getStorage({  //接受列表页传过来的详情数据
				key: 'personalDataItem',
				success: function (res) {
					res.data.fadjustreason = ''
					_this.personalDataItem = res.data;
				}
			});
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				falg3:'',
				array: ['请选择配种时段', '美国', '巴西', '日本'],
				array1: ['张三', '美国', '巴西', '日本'],
				array2: ['请选择转入位置', '分娩舍1栋1单元', '分娩舍1栋2单元', '分娩舍1栋3单元', '分娩舍1栋4单元'],
				array3: ['请选择配种批次', 'PC-201365', 'PC-201565', 'PC-201355', 'PC-201360'],
				index: 0,
				
				list: [],  //搜索选择器数据
				selectType: '',   //选择的字段
				
				date: currentDate,
				personalDataItem: '',   //列表页传递过来的详情数据
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
		components:{
			uniIcon,
			tkiTree
		},
		methods: {
			/* *******************************搜索选择器转出批次相关方法************************************* */
			//选择确定
			treeConfirm(e) {
				//console.log(e);
				if(e[0]){
					if(this.selectType == 1){  //分场
						this.personalDataItem.cfnewearno = e[0].name
						this.getEPInfo(e[0].name)
					}
				}
			},
			//显示搜索选择器
			selectRP(e) {
				this.list = []
				if(e == 1){  //分场
					this.selectType = 1
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
						_this.getEPH(e)  //获取耳牌号
					}
				}, 500)
			},
			//获取耳牌号
			getEPH(e){
				var _this = this;
				let url = '/CtPigBatchAdjustEarnoBill/selectErpaiFilter/1/50';
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
							obj.id = ele.PIGD
							obj.name = ele.ERPAIHAO
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//选择耳牌号自动带出后面信息方法
			getEPInfo(e){
				uni.showLoading({
					title: '加载中'
				});
				var _this = this;
				let url = '/CtPigBatchAdjustEarnoBill/selectPigInfoFilter/1/10';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					erpaihao: e,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						console.log(data);
						let EPInfo = data.data[0];
						_this.personalDataItem.fnewpigvarieties = EPInfo.PINZHONG
						_this.personalDataItem.fnewpigpx = EPInfo.PINXI
						_this.personalDataItem.fnewparity = EPInfo.TAICI
						_this.personalDataItem.fnewbirth = _this.formatDate(EPInfo.BIRTHDAY)
						_this.personalDataItem.fnewindno = EPInfo.GUOBIAOHAO
						
						uni.hideLoading();
						
					}
				)
			},
			/* ********************************************************* */
			checked3(){
				this.falg3 = !this.falg3
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
			},
			/* ***************************数据提交********************************* */
			submit(){
				var _this = this;
				let url = '/CtPigBatchAdjustEarnoBill/updateCtPigBatchAdjustEarnoBill';
				let headers = {};
				let params = _this.personalDataItem
				//console.log('发送的数据',params)
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
			},
			formatDate(value) {  //时间格式转换
				let time = Number(value)
				let date = new Date(time);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + MM + '-' + d;
			},
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

input{
	font-size: 14px;
}
	.status-header {
		padding-top: 26rpx;

		.status-title {
			padding-left: 35%;
		}
	}

	.abreast{
		display: flex;
		justify-content: space-between;
		font-weight: 700;
		width: 100%;
		
	}
	.abreast_font{
		font-size: 12px !important;
		font-weight: 400 !important;
	}
</style>
