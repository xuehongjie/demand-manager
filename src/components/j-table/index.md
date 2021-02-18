# table 表格组件

---
## Attributes 属性

### table
表格的基础配置 同elementui

* 类型 object
* 可选值 
* 默认值 

** 额外新增属性 **
* operations table左上方按钮
   * 类型 Array
   * 可选值 
   * 默认值 
   * 示例 [{
      ...el-button,
      lable: '',  //按钮文字
   }]
* isSelect 是否开启selection
   * 类型 Boolean
   * 可选值 
   * 默认值 

### tableLabel
表格的列配置

* 类型 Array
* 可选值 
* 默认值 

** item **
tableLabel中的item对象
* type item的类型
   * 类型 String
   * 可选值 空/''/input/select/inputNumber/html/checkbox/switch/img/link/operation/slot
   * 默认值 
* showTip switch的类型
   * 类型 Boolean
   * 说明 true则有弹窗，false则没有
* confirmText switch的弹窗文本
   * 类型 Srting
   * 说明 通常为启用弹窗的文本
* cancelText switch的弹窗文本
   * 类型 Srting
   * 说明 通常为停用弹窗的文本
* label 列文本
   * 类型 String
   * 可选值 
   * 默认值 
* width 列宽度
   * 类型 String/Number
   * 可选值 
   * 默认值 
* props type中对应的elementui组件的属性
   * 类型 Object
   * 可选值 
   * 默认值
   * 说明 重新实现了部分组件的disabled属性，可以是Boolean和Function两种类型 function(row, column, cellValue, index)
* tooltipProp 显示提示框时提示框内容对应的字段
   * 类型 String
   * 可选值 空/small
   * 默认值 
* tooltipIcon 显示提示框时提示框的小图标
   * 类型 String
   * 可选值 
   * 默认值 
* tooltipIconProp 如果根据行内容显示图标 指定对应的行内数据的字段
   * 类型 String
   * 可选值 
   * 默认值
* operations type为operation时可以指定当前列默认的操作按钮
   * 类型 Array
   * 可选值 
   * 默认值
   * 示例 [{
      ...el-button,
      lable: '',  //按钮文字
   }]
* showMax operations显示的个数
   * 类型 Number
   * 可选值 
   * 默认值 3
* slotName formItem中type为slot时 slot的名字
   * 类型 String
   * 可选值 
   * 默认值
* ...elementui中Table-column的属性

### tableData
表格的数据

* 类型 Array
* 可选值 
* 默认值 

### imgSrcPrefix
列的type为img时图片的前缀

* 类型 String
* 可选值 
* 默认值 ''

### defaultImage
列的type为img的默认图片

* 类型 String
* 可选值 
* 默认值 '/images/custom1576820344369.png'

---


## Slot 插槽

### tableLabel中type为slot的item的slotName
table自定义的内容

---


## Events 事件

### row-change
table行数据的change事件 每次修改单元格的value都会触发

### click
table左上角的button点击事件

### row-click
行数据中可点击元素的点击事件 link和operations

### selection-change
selection的change事件 选中行或者去掉选中行时触发

### sort-change
排序事件