<template>

	<view class="content">
		<scroll-view style="width:100%;height: 100%;flex: 1;" scroll-y :scroll-top="scrollTop" @scrolltolower="loadMore"
		 @scroll="scrollTopFun" :lower-threshold="50" status-bar="true">
			<view class="header">
				<uni-nav-bar id="nav_bar" left-icon="arrowleft" :right-text="righttext" @click-right="showCity" left-text="返回"
				 @click-left="back" title="消息" color="#ffffff" font-size="16px" :fixed="true" :statusBar="true" backgroundColor="#2D70F5">

				</uni-nav-bar>
				<!-- <scroll-view id="tab-bar" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto" class="nav__warp"
				 :class="showComponent ? 'topnav' : ''">
					<view class="nav__list" v-for="(tab, index) in tabBars" :key="index" :id="tab.value" :data-current="index" @click="tapTab">
						<view class="nav__item" :class="{'active': tabIndex == index}">
							<text class="nav__item__text">{{ tab.name }}</text>
							<view class="nav__item__line"></view>
						</view>
					</view>
				</scroll-view> -->
			</view>
			<!-- 文章列表 -->
			<scroll-view id="list" :vertical="true" @scrolltolower="loadMore">
				<view v-for="(item,index) in dataList" :key="index">
					<view class="list_date">
						<view class="list_title" v-if="isSee(item,index)">
							<image src="/static/assets/dateicon.png" style="height: 30rpx;width: 30rpx;margin-right: 8rpx;"></image>
							<text>{{item.createDate}}</text>

						</view>
						<view class="badge-view" v-if="isSee(item,index)">
							<uni-badge text="3" type="error" />
						</view>
					</view>
					<view class="listItem" @click="tap(item)">
						<text v-text="item.name" style="flex: 1;text-align: left;" />
						<view class="tag-view" v-if="showtag">
							<uni-tag :text="item.text" :type="item.type" />
						</view>
						<uni-icon type="forward" color="#333333" size="22" />

					</view>
				</view>
				<view class="uni-tab-bar-loading" @click="loadMore()">
					<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
				</view>
			</scroll-view>
		</scroll-view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import cityData from '@/common/zb.data.js';
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		components: {
			uniNavBar,
			uniIcon,
			mpvuePicker,
			uniLoadMore,
			uniTag,
			uniBadge
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
				dataList: [{
						createDate: '2019-06-27',
						name: '您有数据管理任务待办',
						id: 1,
						text:'新增',
						type:'success'
					},{
						createDate: '2019-06-27',
						name: '您有数据管理任务待办',
						id: 1,
						text:'恶化',
						type:'error'
					},{
						createDate: '2019-06-27',
						name: '您有数据管理任务待办',
						id: 1,
						text:'改善',
						type:'primary'
					},
					{
						createDate: '2019-06-28',
						name: '您有数据管理任务待办2',
						id: 2,
						text:'恶化',
						type:'error'
					}

				],

				tabIndex: 0, // tab组件选项卡事件参数
				tabScrollTop: 0,

				navHeigh: 10, //标题栏高度
				top: 0, // 顶部监听事件使用

				// 顶部菜单
				tabBars: [{
						name: '待办任务',
						value: 'waitTask'
					},
					{
						name: '生产提醒',
						value: 'projectTip'
					},
					{
						name: '任务逾期',
						value: 'taskExpect'
					},
					{
						name: '指标预警',
						value: 'targetPrewarn'
					}
				],
				scrollInto: "",

				isClickChange: false,
				NewsGoUrl: '', // 列表点击链接
				loadingType: 0, // 加载更多状态
				loadingText: {
					contentdown: '查看更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
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
		// 下拉刷新 
		onPullDownRefresh() {
			console.log('下拉刷新');
			setTimeout(function() {
				
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
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
			// 监听滑动事件
			scrollTopFun(e) {
				let _this = this;
				_this.top = e.detail.scrollTop;
				_this.getScrollTop();
			},
			// 计算距离
			getScrollTop() {
				let _this = this;
				let view = uni.createSelectorQuery().select(this.scrollComponents);
				let scrollView = uni.createSelectorQuery().select(this.scrollViewomponents);
				view.boundingClientRect(data => {
					// data.top  tab节点离页面顶部的距离为;
					if (data.top <= 0) {
						scrollView.boundingClientRect(scrollData => {
							// data.top  内容节点离页面顶部的距离为;
							if (scrollData.top > _this.navHeigh) {
								_this.showComponent = false;
							} else {
								_this.showComponent = true;
							}
						}).exec();
					} else {
						_this.showComponent = false;
					}
				}).exec();
			},
			tap(o) {
				let _this = this;
				if (_this.goUrl != '') {
					uni.navigateTo({
						url: "/pages/boarInfo/boarInfo"
					});
				}
			},
			// 滑动底部加载
			loadMore() {
				let _this = this;
				let list = _this.dataList;
				_this.loadingType = 1;
				setTimeout(() => {
					let li = {
						createDate: '2019/06/29',
						name: '您有数据管理任务待办',
						id: 3
					};
					list.push(li);
					_this.loadingType = 0;
				}, 300);
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
		}
	}
</script>

<style lang="scss">
	$text—gray: #ABABAB;
	$pageBg:#EFF6F9;
	$headBg:#2D70F5;
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
		// padding-bottom: 20rpx;
		// border-bottom-left-radius: 32rpx;
		// border-bottom-right-radius: 32rpx;

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

	.list_title {
		width: 80%;
		display: flex;
		flex-flow: row | nowrap;
		align-items: center;
		padding: 20rpx;
		padding-bottom: 0rpx;
		margin-left: $margin_content;
		margin-right: $margin_content;
	}

	.listItem {
		background: #ffffff;
		border-bottom: 1upx solid #f2f2f5;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx;
		border-radius: 20rpx;
		margin-top: $margin_content;
		margin-left: $margin_content;
		margin-right: $margin_content;
	}

	.tag-view {
		margin-right: 150rpx;
		margin-top: -50rpx;
		padding-top: 20px;
		margin-bottom: 10rpx;
		display: inline-block;
	}
	.badge-view {
		width: 10%;
		padding-right: 20rpx;
		padding-top: 6rpx;
	}
	.list_date {
		display: flex;
		width: 100%;
	}
</style>
