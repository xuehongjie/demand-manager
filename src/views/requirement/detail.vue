<template>
  <d2-container class="page-requirement-detail">
    <el-row> 标题：{{ requirement.title }} </el-row>
    <el-row>
      需求描述：
      <div v-html="requirement.description"></div>
    </el-row>
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8"></el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <j-form :form-config="formConfig" :form-data="requirement" @submit="formSubmit" ref="jForm">
      <template #description="">11</template>
    </j-form>
  </d2-container>
</template>
<script>
import { statusMap } from '@/map/requirement/status';

export default {
  name: 'RequirementPublish',
  data() {
    return {
      query: {},
      requirement: {}, // 项目信息
      formConfig: {
        title: {
          type: 'input',
          label: '标题',
          props: {
            type: 'text',
          },
          rules: [{ required: true, message: '标题不能为空' }],
        },
        description: {
          type: 'slot',
          slotName: 'description',
          label: '需求描述',
          props: {},
          rules: [{ required: true, message: '需求描述不能为空' }],
        },
        type: {
          type: 'select',
          label: '缺陷类型',
          width: 200,
          props: {
            type: 'text',
          },
          options: [],
        },
        severity: {
          type: 'select',
          label: '严重程度',
          width: 200,
          props: {
            type: 'text',
          },
          options: [],
        },
        priority: {
          type: 'select',
          label: '优先级',
          width: 200,
          props: {
            type: 'text',
          },
          options: [],
        },
        status: {
          type: 'radio',
          label: '下一状态',
          options: [],
        },
      },
    };
  },
  watch: {
    $route: {
      handler(to) {
        let { query } = to;
        this.query = query || {};
        this.init();
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      let { requirementId } = this.query;
      this.initSelectOption();

      if (requirementId) {
        this.getRequirementDetail();
      }
    },
    // 初始化下拉框选项
    initSelectOption() {
      let codeList = ['requirement_type', 'requirement_priority', 'requirement_severity'];
      this.$api.getDictionary(codeList).then(res => {
        let { requirement_type: type, requirement_priority: priority, requirement_severity: severity } = res;
        this.formConfig.type.options = type || [];
        this.formConfig.priority.options = priority || [];
        this.formConfig.severity.options = severity || [];
      });
    },
    // 获取需求详情
    getRequirementDetail() {
      let { requirementId } = this.query;
      return this.$api.REQUIREMENT_DETAIL(requirementId).then(res => {
        let { status } = res;
        let statusActionMap = {
          [statusMap.todo]: [
            { label: '保持', value: status },
            { label: '接受', value: statusMap.accept },
          ],
          [statusMap.accept]: [
            { label: '保持', value: status },
            { label: '已解决', value: statusMap.done },
          ],
          [statusMap.done]: [
            { label: '保持', value: status },
            { label: '关闭', value: statusMap.closed },
          ],
        };

        console.log(res);
        this.requirement = res;
        this.formConfig.status.options = statusActionMap[status] || [{ label: '保持', value: status }];
      });
    },
    confirm() {
      this.$refs.jForm.submitForm();
    },
    formSubmit(model) {
      let { projectId, requirementId } = this.query;
      let params = {
        ...model,
        project_id: projectId,
      };
      if (requirementId) {
        params.id = requirementId;
      }
      console.log('------formSubmit-----', model);
      this.$api.REQUIREMENT_ADD_OR_UPDATE(params).then(res => {
        console.log('-------------res', res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page-requirement-detail {
  transform: translate3d(0, 0, 0);
}
</style>
