<template>

	<view class="content">
		<view class="header">
			<uni-nav-bar id="nav_bar" left-icon="arrowleft" left-text="返回" :right-text="righttext" @click-right="showCity" 
			 @click-left="back" title="养殖生产管理系统" color="#ffffff" font-size="16px" :fixed="true" :statusBar="true" :border="false" backgroundColor="#5089F9">

			</uni-nav-bar>
		</view>
		
		<!-- 上拉刷新组件 -->
		<mescroll-uni top="116" @down="downCallback" :up="upOption" class="message">	
			<!-- 首页详情 -->
			<view class="indicators-warning indicators-warnin-top">
				
				<view class="indicators-warning-content">
					<view class="box" @tap.stop="toMessage">
						<view class="warning-title">蓝色预警</view>
						<view class="warning blue">{{blueWarning}}</view>
					</view>
					<view class="box" @tap.stop="toMessage">
						<view class="warning-title">黄色预警</view>
						<view class="warning yellow">{{yellowWarning}}</view>
					</view>
					<view class="box" style="border: none;" @tap.stop="toMessage">
						<view class="warning-title">红色预警</view>
						<view class="warning red">{{redWarning}}</view>
					</view>
				</view>
			</view>
			
			<view class="indicators-warning" style="padding: 0 40rpx 0 40rpx;">
				<view class="title">
					<image src="../../static/tip.png" style="width: 25rpx; height: 25rpx; margin-top: 10rpx;" ></image>
					<view style="margin-left: 10rpx;" @tap.stop="production" >
						生产提醒
					</view>
				</view>
				<view class="indicators-warning-content tip" style="padding-top: 0px;">
					<view class="tip-item" v-for="(item, index) in tipArray" :key="index" @tap.stop="productionItem">
						<view class=""><image src="../../static/tipItem.png" style="width: 67rpx; height: 66rpx;"/></view>
						<view style="margin-top: 10rpx; margin-left: 10rpx; color: #4D4D4D; text-align: left; width: 80%;">{{item.title}}</view>
						<view style="margin-top: 10rpx; color: #DFE2E6;"><uni-icon type="arrowright" color="#B2B2B2" size="16"  /></view>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
			
			<view class="indicators-warning" style="padding: 20rpx 40rpx 0 40rpx;">
				<view class="title">
					<image src="../../static/rw.png" style="width: 25rpx; height: 25rpx; margin-top: 10rpx;" ></image>
					<view style="margin-left: 10rpx;">我的任务</view>
				</view>
				<view class="indicators-warning-content" style="padding-top: 0; padding-left: 20rpx;">
					<view class="box_1" style="border: none;" @tap.stop="myTask()">
						<view class="warning task blue">{{todo}}</view>
						<view class="warning-title" style="color: #4380FF;">我的待办</view>
					</view>
					<view class="box_1" style="border: none;" @tap.stop="myTask()">
						<view class="warning task green">{{initiate}}</view>
						<view class="warning-title" style="color: #70D56D;">我发起的</view>
					</view>
					<view class="box_1" style="border: none;" @tap.stop="myTask()">
						<view class="warning task orgin">{{read}}</view>
						<view class="warning-title" style="color: #FF9A00;">我的待阅</view>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
			
			<view class="class-item">
				<view class="class-name">
					<image src="../../static/cy.png" style="width: 25rpx; height: 25rpx; margin-top: 10rpx;" ></image>
					<view style="margin-left: 10rpx;">我的常用</view>
				</view>
				<view class="g-container">
					<view class="g-box" @tap.stop="jumpTask" :data-key="newsitem.title" :data-jumpurl="newsitem.jumpurl" v-for="(newsitem,index2) in myUsualUses" :key="newsitem.id">
						<view class="g-box-content" style="position: relative;">
							<image :src="newsitem.url" class="g-image" />
							<image @click.stop="sub(index2)" v-show="falg" src="/static/sub.png"  style="height: 30rpx;width: 30rpx; position: absolute;top: 8rpx;right: 8rpx;" />
							<view class="g-title">{{newsitem.title}}</view>
						</view>
					</view>
					<view class="g-box" @tap.stop="changeMode" data-key="管理" v-if="!manageMode">
						<view class="g-box-content" style="background-color: #fff;">
						<image src="/static/slices/Rectangle@2x(40).png" class="g-image" />
						<view class="g-title">管理</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
			
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
			
		</mescroll-uni>	
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import cityData from '@/common/zb.data.js';         //数据
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniLoadMore from '@/components/uni-load-more.vue';       //加载更多
	import uniBadge from "@/components/uni-badge/uni-badge.vue";
	
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";  //引入上啦下拉刷新组件
	export default {
		components: {
			uniNavBar,
			uniIcon,
			mpvuePicker,
			uniLoadMore,
			uniTag,
			uniBadge,
			
			MescrollUni  //上拉，下拉刷新组件
		},
		data() {
			return {
				show: false,
				type: '',
				scrollComponents: '#tab-bar', // tab 容器 计算距离顶部距离使用
				scrollViewomponents: '#list', // 内容 容器 计算距离顶部距离使用
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerText: '请选择',
				pickerValueDefault: [0],
				pickerValueArray: [],
				righttext: '正邦集团',
				scrollTop: 0, // scroll-view组件 距离顶部距离，点击tab时间置顶使用
				showComponent: false, // 是否显示
				showtag:false, //是否显示标签
				
				manageMode: false,  //管理状态
				falg:false,
				
				navHeigh: 10, //标题栏高度
				top: 0, // 顶部监听事件使用
				scrollInto: "",
				isClickChange: false,
				NewsGoUrl: '', // 列表点击链接
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				blueWarning: "05",     //预警数目
				yellowWarning: "25",
				redWarning: "25",
				
				todo: 10,   //我的任务
				initiate: 7,
				read: 9,
				
				tipArray: [
					{title: '有6头生产公猪采精间隔天数超过7天'},
					{title: '有36头母猪采未发情超过240天'},
					{title: '有6头生产公猪采精间隔天数超过7天'}
				],
				myUsualUses: [{ // 常用列表名 
						title: "精液检测",
						url: "/static/slices/Rectangle@2x(8).png",
						jumpurl: '/pages/dataCollection/semenTest/semenNew'
					},
					{
						title: "配种批次",
						url: "/static/slices/Rectangle@2x(24).png",
						jumpurl: '/pages/matingBatch/matingInfo'
					},
					{
						title: "死亡记录",
						url: "/static/slices/Rectangle@2x(33).png"
					},
					{
						title: "低值申请",
						url: "/static/slices/Rectangle@2x(28).png"
					},
					{
						title: "淘汰申请",
						url: "/static/slices/Rectangle@2x(34).png"
					},
					{
						title: "药品领用申请",
						url: "/static/slices/Rectangle@2x(18).png"
					},
					{
						title: "药品领用申请",
						url: "/static/slices/Rectangle Copy 13@2x.png"
					},
				],
			
				loading:'',
				text:'全部',
				isShowNoMore:false,
				upOption:{
					textNoMore:'我是有底线的 >_<' ,
					 use: false
				},
			};
		},
		onReady() {
			let _this = this;
			let view = uni.createSelectorQuery().select("#nav_bar");
			view.boundingClientRect(data => {
				_this.navHeigh = data.top + data.height;
				//console.log("data: " + JSON.stringify(data));
			}).exec();
		},
		//下拉刷新 
		onPullDownRefresh() {
			console.log('下拉刷新');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			// 下拉回调
			downCallback(mescroll){
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				// mescroll.resetUpScroll()
				setTimeout(()=>{
					// 隐藏下拉加载状态
					mescroll.endErr()
				},1000)
			},

			toMessage() {  //预警跳转
				uni.navigateTo({
					url: "/pages/message/message"
				});
			},
			production() {  //生产提醒跳转
				uni.navigateTo({
					url: "/pages/message/message"
				});
			},
			productionItem() {  //生产提醒条目
				uni.navigateTo({
					url: "/pages/archives/boarInfo/boarInfo"
				});
			},
			myTask() {  //我的任务跳转
				uni.navigateTo({
					url: "/pages/message/message"
				});
			},
			isSee(item, index) {
				let _this = this;
				if (index == 0) {
					return true;
				}

				if (_this.dataList[index - 1].createDate == item.createDate) {
					return false;
				} else {
					return true;
				}
			},
			changeMode() {
				this.falg = !this.falg;
			},
			jumpTask(e) {  //点击我的常用选项
				if(this.falg) return  
				let key = e.currentTarget.dataset.key;
				let jumpurl = e.currentTarget.dataset.jumpurl;
				if (jumpurl) {
					uni.navigateTo({
						url: jumpurl + '?searchKey=' + key
					})
				} else {
					uni.showToast({
						title: "功能开发中！",
						icon: 'none'
					});
				}
			},
			
			
			tap(o) {
				let _this = this;
				if (_this.goUrl != '') {
					uni.navigateTo({
						url: "/pages/boarInfo/boarInfo"
					});
				}
			},
			
			// tabbar 点击事件
			async tapTab(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				if(index===3){
					//指示预警才显示标签
					this.showtag = true;
				}else{
					this.showtag = false;
				}
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].value;

				uni.showLoading({
					title: '加载中'
				});
				let datas = await this.getDataList(e); //异步请求数据
				this.scrollTop = 0;
			},
			/* 左上角选择器 */
			showCity() {
				this.pickerValueArray = cityData;
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.pickerText = e.label;
				this.righttext = e.label;
			},
			getDataList(e) {
				let _this = this;
				return new Promise((res, rej) => {
					// 请求数据逻辑
					setTimeout(function() {
						_this.scrollTop = _this.top;
						uni.hideLoading();
						res(e);
					}, 600);
				});
			},
			sub(index){  //删除我的常用
				this.myUsualUses.splice(index,1)
			},
		}
	}
</script>

<style lang="scss">
	
	$text—gray: #ABABAB;
	$pageBg:#EFF6F9;
	$headBg:#5089F9;
	$margin_content:20rpx;

	@keyframes myfirst {
		from {
			top: -100upx;
		}

		to {
			top: 0;
		}
	}

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: $pageBg
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.content {
		width: 100%;
		height: 100%;
		text-align: center;
		background: $pageBg;
	}

	.header {
		background: $headBg;
		white-space: nowrap;

		.nav__warp {
			box-sizing: border-box;
			overflow-x: scroll;
			display: flex;
			color: #B6BCC9;
		}

		.uni-navbar__header-btns:last-child {
			width: auto;
			padding-right: 40rpx;
		}

		.uni-navbar__header-container-inner {
			font-size: 16px;
			text-align: center;
			padding-left: 100rpx
		}

		.nav__list {
			flex: 1;
			padding: 10upx 0;
			box-sizing: border-box;
			letter-spacing: 5upx;
			text-indent: 1upx;
			width: 25%;
			display: inline-block;

			.nav__item {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				font-size: 14px;
				margin: 0 30rpx;
				width: fit-content;
				white-space: nowrap;

				&.active {
					.nav__item__text {
						color: white;
					}

					.nav__item__line {
						height: 4rpx;
						background-color: white;
						border-radius: 4rpx;
						transition: all .6s;
						width: 140rpx;
					}
				}

				.nav__item__text {
					margin: 30rpx 0 20rpx 0;
					transition: all .1s;
					color: #C0DAEE;
				}
			}

		}
	}

	.topnav {
		position: fixed;
		animation: myfirst 0.2s;
		top: 0;
		background: $headBg;
		z-index: 1;
	}
	.icon {
		width: 24rpx;
		height: 24rpx;
	}

	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: $margin_content;
		padding-left: 10rpx;
		padding-right: 10rpx;
		white-space: nowrap;
		border-top-left-radius: 10rpx 10rpx;
		border-top-right-radius: 10rpx 10rpx;
		border-bottom-left-radius: 10rpx 10rpx;
		border-bottom-right-radius: 10rpx 10rpx;
		line-height: 1rem;
		height: fit-content;
		background: #e7e7e7;

		&:hover {
			width: 100%;
		}
	}

	.title{
		display: flex;
		justify-content: flex-start;
	}
	
	.indicators-warning{
		background-color: #fff;
		padding: 10rpx;
		padding-bottom: 25rpx;
	}
	.indicators-warnin-top{
		background:linear-gradient(180deg,rgba(80,137,249,1) 0%,rgba(64,123,236,1) 30%,rgba(255,255,255,1) 80%,rgba(255,255,255,1) 100%);  //rgba(58,117,231,0)
	}
	
	.indicators-warning-content{
		display: flex;
		margin-top: 10rpx;
		padding: 50rpx 20rpx 10rpx 20rpx;
		.box{
			flex: 1;
			background-color: #fff;
			box-shadow: 0 1px 6px #ccc;
			border-radius: 30rpx;
			align-items: center;
			justify-content: center;
			margin: 10rpx;
			padding: 10px;
			.warning{
				width: 150rpx;
				height: 150rpx;
				line-height: 150rpx;
				margin: auto;
				border-radius: 200rpx;
				font-weight: 600;
				font-size: 55rpx;
			}
			.blue{ border: 5px solid #E86542; }
			.yellow{ border: 5px solid #FFD154; }
			.red{ border: 5px solid #4875E1; }
			.warning-title{
				margin-bottom: 10rpx;
			}
			
			.task{
				border: 1px solid lightgray;
				width: 150rpx;
				height: 150rpx;
				line-height: 150rpx;
				font-size: 55rpx;
			}
			.red{ color: red; }
			.green{ color: green; }
		}
		.box_1{
			flex: 1;
			background-color: #fff;
			border-radius: 30rpx;
			align-items: center;
			justify-content: center;
			margin: 10rpx;
			padding: 10px;
			.warning{
				width: 100rpx;
				height: 100rpx;
				line-height: 100rpx;
				margin: auto;
				border-radius: 200rpx;
				font-weight: 600;
				font-size: 35rpx;
			}
			.blue{ border: 5px solid #4380FF; color: #4380FF; }
			.green{ border: 5px solid #70D56D; color: #70D56D; }
			.orgin{ border: 5px solid #FF9A00; color: #FF9A00; }
			.warning-title{
				margin-bottom: 10rpx;
			}
			
			.task{
				width: 100rpx;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 55rpx;
			}
			.red{ color: red; }
			.green{ color: green; }
		}
	}
	.tip{
		display: flex;
		flex-direction: column;
		.tip-item{
			display: flex;
			justify-content: space-between;
			text-align: left;
			
		}
	}
	
	
	.class-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 0rpx;
	}
	
	.class-name {
		display: flex;
		justify-content: flex-start;
		padding: 20rpx 0 0 20rpx;
		
	}
	
	.g-container {
		/* padding-top: 20upx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.g-box {
	
		width: 25%;
		text-align: center;
	}
	
	.g-box-content {
		margin: 10rpx;
		// background: #F5F5F5;
	}
	
	.g-image {
		width: 100upx;
		height: 100upx;
		margin-top: 10rpx;
	}
	
	.g-title {
		color: #4D4D4D;
		font-size:25rpx;
	}
	
	.swiper-item {
	
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	
	
	.message {
		height: 100%;
		.message_text {
			display: flex;
			margin: 20upx 20upx 0;
			padding: 24upx 20upx 24upx 0;
			background-color: #fff;
			.img {
				width: 140upx;
				height: 140upx;
				margin: 0 20upx;
			}
			.text_right {
				font-size: 28upx;
				width: 78%;
				.shop_name {
					
					.payment {
						float: right;
						font-size: 24upx;
						color: #E51C23;
					}
					.iconyoujiantou {
						color: #4c4c4c;
						font-weight: 700;
					}
				}
				.text_time {
					font-size: 24upx;
					color:#4c4c4c;
				}
				.commodity {
					color: #101010;
					margin: 10upx 0 34upx;
					text:last-child {
						float: right;
						font-weight: 700;
					}
				}
				.details {
					color: #101010;
					display: flex;
					justify-content: flex-end;
					text {
						margin:10upx 10upx;
						padding: 0 10upx 6upx;
						border: 1px solid rgba(187 , 187 , 187 , 1);
						border-radius: 5px;
					}
					.blue {
						color: #5bb1ff;
						border: 1px solid #5bb1ff;
					}
					.none {
						display: none;
					}
				}
			}
		}
		.loading {
			font-size: 24upx;
			color:#979797;
			display: flex;
			justify-content: center;
			padding: 40upx 0;
		}
	}

</style>