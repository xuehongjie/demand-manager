import jForm from './src/index.vue';
import VueDND from 'zero-dnd';

// 为组件提供 install 安装方法，供按需引入
// 默认导出组件
export default {
  install(Vue) {
    Vue.use(VueDND);
    Vue.component(jForm.name, jForm);
  },
};
