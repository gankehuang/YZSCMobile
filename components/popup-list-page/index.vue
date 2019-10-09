<template>
	<view class="pages">
		<view class="title-head ali-c">
			选页
		</view>
		<view class="page-options flex">
			<view class="option flexc" v-for="(item,index) in 3" :key="index" :class="{on:index==nowIndex}" @tap="selectList(index)">
				{{index*100+1}}-{{index*100+100}}
			</view>
		</view>
		<view class="pages-list flex-wrap">
			<view v-for="(item,index) in 50" :key="index" class="pages flexc" :class="{check:index==pageIndex}" @tap="selectPage(index)">
				{{index+1}}
			</view>
		</view>
	</view>
</template>

<script>
    export default {
		data() {
			return {
				nowIndex:0,//list选项index
				pageIndex:0,//page选项index
			}
		},
		methods:{
			// 选择page列表页
			selectList(index) {
				this.nowIndex = index;
			},
			selectPage(index) {
				this.pageIndex = index;
				this.$emit("selectPages", index+1);
			}
		}
    }
</script>

<style lang="scss">
	.pages {
		width: 500upx;
		.title-head {
			height: 100upx;
			padding-left: 20upx;
			font-size: 34upx;
			font-weight: bold;
			color: #4D4D4D;
			border-bottom: 1upx solid #f5f5f5;
		}
		.page-options {
			height: 80upx;
			padding-left: 10px;
			border-bottom: 1upx solid #f5f5f5;
			.option {
				padding: 0 10upx;
				height: 100%;
				font-size: 28upx;
				color: #7A7A7A;
				&.on {
					color: #3A75E7;
				}
			}
		}
		.pages-list {
			padding: 20upx;
			.pages {
				width: 100upx;
				height: 52upx;
				font-size: 24upx;
				border: 1upx solid #f5f5f5;
				border-radius: 52upx;
				color: #7A7A7A;
				margin: 10upx 6upx;
				&.check {
					background-color: #3A75E7;
					color: #fff;
					// border: none;
				}
			}
		}
	}
</style>
