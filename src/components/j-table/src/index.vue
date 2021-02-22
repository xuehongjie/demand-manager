<template>
  <div class="j-table">
    <div v-if="table.tips">{{ table.tips }}</div>
    <div class="header-button" v-if="table && table.operations && table.operations.length > 0">
      <template v-for="(item, index) in table.operations">
        <el-button v-bind="item" :key="index" @click="tableOperationsClick(item)">{{ item.label }}</el-button>
      </template>
    </div>
    <el-table
      v-bind="table"
      :stripe="true"
      :data="tableData_"
      @selection-change="selectionChange"
      @sort-change="sortChange"
    >
      <!-- 选择框 -->
      <el-table-column
        v-if="table.isSelect && table.isSelect === true && tableLabel && tableLabel.length > 0"
        type="selection"
      >
      </el-table-column>
      <template v-for="(item, index) in tableLabel">
        <!-- 插槽 -->
        <el-table-column v-if="item.type === 'slot'" :key="'column-' + index" v-bind="item" type="">
          <template slot-scope="scope">
            <slot :name="item.slotName" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <!-- 普通文本 -->
        <!-- 由于el-table-column使用插槽之后el-table-column的formatter会失效，而普通文本的formatter使用比较多，所以这里做一下特殊处理 -->
        <template v-else-if="item.type === '' || !item.type">
          <el-table-column v-if="item.tooltipProp" :key="'column-' + index" v-bind="item" type="">
            <template slot-scope="scope">
              <template class="tooltipbox" v-if="scope.row[item.tooltipProp]">
                {{ scope.row[item.prop] }}
                <el-tooltip effect="dark" placement="right" :content="scope.row[item.tooltipProp].toString()">
                  <i
                    class="tooltipIcon1"
                    :class="
                      scope.row[item.tooltipIconProp]
                        ? scope.row[item.tooltipIconProp]
                        : item.tooltipIcon
                        ? item.tooltipIcon
                        : 'el-icon-chat-dot-square'
                    "
                  ></i>
                </el-tooltip>
              </template>
            </template>
          </el-table-column>
          <el-table-column v-else :key="'column-' + index" v-bind="item" type=""> </el-table-column>
        </template>
        <!-- 其他 -->
        <el-table-column v-else :key="'column-' + index" v-bind="item" type="">
          <template slot-scope="scope">
            <div class="tooltipbox" v-if="scope.row[item.tooltipProp]">
              <columnContent
                :columnItem="item"
                :scope="scope"
                :imgSrcPrefix="imgSrcPrefix"
                :defaultImage="defaultImage"
                @change="rowDataChange"
                @linkClick="linkClick"
                @operationClick="operationClick"
              ></columnContent>
              <el-tooltip effect="dark" placement="right" :content="scope.row[item.tooltipProp].toString()">
                <i
                  class="tooltipIcon"
                  :class="
                    scope.row[item.tooltipIconProp]
                      ? scope.row[item.tooltipIconProp]
                      : item.tooltipIcon
                      ? item.tooltipIcon
                      : 'el-icon-chat-dot-square'
                  "
                ></i>
              </el-tooltip>
            </div>
            <columnContent
              v-else
              :columnItem="item"
              :scope="scope"
              :imgSrcPrefix="imgSrcPrefix"
              :defaultImage="defaultImage"
              @change="rowDataChange"
              @click="rowClick"
              @operationClick="operationClick"
            ></columnContent>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import columnContent from './components/columnContent';
export default {
  name: 'j-table',
  data() {
    return {
      tableData_: [],
      selections: [],
    };
  },
  components: {
    columnContent,
  },
  props: {
    // 表格配置
    table: {
      type: Object,
      default() {
        return {};
      },
    },
    // 表格列配置
    tableLabel: {
      type: Array,
    },
    // 表格数据
    tableData: {
      type: Array,
    },
    imgSrcPrefix: {
      type: String,
      default: '',
    },
    defaultImage: {
      type: String,
      default: '/images/custom1576820344369.png',
    },
  },
  methods: {
    // 行数据的change事件
    rowDataChange(params) {
      this.tableData_[params.index][params.prop] = params.value;
      this.$emit('row-change', params);
    },
    // table表格顶部的operations的点击事件
    tableOperationsClick(item) {
      let params = {
        clickItem: item,
        selections: this.selections,
      };
      this.$emit('click', params);
    },
    // 行中可点击元素（除operation）的点击事件
    rowClick(params) {
      this.$emit('row-click', params);
    },
    // operation的点击事件
    operationClick(params) {
      this.$emit('row-click', params);
    },
    // 当选择项发生变化时会触发该事件
    selectionChange(selection) {
      this.selections = selection;
      this.$emit('selection-change', selection);
    },
    // 当表格的排序条件发生变化的时候会触发该事件
    sortChange(params) {
      this.$emit('sort-change', params);
    },
    initTableLabel(data) {
      data.forEach(ele => {
        if (!ele.prop && ele.operations) {
          ele.prop = 'jyf_operations';
        }
      });
    },
    initData(data) {
      this.tableData_ = data;
      // console.log(this.tableData_)
    },
  },
  mounted() {
    // console.log(this.tableLabel,this.tableData)
  },
  watch: {
    tableData: {
      handler(newValue, oldValue) {
        this.initData(newValue);
      },
      deep: true,
      immediate: true,
    },
    tableLabel: {
      handler(newValue, oldValue) {
        this.initTableLabel(newValue);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.header-button {
  padding: 10px 0;
}
.tooltipbox {
  display: flex;
}
.tooltipIcon {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 2px;
}
.tooltipIcon1 {
  cursor: pointer;
}
::v-deep .el-table thead th {
  background: #f4f5fa;
}
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f4f5fa;
}
</style>
