<template>
	<view>
		<view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                        <swiper-item v-for="(item, index ) in list" :key="index">
                            <view class="swiper-item" :click="tap(item.id)">
								<image :src="item.img" style="width: 100%;"></image>
								<view v-show="titleShow" class="title" v-text="item.title"></view>
							</view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
export default {
	name: 'CompSwiper',
	props: {
		list: Array,
		indicatorDots: Boolean,
		autoplay: Boolean,
		titleShow: Boolean,
		interval: Number,
		duration: Number,
		indicatorColor: String,
		indicatorActiveColor: String,
		urls: String
	},
	data() {
		return {
			goUrl: this.urls
		};
	},
	methods: {
		tap(o) {
			let _this = this;
			if (_this.goUrl != '') {
				uni.navigateTo({
					url: _this.goUrl + o
				});
			}
		}
	}
};
</script>

<style>
.swiper {
	position: relative;
}
.swiper .title {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 5upx 10upx;
	box-sizing: border-box;
	display: block;
	text-align: center;
	background: rgba(1, 1, 1, 0.5);
	color: #ffffff;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	line-clamp: 1;
	-webkit-box-orient: vertical;
}
</style>
