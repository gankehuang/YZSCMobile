<template>
	<view class="page-wrapper">
		<view class="status__bar">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				系谱
			</view>
			<view class="right__icon">
			</view>
		</view>
		
		<view class="family_wrapper">
			
			<view class="family_column">
				<view class="ball_item self">
					<view class="ball green">
						本猪
					</view>
					<text class="ball_text">
						{{familyInfo.cfboarnumber || ''}}
					</text>
				</view>
			</view>
			
			<view class="family_column">
				<view class="ball_item father" style="margin-bottom: 200%;">
					<view class="ball">
						父
					</view>
					<text class="ball_text">
						{{familyInfo.cfparentnumber || ''}}
					</text>
				</view>
				
				<view class="ball_item mather">
					<view class="ball red">
						母
					</view>
					<text class="ball_text">
						{{familyInfo.cfmothernumber || ''}}
					</text>
				</view>
			</view>
			
			<view class="family_column">
				<view class="ball_item father" style="margin-bottom: 10%;">
					<view class="ball">
						父父
					</view>
					<text class="ball_text">
						{{familyInfo.cfppnumber || ''}}
					</text>
				</view>
				
				<view class="ball_item mather" style="margin-bottom: 200%;">
					<view class="ball">
						父母
					</view>
					<text class="ball_text">
						{{familyInfo.cfpmnumber || ''}}
					</text>
				</view>
				
				<view class="ball_item father" style="margin-bottom: 10%;">
					<view class="ball red">
						母母
					</view>
					<text class="ball_text">
						{{familyInfo.cfmmnumber || ''}}
					</text>
				</view>
				
				
				<view class="ball_item mather">
					<view class="ball red">
						母父
					</view>
					<text class="ball_text">
						{{familyInfo.cfmpnumber || ''}}
					</text>
				</view>
				
			</view>
			
			<view class="family_column">
				<view class="ball_item father">
					<view class="ball">
						父父父
					</view>
					<text class="ball_text">
						{{familyInfo.cfpppnumber || ''}}
					</text>
				</view>
				
				<view class="ball_item mather">
					<view class="ball">
						父父母
					</view>
					<text class="ball_text">
						{{familyInfo.cfppmnumber || ''}}
					</text>
				</view>
				
				<view class="ball_item father">
					<view class="ball">
						父母父
					</view>
					<text class="ball_text">
						{{familyInfo.cfpmpnumber || ''}}
					</text>
				</view>
				
				
				<view class="ball_item mather">
					<view class="ball">
						父母母
					</view>
					<text class="ball_text">
						{{familyInfo.cfpmmnumber || ''}}
					</text>
				</view>
				
				<view class="ball_item father">
					<view class="ball red">
						母母母
					</view>
					<text class="ball_text">
						{{familyInfo.cfmmmnumber || ''}}
					</text>
				</view>
				
				
				<view class="ball_item mather">
					<view class="ball red">
						母母父
					</view>
					<text class="ball_text">
						{{familyInfo.cfmmpnumber || ''}}
					</text>
				</view>
				
				<view class="ball_item father">
					<view class="ball red">
						母父母
					</view>
					<text class="ball_text">
						{{familyInfo.cfmpmnumber || ''}}
					</text>
				</view>
				
				<view class="ball_item mather">
					<view class="ball red">
						母父父
					</view>
					<text class="ball_text">
						{{familyInfo.cfmppnumber || ''}}
					</text>
				</view>
				
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	import common from '../../../../utils/common.js';
	export default {
		data() {
			return {
				id: '',
				familyInfo: ''
			};
		},
		onLoad(option) {
			if (option.id) {
				this.id = decodeURIComponent(option.id);
			}
		},
		methods: {
			getData() {  //获取系谱图信息
				var _this = this;
				let params = {
					boarinfoid: _this.id, // 
				};
				let headers = {};
				common.commRequest(`/PigBoarInfo/selectXiputuByBoarInfoID`, params, headers, 'get',
					function(data) {
						//console.log(data);
						_this.familyInfo = data.data;
				})
			},
			back () {
				uni.navigateBack({
				})
			},
		}
	}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.family_wrapper{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
		min-height: calc(100vh - 65px)
	}
	.ball_item{
		width: 120rpx;
		word-break: break-all;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.father{
		border-left: 1px solid lightgray;
		border-top: 1px solid lightgray;
	}
	.mather{
		border-left: 1px solid lightgray;
		border-bottom: 1px solid lightgray;
	}
	.self{
		border-bottom: 1px solid lightgray;
		border-top: 1px solid lightgray;
	}
	.ball{
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		color: white;
		background-color: #70ADFF;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		&.green{
			background-color: #76D0A1;
		}
		&.red{
			background-color: #EFA6A6;
		}
	}
	.ball_text{
		font-size: 20rpx;
	}
</style>
