# form 表单组件

---
## Attributes 属性

### rules
form表单的验证规则

* 类型 object
* 可选值 
* 默认值 

### formData
表单的数据，key：value键值对

* 类型 Object
* 可选值 
* 默认值 

### formConfig
表单的配置数据，控制表单的样式风格

* 类型 Array/Object
* 可选值 
* 默认值 

```
Array 格式
// 普通模式下的formConfig: 
[
  {  // formItem
    ...
  },
];

// card模式下的formConfig:
[
  {
    title: '',  // card的标题
    children: [
      {  // formItem
        ...
      },
    ]
  }
]

Object格式
// 普通模式下的formConfig: 
{
  字段的key值: {  // formItem
    ...
  },
};

// card模式下的formConfig:
[
  {
    title: '',  // card的标题
    children: {
      字段的key值: {  // formItem
        ...
      },
    }
  }
]
```
** formItem **
formConfig中的item对象
* type formItem的类型
   * 类型 String
   * 可选值 ''/text/input/select/radio/checkbox/cascader/timer/timePicker/datePicker/slot
   * 默认值 
* label 标签文本
   * 类型 String
   * 可选值 
   * 默认值 
* labelWidth 标签文本宽度
   * 类型 String/Number
   * 可选值 
   * 默认值 
* size formItem的大小
   * 类型 String
   * 可选值 空/small
   * 默认值 
* hidden formItem是否隐藏
   * 类型 Boolean
   * 可选值 
   * 默认值 false
* prop formItem的字段名
   * 类型 String
   * 可选值 
   * 默认值
* propGroup formItem的字段名数组（当value是数组时，并且最后的结果需要不同字段对应时使用，如：datePicker的daterange）
   * 类型 Array
   * 可选值 
   * 默认值
* props type中对应的elementui组件的属性
   * 类型 Object
   * 可选值 
   * 默认值
* rules formItem的验证规则
   * 类型 object
   * 可选值 
   * 默认值
* col formItem的宽度 24栅格布局 与width不能共用
   * 类型 Number
   * 可选值 
   * 默认值
* width formItem的宽度 px或者% 与col不能共用
   * 类型 String
   * 可选值 
   * 默认值
* slotName formItem中type为slot时 slot的名字
   * 类型 String
   * 可选值 
   * 默认值
* slotType 使用slot时 是否将整个formItem都替换掉 
   * 类型 String
   * 可选值 空/'item'  //为item时会把整个formItem都替换掉
   * 默认值
* options type为select/cascader时的options 
   * 类型 Array
   * 可选值 
   * 默认值
* radios type为radio时的radio对象
   * 类型 Array
   * 可选值 
   * 默认值
* checkboxs type为checkboxs时的checkboxs对象
   * 类型 Array
   * 可选值 
   * 默认值

### type
form表单的展示方式，普通表单和card模式的表单

* 类型 Number
* 可选值 1/2
* 默认值 1

### isRow
是否每个formItem都做为一行展示

* 类型 Boolean
* 可选值 
* 默认值 false

### footActive
是否显示底部按钮

* 类型 Boolean
* 可选值 
* 默认值 false

---


## Slot 插槽

### formConfig中type为slot的item的slotName
formItem自定义的内容

---


## Events 事件

### change
formData的change事件 每次修改formItem的value都会触发

### submit
form的提交事件

### cancel
form的取消事件

### reset
form的重置事件

### this.$refs[formName].submitForm()
触发form的提交事件，可以验证form校验规则

### this.$refs[formName].resetForm()
触发form的重置事件，可以清除数据并重置表单的校验状态