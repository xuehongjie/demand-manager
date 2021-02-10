// 需求状态
export const statusMap = {
  todo: 0,
  accept: 1,
  done: 2,
  closed: 3,
  cancel: 4,
};

export const statusText = {
  [statusMap.todo]: '待处理',
  [statusMap.accept]: '已接受',
  [statusMap.done]: '已解决',
  [statusMap.closed]: '已关闭',
  [statusMap.cancel]: '已取消',
};
