<template>
	<view>
		<view class="main-container">
			<view class="editor-title">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>饲喂明细</text>
				</view>
			</view>
			<!-- 数据信息 -->
			<view class="data__wrapper">
				<ztable :tableData="tableData" :columns="columns" emptyText="-" @rowTap="rowTapHandler"></ztable>
			</view>

			<!-- 弹窗 -->
			<popup-layer ref="popupRef1" :direction="'left'">
				<scroll-view class="draw" scroll-y="true">
					<draw-cell title="业务日期" required="true">
						<view slot="value" class="jus-j">
							<view class="bg-gray jus-j" @click="selectDate">
								<text>{{ searchForm.businessStartTime }}</text>
								<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
							</view>
							<text>—</text>
							<view class="bg-gray jus-j" @click="selectDate">
								<text>{{ searchForm.businessEndTime }}</text>
								<image src="../../../static/assets/calendar.png" style="width: 26rpx;height: 25rpx;margin-left: 20rpx;"></image>
							</view>
						</view>
					</draw-cell>
					<draw-cell title="猪场" required="true">
						<view slot="value" class="bg-gray jus-j" @click="selectPeople">
							<text>{{ searchForm.immunePlan }}</text>
							<uni-icon type="arrowdown" color="#333333" size="18" />
						</view>
					</draw-cell>
					<draw-cell title="分场" required="true">
						<view slot="value" class="bg-gray jus-j" @click="selectPeople">
							<text>{{ searchForm.immuneProject }}</text>
							<uni-icon type="arrowdown" color="#333333" size="18" />
						</view>
					</draw-cell>
					<draw-cell title="配种批次" required="true">
						<view slot="value" class="bg-gray jus-j" @click="selectPeople">
							<text>{{ searchForm.vaccineName }}</text>
							<uni-icon type="arrowdown" color="#333333" size="18" />
						</view>
					</draw-cell>
					<draw-cell title="批次档案" required="true">
						<view slot="value" class="bg-gray jus-j" @click="selectPeople">
							<text>{{ searchForm.vaccineName }}</text>
							<uni-icon type="arrowdown" color="#333333" size="18" />
						</view>
					</draw-cell>
					<draw-cell title="饲料名称" required="true">
						<view slot="value" class="bg-gray jus-j" @click="selectPeople">
							<text>{{ searchForm.vaccineName }}</text>
							<uni-icon type="arrowdown" color="#333333" size="18" />
						</view>
					</draw-cell>
				</scroll-view>
				<view class="submits jus-b">
					<view class="flexc reset-btn" @click="reset">重置</view>
					<view class="flexc submit-btn" @click="find">确定</view>
				</view>
			</popup-layer>
			<mpvue-picker  :themeColor="themeColor" ref="mpvuePicker" mode="dateSelector" @onConfirm="onConfirmDate" @onCancelDate="onCancel"
			 ></mpvue-picker>
			 <mpvue-picker :themeColor="themeColor" ref="pigPicker" 
			 :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			  @onConfirm="onConfirmPig" :pickerValueArray="pickerValueArray"></mpvue-picker>
		</view>
	</view>
</template>

<script>
// 引入 加载更多
import uniLoadMore from '@/components/uni-load-more.vue'
// 引入 图标
import uniIcon from '@/components/uni-icon/uni-icon.vue'
// 引入 弹窗
import popupLayer from '@/components/popup/popup-layer.vue'
// 引入 抽屉单元格
import drawCell from '@/components/uni-cell/draw-cell.vue'
// 引入 下拉框
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
// 引入 表格
import ztable from '@/components/z-table/z-table.vue';
// 引入 时间转换
import {timeFormat} from '@/utils/dateUtils.js'

export default {
	components: {
		uniLoadMore,
		uniIcon,
		popupLayer,
		drawCell,
		mpvuePicker,
		ztable
	},
	data() {
		return {
			tableData: [
				{
					index: '01',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '02',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '03',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '04',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				},
				{
					index: '05',
					plan: '哺乳仔猪',
					vaccineName: '20190902-01',
					computerStart: '2019-01-05',
					performMan: '张三'
				}
			],
			columns: [
				{
					title: '序号',
					key: 'index',
					width: '100'
				},
				{
					title: '调整批次日龄',
					key: 'plan',
					width: '200'
				},
				{
					title: '原批次日龄',
					key: 'vaccineName',
					width: '200'
				},
				{
					title: '调整原因',
					key: 'computerStart',
					width: '200'
				}
			],
			showDrawer: false,
			deepLength: 1,
			pickerValueDefault: [0],
			themeColor: '#007AFF',
			pickerValueArray:[
				{'value':'1111','label':'三泉A区'},
				{'value':'1111','label':'三泉B区'},
				{'value':'1111','label':'三泉C区'},
				{'value':'1111','label':'三泉D区'},
				{'value':'1111','label':'三泉E区'}
			],
			searchForm: {
				batchRecord: '请选择',
				businessStartTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				businessEndTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				immunePlan: '请选择',
				immuneProject: '请选择',
				vaccineName: '请选择',
				recipientStartTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				recipientEndTime: timeFormat(new Date(), 'yyyy-MM-dd'),
				recyclingNum: '清选择',
				performMan: '请选择'
			}
		};
	},
	methods: {
		// 进入行数据明细
		rowTapHandler(row) {
			uni.navigateTo({
				url: `/pages/freed/freedApp/freedDetail`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		onNavigationBarButtonTap() {
			// 查询弹窗
			this.$refs.popupRef1.show();
			this.showDrawer = true;
		},
		selectDate(){
			this.$refs.mpvuePicker.show()
		},
		selectPeople(){ // 下拉菜单 
			this.$refs.pigPicker.show()
		},
		onConfirmPig(){},
		// 重置 
		reset(){
			this.searchForm.immunePlan='请选择'
			this.searchForm.immuneProject='请选择'
			this.searchForm.vaccineName='请选择'
			this.searchForm.recyclingNum=''
			
		},
		// 查询 
		find(){
			this.$refs.popupRef1.close() // 关闭弹窗  
		},
	}
};
</script>

<style lang="scss">
@import '../../../common/dataCollection.scss';

.main-container {
	background-color: #f5f5f5;
	padding: 0 30rpx 120rpx;
	//抽屉样式
	.draw {
		padding: 30rpx;
		width: 500rpx;
		height: calc(100% - 118rpx);
		.bg-gray {
			background: #f5f5f5;
			padding: 16rpx 20rpx;
			font-size: 12px;
			color: #4d4d4d;
		}
	}
	.submits {
		position: fixed;
		bottom: 0rpx;
		left: 0;
		width: 100%;
		.flexc {
			width: 50%;
			height: 86rpx;
			&.reset-btn {
				background-color: #ffffff;
				border-top: 2px solid #f5f5f5;
			}
			&.submit-btn {
				border-top: 2px solid #4684ea;
				background-color: #4684ea;
				color: #ffffff;
			}
		}
	}
	.submitData {
		margin-top: 32rpx;
		.cancel-btn {
			width: 316rpx;
			background-color: #f05e57;
			color: #ffffff;
		}
		.submit-btn {
			width: 316rpx;
			background-color: #4684ea;
			color: #ffffff;
		}
	}
}
</style>
