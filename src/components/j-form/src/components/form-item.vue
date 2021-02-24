<template>
  <div class="form-item" :class="'form-item--' + formItemConfig.size">
    <div class="form-item-wrapper" :class="formType == 1 ? 'normal' : 'card'">
      <div class="form-item-label" :style="labelStyle">
        {{ formItemConfig.label }}
        <span v-if="formItemConfig.required === true">*</span>
      </div>
      <div class="form-item-content">
        <!-- text 文本 -->
        <el-form-item
          v-if="!formItemConfig.type || formItemConfig.type == 'text'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <div class="text" v-html="formData[formItemConfig.prop]"></div>
          </div>
        </el-form-item>
        <!-- input 输入框 -->
        <el-form-item
          v-if="formItemConfig.type == 'input'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <el-input
              v-model="formData[formItemConfig.prop]"
              v-bind="formItemConfig.props"
              clearable
              @input="inputChange"
            ></el-input>
          </div>
        </el-form-item>
        <!-- inputNumber 计数器 -->
        <el-form-item
          v-if="formItemConfig.type == 'inputNumber'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <el-input-number
              v-model="formData[formItemConfig.prop]"
              v-bind="formItemConfig.props"
              :min="formItemConfig.props && formItemConfig.props.min ? formItemConfig.props.min : 0"
              @change="inputNumberChange"
              class="inputNumber"
            ></el-input-number>
          </div>
        </el-form-item>
        <!-- select 选择器 -->
        <el-form-item
          v-else-if="formItemConfig.type == 'select'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <el-select
              v-model="formData[formItemConfig.prop]"
              v-bind="formItemConfig.props"
              clearable
              @change="selectChange"
              style="width:100%;"
            >
              <el-option
                v-for="(item, index) in formItemConfig.options"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- radio 单选框 -->
        <el-form-item
          v-else-if="formItemConfig.type == 'radio'"
          :v-bind="formItemConfig"
          :rules="formItemConfig.rules"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <el-radio-group
              v-model="formData[formItemConfig.prop]"
              v-bind="formItemConfig.props"
              @change="radioChange"
              class="content-padding radio-group"
            >
              <el-radio
                v-for="(item, index) in formItemConfig.options"
                :key="index"
                :label="item.value"
                :disabled="item.disabled"
                :border="item.border"
                :size="item.size"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </div>
        </el-form-item>
        <!-- checkbox 多选框 -->
        <el-form-item
          v-else-if="formItemConfig.type == 'checkbox'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <el-checkbox-group
              v-model="formData[formItemConfig.prop]"
              v-bind="formItemConfig.props"
              @change="checkboxChange"
              class="content-padding checkbox-group"
            >
              <el-checkbox
                v-for="(item, index) in formItemConfig.options"
                :key="index"
                :label="item.value"
                :disabled="item.disabled"
                :border="item.border"
                :size="item.size"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </el-form-item>
        <!-- cascader 级联选择器 -->
        <el-form-item
          v-else-if="formItemConfig.type == 'cascader'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <el-cascader
              v-model="formData[formItemConfig.prop]"
              v-bind="formItemConfig.props"
              :options="formItemConfig.options"
              clearable
              @change="cascaderChange"
              class="cascader"
            ></el-cascader>
          </div>
        </el-form-item>
        <!-- timer 定时器 -->
        <el-form-item
          v-else-if="formItemConfig.type == 'timer'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <timer :value="formData[formItemConfig.prop]" @change="timerChange" class="content-padding"></timer>
          </div>
        </el-form-item>
        <!-- timePicker 时间选择器 -->
        <el-form-item
          v-else-if="formItemConfig.type == 'timePicker'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <el-time-picker
              v-model="formData[formItemConfig.prop]"
              v-bind="formItemConfig.props"
              clearable
              @change="timePickerChange"
              class="picker"
            >
            </el-time-picker>
          </div>
        </el-form-item>
        <!-- datePicker 日期时间选择器 -->
        <el-form-item
          v-else-if="formItemConfig.type == 'datePicker'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <el-date-picker
              v-model="formData[formItemConfig.prop]"
              v-bind="formItemConfig.props"
              :value-format="
                formItemConfig.props && formItemConfig.props.valueFormat
                  ? formItemConfig.props.valueFormat
                  : 'yyyy-MM-dd'
              "
              :range-separator="
                formItemConfig.props && formItemConfig.props.rangeSeparator ? formItemConfig.props.rangeSeparator : '至'
              "
              :start-placeholder="
                formItemConfig.props && formItemConfig.props.startPlaceholder
                  ? formItemConfig.props.startPlaceholder
                  : '开始时间'
              "
              :end-placeholder="
                formItemConfig.props && formItemConfig.props.endPlaceholder
                  ? formItemConfig.props.endPlaceholder
                  : '结束时间'
              "
              clearable
              @change="datePickerChange"
              class="picker"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <!-- datePicker 富文本编辑器 -->
        <el-form-item
          v-else-if="formItemConfig.type == 'editor'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border">
            <d2-quill v-model="formData[formItemConfig.prop]"></d2-quill>
          </div>
        </el-form-item>
        <!-- slot 自定义 -->
        <el-form-item
          v-else-if="formItemConfig.type == 'slot'"
          v-bind="formItemConfig"
          :required="undefined"
          label=""
          labelWidth=""
          :prop="formItemProp"
        >
          <div class="form-item-content-border" style="padding: 0 15px">
            <slot name="itemContent"></slot>
          </div>
        </el-form-item>
      </div>
    </div>
  </div>
</template>
<script>
// import uploadImage from './uploadImage.vue';
// import uploadVideo from './uploadVideo.vue';
// import uploadFile from './uploadFile.vue';
// import imageAndText from './imageAndText.vue';
import timer from './timer.vue';
export default {
  data() {
    return {};
  },
  components: {
    // uploadImage,
    // uploadVideo,
    // uploadFile,
    // imageAndText,
    timer,
  },
  props: {
    // 配置数据
    formItemConfig: {
      type: Object,
    },
    // form的数据
    formData: {
      type: Object,
    },
    formType: {
      type: [Number, String],
    },
  },
  computed: {
    labelStyle: function() {
      let obj = {};
      if (this.formItemConfig.labelWidth) {
        obj.width = this.formItemConfig.labelWidth.toString().split('px')[0] + 'px';
      }
      return obj;
    },
    formItemProp: function() {
      return this.formItemConfig.prop;
    },
  },
  created() {
    // console.log(this.formItemConfig)
  },
  methods: {
    // input 输入框 的input事件
    inputChange(value) {
      if (this.formItemConfig.type === 'number') {
        value = parseInt(value);
      }
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    // inputNumber 计数器 的change事件
    inputNumberChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    // select 选择器 的change事件
    selectChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    // radio 单选框 的change事件
    radioChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    // checkbox 多选框 的change事件
    checkboxChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    // cascader 级联选择器 的change事件
    cascaderChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    uploadImageChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    uploadVideoChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    imageAndTextChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    // timer 定时器 的change事件
    timerChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    // timePicker 时间选择器 的change事件
    timePickerChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    // datePicker 日期时间选择器 的change事件
    datePickerChange(value) {
      if (this.formItemConfig.propGroup) {
        this.formItemConfig.propGroup.forEach((ele, index) => {
          if (value) {
            this.formData[ele] = value[index] ? value[index] : null;
          } else {
            this.formData[ele] = null;
          }
        });
      }
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
    // editor 富文本编辑器 的change事件
    editorChange(value) {
      this.$emit('formItemChange', {
        prop: this.formItemConfig.prop,
        value: value,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.form-item {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 22px;
  ::v-deep {
    .ql-editor {
      min-height: 200px;
    }
  }
}
.form-item-wrapper {
  display: flex;
}
.form-item-label {
  width: 120px;
  display: flex;
  /* align-items: center; */
  background-color: #f4f5fa;
  box-sizing: border-box;
  padding: 0 10px;
  color: #606266;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-left: 1px solid;
  border-color: #e8e8e8;
  border-radius: 4px 0px 0px 4px;
  line-height: 40px;
  font-size: 14px;
}
.form-item-label span {
  padding-left: 3px;
  color: #f74f17;
}
.form-item-content {
  flex: 1;
}
/* 不同size下的样式 -------- start */
.form-item--small {
  margin-bottom: 20px;
}
.form-item--small .form-item-label {
  line-height: 32px;
}
.form-item--small .radio-group {
  line-height: 32px;
}
.form-item--small .checkbox-group {
  height: 32px;
}
.form-item--medium {
  margin-bottom: 22px;
}
.form-item--medium .form-item-label {
  line-height: 36px;
}
.form-item--medium .radio-group {
  line-height: 36px;
}
.form-item--medium .checkbox-group {
  height: 36px;
}
/* 不同size下的样式 -------- end */
/* 正常模式 */
.normal ::v-deep .el-form-item__content {
  position: relative;
  height: 100%;
}
.normal .form-item-content-border {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: #e8e8e8;
  border-radius: 0px 4px 4px 0px;
  margin-right: 30px;
}

/* card模式下的样式 */
/* 设置错误提示在右边 */
.card ::v-deep .el-form-item__content {
  position: relative;
  height: 100%;
}
.card .form-item-content-border {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: #e8e8e8;
  border-radius: 0px 4px 4px 0px;
  margin-right: 180px;
}
.card ::v-deep .el-form-item__error {
  position: absolute;
  width: 180px;
  height: 100%;
  top: 0;
  right: 0;
  left: auto;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 0;
  box-sizing: border-box;
}

/* 修改样式 */
::v-deep .el-form-item {
  margin-bottom: 0;
  height: 100%;
}
::v-deep .el-input__inner {
  border: 0;
}
::v-deep .el-textarea__inner {
  border: 0;
}
.text {
  padding: 0 15px;
}
.inputNumber {
  width: 100%;
}
.radio-group {
  display: flex;
  align-items: center;
}
.cascader {
  width: 100%;
}
.content-padding {
  padding: 0 15px;
}
.picker {
  width: 100%;
}
.fullWidth {
  width: 100%;
}
</style>
