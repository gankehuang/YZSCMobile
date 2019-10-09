<template>
	<view class="page-wrapper">
		<cust-header myTitle="猪场档案">
			<view slot="right">
				<image src="../../static/assets/scan.png" mode="" class="icon"></image>
				<image src="../../static/assets/search.png" mode="" class="icon"></image>
			</view>
		</cust-header>
		<scrollTab :navList="navList" v-model="currentNavIndex" :showExpend="true"></scrollTab>
		
		<view class="form_wrapper">
			
			<!-- 基本信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>基本信息</text>
				</view>
			</view>
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						猪场代码
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.fnumber" placeholder="请输入猪场代码"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						猪场名称
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.fname" placeholder="请输入猪场名称"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						财务组织
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.companyOrg || '请选择财务组织' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						猪场类型
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.pigfarmType || '请选择猪场类型' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						猪场级别
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.pigfarmLevel || '请选择猪场级别' }}
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
						肥猪规模
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.fatpigScope" placeholder="请输入肥猪规模"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						猪场库存组织
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.pigfarmOrg || '请选择猪场库存组织' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						总场库存组织
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.zcOrg || '请选择总场库存组织' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						场地性质
					</view>
					<view class="s-value">
						{{form.placeType || '请选择场地性质' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						经度
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.long" placeholder="请输入经度"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						纬度
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.lat" placeholder="请输入纬度"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						状态
					</view>
					<view class="s-value">
						启用
					</view>
				</view>
			</view>
			<!-- 基本信息END -->
			<!-- 行政信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>行政信息</text>
				</view>
			</view>
			
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						大区
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.largeArea || '请选择大区' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						片区
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.area || '请选择片区' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						分公司
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.smallArea || '请选择分公司' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						省份
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.prov || '请选择省份' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						城市
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.city || '请选择省份' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						区县
						<text>*</text>
					</view>
					<view class="s-value">
						{{form.Region || '请选择区县' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						所属销售牌价区域
						<text>*</text>
					</view>
					<view class="s-value d-num">
						<input type="text" value="" placeholder="请选择牌价区域"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						用地租赁年限
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.leaseLife" placeholder="请输入租赁年限">
					</view>
				</view>
			</view>
			<!-- 行政信息END -->
			<!-- 免疫信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>免疫信息</text>
				</view>
			</view>
			
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						蓝耳是否阳性
						<text>*</text>
					</view>
					<view class="s-value">
						<label class="radio"><checkbox value="form.lrIsYx" /></label>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						伪狂是否阳性
						<text>*</text>
					</view>
					<view class="s-value">
						<label class="radio"><checkbox value="form.wkisYx" /></label>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						是否有消毒点
						<text>*</text>
					</view>
					<view class="s-value">
						<label class="radio"><checkbox value="form.hasDisinPoint" /></label>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						是否有出猪台
						<text>*</text>
					</view>
					<view class="s-value">
						<label class="radio"><checkbox value="form.hasCzt" /></label>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						是否试情
						<text>*</text>
					</view>
					<view class="s-value">
						<label class="radio"><checkbox value="form.isSQ" /></label>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						备注
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.immDesc" placeholder="请输入备注"/>
					</view>
				</view>
			</view>
			<!-- 免疫信息END -->
			<!-- 联系人信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>联系人信息</text>
				</view>
			</view>
			
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						联系人
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.contacts" placeholder="请输入联系人"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						联系电话
					</view>
					<view class="s-value d-num">
						<input type="number" v-model="form.phone" placeholder="请输入联系电话"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						联系地址
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.contactAddress" placeholder="请输入联系地址"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						传真
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.contactAddress" placeholder="请输入传真"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						网址名称
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.contactAddress" placeholder="请输入网址名称"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						邮箱
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.contactAddress" placeholder="请输入邮箱"/>
					</view>
				</view>
			</view>
			<!-- 联系人信息END -->
			<!-- 场长任职信息 -->
			<view class="editor-title jus-j form-seat">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>场长任职信息</text>
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
			<!-- 场长任职信息END -->
			<!-- 生产信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>生产信息</text>
				</view>
			</view>
			
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						配种分娩率
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.bornPresent" placeholder="请输入配种分娩率"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						断奶天数
					</view>
					<view class="s-value d-num">
						<input type="number" v-model="form.phone" placeholder="请输入断奶天数"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						断配率
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.splitRate" placeholder="请输入断配率"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						仔猪生产个体档案
					</view>
					<view class="s-value">
						{{form.pigletFile || '请选择仔猪生产个体档案' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						母猪淘汰率
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.outPresent" placeholder="请输入母猪淘汰率"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						配空怀反情母猪率
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.contactAddress" placeholder="请输入母猪率"/>
					</view>
				</view>
			</view>
			<!-- 生产信息END -->
			<!-- 环保信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>环保信息</text>
				</view>
			</view>
			
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						环保处理工艺
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.epTechnology" placeholder="请输入环保处理工艺"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						厌氧处理
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.anoHandler" placeholder="请输入厌氧处理"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						生化处理
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.biochemistryHandler" placeholder="请输入生化处理"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						种植用地亩数
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.plantMu" placeholder="请输入种植用地亩数"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						用水量
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.waterUse" placeholder="请输入用水量"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						配空怀反情母猪率
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.contactAddress" placeholder="请输入母猪率"/>
					</view>
				</view>
			</view>
			<!-- 环保信息END -->
			<!-- 用电信息 --> 
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>用电信息</text>
				</view>
			</view>
			
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						电价
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.electricityPrice" placeholder="请输入电价"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						变压器个数
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.transformNum" placeholder="请输入变压器个数"/>
					</view>
				</view>
			</view>
			<!-- 用电信息END -->
			<!-- 用水信息 -->
			<view class="editor-title jus-j form-seat">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>用水信息</text>
				</view>
				<view class="confirm-btn">
					<button type="primary" class="flexc">新增行</button>
				</view>
			</view>
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						水井个数
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.electricityPrice" placeholder="请输入水井个数"/>
					</view>
				</view>
			</view>
			<view class="editor_wraper flexv flex" style="margin-top: 20rpx;">
				<view class="flex thead_row">
					<text class="flex2 jus-c ali-c">完工年</text>
					<text class="flex3 jus-c ali-c">验收出水量(吨/天)</text>
					<text class="flex3 jus-c ali-c">最大出水量(吨/天)</text>
					<text class="flex2 jus-c ali-c">现在出水量</text>
				</view>
				<view class="tbody_row flex">
					<view class="flex2 flex ali-c">
						<uni-icon type="minus-filled" color="#f00" size="18" />
						<input type="text" class="input_inner flex1" value="2019">
					</view>
					<view class="flex3">
						<input type="text" class="input_inner" value="张飞">
					</view>
					<view class="flex3">
						<input type="text" class="input_inner">
					</view>
					<view class="flex2">
						<input type="text" class="input_inner">
					</view>
				</view>
				<view class="tbody_row flex">
					<view class="flex2 flex ali-c">
						<uni-icon type="minus-filled" color="#f00" size="18" />
						<input type="text" class="input_inner flex1" value="2019">
					</view>
					<view class="flex3">
						<input type="text" class="input_inner" value="张飞">
					</view>
					<view class="flex3">
						<input type="text" class="input_inner">
					</view>
					<view class="flex2">
						<input type="text" class="input_inner">
					</view>
				</view>
			</view>
			
			<!-- 用水信息END -->
			
			<!-- 人员信息 -->
			<view class="editor-title flex ali-c">
				<view class="img">
					<image src="../../static/assets/rect.png" mode=""></image>
					<text>人员信息</text>
				</view>
			</view>
			<view class="card-form card">
				<view class="jus-j form-list" >
					<view class="field">
						定编总人数
					</view>
					<view class="s-value d-num">
						<input type="number" v-model="form.totalPersonNum" placeholder="请输入人数"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						生产人数
					</view>
					<view class="s-value d-num">
						<input type="number" v-model="form.workerNum" placeholder="请输入人数"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						财务人数
					</view>
					<view class="s-value d-num">
						<input type="text" v-model="form.finaNum" placeholder="请输入人数"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						八人间宿舍间数
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.eightRoomNum" placeholder="请输入数量"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						后勤人数
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.logisticsNum" placeholder="请输入人数"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						管理人员
					</view>
					<view class="s-value">
						{{form.manager || '请选择' }}
						<uni-icon type="forward" color="#B2B2B2" size="18" />
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						六人间宿舍间数
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.sixRoomNum" placeholder="请输入数量"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						四人间宿舍间数
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.fourRoomNum" placeholder="请输入数量"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						双人间宿舍间数
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.twoRoomNum" placeholder="请输入数量"/>
					</view>
				</view>
				<view class="jus-j form-list" >
					<view class="field">
						单间间数
					</view>
					<view class="s-value d-num">
						<input type="digit" v-model="form.singleRoomNum" placeholder="请输入数量"/>
					</view>
				</view>
			</view>
			<!-- 人员信息END -->
		</view>
		
		
		<view class="submits jus-b">
			<button type="primary" class="flexc editor-btn">编辑</button>
			<button type="primary" class="flexc submit-btn" >提交</button>
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
			editing: false,
			currentNavIndex: 0,
			navList: [
				{name: '基本信息'},
				{name: '行政信息'},
				{name: '免疫信息'},
				{name: '联系人信息'},
				{name: '厂长任职信息'},
				{name: '生产信息'},
				{name: '环保信息'},
				{name: '用电信息'},
				{name: '人员信息'},
			],
			form: {
				
			}
		};
	},
	methods: {
	}
}
</script>

<style lang="scss">
	.icon {
		margin-left: 12px;
		width: 13px;
		height: 13px;
	}
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
	.flex2{
		flex:2;
	}
	.flex3{
		flex:3;
	}
</style>
