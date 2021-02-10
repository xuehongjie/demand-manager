const _import = require('@/libs/util.import.' + process.env.NODE_ENV);

export default [
  {
    path: 'requirement/list',
    name: 'requirementList',
    meta: {
      title: '需求',
      auth: true,
    },
    component: _import('requirement/list'),
  },
  {
    path: 'requirement/detail',
    name: 'requirementDetail',
    meta: {
      title: '需求',
      auth: true,
    },
    component: _import('requirement/detail'),
  },
];
