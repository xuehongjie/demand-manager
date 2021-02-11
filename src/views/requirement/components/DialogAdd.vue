<template>
  <el-dialog title="新增需求" top="1vh" width="500px" :visible.sync="dialogVisible" :modal-append-to-body="false">
    <div class="dialog-add-wrapper">
      <el-form label-width="80px" :model="requirement" :rules="rules" ref="form">
        <el-form-item label="标题" prop="name">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="需求描述" prop="desc">
          <el-input type="textarea" rows="5"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="严重程度" prop="level">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="处理人" prop="handler">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
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
  },
  data() {
    return {
      dialogVisible: false, // 是否展示弹窗
      requirement: {
        name: '',
        description: '',
      }, // 项目信息
      rules: {
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
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
          this.project = cloneDeep(val);
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
      this.project = {
        name: '',
        description: '',
      };
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('confirm', cloneDeep(this.project));
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
