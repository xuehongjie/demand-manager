import { uniqueId } from 'lodash';

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...(e.children ? { children: supplementPath(e.children) } : {}),
  }));
}

export const menuHeader = supplementPath([]);

export const menuAside = supplementPath([
  { path: '/index', title: '工作台', icon: 'home' },
  { path: '/project/list', title: '项目', icon: 'th-large' },
  {
    path: '',
    title: '系统管理',
    icon: 'cogs',
    children: [{ path: '/user/list', title: '用户', icon: 'user' }],
  },
]);
