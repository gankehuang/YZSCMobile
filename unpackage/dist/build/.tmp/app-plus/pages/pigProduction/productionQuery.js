(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pigProduction/productionQuery"],{1222:function(e,t,x){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=x("5952");function c(e,t,x){return t in e?Object.defineProperty(e,t,{value:x,enumerable:!0,configurable:!0,writable:!0}):e[t]=x,e}var i=function(){return x.e("components/uni-load-more").then(x.bind(null,"0914"))},r=function(){return x.e("components/uni-icon/uni-icon").then(x.bind(null,"f151"))},o=function(){return x.e("components/popup/popup-layer").then(x.bind(null,"fd0e"))},a=function(){return x.e("components/uni-cell/draw-cell").then(x.bind(null,"2668"))},l=function(){return x.e("components/mpvue-picker/mpvuePicker").then(x.bind(null,"52d7"))},u=function(){return Promise.all([x.e("common/vendor"),x.e("components/z-table/z-table")]).then(x.bind(null,"5668"))},d={onPullDownRefresh:function(){var t=this;t.tableData;console.log("下拉刷新"," at pages/pigProduction/productionQuery.vue:128"),setTimeout(function(){e.stopPullDownRefresh()},1e3)},onReachBottom:function(){this.loadMore()},data:function(){var e,t,x,i,r,o,a;return{status:"more",statusTypes:[{value:"more",text:"加载前"},{value:"loading",text:"加载中"},{value:"noMore",text:"没有更多"}],loadingType:0,loadingText:{contentdown:"查看更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},deepLength:1,pickerValueDefault:[0],themeColor:"#007AFF",pickerValueArray:[{value:"1111",label:"三泉A区"},{value:"1111",label:"三泉B区"},{value:"1111",label:"三泉C区"},{value:"1111",label:"三泉D区"},{value:"1111",label:"三泉E区"}],searchForm:{businessStartTime:(0,n.timeFormat)(new Date,"yyyy-MM-dd"),businessEndTime:(0,n.timeFormat)(new Date,"yyyy-MM-dd"),immunePlan:"",immuneProject:"",vaccineName:"",recyclingNum:""},showRigth:!1,showLeft:!1,tableData:[(e={id:"01",index:"01",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(e,"gzep","xx"),c(e,"tjr","xxx"),c(e,"tjsj","xxxx"),e),(t={id:"02",index:"02",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(t,"gzep","xx"),c(t,"tjr","xxx"),c(t,"tjsj","xxxx"),t),(x={id:"03",index:"03",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(x,"gzep","xx"),c(x,"tjr","xxx"),c(x,"tjsj","xxxx"),x),(i={id:"04",index:"04",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(i,"gzep","xx"),c(i,"tjr","xxx"),c(i,"tjsj","xxxx"),i),(r={id:"05",index:"05",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(r,"gzep","xx"),c(r,"tjr","xxx"),c(r,"tjsj","xxxx"),r),(o={id:"06",index:"06",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(o,"gzep","xx"),c(o,"tjr","xxx"),c(o,"tjsj","xxxx"),o),(a={id:"07",index:"07",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(a,"gzep","xx"),c(a,"tjr","xxx"),c(a,"tjsj","xxxx"),a)],columns:[{title:"序号",key:"index",width:70},{title:"检测日期",key:"jcrq",width:150},{title:"检测人员",key:"jcry",width:150},{title:"检测工具",key:"jcgg",width:150},{title:"母猪耳牌",key:"sowcard",width:150},{title:"异常原因",key:"ycyy",width:200},{title:"配种批次",key:"pzpc",width:150},{title:"状态",key:"zt",width:100},{title:"存栏位置",key:"clwz",width:150},{title:"公猪耳牌",key:"gzep",width:150},{title:"提交人",key:"tjr",width:100},{title:"提交时间",key:"tjsj",width:150}]}},components:{ztable:u,popupLayer:o,drawCell:a,mpvuePicker:l,uniIcon:r,uniLoadMore:i},onLoad:function(){},methods:{loadMore:function(){var e=this,t=e.tableData;e.loadingType=1,setTimeout(function(){var e,x,n,i,r,o=[(e={id:"01",index:"01",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(e,"gzep","xx"),c(e,"tjr","xxx"),c(e,"tjsj","xxxx"),e),(x={id:"01",index:"01",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(x,"gzep","xx"),c(x,"tjr","xxx"),c(x,"tjsj","xxxx"),x),(n={id:"01",index:"01",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(n,"gzep","xx"),c(n,"tjr","xxx"),c(n,"tjsj","xxxx"),n),(i={id:"01",index:"01",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(i,"gzep","xx"),c(i,"tjr","xxx"),c(i,"tjsj","xxxx"),i),(r={id:"01",index:"01",jcrq:"上午",jcry:"2",jcgg:"D0001",sowcard:"Y001",ycyy:"xx",pzpc:"xx",zt:"xx",clwz:"xx",gzep:"xx"},c(r,"gzep","xx"),c(r,"tjr","xxx"),c(r,"tjsj","xxxx"),r)];t.push.apply(t,o)},300),setTimeout(function(){e.loadingType=0},500)},onConfirmPig:function(){},selectDate:function(){this.$refs.mpvuePicker.show()},reset:function(){this.searchForm.immunePlan="",this.searchForm.immuneProject="",this.searchForm.vaccineName="",this.searchForm.recyclingNum=""},find:function(){this.$refs.popupRef1.close()},selectPeople:function(){this.$refs.pigPicker.show()},showFilter:function(){this.$refs.popupRef1.show()},rowTapHandler:function(t){e.navigateTo({url:"/pages/dataCollection/pregnancyRecord/pregnancyDetail?id=".concat(t.id),success:function(e){},fail:function(){},complete:function(){}})}}};t.default=d}).call(this,x("6e42")["default"])},"572b":function(e,t,x){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},c=[];x.d(t,"a",function(){return n}),x.d(t,"b",function(){return c})},9433:function(e,t,x){},bdb9:function(e,t,x){"use strict";var n=x("9433"),c=x.n(n);c.a},d5ca:function(e,t,x){"use strict";x.r(t);var n=x("572b"),c=x("e39c");for(var i in c)"default"!==i&&function(e){x.d(t,e,function(){return c[e]})}(i);x("bdb9");var r=x("2877"),o=Object(r["a"])(c["default"],n["a"],n["b"],!1,null,null,null);t["default"]=o.exports},e39c:function(e,t,x){"use strict";x.r(t);var n=x("1222"),c=x.n(n);for(var i in n)"default"!==i&&function(e){x.d(t,e,function(){return n[e]})}(i);t["default"]=c.a}},[["849d8","common/runtime","common/vendor"]]]);