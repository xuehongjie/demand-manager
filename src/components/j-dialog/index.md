# dialog 弹窗组件

---
## Attributes 属性

### visible
控制dialog的显示隐藏支持 .sync 修饰符

* 类型 boolean
* 可选值 
* 默认值 false

### title
dialog的标题

* 类型 string
* 可选值 
* 默认值 

### width
dialog的宽度 可以是px和%

* 类型 string
* 可选值 
* 默认值 '40%'

### fullscreen
是否为全屏 Dialog

* 类型 boolean
* 可选值 
* 默认值 false

### footActive
是否显示底部按钮

* 类型 boolean
* 可选值 
* 默认值 false

---
## Slot 插槽

### 
Dialog 的内容

### footer
Dialog 底部按钮操作区的内容


---
## Events 事件

### close
Dialog 关闭事件 点击取消、右上角的x、和遮罩区域触发

### confirm
Dialog 确定按钮点击事件