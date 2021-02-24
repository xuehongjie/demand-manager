<template>
  <d2-container class="page-requirement-publish">
    <j-form
      :form-config="formConfig"
      :form-data="requirement"
      @submit="formSubmit"
      @cancel="close"
      ref="jForm"
      foot-active
    ></j-form>
  </d2-container>
</template>
<script>
import { statusMap } from '@/map/requirement/status';
import { typeMap } from '@/map/requirement/type';

export default {
  name: 'RequirementPublish',
  data() {
    return {
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
      // 缺陷才请求严重程度等下拉选项
      if (`${type}` === typeMap.bug) {
        this.initSelectOption();
      }

      if (requirementId) {
        this.getRequirementDetail();
      }
    },
    // 初始化下拉框选项
    initSelectOption() {
      let codeList = ['requirement_priority', 'requirement_severity'];
      this.$api.getDictionary(codeList).then(res => {
        let { requirement_priority: priority, requirement_severity: severity } = res;
        this.formConfig.priority.options = priority || [];
        this.formConfig.severity.options = severity || [];
      });
    },
    // 获取用户列表
    getUserList() {
      return this.$api.SYS_USER_LIST().then(list => {
        this.formConfig.handler_id.options = list || [];
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
        this.requirement = {
          ...this.requirement,
          ...res,
        };
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
        this.close();
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
