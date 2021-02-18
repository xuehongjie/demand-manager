<template>
  <div class="card">
    <div class="card-header">
      <div class="head-title">
        <div class="head-left-line"></div>
        <span>{{ cardConfig.title }}</span>
      </div>
    </div>
    <div class="card-body">
      <!-- 一行排列一个 -->
      <template v-if="isRow === true">
        <el-row v-for="(item, index) in cardConfig.children" :key="index">
          <!-- 指定col时 -->
          <el-col v-if="item.col" v-show="!item.hidden" :span="item.col">
            <slot v-if="item.slotType === 'item'" :name="`formItem${index}`"></slot>
            <formItem
              v-else
              :formData="formData"
              :formItemConfig="item"
              :formType="type"
              @formItemChange="formItemChange"
            >
              <template v-if="item.type === 'slot'" slot="itemContent">
                <slot :name="`formItem${index}`"></slot>
              </template>
            </formItem>
          </el-col>
          <!-- 指定width时 -->
          <div v-else class="el-col-" :style="{ width: item.width }">
            <slot v-if="item.slotType === 'item'" :name="`formItem${index}`"></slot>
            <formItem
              v-else
              :formData="formData"
              :formItemConfig="item"
              :formType="type"
              @formItemChange="formItemChange"
            >
              <template v-if="item.type === 'slot'" slot="itemContent">
                <slot :name="`formItem${index}`"></slot>
              </template>
            </formItem>
          </div>
        </el-row>
      </template>
      <!-- 一行排列多个 -->
      <template v-else>
        <el-row>
          <template v-for="(item, index) in cardConfig.children">
            <!-- 指定col时 -->
            <el-col v-if="item.col" v-show="!item.hidden" :key="index" :span="item.col">
              <slot v-if="item.slotType === 'item'" :name="`formItem${index}`"></slot>
              <formItem
                v-else
                :formData="formData"
                :formItemConfig="item"
                :formType="type"
                @formItemChange="formItemChange"
              >
                <template v-if="item.type === 'slot'" slot="itemContent">
                  <slot :name="`formItem${index}`"></slot>
                </template>
              </formItem>
            </el-col>
            <!-- 指定width时 -->
            <div v-else v-show="!item.hidden" class="el-col-" :key="index" :style="{ width: item.width }">
              <slot v-if="item.slotType === 'item'" :name="`formItem${index}`"></slot>
              <formItem
                v-else
                :formData="formData"
                :formItemConfig="item"
                :formType="type"
                @formItemChange="formItemChange"
              >
                <template v-if="item.type === 'slot'" slot="itemContent">
                  <slot :name="`formItem${index}`"></slot>
                </template>
              </formItem>
            </div>
          </template>
        </el-row>
      </template>
    </div>
  </div>
</template>
<script>
import formItem from './form-item.vue';
export default {
  components: {
    formItem,
  },
  props: {
    // 配置数据
    cardConfig: {
      type: Object,
    },
    // form的数据
    formData: {
      type: [Array, Object],
    },
    type: {
      type: [String, Number],
      default: 1,
    },
    // 是否每个formItem都做为一行展示
    isRow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formItemChange(params) {
      this.$emit('cardChange', params);
    },
  },
};
</script>
<style scoped>
.card {
  width: 100%;
  border: 1px solid #ebeef5;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
}

.card-header {
  width: 100%;
  padding-top: 20px;
}
.head-left-line {
  position: absolute;
  width: 4px;
  height: 90%;
  left: 0;
  top: 5%;
  background-color: black;
  border-radius: 0 4px 4px 0;
}
.head-title {
  position: relative;
  padding: 0 20px;
  font-size: 18px;
  font-weight: bold;
}
.card-body {
  padding: 20px;
  padding-bottom: 0;
}
</style>
