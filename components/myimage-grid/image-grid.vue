<template>
	<view class="cu-form-group" style="padding: 10px 5px 0 5px;" v-if="options.length>0 || isEditable">
		<view class="grid col-4 grid-square flex-sub">
			 <view class="bg-img" v-for="(item,index) in options" :key="index" @tap="ViewImage" :data-url="options[index]">
				<image :src="options[index]" mode="scaleToFill"></image>
				<template v-if="isEditable">
					<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</template>
			</view>
			<template v-if="isEditable">
				<view class="solids" @tap="add">
					<text class='cuIcon-cameraadd'></text>
				</view>
			 </template>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniGrid',
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
			},
			isEditable:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			}
		},
		created() {
			
		},
		methods: {
			add() {
				this.$emit('chooseImage')
			},
			delImg(e){
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.$emit('delImg', {
								index: e.currentTarget.dataset.index
							})
						}
					}
				})
				
				
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.options,
					current: e.currentTarget.dataset.url
				});
			}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.cu-list.grid>.cu-item {
		position: relative;
		display: flex;
		padding: 20upx 0 30upx;
		transition-duration: 0s;
		flex-direction: column
	}
	.add {
		border: 1px dashed;
		width: 100%;
		height: 100%;
		color: #ccc;
		transition: color .25s;
		position: relative;
	}
	
	.add::before{
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 40upx;
		margin-left: -20upx;
		border-top: 2upx solid;
	}
	
	.add::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		height: 40upx;
		margin-top: -20upx;
		border-left: 2upx solid;
	}
	
	.add:hover {
	  color: blue;
	}

	.uni-grid {
		position: relative;
		display: flex;
		flex-direction: column
	}

	.uni-grid__flex {
		display: flex;
		flex-direction: row
	}

	.uni-grid-item {
		display: flex;
		position: relative;
		flex-direction: column;
		flex: 1
	}

	.uni-grid-item:before {
		display: block;
		content: " ";
		padding-bottom: 100%
	}

	.uni-grid-item:after {
		content: '';
		position: absolute;
		z-index: 1;
		transform-origin: center;
		box-sizing: border-box;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border-color: #c8c7cc;
		border-style: solid;
		border-width: 1px;
		-webkit-transform: scale(.5);
		transform: scale(.5);
		border-top-width: 0;
		border-left-width: 0
	}

	.uni-grid-item__content {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center
	}

	.uni-grid-item-text {
		font-size: 32upx;
		color: #333;
		margin-top: 12upx
	}

	.uni-grid-item-hover {
		background-color: #f1f1f1
	}

	.uni-grid-item-image {
		width: 100%;
		height: 100%
	}

	.uni-grid .uni-grid__flex:first-child .uni-grid-item:after {
		border-top-width: 1px
	}

	.uni-grid .uni-grid__flex .uni-grid-item:first-child:after {
		border-left-width: 1px
	}

	.uni-grid.uni-grid-no-out-border .uni-grid__flex:first-child .uni-grid-item:after {
		border-top-width: 0
	}

	.uni-grid.uni-grid-no-out-border .uni-grid__flex:last-child .uni-grid-item:after {
		border-bottom-width: 0
	}

	.uni-grid.uni-grid-no-out-border .uni-grid__flex .uni-grid-item:first-child:after {
		border-left-width: 0
	}

	.uni-grid.uni-grid-no-out-border .uni-grid__flex .uni-grid-item:last-child:after {
		border-right-width: 0
	}

	.uni-grid.uni-grid-no-border .uni-grid-item:after {
		border-width: 0
	}

	.uni-grid.uni-grid-no-border .uni-grid__flex:first-child .uni-grid-item:after {
		border-top-width: 0
	}

	.uni-grid.uni-grid-no-border .uni-grid__flex .uni-grid-item:first-child:after {
		border-left-width: 0
	}

	.uni-grid-item-oblong.uni-grid-item:before {
		padding-bottom: 60%
	}

	.uni-grid-item-oblong .uni-grid-item__content {
		flex-direction: row
	}

	.uni-grid-item-oblong .uni-grid-item-image {
		width: 52upx;
		height: 52upx
	}

	.uni-grid-item-oblong .uni-grid-item-text {
		margin-top: 0;
		margin-left: 12upx
	}
</style>