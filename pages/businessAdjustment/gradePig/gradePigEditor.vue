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
					新核心群等级<text>*</text>
				</view>
				<view class="s-value">
					<picker @change="bindPickerChange($event,item.id)" :value="index" :range="array[0]">
						<view class="picker" style="display: flex;align-items: center;">
							<view class="uni-input" style="height: 23px;padding: 0; ">{{item.newhexin.name}}</view>
							<view class="dextrad-icon">
								<uni-icon type="arrowright" color="#333333" size="18" />
							</view>
						</view>
					</picker>
				</view>
			</view>
			
			<view class="jus-j form-list">
				<view class="field">
					原核心群等级<text>*</text>
				</view>
				<view class="s-value">
					{{ item.oldhexin.name }}
				</view>
			</view>
			
			<view class="jus-j form-list">
				<view class="field">
					原公猪猪只状态<text>*</text>
				</view>
				<view class="s-value" style="text-align: right;">
					{{ item.oldzhu.name }}
				</view>
			</view>
			
			<view class="jus-j form-list">
				<view class="field">
					调整后公猪猪只状态<text>*</text>
				</view>
				<view class="s-value" style="text-align: right;">
					<picker @change="bindPickerChange1($event,item.id)" :value="index1" :range="array1[0]">
						<view class="picker" style="display: flex;align-items: center;">
							<view class="uni-input" style="height: 23px;padding: 0; ">{{item.newzhu.name}}</view>
							<view class="dextrad-icon">
								<uni-icon type="arrowright" color="#333333" size="18" />
							</view>
						</view>
					</picker>
				</view>
			</view>
			
			<view class="jus-j form-list">
				<view class="field">
					公猪异常原因
				</view>
				<view class="s-value">
					<picker @change="bindPickerChange2($event,item.id)" :value="index2" :range="array2[0]">
						<view class="picker" style="display: flex;align-items: center;">
							<view class="uni-input" style="height: 23px;padding: 0; ">{{item.newyic.name}}</view>
							<view class="dextrad-icon">
								<uni-icon type="arrowright" color="#333333" size="18" />
							</view>
						</view>
					</picker>
				</view>
			</view>
			
			<view class="jus-j form-list">
				<view class="field">
					原异常原因
				</view>
				<view class="s-value">
					{{ item.oldyic.name }}
				</view>
			</view>
			<view class="delete-btn jus-e ali-c">
				<view class="del flexc" @click="del(item.id)">
					删除
				</view>
			</view>
		</view>
		<view v-if="falg" @click="add" class="card-form card" style="height: 90px;line-height: 90px;text-align: center;">
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
						key: 'URL',
						success: function (res) {
							let data1 = JSON.parse(res.data)
							if(data1[2]==1) _self.falg = true 
							else _self.falg = false 
							_self.tools(data1[0],data1[1])
							}
						})
					
					
					uni.getStorage({
						key: 'storage_key1',
						success: function (res) {
							let data1 = JSON.parse(res.data)
							if(data1.length==0){
								data1 = [
								{
										title1:{  // 耳牌
											name:'', // 存放名字
											id:''  // 存放ID
										},
										newhexin:{ // 新核心群等级
											name:'', // 存放名字
											id:''  // 存放ID
										},
										oldhexin:{ // 原核心群等级
											name:'', // 存放名字
											id:''  // 存放ID
										}, 
										oldzhu:{ // 原公猪猪只状态
											name:'', // 存放名字
											id:''  // 存放ID
										}, 
										newzhu:{ // 调整后公猪猪只状态
											name:'', // 存放名字
											id:''  // 存放ID
										}, 
										newyic:{ // 公猪异常原因
											name:'', // 存放名字
											id:''  // 存放ID
										}, 
										oldyic:{ // 原异常原因
											name:'', // 存放名字
											id:''  // 存放ID
										}, 
										id:+new Date
									}
								]
							}
							_self.Rtable(data1)
					    }
					})
			
		},
		data() { 
			return {
				falg:true,
				items:[
					], // 新增数组
				// count:0,
				stringList1: [['apple2','apple22'],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]], // 耳牌 
				index: 0,
				index1: 0,
				index2: 0,
				//  // 新核心群等级 
				array: [['未设置','核心群','核心群一级','核心群二级','核心群三级','扩繁群','扩繁群一级','扩繁群二级','扩繁群三级','杂繁群','杂繁群一级','杂繁群二级','杂繁群三级','商品群','商品群一级','商品群二级','商品群三级'],[0,1,101,102,103,2,201,202,203,3,301,302,303,4,401,402,403]],
				array1: [['未设置','非生产公猪','生产公猪'],[0,1,2]], // 调整后公猪猪只状态 
				array2: [['未设置','淘汰','精液少'],['C','A','B']], // 异常原因  
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
			}
		},
		methods: {
			Rtable(data){
				this.items = data 
			},  
			updata(){
				uni.setStorageSync('storage_key1', JSON.stringify(this.items)); 
				uni.navigateBack();
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
							newhexin:{ // 新核心群等级
								name:'', // 存放名字
								id:''  // 存放ID
							},
							oldhexin:{ // 原核心群等级
								name:'', // 存放名字
								id:''  // 存放ID
							}, 
							oldzhu:{ // 原公猪猪只状态
								name:'', // 存放名字
								id:''  // 存放ID
							}, 
							newzhu:{ // 调整后公猪猪只状态
								name:'', // 存放名字
								id:''  // 存放ID
							}, 
							newyic:{ // 公猪异常原因
								name:'', // 存放名字
								id:''  // 存放ID
							}, 
							oldyic:{ // 原异常原因
								name:'', // 存放名字
								id:''  // 存放ID
							}, 
							id:+new Date  
						})
			},
			tools(dsid,tzlx){
				var _this = this;
				let [headers,params,url] = [{},{dongsheid:dsid}];
				if(tzlx==0) url = "/CtPigCoreGroupTypeAdjustBill/selectHexinqunAdjustFilter/1/100" // 核心群调整耳牌
				else url = "/CtPigCoreGroupTypeAdjustBill/selectScMalePigAdjustFilter/1/100" // 生产公猪调整耳牌  
				
				// 耳牌号
				let picker2 = [[],[],[],[],[],[],[],[]]
					common.commRequest(url, params,headers,'get',
						function(data) {
							console.log(data)
							let getData = data.data.list;
								for (let i = 0; i < getData.length; i++) {
									picker2[0].push(getData[i].erpaihao?getData[i].erpaihao:'-') // 耳牌
									picker2[1].push(getData[i].cfearnoid?getData[i].erpaihao:'-') // 耳牌id
									picker2[2].push(getData[i].cfoldgrouptypetxt?getData[i].cfoldgrouptypetxt:'-') // 原核心群等级
									picker2[3].push(getData[i].cfoldgrouptype?getData[i].cfoldgrouptype:'-') // 原核心群等级id
									picker2[4].push(getData[i].pigstate?getData[i].pigstate:'-') // 原公猪猪只状态
									picker2[5].push(getData[i].pigstateid?getData[i].pigstateid:'-') // 原公猪猪只状态id
									picker2[6].push(getData[i].cfoldunmaleresulttxt?getData[i].cfoldunmaleresulttxt:'-') // 原异常原因
									picker2[7].push(getData[i].cfoldunmaleresult?getData[i].cfoldunmaleresult:'-') // 原异常原因id
								}
								_this.stringList1 = picker2
								// console.log(_this.stringList1)
					})
			
			},
			selectOne1(opt,eq) {  //输入提示框选择
			
			let id = this.items.findIndex(item=>{ // 索引 
				return item .id == eq
			})
			console.log(this.stringList1)
			console.log(this.stringList1[0].indexOf(opt))
			console.log(opt)
			console.log(id)
			this.items[id].title1.name = opt // 耳牌
			this.items[id].title1.id = this.stringList1[1][this.stringList1[0].indexOf(opt)]  // 耳牌id
			
			this.items[id].oldhexin.name =this.stringList1[2][this.stringList1[0].indexOf(opt)]  // 原核心群等级
			this.items[id].oldhexin.id =this.stringList1[3][this.stringList1[0].indexOf(opt)]   // 原核心群等级id
			
			this.items[id].oldzhu.name =this.stringList1[4][this.stringList1[0].indexOf(opt)]  // 原公猪猪只状态
			this.items[id].oldzhu.id =this.stringList1[5][this.stringList1[0].indexOf(opt)]   // 原公猪猪只状态id
			
			this.items[id].oldyic.name =this.stringList1[6][this.stringList1[0].indexOf(opt)]  // 原异常原因
			this.items[id].oldyic.id =this.stringList1[7][this.stringList1[0].indexOf(opt)]   // 原异常原因id
			
			// console.log(this.items)
			},
			bindPickerChange: function(e,eq) { // 新核心群等级
				// console.log('picker发送选择改变，携带值为', e.target.value)
				
				this.index = e.target.value

				let id = this.items.findIndex(item=>{ // 索引 
					return item .id == eq
				})
				this.items[id].newhexin.name = this.array[0][this.index]
				this.items[id].newhexin.id = this.array[1][this.index]
				
				// console.log(this.items[id].ttyy)
				
			},
			bindPickerChange1: function(e,eq) { // 调整后公猪猪只状态
				this.index1 = e.target.value
				
				let id = this.items.findIndex(item=>{ // 索引 
					return item .id == eq
				})
				this.items[id].newzhu.name = this.array1[0][this.index1]
				this.items[id].newzhu.id = this.array1[1][this.index1]
			},
			bindPickerChange2: function(e,eq) { // 异常原因
				this.index2 = e.target.value
				
				let id = this.items.findIndex(item=>{ // 索引 
					return item .id == eq
				})
				this.items[id].newyic.name = this.array2[0][this.index2]
				this.items[id].newyic.id = this.array2[1][this.index2]
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
