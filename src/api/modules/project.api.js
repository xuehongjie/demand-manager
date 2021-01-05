let projectList = [
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
];

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 获取项目列表
   * @param {Object} page 分页参数
   */
  PROJECT_LIST(page = {}) {
    // 模拟数据
    mock.onAny('/project/list').reply(config => {
      return tools.responseSuccess(projectList);
    });
    // 接口请求
    return requestForMock({
      url: '/project/list',
      method: 'post',
    });
  },
  /**
   * @description 新增项目
   * @param {Object} data 项目数据
   */
  PROJECT_ADD(data = {}) {
    // 模拟数据
    mock.onAny('/project/add').reply(config => {
      projectList.push({
        id: faker.random.uuid(),
        img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        desc: '',
        ...data,
      });
      return tools.responseSuccess();
    });
    // 接口请求
    return requestForMock({
      url: '/project/add',
      method: 'post',
    });
  },
  /**
   * @description 删除项目
   * @param {Object} data 项目数据
   */
  PROJECT_DELETE(id) {
    // 模拟数据
    mock.onAny('/project/delete').reply(config => {
      let index = projectList.findIndex(project => project.id === id);

      console.log('----------index', index);
      projectList.splice(index, 1);
      return tools.responseSuccess(true);
    });
    // 接口请求
    return requestForMock({
      url: '/project/delete',
      method: 'post',
    });
  },
});
