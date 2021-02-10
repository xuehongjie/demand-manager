<template>
  <d2-container class="page-requirement-list">
    <el-row>
      <el-button type="primary" size="mini" @click="dialogVisible = true">新增</el-button>
    </el-row>
    <el-table :data="requirementList" style="width: 100%">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="levelText" label="严重程度"> </el-table-column>
      <el-table-column prop="priorityText" label="优先级"> </el-table-column>
      <el-table-column prop="statusText" label="状态"> </el-table-column>
      <el-table-column prop="handler" label="处理人"> </el-table-column>
      <el-table-column prop="creater" label="创建人"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

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
  </d2-container>
</template>
<script>
export default {
  name: 'RequirementList',
  data() {
    return {
      rules: [],
      requirement: {},
      requirementList: [
        {
          title: '需求1',
          level: '一般',
          priority: '高',
          handler: '测试',
          creater: '开发',
        },
        {
          title: '需求2',
          level: '一般',
          priority: '中',
          handler: '测试2',
          creater: '开发2',
        },
        {
          title: '需求3',
          level: '一般',
          priority: '低',
          handler: '测试3',
          creater: '开发3',
        },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    // 初始化页面
    init() {
      this.getRequirementList();
    },
    // 获取项目列表
    getRequirementList() {
      this.$api.REQUIREMENT_LIST().then(res => {
        let { list } = res;

        this.requirementList = list;
      });
    },
    handleClick() {},
    confirm() {},
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.page-requirement-list {
  transform: translate3d(0, 0, 0);
}
</style>
