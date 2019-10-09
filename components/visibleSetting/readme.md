## 设置
### 参数
| 参数 | 必选 | 说明 | 
| --- | ---- | ----- |
| list | 是 | 设置列表,主要是三个字段,name,enable,disabled |
| keyForName | 否 | 默认name，用来替换显示的label |
| keyForEnable | 否 | 默认enable，用来替换switch开关的key值 |
| keyForDisabled | 否 | 默认disabled，用来替换switch禁用的key值 |

### 事件
1. `getSettingList()`,使用refs方式调用，获得当前设置列表的值

应用效果参考 boarSetting.vue