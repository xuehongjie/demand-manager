<template>
  <d2-container class="page-requirement-publish">
    <j-form
      :form-config="formConfig"
      :form-data="requirement"
      @submit="formSubmit"
      @cancel="close"
      ref="jForm"
      foot-active
      v-loading="loading"
      is-row
    ></j-form>
  </d2-container>
</template>
<script>
import { typeMap } from '@/map/requirement/type';

export default {
  name: 'RequirementPublish',
  data() {
    return {
      loading: false,
      query: {},
      requirement: {}, // 项目信息
      formConfig: {},
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
      let { requirementId, type } = this.query;
      let formConfigMap = {
        1: require('@/views/requirement/config/requirement').default,
        2: require('@/views/requirement/config/bug').default,
      };
      this.formConfig = formConfigMap[type];
      this.requirement.type = type;

      this.getUserList();
      this.initSelectOption();

      if (requirementId) {
        this.getRequirementDetail();
      }
    },
    // 初始化下拉框选项
    initSelectOption() {
      let { type } = this.query;

      let codeList = ['requirement_priority', 'requirement_severity'];
      this.$api.getDictionary(codeList).then(res => {
        let { requirement_priority: priority, requirement_severity: severity } = res;
        this.formConfig.priority.options = priority || [];
        // 缺陷才请求严重程度等下拉选项
        if (`${type}` === typeMap.bug) {
          this.formConfig.severity.options = severity || [];
        }
      });
    },
    // 获取用户列表
    getUserList() {
      let { projectId } = this.query;
      return this.$api.SYS_USER_LIST({ projectId }).then(list => {
        if (this.formConfig.handler_id) {
          this.formConfig.handler_id.options = list || [];
        }
      });
    },
    // 获取需求详情
    getRequirementDetail() {
      let { requirementId } = this.query;
      this.loading = true;
      return this.$api
        .REQUIREMENT_DETAIL(requirementId)
        .then(res => {
          console.log(res);
          this.requirement = {
            ...this.requirement,
            ...res,
          };
        })
        .finally(() => {
          this.loading = false;
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
      delete params.typeText;
      delete params.severityText;
      delete params.priorityText;
      console.log('------formSubmit-----', model);
      this.loading = true;
      this.$api
        .REQUIREMENT_ADD_OR_UPDATE(params)
        .then(res => {
          console.log('-------------res', res);
          this.loading = false;
          this.close();
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 关闭当前页面
    close() {
      let { resolved } = this.$router.resolve(this.$route);
      let { fullPath } = resolved;
      this.$store.dispatch('d2admin/page/close', { tagName: fullPath });
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.page-requirement-publish {
  transform: translate3d(0, 0, 0);
}
</style>
