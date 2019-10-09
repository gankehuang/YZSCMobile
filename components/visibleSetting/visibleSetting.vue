<template>
	<view class="setting_wrapper">
		<view class="setting_row" v-for="(item, index) in list" :key="index">
			<text class="setting_label">
				{{ item[keyForName] }}
			</text>
			<switch :checked="item[keyForEnable]" class="setting_switch"
				:disabled="item[keyForDisabled]" @change="enableChange($event,index)"/>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'visibleSetting',
		props: {
			list: {
				type: Array,
				required: true
			},
			keyForName: {
				type: String,
				default: 'name'
			},
			keyForEnable: {
				type: String,
				default: 'enable'
			},
			keyForDisabled: {
				type: String,
				default: 'disabled'
			}
		},
		data () {
			return {
				myList: []
			}
		},
		methods: {
			enableChange(event, index){
				this.$set(this.myList[index], this.keyForEnable, event.detail.value)
			},
			getSettingList () {
				return this.myList
			}
		},
		mounted () {
			this.myList = this.list
		},
		watch: {
			list(val) {
				this.myList = this.list
			}
		}
	}
</script>

<style lang="scss">
	.setting_wrapper{
		display: flex;
		flex-flow: column nowrap;
		padding: 0 12px;
		background-color: white;
		border-radius: 8rpx;
		box-shadow: 0 5rpx 4rpx 2rpx #ccc;
		.setting_row{
			display: flex;
			flex-flow: row nowrap;
			border-bottom: 1px solid #E7E8EB;
			justify-content: space-between;
			padding: 12px 0 12px;
			items-align: center;
			&:last-child{
				border: none;
			}
			.setting_label{
				color: #333333;
			}
			.setting_switch{
				height: 16px;
			}
		}
	}
	
</style>
