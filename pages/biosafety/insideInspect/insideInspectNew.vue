<template>
	<view>
		<!-- 这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon flexc ali-c"  @tap="back">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					验收小组创建
				</view>
				<!-- <view class="more-icon flexc ali-c" @tap="showFilter">
					<image class="icon" src="/static/assets/more@2x.png"></image>
				</view> -->
			</view>
		</view>
	<!-- 免疫调整 -->
	<view class="health-container">
		<!-- 标题 -->
		<view class="editor-title flex ali-c">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>创建信息</text>
			</view>
		</view>
		<!-- 表单 -->
		<view class="card-form card">
			<!-- <uni-cell title="创建人" :value="form.name"></uni-cell> -->
			<!-- <uni-cell title="创建时间" :value="form.projectName"></uni-cell> -->
			<!-- <uni-cell title="单据状态" :value="form.projectName"></uni-cell> -->
			<uni-cell title="创建人" required="true">
				<view slot="value" class="input-style"><input v-model="getNumber" placeholder="张三" /></view>
			</uni-cell><uni-cell title="创建时间" required="true">
				<view slot="value" class="input-style"><input v-model="getNumber" placeholder="2019/04/05" /></view>
			</uni-cell><uni-cell title="单据状态" required="true">
				<view slot="value" class="input-style"><input v-model="getNumber" placeholder="审批中" /></view>
			</uni-cell><uni-cell title="猪场" required="true">
				<view slot="value" class="input-style"><input v-model="getNumber" placeholder="某某猪场" /></view>
			</uni-cell>
		</view>
		<!-- 标题 -->
		<view class="editor-title flex ali-c">
			<view class="img">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>成员列表</text>
			</view>
			<button type="primary" class="filter-btn" style="width: 100px;" @click="scancode1">成员新增</button>
		</view>
		<!-- 数据表格 -->
		<view class="data__wrapper"><ztable stickSide stickSide1 :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler" @checkbox="checkbox"></ztable></view>
		<!-- 按钮 -->
		<view class="submits jus-b"><button type="primary" class="flexc submit-btn" @click="jumpPage" data-key="详情" data-jumpurl="/pages/biosafety/insideInspect/insideInspectNewOn">提交</button></view>
	</view>
	<!-- // 弹窗 -->
	<uni-popup :show="type === 'middle'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
		<view class="popview" style="padding-top: 0;">
			<view class="main-wrap-contetnt-item-field field-nobottom">
				
				<view class="main-wrap-contetnt-item-field-name" style="text-align: center;color: #4D4D4D;">
					人员新增
				</view>
				<view class="main-wrap-contetnt-item-field-value" style="margin: 20px 0;">
					<uni-cell title="序号" required="true">
						<view slot="value" class="input-style"><input v-model="getNumber" style="text-align:right" placeholder="自动带入" /></view>
					</uni-cell>
					<uni-cell title="级别" required="true">
						<view slot="value" class="input-style"><input v-model="getNumber" style="text-align:right" placeholder="选择级别" /></view>
					</uni-cell>
					<uni-cell title="姓名" required="true">
						<view slot="value" class="input-style"><input v-model="getNumber" style="text-align:right" placeholder="选择人员" /></view>
					</uni-cell>
					<uni-cell title="岗位" required="true">
						<view slot="value" class="input-style"><input v-model="getNumber" style="text-align:right" placeholder="自动带入" /></view>
					</uni-cell>
				</view>
			</view>
			<view @click="togglePopup('')" class="out-btn1">取消</view>
			<view @click="togglePopup('')" class="out-btn2" style="color: #4684EA;">保存</view>
		</view>
	</uni-popup>
	</view>

</template>

<script>
	// 弹窗 
	import uniPopup from '@/components/uni-popup/uni-popup'
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import uniCell from '@/components/uni-cell/uni-cell.vue';
import ztable from '@/components/z-table/z-table.vue';
// 引入 选页
import pageSider from '@/components/pageSider.vue';
// 引入弹框组件
import popupLayer from '@/components/popup/popup-layer.vue';
export default {
	data() {
		return {
			form: {
				name: '一分场',
				projectName: '自动带出'
			},
			type: '',
			getNumber: '',
			dayNumber: '',
			tableData: [
				{
					name: '哺乳仔猪',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01 ',
					computerStart: '2019-01-05',
					performMan: '张三',
					status: '201'
				},
				{
					name: '哺乳仔猪',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01 ',
					computerStart: '2019-01-05',
					performMan: '张三',
					status: '大白'
				},
				{
					name: '哺乳仔猪',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01 ',
					computerStart: '2019-01-05',
					performMan: '张三',
					status: '大白'
				}
			],
			columns: [
				{
					title: '序号',
					key: 'name',
					width: '200'
				},
				{
					title: '级别',
					key: 'plan',
					width: '200'
				},
				{
					title: '姓名',
					key: 'vaccineName',
					width: '200'
				},
				{
					title: '岗位',
					key: 'computerStart',
					width: '200'
				}
			],
			pageInfo: {
				page: 1,
				pageSize: 50,
				total: 2000
			}
		};
	},
	components: {
		mpvuePicker,
		uniIcon,
		uniCell,
		ztable,
		pageSider,
		popupLayer,
		uniPopup
	},
	computed: {
		pageNum() {
			return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize);
		}
	},
	methods: {
		togglePopup(type) {
			this.type = type;
		},
		scancode1(){
				this.togglePopup('middle')
		},
		//选页
		selectPage() {
			this.$refs.popupRef.show();
		},
		selectPages(e) {
			console.log(e);
		},
		back () {
			uni.navigateBack({
			})
		}
	}
};
</script>

<style lang="scss">
	
	@import "../../../common/dataCollection.scss";
	.status-header {
		padding-top: 26rpx;
	}
	
.health-container {
	background-color: #f5f5f5;
	padding: 64px 30rpx 120rpx;
	.editor-title {
		height: 44rpx;
		.img {
			line-height: 44rpx;
			image {
				width: 12rpx;
				height: 12rpx;
				vertical-align: middle;
			}
		}
		text {
			margin-left: 14rpx;
			line-height: 44rpx;
			font-size: 32rpx;
		}
	}
	.card-form {
		margin-top: 0rpx;
		.input-style {
			color: #b2b2b2;
			text-align: right;
		}
		.input-style .uni-input-wrapper .uni-input-placeholder {
			color: #b2b2b2;
			text-align: right;
			font-size: 28rpx;
		}
	}
	.editor-title {
		height: 80rpx;
		.confirm-btn {
			width: 140rpx;
			height: 54rpx;
			button {
				width: 140rpx;
				height: 54rpx;
				font-size: 24rpx;
				padding: 0;
				background-color: #4684ea;
			}
		}
		.filter-btn {
			margin-right: 0;
			line-height: 60rpx;
			width: 150rpx;

			font-size: 28rpx;
			background-color: #4684ea;
			color: #ffffff;
		}
		&.form-seat {
			height: 120rpx;
		}
	}

	.submits {
	    margin-top: 40rpx;
	    margin-bottom: 40rpx;
		padding: 0 20px;
	    button {
	        width: 100%;
	        height: 88rpx;
			font-size: 16px;
			font-family: PingFang SC;
	        &.add-btn {
	            background-color: #F05E57;
	        }
	        &.submit-btn {
	            background-color: #4684EA;
				border-radius: 30px !important;
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
}
/*提示框样式*/
	.popview {
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
// .uni-checkbox .uni-checkbox-input {
// 	border-radius: 50% !important;
// }
</style>
