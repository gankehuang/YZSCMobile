(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/dataCollection/breedRecord/breedQuery"],{"32da":function(e,a,t){"use strict";t.r(a);var r=t("9ec6"),o=t.n(r);for(var n in r)"default"!==n&&function(e){t.d(a,e,function(){return r[e]})}(n);a["default"]=o.a},"3d4c":function(e,a,t){"use strict";var r=function(){var e=this,a=e.$createElement;e._self._c},o=[];t.d(a,"a",function(){return r}),t.d(a,"b",function(){return o})},6453:function(e,a,t){"use strict";var r=t("d41e"),o=t.n(r);o.a},"9ec6":function(e,a,t){"use strict";(function(e){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=t("5952"),o=function(){return t.e("components/uni-load-more").then(t.bind(null,"0914"))},n=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"f151"))},i=function(){return t.e("components/popup/popup-layer").then(t.bind(null,"fd0e"))},d=function(){return t.e("components/uni-cell/draw-cell").then(t.bind(null,"2668"))},c=function(){return t.e("components/mpvue-picker/mpvuePicker").then(t.bind(null,"52d7"))},l=function(){return Promise.all([t.e("common/vendor"),t.e("components/z-table/z-table")]).then(t.bind(null,"5668"))},u={data:function(){return{status:"more",statusTypes:[{value:"more",text:"加载前"},{value:"loading",text:"加载中"},{value:"noMore",text:"没有更多"}],loadingType:0,loadingText:{contentdown:"查看更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},deepLength:1,pickerValueDefault:[0],themeColor:"#007AFF",pickerValueArray:[{value:"1111",label:"三泉A区"},{value:"1111",label:"三泉B区"},{value:"1111",label:"三泉C区"},{value:"1111",label:"三泉D区"},{value:"1111",label:"三泉E区"}],searchForm:{businessStartTime:(0,r.timeFormat)(new Date,"yyyy-MM-dd"),businessEndTime:(0,r.timeFormat)(new Date,"yyyy-MM-dd"),immunePlan:"",immuneProject:"",vaccineName:"",recyclingNum:""},tableData:[{id:"01",index:"01",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"},{id:"02",index:"02",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"},{id:"03",index:"03",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"},{id:"04",index:"04",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"},{id:"05",index:"05",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"}],columns:[{title:"序号",key:"index",width:70},{title:"公猪耳牌",key:"boarcard",width:150},{title:"配种时段",key:"date",width:200},{title:"配种员",key:"breeder",width:150},{title:"母猪耳牌",key:"sowcard",width:150},{title:"操作评价",key:"grade",width:150},{title:"均重(公)",key:"averageboar",width:200},{title:"均重(母)",key:"averagesow",width:200},{title:"存栏位置",key:"location",width:200},{title:"配种类型",key:"type",width:200},{title:"胎次",key:"parity",width:200}]}},components:{ztable:l,popupLayer:i,drawCell:d,mpvuePicker:c,uniIcon:n,uniLoadMore:o},onPullDownRefresh:function(){var a=this,t=a.tableData;console.log("下拉刷新"," at pages/dataCollection/breedRecord/breedQuery.vue:288"),setTimeout(function(){t.splice(5),e.stopPullDownRefresh()},1e3)},onReachBottom:function(){this.loadMore()},methods:{loadMore:function(){var e=this,a=e.tableData;e.loadingType=1,setTimeout(function(){var e=[{id:"01",index:"01",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"},{id:"01",index:"01",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"},{id:"01",index:"01",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"},{id:"01",index:"01",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"},{id:"01",index:"01",boarcard:"DD001",date:"上午",breeder:"张三",sowcard:"Y001",grade:"2",averageboar:"200",averagesow:"180",location:"一单元",type:"后备母",parity:"xxx"}];a.push.apply(a,e)},300),setTimeout(function(){e.loadingType=0},500)},onConfirmPig:function(){},selectDate:function(){this.$refs.mpvuePicker.show()},reset:function(){this.searchForm.immunePlan="",this.searchForm.immuneProject="",this.searchForm.vaccineName="",this.searchForm.recyclingNum=""},find:function(){this.$refs.popupRef1.close()},selectPeople:function(){this.$refs.pigPicker.show()},showFilter:function(){this.$refs.popupRef1.show()},rowTapHandler:function(a){e.navigateTo({url:"/pages/dataCollection/breedRecord/breedDetail?id=".concat(a.id),success:function(e){},fail:function(){},complete:function(){}})}}};a.default=u}).call(this,t("6e42")["default"])},d41e:function(e,a,t){},f7de:function(e,a,t){"use strict";t.r(a);var r=t("3d4c"),o=t("32da");for(var n in o)"default"!==n&&function(e){t.d(a,e,function(){return o[e]})}(n);t("6453");var i=t("2877"),d=Object(i["a"])(o["default"],r["a"],r["b"],!1,null,null,null);a["default"]=d.exports}},[["9b90e","common/runtime","common/vendor"]]]);