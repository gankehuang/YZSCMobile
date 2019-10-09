<template>
	<view>
		<view class="editor-title" @click="toggle">
			<view class="img flex jus-j">
				<view>
					<image src="/static/assets/rect.png" mode=""></image>
					<text class="title">{{title}}</text>
				</view>
				<uni-icon type="arrowup" color="#4D4D4D" v-if="isShow"></uni-icon>
				<uni-icon type="arrowdown" color="#4D4D4D" v-else></uni-icon>
			</view>
		</view>
		<view v-if="isShow">
			<view class="detail-item" v-for="(item,index) in stationData" :key="index">
				<view class="detail-header">
					<text class="colorBlock"></text>
					<text>配种批次：{{item.name}}</text>
				</view>
				<view class="detail-body">
					<view class="detail-row">
						<view class="detail-row-item">
							<text class="num">{{item.totalTasks}}</text>
							<text class="title">总任务项</text>
						</view>
						<view  class="detail-row-item">
							<text class="num">{{item.finished}}</text>
							<text class="title">已完成</text>
						</view>
						<view  class="detail-row-item">
							<text class="num">{{item.noFinished}}</text>
							<text class="title">未完成</text>
						</view>
						<view  class="detail-row-item">
							<text class="num">{{item.beLate}}</text>
							<text class="title">逾期未完成</text>
						</view>
					</view>
					<view class="detail-row">
						<view  class="detail-row-item">
							<text class="num">{{item.cancel}}</text>
							<text class="title">已取消</text>
						</view>
						<view  class="detail-row-item">
							<text class="num">{{item.doing}}</text>
							<text class="title">执行中</text>
						</view>
						<view  class="detail-row-item">
							<text class="num">{{item.change}}</text>
							<text class="title">已调整</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default{
		data(){
			return{
				isShow:false
			}
		},
		props:{
			title:{
				type:String,
				default:'无'
			},
			stationData:{
				tpe:Array,
				default:[]
			}
		},
		components:{
			uniIcon
		},
		methods:{
			toggle(){
				this.isShow=!this.isShow;
			}
		}
	}
</script>

<style lang="scss">
	.editor-title {
		height: 44rpx;
		width:100%;
		margin-bottom:20rpx;
		
		.title{
			color: #4D4D4D;
			font-weight: bold;
		}
		.img {
			line-height: 44rpx;
			image {
				width: 12rpx;
				height: 12rpx;
				vertical-align:middle;
			}
		}
		text {
			margin-left: 14rpx;
			line-height: 44rpx;
			font-size: 32rpx;
		}
		
	}
	.detail-item{
		&:last-child{
			margin-bottom: 15rpx;
		}
		background: #FFFFFF;
		border-radius: 8rpx;
		padding:26rpx 20rpx 10rpx;
		.detail-header{
			font-size: 28rpx;
			color: #333333;
			.colorBlock{
				background: #3A75E7;
				width: 5rpx;
				height: 18rpx;
				display: inline-block;
				margin-right: 10rpx;
			}
		}
		.detail-body{
			.detail-row{
				padding:14rpx 0;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom:1px solid #CBCBCB;
				&:last-child{
					border-bottom: none;
				}
				.detail-row-item{
					width: 25%;
					text-align: center;
					.num{
						color: #333333;
						font-weight: bold;
						font-size: 36rpx;
					},
					.title{
						color:#999999;
						font-size: 24rpx;
					}
				}
				text{
					display: block;
					text-align: center;
				}
			}
		}
	}
</style>
