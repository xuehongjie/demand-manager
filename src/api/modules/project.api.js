export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 获取项目列表
   * @param {Object} page 分页参数
   */
  PROJECT_LIST(page = {}) {
    // 模拟数据
    mock.onAny('/project/list').reply(config => {
      return tools.responseSuccess([
        {
          id: 1,
          name: '项目1',
          img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          desc: '',
        },
        {
          id: 2,
          name: '项目2',
          img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          desc: '',
        },
      ]);
    });
    // 接口请求
    return requestForMock({
      url: '/project/list',
      method: 'post',
    });
  },
});
