<template>
  <d2-container class="page-requirement-list">
    <el-row>
      <el-button type="primary" size="mini" @click="showRequirementAdd = true">新增</el-button>
    </el-row>
    <el-table :data="requirementList" style="width: 100%">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="severityText" label="严重程度"> </el-table-column>
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
    <dialog-add :default-value="currentData" :visible.sync="showRequirementAdd" @confirm="requirementAdd" />
  </d2-container>
</template>
<script>
import DialogAdd from './components/DialogAdd';

export default {
  name: 'RequirementList',
  components: {
    DialogAdd,
  },
  data() {
    return {
      query: {},
      currentData: null,
      requirementList: [],
      showRequirementAdd: false,
    };
  },
  methods: {
    // 初始化页面
    init() {
      this.getRequirementList();
    },
    // 获取项目列表
    getRequirementList() {
      let { id } = this.query;
      this.$api
        .REQUIREMENT_LIST({
          projectId: id,
        })
        .then(res => {
          let { list } = res;

          this.requirementList = list;
        });
    },
    handleClick() {},
    confirm() {},
    requirementAdd() {},
  },
  created() {
    let { query } = this.$route;
    this.query = query;
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.page-requirement-list {
  transform: translate3d(0, 0, 0);
}
</style>
