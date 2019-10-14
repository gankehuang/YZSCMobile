<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				{{itemInfo.taskName}}
			</view>
			<view class="right__icon">
				<image src="../../../static/search/ico-01.png" mode="" class="icon"></image>
			</view> 
		</view>
		
		<view>
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">{{itemInfo.taskName}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">配种批次</view>
					<view class="card_value">{{itemInfo.breedingBatches}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划日期</view>
					<view class="card_value">{{itemInfo.startTime}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">执行头数</view>
					<view>
						<input type="text" value="" placeholder="请输入头数" style="text-align: right;"/>
					</view>
				</view>
				<view class="card_row">
					<view class="card_label">执行人</view>
					<view class="card_value">
						<picker @change="bindPickerChange" :value="index" :range="array1">
							<view class="picker">
								<view class="uni-input" style="padding-right: 0">{{array1[index]}}<uni-icon type="arrowright" color="#B2B2B2" size="16"  /></view>
							</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">检测明细</view>
				</view>
				<view class="card_row">
					<view class="card_label">耳牌号
						<image class="icon" src="/static/assets/scan-icon.png" @tap.stop="scancode" mode="" style="margin: 10rpx 0 0 30rpx"></image>
					</view>
					<view>
						<input type="text" value="" placeholder="请输入头数" style="text-align: right;"/>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view class="row_title">状态</view>
						<view>自动带出</view>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view class="row_title">怀孕天数</view>
						<view>自动带出</view>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view class="row_title">新料喂养</view>
						<view>自动带出</view>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view class="row_title">原料喂养</view>
						<view>自动带出</view>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row">
						<view class="row_title">背膘评分</view>
						<view>
							<input type="text" value="" placeholder="请输入头数" style="text-align: right;"/>
						</view>
					</view>
				</view>	
				<view class="cardList">
					<view class="card_row">
						<view class="row_title">调整量</view>
						<view>
							<input type="text" value="" placeholder="请输入头数" style="text-align: right;"/>
						</view>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view class="row_title">标准料量</view>
						<view>自动带出</view>
					</view>
				</view>
				
			</view>
			
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">照片信息</view>
				</view>
				<view class="imgBox">
					<image v-for="(item, index) in imgArr" :src="item" :key="index" mode="" class="img" @tap="lookImg"></image>
					<image src="../../../static/assets/plus.png" mode="" class="img" @tap="uploadImg"></image>
				</view>
			</view>
			
			<view class="submits jus-b">
				<button type="primary" class="flexc submit-btn">提交</button>
			</view>
		</view>
		
	</view>
</template>

<script>
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import ztable from '@/components/z-table/z-table'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
	components: {
		scrollTab,
		ztable,
		uniIcon
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
			itemInfo: '',  //父页面传递的参数
			array1: ['请选择', '江伟'],
			index: 0,
			imgArr: [],   //上传返回的照片路径数组
		};
	},
	onLoad(option) {
		const item = JSON.parse(decodeURIComponent(option.item));
		//console.log(item);
		this.itemInfo = item
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
				urls: this.imgArr,
			});
		},
		//下拉框选择
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index = e.target.value
		},
		//选择照片
		uploadImg() {
			const _this = this;
			uni.chooseImage({
				count: 6, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function (res) {
					//console.log(res.tempFilePaths);
					_this.imgArr = res.tempFilePaths;
				}
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
			.row_title{
				font-weight:600;
			}
			
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
			margin: 7rpx;
			border: 1px solid lightgray;
			border-radius: 10rpx;
		}
	}
	
	//提交按钮
	.submits {
	    margin-top: 40rpx;
	    margin-bottom: 40rpx;
	    button {
	        width: 320rpx;
	        height: 88rpx;
			font-size: 16px;
			font-family: PingFang SC;
	        &.add-btn {
	            background-color: #F05E57;
	        }
	        &.submit-btn {
	            background-color: #4684EA;
	        }
			&.other-btn {
				width: 260rpx;
				height: 76rpx;
	            background-color: #EAA346;
				margin-bottom: 134rpx;
	        }
			 &.save-btn{
				 width: 480rpx;
				  background-color: #4684EA;
			 }
	    }
	}
	
</style>
