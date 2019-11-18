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
					死亡记录新增
				</view>
				<view class="status-del" @click="jumpPage" data-key="历史记录" data-jumpurl="/pages/dataCollection/deathRecord/deathQuery">
					历史记录
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
								<radio-group>
									<view style="display: block;">
										<view style="display: flex;">
											<label style="display: flex; margin-right: 25rpx;" >
												<radio style="transform: scale(0.7);"  :checked="!falg" @click="checked"/>否
											</label>
											<label style="display: flex; padding-right: 0;" >
												<radio style="transform: scale(0.7);" :checked="falg" @click="checked"/>是
											</label>
										</view>
									</view>
								</radio-group>
							</view>
						</view>

						<view class="main-wrap-contetnt-item-field" v-if="!falg">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<text @tap="selectRP(1)">{{addData.erpaihao}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field" v-if="falg">
							<view class="main-wrap-contetnt-item-field-name">
								批次号<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<text @tap="selectRP(2)">{{addData.picihao}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								存栏位置
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="addData.clwz" placeholder="请输入存栏位置" />
							</view>
							<!-- <view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array3">
									<view class="picker">
										<view class="uni-input">{{array3[index]}}</view>
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
								<text @tap="selectRP(3)">{{addData.siwangyuanyin}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>
						<!-- <view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								死亡原因<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<str-autocomplete :stringList="stringList" :importvalue="title" @select="selectOne" highlightColor="#FF0000" v-model="title"></str-autocomplete>
							</view>
						</view> -->
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								死亡头数<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="addData.ljswcount" placeholder="请输入死亡头数" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								总重量<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="addData.cftogwt" placeholder="请输入总重量" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								均重<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="addData.cfavgwt" placeholder="请输入均重" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								处理方式
							</view>
							<!-- <view class="main-wrap-contetnt-item-field-value">
								<picker @change="bindPickerChange" :value="index" :range="array5" placeholder="请选择处理方式">
									<view class="picker">
										<view class="uni-input">{{array5[index]}}</view>
										<view class="dextrad-icon">
											<uni-icon type="arrowright" color="#B2B2B2" size="16" />
										</view>
									</view>
								</picker>
							</view> -->
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="addData.cfpkHandle" placeholder="请输入处理方式" />
							</view>
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
					<!-- <button type="primary" v-if="submitStatus" class="flexc add-btn">照片不合格</button>
					<button type="primary" v-if="submitStatus" class="flexc submit-btn">照片合格</button> -->
					<button type="primary" @tap="submit" class="flexc submit-btn">保存</button>
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
		
	</view>

</template>

<script>
	import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue'  //输入框
	import imageGrid from '@/components/myimage-grid/image-grid.vue'
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import ztable from '@/components/z-table/z-table'
	import common from '../../../utils/common.js';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //树形选择器
	var _self;
	
	export default {
		onLoad() {
			_self = this;
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				falg: true,
				array1: ['是', '否'],
				index: 0,
				array3: ['xxx1', 'xxx2', 'xxxx3'],
				array5: ['xxx1', 'xxx2', 'xxxx3'],
				
				date: currentDate,
				neddCheck: false,
				submitStatus: true,
				editStatus: false,
				/* 照片数据 */
				mode: {
					factModifyInfo:{
						imageList:[]//照片
					}
				},
				/* 搜索选择器数据 */
				selectType: '',   //选择的字段
				list: [],  //选择器数据
				//添加的数据
				addData: {
					ispici: '',  //是否批次
					erpaihao: '请输入耳牌号',
					picihao: '请输入批次号',
					clwz: '',  //存栏位置
					siwangyuanyin: '请输入死亡原因',
					ljswcount: '',  //死亡头数
					cftogwt: '',   //总重量
					cfavgwt: '',  //均重
					cfpkHandle: ''  //处理方式
				}
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
			imageGrid,
			strAutocomplete,
			tkiTree
		},
		methods: {
			selectOne(opt) {  //输入提示框选择
				this.title = opt
			    console.log(opt)
			},
			/* **********************************获取数据相关方法****************************************** */			
			getDeathType(e){  //获取死亡原因
				var _this = this;
				let url = '/PigDeadRecord/FilterselectDeadReson/1/10';
				let params = {
					//cfpigfarmid: 'Va4AAAAYuCC4/eJt', // 猪场id
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					deadreason: e
				};
				let headers = {};
				common.commRequest(url, params, headers, 'get',
					function(data) {
						console.log(data);
						let getData = data.data;
						let getArr = [];
						getData.forEach((item, index) => {
							let obj = {}
							obj.id = item.RN
							obj.name = item.DEADREASON
							getArr.push(obj)
						})
						_this.list = getArr
						
					}
				)
			},
			/* **********************************是否批次选择方法****************************************** */		
			checked(){
				this.falg = !this.falg
				this.addData.ispici = this.falg
				this.addData.erpaihao = ''
				this.addData.picihao = ''
				//console.log(this.falg);
			},
			/* **********************************上传图片相关方法****************************************** */			
			delImg(object){  //删除照片
				_self.mode.factModifyInfo.imageList.splice(object.index, 1); 
			},
			chooseImage: async function() {  //选择照片
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed'],
					//count: 1,
					success: (chooseImageRes) => {
						let imgArr = chooseImageRes.tempFilePaths;
						//console.log(imgArr);
						
						for (let i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
							var imageSrc = chooseImageRes.tempFilePaths[i]
							//console.log(imageSrc);
							common.yzUploadFile(imageSrc, '/newfile/newInsertfileMore', function(data){  //文件上传
								console.log(data)
								let len = _self.mode.factModifyInfo.imageList.length;
								_self.mode.factModifyInfo.imageList.splice(len-1,0, imageSrc);
							});
						}
					}
				})
			},
			/* **********************************选择器相关方法****************************************** */			
			bindPickerChange4: function(e) {  //死亡原因选择
				//console.log('picker发送选择改变，携带值为', e.target.value)
				this.index4 = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			/* **********************************获取当日时间方法****************************************** */	
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
			/* ***************************************************************************************** */			
			clickEdit() {
				this.neddCheck = true;
				this.editStatus = true;
				this.submitStatus = false;
			},
			clickCancel() {
				this.neddCheck = false;
				this.editStatus = false;
				this.submitStatus = true;
			},
			
			/* **********************************搜索选择框相关方法****************************************** */		
			//选择确定
			treeConfirm(e) {
				//console.log(e);
				if(e[0]){
					if(this.selectType == 1){  //耳牌号
						this.addData.erpaihao = e[0].name
					}else if(this.selectType == 2){  //批次号
						this.addData.picihao = e[0].name
					}else if(this.selectType == 3){
						this.addData.siwangyuanyin = e[0].name
					}
				}
			},
			selectRP(e) {  //显示耳牌号选择器
				this.list = [];
				if(e == 1){  //耳牌号选择
					this.selectType = 1
				}else if(e == 2){  //批次号选择
					this.selectType = 2
				}else if(e == 3){
					this.selectType = 3
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
					}else if(_this.selectType == 3){
						_this.getDeathType(e)  //获取死亡原因
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
							obj.id = ele.RN
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
							obj.id = ele.RN
							obj.name = ele.ERPAIHAO
							listArr.push(obj)
						})
						_this.list = listArr;
						
					}
				)
				
			},
			/* **********************************数据提交方法****************************************** */
			submit(){  //新增提交
				var _this = this;
				let url = '/PigDeadRecord/insertCtPigDeadRecords';
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

	.list-table {
		margin-top: -120px;
	}
	
	.editor-title {// 标题
		height: 90rpx;
		.img {
			line-height: 44rpx;
			image {
				width: 12rpx;
				height: 12rpx;
				vertical-align:middle;
			}
		}
		text {
			margin-left: 14rpx;
			line-height: 44rpx;
			font-size: 32rpx;
		}
	}
	
	.class-block{
		display: block;
	}
	.class-none{
		display: none;
	}
</style>
