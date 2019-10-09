## page列表组件

### 使用指南
``` javascript
// 引入弹框组件
import popupLayer from '@/components/popup/popup-layer.vue';
// 引入page组件
import listPage from '@/components/popup-list-page';
// 注册组件
components: {
    popupLayer,
    listPage
},
```

### 代码演示

#### 基础用法

```html
<popup-layer ref="popupRef" :direction="'right'">
    <list-page
	 @selectPages="selectPages"
	 >
	 </list-page>
</popup-layer>
```

```js
export default {
  data() {
    return {
      boolShow:false,
    };
  },
  methods:{
      show(){
          this.$refs.popupRef.show(); // 或者 boolShow = rue
      },
      close(){
          this.$refs.popupRef.close();// 或者 boolShow = false
      }
  }
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| direction | 组件弹出方向top，bottom，left，right | `String` | `top` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @selectPages | emit子组件page的数值页 | `Number` |


