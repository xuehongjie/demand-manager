<template>
  <d2-container class="page-requirement-publish">
    <j-form :form-config="formConfig" :form-data="requirement" @submit="formSubmit" ref="jForm" foot-active></j-form>
  </d2-container>
</template>
<script>
export default {
  name: 'RequirementPublish',
  props: {
    // 项目id
    projectId: {
      type: [Number, String],
      default: '',
    },
    // 是否展示弹窗
    visible: {
      type: Boolean,
      default: false,
    },
    // 表单默认值
    defaultValue: {
      type: Object,
      default() {
        return {};
      },
    },
  },
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
          type: 'input',
          label: '需求描述',
          props: {
            type: 'textarea',
          },
          rules: [{ required: true, message: '需求描述不能为空' }],
        },
        type: {
          type: 'select',
          label: '缺陷类型',
          props: {
            type: 'text',
          },
          options: [],
        },
        severity: {
          type: 'select',
          label: '严重程度',
          props: {
            type: 'text',
          },
          options: [],
        },
        priority: {
          type: 'select',
          label: '优先级',
          props: {
            type: 'text',
          },
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
        console.log(res);
        this.requirement = res;
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
.page-requirement-publish {
  transform: translate3d(0, 0, 0);
}
</style>
