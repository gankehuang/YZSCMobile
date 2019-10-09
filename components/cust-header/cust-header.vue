<template>
	<view class="status__bar">
		<view class="back__icon">
			<slot name="left">
				<image class="icon" src="/static/assets/back.png" @tap="back" mode=""></image>
			</slot>
		</view>
		<view class="status__title">
			{{ myTitle }}
		</view>
		<view class="right__icon">
			<!-- <image src="../../../static/assets/setting.png" mode="" class=""></image> -->
			<slot name="right">
			</slot>
		</view>
	</view>
</template>

<script>
export default{
	name: 'cust-header',
	props: {
		myTitle: {
			required: true,
			type: String
		}
	},
	data () {
		return {
		}
	},
	methods: {
		back() {
			uni.navigateBack({
			});
		}
	}
}
</script>

<style lang="scss">
.status__bar {
	background: linear-gradient(#5089F9,#3A75E7);
	height: 65px;
	display: flex;
	flex-flow: row nowrap;
	padding: 0 15px 10px 15px;
	box-sizing: border-box;
	color: white;
	align-items: flex-end;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	.status__title {
		flex: 1;
		font-weight: 600;
		font-size: 16px;
		text-align: center;
	}

	.back__icon {
		position: absolute;
		image {
			width: 13px;
			height: 13px;
		}
	}

	.right__icon {
		position: absolute;
		right: 20px;
		image {
			margin-left: 12px;
			width: 13px;
			height: 13px;
		}
	}
}
.icon{
	width: 13px;
	height: 13px;
}
</style>
