import url from '@/url';

const { project } = url;

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 获取项目列表
   * @param {Object} page 分页参数
   */
  PROJECT_LIST(page = {}) {
    return request({
      method: 'POST',
      url: project.list,
      data: page,
    });
  },
  /**
   * @description 获取项目列表
   * @param {Object} page 分页参数
   */
  PROJECT_TAB_LIST(page = {}) {
    return request({
      method: 'POST',
      url: project.tabList,
      data: page,
    }).then(list => {
      return (list || []).map(item => {
        let { id } = item;
        return {
          ...item,
          value: `${id}`,
        };
      });
    });
  },
  /**
   * @description 新增/修改项目
   * @param {Object} data 项目数据
   */
  PROJECT_ADD_OR_UPDATE(data = {}) {
    return request({
      method: 'POST',
      url: project.addOrUpdate,
      data,
    });
  },
  /**
   * @description 删除项目
   * @param {Object} id 项目id
   */
  PROJECT_DELETE(id) {
    return request({
      method: 'POST',
      url: project.delete,
      data: { id },
    });
  },
  /**
   * @description 给用户分配项目
   * @param {Object} ids 用户id
   */
  PROJECT_ASSIGN(data = {}) {
    return request({
      method: 'POST',
      url: project.assign,
      data,
    });
  },
  /**
   * 获取可授权的用户列表
   * @returns 可授权的列表
   */
  PROJECT_AUTH_LIST() {
    return request({
      method: 'POST',
      url: project.authList,
    });
  },
});
