<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					生产猪转群录入
				</view>
				
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						<!-- 与配公猪 -->
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								母猪耳牌<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value" @tap="selectRP(1)">
								<!-- <input type="text" value="" placeholder="请输入公猪耳牌号" /> -->
								<text>{{serarchForm.erpaihao || '请输入'}}</text>
								<uni-icon type="arrowright" color="#B2B2B2" size="16" />
							</view>
						</view>

					</view>
				</view>

			</view>
		</view>
		<view class="editor-title jus-j form-seat" style="margin-bottom: 16px;">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>生产猪转群明细</text>
			</view>
		</view>
		<view class="main">
			<view class="main-wrap" style="padding-top: 0;">
				<view class="main-wrap-contetnt">
					<view class="main-wrap-contetnt-item">
						
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								存栏位置
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="serarchForm.cunlanweizhi" placeholder="请输入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								配种批次
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="serarchForm.peizhongpici" placeholder="请输入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								状态
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="serarchForm.zhuzhizhuangtai" placeholder="请输入" />
							</view>
						</view>
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view class="main-wrap-contetnt-item-field-name">
								间隔天数
							</view>
							<view class="main-wrap-contetnt-item-field-value">
								<input type="text" value="" v-model="serarchForm.jiangetianshu" placeholder="请输入" />
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="submits jus-b" style="margin-top: 0;">
			<button type="primary" class="flexc submit-btn" @click="search" >查询</button>
		</view>
		
		<view class="editor-title jus-j form-seat" style="margin-bottom: 16px;margin-top: 0;">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>转群明细</text>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list list-table">
			<view class="data__wrapper">
				<ztable :tableData="tableData" stickSide stickSide1 tableHeight="500" @onSelect="checkbox" :columns="columns" showSelect="true" :neddCheck="true" emptyText="-" :showBottomSum="false"></ztable>
			</view>
		</view>
		<view class="submits jus-b">
			<button type="primary" class="flexc submit-btn" @tap="submit">确定</button>
			
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
	import ztable from '@/components/z-table-1/z-table'
	import common from '../../../utils/common.js';
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //搜索选择器
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				//array: ['请选择配种时段', '美国', '巴西', '日本'],
				//array1: ['张三', '美国', '巴西', '日本'],
				index: 1,
				date: currentDate,
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
				
				list: [],  //搜索选择器数据
				selectType: '',   //选择的字段
				//添加的数据
				serarchForm: {
					erpaihao: '',   //耳牌号
					cunlanweizhi: '',  //存栏位置
					peizhongpicihao: '',  //配种批次
					zhuzhizhuangtai: '',  //猪只状态
					jiangetianshu: '',  //间隔天数
				},
				//表格勾选数据
				checkData: [],
				tableData: [],
				columns: [
					{
						title: "序号",
						key: "index",
						width: 150,
					}, {
						title: "耳牌",
						key: "erpaihao",
						width: 150,
					}, {
						title: "状态",
						key: "zhuzhizhuangtai",
						width: 200,
					}, {
						title: "天数",
						key: "jiangetianshu",
						width: 150,
					}, {
						title: "配种批次",
						key: "peizhongpicihao",
						width: 200,
					}, {
						title: "存栏位置",
						key: "cunlanweizhi",
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
			tkiTree,
			uniIcon
		},
		methods: {
			/* *******************************搜索选择器转出批次相关方法************************************* */
			//选择确定
			treeConfirm(e) {
				//console.log(e);
				if(e[0]){
					if(this.selectType == 1){  //耳牌号
						this.serarchForm.erpaihao = e[0].name
					}
				}
			},
			//显示搜索选择器
			selectRP(e) {
				this.list = []
				if(e == 1){  //耳牌号
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
						_this.getEPH(e)  //耳牌号
					}
				}, 500)
			},
			//获取耳牌号
			getEPH(e){
				var _this = this;
				let url = '/PigAdjustableOrder/selectErpaiFilter/1/50';
				//console.log(e);
				let params = {
					//cffieldid: 'Va4AAAAYuCKdu1vk',    // 分场
					erpaihao: e
				};
				let headers = {};
				
				common.commRequest(url, params, headers, 'get',
					function(data) {
						console.log(data);
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
			
			/* ****************************************************************** */
			bindPickerChange: function(e) {
				//console.log('picker发送选择改变，携带值为', e.target.value)
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
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			/* ************************搜索*************************** */
			search(){
				this.getList(1, 50, false)
			},
			/* ************************表格方法*************************** */
			//获取表格勾选数据
			checkbox(e){
				const _this = this
				console.log(e);
				
				let tabledata = _this.tableData
				let selecrArr = []
				for(let i=0; i<e.length; i++){
					let obj = {}
					let num = e[i] + 1
					//console.log(num)
					//console.log(tabledata)
					for(let j=0; j<tabledata.length; j++){
						if(num == tabledata[j].index){
							obj.index = tabledata[j].index 
							obj.erpaihao = tabledata[j].erpaihao   
							obj.peizhongpicihao = tabledata[j].peizhongpicihao
							obj.zhuzhizhuangtai = tabledata[j].zhuzhizhuangtai
							obj.jiangetianshu = tabledata[j].jiangetianshu
							obj.cunlanweizhi = tabledata[j].cunlanweizhi
							selecrArr.push(obj)
						}
					}
				}
				console.log(selecrArr)
				_this.checkData = selecrArr
				
				
				
			},
			//获取表数据
			getList(pageNum, pageSize, isLoad){
				var _this = this;
				let params = this.serarchForm;
				let headers = {};
				
				uni.showLoading({
					title: '加载中'
				});
				//console.log(params)
				common.commRequest(`/PigAdjustableOrder/selectMorePig/${pageNum}/${pageSize}`, params, headers, 'post',
					function(data) {
						let getData = data.data.list;
						getData.forEach((obj, index) => {
							obj['index'] = _this.index;
							_this.index ++;
							obj.erpaihao = obj.erpaihao ? obj.erpaihao : '-';
							obj.peizhongpicihao = obj.peizhongpicihao ? obj.peizhongpicihao : '-';
							obj.zhuzhizhuangtai = obj.zhuzhizhuangtai ? obj.zhuzhizhuangtai : '-';
							obj.jiangetianshu = obj.jiangetianshu ? obj.jiangetianshu : '-';
							obj.cunlanweizhi = obj.cunlanweizhi ? obj.cunlanweizhi : '-';
						})
						
						if(isLoad) {
							let oldData = _this.tableData;
							let loadData = [...oldData, ...getData];
							_this.tableData = loadData;
						}else {
							_this.tableData = getData;
						}
						//console.log(JSON.stringify(getData));
						uni.hideLoading();
				})
			},
			submit(){
				//储存勾选数据
				console.log(this.checkData)
				uni.setStorage({
					key: 'checkData',
					data: this.checkData
				});
				uni.navigateTo({
					url: `/pages/dataCollection/pigProduction/productionNew`,
				});
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

	.search-item {
		width: 100%;

		.othermain {
			width: 90%;
			float: left;
			.main-wrap {
				margin-top: -160rpx;
				margin-right: 40rpx;
				.field-nobottom {
					margin-top: -40rpx;
					.main-wrap-contetnt-item-field-value {
						.text {
							margin-right: 20rpx;
							width: 150rpx;
						}
					}
				}
			}
		}

		.search-icon {
			width: 8%;
			float: left;
			.main-wrap {
				margin-left: -60rpx;
				margin-top: -160rpx;
				.field-nobottom {
					margin-left: -20rpx;
					margin-top: -40rpx;
				}
			}
			image {
				width: 18px;
				height: 18px;
				z-index: 99999;
			
			}
		}
	}


	.list-table {
		margin-top: -140px;
	}
</style>
