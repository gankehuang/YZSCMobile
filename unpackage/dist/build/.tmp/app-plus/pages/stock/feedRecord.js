(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/stock/feedRecord"],{"1bc9":function(e,t,n){"use strict";var i=n("988e"),a=n.n(i);a.a},"20f2":function(e,t,n){"use strict";n.r(t);var i=n("f068"),a=n("b132");for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);n("1bc9");var u=n("2877"),c=Object(u["a"])(a["default"],i["a"],i["b"],!1,null,null,null);t["default"]=c.exports},"988e":function(e,t,n){},b132:function(e,t,n){"use strict";n.r(t);var i=n("d6d3"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);t["default"]=a.a},d6d3:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){return Promise.all([n.e("common/vendor"),n.e("components/z-table/z-table")]).then(n.bind(null,"5668"))},a=function(){return n.e("components/pageSider").then(n.bind(null,"dccb"))},o={components:{ztable:i,PageSider:a},data:function(){return{id:"",columns:[{title:"序号",key:"index",width:"100"},{title:"食材名称",key:"name",width:"200"},{title:"盘点数量",key:"stockNum",width:"200"},{title:"类别",key:"classify",width:"200"},{title:"计量单位",key:"unit",width:"200"}],tableData:[{index:"01",name:"毛巾",stockNum:"30",classify:"衣服",unit:"件"},{index:"02",name:"衣服",stockNum:"30",classify:"衣服",unit:"件"},{index:"03",name:"裤子",stockNum:"30",classify:"衣服",unit:"件"}],pageInfo:{page:1,pageSize:50,total:2e3}}},onLoad:function(e){console.log("idvalue"+e.id," at pages/stock/feedRecord.vue:101"),e.id&&(this.id=e.id)},methods:{handOnClickBack:function(){e.navigateBack({})}},computed:{pageNum:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pageSize)}}};t.default=o}).call(this,n("6e42")["default"])},f068:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a})}},[["e5ce","common/runtime","common/vendor"]]]);