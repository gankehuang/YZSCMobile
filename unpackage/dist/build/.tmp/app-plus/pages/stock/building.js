(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/stock/building"],{"31a7":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return Promise.all([t.e("common/vendor"),t.e("components/z-table/z-table")]).then(t.bind(null,"5668"))},u=function(){return t.e("components/pageSider").then(t.bind(null,"dccb"))},o=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"f151"))},a=function(){return t.e("components/uni-cell/uni-cell").then(t.bind(null,"e773"))},c={components:{ztable:i,PageSider:u,uniIcon:o,uniCell:a},data:function(){return{id:"",array:["一分厂配怀舍8栋","样品","巴西","日本"],index:0,form:{name:"一分场",projectName:"自动带出"},columns:[{title:"耳号",key:"index",width:"100"},{title:"猪只",key:"name",width:"200"},{title:"胎次",key:"specno",width:"200"},{title:"存栏位置",key:"unit",width:"200"},{title:"最新业务日期",key:"stockNum",width:"200"},{title:"盘点状态",key:"diffNum",width:"200"}],tableData:[{index:"01",name:"毛巾",specno:"2019-02-21",unit:"件",stockNum:"30",diffNum:"25"},{index:"02",name:"衣服",specno:"20190902-01",unit:"件",stockNum:"30",diffNum:"25"},{index:"03",name:"裤子",specno:"20190902-01",unit:"件",stockNum:"30",diffNum:"25"}],pageInfo:{page:1,pageSize:50,total:2e3}}},onLoad:function(n){console.log("idvalue"+n.id," at pages/stock/building.vue:134"),n.id&&(this.id=n.id)},methods:{handOnClickBack:function(){n.navigateBack({})},bindPickerChange:function(n){console.log("picker发送选择改变，携带值为",n.target.value," at pages/stock/building.vue:144"),this.index=n.target.value}},computed:{pageNum:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pageSize)}}};e.default=c}).call(this,t("6e42")["default"])},7498:function(n,e,t){"use strict";t.r(e);var i=t("31a7"),u=t.n(i);for(var o in i)"default"!==o&&function(n){t.d(e,n,function(){return i[n]})}(o);e["default"]=u.a},"917f":function(n,e,t){"use strict";var i=function(){var n=this,e=n.$createElement;n._self._c},u=[];t.d(e,"a",function(){return i}),t.d(e,"b",function(){return u})},a9e1:function(n,e,t){"use strict";var i=t("e0f5"),u=t.n(i);u.a},e0f5:function(n,e,t){},f785:function(n,e,t){"use strict";t.r(e);var i=t("917f"),u=t("7498");for(var o in u)"default"!==o&&function(n){t.d(e,n,function(){return u[n]})}(o);t("a9e1");var a=t("2877"),c=Object(a["a"])(u["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports}},[["9a86","common/runtime","common/vendor"]]]);