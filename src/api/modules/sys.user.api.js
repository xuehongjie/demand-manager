import { find, assign } from 'lodash';

const users = [
  { username: 'admin', password: 'admin', uuid: 'admin-uuid', name: 'Admin' },
  { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: 'Editor' },
  { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: 'User1' },
  { username: 'test', password: '123456', uuid: 'test-uuid', name: '测试' },
];

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN(data = {}) {
    // 模拟数据
    mock.onAny('/login').reply(config => {
      // 查找用户是否存在
      const user = find(users, tools.parse(config.data));
      // 用户存在，且密码正确则返回成功的token，用户不存在或用户名密码不正确则返回错误提示
      return user
        ? tools.responseSuccess(assign({}, user, { token: faker.random.uuid() }))
        : tools.responseError({}, '账号或密码不正确');
    });
    // 接口请求
    return requestForMock({
      url: '/login',
      method: 'post',
      data,
    });
  },
});
