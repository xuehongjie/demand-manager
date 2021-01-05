<template>
  <el-dialog title="新增项目" width="40%" :visible.sync="dialogVisible" :modal-append-to-body="false">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'DialogAdd',
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  },
};
</script>
<style lang="scss" scoped></style>
