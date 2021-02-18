<template>
  <div class="wrapper">
    <el-form ref="jyf_form" :model="formData" :rules="rules">
      <!-- 普通form表单 -->
      <template v-if="type == 1">
        <div class="formItem-body">
          <!-- 一行排列一个 -->
          <template v-if="isRow === true">
            <el-row v-for="(item, index) in formConfig_" :key="index">
              <!-- 指定col时 -->
              <el-col v-if="item.col" v-show="!item.hidden" :span="item.col">
                <slot v-if="item.slotType === 'item'" :name="item.slotName" :formItem="item" :itemIndex="index"></slot>
                <formItem v-else :formData="formData" :formItemConfig="item" :formType="type" @formItemChange="formItemChange">
                  <template v-if="item.type === 'slot'" slot="itemContent">
                    <slot :name="item.slotName" :value="formData[item.prop]" :formItem="item" :itemIndex="index"></slot>
                  </template>
                </formItem>
              </el-col>
              <!-- 指定width时 -->
              <div v-else v-show="!item.hidden" class="el-col-" :style="{ width: item.width }">
                <slot v-if="item.slotType === 'item'" :name="item.slotName" :formItem="item" :itemIndex="index"></slot>
                <formItem v-else :formData="formData" :formItemConfig="item" :formType="type" @formItemChange="formItemChange">
                  <template v-if="item.type === 'slot'" slot="itemContent">
                    <slot :name="item.slotName" :value="formData[item.prop]" :formItem="item" :itemIndex="index"></slot>
                  </template>
                </formItem>
              </div>
            </el-row>
          </template>
          <!-- 一行排列多个 -->
          <template v-else>
            <el-row>
              <template v-for="(item, index) in formConfig_">
                <!-- 指定col时 -->
                <el-col v-if="item.col" v-show="!item.hidden" :key="index" :span="item.col">
                  <slot v-if="item.slotType === 'item'" :name="item.slotName" :formItem="item" :itemIndex="index"></slot>
                  <formItem v-else :formData="formData" :formItemConfig="item" :formType="type" @formItemChange="formItemChange">
                    <template v-if="item.type === 'slot'" slot="itemContent">
                      <slot :name="item.slotName" :value="formData[item.prop]" :formItem="item" :itemIndex="index"></slot>
                    </template>
                  </formItem>
                </el-col>
                <!-- 指定width时 -->
                <div v-else v-show="!item.hidden" class="el-col-" :key="index" :style="{ width: item.width }">
                  <slot v-if="item.slotType === 'item'" :name="item.slotName" :formItem="item" :itemIndex="index"></slot>
                  <formItem v-else :formData="formData" :formItemConfig="item" :formType="type" @formItemChange="formItemChange">
                    <template v-if="item.type === 'slot'" slot="itemContent">
                      <slot :name="item.slotName" :value="formData[item.prop]" :formItem="item" :itemIndex="index"></slot>
                    </template>
                  </formItem>
                </div>
              </template>
            </el-row>
          </template>
        </div>
      </template>
      <!-- card模式的form表单 -->
      <template v-else>
        <card
          v-for="(item, index) in formConfig_"
          :key="index"
          :cardConfig="item"
          :formData="formData"
          :type="type"
          :isRow="isRow"
          @cardChange="cardChange"
        >
          <template v-if="item.slots.length > 0">
            <template v-for="ele in item.slots">
              <template :slot="`formItem${ele.slotIndex}`">
                <slot :name="ele.slotName" :value="formData[ele.item.prop]" :formItem="ele.item" :itemIndex="ele.slotIndex" :cardIndex="index"></slot>
              </template>
            </template>
          </template>
        </card>
      </template>
      <el-form-item v-if="footActive">
        <el-button type="primary" size="small" @click="submitForm">保存并返回 </el-button>
        <el-button size="small" @click="cancelForm">取消 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import card from './components/card.vue';
import formItem from './components/form-item.vue';
let _ = require('lodash');
export default {
  name: 'j-form',
  data() {
    return {
      formConfig_: [],
    };
  },
  components: {
    card,
    formItem,
  },
  props: {
    // from的验证规则
    rules: {
      type: [Array, Object],
    },
    // form表单的样式/风格配置
    /**
     * ----示例----
     * 普通模式下的formConfig: [
          {
            id: 'test1',
            type: 'input',
            label: '分类',
            // labelWidth: 100,
            col: 12,
            props: {
              type: 'text',
              maxlength: 10,
              showWordLimit: true,
            },
            rules: [
              { type: 'number', message: '年龄必须为数字值'}
            ]
          },
        ];
     * card模式下的formConfig: [
          {
            title: '基本信息',
            children: [
              {
                id: 'test1',
                type: 'input',
                label: '分类',
                // labelWidth: 100,
                col: 12,
                props: {
                  type: 'text',
                  maxlength: 10,
                  showWordLimit: true,
                },
                rules: [
                  { type: 'number', message: '年龄必须为数字值'}
                ]
              },
            ]
          }
        ]
     */
    formConfig: {
      type: [Array, Object],
    },
    // form的数据
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * form的展示模式
     * 1：不开启card模式，普通的form表单
     * 2：开启card模式的表单
     */
    type: {
      type: [String, Number],
      default: 1,
    },
    // 是否每个formItem都做为一行展示
    isRow: {
      type: Boolean,
      default: false,
    },
    footActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // card中的formItem的值改变时触发的事件
    cardChange(params) {
      // 删除自动填充的key
      Object.keys(this.formData).forEach(ele => {
        if (ele.indexOf('el_component') != -1) {
          this.$delete(this.formData, ele);
        }
      });
      this.$emit('change', params);
    },
    // formItem中的值改变时触发的事件
    formItemChange(params) {
      // 删除自动填充的key
      Object.keys(this.formData).forEach(ele => {
        if (ele.indexOf('el_component') != -1) {
          this.$delete(this.formData, ele);
        }
      });
      this.$emit('change', params);
    },
    // 表单的提交事件
    submitForm() {
      this.$refs.jyf_form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 表单的取消事件
    cancelForm() {
      this.$emit('cancel', this.formData);
    },
    // 表单的重置事件
    resetForm() {
      let data = this.formConfig_;
      if (this.type == 1) {
        data.forEach((ele, index) => {
          if (ele.propGroup) {
            ele.propGroup.forEach(e => {
              this.formData[e] = null;
            });
          }
        });
      } else if (this.type == 2) {
        data.forEach((ele, index) => {
          ele.children.forEach((e, i) => {
            if (e.propGroup) {
              e.propGroup.forEach(e_ => {
                this.formData[e_] = null;
              });
            }
          });
        });
      }
      this.$refs.jyf_form.resetFields();
      this.$emit('reset', this.formData);
    },
    // 初始化解析数据  重构formConfig 原因是form组件的model只能接收Object
    initData(data) {
      data = _.cloneDeep(data);
      if (this.type == 1) {
        if (Array.isArray(data)) {
          data.forEach((ele, index) => {
            // 解析rules
            if (ele.rules) {
              ele.rules.forEach(item => {
                if (item.required && item.required === true) {
                  // label旁边的*
                  this.$set(ele, 'required', true);
                }
              });
            }
            ele = this.setFormItem(ele);
          });
        } else {
          let data_ = [];
          Object.keys(data).forEach(ele => {
            // 解析rules
            if (data[ele].rules) {
              data[ele].rules.forEach(item => {
                if (item.required && item.required === true) {
                  // label旁边的*
                  this.$set(data[ele], 'required', true);
                }
              });
            }
            data[ele].prop = ele;
            data[ele] = this.setFormItem(data[ele]);
            data_.push({
              ...data[ele],
            });
          });
          data = data_;
        }
      } else {
        data.forEach((ele, index) => {
          ele.slots = [];
          if (Array.isArray(ele.children)) {
            ele.children.forEach((e, i) => {
              // 解析slot
              if (e.type === 'slot') {
                ele.slots.push({
                  slotName: e.slotName,
                  slotIndex: i,
                  item: e,
                });
              }
              // 解析rules
              if (e.rules) {
                e.rules.forEach(item => {
                  if (item.required && item.required === true) {
                    // label旁边的*
                    this.$set(ele.children[i], 'required', true);
                  }
                });
              }
              e = this.setFormItem(e);
            });
          } else {
            let data_ = [];
            Object.keys(ele.children).forEach((e, i) => {
              let e_ = ele.children[e];
              // 解析slot
              if (e_.type === 'slot') {
                ele.slots.push({
                  slotName: e_.slotName,
                  slotIndex: i,
                  item: e_,
                });
              }
              // 解析rules
              if (e_.rules) {
                e_.rules.forEach(item => {
                  if (item.required && item.required === true) {
                    // label旁边的*
                    this.$set(e_, 'required', true);
                  }
                });
              }
              e_.prop = e;
              e_ = this.setFormItem(e_);
              data_.push({
                ...e_,
              });
            });
            ele.children = data_;
          }
        });
      }

      this.formConfig_ = data;
      this.analysisRules(this.rules);
    },

    // 设置formitem的属性
    setFormItem(ele) {
      // 设置size
      if (ele.size) {
        if (ele.props && !ele.props.size) {
          this.$set(ele.props, 'size', ele.size);
        } else if (!ele.props) {
          this.$set(ele, 'props.size', ele.size);
        }
      } else if (!ele.size) {
        ele.size = 'small';
        if (ele.props && !ele.props.size) {
          this.$set(ele.props, 'size', ele.size);
        } else if (!ele.props) {
          this.$set(ele, 'props.size', ele.size);
        }
      }
      if (!ele.col && !ele.width) {
        ele.col = 24;
      }
      // 自动填充key
      if (ele.prop == undefined) {
        ele.prop = 'el_component' + Math.ceil(Math.random() * 10000);
      }
      // 为组件赋初始化值
      if (ele.propGroup) {
        ele.propGroup.forEach(e => {
          this.$set(this.formData, e, null);
        });
      } else if (ele.prop && this.formData[ele.prop] === undefined && ele.prop.indexOf('el_component') == -1) {
        this.$set(this.formData, ele.prop, null);
      }
      return ele;
    },
    // 解析rules
    analysisRules(rules) {
      if (rules && this.type == 1) {
        Object.keys(rules).forEach((ele, index) => {
          this.formConfig_.forEach((e, i) => {
            if (e.prop === ele) {
              this.$set(e, 'required', true);
            }
          });
        });
      } else if (rules && this.type == 2) {
        Object.keys(rules).forEach((ele, index) => {
          this.formConfig_.forEach((e, i) => {
            e.children.forEach(e_ => {
              if (e_.prop === ele) {
                this.$set(e_, 'required', true);
              }
            });
          });
        });
      }
    },
  },
  mounted() {
    // console.log('mounted',this.formConfig)
  },
  watch: {
    formConfig: {
      handler(newValue, oldValue) {
        this.initData(newValue);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.box-card {
  margin-bottom: 10px;
}
.formItem-body {
  padding: 0 10px;
}
</style>
