<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					新增测膘记录
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="main">
			<view class="main-wrap">
				<view class="main-wrap-contetnt" style="padding-top: 0">
					<view class="main-wrap-contetnt-item">
						<view class="main-wrap-contetnt-item-field">
							<view class="main-wrap-contetnt-item-field-name">
								耳牌号
								<text class="text-red">*</text>
								<view class="main-wrap-contetnt-item-field-name-icon" @click="scancode">
									<image class="icon" src="/static/assets/scan-icon.png" mode=""></image>
								</view>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" value="" placeholder="请输入耳牌号" /></view>
						</view>

						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								状态
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" placeholder="" /></view>
						</view>

						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								怀孕天数
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" placeholder="" /></view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								新饲喂量
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" placeholder="" /></view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								原饲喂量
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" placeholder="" /></view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								当前背膘
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" placeholder="" /></view>
						</view>
						
						<view class="main-wrap-contetnt-item-field">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								标准背膘
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" placeholder="" /></view>
						</view>
						
						<view class="main-wrap-contetnt-item-field field-nobottom">
							<view style="display: flex;align-items: center;" class="main-wrap-contetnt-item-field-name">
								标准料量
								<text class="text-red">*</text>
							</view>
							<view class="main-wrap-contetnt-item-field-value"><input type="text" placeholder="" /></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="submits jus-b">
			<button type="primary" v-if="submitStatus" class="flexc delete-btn">删除</button>
			<button type="primary" v-if="submitStatus" class="flexc submit-btn">提交</button>
		</view>
	</view>
</template>

<script>
//引入抽屉单元格组件
import drawCell from '@/components/uni-cell/draw-cell.vue';
//引入图标
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import ztable from '@/components/z-table/z-table';
export default {
	data() {
		return {
			submitStatus: true
		};
	},
	computed: {},
	components: {
		ztable,
		uniIcon,
		drawCell
	},
	methods: {
		scancode1() {
			this.scancode();
			setTimeout(() => {
				this.togglePopup('middle');
			}, 500);
		},
		togglePopup(type) {
			this.type = type;
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';

.status-header {
		padding-top: 26rpx;
	}

.main {
	padding-top: 130rpx;
	.main-wrap {
		padding: 31rpx 23rpx 23rpx 23rpx;
	}
	.main-wrap-contetnt {
		padding-top: 0;
	}
}

.submits {
	.delete-btn {
		width: 316rpx;
		background-color: #f05e57;
		color: #ffffff;
	}
}

input {
	font-size: 14px;
}

</style>
