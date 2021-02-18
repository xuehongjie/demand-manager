<template>
  <d2-container class="page-requirement-list">
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
export default {
  name: 'RequirementList',
  data() {
    return {
      query: {},
      currentData: null,
      requirementList: [],
      showRequirementAdd: false,
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
        {
          label: '处理人',
          prop: 'handler',
        },
        {
          label: '创建人',
          prop: 'creater',
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
      tableConfig: {
        operations: [
          {
            label: '新增需求',
            size: 'small',
            type: 'primary',
            event: 'requirementPublish',
          },
        ],
      },
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
    actionClick(action) {
      let { clickItem } = action || {};
      let { event } = clickItem || {};

      if (event === 'requirementPublish') {
        this.clickGoPublish();
      }
    },
    // 前往发布需求页面
    clickGoPublish(item) {
      let { id: projectId = '' } = this.query;
      let { id = '' } = item || {};
      let routeName = 'requirementPublish';

      if (id) {
        routeName = 'requirementEdit';
      }

      this.$router.push({
        name: routeName,
        query: {
          projectId,
          requirementId: id,
        },
      });
    },
    // 点击行数据
    rowClick(rowInfo) {
      let { prop, row } = rowInfo || {};

      switch (prop) {
        // 点击标题时跳转
        case 'title':
          this.clickGoPublish(row);
          break;
        case 'jyf_operations':
          this.clickGoPublish(row);
          break;
      }
    },
  },
  created() {
    let { query } = this.$route;
    this.query = query || {};
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.page-requirement-list {
  transform: translate3d(0, 0, 0);
}
</style>
