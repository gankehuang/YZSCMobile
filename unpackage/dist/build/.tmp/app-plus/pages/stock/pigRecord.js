(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/stock/pigRecord"],{"6b73":function(n,t,e){},"8c53":function(n,t,e){"use strict";e.r(t);var i=e("e3c6"),a=e.n(i);for(var o in i)"default"!==o&&function(n){e.d(t,n,function(){return i[n]})}(o);t["default"]=a.a},a98d:function(n,t,e){"use strict";var i=e("6b73"),a=e.n(i);a.a},d5b6:function(n,t,e){"use strict";e.r(t);var i=e("eafc"),a=e("8c53");for(var o in a)"default"!==o&&function(n){e.d(t,n,function(){return a[n]})}(o);e("a98d");var c=e("2877"),u=Object(c["a"])(a["default"],i["a"],i["b"],!1,null,null,null);t["default"]=u.exports},e3c6:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){return Promise.all([e.e("common/vendor"),e.e("components/z-table/z-table")]).then(e.bind(null,"5668"))},a=function(){return e.e("components/pageSider").then(e.bind(null,"dccb"))},o=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"f151"))},c={components:{ztable:i,PageSider:a,uniIcon:o},data:function(){return{id:"",columns:[{title:"单据编号",key:"index",width:"120"},{title:"盘点日期",key:"name",width:"200"},{title:"猪场/分厂",key:"stockNum",width:"200"},{title:"药品名称",key:"classify",width:"200"},{title:"计量单位",key:"unit",width:"200"}],tableData:[{index:"01",name:"毛巾",stockNum:"30",classify:"衣服",unit:"件"},{index:"02",name:"衣服",stockNum:"30",classify:"衣服",unit:"件"},{index:"03",name:"裤子",stockNum:"30",classify:"衣服",unit:"件"}],pageInfo:{page:1,pageSize:50,total:2e3}}},onLoad:function(n){console.log("idvalue"+n.id," at pages/stock/pigRecord.vue:100"),n.id&&(this.id=n.id)},methods:{handOnClickBack:function(){n.navigateBack({})}},computed:{pageNum:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pageSize)}}};t.default=c}).call(this,e("6e42")["default"])},eafc:function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"a",function(){return i}),e.d(t,"b",function(){return a})}},[["d1d3","common/runtime","common/vendor"]]]);