(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/breedingBatch/breedingBatch"],{"3ce9":function(t,e,n){"use strict";n.r(e);var a=n("c3be"),i=n("e72a");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("9c3e");var c=n("2877"),u=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=u.exports},5350:function(t,e,n){},"9c3e":function(t,e,n){"use strict";var a=n("5350"),i=n.n(a);i.a},c3be:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},ccfa:function(t,e,n){"use strict";(function(t){function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return Promise.all([n.e("common/vendor"),n.e("components/z-table/z-table")]).then(n.bind(null,"5668"))},o=function(){return n.e("components/pageSider").then(n.bind(null,"dccb"))},c={components:{ztable:i,pageSider:o},data:function(){var t;return{tableData:[{id:"123123123",index:1,bthno:"YY0044",curcnt:1e3,totalDeadOut:20,avgMatingDate:"2019/05/15",avgBirthDate:"2019/06/05"},{id:"123123123",index:1,bthno:"YY0045",curcnt:1e3,totalDeadOut:20,avgMatingDate:"2019/05/15",avgBirthDate:"2019/06/05"},{id:"2452212",index:1,bthno:"YY0046",curcnt:1400,totalDeadOut:20,avgMatingDate:"2019/05/15",avgBirthDate:"2019/06/05"},{id:"asjkh2",index:1,bthno:"YY0047",curcnt:4e3,totalDeadOut:212,avgMatingDate:"2019/05/15",avgBirthDate:"2019/06/05"},(t={id:"asdokuj12op5"},a(t,"id","123123123"),a(t,"index",1),a(t,"bthno","YY0048"),a(t,"curcnt",1200),a(t,"totalDeadOut",241),a(t,"avgMatingDate","2019/05/15"),a(t,"avgBirthDate","2019/06/05"),t)],columns:[{title:"序号",key:"index",width:70},{title:"配种批次号",key:"bthno",width:200},{title:"当前存栏",key:"curcnt",width:100},{title:"累计死淘",key:"totalDeadOut",width:200},{title:"平均配种时间",key:"avgMatingDate",width:200},{title:"平均分娩时间",key:"avgBirthDate",width:200}],pageInfo:{page:1,pageSize:50,total:2e3}}},methods:{rowTapHandler:function(e){t.navigateTo({url:"/pages/boarInfo/boarDetail/boarDetail?id=".concat(e.id),success:function(t){},fail:function(){},complete:function(){}})},back:function(){t.navigateBack({})}},computed:{pageNum:function(){return Math.ceil(this.pageInfo.total/this.pageInfo.pageSize)}}};e.default=c}).call(this,n("6e42")["default"])},e72a:function(t,e,n){"use strict";n.r(e);var a=n("ccfa"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a}},[["770c","common/runtime","common/vendor"]]]);