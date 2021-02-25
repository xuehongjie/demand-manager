export default {
  title: {
    type: 'text',
    label: '标题',
  },
  description: {
    type: 'text',
    label: '需求描述',
  },
  typeText: {
    type: 'text',
    label: '缺陷类型',
  },
  severityText: {
    type: 'text',
    label: '严重程度',
  },
  priorityText: {
    type: 'text',
    label: '优先级',
  },
  handler_id: {
    type: 'select',
    label: '处理人',
    props: {},
    options: [],
  },
  status: {
    type: 'radio',
    label: '下一状态',
    options: [],
  },
};
