<template>
  <d2-container class="page-requirement-list">
    <el-tabs v-model="activeTab" @tab-click="handleClick">
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
      @click="actionClick"
      @row-click="rowClick"
    ></j-table>
  </d2-container>
</template>
<script>
import { typeMap } from '@/map/requirement/type';

export default {
  name: 'RequirementList',
  data() {
    return {
      query: {},
      currentData: null,
      activeTab: '1', // 当前选择的页签
      requirementList: [],
      showRequirementAdd: false,
      tabList: [
        {
          name: '需求',
          value: '1',
          type: '1',
          operations: [
            {
              label: '新增需求',
              size: 'small',
              type: 'primary',
              event: 'requirementPublish',
            },
          ],
        },
        {
          name: '缺陷',
          value: '2',
          type: '2',
          operations: [
            {
              label: '新增缺陷',
              size: 'small',
              type: 'primary',
              event: 'bugPublish',
            },
          ],
        },
      ],
      tableColumn: [
        {
          label: '标题',
          prop: 'title',
          type: 'link',
        },
        {
          label: '状态',
          prop: 'statusText',
        },
        {
          label: '处理人',
          prop: 'handler_name',
        },
        {
          label: '创建人',
          prop: 'creater_name',
        },
        {
          type: 'operation',
          label: '操作',
          formatter: function(row, column, cellValue, index) {
            let { permissionDelete } = this.permissions || {};
            if (permissionDelete) {
              return [
                ...cellValue,
                {
                  type: 'detele',
                  label: '删除',
                },
              ];
            } else {
              return cellValue;
            }
          },
          operations: [
            {
              type: 'edit',
              label: '编辑',
            },
          ],
        },
      ],
    };
  },
  computed: {
    tabInfo() {
      let activeTab = this.activeTab;
      return this.tabList.find(item => item.value === activeTab);
    },
    tableConfig() {
      let { operations } = this.tabInfo;
      return {
        operations,
      };
    },
  },
  watch: {
    $route: {
      handler(to) {
        let { query } = to;
        this.query = query || {};
        this.init();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 初始化页面
    init() {
      this.getRequirementList();
    },
    // 点击tab
    handleClick(tab) {
      this.$nextTick(() => {
        this.getRequirementList();
      });
    },
    // 获取项目列表
    getRequirementList() {
      let { id } = this.query;
      let { type } = this.tabInfo || {};
      this.$api
        .REQUIREMENT_LIST({
          projectId: id,
          type,
        })
        .then(res => {
          let { list } = res;

          this.requirementList = list;
        });
    },
    actionClick(action) {
      let { clickItem } = action || {};
      let { event } = clickItem || {};

      switch (event) {
        case 'requirementPublish':
          this.clickGoPublish();
          break;
        case 'bugPublish':
          this.clickGoPublish();
          break;
      }
    },
    // 前往发布需求页面
    clickGoPublish(item) {
      let titleMap = {
        [typeMap.requment]: '发布需求',
        [typeMap.bug]: '发布缺陷',
      };
      let { id: projectId = '' } = this.query;
      let { id = '', title } = item || {};
      let { type } = this.tabInfo || {};
      let routeName = 'requirementPublish';
      let query = {
        projectId,
        requirementId: id,
        type,
        title: title || titleMap[type],
      };

      if (id) {
        routeName = 'requirementEdit';
      }

      this.$router.push({
        name: routeName,
        query,
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
        case 'jyf_operations':
          this.clickGoPublish(row);
          break;
      }
    },
    // 前往需求详情页面
    clickGoDetail(item) {
      let { id = '', project_id: projectId, title } = item || {};

      this.$router.push({
        name: 'requirementDetail',
        query: {
          projectId,
          requirementId: id,
          title: `${title}详情`,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page-requirement-list {
  transform: translate3d(0, 0, 0);
}
</style>
