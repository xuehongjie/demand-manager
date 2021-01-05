<template>
  <el-dialog title="删除项目" width="300px" :visible.sync="dialogVisible" :modal-append-to-body="false">
    <div>
      确定要删除该项目吗？
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'DialogDelete',
  props: {
    // 是否展示弹窗
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false, // 是否展示弹窗
    };
  },
  watch: {
    visible: {
      handler(val) {
        this.dialogVisible = val;
      },
      immediate: true,
    },
    dialogVisible: {
      handler(val) {
        this.$emit('update:visible', val);
      },
    },
  },
  methods: {
    confirm() {
      this.dialogVisible = false;
      this.$emit('confirm');
    },
  },
};
</script>
<style lang="scss" scoped></style>
