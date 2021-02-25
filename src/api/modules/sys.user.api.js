import url from '@/url';

const { user } = url;

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN(data = {}) {
    return request({
      method: 'POST',
      url: user.login,
      data,
    });
  },
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LIST(data = {}) {
    return request({
      method: 'POST',
      url: user.list,
      data,
    })
      .then(list => {
        return (list || []).map(item => {
          let { id, username } = item;

          return {
            ...item,
            label: username,
            value: id,
          };
        });
      })
      .catch(e => {
        return [];
      });
  },
});
