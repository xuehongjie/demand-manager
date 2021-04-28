const _import = require('@/libs/util.import.' + process.env.NODE_ENV);

export default [
  {
    path: 'user/list',
    name: 'userList',
    meta: {
      title: '用户',
      auth: true,
    },
    component: _import('user/list'),
  },
];
