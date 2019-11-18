<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				人
			</view>
			<view class="right__icon">
				<!-- <image src="/static/assets/search.png" mode="" class="icon"></image> -->
			</view> 
		</view>
		<view class="header-wrap">
			<view class="header-container">
				<view class="header-task" @tap.stop="toTask">
					<text class="task-title">预警任务</text>
					<view class="bottom">9</view>
				</view>
				<view class="header-record" @tap.stop="toRecord">
					<text class="record-title">任务记录</text>
					<view class="bottom record">查看</view>
				</view>
			</view>
		</view>
		<view class="radius_card_wrap" style="padding-top: 15px; padding-left: 15px;margin-bottom: 65px;">
				<view class="card_row"  style="height: 47px;">
					<view class="card_label" style="color: #4785F3;">入场申请</view>
				</view>
				<view class="card_row"  style="height: 47px;">
					<view class="card_label">
						人员状态
					</view>
					<view class="card_value" style="margin: 20px 0;">
						<radio-group @change="radioChange">
							<view style="display: block;">
								<view style="display: flex;">
									<label style="display: flex;" v-for="(item, index) in items" :key="item.value">
										<radio style="transform: scale(0.7);" :value="item.value" :checked="index === current" />{{item.name}}
									</label>
								
								</view>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="card_row"  style="height: 47px;">
					<view class="card_label">
						姓名
					</view>
					<view class="card_value">
						<input type="text" style="text-align: right;"  value="张三" />
					</view>
				</view>
				<view class="card_row" style="height: 47px;">
					<view class="card_label">
						入场时间
					</view>
					<view class="card_value">
						<picker @change="bindPickerChange" :value="index" :range="array2">
							<view class="picker">
								<view class="uni-input">{{array2[index]}}</view>
								<image src="../../../static/assets/arrow-b.png" class="icon-big" style="margin-left: 4px;"></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="card_row"  style="height: 47px;border: none;">
					<view class="card_label">入场事由</view>
				</view>
				<view class="">
					 <textarea style="box-sizing: border-box; background: #F9FAFB;width: 100%;font-size: 12px;padding: 11px;height:118px;border-radius: 12rpx;" placeholder="请输入入场事由"/>
				</view>
				<view class="card_row" style="margin: 16px 0;">
					<button type="primary" class="dianji" size="mini" style="">提交申请</button>
				</view>
			</view>
	
			<view class="radius_card_wrap details" >
				<view class="navBar">
					<view :class="{selected:flag==1}" class="complete" @click='flag=1'>预检</view>
					<view :class="{selected:flag==2}" class="complete" @click='flag=2'>采样</view>
					<view :class="{selected:flag==3}" class="not-complete" @click='flag=3'>化验</view>
					<view :class="{selected:flag==4}" class="complete" @click='flag=4'>清洗</view>
					<view :class="{selected:flag==5}" class="complete" @click='flag=5'>消毒</view>
					<view :class="{selected:flag==6}" class="complete last" @click='flag=6'>验收</view>
				</view>
				<view class="spread">
					<view>
						<view><image src="../../../static/assets/camera.png" class="camera" mode=""></image></view>
						<text>车厢</text>
					</view>
					<view>
						<view><image src="../../../static/assets/camera.png" class="camera" mode=""></image></view>
						<text>车厢</text>
					</view>
					<view>
						<view><image src="../../../static/assets/camera.png" class="camera" mode=""></image></view>
						<text>车厢</text>
					</view>
					<view class="btn">
						提交
					</view>
				</view>
				<view class="top" style="display: flex;align-items: center;">
					<view style="color: #fff;font-size: 16px;margin-left: 12px;">
						三级洗消
					</view>
				</view>
			</view>
			<view class="radius_card_wrap details" >
				<view class="navBar">
					<view class="complete">消毒、清洗</view>
					<view class="selected">烘干</view>
				</view>
				<view class="spread">
					<view>
						<view><image src="../../../static/assets/camera.png" class="camera" mode=""></image></view>
						<text>车厢</text>
					</view>
					<view>
						<view><image src="../../../static/assets/camera.png" class="camera" mode=""></image></view>
						<text>车厢</text>
					</view>
					<view>
						<view><image src="../../../static/assets/camera.png" class="camera" mode=""></image></view>
						<text>车厢</text>
					</view>
					<!-- <view class="btn">
						提交
					</view> -->
					<view class="btnparent">
						<view class="">
							驳回
						</view>
						<view class="" style="background: #4785F3;">
							提交
						</view>
					</view>
				</view>
				<view class="top" style="display: flex;align-items: center; background-color: #FFBF36;">
					<view style="color: #fff;font-size: 16px;margin-left: 12px;">
						二级洗消
					</view>
				</view>
			</view>
			
			
			
		</view>
		
	</view>
</template>

<script>
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import ztable from '@/components/z-table/z-table'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniLoadMore from '@/components/uni-load-more.vue';  //  加载更多
export default {
	components: {
		scrollTab,
		ztable,
		uniLoadMore,
		uniIcon
	},
	data() {
		return {
			flag:1,
			items: [{
					value: 'kb',
					name: '场内人员',
					checked: 'true'
				},
				{
					value: 'fq',
					name: '场外人员'
				}
			],
			array2: ['B超', 'A超'],
			index:0,
			id: '',
			currentNavIndex: 0,
			taskItem: [
				{
					'breedingBatches': '桑梓湖老场总场-20190601',
					'taskName': '10日龄仔猪断奶重预估与处理',
					'startTime': '2019/10/15',
					'endTime': '2019/10/15',
					'taskState': '未执行'
				}
			],
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
		}
	},
	//上拉加载数据
	onReachBottom() {
		this.loadMore()
	},
	methods: {
		radioChange(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index = e.target.value
		},
		toTask(){ // 跳转预警任务 
			uni.navigateTo({
				url: '/pages/batchTask/matchPregnant/warningTask'
			})
		},
		toRecord(){  //跳转任务记录
			uni.navigateTo({
				url: '/pages/batchTask/matchPregnant/taskRecord'
			})
		},
		toStartTask(item) {  //跳转开始任务
			uni.navigateTo({
				url: '/pages/batchTask/matchPregnant/startTask?item=' + encodeURIComponent(JSON.stringify(item))
			})
		},
		back () {
			uni.navigateBack({
			})
		}
	}
}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.icon-big {
		padding: 26rpx 0;
		width: 24rpx;
		height: 24rpx;
		line-height: 50rpx;
	}
	.datagrid-wrapper{
		padding: 20rpx 12rpx 0;
	}
	
	.header-wrap {
		background-color: #F5F5F5;
		.header-container{
			display: flex;
			flex-flow: row nowrap !important;
			padding-top: 30rpx !important;
		}
	}
	
	.header-task{
		border-right: 2px solid #2F68D7;
	}
	.header-task, .header-record{
		display: flex;
		width: 50%;
		display: inline;
		text-align: center;
		font-size: 14px;
		.task-title{
			color: #FFF080;
		}
		.record-title{
			color: #3CE6FF;
		}
		.bottom{
			border-radius: 50%;
			border: 3px solid #FFF080;
			width: 100rpx;
			height: 100rpx;
			margin: 10rpx auto;
			line-height: 100rpx;
			color: #FFF080;
			font-size: 35rpx;
		}
		.record{
			border: 3px solid #3CE6FF;
			color: #3CE6FF;
			font-size: 25rpx;
		}
	}
	.dianji{
		width:150px;
		height:36px;
		background:rgba(71,133,243,1);
		opacity:1;
		border-radius:35px;
	}
	
	.details{
		//margin: 30rpx 16rpx !important;
		padding: 0 !important;
		flex-flow: row !important;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 65px !important;
		
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		.navBar{
			width: 104px;
			>view{
				position: relative;
				display: flex;
				height: 152rpx;
				font-size: 32rpx;
				color: #888888;
				justify-content: center;
				align-items: center;
				// text-align: center;
				background: #F8F9FB;
				&::before {
					content: '';
					position: absolute;
					width: 46rpx;
					height: 46rpx;
					top: 50%;
					transform: translate(50%,-50%);
					right: 0;
					border-radius: 50%;
				}
			}
			.last {
				border-bottom-left-radius: 24rpx;
			}
			.complete {
				&::before {
					background-image: url(../../../static/assets/complete.png);
					background-size: contain;
				}
			}
			.not-complete {
				&::before {
					background-image: url(../../../static/assets/not-complete.png);
					background-size: contain;
				}
			}
			.selected{
				color: #4785F3;
				background: #fff;
				&::before {
					background-image: none;
					height: 12rpx;
					width: 12rpx;
					background-color: white;
					border: 10rpx solid #4785F3;
				}
			}
		}
		.spread{
			padding-top: 24px !important;
			padding-left: 25px !important;
			    padding-bottom: 75px;
			flex: 1;
			position: relative;
			// display: flex;
			// flex-flow: wrap;
			>view{
				text-align: center;
				margin-right: 20px;
				float: left;
				margin-bottom: 15px;
				view{
					width: 176rpx;
					height: 176rpx;
					background: rgba(244,244,244,1);
					
					display: flex;
					justify-content: center;
					align-items: center;
					.camera {
						width: 67rpx;
						height: 53rpx;
					}
				}
			}
			.btn{
				position: absolute;
				width:115px;
				height:36px;
				background:rgba(71,133,243,1);
				opacity:1;
				border-radius:35px;
				bottom: 10px;
				right: 10px;
				font-size: 16px;
				line-height: 36px;
				text-align: center;
				color: #fff;
			}
			.btnparent{
				position: absolute;
				bottom: 30px;
				display: flex;
				view{
					width:88px;
					height:36px;
					background:rgba(255,106,105,1);
					opacity:1;
					border-radius:35px;
					font-size: 14px;
					line-height: 36px;
					text-align: center;
					color: #fff;
					margin-right: 12px;
				}
				
			}
		}
		.top{
			position: absolute;
			height: 50px;
			background: #FF6A69;
			width: 100%;
			top: -50px;
			border-top-left-radius: 12px;
			border-top-right-radius: 12px;
		}
	}
	.picker {
		display: flex;
	}
</style>
