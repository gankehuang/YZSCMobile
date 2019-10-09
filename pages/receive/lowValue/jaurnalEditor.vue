<template>
	<view class="semen-editor">
		<view class="card-form card" v-for="(item,index) in 2" :key="index">
			<view class="jus-j form-list" @tap="selectDate">
				<view class="field">
					物料名称
					<text>*</text>
				</view>
				<view class="s-value">
					酒精
				</view>
			</view>
			<view class="jus-j form-list" @tap="pigClub">
				<view class="field">
					领用数量
					<text>*</text>
				</view>
				<view class="s-value">
					12
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					备注
				</view>
				<view class="s-value">
					--
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					计量单位
					<text>*</text>
				</view>
				<view class="s-value">
					个
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					规格
					<text>*</text>
				</view>
				<view class="s-value">
					2
				</view>
			</view>
			<view class="jus-j form-list">
				<view class="field">
					库存数量
					<text>*</text>
				</view>
				<view class="s-value">
					1000
				</view>
			</view>
			<view class="delete-btn jus-e ali-c">
				<view class="del flexc">
					删除
				</view>
			</view>
		</view>
		<view class="confirm-btn">
			<button type="primary">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
				
		},
		components: {
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.semen-editor {
		background-color: #F5F5F5;
		padding: 0 30upx;
		.editor-title {
			height: 80upx;
			.img {
				line-height: 80upx;
				image {
					width: 12upx;
					height: 12upx;
					vertical-align:middle;
				}
			}
			text {
				margin-left: 14upx;
				line-height: 80upx;
				font-size: 32upx;
			}
			.confirm-btn {
				width: 140upx;
				height: 54upx;
				button {
					width: 140upx;
					height: 54upx;
					font-size: 24upx;
					padding: 0;
					background-color: #4684EA;
				}
			}
			&.form-seat {
				height: 120upx;
			}
		}
		.card-form {
			margin: 26upx 0;
			.form-list {
				height: 96upx;
				border-bottom: 1upx solid #EBEEF2;
				font-size: 28upx;
				.field {
					text {
						color: #FF6354;
						margin-left: 10upx;
					}
				}
				.s-value {
					color: #B2B2B2;
					vertical-align:middle;
					&.d-num {
						text-align: right;
					}
					input {
						font-size: 28upx;
					}
				}
				
			}
			.delete-btn {
				height: 140upx;
				.del {
					width: 180upx;
					height: 64upx;
					border: 1upx solid #CACFD9;
					font-size: 28upx;
					border-radius: 64upx;
				}
			}
		}
		.confirm-btn {
			width: 520upx;
			margin: 60upx auto;
		}
	}
	
</style>
