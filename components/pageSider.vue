<template>
	<view>
		<view class="pagination__wrapper">
			<view class="pagination__item" @tap="selectPage">选页</view>
			<view class="pagination__item" @tap="prev">
				<image class=" icon" src="/static/assets/prev.png"></image>
			</view>
			<view class="pagination__item slide__wrap">
				<slider class="page_slider" min="1" :value="page" @change="change" :max="pageNum" activeColor="#3A75E7" block-size="14" block-color="#3A75E7" @changing="changing" />
			</view>
			<view class="pagination__item" @tap="next">
				<image class="icon" src="/static/assets/next.png"></image>
			</view>
		</view>
		
		<view class="popup__pageNum" v-show="showNum">
			<text>{{ page }}/{{ pageNum }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentPage: { // 当前页
				type: Number,
				default: 1
			},
			pageNum: { // 总共多少页
				type: Number,
				required: true
			}
		},
		data() {
			return {
				showNum: false,
				page: 1,
				max: 0
			};
		},
		methods: {
			changing (ev) {
				this.page = ev.detail.value
				if(!this.showNum){
					this.showNum = true
				}
			},
			change (ev) {
				this.page = ev.detail.value
				this.showHint()
				this.$emit('pageChanged', ev.detail.value)
			},
			selectPage () { // 选页
				this.$emit('selectPage')
			},
			showHint () {
				this.showNum = true
				setTimeout(() => {
					this.showNum = false
				},300)
			},
			prev () {
				if (this.page === 1) {
					uni.showToast({
						title: '已经是第一页了',
						icon: 'none'
					});
					return
				}
				this.page = this.page - 1
				this.showHint()
				this.$emit('pageChanged', this.page)
			},
			next () {
				if (this.page === this.pageNum) {
					uni.showToast({
						title: '已经是最后一页了',
						icon: 'none'
					});
					return
				}
				this.page = this.page + 1
				this.showHint()
				this.$emit('pageChanged', this.page)
			}
		},
		watch: {
			currentPage (val) {
				if (this.page !== val) {
					this.page = val
				}
			}
		}
	}
</script>

<style lang="scss">
	.pagination__wrapper{
		height: 50px;
		display: flex;
		flex-flow: row nowrap;
		position: fixed;
		left:0;
		bottom: 0;
		background-color: white;
		align-items: center;
		box-shadow: 0 2px 5px 1px rgba(40, 120, 255, 0.08);
		width: 100%;
		font-size: 12px;
		font-family: PingFang SC;
		.pagination__item{
			padding: 0 15px;
			border-right: 1px solid #F5F5F5;
			color: #4d4d4d;
			height: 100%;
			line-height: 100%;
			display: flex;
			align-items: center;
			&:last-child{
				border: none;
			}
			&.slide__wrap{
				flex:1;
			}
			.page_slider{
				margin: 0;
				width: 100%;
			}
		}
		.icon{
			width: 24px;
			height: 24px;
		}
	}
	
	.popup__pageNum {
		position: fixed;
		padding: 20px 0;
		width: 100px;
		bottom: 150rpx;
		background: rgba(0,0,0,0.7);
		left: calc(50% - 50px);
		color: white;
		text-align: center;
	}
</style>
