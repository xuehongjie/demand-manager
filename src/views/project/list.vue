<template>
  <d2-container class="page-project-list">
    <div class="project-wrapper" v-for="(project, index) in projectList" :key="index" @click="projectClick(project)">
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div class="project-image">
          <i class="iconfont icon-project"></i>
        </div>
        <el-row type="flex" class="project-info">
          <el-col :span="16">{{ project.name }}</el-col>
          <el-col class="operation-wrapper" :span="8">
            <el-button
              class="button-operation"
              type="text"
              icon="el-icon-edit-outline"
              @click.stop="editClick(project)"
            ></el-button>
            <el-button
              class="button-operation"
              type="text"
              icon="el-icon-delete"
              @click.stop="deleteClick(project)"
            ></el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="project-wrapper project-add" @click="showProjectAdd = true">
      <el-card :body-style="{ padding: '0px' }">
        <div class="project-image">
          <i class="el-icon-plus"></i>
        </div>
        <div class="project-info">新建</div>
      </el-card>
    </div>

    <!-- 新建项目 -->
    <dialog-add :default-value="currentData" :visible.sync="showProjectAdd" @confirm="projectAdd" />
    <dialog-delete :visible.sync="showProjectDelete" @confirm="projectDelete" />
  </d2-container>
</template>

<script>
import DialogAdd from './components/DialogAdd';
import DialogDelete from './components/DialogDelete';

export default {
  name: 'ProjectList',
  components: {
    DialogAdd,
    DialogDelete,
  },
  data() {
    return {
      projectList: [],
      showProjectAdd: false, // 是否展示添加弹窗
      showProjectDelete: false, // 是否展示删除弹窗
      currentData: null, // 当前点击的数据
    };
  },
  methods: {
    // 初始化页面
    init() {
      this.getProjectList();
    },
    // 获取项目列表
    getProjectList() {
      this.$api.PROJECT_LIST().then(res => {
        let { list } = res;

        this.projectList = list;
      });
    },
    // 点击项目
    projectClick(project) {
      console.log(project);
      let { id, name } = project;
      this.$router.push({
        name: 'requirementList',
        query: {
          id,
          title: name,
        },
      });
    },
    // 点击编辑按钮
    editClick(project) {
      this.currentData = project;
      this.showProjectAdd = true;
    },
    // 点击删除按钮
    deleteClick(project) {
      this.currentData = project;
      this.showProjectDelete = true;
    },
    // 添加项目
    projectAdd(project) {
      this.$api.PROJECT_ADD_OR_UPDATE(project).then(res => {
        this.getProjectList();
      });
    },
    // 删除项目
    projectDelete() {
      let { id } = this.currentData;
      this.$api.PROJECT_DELETE(id).then(res => {
        this.currentData = null;
        this.getProjectList();
      });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.page-project-list {
  transform: translate3d(0, 0, 0);
  .project-wrapper {
    float: left;
    width: 160px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 0;
    cursor: pointer;
    &::after {
      content: '';
      clear: both;
    }
    .project-image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 160px;
      background-color: #f6f6f6;
    }
    .icon-project {
      color: #ccc;
      font-size: 80px;
    }
    .project-info {
      padding: 5px 8px;
      font-size: 12px;
    }
    .operation-wrapper {
      text-align: center;
    }
    .button-operation {
      padding: 0;
      & + .button-operation {
        margin-left: 5px;
      }
    }
  }
  .project-add {
    /* 加号 */
    .el-icon-plus {
      color: #ccc;
      font-size: 80px;
    }
    .project-info {
      text-align: center;
    }
  }
}
</style>
