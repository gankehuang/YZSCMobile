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
					批次猪转舍新增
				</view>
				<!-- @tap="togglePopup('middle')"   @click="jumpPage" -->
				<view class="status-del"  @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/batchPig/batchPigQuery">
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
								是否跨分场
							</view>
							<view class="main-wrap-contetnt-item-field-value" style="display: flex;">
								<radio-group @change="radioChange">
									<view style="display: block;">
										<view style="display: flex;">
											<label style=";padding: 0;display: flex;" >
												<radio style="transform: scale(0.7);margin-left: 30px;"  :checked="falg3" @click="checked3"/>
											</label>
										</view>
									</view>
								</radio-group>
							</view>
						</view>
						
						<!-- 转入分场 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入分场
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(1)">
								<text>{{addData.zrfenchang || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
							<!-- <view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange2" :value="index2" :range="array2">
									<view class="picker">
										<view class="uni-input">{{array2[index2]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker>
							</view> -->
						</view>
						<!-- 转群类别 * -->
						<view class="main-wrap-contetnt-item-field" >
							<view class="main-wrap-contetnt-item-field-name">
								转群类别<text class="text-red">*</text>
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
						<!-- 转出批次 * -->
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								转出批次<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(2)">
								<text>{{addData.zcpici || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						<!-- 转出舍 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转出舍
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.zcsmc" placeholder="默认带出" />
							</view>
						</view>
						<!-- 转入批次 -->
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								转入批次
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP1()">
								<text>{{addData.zrpici || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						<!-- 转入舍 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入舍
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.zrsmc" placeholder="默认带出" />
							</view>
						</view>
						<!-- 转出日龄 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转出日龄
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.cfinday" placeholder="默认带出" />
							</view>
						</view>
						<!-- 总重量 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								总重量<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.cfinwgt" placeholder="请输入总重量" />
							</view>
						</view>
						
						<!-- 头数 -->
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								头数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="addData.cfincnt" placeholder="请输入头数" />
							</view>
						</view>
						
						
					</view>
				</view>
			</view>
		</view>
		
		<view class="main" v-if="HBStatus">
			<view class="main-wrap" style="padding-top: 0;">
				<view class="main-wrap-contetnt" style="padding-bottom: 0;">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-title">
							<view class="main-wrap-contetnt-item-title-text" style="font-size: 14px;margin: 0;">后备转群耳号</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								耳牌号
								<image @click="qr" style="margin: 0;" src="../../../static/search/qr.png" mode="" class="icon"></image>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" v-model="searchData.erpaihao" placeholder="请输入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								日龄
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="number" v-model="searchData.minriling" placeholder="请输入" style="width: 100rpx;text-align: center;border-bottom: 1px solid lightgray;" />-
								<input type="number" v-model="searchData.maxriling" placeholder="请输入" style="width: 100rpx;text-align: center;border-bottom: 1px solid lightgray;" />
							</view>
						</view>
						<view class="submits jus-b">
							<button type="primary" @tap="search" class="flexc submit-btn" style="border-radius: 150rpx;" >查询</button>
						</view>
					</view>
				</view>
			</view>
			<view class="list" style="padding-top: 0;">
				<view class="data__wrapper">
					<ztable :tableData="tableData" tableHeight="500" showSelect="true" stickSide stickSide1 :columns="columns" :neddCheck="true" emptyText="-" :showBottomSum="false" @onSelect="checkbox"></ztable>
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
		<!-- 搜索转入选择器 -->
		<tki-tree ref="tkitree1"
		@watchSearch="watchSearch1"
		:range="list1"
		rangeKey="name"
		confirmColor="#5089f9"
		@confirm="treeConfirm1"></tki-tree>
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
	import ztable from '@/components/z-table-1/z-table'
	import common from '../../../utils/common.js';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
	export default {
		onLoad() {
			this.getType();
			//this.getHBData()  获取后备猪表格数据（测试）
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				falg:'',
				falg1:'',
				falg2:'',
				falg3:'',  //是否跨分厂状态
				type: '',
				index: 0,
				index2: 0,
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
				array: [],   //转群类别
				ylarray: [],  //转群类别未转换前
				date: currentDate,
				neddCheck:false,
				submitStatus:true,
				editStatus:false,
				
				list: [],  //搜索选择器数据
				selectType: '',   //选择的字段
				
				list1: [],  //搜索转入批次选择器数据
				
				//新增数据
				addData: {
					iskfc: '',  //是否跨分厂
					zrfenchang: '',   //转入分厂
					zqtype: '',    //转群类别
					zcpici: '',  //转出批次
					zcsmc: '',   //转出舍
					zrpici: '',   //转入批次
					zrsmc: '',    //转入舍
					cfinday: '',  //转出日龄
					cfinwgt: '',  //总重量
					cfincnt: '',   //头数
					List: ''     //后备表格勾选数据
				},
				
				ZRPCType: '',   //转入批次
				ZCPCType: '',   //转出批次
				HBStatus: false,  //后备公猪母猪表格显示隐藏状态
				
				//后备搜索数据
				searchData: {
					maxriling: '',   //最大日龄
					minriling: '',   //最小日龄
					erpaihao: '',    //耳牌号
					piciid: '',   //批次id  53p6BlBLTbqmrDZT9tz4vL3Plts=
				},
				
				//表格数据
				tableData: [{
						id: '1',
						index: '01',
						erpaihao: 'Y001', 
						ycyy: 'xx'
					}
				],
				columns: [{
						title: "序号",
						key: "id",
						width: 150,
					}, {
						title: "耳牌号",
						key: "ERPAIHAO",
						width: 290,
					}, {
						title: "日龄",
						key: "RILING",
						width: 290,
					}
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
					if(this.selectType == 1){  //转入分厂
						this.addData.zrfenchang = e[0].name
					}else if(this.selectType == 2){  //转出批次
						this.addData.zcpici = e[0].name
						this.addData.zcsmc = e[0].id  //选择转出批次带出转出舍
						this.addData.cfinday = e[0].rl   //自动带出转出日龄
						this.searchData.piciid = e[0].piciid   //将批次id传给后备搜索数据
						if(this.array[this.index] == '同类型猪转群'){
							this.ZRPCType = e[0].pigtypeid;
							this.getZRPC('', this.ZRPCType)  //连带获取转入批次
							//console.log(e[0].pigtype)
							if(e[0].pigtype == '后备公猪' || e[0].pigtype == '后备母猪'){
								this.HBStatus = true
							}else{
								this.HBStatus = false
							}
						}else{
							this.HBStatus = false
						}
					}
				}
			},
			//显示搜索选择器
			selectRP(e) {
				
				if(e == 1){  //转入分厂
					this.list = [];
					this.selectType = 1
				}else if(e == 2){  //转出批次
					this.selectType = 2
				}
				this.$refs.tkitree._show();
			},
			//转出批次选择器搜索框触发事件
			watchSearch(e) {
				const _this = this
				console.log(e, this.selectType)
				let timer
				clearTimeout(timer)
				timer = setTimeout(function(){
					if(_this.selectType == 1){
						_this.getZRFC(e)  //获取转入分厂
					}else if(_this.selectType == 2){
						if(_this.array[_this.index] == '同类型猪转群'){
							_this.getZCPC(e, '')  //获取转出批次
						}else {
							_this.ZCPCType = _this.ylarray[_this.index].ZHAUNRUZHUHZILEIBIEID
							_this.getZCPC(e, _this.ZCPCType)  //获取转出批次
						}
						
					}
				}, 500)
			},
			//获取转出批次
			getZCPC(e, pigtypeid){
				var _this = this;
				let url = '/PigChangingPool/FilterselectOutPici/1/100';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					outpici: e,
					pigtypeid: pigtypeid     //转群类别ID
				};
				console.log(params)
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.DONGSHE
							obj.name = ele.PICIHAO
							obj.rl = ele.RILING
							obj.pigtypeid = ele.PIGTYPEID
							obj.pigtype = ele.PIGTYPE
							obj.piciid = ele.PICIID
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			//获取转入批次
			getZRPC(e, pigtypeid){
				var _this = this;
				let url = '/PigChangingPool/FilterselectInPici/1/100';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					inpici: e,
					pigtypeid: pigtypeid    //转群类别ID
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.DONGSHE
							obj.name = ele.PICIHAO
							obj.pigtype = ele.PIGTYPE
							listArr.push(obj)
						})
						_this.list1 = listArr;
						
					}
				)
			},
			//获取转入分厂
			getZRFC(e){  
				var _this = this;
				let url = '/PigChangingPool/FilterselectFenchang/1/100';
				//console.log(e);
				let params = {
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					fenchang: e
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
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
			
			/* *******************************搜索选择器转入批次相关方法************************************* */
			//选择确定
			treeConfirm1(e) {
				//console.log(e);
				if(e[0]){
					this.addData.zrpici = e[0].name
					this.addData.zrsmc = e[0].id  //选择转出批次带出转入舍
				}
			},
			//显示搜索选择器
			selectRP1(e) {
				this.$refs.tkitree1._show();
			},
			//转入批次选择器搜索框触发事件
			watchSearch1(e) {
				const _this = this
				console.log(e, this.selectType1)
				let timer
				clearTimeout(timer)
				timer = setTimeout(function(){
					if(_this.array[_this.index] == '同类型猪转群'){
						_this.getZRPC(e, '')  //获取转入批次
					}else {
						_this.ZRPCType = _this.ylarray[_this.index].ZHAUNRUZHUHZILEIBIEID
						_this.getZRPC(e, _this.ZRPCType)  //获取转入批次
					}
					
				}, 500)
			},
			/* ******************************************************************** */
			
			getType(){  //获取转群类别
				var _this = this;
				let url = '/PigChangingPool/FilterselectTranstype';
				let params = {
					//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						console.log(data)
						let getData = data.data;
						_this.ylarray = getData
						let getArr = [];
						getData.forEach((item, index) => {
							getArr.push(item.ZHUANQUNLEIBIE)
						})
						_this.array = getArr;
						
					}
				)
			},
			//转群类别确定
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.addData.zqtype = this.array[this.index]
				if(this.array[this.index] == '同类型猪转群'){
					this.list = []
					this.list1 = []
					this.addData.zcpici = ''
					this.addData.zcsmc = ''
					this.addData.zrpici = ''
					this.addData.zrsmc = ''
					this.addData.cfinday = ''
				}else {
					console.log(this.ylarray[this.index].ZHAUNRUZHUHZILEIBIEID)
					console.log(this.ylarray[this.index].ZHUANCHUZHUHZILEIBIEID)
					this.getZRPC('', this.ylarray[this.index].ZHAUNRUZHUHZILEIBIEID)
					this.getZCPC('', this.ylarray[this.index].ZHUANCHUZHUHZILEIBIEID)
				}
				
			},
			/* ***************************后备表格相关方法方法************************* */
			getHBData(){  //获取表格数据
				var _this = this;
				let url = '/PigChangingPool/FilterHoubeiZhuanqun/1/100';
				//console.log(e);
				let params = _this.searchData;
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						
						let listArr = []
						EPList.forEach((ele, index) => {
							let obj = {}
							obj.id = ele.RN
							obj.ERPAIHAO = ele.ERPAIHAO
							obj.RILING = ele.RILING
							obj.ZHUZHIID = ele.ZHUZHIID
							
							listArr.push(obj)
						})
						_this.tableData = listArr;
					}
				)
			},
			//获取后备表格勾选数据
			checkbox(e){ 
				console.log(e);
				let tabledata = this.tableData
				let selecrArr = []
				for(let i=0; i<e.length; i++){
					let obj = {}
					let num = e[i] + 1
					//console.log(num)
					//console.log(tabledata)
					for(let j=0; j<tabledata.length; j++){
						if(num == tabledata[j].id){
							obj.erpaihaoid = tabledata[j].ZHUZHIID
							obj.erpaihao = tabledata[j].ERPAIHAO
							obj.riling = tabledata[j].RILING
							selecrArr.push(obj)
						}
					}
				}
				this.addData.List = selecrArr
				//console.log(JSON.stringify(selecrArr))
				
			},
			
			/* ******************************************************************** */
			checked(){
				this.falg = !this.falg
			},
			checked1(){
				this.falg1 = !this.falg1
			},
			checked2(){
				this.falg2 = !this.falg1
			},
			/* *************************是否跨分厂选择事件************************************* */
			checked3(){
				this.falg3 = !this.falg3
				this.addData.iskfc = this.falg3 ? '是' : '否'
				console.log(this.falg3)
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
			
			/* ****************************数据提交********************************** */
			submit() {
				var _this = this;
				let url = '/PigChangingPool/insertCtPigChangingPool';
				let headers = {};
				let params = _this.addData
				console.log('发送的数据',params)
				common.commRequest(url, params, headers, 'post',
					function(data) {
						console.log('返回的数据', data);
						uni.showToast({
							title: '新增成功',
							icon: 'success',
							duration: 1000
						});
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

			padding-left: 20%;
		}
		.status-del {
			flex: none;
			width: 15%;
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
