const _import = require('@/libs/util.import.' + process.env.NODE_ENV);

export default [
  {
    path: 'project/list',
    name: 'projectList',
    meta: {
      title: '项目',
      auth: true,
      cache: true,
    },
    component: _import('project/list'),
  },
];
