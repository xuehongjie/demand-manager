<template>
  <div>
    <!-- 弹窗  -->
    <div v-if="visible" class="local" :style="{ width: width }">
      <div class="localcoment" :class="fullscreen === true ? 'localcoment-full' : ''" :style="{ width: width }">
        <!-- 标题 -->
        <div class="localTitle">
          <span>{{ title }}</span>

          <div class="close-icon">
            <i class="el-icon-circle-close" @click="handleClose"></i>
          </div>
        </div>
        <div class="locaLine"></div>
        <!-- 内容 -->
        <div class="coment" :style="getStyle">
          <slot></slot>
        </div>

        <!-- 按钮 -->
        <div class="messageOperation" v-if="!$slots['footer'] && footActive">
          <div class="bottomLocaLine"></div>
          <div>
            <el-button class="botton" size="mini" @click="handleClose">取消</el-button>
            <el-button class="botton" type="primary" size="mini" @click="confirm">确认</el-button>
          </div>
        </div>
        <div class="messageOperation" v-if="$slots['footer']">
          <div class="bottomLocaLine"></div>
          <slot name="footer"></slot>
        </div>
      </div>

      <!-- 弹窗 -->
      <div :class="fullscreen === true ? 'back-full' : 'back'" v-if="visible" @click="handleClose"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'j-dialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    width: {
      type: String,
      default: '40%',
    },
    height: {
      type: String,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    footActive: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    getStyle: function() {
      let style = {};
      if (this.height && this.height !== '') {
        let height = this.height.split('px')[0] - 55 - 1 - 20;
        if (this.$slots.footer || this.footActive) {
          height = height - 60;
        }
        style = {
          height: height + 'px',
          maxHeight: 'none',
        };
      }
      return style;
    },
  },
  methods: {
    /**
     * 关闭弹窗
     */
    handleClose() {
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    // 确认
    confirm() {
      this.$emit('confirm');
    },
  },
  mounted() {},
};
</script>
<style scoped>
.local .localcoment {
  background: #ffffff;
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  top: 20%;
  left: 200px;
  right: 0px;
  z-index: 1800;
  border-radius: 4px;
}
.local .localcoment .coment {
  overflow-x: hidden;
  padding: 10px;
  max-height: 500px;
}
.local .localcoment .locaLine {
  width: 100%;
  border-top: 1px solid #eeeff5;
  position: relative;
  box-sizing: border-box;
}
.local .localcoment .messageOperation {
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.local .localcoment .messageOperation .bottomLocaLine {
  position: absolute;
  width: calc(100% - 6px);
  height: calc(100% - 3px);
  left: 3px;
  box-shadow: 0px -2px 10px 0px rgba(244, 245, 250, 1);
  pointer-events: none;
}
.local .localcoment .messageOperation .botton {
  width: 120px;
  height: 30px;
}
.local .localcoment .messageOperation-slot {
  position: relative;
  width: 100%;
  height: 60px;
}

.local .localcoment .messageOperation-slot .bottomLocaLine {
  position: absolute;
  width: calc(100% - 6px);
  height: calc(100% - 3px);
  left: 3px;
  box-shadow: 0px -2px 10px 0px rgba(244, 245, 250, 1);
  pointer-events: none;
}

.local .localcoment-full {
  top: 15%;
  left: 0;
  right: 0;
  z-index: 2100;
}
.local .localcoment-full .coment {
  overflow-x: hidden;
  padding: 10px;
  max-height: 550px;
}
.local .localTitle {
  position: relative;
  width: 100%;
  height: 55px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}
.local .localTitle span {
  color: #333333;
  font-size: 18px;
}
.local .localTitle .close-icon {
  position: absolute;
  top: -20px;
  right: -35px;
  font-size: 30px;
  color: #fff;
}
.local .localTitle .close-icon i:hover {
  cursor: pointer;
  color: #999;
}
.local .back {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: #000;
  z-index: 1700;
}
.local .back-full {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: #000;
  z-index: 2000;
}
</style>
