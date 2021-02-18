<template>
  <div>
    <el-checkbox v-model="checkbox" :disabled="disabled" @change="checkboxChange" class="checkbox">
      设定
    </el-checkbox>
    <el-date-picker
      v-model="value_"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      size="mini"
      placeholder="选择日期时间"
      @change="datePickerChange"
      class="date-picker"
    >
    </el-date-picker>
    <span class="tips">系统会在该时间自动进行上架操作</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkbox: false,
      disabled: false,
      value_: '',
      checkboxChangeFlag: false,
    };
  },
  props: {
    value: {
      type: [Array, Date, Number, String],
    },
  },
  methods: {
    // 设定checkbox的勾选事件
    checkboxChange(value) {
      // 当勾选上时将时间传递给父组件，当去掉勾选时当空字符串传给父组件，并将checkboxChangeFlag设置为true，以防止value_的修改
      if (value === true) {
        this.$emit('change', this.value_);
      } else {
        this.checkboxChangeFlag = true;
        this.$emit('change', '');
      }
    },
    datePickerChange(value) {
      if (value !== null) {
        this.disabled = false;
      } else {
        this.disabled = true;
        if (this.checkbox === true) {
          this.checkbox = false;
          this.$emit('change', '');
        }
      }
    },
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        if (this.checkboxChangeFlag) {
          this.checkboxChangeFlag = false;
          return;
        }
        if (newValue !== this.value_) {
          this.value_ = newValue;
        }
        if (!newValue) {
          this.checkbox = false;
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.checkbox {
  margin-right: 15px;
}
.date-picker {
  margin-right: 15px;
}
::v-deep .el-input__inner {
  background-color: #f8f8f8;
}
.tips {
  color: #999999;
  font-size: 12px;
}
</style>
