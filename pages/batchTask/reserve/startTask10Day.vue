<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back">
				<image class="icon" src="../../../static/assets/back.png" mode=""></image>
			</view>
			<view class="status__title">
				{{itemInfo.taskName}}
			</view>
			<view class="right__icon">
				<image src="/static/assets/search.png" mode="" class="icon"></image>
			</view> 
		</view>
		
		<view>
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">{{itemInfo.taskName}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">配种批次</view>
					<view class="card_value">{{itemInfo.breedingBatches}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">计划日期</view>
					<view class="card_value">{{itemInfo.startTime}}</view>
				</view>
				<view class="card_row">
					<view class="card_label">执行头数</view>
					<view>
						<input type="text" value="" placeholder="请输入头数" style="text-align: right;"/>
					</view>
				</view>
				<view class="card_row">
					<view class="card_label">执行人</view>
					<view class="card_value">
						<picker @change="bindPickerChange" :value="index" :range="array1">
							<view class="picker">
								<view style="padding: 0" class="uni-input">{{array1[index]}}<uni-icon type="arrowright" color="#B2B2B2" size="16"  /></view>
							</view>
						</picker>
					</view>
				</view>
				<view class="card_row">
					<view class="card_label">分厂</view>
					<view>
						<input type="text" value="" placeholder="请输入" style="text-align: right;"/>
					</view>
				</view>
				<view class="card_row">
					<view class="card_label">猪厂</view>
					<view>
						<input type="text" value="" placeholder="请输入" style="text-align: right;"/>
					</view>
				</view>
			</view>
			
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">评估明细</view>
				</view>
				<view class="card_row">
					<view class="card_label">7kg以上</view>
					<view>
						<input type="text" value="" placeholder="请输入" style="text-align: right;"/>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view class="row_title">占比</view>
						<view>自动带出%</view>
					</view>
				</view>
				<view class="card_row">
					<view class="card_label">5kg以下</view>
					<view>
						<input type="text" value="" placeholder="请输入" style="text-align: right;"/>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view class="row_title">占比</view>
						<view>自动带出%</view>
					</view>
				</view>
			</view>
			
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">解决措施</view>
				</view>
				<view class="card_row textareaBox">
					<view class="textarea"><textarea placeholder="请输入"/></view>
				</view>
			</view>
			
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">结果反馈</view>
				</view>
				<view class="card_row">
					<view class="card_label">7kg以上</view>
					<view>
						<input type="text" value="" placeholder="请输入" style="text-align: right;"/>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view class="row_title">占比</view>
						<view>自动带出%</view>
					</view>
				</view>
				<view class="card_row">
					<view class="card_label">5kg以下</view>
					<view>
						<input type="text" value="" placeholder="请输入" style="text-align: right;"/>
					</view>
				</view>
				<view class="cardList">
					<view class="card_row" >
						<view class="row_title">占比</view>
						<view>自动带出%</view>
					</view>
				</view>
			</view>
			
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">实际完成</view>
				</view>
				<view class="card_row textareaBox">
					<view class="textarea"><textarea placeholder="请输入"/></view>
				</view>
			</view>
			
			<view class="radius_card_wrap">
				<view class="card_row">
					<view class="card_label title">照片信息</view>
				</view>
				<view class="imgBox">
					<image @longpress="delPic(index)" v-for="(item, index) in imgArr" :src="item" :key="index" mode="" class="img" @tap="lookImg"></image>
					<image src="../../../static/assets/plus.png" mode="" class="img" @tap="uploadImg"></image>
				</view>
			</view>
			
			<view class="submits jus-b">
				<button type="primary" class="flexc submit-btn">提交</button>
			</view>
		</view>
		
		<!-- 删除提示框 -->
		<uni-popup :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="popview">
				<view class="out-text">确定要删除吗？</view>
				<view @click="togglePopup('')" class="out-btn1">取消</view>
				<view @click="del" class="out-btn2">确定</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import ztable from '@/components/z-table/z-table'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniPopup from '@/components/uni-popup/uni-popup'
export default {
	components: {
		scrollTab,
		ztable,
		uniIcon,
		uniPopup
	},
	data() {
		return {
			id: '',
			currentNavIndex: 0,
			navList: [{
				name: '逾期任务'
			},{
				name: '违规任务'
			}],
			itemInfo: '',  //父页面传递的参数
			array1: ['请选择', '江伟'],
			index: 0,
			imgArr: [],   //上传返回的照片路径数组
			type: '',  //删除框状态
			imgID: '',  //当前选择图片索引
		};
	},
	onLoad(option) {
		const item = JSON.parse(decodeURIComponent(option.item));
		//console.log(item);
		this.itemInfo = item
	},
	methods: {
		setUp(){ // 设置 
			uni.navigateTo({
				url: '/pages/matingBatch/matingSetting/matingSetting'
			})
		},
		//返回
		back () {
			uni.navigateBack({
			})
		},
		lookImg() {  //全屏预览图片
			uni.previewImage({
				urls: this.imgArr,
			});
		},
		//下拉框选择
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index = e.target.value
		},
		//选择照片
		uploadImg() {
			const _this = this;
			uni.chooseImage({
				count: 6, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function (res) {
					//console.log(res.tempFilePaths);
					_this.imgArr = res.tempFilePaths;
				}
			});
		},
		//长按图片触发
		delPic(index) {
			this.imgID = index;
			this.togglePopup('middle');
		},
		//控制确定弹窗显示隐藏
		togglePopup(type) {
			this.type = type;
		},
		//确定删除图片
		del() {
			let imgs = this.imgArr;
			imgs.splice(this.imgID, 1);
			this.imgArr = imgs;
			this.togglePopup('');
		}
		
	}
}
</script>

<style lang="scss">
	@import "@/common/baseInfo.scss";
	.icon-big {
		width: 24rpx;
		height: 24rpx;
	}
	
	.cardList{
		border-bottom: 1px solid #EBEEF2;
		.card_row{
			border: none;
			.row_title{
				font-weight:600;
			}
			
		}
	}
	
	.title{
		color: #4785F3 !important;
	}
	.imgBox{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 10rpx 0 30rpx 0;
		margin-top: 10rpx;
		.img{
			width: 22%;
			height: 150rpx;
			margin: 7rpx;
			border: 1px solid lightgray;
			border-radius: 10rpx;
		}
	}
	
	.textareaBox{
		display: flex;
		flex: 1;
		margin: 20rpx 0 20rpx 0;
		padding-bottom: 280upx;
		.textarea{
			display: flex;
			flex: 1;
			border: 1px solid #EBEEF2;
			margin-top: 250rpx;
			border-radius: 5rpx;
			padding: 15rpx;
		}
	}
	//提交按钮
	.submits {
	    margin-top: 40rpx;
	    margin-bottom: 40rpx;
	    button {
	        width: 320rpx;
	        height: 88rpx;
			font-size: 16px;
			font-family: PingFang SC;
	        &.add-btn {
	            background-color: #F05E57;
	        }
	        &.submit-btn {
	            background-color: #4684EA;
	        }
			&.other-btn {
				width: 260rpx;
				height: 76rpx;
	            background-color: #EAA346;
				margin-bottom: 134rpx;
	        }
			 &.save-btn{
				 width: 480rpx;
				  background-color: #4684EA;
			 }
	    }
	}
	
	/*提示框样式*/
	.popview {
		height: 150upx;
		padding-top: 33upx;
		display: block;
		float: clear;
		width: 530upx;
	}
	
	.out-text {
		font-size: 28upx;
		margin-bottom: 55upx;
		display: block;
		float: clear;
		text-align: center;
	
	}
	
	.out-btn1 {
		width: 50%;
		display: inline-block;
		color: rgb(179, 179, 179);
		text-align: center;
		// margin-left: 120upx;
		// margin-right: 184upx;
	
	}
	
	.out-btn2:active,
	.out-btn1:active {
		background: #EEEEEE;
	}
	
	.out-btn2 {
		display: inline-block;
		text-align: center;
		color: #FF4343;
		width: 50%;
	}
</style>
