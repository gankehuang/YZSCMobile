<template>
	<view class="z-table">
		<view class="z-table-main" :style="compluteHeight">
			<view v-if="!tableLoaded && !tableData" :class="['z-loading', {ztableLoading: tableShow}]">
				<view class="z-loading-animate"></view>
			</view>
			<view class="z-table-container">
				<view class="z-table-pack">
					<view class="z-table-title">
						<view class="check-box z-table-title-item" v-if="neddCheck"></view>
						<view class="z-table-title-item" :class="{ 'z-table-stick-side': stickSide && index == 0  , 'z-table-stick-side1':  stickSide1 && index == 1}"
						 :style="{ width: item.width ? item.width + 'rpx' : '200rpx' }" v-for="(item, index) in columns" :key="index"
						 @click="sort(item.key, index)">
							{{ item.title }}
							<view v-if="item.hasOwnProperty('key') && item.hasOwnProperty('sort') && tableData.length" class="sort">
								<view class="up-arrow" :class="{ action: nowSortKey == item.key && sortType == 'asc' }"></view>
								<view class="down-arrow" :class="{ action: nowSortKey == item.key && sortType == 'desc' }"></view>
							</view>
						</view>
					</view>
					<view v-if="tableData.length" class="z-table-container-row" @tap="rowClick(row)" :class="{ 'z-table-has-bottom': showBottomSum }"
					 v-for="(row, iIndex) in tableData" :key="iIndex">
						<view class="ali-c" v-if="neddCheck">
							<checkbox-group @change="checkboxChange">
								<label>
									<checkbox :value="row.id" :checked="row.checked" style="transform:scale(0.7)" />
								</label>
							</checkbox-group>
						</view>
						<view class="z-table-container-col" :class="{ 'z-table-stick-side': stickSide && jIndex == 0 , 'z-table-stick-side1':  stickSide1 && jIndex == 1 }"
						 :style="{ width: col.width ? col.width + 'rpx' : '200rpx' }" v-for="(col, jIndex) in columns" :key="jIndex">
							<view v-if="!col.isLink" v-html="getRowContent(row, col)"></view>
							<!-- #ifdef H5 -->
							<router-link v-else-if="setUrl(row, col).indexOf('http') != 0" :to="setUrl(row, col)" v-html="getRowContent(row, col)"></router-link>
							<a v-else-if="col.isLink" :href="setUrl(row, col)" v-html="getRowContent(row, col)"></a>
							<!-- #endif -->
							<!-- #ifndef H5 -->
							<navigator v-else-if="col.isLink" :url="setUrl(row, col)" v-html="getRowContent(row, col)"></navigator>
							<!-- #endif -->
						</view>
					</view>
					<view :class="['z-table-bottom', {'long-table': longTable}]" v-if="showBottomSum && tableData.length">
						<view class="z-table-bottom-col" :class="{ 'z-table-stick-side': stickSide && sumIndex == 0 , 'z-table-stick-side1':  stickSide1 && sumIndex == 1}"
						 :style="{ width: sumCol.width ? sumCol.width + 'rpx' : '200rpx' }" v-for="(sumCol, sumIndex) in columns" :key="sumIndex">
							<view class="z-table-bottom-text">
								<!-- <view v-if="sumIndex != 0" class="z-table-bottom-text-title">{{ sumCol.title }}</view> -->
								<text :class="{ sum: sumIndex == 0 }">{{ sumIndex == 0 ? '合计' : dosum(sumCol.key) }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tableData.length == 0" class="table-empty">
				<!-- image v-if="!showLoading" class="empty-img" src="../static/empty.png"></image -->
				<view v-html="showLoading ? '' : emptyText"></view>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	 * 表格使用
	 * 注意如果需要异步加载，需要把tableData初始值设为false，当没有数据的时候值为空数组
	 * props: tableData Array | 表格数据
	 * 		 columns Array | 数据映射表 每列params => title(表头文字), width(每列宽度) [, key(对应tableData的字段名) || format(自定义内容), sort(是否要排序), isLink(是否显示为超链接Object)]
	 * 										   format格式: {template: 字符串模版用#key#表示需要被替换的数据,names: 对应template属性内要被替换的内容的key}
	 * 										   isLink格式: {url: 链接地址, params: 地址带的参数Array[key|value, key|value, ...]每一项都是key和value以'|'链接,如果不带'|'默认键值同名}
	 * 		 stickSide Boolean | 是否固定右侧首栏 默认不显示
	 * 		 showBottomSum Boolean | 是否显示底部统计 默认不显示
	 * 		 showLoading Boolean | 是否首次加载首次加载不显示暂无数据内容
	 * 		 emptyText String | 空数据显示的文字内容
	 *		 tableHeight Number | 设置表格高度会滚动
	 *		 sort Boolean | 开启排序
	 *
	 * event: onSort | 排序事件 返回{key: 被排序列的字段名, type: 正序'asc'/倒序'desc'}
	 *
	 * function: resetSort | 调用后重置排序 *注意:不会触发sort事件
	 *
	 * */
	import Vue from 'vue';

	export default {
		data() {
			return {
				version: '1.0.6',
				nowSortKey: '',
				sortType: 'desc', // asc/desc 升序/降序
				longTable: true,
				lineHeight: uni.upx2px(64),
				tableLoaded: false,
				tableShow: true
			};
		},
		computed: {
			compluteHeight() {
				return this.tableHeight ? 'height: ' + uni.upx2px(this.tableHeight) + 'px' : '';
			}
		},
		props: {
			neddCheck: {
				type: Boolean,
				default: false
			},
			tableData: {
				type: [Array, Boolean],
				default () {
					return false;
				}
			},
			columns: {
				/*
				 *
				 * [{title: xxx, key: 当前列展示对象名, width: 列宽, render: function}]
				 *
				 * */
				type: Array,
				require: true
			},
			stickSide: {
				type: Boolean,
				default: false
			},stickSide1: {
				type: Boolean,
				default: false
			},
			showBottomSum: {
				type: Boolean,
				default: false
			},
			showLoading: {
				type: Boolean,
				default: true
			},
			emptyText: {
				type: String,
				default: '暂无数据'
			},
			tableHeight: {
				type: Number,
				default: 0
			}
		},
		mounted() {
			this.init();
		},
		watch: {
			columns() {
				this.init();
			},
			tableData() {
				this.init();
			}
		},
		methods: {
			checkboxChange(e) {
				this.$emit('checkbox', e);
			},
			rowClick(row) {
				this.$emit('rowTap', row)
			},
			async init() {
				let _this = this
				let container = await _this.getPageSize('.z-table-container'),
					pack = await _this.getPageSize('.z-table-pack')
				_this.timer && clearTimeout(_this.timer)
				if (container && pack) {
					_this.$nextTick(function() {
						if (_this.tableData && _this.tableData.length) {
							_this.tableShow = false
							_this.timer = setTimeout(function() {
								_this.tableLoaded = true
							}, 300)
						}
					})
					if (container.height != pack.height) {
						_this.longTable = true
					} else {
						_this.longTable = false
					}
				} else {
					_this.tableLoaded = false
					_this.$nextTick(function() {
						_this.tableShow = true
					})
				}
			},
			getPageSize(selecter) {
				// 获取元素信息
				let query = uni.createSelectorQuery().in(this),
					_this = this
				return new Promise((resolve, reject) => {
					query.select(selecter).boundingClientRect(res => {
						resolve(res)
					}).exec();
				})
			},
			dosum(key) {
				let sum = 0;
				this.tableData && this.tableData.map((item, index) => {
					if (!key && index != 0) {
						sum = '-';
					} else {
						let val = item[key] - 0;
						if (Number.isNaN(val)) {
							sum += 0;
						} else {
							sum += val;
						}
					}
				});
				// sum = sum == 0 ? "-" : sum
				return this.numTransform(sum);
			},
			getRowContent(row, col) {
				// 表格值处理函数
				// 如果columns带了key则显示对应的key
				// 如果columns带的format则按规定返回format后的html
				// format规定: params names <Array> 对应tableData的键名,作为匹配template中两个#之间动态内容的名字
				//			   params template <String> html字符串模版
				let tempHTML = '';
				let rowKey = row[col.key];
				if (rowKey == 'null') {
					rowKey = '-';
				}
				if (rowKey || rowKey === 0) {
					tempHTML = isNaN(rowKey - 0) ? rowKey : rowKey-0; //this.numTransform(rowKey - 0);
					// tempHTML = tempHTML == 0 ? "-" : tempHTML
				} else if (!!col.format) {
					let tempFormat = col.format.template;
					col.format.names.map(item => {
						let regexp = new RegExp(`\#${item}\#`, 'mg');
						tempFormat = tempFormat.replace(regexp, row[item]);
					});
					tempHTML = tempFormat;
				} else {
					let error = new Error('数据的key或format值至少一个不为空');
					throw error;
				}
				// console.log(tempHTML)
				return tempHTML + '';
			},
			sort(key, index) {
				if (!key || !this.columns[index].sort) {
					return;
				}
				// 排序功能: 如果点击的排序按钮是原先的 那么更改排序类型
				//			如果点击的另一个排序按钮 那么选择当前排序并且排序类型改为降序(desc)
				if (key != this.nowSortKey) {
					this.nowSortKey = key;
					this.sortType = 'desc';
				} else {
					this.toggleSort();
				}
				this.$emit('onSort', {
					key: this.nowSortKey,
					type: this.sortType
				});
			},
			toggleSort() {
				this.sortType = this.sortType == 'asc' ? 'desc' : 'asc';
			},
			numTransform(n) {
				if (Math.abs(n) >= 100000000) {
					n = Number((n / 100000000).toFixed(1)) + '亿';
				} else if (Math.abs(n) >= 10000) {
					n = Number((n / 10000).toFixed(1)) + '万';
				}
				return n.toString();
			},
			resetSort() {
				// 重置排序状态
				this.nowSortKey = '';
				this.sortType = 'desc';
			},
			setUrl(row, col) {
				if (!col.isLink) {
					return;
				}
				let urlParam = {};
				let {
					isLink: {
						url,
						params = []
					}
				} = col;
				params.forEach(item => {
					if (~item.indexOf('|')) {
						let temp = item.split('|');
						urlParam[temp[0]] = row[temp[1]];
					} else {
						urlParam[item] = row[item];
					}
				});
				url = this.setUrlParams(url, urlParam);
				return url;
			},
			setUrlParams(url, params) {
				let tempUrl = url,
					keyArr = Object.keys(params);
				keyArr.forEach(item => {
					tempUrl += `&${item}=${params[item]}`;
				});
				tempUrl = tempUrl.replace(/\&/, '?');
				return tempUrl;
			}
		}
	};
</script>

<style lang="scss">
	.navigator-hover {
		background: transparent;
		opacity: 1;
	}

	@mixin ellipsis($num: 1) {
		overflow: hidden;
		text-overflow: ellipsis;

		@if $num==1 {
			white-space: nowrap;
		}

		@else {
			display: -webkit-box;
			-webkit-line-clamp: $num;
			/* autoprefixer: off */
			-webkit-box-orient: vertical;
			/* autoprefixer: on */
		}
	}

	// 三角形
	%triangle-basic {
		content: '';
		height: 0;
		width: 0;
		overflow: hidden;
	}

	@mixin triangle($direction, $size, $borderColor) {
		@extend %triangle-basic;

		@if $direction==top {
			border-bottom: $size solid $borderColor;
			border-left: $size dashed transparent;
			border-right: $size dashed transparent;
			border-top: 0;
		}

		@else if $direction==right {
			border-left: $size solid $borderColor;
			border-top: $size dashed transparent;
			border-bottom: $size dashed transparent;
			border-right: 0;
		}

		@else if $direction==bottom {
			border-top: $size solid $borderColor;
			border-left: $size dashed transparent;
			border-right: $size dashed transparent;
			border-bottom: 0;
		}

		@else if $direction==left {
			border-right: $size solid $borderColor;
			border-top: $size dashed transparent;
			border-bottom: $size dashed transparent;
			border-left: 0;
		}
	}

	a {
		text-decoration: none;
	}

	.z-table {
		position: relative;
		display: inline-block;
		height: 100%;
		min-height: 130upx;
		width: 100%;
		background: #fff;
		font-size: $uni-font-size-sm;
		box-sizing: border-box;

		.z-table-main {
			height: 100%;
			box-sizing: border-box;
		}

		.z-table-container {
			height: 100%;
			overflow: scroll;
			box-sizing: border-box;
		}

		.z-table-pack {
			position: relative;
			min-height: 100%;
			width: fit-content;
		}

		.z-table-title {
			position: sticky;
			top: 0;
			height: 80upx;
			z-index: 1;

			.z-table-title-item {
				border-bottom: solid 1upx #dbdbdb;
				background: #f8f8f8;
				background-color: #70ADFF;
				color: white;
				justify-content: center
			}

			.z-table-stick-side1 {
				position: sticky;
				top: 0;
				left: 33px;
			}

			.z-table-stick-side {
				position: sticky;
				top: 0;
				left: 0;
				/* border-right: solid 1upx #dbdbdb;
			box-sizing: border-box; */
			}
		}

		.z-table-title,
		.z-table-container-row {
			display: flex;
			width: fit-content;
			white-space: nowrap;
			box-sizing: border-box;

			.z-table-title-item,
			.z-table-container-col {
				@include ellipsis();
				display: inline-flex;
				padding: 0 16upx;
				height: 80upx;
				align-items: center;
				line-height: 80upx;
				box-sizing: border-box;
				justify-content: center;
				font-family: PingFang SC;
			}
			.z-table-container-col{
				color: #4d4d4d;
			}

			&:nth-child(even) {
				background-color: #EDF3F9;
			}

			&:nth-child(odd) {
				background-color: white;
			}
		}

		.z-table-container-row {
			z-index: 0;
			border-bottom: solid 1upx #f4f4f4;
			box-sizing: border-box;
		}

		.z-table-stick-side1 {
			position: sticky;
			left: 33px;
		}

		.z-table-stick-side {
			position: sticky;
			left: 0;
			/* background: #f7f9ff;
		border-right: solid 1upx #dbdbdb;
		box-sizing: border-box; */
		}

		.z-table-bottom {
			position: absolute;
			bottom: 0;
			z-index: 9;
			display: flex;
			justify-items: center;
			width: fit-content;
			background: #4298f7 !important;
			color: #fff !important;
			white-space: nowrap;
			box-sizing: border-box;

			&.long-table {
				position: sticky;
			}
			.z-table-stick-side {
				background: #4298f7 !important;
				box-sizing: border-box;
			}

			.z-table-bottom-col {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				padding: 16upx;
				box-sizing: border-box;
			}

			.z-table-bottom-text {
				line-height: 100%;
				box-sizing: border-box;
			}

			.z-table-bottom-text-title {
				margin-bottom: 10upx;
				font-size: 22upx;
				color: #aad0ff;
				box-sizing: border-box;
			}

			.sum {
				margin-left: 14upx;
				font-size: 28upx;
				box-sizing: border-box;
			}
		}

		.table-empty {
			position: absolute;
			top: 64upx;
			height: 64upx;
			line-height: 64upx;
			width: 100%;
			text-align: center;
		}

		.sort {
			display: inline-block;
			padding: 5upx;
			vertical-align: text-bottom;

			.up-arrow {
				@include triangle(top, 10upx, #ccc);
				margin-bottom: 5upx;

				&.action {
					@include triangle(top, 10upx, #4298f7);
				}
			}

			.down-arrow {
				@include triangle(bottom, 10upx, #ccc);

				&.action {
					@include triangle(bottom, 10upx, #4298f7);
				}
			}
		}

		// 1.0.5
		.z-loading {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			background: #fff;
			opacity: 0;
			transition: all .3s;

			&.ztableLoading {
				opacity: 1;
			}

			.z-loading-animate {
				position: relative;
				display: inline-block;
				width: 30upx;
				height: 30upx;
				margin-right: 20upx;
				border-radius: 100%;
				border: solid 6upx #ccc;
				vertical-align: middle;
				animation: rotate 1s ease-in-out infinite;

				&::after {
					content: '';
					display: block;
					position: absolute;
					top: -10upx;
					z-index: 1;
					background: #fff;
					width: 20upx;
					height: 20upx;
					border-radius: 10upx;
				}
			}

			@keyframes rotate {
				from {
					transform: rotate(0deg);
				}

				to {
					transform: rotate(360deg);
				}
			}
		}
	}

	.check-box {
		width: 78upx;
	}
</style>
