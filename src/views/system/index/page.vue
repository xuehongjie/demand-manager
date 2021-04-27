<template>
  <d2-container class="page-home">
    <el-tabs v-model="activeTab" @tab-click="handleClick" v-if="tabList.length">
      <el-tab-pane :name="item.value" v-for="(item, index) in tabList" :key="index">
        <template slot="label">
          <el-badge :max="99" :value="item.todo_count">
            <div class="tab-label">{{ item.name }}</div>
          </el-badge>
        </template>
      </el-tab-pane>
    </el-tabs>
    <j-table
      :table="tableConfig"
      :table-label="tableColumn"
      :table-data="requirementList"
      @row-click="rowClick"
    ></j-table>
    <!-- <template slot="footer">
      <el-pagination></el-pagination>
    </template> -->
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      activeTab: '', // 当前选择的页签
      tabList: [], // tab列表
      tableColumn: [
        {
          label: '标题',
          prop: 'title',
          type: 'link',
        },
        {
          label: '严重程度',
          prop: 'severityText',
        },
        {
          label: '优先级',
          prop: 'priorityText',
        },
        {
          label: '状态',
          prop: 'statusText',
        },
      ],
      tableConfig: {},
      requirementList: [],
    };
  },
  computed: {
    tabInfo() {
      let activeTab = this.activeTab;
      return this.tabList.find(item => item.value === activeTab);
    },
  },
  methods: {
    init() {
      this.getTabList();
    },
    getTabList() {
      this.$api.PROJECT_TAB_LIST().then(list => {
        let [first] = list;
        let { value } = first || {};

        this.activeTab = value;
        this.tabList = list;

        if (list.length) {
          this.$nextTick(() => {
            this.getRequirementList();
          });
        }
      });
    },
    // 获取项目列表
    getRequirementList() {
      let { id } = this.tabInfo;
      this.$api
        .REQUIREMENT_TODO_LIST({
          projectId: id,
        })
        .then(res => {
          let { list } = res;

          this.requirementList = list;
        });
    },
    // 点击tab
    handleClick(tab) {
      this.$nextTick(() => {
        this.getRequirementList();
      });
    },
    // 点击行数据
    rowClick(rowInfo) {
      let { prop, row } = rowInfo || {};

      switch (prop) {
        // 点击标题时跳转
        case 'title':
          this.clickGoDetail(row);
          break;
      }
    },
    // 前往需求详情页面
    clickGoDetail(item) {
      let { id = '', project_id: projectId } = item || {};

      this.$router.push({
        name: 'requirementDetail',
        query: {
          projectId,
          requirementId: id,
        },
      });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.page-home {
  ::v-deep {
    .d2-container-full {
      > .d2-container-full__body {
        display: flex;
        flex-direction: column;
        padding: 10px !important;
      }
    }

    .el-tabs__nav-scroll {
      padding-top: 10px;
    }
  }
  .tab-label {
    padding: 0 5px;
  }
}
</style>
