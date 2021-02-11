import url from '@/url';
import { statusText } from '@/map/requirement/status';
import { severityText } from '@/map/requirement/severity';
import { priorityText } from '@/map/requirement/priority';

const { requirement } = url;

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  /**
   * @description 获取需求列表
   * @param {Object} page 分页参数
   */
  REQUIREMENT_LIST(data) {
    return request({
      method: 'POST',
      url: requirement.list,
      data,
    }).then(res => {
      let { list } = res;
      list = list.map(item => {
        let { status, severity, priority } = item;

        return {
          ...item,
          statusText: statusText[status],
          severityText: severityText[severity],
          priorityText: priorityText[priority],
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
