(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/stock/pig"],{"0997":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){return t.e("components/mpvue-picker/mpvuePicker").then(t.bind(null,"52d7"))},u=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"f151"))},o=function(){return t.e("components/uni-cell/uni-cell").then(t.bind(null,"e773"))},c=function(){return t.e("components/uni-cell/draw-cell").then(t.bind(null,"2668"))},l=function(){return Promise.all([t.e("common/vendor"),t.e("components/z-table/z-table")]).then(t.bind(null,"5668"))},a=function(){return t.e("components/popup/popup-layer").then(t.bind(null,"fd0e"))},r=function(){return t.e("components/pageSider").then(t.bind(null,"dccb"))},f={data:function(){return{id:"55",form:{name:"一分场",projectName:"自动带出"},columns:[{title:"序号",key:"index",width:"100"},{title:"猪只状态",key:"name",width:"200"},{title:"胎次",key:"specno",width:"200"},{title:"存栏位置",key:"unit",width:"200"},{title:"最新业务",key:"stockNum",width:"200"},{title:"差异数量",key:"diffNum",width:"200"},{title:"库存数量",key:"storageNum",width:"200"},{title:"物料基本分类",key:"classify",width:"200"}],tableData:[{index:"01",name:"毛巾",specno:"2019-02-21",unit:"件",stockNum:"30",diffNum:"25",storageNum:"55",classify:"衣服"},{index:"02",name:"衣服",specno:"20190902-01",unit:"件",stockNum:"30",diffNum:"25",storageNum:"55",classify:"衣服"},{index:"03",name:"裤子",specno:"20190902-01",unit:"件",stockNum:"30",diffNum:"25",storageNum:"55",classify:"衣服"}],pageInfo:{page:1,pageSize:50,total:2e3}}},components:{mpvuePicker:i,uniIcon:u,uniCell:o,ztable:l,drawCell:c,popupLayer:a,PageSider:r},methods:{record:function(){e.navigateTo({url:"materialRecord?id="+this.id,success:function(e){},fail:function(){},complete:function(){}})}},computed:{pageNum:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pageSize)}}};n.default=f}).call(this,t("6e42")["default"])},2237:function(e,n,t){"use strict";var i=t("fe46"),u=t.n(i);u.a},5303:function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement;e._self._c},u=[];t.d(n,"a",function(){return i}),t.d(n,"b",function(){return u})},beb1:function(e,n,t){"use strict";t.r(n);var i=t("0997"),u=t.n(i);for(var o in i)"default"!==o&&function(e){t.d(n,e,function(){return i[e]})}(o);n["default"]=u.a},d9bc:function(e,n,t){"use strict";t.r(n);var i=t("5303"),u=t("beb1");for(var o in u)"default"!==o&&function(e){t.d(n,e,function(){return u[e]})}(o);t("2237");var c=t("2877"),l=Object(c["a"])(u["default"],i["a"],i["b"],!1,null,null,null);n["default"]=l.exports},fe46:function(e,n,t){}},[["85ae","common/runtime","common/vendor"]]]);