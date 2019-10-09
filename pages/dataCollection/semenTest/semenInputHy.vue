<template>
	<view>
		<!-- 1这里是状态栏 -->
		<view class="status">
			<image class="status-bg" src="/static/assets/top_bg@2x.png" mode="widthFix"></image>
			<view class="status-header">
				<view class="back-icon" @click="handOnClickBack">
					<image class="icon" src="/static/assets/back.png"></image>
				</view>
				<view class="status-title">
					新增分娩记录
				</view>
			</view>
		</view>
		<view class="editor-title jus-j form-seat main-wrap">
			<view class="titleicon">
				<image src="/static/assets/rect.png" mode=""></image>
				<text>后裔个体明细</text>
			</view>
		</view>

		<!-- 列表 -->
		<view class="data__wrapper">
			<ztable :tableData="tableData1" :columns="columns1" :neddCheck="false" emptyText="-" :showBottomSum="false"></ztable>
		</view>
		<view class="submits jus-b">
			<button type="primary" class="flexc submit-btn">提交</button>
			<button type="primary" class="flexc add-btn">编辑</button>
		</view>
	</view>

</template>

<script>
	import ztable from '@/components/z-table/z-table'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: ['请选择配种时段', '美国', '巴西', '日本'],
				array1: ['张三', '美国', '巴西', '日本'],
				array2: ['请选择转入位置', '分娩舍1栋1单元', '分娩舍1栋2单元', '分娩舍1栋3单元', '分娩舍1栋4单元'],
				array3: ['请选择配种批次', 'PC-201365', 'PC-201565', 'PC-201355', 'PC-201360'],
				index: 0,
				date: currentDate,
				tableData1: [{
					id: '01',
					index: '01',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '02',
					index: '02',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '03',
					index: '03',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '04',
					index: '04',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '01',
					index: '01',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '02',
					index: '02',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '03',
					index: '03',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '04',
					index: '04',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}, {
					id: '01',
					index: '01',
					sowcard: 'DDZBBK31200', //仔猪国标号
					grade: '杜洛克', //品种
					boarcard: '公猪', //性别
					breeder: '1.2', //出生重
					date: '7' //左乳头
				}],
				columns1: [{
					title: "序号",
					key: "index",
					width: 70,
				}, {
					title: "仔猪国标号",
					key: "sowcard",
					width: 200,
				}, {
					title: "品种",
					key: "grade",
					width: 150,
				}, {
					title: "性别",
					key: "boarcard",
					width: 150,
				}, {
					title: "出生重",
					key: "breeder",
					width: 150,
				}, {
					title: "左乳头",
					key: "date",
					width: 200,
				}]
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		components: {
			ztable
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../common/dataCollection.scss";

	.status-header {
		padding-top: 26rpx;
	}

	.main-wrap {
		padding: 160rpx 23rpx 23rpx 23rpx;
	}
	.data__wrapper {
		padding: 0 0 0 20rpx;
	}
</style>
