<template>
	<view class="page-wrapper">
		<cust-header myTitle="分场档案详情">
			<view slot="right">
			</view>
		</cust-header>
		<scrollTab :navList="navList" v-model="currentNavIndex" :showExpend="true"></scrollTab>
		
		<view class="form_wrapper">
			<!-- 基本信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>基本信息</text>
				</view>
			</view>
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						分场名称
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.fname" placeholder="请输入分场名称"/>
					</view>
				</view>
				
				<view class="jus-j form-list" >
					<view class="field">
						分场库存组织
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.stockOrg || '请选择组织' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						分场代码
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.code" placeholder="请输入分场代码"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						财务组织
					</view>
					<view class="s-value">
						{{form.companyOrg || '请选择财务组织' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						母猪规模
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.sowsScope" placeholder="请输入母猪规模"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						公猪规模
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.boarScope" placeholder="请输入公猪规模"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						分场场级别
					</view>
					<view class="s-value">
						{{form.pigfenLevel || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						分场类型
					</view>
					<view class="s-value">
						{{form.pigfenType || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						是否批次配种类型
						<text>*</text>
					</view>
					<view class="s-value">
						<label class="radio"><checkbox value="form.isBreedType" /></label>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						批次配种类型
					</view>
					<view class="s-value">
						{{form.breedingBatchType || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">批次配种类型</view>
					<view class="s-value">
						{{form.breedingBatchType || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">国际生产规则</view>
					<view class="s-value">
						{{form.breedingBatchType || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
			</view>
			<!-- 基本信息END -->
			<!--  仓库信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>基本信息</text>
				</view>
			</view>
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						饲料公司
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.feedCompany || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						饲料公司
					</view>
					<view class="s-value">
						{{form.feedCompany || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						对应饲料仓库
					</view>
					<view class="s-value">
						{{form.feedWarehouse || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						对应兽药仓库
					</view>
					<view class="s-value">
						{{form.drugWarehouse || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
			</view>
			<!--  仓库信息END -->
			<!-- 历任场长信息 -->
			<view class="editor-title jus-j form-seat">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>历任场长信息</text>
				</view>
				<view class="confirm-btn">
					<button type="primary" class="flexc">新增行</button>
				</view>
			</view>
			<view class="editor_wraper flexv flex">
				<view class="flex thead_row">
					<text class="flex1 jus-c ali-c">上任时间</text>
					<text class="flex1 jus-c ali-c">姓名</text>
					<text class="flex1 jus-c ali-c">备注</text>
				</view>
				<view class="tbody_row flex">
					<view class="flex1 flex ali-c">
						<uni-icon type="minus-filled" color="#f00" size="18" />
						<input type="text" class="input_inner flex1" value="2019/08/19">
					</view>
					<view class="flex1">
						<input type="text" class="input_inner" value="张飞">
					</view>
					<view class="flex1">
						<input type="text" class="input_inner">
					</view>
				</view>
				<view class="tbody_row flex">
					<view class="flex1 flex ali-c">
						<uni-icon type="minus-filled" color="#f00" size="18" />
						<input type="text" class="input_inner flex1" value="2019/08/19">
					</view>
					<view class="flex1">
						<input type="text" class="input_inner" value="张飞">
					</view>
					<view class="flex1">
						<input type="text" class="input_inner">
					</view>
				</view>
			</view>
			<!-- 历任场长信息END -->
			<!-- 分场指标 -->
			<view class="editor-title jus-j form-seat">
				<view class="img">
					<image src="/static/assets/rect.png" mode=""></image>
					<text>分场指标</text>
				</view>
				<view class="confirm-btn">
					<button type="primary" class="flexc">新增行</button>
				</view>
			</view>
			<view class="editor_wraper flexv flex">
				<view class="flex thead_row">
					<text class="flex1 jus-c ali-c">项目</text>
					<text class="flex1 jus-c ali-c">事业部标准</text>
					<text class="flex1 jus-c ali-c">本分场标准</text>
				</view>
				<view class="tbody_row flex">
					<view class="flex1 flex ali-c">
						<uni-icon type="minus-filled" color="#f00" size="18" />
						<input type="text" class="input_inner flex1 center" value="项目名称">
					</view>
					<view class="flex1">
						<input type="text" class="input_inner center" >
					</view>
					<view class="flex1">
						<input type="text" class="input_inner center">
					</view>
				</view>
				<view class="tbody_row flex">
					<view class="flex1 flex ali-c">
						<uni-icon type="minus-filled" color="#f00" size="18" />
						<input type="text" class="input_inner flex1 center" value="2019/08/19">
					</view>
					<view class="flex1">
						<input type="text" class="input_inner center" value="张飞">
					</view>
					<view class="flex1">
						<input type="text" class="input_inner center">
					</view>
				</view>
			</view>
			<!-- 历任场长信息END -->
			<view class="confirm-btn" style="margin-top: 24rpx;">
				<button type="primary">确定</button>
			</view>
		</view>
		
	</view>
</template>

<script>
import custHeader from '@/components/cust-header/cust-header.vue'
import scrollTab from  '@/components/scroll-tab/scroll-tab'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
	components: {
		custHeader,
		scrollTab,
		uniIcon
	},
	data() {
		return {
			id: '',
			currentNavIndex: 0,
			navList: [{
				name: '基本信息'
			},{
				name: '仓库信息'
			},{
				name: '历任分厂长信息'
			},{
				name: '分场指标'
			},{
				name: '事业部指标'
			}],
			form: {}
		};
	},
	onLoad(option) {
		this.id = option.id
	}
}
</script>

<style lang="scss">
.page-wrapper{
	padding-top: 65px;
}
.form_wrapper{
		padding: 0 30rpx;
}
.editor-title {
	height: 80upx;
	.img {
		line-height: 80upx;
		image {
			width: 12upx;
			height: 12upx;
			vertical-align:middle;
		}
	}
	text {
		margin-left: 14upx;
		line-height: 80upx;
		font-size: 32upx;
	}
	.confirm-btn {
		width: 140upx;
		height: 54upx;
		button {
			width: 140upx;
			height: 54upx;
			font-size: 24upx;
			padding: 0;
			background-color: #4684EA;
		}
	}
	&.form-seat {
		height: 120upx;
	}
}
.card-form {
	.form-list {
		height: 96upx;
		border-bottom: 1upx solid #EBEEF2;
		font-size: 28upx;
		.field {
			text {
				color: #FF6354;
				margin-left: 10upx;
			}
		}
		.s-value {
			color: #B2B2B2;
			vertical-align:middle;
			&.d-num {
				text-align: right;
				input{
					font-size: 14px;
				}
			}
		}
		
	}
}
.submits {
	margin-top: 90upx;
	margin-bottom: 40rpx;
	button {
		width:316upx;
		height:88upx;
		&.editor-btn {
			background-color: #F05E57;
		}
		&.submit-btn {
			background-color: #4684EA;
		}
	}
}
.editor_wraper{
	.thead_row{
		background-color: #70ADFF;
		color: white;
		height: 32px;
		font-size: 12px;
	}
	.tbody_row{
		background-color: #EDF3F9;
		height: 32px;
		padding: 0 6px;
		align-items: center;
		color: #4D4D4D;
		&:nth-child(even){
			background-color: white;
		}
		.input_inner{
			border: 1px solid #E2E2E2;
			border-radius: 2px;
			margin: 0 2px;
			font-size: 12px;
			height: 46rpx;
			background-color: white;
			padding: 0 4px;
		}
	}
}
.center{
	text-align: center;
}
</style>
