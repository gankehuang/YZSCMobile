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
					<view class="box" @tap.stop="toMessage('red')">
						<view class="warning red">
							<view class="middlebox">{{blueWarning}}</view>
						</view>
						<view class="warning-title cicleBottom"></view>
						<view class="warning-title">红色预警</view>
						<view class="warning-tip">本月新增预警指标3个</view>
					</view>
					<view class="box" @tap.stop="toMessage('yellow')">
						<view class="warning yellow">
							<view class="middlebox">{{yellowWarning}}</view>
						</view>
						<view class="warning-title cicleBottom"></view>
						<view class="warning-title">黄色预警</view>
						<view class="warning-tip">本月新增预警指标3个</view>
					</view>
					<!-- <view class="box" style="border: none;" @tap.stop="toMessage">
						<view class="warning-title">红色预警</view>
						<view class="warning blue">{{redWarning}}</view>
					</view> -->
				</view>
			</view>
			
			<view class="indicators-warning" style="padding: 0 40rpx 0 40rpx;">
				<view class="title">
					<image src="../../static/tip.png" style="width: 25rpx; height: 25rpx; margin-top: 10rpx;" ></image>
					<view style="margin-left: 10rpx;" @tap.stop="production" >
						生产提醒
					</view>
					<view class="more" @tap="toMore">
						更多<uni-icon type="arrowright" color="#B2B2B2" size="16"  />
					</view>
				</view>
				<view class="indicators-warning-content tip" style="padding-top: 0px;">
					<view class="tip-item" v-for="(item, index) in tipArray" :key="index" @tap.stop="productionItem">
						<view class=""><image src="../../static/tipItem.png" style="width: 67rpx; height: 66rpx;"/></view>
						<view style="margin-top: 10rpx; margin-left: 10rpx; color: #4D4D4D; text-align: left; width: 80%;font-size: 25rpx;">{{item.title}}</view>
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
					<view class="box_1" style="border: none;" @tap.stop="myTask(0)">
						<view class="warning task blue">{{todo}}</view>
						<view class="warning-title" style="color: #4380FF;">我的待办</view>
					</view>
					<view class="box_1" style="border: none;" @tap.stop="myTask(1)">
						<view class="warning task green">{{initiate}}</view>
						<view class="warning-title" style="color: #70D56D;">我发起的</view>
					</view>
					<view class="box_1" style="border: none;" @tap.stop="myTask(2)">
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
						<image src="/static/slices/itemManage.png" class="g-image" />
						<view class="g-title">管理</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
			
		</mescroll-uni>	
		<!-- 树形选择器 -->
		<tki-tree ref="tkitree" confirmColor="#5089f9" @watchSearch="watchSearch" :selectParent="selectParent" :multiple="multiple" :range="list" rangeKey="name" @confirm="treeConfirm" @cancel="treeCancel"></tki-tree>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
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
	import tkiTree from '@/components/tki-tree/tki-tree.vue';  //树形选择器
	import common from '../../utils/common.js';
	let testList = [{
			id: 1,
			name: '正邦集团',
			children: [{
				id: 11,
				name: '市辖区',
				children: [{
						id: 111,
						name: '西城区',
						children: [{
							id: 1111,
							name: '南河沿大街',
							children: [{
								id: 11111,
								name: '紫金宫饭店',
							}, ]
						}, ]
					},
					{
						id: 112,
						name: '东城区',
					},
					{
						id: 113,
						name: '朝阳区',
					},
					{
						id: 113,
						name: '丰台区',
					}
				]
			}, ]
		},
		{
			id: 2,
			name: '正邦科技',
			children: [{
					id: 21,
					name: '石家庄市',
				},
				{
					id: 22,
					name: '唐山市',
				},
				{
					id: 23,
					name: '秦皇岛市',
				},
			]
		},
		{
			id: 3,
			name: '养殖中心',
			children: [{
					id: 31,
					name: '济南市',
					children: [{
							id: 311,
							name: '历下区',
							children: [{
								id: 3131,
								name: '解放路街道办事处',
							}, ]
						},
						{
							id: 312,
							name: '槐荫区',
						},
						{
							id: 313,
							name: '天桥区',
						},
						{
							id: 314,
							name: '历城区',
						},
						{
							id: 315,
							name: '长清区',
						}
					]
				},
				{
					id: 32,
					name: '青岛市',
				},
				{
					id: 33,
					name: '临沂市',
					children: [{
							id: 331,
							name: '兰山区',
							children: [{
								id: 3331,
								name: '金雀山街道',
							}, ]
						},
						{
							id: 332,
							name: '河东区',
						},
						{
							id: 333,
							name: '罗庄区',
							children: [{
								id: 3331,
								name: '盛庄街道',
							}, ]
						}
					]
				},
				{
					id: 34,
					name: '日照市',
				},
				{
					id: 35,
					name: '淄博市',
				},
				{
					id: 36,
					name: '枣庄市',
				},
				{
					id: 37,
					name: '东营市',
				},
				{
					id: 38,
					name: '潍坊市',
				},
				{
					id: 39,
					name: '烟台市',
				},
				{
					id: 40,
					name: '济宁市',
				},
				{
					id: 41,
					name: '泰安市',
				},
				{
					id: 42,
					name: '威海市',
				},
				{
					id: 43,
					name: '滨州市',
				},
				{
					id: 44,
					name: '菏泽市',
				},
			]
		}
	]
	export default {
		components: {
			uniNavBar,
			uniIcon,
			mpvuePicker,
			uniLoadMore,
			uniTag,
			uniBadge,
			tkiTree,   //树形选择
			
			MescrollUni  //上拉，下拉刷新组件
		},
		onLoad() {
			uni.setStorage({
				key: 'falg',
				data: false
			});
			
			//设置树形选择器数据选项
			setTimeout(()=>{
				this.list = testList;
			}, 300)
		},
		onShow() {  //y页面显示监听
			const _this = this;
			uni.getStorage({
				key: 'myUsualUses',
				success: function (res) {
					//console.log(res.data);
					_this.myUsualUses = res.data;
				}
			});
		},
		onHide() {  //页面关闭
			const myUsualUses = this.myUsualUses;
			uni.setStorage({
				key: 'myUsualUses',
				data: myUsualUses
			});
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
				
				falg:false,  //我的常用管理状态
				
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
				yellowWarning: "03",
				redWarning: "06",
				
				todo: 10,   //我的任务
				initiate: 7,
				read: 9,
				
				tipArray: [
					{title: '您有20头超42天空返存栏，请尽快采取措施！'},
					{title: '您有15头空怀超49天存栏，请尽快采取措施！'},
					{title: '您有10头超110天未上产房存栏，请及时处理！'}
				],
				myUsualUses: [
					{
						title: "种猪档案",
						url: "/static/consoleIcon/archives/boarInfo.png",
						jumpurl: '/pages/archives/boarInfo/boarInfo'
					},
					{
						title: "批次档案",
						url: "/static/consoleIcon/archives/pigBatch.png",
						jumpurl: '/pages/archives/pigBatch/pigBatch'
					},
					{
						title: "配种批次",
						url: "/static/consoleIcon/archives/matingInfo.png",
						jumpurl: '/pages/archives/matingBatch/matingInfo'
					},
				],
			
				loading:'',
				text:'全部',
				isShowNoMore:false,
				upOption:{
					textNoMore:'我是有底线的 >_<' ,
					 use: false
				},
				//树形选择器
				list: [],
				multiple:false,
				selectParent:true,
			};
		},
		onReady() {
			let _this = this;
			let view = uni.createSelectorQuery().select("#nav_bar");
			if(plus.runtime.arguments != ""){
					try{
						var portaldata = JSON.parse(plus.runtime.arguments);
						if(portaldata.access_token!= undefined){
							let Authentication = portaldata.zbData.Authentication;
							uni.setStorageSync('user', portaldata.zbData.user);
							uni.setStorageSync('access_token', portaldata.access_token);
							uni.setStorageSync('Authentication', Authentication);
						}else{
							this.gelogin();  //模拟登录
						}
						// 处理JSON对象portaldata
					}catch(e){
						//console.log("若传入的参数不是JSON格式字符，需处理异常情况");
						// 若传入的参数不是JSON格式字符，需处理异常情况
					}
				}
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

			toMessage(type) {  //预警跳转
				if(type == 'red') {
					uni.navigateTo({
						url: "/pages/message/redWarning"
					});
				}else {
					uni.navigateTo({
						url: "/pages/message/yellowWarning"
					});
				}
				
			},
			production() {  //生产提醒跳转
				uni.navigateTo({
					url: "/pages/message/productionRemind"
				});
			},
			toMore() {   //跳转生产提醒更多
				uni.navigateTo({
					url: "/pages/message/productionMoreList"
				});
			},
			productionItem() {  //生产提醒条目
				uni.navigateTo({
					url: "/pages/message/productionRemind"
				});
			},
			myTask(e) {  //我的任务跳转
				uni.navigateTo({
					url: "/pages/message/message?type=" + e
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
				let state = this.falg;
				uni.setStorage({
					key: 'falg',
					data: state
				});
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
				this.$refs.tkitree._show();
				
				//新页选择
				
				//弹窗选择
				/* this.pickerValueArray = cityData;
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show() */
			},
			// 确定回调事件
			treeConfirm(e){
				console.log(e[0].name);
				this.righttext = e[0].name;
			},
			// 取消回调事件
			treeCancel(e){
				console.log(e)
			},
			//树形选择器搜索框内容改变触发
			watchSearch(e) {
				const _this = this;
				//console.log(e);
				let timer;
				clearTimeout(timer)
				timer = setTimeout(e => {
					if(e == 1){
						let nList = [{
							id: 111,
							name: '西城区',
							children: [{
								id: 1111,
								name: '南河沿大街',
								children: [{
									id: 11111,
									name: '紫金宫饭店',
								}, ]
							}]
						}]
						_this.list = nList;
					}else {
						_this.list = testList;
					}
				}, 1000)
			},
			
			back() {
				if(plus.runtime.appid=='HBuilder'){
					uni.navigateBack({
						delta: 1
					});
				}
				else if (uni.getSystemInfoSync().platform == 'android') {
					// #ifdef APP-PLUS
					var nd = plus.android.invoke('com.zb.portal.zbmobile.NativeDispatch', 'getInstance');
					plus.android.invoke(nd, 'uniExit');
					// #endif
				} else {
					// #ifdef APP-PLUS
					plus.ios.invoke('NativeDispatch', 'uniExit');
					// #endif
				}
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
			gelogin() {
				var that = this;
				let headers = {};
				let params = {
					userName: 'zhoujunfeng', // 用户名 修改为不一样的用户名，避免token 冲突
					password: '1' // 密码
				};
				common.commRequest('/login', params, headers,'POST',
					function(data) {
						//let access_token = data.data.access_token;
						let Authentication = data.data.Authentication;
						uni.setStorageSync('user', data.data.user);
						//uni.setStorageSync('access_token', access_token);
						uni.setStorageSync('Authentication', Authentication);
					})
			}
		},
		
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
	.more{
		width: 77%;
		text-align: right; 
		font-size: 25rpx;
		color: lightgray;
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
		padding: 50rpx 10rpx 10rpx 10rpx;
		.box{
			flex: 1;
			background-color: #fff;
			box-shadow:0px 10px 124px rgba(114,121,158,0.32);
			border-radius: 10rpx;
			align-items: center;
			justify-content: center;
			margin: 20rpx;
			padding: 40rpx 20rpx;
			.warning{
				display: flex;
				flex: 1;
				width: 150rpx;
				height: 150rpx;
				line-height: 150rpx;
				margin: auto;
				border-radius: 200rpx;
				font-weight: 600;
				font-size: 55rpx;
				.middlebox{
					margin: auto;
					display: flex;
					width: 100rpx;
					height: 100rpx; 
					line-height: 100rpx;
					justify-content: center;
					border:1px solid lightgray;
					border-radius:50%;
					font-size: 35rpx;
					 
				}
			}
			.red{ border: 25rpx solid #E86542; }
			.yellow{ border: 25rpx solid #FFD154; }
			.warning-title{
				margin-bottom: 10rpx;
				margin-top: 15rpx;
			}
			.cicleBottom{
				height:40rpx;
				display: flex;
				flex: 1; 
				background-color: #FFFFFF; 
				margin-top: -40rpx; 
				border-radius: 100%;
			}
			.warning-tip{
				text-align: center;
				font-size: 24rpx;
				color: #929292;
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