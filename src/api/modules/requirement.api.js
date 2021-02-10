import url from '@/url';
import { statusText } from '@/map/requirement/status';
import { levelText } from '@/map/requirement/level';

const { requirement } = url;

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 获取需求列表
   * @param {Object} page 分页参数
   */
  REQUIREMENT_LIST(page = {}) {
    return request({
      method: 'POST',
      url: requirement.list,
      data: page,
    }).then(res => {
      let { list } = res;
      list = list.map(item => {
        let { status, level } = item;

        return {
          ...item,
          statusText: statusText[status],
          levelText: levelText[level],
        };
      });
      return {
        ...res,
        list,
      };
    });
  },
  /**
   * @description 新增/修改需求
   * @param {Object} data 需求数据
   */
  REQUIREMENT_ADD_OR_UPDATE(data = {}) {
    return request({
      method: 'POST',
      url: requirement.addOrUpdate,
      data,
    });
  },
});
