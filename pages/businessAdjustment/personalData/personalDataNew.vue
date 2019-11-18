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
					个体信息新增
				</view>
				<!-- @tap="togglePopup('middle')"   @click="jumpPage" -->
				<view class="status-del"  @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/businessAdjustment/personalData/personalDataQuery">
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
								分场<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(1)">
								<text>{{addData.fenchang || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom" @tap="selectRP(2)">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								栋舍<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<text>{{addData.dongshe || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap" style="padding-top: 10rpx;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text" style="font-size: 14px;margin: 0;">个体信息明细</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field" >
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(3)">
								<text>{{addData.cfnewearno || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								品种
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.fnewpigvarieties" placeholder="请输入品种" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								品系
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.fnewpigpx" placeholder="请输入品系" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								胎次
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.fnewparity" placeholder="请输入胎次" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								出生日期
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.fnewbirth" placeholder="请输入出生日期" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								国标号
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.fnewindno" placeholder="请输入国标号" />
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
				addData: {
					fenchang: '',   //分厂
					dongshe: '',    //栋舍
					cfnewearno: '',  //耳牌号
					fnewpigvarieties: '',  //品种
					fnewpigpx: '',   //品系
					fnewparity: '',  //胎次
					fnewbirth: '',   //出生日期
					fnewindno: '',   //国标号
				},
				
				list: [],  //搜索选择器数据
				selectType: '',   //选择的字段
				
				type: '',
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
				date: currentDate,
				neddCheck:false,
				submitStatus:true,
				editStatus:false,
				tableData: [
					{
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
					},
				],
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
					},
				]
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
					}else if(this.selectType == 2){  //栋舍
						this.addData.dongshe = e[0].name
					}else if(this.selectType == 3){   //耳牌号
						this.addData.cfnewearno = e[0].name
						this.getEPInfo(e[0].name)
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
				}else if(e == 3){  //耳牌号
					this.selectType = 3
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
						_this.getEPH(e)  //获取耳牌号
					}
				}, 500)
			},
			//获取分场
			getFC(e){
				var _this = this;
				let url = '/CtPigBatchAdjustEarnoBill/selectFenchangFilter/1/50';
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
				let url = '/CtPigBatchAdjustEarnoBill/selectDongsheFilter/1/50';
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
						_this.addData.fnewpigvarieties = EPInfo.PINZHONG
						_this.addData.fnewpigpx = EPInfo.PINXI
						_this.addData.fnewparity = EPInfo.TAICI
						_this.addData.fnewbirth = _this.formatDate(EPInfo.BIRTHDAY)
						_this.addData.fnewindno = EPInfo.GUOBIAOHAO
						
						uni.hideLoading();
						
					}
				)
			},
			/* ***************************数据提交********************************* */
			submit(){
				var _this = this;
				let url = '/CtPigBatchAdjustEarnoBill/insertCtPigBatchAdjustEarnoBill';
				let headers = {};
				let params = _this.addData
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
							//提交成功清空明细输入框
							let QkData =  {
								cfnewearno: '',  //耳牌号
								fnewpigvarieties: '',  //品种
								fnewpigpx: '',   //品系
								fnewparity: '',  //胎次
								fnewbirth: '',   //出生日期
								fnewindno: '',   //国标号
							}
							_this.addData = {..._this.addData, ...QkData}
							console.log(_this.addData)
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
			/* ****************************************************************** */
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
