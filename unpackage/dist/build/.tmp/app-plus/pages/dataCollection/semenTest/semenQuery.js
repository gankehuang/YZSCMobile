(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/dataCollection/semenTest/semenQuery"],{"1ab4":function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=function(){return Promise.all([o.e("common/vendor"),o.e("components/z-table/z-table")]).then(o.bind(null,"5668"))},a=function(){return o.e("components/popup/popup-layer").then(o.bind(null,"fd0e"))},r=function(){return o.e("components/uni-load-more").then(o.bind(null,"0914"))},c={data:function(){return{showDrawer:!1,tableData:[{id:"01",index:"01",fmrq:"上午",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y001",sowcard1:"Y001",sowcard2:"Y001"},{id:"02",index:"02",fmrq:"上午",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y002",sowcard1:"Y001",sowcard2:"Y001"},{id:"03",index:"03",fmrq:"上午",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y003",sowcard1:"Y001",sowcard2:"Y001"},{id:"04",index:"04",fmrq:"上午",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y004",sowcard1:"Y001",sowcard2:"Y001"},{id:"05",index:"05",fmrq:"20190901",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y005",sowcard1:"Y001",sowcard2:"Y001"}],columns:[{title:"序号",key:"index",width:70},{title:"公猪耳号",key:"fmrq",width:150},{title:"颜色",key:"zzzrpc",width:200},{title:"气味",key:"mzzyzw",width:200},{title:"原精量",key:"sowcard",width:150},{title:"密度",key:"sowcard1",width:150},{title:"畸形率",key:"sowcard2",width:150}],status:"more",loadingType:0,loadingText:{contentdown:"查看更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}},components:{ztable:t,popupLayer:a,uniLoadMore:r},onLoad:function(){},onPullDownRefresh:function(){var n=this,o=n.tableData;console.log("下拉刷新"," at pages/dataCollection/semenTest/semenQuery.vue:157"),setTimeout(function(){o.splice(5),e.stopPullDownRefresh()},1e3)},onReachBottom:function(){this.loadMore()},methods:{rowTapHandler:function(n){e.navigateTo({url:"/pages/dataCollection/semenTest/semenAudit?id=".concat(n.id),success:function(e){},fail:function(){},complete:function(){}})},showFilter:function(){},closeDrawer:function(){},loadMore:function(){var e=this,n=e.tableData;e.loadingType=1,setTimeout(function(){var o=[{id:"01",index:"01",fmrq:"上午",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y001",sowcard1:"Y001",sowcard2:"Y001"},{id:"02",index:"02",fmrq:"上午",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y002",sowcard1:"Y001",sowcard2:"Y001"},{id:"03",index:"03",fmrq:"上午",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y003",sowcard1:"Y001",sowcard2:"Y001"},{id:"04",index:"04",fmrq:"上午",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y004",sowcard1:"Y001",sowcard2:"Y001"},{id:"05",index:"05",fmrq:"20190901",zzzrpc:"2",mzzyzw:"xxx",sowcard:"Y005",sowcard1:"Y001",sowcard2:"Y001"}],t=n.concat(o);e.tableData=t},300),setTimeout(function(){e.loadingType=0},500)}}};n.default=c}).call(this,o("6e42")["default"])},2094:function(e,n,o){"use strict";var t=o("79bd"),a=o.n(t);a.a},"595b":function(e,n,o){"use strict";o.r(n);var t=o("1ab4"),a=o.n(t);for(var r in t)"default"!==r&&function(e){o.d(n,e,function(){return t[e]})}(r);n["default"]=a.a},"786a":function(e,n,o){"use strict";o.r(n);var t=o("ba8a"),a=o("595b");for(var r in a)"default"!==r&&function(e){o.d(n,e,function(){return a[e]})}(r);o("2094");var c=o("2877"),i=Object(c["a"])(a["default"],t["a"],t["b"],!1,null,null,null);n["default"]=i.exports},"79bd":function(e,n,o){},ba8a:function(e,n,o){"use strict";var t=function(){var e=this,n=e.$createElement;e._self._c},a=[];o.d(n,"a",function(){return t}),o.d(n,"b",function(){return a})}},[["9fa7","common/runtime","common/vendor"]]]);