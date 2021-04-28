<template>
  <d2-container class="page-user-list">
    <j-table
      :table="tableConfig"
      :table-label="tableColumn"
      :table-data="userList"
      @click="actionClick"
      @row-click="rowClick"
    ></j-table>
    <dialog-add
      :is-edit="isEdit"
      :default-value="currentData"
      :visible.sync="showUserAdd"
      @confirm="userAdd"
    />
  </d2-container>
</template>
<script>
import { cloneDeep } from 'lodash';

import DialogAdd from './components/DialogAdd';

export default {
  name: 'userList',
  components: {
    DialogAdd,
  },
  data() {
    return {
      isEdit: false, // 是否为编辑
      query: {},
      currentData: null,
      userList: [],
      showUserAdd: false,
      tableColumn: [
        {
          label: '账号',
          prop: 'account',
        },
        {
          label: '用户名',
          prop: 'username',
        },
        {
          label: '手机号',
          prop: 'mobile',
        },
        {
          label: '邮箱',
          prop: 'email',
        },
        /* {
          type: 'operation',
          label: '操作',
          formatter: function (row, column, cellValue, index) {
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
        }, */
      ],
    };
  },
  computed: {
    tableConfig() {
      return {
        operations: [
          {
            label: '新增用户',
            size: 'small',
            type: 'primary',
            event: 'userAdd',
          },
        ],
      };
    },
  },
  methods: {
    // 初始化页面
    init() {
      this.getuserList();
    },
    // 点击tab
    handleClick(tab) {
      this.$nextTick(() => {
        this.getuserList();
      });
    },
    // 获取项目列表
    getuserList() {
      let { id } = this.query;
      let { type } = this.tabInfo || {};
      this.$api
        .SYS_USER_LIST({
          projectId: id,
          type,
        })
        .then((list) => {
          this.userList = list;
        });
    },
    actionClick(action) {
      let { clickItem } = action || {};
      let { event } = clickItem || {};

      switch (event) {
        case 'userAdd':
          this.isEdit = false;
          this.showUserAdd = true;
          break;
      }
    },
    // 点击行数据
    rowClick(rowInfo) {
      let { prop, row, clickItem = {} } = rowInfo || {};
      let { type } = clickItem || {};

      switch (prop) {
        // 点击标题时跳转
        case 'title':
          this.clickGoDetail(row);
          break;
        case 'jyf_operations':
          if (type === 'edit') {
            this.currentData = cloneDeep(row);
            this.isEdit = true;
            this.showUserAdd = true;
          }
          break;
      }
    },
    // 前往需求详情页面
    clickGoDetail(item) {
      let { id = '', project_id: projectId, title } = item || {};

      this.$router.push({
        name: 'userDetail',
        query: {
          projectId,
          userId: id,
          title: `${title}详情`,
        },
      });
    },
    // 新增用户
    userAdd(model) {
      console.log('----------model', model);
      let currentData = this.currentData || {};
      let { id } = currentData;
      console.log('------------currentData', currentData);
      this.$api
        .USER_ADD_OR_UPDATE({
          id,
          ...model,
        })
        .then((res) => {
          this.init();
        });
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.page-user-list {
  transform: translate3d(0, 0, 0);
}
</style>
