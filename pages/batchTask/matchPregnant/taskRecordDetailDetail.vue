<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				任务记录详情
			</view>
			<view class="right__icon">
				<image src="../../../static/search/ico-01.png" mode="" class="icon"></image>
			</view> 
		</view>
		
		<view>
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">生产母猪普免</view>
					<view class="card_value title">未执行</view>
				</view>
				<view class="card_row">
					<view class="card_label">任务名称</view>
					<view class="card_value">12月第2周猪瘟</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划日期</view>
					<view class="card_value">2019/01/02</view>
				</view>
				<view class="card_row">
					<view class="card_label">执行头数</view>
					<view class="card_value">12</view>
				</view>
				<view class="card_row">
					<view class="card_label">执行人</view>
					<view class="card_value">江伟</view>
				</view>
			</view>
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">照片信息</view>
				</view>
				<view class="imgBox">
					<image src="../../../static/logo.png" mode="" class="img" @tap="lookImg"></image>
					<image src="../../../static/logo.png" mode="" class="img" @tap="lookImg"></image>
					<image src="../../../static/logo.png" mode="" class="img" @tap="lookImg"></image>
					<image src="../../../static/logo.png" mode="" class="img" @tap="lookImg"></image>
				</view>
			</view>
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">领料关联</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view>YPLY1808180743</view>
						<view>2018/08/18</view>
					</view>
					<view class="card_row">
						<view>亿力能 猪乙型 脑炎活疫苗（SA14-14-2）</view>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row">
						<view>YPLY1808180743</view>
						<view>2018/08/18</view>
					</view>
					<view class="card_row">
						<view>亿力能 猪乙型 脑炎活疫苗（SA14-14-2）</view>
					</view>
				</view>
				
				
				
			</view>
		</view>
		
	</view>
</template>

<script>
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import ztable from '@/components/z-table/z-table'
export default {
	components: {
		scrollTab,
		ztable
	},
	data() {
		return {
			id: '',
			currentNavIndex: 0,
			navList: [{
				name: '逾期任务'
			},{
				name: '违规任务'
			}],
			
			
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
		}
	},
	methods: {
		setUp(){ // 设置 
			uni.navigateTo({
				url: '/pages/matingBatch/matingSetting/matingSetting'
			})
		},
		back () {
			uni.navigateBack({
			})
		},
		lookImg() {  //全屏预览图片
			uni.previewImage({
				urls: ['../../../static/logo.png', '../../../static/logo.png', '../../../static/logo.png', '../../../static/logo.png'],
			});
		}
	}
}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	
	.cardList{
		border-bottom: 1px solid #EBEEF2;
		.card_row{
			border: none;
			font-weight:600;
		}
	}
	
	.title{
		color: #4785F3 !important;
	}
	.imgBox{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 10rpx 0 30rpx 0;
		margin-top: 10rpx;
		.img{
			width: 22%;
			height: 150rpx;
			margin: 10rpx;
		}
	}
	
	
	
</style>
