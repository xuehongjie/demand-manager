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
   * @param {Object} data 项目数据
   */
  PROJECT_DELETE(id) {
    return request({
      method: 'POST',
      url: project.delete,
      data: { id },
    });
  },
});
