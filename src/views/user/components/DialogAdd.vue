<template>
  <el-dialog
    title="新增项目"
    width="500px"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
  >
    <div class="dialog-add-wrapper">
      <el-form
        label-width="80px"
        :model="user"
        :rules="rules"
        ref="form"
      >
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input v-model="user.account"></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          v-if="!isEdit"
        >
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="mobile"
        >
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="mini"
        @click="dialogVisible = false"
      >取 消</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="confirm"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { cloneDeep } from 'lodash';

export default {
  name: 'DialogAdd',
  props: {
    // 是否展示弹窗
    visible: {
      type: Boolean,
      default: false,
    },
    // 表单默认值
    defaultValue: {
      type: Object,
      default() {
        return {};
      },
    },
    // 是否为编辑
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false, // 是否展示弹窗
      user: {
        account: '',
        username: '',
        password: '',
        email: '',
        mobile: '',
      }, // 项目信息
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
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
          this.initData();
        }
        this.$emit('update:visible', val);
      },
    },
    defaultValue: {
      handler(val) {
        if (val) {
          this.user = cloneDeep(val);
        } else {
          this.initData();
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 初始化数据
    initData() {
      this.user = {
        account: '',
        username: '',
        password: '',
        email: '',
        mobile: '',
      };
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('confirm', cloneDeep(this.user));
          this.dialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
