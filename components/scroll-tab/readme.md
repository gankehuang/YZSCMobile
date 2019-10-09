## scroll-tab使用:

### 参数 

| 参数名 | 是否必须 | 说明 | 
|---|:--:|:---:|
| navList | 是 | nav的集合 结构:[{name:'基础资料'},{name: '调入档案'}] |
| v-model | 是 | 双向绑定当前选中的tab下标数字格式 |
| showExpend | 否 | 是否出现折叠图标，默认不出现 |
| bgColor | 否 | 选项卡背景颜色,默认白色,支持所有css颜色 |
| textColor | 否 | 文字颜色,默认灰色,支持所有css颜色 |
| bgColor | 否 | 被选中时的文字颜色和被选中下边框的颜色,默认蓝色,支持所有css颜色 |

### 事件

事件名 | 说明
:--:|:--:
 ontabChanged (val) | tab改变时触发，val为当前tab下标
 