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
    path: 'requirement/publish',
    name: 'requirementPublish',
    meta: {
      title: '发布需求',
      auth: true,
    },
    component: _import('requirement/publish'),
  },
  {
    path: 'requirement/edit',
    name: 'requirementEdit',
    meta: {
      title: '修改需求',
      auth: true,
    },
    component: _import('requirement/publish'),
  },
  {
    path: 'requirement/detail',
    name: 'requirementDetail',
    meta: {
      title: '需求详情',
      auth: true,
    },
    component: _import('requirement/detail'),
  },
];
