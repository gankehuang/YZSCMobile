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
					死亡记录详情
				</view>
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
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								是否批次<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange1" :value="index1" :range="array1">
									<view class="picker">
										<view class="uni-input">{{array1[index1]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field" v-if="!falg">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<text @tap="selectRP(1)">{{detailData.erpaihao || '-'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field" v-if="falg">
							<view class="main-wrap-contetnt-item-field-name">
								批次号<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<text @tap="selectRP(2)">{{detailData.picihao || '-'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						<!-- <view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号/批次号<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="detailData.picihao" />
							</view>
							
						</view> -->
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								存栏位置
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="detailData.clwz" />
							</view>
							<!-- <view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange4" :value="index4" :range="array4">
									<view class="picker">
										<view class="uni-input">{{array4[index4]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16" />
										</view>
									</view>
								</picker>
							</view> -->
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								死亡原因<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange3" :value="index3" :range="array3">
									<view class="picker">
										<view class="uni-input">{{array3[index3]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16" />
										</view>
									</view>
								</picker>
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								死亡头数<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="detailData.ljswcount" placeholder="-" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								总重量<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="detailData.cftogwt" placeholder="-" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								均重<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="detailData.cfavgwt" placeholder="-" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								处理方式
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="detailData.cfpkHandle" />
							</view>
							<!-- <view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array3" placeholder="请选择处理方式">
									<view class="picker">
										<view class="uni-input">{{array3[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16" />
										</view>
									</view>
								</picker>
							</view> -->
						</view>
					</view>
				</view>
				<!-- 标题 -->
				<view class="editor-title flex ali-c">
					<view class="img">
						<image src="/static/assets/rect.png" mode=""></image>
						<text>死亡照片</text>
					</view>
				</view>
				<view class="main-wrap-contetnt camera">
					<image-grid :options="mode.factModifyInfo.imageList" @chooseImage="chooseImage" @delImg="delImg" :isEditable="true"/>
				</view>
				<!-- <view class="takePhotoList">
					<view class="takephotoItem">
						<image class="img" src="/static/assets/plus.png" mode=""></image>
					</view>
				</view> -->
				<!-- 列表 -->
				<view class="submits jus-b">
					<button type="primary" class="flexc submit-btn">保存</button>
				</view>
			</view>
		</view>
		
		<!-- 搜索选择器 -->
		<tki-tree ref="tkitree"
		@watchSearch="watchSearch"
		:range="list"
		rangeKey="name"
		confirmColor="#5089f9"
		@confirm="treeConfirm"></tki-tree>
	</view>

</template>

<script>
	import imageGrid from '@/components/myimage-grid/image-grid.vue'
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import common from '../../../utils/common.js';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
	var _self;
	export default {
		onLoad(options) {
			_self = this;
			this.fid = decodeURIComponent(options.id);
			//console.log(this.fid);
			this.getDeathType();
			setTimeout(function(){
				_self.getDetail();
			}, 500)
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				fid: '',  //详情ID
				detailData: '',
				mode: {
					factModifyInfo:{
						imageList:[]//照片
					}
				},
				index: 0,
				array: ['请选择配种时段', '美国', '巴西', '日本'],
				//是否批次
				index1: 0,
				array1: ['否', '是'],
				
				index2: 0,
				array2: ['请选择转入位置', '分娩舍1栋1单元', '分娩舍1栋2单元', '分娩舍1栋3单元', '分娩舍1栋4单元'],
				//死亡原因
				index3: 0,
				array3: ['请选择配种批次'], 
				//存栏位置
				index4: 0,
				array4: ['请选择存栏位置'], 
				date: currentDate,
				
				falg: false,  //控制耳牌号/批次号显示隐藏
				
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
		components:{uniIcon, imageGrid, tkiTree},
		methods: {
			/* *******************************搜索选择器相关方法************************************* */
			//选择确定
			treeConfirm(e) {
				//console.log(e);
				if(e[0]){
					if(this.selectType == 1){  //耳牌号
						this.searchForm.erpaihao = e[0].name
						this.searchForm.cfearnoid = e[0].id
					}else if(this.selectType == 2){  //批次号
						this.searchForm.picihao = e[0].name
						this.searchForm.cfbthnoid = e[0].id
					}
				}
			},
			selectRP(e) {  //显示搜索选择器
				this.list = [];
				if(e == 1){  //耳牌号选择
					this.selectType = 1
				}else if(e == 2){  //批次号选择
					this.selectType = 2
				}
				this.$refs.tkitree._show();
			},
			//耳牌号选择器搜索框触发事件
			watchSearch(e) {
				const _this = this
				console.log(e, this.selectType)
				let timer
				clearTimeout(timer)
				timer = setTimeout(function(){
					if(_this.selectType == 1){
						_this.getEPH(e)  //获取耳牌号
					}else if(_this.selectType == 2){
						_this.getPCH(e)  //获取批次号
					}
				}, 500)
			},
			getPCH(e){  //获取批次号
				var _this = this;
				let url = '/PigDeadRecord/FilterselectPici/1/100';
				//console.log(e);
				let params = {
					//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					picihao: e
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
			getEPH(e){  //获取耳牌号
				var _this = this;
				let url = '/PigDeadRecord/FilterselectErpai/1/100';
				//console.log(e);
				let params = {
					cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					erpaihao: e
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						//console.log(data);
						let EPList = data.data;
						let listArr = []
						EPList.forEach(ele => {
							let obj = {}
							obj.id = ele.PIGID
							obj.name = ele.ERPAIHAO
							listArr.push(obj)
						})
						_this.list = listArr;
					}
				)
			},
			/* ******************************************************************** */
			
			
			//获取详情
			getDetail(){  
				var _this = this;
				let url = '/PigDeadRecord/selectPigDeadRecordByFid';
				let params = {
					fid: this.fid,
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						let getData = data.data;
						_this.detailData = getData;
						//console.log(getData);
						if(getData.ispici == '否'){
							_this.index1 = 0;
							_this.falg = false
							
						}else {
							_this.index1 = 1;
							_this.falg = true
						}
						
						let newArr3 = _this.array3;
						//console.log(newArr3)
						for(let i=0; i<newArr3.length; i++) {
							if(newArr3[i] == getData.siwangyuanyin){
								_this.index3 = i;
							}
						}
					}
				)
			},
			getDeathType(){  //获取死亡原因
				var _this = this;
				let url = '/PigDeadRecord/FilterselectDeadReson/1/100';
				let params = {
					//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						let getData = data.data;
						//_this.ylarray = getData
						let getArr = [];
						getData.forEach((item, index) => {
							getArr.push(item.DEADREASON)
						})
						_this.array3 = getArr;
						
					}
				)
			},
			/* *************************上传图片相关方法********************************* */
			delImg(object){
				_self.mode.factModifyInfo.imageList.splice(object.index, 1); 
			},
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed'],
					count: 1,
					success: (chooseImageRes) => {
						
						for (let i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
							var imageSrc = chooseImageRes.tempFilePaths[i]
							
							console.log(imageSrc);
							common.yzUploadFile(imageSrc, '/newfile/newInsertfile', function(data){  //文件上传
								console.log(data)
								let len = _self.mode.factModifyInfo.imageList.length;
								_self.mode.factModifyInfo.imageList.splice(len-1,0, imageSrc);
							});
						}
					}
				})
			},
			/* *************************选择相关方法********************************* */
			//死亡原因选择
			bindPickerChange3: function(e) {
				//console.log('picker发送选择改变，携带值为', e.target.value)
				this.index3 = e.target.value
			},
			bindPickerChange1: function(e) {
				//console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.target.value
				this.falg = !this.falg
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			/* *************************获取当日时间********************************* */
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
			
			/* *************************更新数据********************************* */
			updateData() {
				var _this = this;
				let url = '/PigDeadRecord/updateCtPigDeadRecords';
				let headers = {};
				let params = _this.detailData
				console.log('发送的数据',params)
				common.commRequest(url, params, headers, 'post',
					function(data) {
						console.log('返回的数据', data);
						uni.showToast({
							title: '更新成功',
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
			padding-left: 35%;
		}
	}

	.main {
		.main-wrap {
			padding: 160rpx 23rpx 23rpx 23rpx;
			
			.camera {
				padding: 5px 10px;
			}
		}
	}
</style>
