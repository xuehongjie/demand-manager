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
    label: '缺陷描述',
    props: {},
    rules: [{ required: true, message: '需求描述不能为空' }],
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
  handler_id: {
    type: 'select',
    label: '处理人',
    width: 200,
    props: {},
    options: [],
  },
};
