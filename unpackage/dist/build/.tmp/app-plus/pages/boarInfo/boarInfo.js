(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/boarInfo/boarInfo"],{"038d":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){return t.e("components/uni-load-more").then(t.bind(null,"0914"))},i=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"f151"))},a=function(){return t.e("components/popup/popup-layer").then(t.bind(null,"fd0e"))},u=function(){return t.e("components/uni-cell/draw-cell").then(t.bind(null,"2668"))},s=function(){return t.e("components/mpvue-picker/mpvuePicker").then(t.bind(null,"52d7"))},r=function(){return Promise.all([t.e("common/vendor"),t.e("components/z-table/z-table")]).then(t.bind(null,"5668"))},l=function(){return t.e("components/pageSider").then(t.bind(null,"dccb"))},c={components:{popupLayer:a,drawCell:u,mpvuePicker:s,ztable:r,pageSider:l,uniIcon:i,uniLoadMore:o},onPullDownRefresh:function(){var n=this,t=n.tableData;console.log("下拉刷新"," at pages/boarInfo/boarInfo.vue:134"),setTimeout(function(){t.splice(5),e.stopPullDownRefresh()},1e3)},onReachBottom:function(){this.loadMore()},data:function(){return{status:"more",statusTypes:[{value:"more",text:"加载前"},{value:"loading",text:"加载中"},{value:"noMore",text:"没有更多"}],pickerValueDefault:[0],loadingType:0,loadingText:{contentdown:"查看更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},pickerValueArray:[{value:"1111",label:"三泉A区"},{value:"1111",label:"三泉B区"},{value:"1111",label:"三泉C区"},{value:"1111",label:"三泉D区"},{value:"1111",label:"三泉E区"}],searchForm:{immunePlan:"",immuneProject:""},tableData:[{id:"123123123",index:1,earno:"YY002",sex:"公",verty:"大白",newBusiness:"调入记录"},{id:"asjkld2",index:2,earno:"YY003",sex:"母",verty:"大白",newBusiness:"配种记录"},{id:"zxckmhn21",index:3,earno:"YY004",sex:"公",verty:"大白",newBusiness:"死亡记录"},{id:"asjkh2",index:4,earno:"YY005",sex:"母",verty:"大白",newBusiness:"调出记录"},{id:"asdokuj12op5",index:5,earno:"YY006",sex:"公",verty:"大白",newBusiness:"分娩记录"},{id:"123123123",index:1,earno:"YY002",sex:"公",verty:"大白",newBusiness:"调入记录"},{id:"asjkld2",index:2,earno:"YY003",sex:"母",verty:"大白",newBusiness:"配种记录"},{id:"zxckmhn21",index:3,earno:"YY004",sex:"公",verty:"大白",newBusiness:"死亡记录"},{id:"asjkh2",index:4,earno:"YY005",sex:"母",verty:"大白",newBusiness:"调出记录"},{id:"asdokuj12op5",index:5,earno:"YY006",sex:"公",verty:"大白",newBusiness:"分娩记录"}],columns:[{title:"序号",key:"index",width:70},{title:"耳牌/国际码",key:"earno",width:200},{title:"性别",key:"sex",width:100},{title:"品种",key:"verty",width:200},{title:"最新业务",key:"newBusiness",width:200}],pageInfo:{page:1,pageSize:50,total:2e3}}},methods:{qr:function(){this.scancode()},qr1:function(){this.scancode()},reset:function(){this.searchForm.immunePlan="",this.searchForm.immuneProject=""},find:function(){this.$refs.popupRef1.close()},loadMore:function(){var e=this,n=e.tableData;e.loadingType=1,setTimeout(function(){var e={id:"123123123",index:1,earno:"YY002",sex:"公",verty:"大白",newBusiness:"调入记录"};n.push(e),n.push(e),n.push(e),n.push(e),n.push(e)},300),setTimeout(function(){e.loadingType=0},500)},onConfirmPig:function(){},selectPeople:function(){this.$refs.pigPicker.show()},showFilter:function(){this.$refs.popupRef1.show()},rowTapHandler:function(n){e.navigateTo({url:"/pages/boarInfo/boarDetail/boarDetail?id=".concat(n.id),success:function(e){},fail:function(){},complete:function(){}})},back:function(){e.navigateBack({})}},computed:{pageNum:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pageSize)}}};n.default=c}).call(this,t("6e42")["default"])},9666:function(e,n,t){"use strict";t.r(n);var o=t("cca4"),i=t("9d34");for(var a in i)"default"!==a&&function(e){t.d(n,e,function(){return i[e]})}(a);t("e364");var u=t("2877"),s=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},"97da":function(e,n,t){},"9d34":function(e,n,t){"use strict";t.r(n);var o=t("038d"),i=t.n(o);for(var a in o)"default"!==a&&function(e){t.d(n,e,function(){return o[e]})}(a);n["default"]=i.a},cca4:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})},e364:function(e,n,t){"use strict";var o=t("97da"),i=t.n(o);i.a}},[["0afb","common/runtime","common/vendor"]]]);