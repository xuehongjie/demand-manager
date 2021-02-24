<template>
  <d2-container class="page-requirement-detail">
    <j-form
      :form-config="formConfig"
      :form-data="requirement"
      @submit="formSubmit"
      @cancel="close"
      ref="jForm"
      foot-active
    >
      <template #description="">11</template>
    </j-form>
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
      formConfigMap: {
        1: require('@/views/requirement/config/requirement_detail').default,
        2: require('@/views/requirement/config/bug_detail').default,
      },
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
      this.getRequirementDetail();
    },
    // 获取需求详情
    getRequirementDetail() {
      let { requirementId } = this.query;
      return this.$api.REQUIREMENT_DETAIL(requirementId).then(res => {
        let { status, type } = res;
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
        let formConfig = this.formConfigMap[type];

        this.formConfig = formConfig;
        if (`${type}` === typeMap.requirement) {
          this.formConfig.status.options = [
            { label: '保持', value: status },
            { label: '已完成', value: statusMap.done },
          ];
        } else {
          this.formConfig.status.options = statusActionMap[status] || [{ label: '保持', value: status }];
        }

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
      delete params.typeText;
      delete params.severityText;
      delete params.priorityText;
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
.page-requirement-detail {
  transform: translate3d(0, 0, 0);
}
</style>
