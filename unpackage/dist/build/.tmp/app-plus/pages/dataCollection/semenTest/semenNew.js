(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/dataCollection/semenTest/semenNew"],{"1b48":function(e,t,a){"use strict";var d=function(){var e=this,t=e.$createElement;e._self._c},n=[];a.d(t,"a",function(){return d}),a.d(t,"b",function(){return n})},"1f5a":function(e,t,a){"use strict";a.r(t);var d=a("1b48"),n=a("e444");for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);a("9eff");var i=a("2877"),s=Object(i["a"])(n["default"],d["a"],d["b"],!1,null,null,null);t["default"]=s.exports},2008:function(e,t,a){},"88ed":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var d=function(){return Promise.all([a.e("common/vendor"),a.e("components/z-table/z-table")]).then(a.bind(null,"5668"))},n=function(){return a.e("components/uni-icon/uni-icon").then(a.bind(null,"f151"))},r={data:function(){var e=this.getDate({format:!0});return{array:["请选择配种时段","美国","巴西","日本"],array1:["白色","淡黄色"],array2:["正常","不正常"],array3:["优","良","中","差"],index:0,date:e,neddCheck:!1,submitStatus:!0,editStatus:!1,tableData:[{id:"01",index:"01",sowcard:"Y001",hgg:"xx",hgm:"xx",rzs:"xx",qxs:"xx",mny:"xx",sts:"xx",hts:"xx"},{id:"02",index:"02",sowcard:"Y002",hgg:"xx",hgm:"xx",rzs:"xx",qxs:"xx",mny:"xx",sts:"xx",hts:"xx"},{id:"03",index:"03",sowcard:"Y003",hgg:"xx",hgm:"xx",rzs:"xx",qxs:"xx",mny:"xx",sts:"xx",hts:"xx"},{id:"04",index:"04",sowcard:"Y004",hgg:"xx",hgm:"xx",rzs:"xx",qxs:"xx",mny:"xx",sts:"xx",hts:"xx"},{id:"05",index:"05",sowcard:"Y005",hgg:"xx",hgm:"xx",rzs:"xx",qxs:"xx",mny:"xx",sts:"xx",hts:"xx"}],columns:[{title:"序号",key:"index",width:70},{title:"公猪耳号",key:"sowcard",width:150},{title:"颜色",key:"hgg",width:100},{title:"气味",key:"hgm",width:100},{title:"原精量",key:"rzs",width:100},{title:"密度",key:"qxs",width:100},{title:"畸形率",key:"mny",width:100},{title:"死胎数",key:"sts",width:100},{title:"精液评级",key:"hts",width:100}],tableData1:[{id:"01",index:"01",sowcard:"DDZBBK31200",grade:"杜洛克",boarcard:"公猪",breeder:"1.2",date:"7"},{id:"02",index:"02",sowcard:"DDZBBK31200",grade:"杜洛克",boarcard:"公猪",breeder:"1.2",date:"7"},{id:"03",index:"03",sowcard:"DDZBBK31200",grade:"杜洛克",boarcard:"公猪",breeder:"1.2",date:"7"},{id:"04",index:"04",sowcard:"DDZBBK31200",grade:"杜洛克",boarcard:"公猪",breeder:"1.2",date:"7"},{id:"01",index:"01",sowcard:"DDZBBK31200",grade:"杜洛克",boarcard:"公猪",breeder:"1.2",date:"7"},{id:"02",index:"02",sowcard:"DDZBBK31200",grade:"杜洛克",boarcard:"公猪",breeder:"1.2",date:"7"},{id:"03",index:"03",sowcard:"DDZBBK31200",grade:"杜洛克",boarcard:"公猪",breeder:"1.2",date:"7"},{id:"04",index:"04",sowcard:"DDZBBK31200",grade:"杜洛克",boarcard:"公猪",breeder:"1.2",date:"7"},{id:"01",index:"01",sowcard:"DDZBBK31200",grade:"杜洛克",boarcard:"公猪",breeder:"1.2",date:"7"}],columns1:[{title:"序号",key:"index",width:70},{title:"仔猪国标号",key:"sowcard",width:180},{title:"品种",key:"grade",width:150},{title:"性别",key:"boarcard",width:150},{title:"出生重",key:"breeder",width:150},{title:"左乳头",key:"date",width:200}]}},computed:{startDate:function(){return this.getDate("start")},endDate:function(){return this.getDate("end")}},components:{ztable:d,uniIcon:n},methods:{bindPickerChange:function(e){console.log("picker发送选择改变，携带值为",e.target.value," at pages/dataCollection/semenTest/semenNew.vue:569"),this.index=e.target.value},bindDateChange:function(e){this.date=e.target.value},getDate:function(e){var t=new Date,a=t.getFullYear(),d=t.getMonth()+1,n=t.getDate();return"start"===e?a-=60:"end"===e&&(a+=2),d=d>9?d:"0"+d,n=n>9?n:"0"+n,"".concat(a,"-").concat(d,"-").concat(n)},clickEdit:function(){this.neddCheck=!0,this.editStatus=!0,this.submitStatus=!1},clickCancel:function(){this.neddCheck=!1,this.editStatus=!1,this.submitStatus=!0}}};t.default=r},"9eff":function(e,t,a){"use strict";var d=a("2008"),n=a.n(d);n.a},e444:function(e,t,a){"use strict";a.r(t);var d=a("88ed"),n=a.n(d);for(var r in d)"default"!==r&&function(e){a.d(t,e,function(){return d[e]})}(r);t["default"]=n.a}},[["c2fc","common/runtime","common/vendor"]]]);