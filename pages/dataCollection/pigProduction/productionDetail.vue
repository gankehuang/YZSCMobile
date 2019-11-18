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
					生产猪转群详情
				</view>
				<!-- @tap="togglePopup('middle')"   @click="jumpPage" -->
				<view class="status-del">
					删除
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 转群日期 -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转群日期<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text"  v-model="detailInfo.fbizdate" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								分场<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange2" :value="index2" :range="array2">
									<view class="picker">
										<view class="uni-input">{{array2[index2]}}</view>
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
												母猪上产妇<radio style="transform: scale(0.7);margin-left: 450rpx;"  :checked="falg" @click="checked"/>
											</label>
										</view>
									</view>
								</radio-group>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-value" style="width: 100%;display: flex;">
								<radio-group @change="radioChange">
									<view style="display: block;">
										<view style="display: flex;">
											<label  style="flex: 1;padding: 0;display: flex;" >
												跨分场<radio style="transform: scale(0.7);margin-left: 500rpx;"  :checked="falg1" @click="checked1"/>
											</label>
										</view>
									</view>
								</radio-group>
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入分场<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(1)">
								<!-- <picker @change="bindPickerChange" :value="index" :range="array">
									<view class="picker">
										<view class="uni-input">{{array[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker> -->
								<text>{{detailInfo.zrfenchang || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入栏舍<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(2)">
								<!-- <picker @change="bindPickerChange1" :value="index1" :range="array1">
									<view class="picker">
										<view class="uni-input">{{array1[index1]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker> -->
								<text>{{detailInfo.zrlsmc || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								转入配种批次<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(3)">
								<!-- <picker @change="bindPickerChange" :value="index" :range="array2">
									<view class="picker">
										<view class="uni-input">{{array2[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#333333" size="18" />
										</view>
									</view>
								</picker> -->
								<text>{{detailInfo.zrbreedpc || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						
					</view>
				</view>

			</view>
		</view>
		
		
		<view style="padding: 0 11px 0 15px;margin-bottom: 20px;">
			<view class="editor-title jus-j form-seat" style="padding: 0;padding: 10px 13px 10px 10px;">
				<view class="titleicon">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>转群明细</text>
				</view>
				
			</view>
		</view>
		<!-- 列表 -->
		<view class="list list-table" style="padding-top: 200rpx;">
			<view class="data__wrapper">
				<ztable :tableData="tableData" stickSide stickSide1 :columns="columns" showSelect="true"  @onSelect="checkbox" :neddCheck="true" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view>
		
		<!-- 内容 -->
		<!-- <view class="main">
			<view class="main-wrap" style="padding-top: 10rpx;">
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
								<input type="text"  placeholder="请输入耳牌号" />
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
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
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
		</view> -->
		
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
	import ztable from '@/components/z-table-1/z-table'
	import common from '../../../utils/common.js';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
	export default {
		onLoad() {
			//this.getOptionList(1);  //获取转入栏舍数据
			//this.getOptionList(2);  //获取转入分场数据
		},
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
				index: 0,   //转入分场标识
				index1: 0,  //转日栏舍标识
				index2: 0,  //分场标识
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
				array2: ['B超', 'A超'],   //分场
				array: [],  //转入分场
				ylarray: [],  //转入分场未转换前
				array1: [],  //转入栏舍
				ylarray1: [],  //转入栏舍未转换前
				date: currentDate,
				neddCheck:false,
				submitStatus:true,
				editStatus:false,
				//提交数据
				detailInfo: {
					fbizdate: '',   //转群日期
					cffieldid: '',   //分厂
					isspz: '',   //母猪上产房
					iskfc: '',    //跨分厂
					zrfenchang: '',    //转入分厂
					zrlsmc: '',    //转入栏舍
				},
				
				list: [],  //搜索选择器数据
				selectType: '',   //选择的字段
				
				tableData: [
					{
						id: '01',
						index: '1',
						erpaihao: '-',
						pigstate: '-',
						jedays: '-'
					},
				],
				columns: [
					{
						title: '序号',
						key: 'index',
						width: 150
					},
					{
						title: '耳牌',
						key: 'erpaihao',
						width: 200
					},
					{
						title: '配种批次',
						key: 'pigstate',
						width: 200
					},
					{
						title: '转入配种批次',
						key: 'jedays',
						width: 300
					}
					
				],
				
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
						this.detailInfo.zrfenchang = e[0].name
					}else if(this.selectType == 2){  //转入栏舍
						this.detailInfo.zrlsmc = e[0].name
					}else if(this.selectType == 3){   //转入配种批次
						this.detailInfo.zrbreedpc = e[0].name
					}
				}
			},
			//显示搜索选择器
			selectRP(e) {
				this.list = []
				if(e == 1){  //转入分厂
					this.selectType = 1
				}else if(e == 2){  //转入栏舍
					this.selectType = 2
				}else if(e == 3){  //转入配种批次
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
						_this.getZRFC(e)  //获取转入分厂
					}else if(_this.selectType == 2){
						_this.getZRLS(e)  //获取转入栏舍
					}else if(_this.selectType == 3){
						_this.getZRPZPC(e)  //转入配种批次
					}
				}, 500)
			},
			//获取转入分厂
			getZRFC(e){
				var _this = this;
				let url = '/PigAdjustableOrder/selectZrfield/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					zrfenchang: e,
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
			//获取转入栏舍
			getZRLS(e){
				var _this = this;
				let url = '/PigAdjustableOrder/selectInpen/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					zhuanrulanshe: e,
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
			//转入配种批次
			getZRPZPC(e){
				var _this = this;
				let url = '/PigAdjustableOrder/selectZhuanrupici/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					zhuanrupicihao: e,
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.PEIZHONGPICIID
							obj.name = ele.PEIZHONGPICIHAO
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
			},
			/* ****************************************************************** */
			//获取表格勾选数据
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
				//this.addData.List = selecrArr
				//console.log(JSON.stringify(selecrArr))
				
			},
			
			getOptionList(type) {  //获取转入分厂，转入栏舍选择项
				var _this = this;
				let url;
				if(type == 1){  //转入栏舍
					url = '/PigAdjustableOrder/selectInpen/1/1000';
				} else {   //转入分厂
					url = '/PigAdjustableOrder/selectZrfield/1/100';
				}
				let params = {
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						let getData = data.data.list;
						if(type == 1) {
							_this.ylarray1 == getData
						}else {
							_this.ylarray = getData
						}
						let getArr = [];
						getData.forEach((item, index) => {
							getArr.push(item.boxname)
						})
						if(type ==1) {
							_this.array1 = getArr;
						}else {
							_this.array = getArr;
						}
					}
				)
			},
			checked(){  //母猪上产房
				this.falg = !this.falg
				this.addData.isspz = this.falg
			},
			checked1(){   //是否跨分场
				this.falg1 = !this.falg1
				this.addData.iskfc = this.falg1
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
			bindPickerChange: function(e) {  //转入分厂
				//console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindPickerChange1: function(e) {  //栏舍
				//console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.target.value
			},
			bindPickerChange2: function(e) {  //分厂
				//console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.target.value
				this.addData.cffieldid = this.array2[this.index2]
			},
			
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {  //获取当前时间
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
			/* *************************提交更新数据****************************** */
			submit(){
				var _this = this;
				let url = '/PigAdjustableOrder/updateCtPigAdjustableOrder';
				let headers = {};
				let params = _this.detailInfo
				console.log('发送的数据',params)
				common.commRequest(url, params, headers, 'post',
					function(data) {
						console.log('返回的数据', data);
						if(data.status == 200){
							uni.showToast({
								title: '提交成功',
								icon: 'success',
								duration: 1000
							});
						}else {
							uni.showToast({
								title: '提交失败',
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
