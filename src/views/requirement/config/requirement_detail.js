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
  actual_start_time: {
    type: 'datePicker',
    label: '实际开始时间',
    props: {},
  },
  actual_end_time: {
    type: 'datePicker',
    label: '实际结束时间',
    props: {},
  },
  status: {
    type: 'radio',
    label: '下一状态',
    options: [],
  },
};
