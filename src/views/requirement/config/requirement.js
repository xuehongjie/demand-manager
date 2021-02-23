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
  forecast_start_time: {
    type: 'datePicker',
    label: '预计开始时间',
    props: {},
  },
  forecast_end_time: {
    type: 'datePicker',
    label: '预计结束时间',
    props: {},
  },
  handler_id: {
    type: 'select',
    label: '处理人',
    width: 200,
    props: {},
    options: [],
  },
};
