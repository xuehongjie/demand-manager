<template>
  <div class="columnContent">
    <!-- input 输入框 -->
    <template v-if="columnItem.type === 'input'">
      <el-input
        v-model="scope.row[columnItem.prop]"
        v-bind="columnItem.props"
        :disabled="getDisabled"
        size="small"
        clearable
        @input="inputChange"
      ></el-input>
    </template>
    <!-- select 选择器 -->
    <template v-else-if="columnItem.type === 'select'">
      <el-select
        v-model="scope.row[columnItem.prop]"
        v-bind="columnItem.props"
        :disabled="getDisabled"
        size="small"
        clearable
        @change="selectChange"
        class="row-full"
      >
        <el-option v-for="(item, index) in columnItem.options" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </template>
    <!-- inputNumber 计数器 -->
    <template v-if="columnItem.type === 'inputNumber'">
      <el-input-number
        v-model="scope.row[columnItem.prop]"
        v-bind="columnItem.props"
        :disabled="getDisabled"
        size="small"
        :min="columnItem.props && columnItem.props.min ? columnItem.props.min : 0"
        @change="inputNumberChange"
        class="row-full"
      ></el-input-number>
    </template>
    <!-- html html片段 -->
    <template v-else-if="columnItem.type === 'html'">
      <div v-html="this.formatterData(scope.row[columnItem.prop])"></div>
    </template>
    <!-- checkbox 多选框 -->
    <template v-if="columnItem.type === 'checkbox'">
      <el-checkbox
        v-model="scope.row[columnItem.prop]"
        v-bind="columnItem.props"
        :disabled="getDisabled"
        @change="chechkboxChange"
      ></el-checkbox>
    </template>
    <!-- switch 开关 -->
    <template v-if="columnItem.type === 'switch'">
      <el-switch
        v-model="scope.row[columnItem.prop]"
        v-bind="columnItem.props"
        :disabled="getDisabled"
        active-text=""
        inactive-text=""
        @change="switchChange"
      >
      </el-switch>
      {{ getSwitchText }}
    </template>
    <!-- img 图片展示 -->
    <template v-if="columnItem.type === 'img'">
      <div class="img">
        <img
          :src="getImgSrc(this.formatterData(scope.row[columnItem.prop]))"
          alt=""
          @click="previewFlag = true"
          @error="imgError"
        />
        <jDialog
          v-if="previewFlag"
          :visible.sync="previewFlag"
          title="图片预览"
          :width="'30rem'"
          :fullscreen="true"
          :footActive="false"
        >
          <div class="previewImg">
            <img :src="getImgSrc(this.formatterData(scope.row[columnItem.prop]))" alt="" @error="imgError" />
          </div>
        </jDialog>
      </div>
    </template>
    <!-- link 链接 -->
    <template v-if="columnItem.type === 'link'">
      <div class="link" :class="getDisabled ? 'disabled' : ''" @click="linkClick">
        {{ formatterData(scope.row[columnItem.prop]) }}
      </div>
    </template>
    <!-- operation 操作栏 -->
    <template v-if="columnItem.type === 'operation'">
      <el-button
        type="text"
        v-for="(item, index) in getOperation"
        :key="index"
        v-bind="item"
        @click="operationClick(item)"
      >
        {{ item.label }}
      </el-button>
      <el-dropdown v-if="getOperation_dropdown.length > 0">
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in getOperation_dropdown"
            :key="index"
            v-bind="item"
            @click.native="operationClick(item)"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </div>
</template>
<script>
import jDialog from '../../../j-dialog/index';
import { defaultImage } from './defaultImage.js';
export default {
  data() {
    return {
      previewFlag: false, // 预览框是否显示
      changeFlag: false,
    };
  },
  components: {
    jDialog,
  },
  props: {
    columnItem: {
      type: Object,
    },
    scope: {
      type: Object,
    },
    imgSrcPrefix: {
      type: String,
    },
    // defaultImage: {
    //   type: String
    // }
  },
  computed: {
    // operation按钮的取值逻辑： 先取行数据里面的，再取列配置的公共数据   默认最大展示值为3
    getOperation: function() {
      let operations = this.scope.row[this.columnItem.prop]
        ? this.scope.row[this.columnItem.prop]
        : this.columnItem.operations;
      // 拦截处理数据
      operations = this.formatterData(operations);
      if (operations.length > this.columnItem.showMax ? this.columnItem.showMax : 3) {
        return operations.slice(0, this.columnItem.showMax ? this.columnItem.showMax : 3);
      } else {
        return operations;
      }
    },
    // operation按钮的取值逻辑： 先取行数据里面的，再取列配置的公共数据   默认最大展示值为3
    getOperation_dropdown: function() {
      let operations = this.scope.row[this.columnItem.prop]
        ? this.scope.row[this.columnItem.prop]
        : this.columnItem.operations;
      // 拦截处理数据
      operations = this.formatterData(operations);
      if (operations.length > this.columnItem.showMax ? this.columnItem.showMax : 3) {
        return operations.slice(this.columnItem.showMax ? this.columnItem.showMax : 3, operations.length);
      } else {
        return [];
      }
    },
    getSwitchText: function() {
      let text = '';
      if (this.columnItem && this.columnItem.props) {
        if (this.columnItem.props.activeText !== undefined && this.columnItem.props.inactiveText !== undefined) {
          if (this.columnItem.props.activeValue) {
            if (this.scope.row[this.columnItem.prop] === this.columnItem.props.activeValue) {
              text = this.columnItem.props.activeText;
            } else {
              text = this.columnItem.props.inactiveText;
            }
          }
        }
      }
      return text;
    },
    // 获取禁用状态  重新实现disabled，方便通过数据去控制禁用状态
    getDisabled: function() {
      let disabled = false;
      if (this.columnItem && this.columnItem.props && this.columnItem.props.disabled) {
        if (typeof this.columnItem.props.disabled === 'function') {
          disabled = this.columnItem.props.disabled(
            this.scope.row,
            this.scope.column,
            this.scope.row[this.columnItem.prop],
            this.scope.$index,
          );
        } else {
          disabled = this.columnItem.props.disabled;
        }
      }
      return disabled;
    },
  },
  methods: {
    getImgSrc(src) {
      if (src) {
        return src;
      } else {
        return defaultImage;
      }
    },
    // 图片的src加载不出图片时，将其替换成默认图片
    imgError(e) {
      var src = defaultImage;
      if (e.target.src.indexOf(src) < 0) {
        e.target.src = src;
      } else {
        e.target.onerror = null;
      }
    },
    inputChange(value) {
      this.$emit('change', {
        prop: this.columnItem.prop,
        index: this.scope.$index,
        value: value,
        row: this.scope.row,
      });
    },
    selectChange(value) {
      this.$emit('change', {
        prop: this.columnItem.prop,
        index: this.scope.$index,
        value: value,
        row: this.scope.row,
      });
    },
    inputNumberChange(value) {
      this.$emit('change', {
        prop: this.columnItem.prop,
        index: this.scope.$index,
        value: value,
        row: this.scope.row,
      });
    },
    chechkboxChange(value) {
      this.$emit('change', {
        prop: this.columnItem.prop,
        index: this.scope.$index,
        value: value,
        row: this.scope.row,
      });
      this.$emit('click', {
        type: this.columnItem.type,
        index: this.scope.$index,
        prop: this.columnItem.prop,
        row: this.scope.row,
      });
    },
    switchFun(value, switchCancel = false) {
      this.$emit('change', {
        prop: this.columnItem.prop,
        index: this.scope.$index,
        value: value,
        row: this.scope.row,
        switchCancel,
      });
      this.$emit('click', {
        type: this.columnItem.type,
        index: this.scope.$index,
        prop: this.columnItem.prop,
        row: this.scope.row,
        switchCancel,
      });
    },
    confirmDialog(value, content, title) {
      this.$confirm(this.columnItem.confirmText, '启用', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.switchFun(value);
        })
        .catch(() => {
          this.switchFun(value, true);
        });
    },
    switchChange(value) {
      if (this.columnItem.showTip) {
        if (value) {
          this.confirmDialog(value, this.columnItem.confirmText, '启用');
        } else {
          this.confirmDialog(value, this.columnItem.cancelText, '停用');
        }
      } else {
        this.switchFun(value);
      }
    },
    linkClick() {
      if (this.getDisabled) {
        return;
      }
      this.$emit('click', {
        type: this.columnItem.type,
        index: this.scope.$index,
        prop: this.columnItem.prop,
        row: this.scope.row,
      });
    },
    operationClick(item) {
      this.$emit('operationClick', {
        type: this.columnItem.type,
        index: this.scope.$index,
        prop: this.columnItem.prop,
        clickItem: item,
        row: this.scope.row,
      });
    },
    formatterData(value) {
      // 由于el-table-column使用slot插槽之后el-table-column自带的formatter功能失效，故再实现一次
      if (this.columnItem.formatter) {
        let res = this.columnItem.formatter(this.scope.row, this.scope.column, value, this.scope.$index);
        return res;
      } else {
        return value;
      }
    },
    initData() {
      // 由于el-table-column使用slot插槽之后el-table-column自带的formatter功能失效，故再实现一次
      // if(this.columnItem.formatter){
      //   let res = this.columnItem.formatter(this.scope.row,this.scope.column,this.scope.row[this.columnItem.prop],this.scope.$index)
      //   if(this.columnItem.prop){
      //     this.changeFlag = true
      //     this.scope.row[this.columnItem.prop] = res
      //   }
      // }
    },
  },
  watch: {
    // 'scope.row':{
    //   handler(newValue, oldValue) {
    //     if(!this.changeFlag){
    //       this.initData();
    //     }else {
    //       this.changeFlag = false
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
  },
};
</script>
<style scoped>
.row-full {
  width: 100%;
}
.img {
  width: 60px;
  height: 60px;
}
.img > img {
  width: 100%;
  height: 100%;
}
.previewImg {
  width: 100%;
  display: flex;
  justify-content: center;
}
.previewImg img {
  max-width: 100%;
}
.link {
  color: rgb(64, 158, 255);
  text-decoration: none;
  cursor: pointer;
}
.disabled {
  cursor: not-allowed;
}
</style>
