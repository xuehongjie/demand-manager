export default {
  title: {
    type: 'input',
    label: '标题',
    props: {
      type: 'text',
    },
    rules: [{ required: true, message: '标题不能为空' }],
  },
  description: {
    type: 'editor',
    label: '需求描述',
    props: {},
    rules: [{ required: true, message: '需求描述不能为空' }],
  },
  priority: {
    type: 'select',
    label: '优先级',
    width: '300px',
    props: {
      type: 'text',
    },
    options: [],
  },
  handler_id: {
    type: 'select',
    label: '处理人',
    width: '300px',
    props: {},
    options: [],
  },
};
