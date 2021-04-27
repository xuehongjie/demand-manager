<template>
  <el-dialog
    title="新增项目"
    width="700px"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    v-loading="loading"
  >
    <div class="dialog-add-wrapper">
      <el-transfer :titles="['未授权', '已授权']" v-model="value" :data="authList"></el-transfer>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'DialogAssign',
  props: {
    // 是否展示弹窗
    visible: {
      type: Boolean,
      default: false,
    },
    projectId: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      authList: [],
      value: [],
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
        if (!val) {
          this.value = [];
        }
        this.$emit('update:visible', val);
      },
    },
    projectId: {
      handler(val) {
        this.getProjectViewer();
      },
      immediate: true,
    },
  },
  methods: {
    // 初始化数据
    init() {
      this.getAuthList();
    },
    // 获取用户列表
    getAuthList() {
      return this.$api.PROJECT_AUTH_LIST().then(res => {
        this.authList = res.map(item => {
          let { id, username } = item;
          return {
            ...item,
            key: id,
            label: username,
            disabled: false,
          };
        });
      });
    },
    // 获取可查看项目的用户列表
    getProjectViewer() {
      let projectId = this.projectId;
      if (!projectId) {
        return Promise.resolve();
      }
      return this.$api.SYS_USER_LIST({ projectId }).then(res => {
        this.value = res.map(item => item.id);
      });
    },
    confirm() {
      let ids = this.value;
      this.loading = true;
      this.$api
        .PROJECT_ASSIGN({
          projectId: this.projectId,
          ids,
        })
        .then(() => {
          this.dialogVisible = false;
          this.$emit('done');
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped></style>
