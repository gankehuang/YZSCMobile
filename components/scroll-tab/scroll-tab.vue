<template>
	<view style="position: sticky; top:65px; padding: 0 40rpx 0 20rpx; z-index: 1000;" :style="{'background-color': bgColor}">
		<view style="position: relative;" :style="{'color': textColor}">
			<scroll-view :scroll-into-view="scrollId" ref="scrollview" scroll-x class="nav__warp" :class="{'jc': navList.length <= 4}">
				<view class="nav__list" :class="{'expend': expend}">
					<view :style="{'width': width}" :class="{'active1': index == value}" v-for="(item,index) in navList"
					 :key="index" class="nav__item" :id="'tab_'+randomStr+'_'+index" @tap="navTap($event,index)">
						<text class="nav__item__text" :style="{'color': index == value ? activeTextColor : textColor}">{{ item.name }}</text>
						<view class="nav__item__line" :style="{'background-color': activeTextColor}"></view>
					</view>
				</view>
			</scroll-view>
			<image src="/static/assets/arrow-b.png" v-show="showExpend" class="expend_icon" :class="{'expend': expend}" @tap="exHandler"></image>
		</view>
	</view>
</template>

<script>
export default {
	name: 'scroll-tab',
	props: {
		navList: {
			require: true,
			type: Array
		},
		value: {
			require: true,
			type: Number,
			default: 0
		},
		bgColor: { //背景颜色
			type: String,
			default: 'white'
		},
		textColor: { // 文字颜色
			type: String,
			default: '#B6BCC9'
		},
		activeTextColor: { // 选中文本颜色及选中条的颜色
			type: String,
			default: '#3A75E7'
		},
		showExpend: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: 'auto'
		}
	},
	data() {
		return {
			expend: false,
			randomStr: '',
			scrollId: '',
			prevScrollId: ''
		}
	},
	methods: {
		navTap (event,index) {
			 //console.log(event)
			 //console.log(this.$refs.scrollview)
			this.scrollId = null
			this.prevScrollId = event.currentTarget.id // 记录之前的位置
			if(this.expend){
				console.log(11111)
				this.expend = false
				setTimeout(() => {
					this.scrollId = event.currentTarget.id
				}, 10)
			}
			if (this.value !== index) {
				this.$emit('input', index)
			}
		},
		setRandomStr () {
			let words = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
			let str = ''
			for (let i = 0; i < 8; i++) {
				str += words.charAt(Math.random() * words.length)
			}
			this.randomStr = str
		},
		exHandler() {
			if (this.expend) {
				this.expend = false
				this.scrollId = '' // 先清空
				setTimeout(() => {
					this.scrollId = this.prevScrollId
				}, 10)
			} else {
				this.expend = !this.expend
			}
		}
	},
	mounted () {
		this.setRandomStr()
	}
}
</script>

<style lang="scss">
	.nav__warp{
		box-sizing: border-box;
		overflow-x: scroll;
		display: -webkit-flex;
	}
	
	.jc{
		justify-content: center;
	}
	
	.nav__list{
		display: flex;
		width: fit-content;
		box-sizing: border-box;
		justify-content: center;
		&.expend{
			flex-wrap: wrap;
		}
	}
	.nav__item{
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		font-size: 14px;
		margin: 0 30rpx;
		width: fit-content;
		white-space: nowrap;
		&.active1{
			.nav__item__text{
				color: #3A75E7;
			}
			.nav__item__line{
				width: 98rpx;
			}
		}
		.nav__item__text{
			margin: 14rpx 0;
			transition: all .1s;
		}
		.nav__item__line{
			height: 6rpx;
			width: 0;
			border-radius: 2px;
			transition: all .6s;
		}
	}
	.expend_icon{
		position: absolute;
		width: 16px;
		height: 16px;
		top: 25rpx;
		right: -28rpx;
		z-index: 22;
		transition: all .3s;
		&.expend{
			transform: rotateZ(180deg);
		}
	}
</style>
