<template xlang="wxml" minapp="mpvue">
	
	<view class="tki-tree" @touchmove.stop="">
		
		<view class="tki-tree-mask" :class="{'show':showTree}" @tap="_cancel"></view>
		<view class="tki-tree-cnt" :class="{'show':showTree}">
			<view class="tki-tree-bar">
				<view class="tki-tree-bar-cancel" :style="{'color':cancelColor}" hover-class="hover-c" @tap="_cancel">取消</view>
				<view class="tki-tree-bar-title" :style="{'color':titleColor}">{{title}}</view>
				<view class="tki-tree-bar-confirm" :style="{'color':confirmColor}" hover-class="hover-c" @tap="_confirm">确定</view>
			</view>
			<view class="tki-tree-view">
				<input type="text" @input="search" value="" placeholder="请输入搜索字符" style="border: 1px solid lightgray;text-align: left; border-radius: 10upx;padding: 10rpx" />
				<scroll-view class="tki-tree-view-sc" :scroll-y="true">
					<block v-for="(item, index) in treeList" :key="index">
						<view class="tki-tree-item" :style="[{
							paddingLeft: item.rank*15 + 'px',
							zIndex: item.rank*-1 +50
						}]" :class="{
							border: border === true,
							show: item.show,
							last: item.lastRank,
							showchild: item.showChild
						}">
							<view class="tki-tree-label" @tap.stop="_treeItemTap(item, index)">
								<image class="tki-tree-icon" :src="item.lastRank ? lastIcon : item.showChild ? currentIcon : defaultIcon"></image>
								{{item.name}}
							</view>
							<view class="tki-tree-check" @tap.stop="_treeItemSelect(item, index)" v-if="selectParent?true:item.lastRank">
								<view class="tki-tree-check-yes" v-if="item.checked" :class="{'radio':!multiple}" :style="{'border-color':confirmColor}">
									<view class="tki-tree-check-yes-b" :style="{'background-color':confirmColor}"></view>
								</view>
								<view class="tki-tree-check-no" v-else :class="{'radio':!multiple}" :style="{'border-color':confirmColor}"></view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	
export default {
	name: "tki-tree",
	props: {
		range: {
			type: Array,
			default: function () {
				return []
			}
		},
		rangeKey: {
			type: String,
			default: 'label'
		},
		title: {
			type: String,
			default: ''
		},
		multiple: { // 是否可以多选
			type: Boolean,
			default: false
			// default: true
		},
		selectParent: { //是否可以选父级
			type: Boolean,
			default: false
		},
		confirmColor: { // 确定按钮颜色
			type: String,
			default: '' // #07bb07
		},
		cancelColor: { // 取消按钮颜色
			type: String,
			default: '' // #757575
		},
		titleColor: { // 标题颜色
			type: String,
			default: '' // #757575
		},
		currentIcon: { // 展开时候的ic
			type: String,
			default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEQ0QTM0MzQ1Q0RBMTFFOUE0MjY4NzI1Njc1RjI1ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEQ0QTM0MzU1Q0RBMTFFOUE0MjY4NzI1Njc1RjI1ODIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRDRBMzQzMjVDREExMUU5QTQyNjg3MjU2NzVGMjU4MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRDRBMzQzMzVDREExMUU5QTQyNjg3MjU2NzVGMjU4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PidwepsAAAK0SURBVHja7JxbTsJAFIYHww7ciStgCeoGvGxAiOsgURegoL5720AXYLiIr0aJviq3Zx3PhIEnKG3ndtr+f3KixrSUj/ZjzjClIqUUiFm2gAAQAREQEUAEREAERAQQAREQAREBREAEREBEEqa67h9RFDWllDv0awWYlqlQHmu1WjMRRMoV1QFttA12y3xRtdNczq8EsE4/f8FumX2q77ROvNXk8UGMEKdUz6tYJHljaZAbuyUH+UR1to5BEohTuqwPCeS4pAA/qY6o/kyHOAMCeRK3owJnj+rH1jjxhqpVsstaebCz6TmnHWyXyY+xHjSBWBY/bvSgadtXBj9u9KCN3rnIfkzkQVsTEEX0Y2IP2oKo/HhMICcFAThUcwVZNGU6FdbX/XURzkbVF4+ybGhjPrFdgP66QdXNurGtSdk6Xdb9nAJ8oDo3OQlsQZzkdPw41ONBo6vI5scDefRjZg+6gpg3Pxp50CXEvPjR2IOuIXL3oxUPuobI3Y9WPOgDIlc/WvOgL4iL/vqFCcD7LH0xB4hj7cfQ/fWH9qCT+FhG0tN+DBk1PzjOM0SVllixcsBT1AvYc/kAPhc0hRg/3uvxoCgKRN9+dOrBUBB9+9GpB0NC9OVH5x4MDdG1H714kANEV3705kEOEBf9dcPi/lQnsuvLg1wgSu3Ha0v7Uh4MMgUXeuG71H407a+VBy9CPQkOdw+MtB+nGbd/D+FBbhBNxo9SjwcngJjNj0E9yBFiFj8G9SBXiGn8GNyDnCEm8SMLD3KHGOdHNh7kDjHOj2w8mAeIi/5arX+c6b/fxHz9oADEdGdjR/fXCw/OOB5oVfCOgnepz8IB14PMw03jCmTE+QBx5z0gAmKSqK9OUF+hcAeIhu/QYr4Qie8rjW83hhMBERARQAREQAREBBABERCLnH8BBgA+TQI7U4t53AAAAABJRU5ErkJggg=='
		},
		defaultIcon: { // 折叠时候的ic
			type: String,
			default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAACE0lEQVR4Xu3c200DMRCF4XEltJAOkEugA+ggpUAHoQMqiFMCdEAJUMEiS4mEELlIO7bPOeN9i6K1rG/952myyea1WiCtXmEuYBPR4RBMxInoIOCwhOtJLKVszWyXc/5y2BvNEq6I+/3+kFK6M7OHnPM7jcLKjbZAvD/uaZtzflm5P4rbWyJWgDcze1LPuzVihfxUz7sH4ilJ2bx7Isrm3RtRMu8RiHJ5j0SUyXs0okTeCIj0eSMh0uaNhkiZNyIiXd7IiDR5oyNS5M2ACJ83EyJs3myIkHkzIsLlzYwIkzc7IkTeCojD81ZCHJa3GuKQvBURu+etjNgtb3XELnlHQGyedyTEZnlHQ2ySd0RE97wjI7rlHR3RJe+JeIrbLOecD6ePpZQ6W1kn2epo4MUrPOKyLN8ppYq1+y1VStncOjIdGnFZlo+U0uOtWOeOY2TE12Ouq//pEA7xXL7XfvcufR8K0Svfv6CREN3yDYfYIt9QiK3yjYTYLF95xB75SiP2ylcZsVu+cogj8pVCHJWvEuKwfOkREfKlRkTJlxkRJl86RMR8qRBR82VChM0XHpEhX2hElnyREWnyhUNkzBcKkTVfJETafIcjKuQ7FFEl35GIMvl2R1TMtyuiar49EWXzbY5oZpv/hibXTF2h3+s60FRKeT6+3TjMS3nrA3ZFRD8xrfY3ER1kJ+JEdBBwWGKeRAfEH1wS5WFZSDB/AAAAAElFTkSuQmCC'
		},
		lastIcon: { // 没有子集的ic
			type: String,
			default: ''
		},
		border: { // 是否有分割线
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			showTree: false,
			treeList: [],
			selectIndex: -1,
			testList: [
				{
					id: 1,
					name: '北京市',
					children: [{
						id: 11,
						name: '市辖区',
						children: [{
								id: 111,
								name: '西城区',
								children: [{
									id: 1111,
									name: '南河沿大街',
									children: [{
										id: 11111,
										name: '紫金宫饭店',
									}, ]
								}, ]
							},
							{
								id: 112,
								name: '东城区',
							},
							{
								id: 113,
								name: '朝阳区',
							},
							{
								id: 113,
								name: '丰台区',
							}
						]
					}, ]
				},
				{
					id: 2,
					name: '河北省',
					children: [{
							id: 21,
							name: '石家庄市',
						},
						{
							id: 22,
							name: '唐山市',
						},
						{
							id: 23,
							name: '秦皇岛市',
						},
					]
				},
				{
					id: 3,
					name: '山东省',
					children: [{
							id: 31,
							name: '济南市',
							children: [{
									id: 311,
									name: '历下区',
									children: [{
										id: 3131,
										name: '解放路街道办事处',
									}, ]
								},
								{
									id: 312,
									name: '槐荫区',
								},
								{
									id: 313,
									name: '天桥区',
								},
								{
									id: 314,
									name: '历城区',
								},
								{
									id: 315,
									name: '长清区',
								}
							]
						},
						{
							id: 32,
							name: '青岛市',
						},
						{
							id: 33,
							name: '临沂市',
							children: [{
									id: 331,
									name: '兰山区',
									children: [{
										id: 3331,
										name: '金雀山街道',
									}, ]
								},
								{
									id: 332,
									name: '河东区',
								},
								{
									id: 333,
									name: '罗庄区',
									children: [{
										id: 3331,
										name: '盛庄街道',
									}, ]
								}
							]
						},
						{
							id: 34,
							name: '日照市',
						},
						{
							id: 35,
							name: '淄博市',
						},
						{
							id: 36,
							name: '枣庄市',
						},
						{
							id: 37,
							name: '东营市',
						},
						{
							id: 38,
							name: '潍坊市',
						},
						{
							id: 39,
							name: '烟台市',
						},
						{
							id: 40,
							name: '济宁市',
						},
						{
							id: 41,
							name: '泰安市',
						},
						{
							id: 42,
							name: '威海市',
						},
						{
							id: 43,
							name: '滨州市',
						},
						{
							id: 44,
							name: '菏泽市',
						},
					]
				},
				{
					id: 4,
					name: '河南省',
				},
				{
					id: 5,
					name: '湖北省',
				},
				{
					id: 6,
					name: '湖南省',
				}
			]
		}
	},
	// onLoad() {
	// 	this._renderTreeList(this.testList);
	// },
	computed: {
	},
	methods: {
		search(e) {
			this.$emit('watchSearch', e.target.value)
		},
		_show() {
			this.showTree = true
		},
		_hide() {
			this.showTree = false
		},
		_cancel() {
			this._hide()
			this.$emit("cancel", '');
		},
		_confirm() {
			// 处理所选数据
			let rt = [], obj = {};
			this.treeList.forEach((v, i) => {
				if (this.treeList[i].checked) {
					obj = {}
					obj.parents = this.treeList[i].parents
					obj = Object.assign(obj, this.treeList[i].source)
					// 移除子元素
					delete obj.children
					rt.push(obj)
				}
			})
			this._hide()
			this.$emit("confirm", rt);
		},
		//扁平化树结构
		_renderTreeList(list = [], rank = 0, parentId = [], parents = []) {
			list.forEach(item => {
				this.treeList.push({
					id: item.id,
					name: item[this.rangeKey],
					source: item,
					parentId,  // 父级id数组
					parents,  // 父级id数组
					rank,  // 层级
					showChild: false,  //子级是否显示
					show: rank === 0,  // 自身是否显示
					checked: false,
				})
				if (Array.isArray(item.children) && item.children.length > 0) {
					// console.log(item)
					let parentid = [...parentId], parentArr = [...parents];
					delete parentArr.children
					parentid.push(item.id);
					parentArr.push({ id: item.id, [this.rangeKey]: item[this.rangeKey] })
					this._renderTreeList(item.children, rank + 1, parentid, parentArr);
				} else {
					this.treeList[this.treeList.length - 1].lastRank = true;
				}
			})
		},
		// 点击
		_treeItemTap(item, index) {
			if (item.lastRank === true) {
				//点击最后一级时触发事件
				this.treeList[index].checked = !this.treeList[index].checked
				this._fixMultiple(index)
				return;
			}
			let list = this.treeList;
			let id = item.id;
			item.showChild = !item.showChild;
			list.forEach((childItem, i) => {
				if (item.showChild === false) {
					//隐藏所有子级
					if (!childItem.parentId.includes(id)) {
						return;
					}
					if (childItem.lastRank !== true) {
						childItem.showChild = false;
					}
					childItem.show = false;
				} else {
					if (childItem.parentId[childItem.parentId.length - 1] === id) {
						childItem.show = true;
					}
				}
			})
			// console.log(this.treeList)
		},
		_treeItemSelect(item, index) {
			this.treeList[index].checked = !this.treeList[index].checked
			this._fixMultiple(index)
		},
		// 处理单选多选
		_fixMultiple(index) {
			if (!this.multiple) {
				// 如果是单选
				this.treeList.forEach((v, i) => {
					if (i != index) {
						this.treeList[i].checked = false
					}
				})
			}
		},
		// 重置数据
		_reTreeList() {
			this.treeList.forEach((v, i) => {
				this.treeList[i].checked = false
			})
		}
	},
	watch: {
		range(list) {
			this.treeList = [];
			this._renderTreeList(list);
			
		},
		multiple() {
			if (this.range.length) {
				this._reTreeList();
			}
		},
		selectParent() {
			if (this.range.length) {
				this._reTreeList();
			}
		},
	},
	
}
</script>

<style>
@import "style.css";
</style>
