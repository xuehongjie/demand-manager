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
    width: 200,
  },
  forecast_end_time: {
    type: 'datePicker',
    label: '预计结束时间',
    props: {},
    width: 200,
  },
  status: {
    type: 'radio',
    label: '下一状态',
    options: [],
  },
};
