<template>
	<view class="content">
		<view class="main">
			<view style="background:url(../../static/assets/personCenter_head.png) no-repeat 0 0;background-size: 100% 100%;padding-top: 100rpx;padding-bottom: 30rpx;">
				<view class="main-info" id="title1" :style="{'margin-top':top+'px'}">
					<view class="avater-wrap">
						<image class="avater-wrap-avater" src="../../static/assets/user_icon.png" mode=""></image>
					</view>
					<view class="content-wrap">
						<view class="name">{{username}}</view>
						<view class="tel">137****78</view>
					</view>
					<!-- <view class="info__arrow">
						<uni-icon type="forward" color="#fffff" size="24" />
						<view>修改</view>
					</view> -->
				</view>

			</view>
			
			<view class="mainlist">
				
				
				<view class="mainlist-item">
					<view class="item-name">
						<image class="icon" src="../../static/assets/wait_work.png" mode=""></image>
						<view class="item-name-text">
							待办
						</view>
					</view>
					<view class="item-entry">
						<uni-badge text="3" type="error" />
						<uni-icon type="forward" color="#fffff" size="24" />
					</view>
				</view>
				
				
				<view class="mainlist-line" />
				
				
				<view class="mainlist-item">
					<view class="item-name">
						<image class="icon" src="../../static/assets/worked.png" mode=""></image>
						<view class="item-name-text">
							已办
						</view>
					</view>
					<view class="item-entry">
						<uni-icon type="forward" color="#fffff" size="24" />
					</view>
				</view>
				
				
				<view class="mainlist-line" />
				
				
				<view class="mainlist-item">
					<view class="item-name">
						<image class="icon settingicon" src="../../static/assets/setting.png" mode=""></image>
						<view class="item-name-text">
							设置
						</view>
					</view>
					<view class="item-entry">
						<uni-icon type="forward" color="#fffff" size="24" />
					</view>
				</view>
				
				
				<view class="mainlist-line" />
				
				
				<view class="mainlist-item">
					<view class="item-name">
						<image class="icon settingicon" src="../../static/assets/offlineManage.png" mode=""></image>
						<view class="item-name-text">
							离线管理
						</view>
					</view>
					<view class="item-entry">
						<uni-icon type="forward" color="#fffff" size="24" />
					</view>
				</view>
				
				
				<view class="mainlist-line" />
				
				
				<view class="mainlist-item">
					<view class="item-name">
						<image class="icon" src="../../static/assets/about.png" mode=""></image>
						<view class="item-name-text">
							关于
						</view>
					</view>
					<view class="item-entry">
						<uni-icon type="forward" color="#fffff" size="24" />
					</view>
				</view>
				
				<view class="mainlist-line" />
				
				
			<!-- 	<view class="mainlist-item">
					<view class="item-name">
						<image class="icon" src="../../static/assets/about.png" mode=""></image>
						<view class="item-name-text">
							版本更新
						</view>
					</view>
					<view class="item-entry">
						<text>v.3.1.4</text>
						<uni-icon type="forward" color="#fffff" size="24" />
					</view>
				</view> -->
			</view>


		</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		components: {
			uniNavBar,
			uniPopup,
			uniIcon,
			uniBadge
		},
		data() {
			return {
				type: '',
				top: 0,
				username:'一西啊'
			};
		},
		onReady() {
			this.username = uni.getStorageSync('user').name;
		},
		methods: {
			handOnClickMyMsg() {
				uni.navigateTo({
					url: '../message/message',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			togglePopup(type) {
				this.type = type;
			},
			goback() {
				//plus.runtime.quit();
				uni.removeStorageSync('access_token');
				uni.removeStorageSync('refresh_token');
				uni.reLaunch({
					url: '../login/login',
				});
				return false;
			},
		},
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.icon {
		width: 56rpx;
		height: 56rpx;
	}
		
	.settingicon{
		width: 52rpx;
		height:56rpx;
	}

	.header {
		position: relative;

	}

	.main {
		position: relative;
		height: 100%;
		display: flex;
		flex-flow: column;
		width: 100%;
		z-index: 2;

		.main-info {
			padding: 35rpx;
			display: flex;

			.avater-wrap {
				.avater-wrap-avater {
					width: 125rpx;
					height: 125rpx;
					border-radius: 50%;
					border: 4px solid #FFFFFF;
					box-shadow: 0 4px 16px 0 rgba(25, 27, 128, 0.50);
				}
			}

			.content-wrap {
				flex: 1;
				margin-left: 40rpx;
				flex-direction: column;
				justify-content: space-between;
				color: #FFFFFF;
				display: flex;

				.name {
					font-family: PingFangSC-Semibold;
					font-size: 18px;
					font-weight: Semibold;
				}

				.tel {
					margin-top: -20px;
					font-family: PingFangSC-Medium;
					font-size: 15px;
					font-weight: Medium;
				}
			}

			.info__arrow {
				flex-direction: row;
				flex-flow: row-reverse nowrap;
				font-family: PingFangSC-Semibold;
				align-items: center;
				font-size: 28rpx;
				color: #FFFFFF;
				display: flex;
			}
		}

	}

	.mainlist {
		width: 100%;

		.mainlist-item {
			padding: 40rpx 50rpx;
			display: flex;
			flex-flow: row;
			justify-content: space-between;
			align-items: center;

			.item-name {
				display: flex;
				align-items: center;

				.item-name-text {
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: #21211F;
					font-size: 14px;
					margin-left: 34rpx;
					display: flex;
					font-weight: bold ;
				}
			}

			.item-entry {
				color: #BBBBBB;
			}
		}

		.mainlist-line {
			margin-left: 34rpx;
			margin-right: 34rpx;
			background-color: #F2F2F2;
			height: 1px;
		}
	}
</style>
