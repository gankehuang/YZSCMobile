<template>
	<view class="page-wrapper">
		<cust-header myTitle="分场档案">
			<view slot="right">
			</view>
		</cust-header>
		
		<view class="pigfen_card_list">
			<view class="pigfen_card_wrapper" v-for="(item, index) in pigfenList" :key="item.fnumber">
				<view class="pigfen_card flex">
					<view class="seq" :class="{'disabled': item.status === 2}">
						{{getNumber( index+1 )}}
					</view>
					<view class="info flex flexv flex1">
						<view>
							<text class="label">分场代码：</text>
							<text class="value">{{ item.fnumber }}</text>
						</view>
						<view>
							<text class="label">分场名称：</text>
							<text class="value">{{ item.fname }}</text>
						</view>
					</view>
					<view class="more" :class="{'rotate': item.showmenu}" @tap="toggleMenu(index)">
						<view class="icon_more">
							<uni-icon type="more-filled" color="#B2B2B2" size="32" />
						</view>
					</view>
				</view>
				<view class="pigfen_menu flex jus-b ali-c" :class="{'show': item.showmenu}">
					<text class="flex1 text-red" v-show="item.status === 1">禁用</text>
					<text class="flex1 text-green" v-show="item.status === 1" @tap="edit(item)">修改</text>
					<text class="flex1 text-primary" v-show="item.status === 2">启用</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import custHeader from '@/components/cust-header/cust-header.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
	components: {
		custHeader,
		uniIcon
	},
	data() {
		return {
			pigfenList: [{
				fnumber: 'FHZC0101',
				fname: '凤凰一分场',
				status: 1,
				showmenu: true,
				id: 1
			},{
				fnumber: 'FHZC0202',
				fname: '凤凰二分场',
				status: 2,
				showmenu: false,
				id: 2
			},{
				fnumber: 'FHZC0303',
				fname: '凤凰三分场',
				status: 1,
				showmenu: false,
				id: 3
			},{
				fnumber: 'FHZC0404',
				fname: '凤凰四分场',
				status: 2,
				showmenu: false,
				id: 4
			}]
		};
	},
	methods: {
		getNumber (index) {
			return index < 10 ? '0' + index : index
		},
		toggleMenu (index) {
			let b = this.pigfenList[index].showmenu
			this.$set(this.pigfenList[index], 'showmenu', !b)
			console.log(this.pigfenList[index])
		},
		edit (item) {
			uni.navigateTo({
				url: `/pages/pigfen/pigfenDetail/pigfenDetail?id=${item.id}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	}
}
</script>

<style lang="scss">
.page-wrapper{
	padding-top: 65px;
}
.pigfen_card_list{
	padding: 24rpx 30rpx;
	.pigfen_card_wrapper{
		&:first-child{
			margin-top: 0;
		}
		margin-top: 32rpx;
	}
	.pigfen_card{
		height: 200rpx;
		background-color: white;
		border-radius: 16rpx;
		box-shadow: 2rpx 4rpx 10rpx 2rpx #ccc;
		align-items: center;
		overflow: hidden;
		position: relative;
		z-index: 2;
		.seq{
			width: 120rpx;
			height: 100%;
			background: linear-gradient(#6BA8FD, #5975E8);
			color: white;
			font-size: 42rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
			&.disabled{
				background: #C9C9C9;
			}
		}
		.info{
			padding-left: 24rpx;
			.label{
				color: #4D4D4D;
			}
			.value{
				color: #757575;
			}
		}
		.more{
			padding-right: 24rpx;
			.icon_more{
				transition: all .3s ease-in;
			}
			&.rotate{
				.icon_more{
					transform: rotateZ(90deg);
				}
			}
		}
	}
	.pigfen_menu{
		height: 0;
		background-color: white;
		overflow: hidden;
		margin: 0 40rpx;
		text-align: center;
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
		box-shadow: 0 2rpx 2rpx rgba(0, 0, 0, .12), 0 0 2rpx rgba(0, 0, 0, .04);
		transition: all .2s;
		opacity: 0;
		&.show{
			height: 90rpx;
			opacity: 1;
		}
	}
}
.text-red{color: #F56767;}
.text-green{color: #42B25E;}
.text-primary{color: #3A75E7;}
</style>
