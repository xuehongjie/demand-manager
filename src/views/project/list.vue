<template>
  <d2-container class="page-project-list">
    <div class="project-wrapper" v-for="(project, index) in projectList" :key="index" @click="projectClick(project)">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="project.img" class="project-image" />
        <el-row type="flex" class="project-info">
          <el-col :span="21">{{ project.name }}</el-col>
          <el-col :span="3">
            <el-button class="button-edit" type="text" icon="el-icon-edit-outline"></el-button>
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

    <dialog-add :visible.sync="showProjectAdd" />
  </d2-container>
</template>

<script>
import api from '@/api';

import DialogAdd from './components/DialogAdd';

export default {
  name: 'ProjectList',
  components: {
    DialogAdd,
  },
  data() {
    return {
      projectList: [],
      showProjectAdd: false, // 是否展示添加弹窗
    };
  },
  methods: {
    // 初始化页面
    init() {
      this.getProjectList();
    },
    // 获取项目列表
    getProjectList() {
      api.PROJECT_LIST().then(res => {
        this.projectList = res;
      });
    },
    // 点击项目
    projectClick(project) {
      console.log(project);
    },
  },
  created() {
    this.init();
  },
  activated() {
    console.log('-------------activated--');
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
    &::after {
      content: '';
      clear: both;
    }
    .project-image {
      width: 100%;
      height: 160px;
    }
    .project-info {
      padding: 5px 8px;
      font-size: 12px;
    }
    .button-edit {
      padding: 0;
    }
  }
  .project-add {
    .project-image {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f6f6f6;
    }
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
