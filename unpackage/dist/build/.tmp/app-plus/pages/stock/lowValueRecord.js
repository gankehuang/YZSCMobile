(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/stock/lowValueRecord"],{1276:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return Promise.all([n.e("common/vendor"),n.e("components/z-table/z-table")]).then(n.bind(null,"5668"))},a=function(){return n.e("components/pageSider").then(n.bind(null,"dccb"))},o={components:{ztable:i,PageSider:a},data:function(){return{id:"",columns:[{title:"序号",key:"index",width:"100"},{title:"物料名称",key:"name",width:"200"},{title:"规格型号",key:"specno",width:"200"},{title:"计量单位",key:"unit",width:"200"},{title:"盘点数量",key:"stockNum",width:"200"},{title:"差异数量",key:"diffNum",width:"200"},{title:"库存数量",key:"storageNum",width:"200"},{title:"物料基本分类",key:"classify",width:"200"}],tableData:[{index:"01",name:"毛巾",specno:"2019-02-21",unit:"件",stockNum:"30",diffNum:"25",storageNum:"55",classify:"衣服"},{index:"02",name:"衣服",specno:"20190902-01",unit:"件",stockNum:"30",diffNum:"25",storageNum:"55",classify:"衣服"},{index:"03",name:"裤子",specno:"20190902-01",unit:"件",stockNum:"30",diffNum:"25",storageNum:"55",classify:"衣服"}],pageInfo:{page:1,pageSize:50,total:2e3}}},onLoad:function(t){console.log("idvalue"+t.id," at pages/stock/lowValueRecord.vue:122"),t.id&&(this.id=t.id)},methods:{handOnClickBack:function(){t.navigateBack({})}},computed:{pageNum:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pageSize)}}};e.default=o}).call(this,n("6e42")["default"])},"143a":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},"218f":function(t,e,n){"use strict";n.r(e);var i=n("143a"),a=n("75b2");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("4c9c");var u=n("2877"),c=Object(u["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},"4c9c":function(t,e,n){"use strict";var i=n("e734"),a=n.n(i);a.a},"75b2":function(t,e,n){"use strict";n.r(e);var i=n("1276"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},e734:function(t,e,n){}},[["53d4","common/runtime","common/vendor"]]]);