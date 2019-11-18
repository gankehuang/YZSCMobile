<template>
	<view class="semen-editor">
		
		
		<view class="card-form card" v-for="(item,eq) in items" :key='eq'>
			<view class="jus-j form-list" >
				<view class="field color"> 
					分录{{eq | add1}}
				</view>
			</view>
			<view class="jus-j form-list" >
				<view class="field">
					耳牌号<text>*</text> 
				</view>
				<view class="s-value" style="text-align: right;"> 
					<!-- <input type="text"  placeholder="填入耳牌号 " v-model="item.erpai"/> -->
					<str-autocomplete :stringList="stringList1[0]" :importvalue="item.title1.name" @select="selectOne1($event,item.id)" backgroundColor='#fff' highlightColor="#FF0000" v-model="item.title1.name"></str-autocomplete>
				</view>
			</view>
			
			<view class="jus-j form-list">
				<view class="field">
					淘汰原因<text>*</text>
				</view>
				<view class="s-value">
					<picker @change="bindPickerChange($event,item.id)" :value="index" :range="array[0]">
						<view class="picker" style="display: flex;align-items: center;">
							<view class="uni-input" style="height: 23px;padding: 0; ">{{item.ttyy.name}}</view>
							<view class="dextrad-icon">
								<uni-icon type="arrowright" color="#333333" size="18" />
							</view>
						</view>
					</picker>
				</view>
			</view>
			
			<view class="jus-j form-list">
				<view class="field">
					重量<text>*</text>
				</view>
				<view class="s-value" style="text-align: right;">
					<input type="text" v-model="item.kg" />
				</view>
			</view>
			
			<view class="jus-j form-list">
				<view class="field">
					标内准淘汰
				</view>
				<view class="s-value">
					{{ item.isbz|isbzFilter }}
				</view>
			</view>
			<view class="delete-btn jus-e ali-c">
				<view class="del flexc" @click="del(item.id)">
					删除
				</view>
			</view>
		</view>
		<view @click="add" class="card-form card" style="height: 90px;line-height: 90px;text-align: center;">
			<text style="color: #B2B2B2;">新增</text>
		</view>
		<view class="confirm-btn">
			<button type="primary" @click="updata">保存</button>
		</view>
	</view>
</template>

<script>
	import strAutocomplete from '@/components/str-autocomplete/str-autocomplete.vue'  //输入框
	import common from '../../../utils/common.js';
	//引入图标
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		onLoad: function(options) {
			var _self = this;
			
			uni.getStorage({
				key: 'hid',
				success: function (res) {
					let data = res.data
					if(data) _self.count = data
					else _self.count = 0 
					
					uni.getStorage({
						key: 'storage_key',
						success: function (res) {
							let data1 = JSON.parse(res.data)
							console.log(data1,1111111111111)
							if(data1.length==0){
								data1 = [
								{
										title1:{  // 耳牌
											name:'', // 存放名字
											id:''  // 存放ID
										},
										ttyy:{ // 淘汰原因
											name:'', // 存放名字
											id:''  // 存放ID
										},
										pzpc:{ // 配种批次
											name:'', // 存放名字
											id:''  // 存放ID
										}, 
										pch:{ // 批次号
											name:'', // 存放名字
											id:''  // 存放ID
										}, 
										zzlx:{ // 猪只类型
											name:'', // 存放名字
											id:''  // 存放ID
										}, 
										zzzt:{ // 猪只状态
											name:'', // 存放名字
											id:''  // 存放ID
										}, 
										tc:'', // 胎次 
										isbz:'', // 标准内淘汰
										kg:'', // 公斤
										id:_self.count
									}
								]
							}
							_self.Rtable(data1)
					    }
					})
			    }
			})
			this.tools()
			
		},
		data() { 
			return {
				items:[], // 新增数组
				count:1,
				stringList1: [['apple2','apple22'],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]], // 耳牌 
				index: 0,
				array: [['B超', 'A超'],['b','a'],['1','0']], // 淘汰原因 
			}
				
		},
		components: {
			uniIcon,
			strAutocomplete
		},
		filters:{
			add1(data){
				let date = data + 1
				return date
			},
			isbzFilter(data){
				if(data==='0'){
					return '被动'
				}else if(data==='1'){
					return '主动'
				}else{
					return ''
				}
			}
		},
		methods: {
			Rtable(data){
				this.items = data 
			},  
			updata(){
				uni.setStorageSync('storage_key', JSON.stringify(this.items)); 
				uni.navigateBack();
				// uni.navigateTo({
				// 	url: `/pages/dataCollection/eliminate/eliminateNew?table=${JSON.stringify(this.items)}`,
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
			},
			del(eq){
				let id = this.items.findIndex(item=>{
					return item .id == eq
				})
				this.items.splice(id,1)
			},
			add(){
				this.items.push({
						title1:{  // 耳牌
							name:'', // 存放名字
							id:''  // 存放ID
						},
						ttyy:{ // 淘汰原因
							name:'', // 存放名字
							id:''  // 存放ID
						},
						pzpc:{ // 配种批次
							name:'', // 存放名字
							id:''  // 存放ID
						}, 
						pch:{ // 批次号
							name:'', // 存放名字
							id:''  // 存放ID
						}, 
						zzlx:{ // 猪只类型
							name:'', // 存放名字
							id:''  // 存放ID
						}, 
						zzzt:{ // 猪只状态
							name:'', // 存放名字
							id:''  // 存放ID
						}, 
						tc:'', // 胎次 
						isbz:'', // 标准内淘汰
						kg:'', // 公斤
						id:++this.count
					})
			},
			tools(){
				var _this = this;
				let headers = {};
				// 耳牌号
				let picker2 = [[],[],[],[],[],[],[],[],[],[],[]]
					common.commRequest(`/PigWeedApply/selectErpaiFilter/1/100`, {cfpigfarmid: 'Va4AAAAYuCC4/eJt'}, headers,'get',
						function(data) {
							// console.log(data)
							let getData = data.data;
								for (let i = 0; i < getData.length; i++) {
									picker2[0].push(getData[i].ERPAIHAO) // 耳牌
									picker2[1].push(getData[i].PIGID) // 耳牌id
									picker2[2].push(getData[i].HOUBEIPICIHAO) // 配种批次
									picker2[3].push(getData[i].HOUBEIPICIID) // 配种批次id
									picker2[4].push(getData[i].PICIHAO) // 批次号
									picker2[5].push(getData[i].PICIID) // 批次号id
									picker2[6].push(getData[i].ZHUZHILEIXING) // 猪只类型
									picker2[7].push(getData[i].ZHUZHILEIXINGID) // 猪只类型id
									picker2[8].push(getData[i].ZHUZHIZHUANGTAI) // 猪只状态
									picker2[9].push(getData[i].ZHUZHIZHUANGTAIID) // 猪只状态id
									picker2[10].push(getData[i].TAICI) // tc
								}
								_this.stringList1 = picker2
								// console.log(_this.stringList1)
					})
					
				// 淘汰原因 
				let picker1 = [[],[],[]]
					common.commRequest(`/PigWeedApply/selectWeedReason/1/100`, {}, headers,'get',
						function(data) {
							console.log(data)
							let getData = data.data;
								for (let i = 0; i < getData.length; i++) {
									picker1[0].push(getData[i].WEEDREASON) // 淘汰原因
									picker1[1].push(getData[i].WEEDREASONID) // 淘汰原因id
									picker1[2].push(getData[i].IFZHUDONGTAOTRAIID) // 标准内淘汰id
								}
								_this.array = picker1
					})
			
			},
			selectOne1(opt,eq) {  //输入提示框选择
			
			let id = this.items.findIndex(item=>{ // 索引 
				return item .id == eq
			})
			this.items[id].title1.name = opt // 耳牌
			this.items[id].title1.id = this.stringList1[1][this.stringList1[0].indexOf(opt)]  // 耳牌id
			
			this.items[id].pzpc.name =this.stringList1[2][this.stringList1[0].indexOf(opt)]  // 配种批次
			this.items[id].pzpc.id =this.stringList1[3][this.stringList1[0].indexOf(opt)]   // 配种批次id
			
			this.items[id].pch.name =this.stringList1[4][this.stringList1[0].indexOf(opt)]  // 批次号
			this.items[id].pch.id =this.stringList1[5][this.stringList1[0].indexOf(opt)]   // 批次号id
			
			this.items[id].zzlx.name =this.stringList1[6][this.stringList1[0].indexOf(opt)]  // 猪只类型
			this.items[id].zzlx.id =this.stringList1[7][this.stringList1[0].indexOf(opt)]   // 猪只类型id
			
			this.items[id].zzzt.name =this.stringList1[8][this.stringList1[0].indexOf(opt)]  // 猪只状态
			this.items[id].zzzt.id =this.stringList1[9][this.stringList1[0].indexOf(opt)]   // 猪只状态id
			
			this.items[id].tc =this.stringList1[10][this.stringList1[0].indexOf(opt)]   // 胎次 
			
			// console.log(this.items)
			},
			bindPickerChange: function(e,eq) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				
				this.index = e.target.value

				let id = this.items.findIndex(item=>{ // 索引 
					return item .id == eq
				})
				this.items[id].ttyy.name = this.array[0][this.index]
				this.items[id].ttyy.id = this.array[1][this.index]
				this.items[id].isbz = this.array[2][this.index]
				
				// console.log(this.items[id].ttyy)
				
			},
		}
	}
</script>

<style lang="scss">
	.semen-editor {
		background-color: #F5F5F5;
		padding: 0 30upx;
		.editor-title {
			height: 80upx;
			.img {
				line-height: 80upx;
				image {
					width: 12upx;
					height: 12upx;
					vertical-align:middle;
				}
			}
			text {
				margin-left: 14upx;
				line-height: 80upx;
				font-size: 32upx;
			}
			.confirm-btn {
				width: 140upx;
				height: 54upx;
				button {
					width: 140upx;
					height: 54upx;
					font-size: 24upx;
					padding: 0;
					background-color: #4684EA;
				}
			}
			&.form-seat {
				height: 120upx;
			}
		}
		.card-form {
			margin: 26upx 0;
			.form-list {
				height: 96upx;
				border-bottom: 1upx solid #EBEEF2;
				font-size: 28upx;
				.field {
					text {
						color: #FF6354;
						margin-left: 10upx;
					}
				}
				.color{
					color: #4785F3;
				}
				.s-value {
					color: #B2B2B2;
					vertical-align:middle;
					&.d-num {
						text-align: right;
					}
					input {
						font-size: 28upx;
					}
				}
				
			}
			.delete-btn {
				height: 140upx;
				.del {
					width: 180upx;
					height: 64upx;
					border: 1upx solid #CACFD9;
					font-size: 28upx;
					border-radius: 64upx;
				}
			}
		}
		.confirm-btn {
			width: 520upx;
			margin: 60upx auto;
		}
	}
	
</style>
