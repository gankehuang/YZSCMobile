<template>
	<view class="page-wrapper">
		<view class="status__bar" style="background: #3A75E7;">
			<view class="back__icon" @tap="back"><image class="icon" src="../../../../static/assets/back.png" mode=""></image></view>
			<view class="status__title">配种批次详情</view>
			<!-- <view class="right__icon" @click='setUp'>
				<image src="../../../static/assets/setting.png" mode="" class="icon"></image>
			</view> -->
		</view>
		<view class="header-wrap">
			<view class="header-container" style="font-size: 14px;">
				<view class="header-row">
					<text>配种批次号：{{ baseInfo.breedBatchNum }}</text>
				</view>
				<view class="header-row">
					<text>分场：{{ baseInfo.fieldName }}</text>
				</view>
				
				<uni-collapse>
				    <uni-collapse-item title="" :show-animation="true">
				        <!-- <view style="padding: 30upx 0;"> 折叠内容主体，可自定义内容及样式 </view> -->
						<view class="header-row">
							<text>批次状态：{{ baseInfo.batchStatus }}</text>
							<text>启用状态：{{ baseInfo.enableStatus }}</text>
						</view>
						<view class="header-row">
							<text>批次配种类型：{{ baseInfo.batchBreedType }}</text>
						</view>
						<view class="header-row">
							<text>平均配种时间：{{ baseInfo.avgBreedTime }}</text>
							<text>平均分娩时间：{{ baseInfo.avgBirthTime }}</text>
						</view>
						<view class="header-row">
							<text>平均预产期：{{ baseInfo.avgExpectedDate }}</text>
						</view>
						<view class="header-row">
							<text>配种开始时间：{{ baseInfo.breedStartTime }}</text>
							<text>配种结束时间：{{ baseInfo.breedEndTime }}</text>
						</view>
						<view class="header-row">
							<text>分娩开始时间：{{ baseInfo.birthStartTime }}</text>
							<text>分娩结束时间：{{ baseInfo.birthEndTime }}</text>
						</view>
						<view class="header-row">
							<text>批次建立日期：{{ baseInfo.batchSetDate }}</text>
						</view>
				    </uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		<scrollTab :navList="navList" v-model="currentNavIndex" :showExpend="true"></scrollTab>
		<!-- 列表 -->
		<view class="radius_card_wrap" v-show="currentNavIndex == 0">
			<view class="card_row">
				<view class="card_label">总头数</view>
				<view class="card_value">{{ baseInfo.totalNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">当前存栏</view>
				<view class="card_value">{{ baseInfo.curSavingNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">调入数</view>
				<view class="card_value">{{ baseInfo.turnInNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">调出数</view>
				<view class="card_value">{{ baseInfo.turnOutNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">已配数</view>
				<view class="card_value">{{ baseInfo.breededNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">配后备数</view>
				<view class="card_value">{{ baseInfo.reserveNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">分娩数</view>
				<view class="card_value">{{ baseInfo.birthNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">空怀数</view>
				<view class="card_value">{{ baseInfo.emptyNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">返情数</view>
				<view class="card_value">{{ baseInfo.returnNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">流产数</view>
				<view class="card_value">{{ baseInfo.abortionNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">胎均断奶间隔</view>
				<view class="card_value">{{ baseInfo.avgWeanNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">配种分娩率</view>
				<view class="card_value">{{ baseInfo.breedBirthRate }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">本批次配种数</view>
				<view class="card_value">{{ baseInfo.batchBreedNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">断奶母猪数</view>
				<view class="card_value">{{ baseInfo.weanSowNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">断奶仔猪头数</view>
				<view class="card_value">{{ baseInfo.weanChildNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">淘汰数</view>
				<view class="card_value">{{ baseInfo.eliminationNum }}</view>
			</view>
			<view class="card_row">
				<view class="card_label">死亡数</view>
				<view class="card_value">{{ baseInfo.deathNum }}</view>
			</view>
		</view>
		<!-- 表格 -->
		<!-- 存栏信息 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 1">
			<ztable :tableData="savingInfo" :columns="savingInfoColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<!-- 配种记录 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 2">
			<ztable :tableData="breedRecord" :columns="breedRecordColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<!-- 当前存栏 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 3">
			<ztable :tableData="curSaving" :columns="curSavingColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<!-- 异常妊娠 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 4">
			<ztable :tableData="abnormalPregnancy" :columns="abnormalPregnancyColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<!-- 分娩记录 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 5">
			<ztable :tableData="birthRecord" :columns="birthRecordColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<!-- 断奶记录 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 6">
			<ztable :tableData="weaningRecord" :columns="weaningRecordColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<!-- 死亡记录 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 7">
			<ztable :tableData="deathRecord" :columns="deathRecordColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<!-- 转入记录 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 8">
			<ztable :tableData="transInRecord" :columns="transInRecordColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<!-- 转出记录 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 9">
			<ztable :tableData="transOutRecord" :columns="transOutRecordColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
		<!-- 淘汰申请 -->
		<view class="datagrid-wrapper" v-show="currentNavIndex == 10">
			<ztable :tableData="eliminateApply" :columns="eliminateApplyColumn"></ztable>
			<!-- 加载  -->
			<view class="uni-tab-bar-loading" @click="loadMore()">
				<uni-load-more :status="status" :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse-breedBatch';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item-breedBatch';
import scrollTab from '@/components/scroll-tab/scroll-tab';
import ztable from '@/components/z-table/z-table';
import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
import common from '../../../../utils/common.js';
//引入时间转换
import { timeFormat } from '@/utils/dateUtils.js';
export default {
	components: {
		scrollTab,
		ztable,
		uniCollapse,
		uniCollapseItem,
		uniLoadMore
	},
	data() {
		return {
			id: '',
			pageNum:1,
			pageSize:10,
			//导航栏
			currentNavIndex: 0,
			//加载更多状态
			status: 'more',
			loadingType: 0,
			loadingText: {
				contentdown: '查看更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			navList: [
				{
					name: '基本信息'
				},
				{
					name: '存栏信息'
				},
				{
					name: '配种记录'
				},
				{
					name: '当前存栏'
				},
				{
					name: '异常妊娠'
				},
				{
					name: '分娩记录'
				},
				{
					name: '断奶记录'
				},
				{
					name: '死亡记录'
				},
				{
					name: '转入记录'
				},
				{
					name: '转出记录'
				},
				{
					name: '淘汰申请'
				}
			],

			//头部信息及基本信息
			baseInfo: {
				//头部信息
				breedBatchNum: '',//配种批次号
				fieldName: '',//分场
				
				batchStatus: '',//批次状态
				enableStatus: '',//启用状态
				batchBreedType: '',//批次配种类型
				avgBreedTime: '',//平均配种时间
				avgBirthTime: '',//平均分娩时间
				avgExpectedDate: '',//平均预产期
				breedStartTime: '',//配种开始时间
				breedEndTime: '',//配种结束时间
				birthStartTime: '',//分娩开始时间
				birthEndTime: '',//分娩结束时间
				batchSetDate:'',//批次建立日期
				
				//基本信息
				totalNum: '',//总头数
				curSavingNum: '',//当前存栏
				turnInNum: '',//调入数
				turnOutNum: '',//调出数
				breededNum: '',//已配数
				reserveNum: '',//配后备数
				birthNum: '',//分娩数
				emptyNum: '',//空怀数
				returnNum: '',//返情数
				abortionNum: '',//流产数
				avgWeanNum: '',//胎均断奶间隔
				breedBirthRate: '',//配种分娩率
				batchBreedNum: '',//本批次配种数
				weanSowNum: '',//断奶母猪数
				weanChildNum: '',//断奶仔猪头数
				eliminationNum: '',//淘汰数
				deathNum: ''//死亡数
			},
			
			// 存栏信息 ?
			savingInfoIndex: 1,
			savingInfoColumn: [
				{
					title: '业务日期',
					key: 'bizDate',
					width: 200
				},
				{
					title: '耳牌',
					key: 'earno',
					width: 220
				},
				{
					title: '配种次数',
					key: 'count',
					width: 120
				},
				{
					title: '总仔数',
					key: 'incnt',
					width: 160
				},
				{
					title: '活仔数',
					key: 'ilive',
					width: 160
				},
				{
					title: '窝重',
					key: 'faawt',
					width: 160
				},
				{
					title: '均重',
					key: 'avgWeight',
					width: 160
				},
				{
					title: '合格公猪',
					key: 'imale',
					width: 180
				},
				{
					title: '合格公猪',
					key: 'ifmal',
					width: 180
				},
				{
					title: '单据编号',
					key: 'fnumber',
					width: 200
				}
			],
			savingInfo: [
				{
					bizDate: '2019/09/08',
					earno: 'ZBSLS0002',
					count: 2,
					incnt: 10,
					ilive: 9,
					faawt: 12.5,
					avgWeight: 15.24,
					imale: 5,
					ifmal: 3,
					fnumber: 'ZZZRR0001'
				}
			],
			//配种记录 ?
			breedRecordIndex: 1,
			breedRecordColumn: [
				{
					title: '业务日期',
					key: 'bizdate',
					width: 200
				},
				{
					title: '总重量',
					key: 'weight',
					width: 200
				},
				{
					title: '总头数',
					key: 'incnt',
					width: 160
				},
				{
					title: '总金额',
					key: 'money',
					width: 160
				},
				{
					title: '引种类型',
					key: 'type',
					width: 160
				},
				{
					title: '单据编号',
					key: 'fnumber',
					width: 200
				},
				{
					title: '调出单位',
					key: 'outUnit',
					width: 200
				}
			],
			breedRecord: [
				{
					bizdate: '2019/05/12',
					weight: 2000,
					incnt: 100,
					money: 40000,
					type: '普通引种',
					fnumber: 'YZJL024024',
					outUnit: '大溪猪场'
				}
			],
			// 当前存栏
			curSavingIndex: 1,
			curSavingColumn: [
				{
					title: '序号',
					key: 'index',
					width: 200
				},
				{
					title: '母猪',
					key: 'sowNum',
					width: 160
				},
				{
					title: '母猪状态',
					key: 'sowStatus',
					width: 160
				},
				{
					title: '最新业务日期',
					key: 'lastBizDate',
					width: 160
				},
				{
					title: '最新业务',
					key: 'lastBusiness',
					width: 160
				}
			],
			curSaving: [],
			
			// 异常妊娠
			abnormalPregnancyIndex: 1,
			abnormalPregnancyColumn: [
				{
					title: '序号',
					key: 'index',
					width: 200
				},
				{
					title: '业务日期',
					key: 'bizDate',
					width: 160
				},
				{
					title: '头数',
					key: 'count',
					width: 160
				},
				{
					title: '空怀',
					key: 'emptyNum',
					width: 160
				},
				{
					title: '流产',
					key: 'abortionNum',
					width: 160
				},
				{
					title: '返情',
					key: 'returnNum',
					width: 200
				}
			],
			abnormalPregnancy: [],
			// 分娩记录
			birthRecordIndex: 1,
			birthRecordColumn: [
				{
					title: '序号',
					key: 'index',
					width: 200
				},
				{
					title: '业务日期',
					key: 'bizDate',
					width: 160
				},
				{
					title: '窝数',
					key: 'nestNum',
					width: 160
				},
				{
					title: '胎产总仔',
					key: 'totalChild',
					width: 160
				},
				{
					title: '胎产活仔',
					key: 'livingChild',
					width: 160
				},
				{
					title: '胎产无效仔',
					key: 'invalidChild',
					width: 200
				},
				{
					title: '产仔数',
					key: 'childCount',
					width: 200
				},{
					title: '产仔活数',
					key: 'livingChildCount',
					width: 200
				},{
					title: '木乃伊',
					key: 'mummyNum',
					width: 200
				},{
					title: '死胎',
					key: 'deathNum',
					width: 200
				},{
					title: '畸形数',
					key: 'malformationNum',
					width: 200
				}
			],
			birthRecord: [],
			// 断奶记录
			weaningRecordIndex: 1,
			weaningRecordColumn: [
				{
					title: '序号',
					key: 'index',
					width: 200
				},
				{
					title: '业务日期',
					key: 'bizdate',
					width: 200
				},
				{
					title: '窝数',
					key: 'nestNum',
					width: 200
				},
				{
					title: '断奶头数',
					key: 'weanNum',
					width: 200
				},
				{
					title: '窝断奶数',
					key: 'nestWeanNum',
					width: 200
				},
				{
					title: '窝均断奶窝重',
					key: 'nestAvgWeanWeight',
					width: 200
				},
				{
					title: '断奶均重',
					key: 'avgWeanWeight',
					width: 200
				},
				{
					title: '断奶日龄',
					key: 'weanDayAge',
					width: 200
				},
				{
					title: '断奶总窝重',
					key: 'weanTotalNestWeight',
					width: 200
				}
			],
			weaningRecord: [],
			// 死亡记录
			deathRecordIndex: 1,
			deathRecordColumn: [
				{
					title: '序号',
					key: 'index',
					width: 200
				},
				{
					title: '业务日期',
					key: 'bizdate',
					width: 200
				},
				{
					title: '耳牌号',
					key: 'earNum',
					width: 200
				},
				{
					title: '死亡原因',
					key: 'deathCause',
					width: 200
				},
				{
					title: '死亡时间',
					key: 'deathTime',
					width: 200
				},
				{
					title: '猪只状态',
					key: 'pigStatus',
					width: 200
				},
				{
					title: '日龄',
					key: 'dayAge',
					width: 200
				},
				{
					title: '数量',
					key: 'count',
					width: 240
				},
				{
					title: '总重量',
					key: 'totalWeight',
					width: 240
				},
				{
					title: '单据编号',
					key: 'fnumber',
					width: 240
				}
			],
			deathRecord: [],
			//转入记录
			transInRecordIndex: 1,
			transInRecordColumn: [
				{
					title: '序号',
					key: 'index',
					width: 200
				},
				{
					title: '耳牌号',
					key: 'earNum',
					width: 200
				},
				{
					title: '转入日期',
					key: 'turnIndate',
					width: 200
				},
				{
					title: '转入前配种批次',
					key: 'breedBatchBefore',
					width: 200
				},
				{
					title: '单据类型',
					key: 'receiptType',
					width: 200
				},
				{
					title: '单据编号',
					key: 'fnumber',
					width: 200
				}
			],
			transInRecord: [],
			// 转出记录
			transOutRecordIndex: 1,
			transOutRecordColumn: [
				{
					title: '序号',
					key: 'index',
					width: 200
				},
				{
					title: '耳牌号',
					key: 'earNum',
					width: 200
				},
				{
					title: '转出日期',
					key: 'turnOutdate',
					width: 200
				},
				{
					title: '单据类型',
					key: 'receiptType',
					width: 200
				},
				{
					title: '单据编号',
					key: 'fnumber',
					width: 200
				}
			],
			transOutRecord: [],
			// 淘汰申请
			eliminateApplyIndex: 1,
			eliminateApplyColumn: [
				{
					title: '序号',
					key: 'index',
					width: 200
				},
				{
					title: '耳牌号',
					key: 'earNum',
					width: 200
				},
				{
					title: '淘汰状态',
					key: 'eliminateStatus',
					width: 200
				},
				{
					title: '淘汰原因',
					key: 'eliminateReason',
					width: 200
				},
				{
					title: '猪只状态',
					key: 'pigStatus',
					width: 200
				},
				{
					title: '日龄',
					key: 'dayAge',
					width: 200
				},
				{
					title: '胎次',
					key: 'birthCount',
					width: 200
				},
				{
					title: '均重',
					key: 'avgWeight',
					width: 200
				},
				{
					title: '数量',
					key: 'count',
					width: 200
				}
			],
			eliminateApply: []
		};
	},
	watch:{
		currentNavIndex(old,newVal){
			this.loadingType = 1;
			console.log(old,newVal)
			this.pageNum = 1
			this.getindex(this.pageNum, this.pageSize) 
		}
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id;
		}
		this.loadingType = 1;
		// 获取头部信息及基本信息
		this.getBaseInfo();
		this.getindex();
	},
	methods: {
		// 获取头部信息及基本信息
		getBaseInfo() {
			console.log('开始获取头部信息及基本信息')
			var _this = this;
			let headers = {};
			headers['content-type'] = 'application/json';
			let params = {
				breedbatchid: 'Va4AAAewU7z8qPq9'//_this.id
			};

			common.commRequest('/PigBreedingBatch/selectPigBreedingBatchByFid/1/1', params, headers, 'get', function(data) {
				let getData = data.data.list;
				//console.log(JSON.stringify(getData));
				(_this.baseInfo = {
					//头部信息
					breedBatchNum: getData[0].fnumber ? getData[0].fnumber : '-',//配种批次号
					fieldName: getData[0].fenchang ? getData[0].fenchang : '-',//分场
					
					batchStatus: getData[0].picistate ? getData[0].picistate : '-',//批次状态
					enableStatus: getData[0].qiyongstate ? getData[0].qiyongstate : '-',//启用状态
					batchBreedType: getData[0].pcbreedtype ? getData[0].pcbreedtype : '-',//批次配种类型
					avgBreedTime: getData[0].cfavgbreeddate ? timeFormat(getData[0].cfavgbreeddate, 'yyyy-MM-dd') : '-',//平均配种时间
					avgBirthTime: getData[0].favgactbirthdate ? timeFormat(getData[0].favgactbirthdate, 'yyyy-MM-dd') : '-',//平均分娩时间
					avgExpectedDate: getData[0].cfavgbirthdate ? timeFormat(getData[0].cfavgbirthdate, 'yyyy-MM-dd') : '-',//平均预产期
					breedStartTime: getData[0].cfbreedingdate ? timeFormat(getData[0].cfbreedingdate, 'yyyy-MM-dd') : '-',//配种开始时间
					breedEndTime: getData[0].cfbreedingenddate ? timeFormat(getData[0].cfbreedingenddate, 'yyyy-MM-dd') : '-',//配种结束时间
					birthStartTime: getData[0].fstartbirthdate ? timeFormat(getData[0].fstartbirthdate, 'yyyy-MM-dd') : '-',//分娩开始时间
					birthEndTime: getData[0].fendbirthdate ? timeFormat(getData[0].fendbirthdate, 'yyyy-MM-dd') : '-',//分娩结束时间
					batchSetDate: getData[0].fcreatetime ? timeFormat(getData[0].fcreatetime, 'yyyy-MM-dd') : '-',//批次建立日期
					
					//基本信息
					totalNum: getData[0].cfalltotalqty != null ? getData[0].cfalltotalqty : '-',//总头数
					curSavingNum: getData[0].cfcurrqty != null ? getData[0].cfcurrqty : '-',//当前存栏
					turnInNum: getData[0].cfadjustqty != null ? getData[0].cfadjustqty : '-',//调入数
					turnOutNum: getData[0].cfadjustoutqty != null ? getData[0].cfadjustoutqty : '-',//调出数
					breededNum: getData[0].cfallmatingqty != null ? getData[0].cfallmatingqty : '-',//已配数
					reserveNum: getData[0].cfreservefemaleqty != null ? getData[0].cfreservefemaleqty : '-',//配后备数
					birthNum: getData[0].cfbirthqty != null ? getData[0].cfbirthqty : '-',//分娩数
					emptyNum: getData[0].cfbarrenqty != null ? getData[0].cfbarrenqty : '-',//空怀数
					returnNum: getData[0].cfreheatqty != null ? getData[0].cfreheatqty : '-',//返情数
					abortionNum: getData[0].cfabortionqty != null ? getData[0].cfabortionqty : '-',//流产数
					avgWeanNum: getData[0].cfweansonpigavg != null ? getData[0].cfweansonpigavg : '-',//胎均断奶数
					breedBirthRate: getData[0].cfmatingbirthpercent != null ? getData[0].cfmatingbirthpercent : '-',//配种分娩率
					batchBreedNum: getData[0].cfmatingqty != null ? getData[0].cfmatingqty : '-',//本批次配种数
					weanSowNum: getData[0].cfweansownoqty != null ? getData[0].cfweansownoqty : '-',//断奶母猪数
					weanChildNum: getData[0].cfweansonpigqty != null ? getData[0].cfweansonpigqty : '-',//断奶仔猪头数
					eliminationNum: getData[0].cfweedqty != null ? getData[0].cfweedqty : '-',//淘汰数
					deathNum: getData[0].cfdeadqty != null ? getData[0].cfdeadqty : '-'//死亡数
				})
			});
		},

		//获取详细信息
		getindex(pageNum, pageSize) {
			let params, url;
			var _this = this;
			let headers = {};
			let index = _this.currentNavIndex;
			//headers['content-type'] = 'application/json';
			params = {
				breedbatchid: 'Va4AAAewU7z8qPq9' //_this.id
			};

			switch (index) {
				// case 1: //存栏信息
				// 	url = '';
				// 	break;
				// case 2: //配种记录
				// 	url = '';
				// 	break;
				case 3: //当前存栏
					url = '/PigBreedingBatch/selectDangqcunlanByBreedBatch';
					break;
				case 4: //异常妊娠
					url = '/PigBreedingBatch/selectYichangrenshenByBreedBatch';
					break;
				case 5: //分娩记录
					url = '/PigBreedingBatch/selectBreedBirthRecord';
					break;
				case 6: //断奶记录
					url = '/PigBreedingBatch/selectDuannaiByBreedBatchId';
					break;
				case 7: //死亡记录
					url = '/PigBreedingBatch/selectSiwangByBreedBatchId';
					break;
				case 8: //转入记录
					url = '/PigBreedingBatch/selectIntoRecord';
					break;
				case 9: //转出记录
					url = '/PigBreedingBatch/selectOutRecord';
					break;
				case 10: //淘汰申请
					url = '/PigBreedingBatch/selectTaotaiByBreedBatch';
					break;
			}

			common.commRequest(`${url}/${pageSize}/${pageNum}`, params, headers, 'get', function(data) {
				console.log(data);
				let getData = data.data.list;
				console.log(JSON.stringify(getData));
				if (getData.length == 0) {
					_this.loadingType = 2;
					return;
				}
				_this.table(index, getData);

				_this.loadingType = 0;
			});
		},
		table(index, getData) {
			switch (index) {
				/*case 1: //仔猪转入
					for (var i = 0; i < getData.length; i++) {
						this.pigLetIn.push({
							// 仔猪调入
							bizDate: getData[i].fbizdate ? getData[i].fbizdate : '-',
							earno: getData[i].cfsownonum ? getData[i].cfsownonum : '-',
							count: getData[i].matingcount ? getData[i].matingcount : '-',
							incnt: getData[i].cfincnt ? getData[i].cfincnt : '-',
							ilive: getData[i].cfilive ? getData[i].cfilive : '-',
							faawt: getData[i].cffaawt ? getData[i].cffaawt : '-',
							avgWeight: getData[i].cfavgwt ? getData[i].cfavgwt : '-',
							imale: getData[i].cfimale ? getData[i].cfimale : '-',
							ifmal: getData[i].cfifmal ? getData[i].cfifmal : '-',
							fnumber: getData[i].fnumber ? getData[i].fnumber : '-'
						});
					}
					break; */
				/*case 2: //引种记录
					for (var i = 0; i < getData.length; i++) {
						this.importSeed.push({
							//引种记录
							bizdate: getData[i].yewuriqi ? getData[i].yewuriqi : '-',
							weight: getData[i].zongzhongliang ? getData[i].zongzhongliang : '-',
							incnt: getData[i].zongtoushu ? getData[i].zongtoushu : '-',
							money: getData[i].zongjine ? getData[i].zongjine : '-',
							type: getData[i].yinzhongleixing ? getData[i].yinzhongleixing : '-',
							fnumber: getData[i].danjubianhao ? getData[i].danjubianhao : '-',
							outUnit: getData[i].diaochudanwei ? getData[i].diaochudanwei : '-'
						});
					}
					break; */
				case 3: //当前存栏
					for (var i = 0; i < getData.length; i++) {
						this.curSaving.push({
							index: this.curSavingIndex++,
							sowNum: getData[i].erpaihao ? getData[i].erpaihao : '-',
							sowStatus: getData[i].pigstate ? getData[i].pigstate : '-',
							lastBizDate: getData[i].cflastdate ? timeFormat(getData[0].cflastdate, 'yyyy-MM-dd') : '-',
							lastBusiness: getData[i].cflaststate ? getData[i].cflaststate : '-'
						});
					}
					break;
				case 4: //异常妊娠
					for (var i = 0; i < getData.length; i++) {
						this.abnormalPregnancy.push({
							index: this.abnormalPregnancyIndex++,
							bizDate: getData[i].fbizdate ? timeFormat(getData[0].fbizdate, 'yyyy-MM-dd') : '-',
							count: getData[i].toushu != null ? getData[i].toushu : '-',
							emptyNum: getData[i].konghuai != null ? getData[i].konghuai : '-',
							abortionNum: getData[i].liuchan != null ? getData[i].liuchan : '-',
							returnNum: getData[i].fanqing != null ? getData[i].fanqing : '-'
						});
					}
					break;
				case 5: //分娩记录
					for (var i = 0; i < getData.length; i++) {
						this.birthRecord.push({
							index: this.birthRecordIndex++,
							bizDate: getData[i].fbizdate ? timeFormat(getData[0].fbizdate, 'yyyy-MM-dd') : '-',
							nestNum: getData[i].woshu != null ? getData[i].woshu : '-',
							totalChild: getData[i].avgcount != null ? getData[i].avgcount : '-',
							livingChild: getData[i].avglive != null ? getData[i].avglive : '-',
							invalidChild: getData[i].avgwuxiao != null ? getData[i].avgwuxiao : '-',
							childCount: getData[i].sumcount != null ? getData[i].sumcount : '-',
							livingChildCount: getData[i].sumlive != null ? getData[i].sumlive : '-',
							mummyNum: getData[i].summumy != null ? getData[i].summumy : '-',
							deathNum: getData[i].sumdith != null ? getData[i].sumdith : '-',
							malformationNum: getData[i].sumderm != null ? getData[i].sumderm : '-'
						});
					}
					break;
				case 6: //断奶记录
					for (var i = 0; i < getData.length; i++) {
						this.weaningRecord.push({
							index: this.weaningRecordIndex++,
							bizdate: getData[i].yewuriqi ? timeFormat(getData[0].yewuriqi, 'yyyy-MM-dd') : '-',
							nestNum: getData[i].woshu != null ? getData[i].woshu : '-',
							weanNum: getData[i].duannaitoushu != null ? getData[i].duannaitoushu : '-',
							nestWeanNum: getData[i].woduannaishu != null ? getData[i].woduannaishu : '-',
							nestAvgWeanWeight: getData[i].wojunduannaiwozhong != null ? getData[i].wojunduannaiwozhong : '-',
							avgWeanWeight: getData[i].duannaijunzhong != null ? getData[i].duannaijunzhong : '-',
							weanDayAge: getData[i].dunanairiling != null ? getData[i].dunanairiling : '-',
							weanTotalNestWeight: getData[i].duannaizongwozhong != null ? getData[i].duannaizongwozhong : '-',
						});
					}
					break;
				case 7: //死亡记录
					for (var i = 0; i < getData.length; i++) {
						this.deathRecord.push({
							index: this.deathRecordIndex++,
							bizdate: getData[i].fbizdate ? timeFormat(getData[0].fbizdate, 'yyyy-MM-dd') : '-',
							earNum: getData[i].erpaihao ? getData[i].erpaihao : '-',
							deathCause: getData[i].siwangyuanyin ? getData[i].siwangyuanyin : '-',
							deathTime: getData[i].siwangshijian ? getData[i].siwangshijian : '-',
							pigStatus: getData[i].zhuzhizhuangtai ? getData[i].zhuzhizhuangtai : '-',
							dayAge: getData[i].cfinday != null ? getData[i].cfinday : '-',
							count: getData[i].cfincnt != null ? getData[i].cfincnt : '-',
							totalWeight: getData[i].cftogwt != null ? getData[i].cftogwt : '-',
							fnumber: getData[i].fnumber ? getData[i].fnumber : '-'
						});
					}
					break;
				case 8: //转入记录
					for (var i = 0; i < getData.length; i++) {
						this.transInRecord.push({
							index: this.transInRecordIndex++,
							earNum: getData[i].erpaihao ? getData[i].erpaihao : '-',
							turnIndate: getData[i].zrdate ? timeFormat(getData[0].zrdate, 'yyyy-MM-dd') : '-',
							breedBatchBefore: getData[i].zrqbreedpc ? getData[i].zrqbreedpc : '-',
							receiptType: getData[i].danjutype ? getData[i].danjutype : '-',
							fnumber: getData[i].fnumber ? getData[i].fnumber : '-',
						});
					}
					break;
				case 9: //转出记录
					for (var i = 0; i < getData.length; i++) {
						this.transOutRecord.push({
							index: this.transOutRecordIndex++,
							earNum: getData[i].erpaihao ? getData[i].erpaihao : '-',
							turnOutdate: getData[i].zcdate ? timeFormat(getData[0].zcdate, 'yyyy-MM-dd') : '-',
							receiptType: getData[i].danjutype ? getData[i].danjutype : '-',
							fnumber: getData[i].fnumber ? getData[i].fnumber : '-',
						});
					}
					break;
				case 10: //淘汰申请
					for (var i = 0; i < getData.length; i++) {
						this.eliminateApply.push({
							index: this.eliminateApplyIndex++,
							earNum: getData[i].erpaihao ? getData[i].erpaihao : '-',
							eliminateStatus: getData[i].taotaizhaungtai ? getData[i].taotaizhaungtai : '-',
							eliminateReason: getData[i].taotaiyuanyin ? getData[i].taotaiyuanyin : '-',
							pigStatus: getData[i].zhuzhizhuangtai ? getData[i].zhuzhizhuangtai : '-',
							dayAge: getData[i].cfdayage != null ? getData[i].cfdayage : '-',
							birthCount: getData[i].cfparit != null ? getData[i].cfparit : '-',
							avgWeight: getData[i].cfavgweight != null ? getData[i].cfavgweight : '-',
							count: getData[i].cfcn != null ? getData[i].cfcn : '-'
						});
					}
					break;
				
			}
		},

		setUp() {
			// 设置
			uni.navigateTo({
				url: '/pages/matingBatch/matingSetting/matingSetting'
			});
		},
		back() {
			uni.navigateBack({});
		},
		// 滑动底部加载
		loadMore() {
			let _this = this;
			_this.loadingType = 1;
			this.getindex(++this.pageNum,this.pageSize)
		},
	}
};
</script>

<style lang="scss">
@import '@/common/baseInfo.scss';
.icon-big {
	width: 24rpx;
	height: 24rpx;
}
.datagrid-wrapper {
	padding: 20rpx 12rpx 0;
}
</style>
