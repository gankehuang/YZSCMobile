<template>
	<view class="form-list">
		<view class="field">
			<slot name="title">
				{{title}}
			</slot>
			<text v-if="required">*</text>
		</view>
		<view class="cell-value">
			<slot name="value">
				<text>{{value}}</text>
			</slot>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'UniCell',
		data(){
			return{
				
			}
		},
		props:{
			title:{
				type:String,
				default:''
			},
			value:{},
			required:{
				type:[Boolean,String],
				default:false
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.form-list {
		font-size: 28rpx;
		margin-bottom:20rpx;
		.field {
			color:#4d4d4d;
			font-weight:bold;
			text {
				color: #FF6354;
				margin-left: 10rpx;
			}
		}
		.cell-value {
			text {
				color: #B2B2B2;
				vertical-align:middle;
			}
		}
		
	}
</style>
