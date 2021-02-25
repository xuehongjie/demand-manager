import url from '@/url';
import { statusText } from '@/map/requirement/status';
import { severityText } from '@/map/requirement/severity';
import { priorityText } from '@/map/requirement/priority';
import { typeText } from '@/map/requirement/type';

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
   * @description 获取需求列表
   * @param {Object} page 分页参数
   */
  REQUIREMENT_TODO_LIST(data) {
    return request({
      method: 'POST',
      url: requirement.todoList,
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
  /**
   * @description 查询需求详情
   * @param {*} id 需求id
   */
  REQUIREMENT_DETAIL(id) {
    return request({
      method: 'POST',
      url: requirement.detail,
      data: { id },
    })
      .then(res => {
        let { type, severity, priority } = res;

        return {
          ...res,
          typeText: typeText[type],
          severityText: severityText[severity],
          priorityText: priorityText[priority],
        };
      })
      .catch(e => {
        return {};
      });
  },
});
