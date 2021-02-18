import url from '@/url';

const { common } = url;

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  getDictionary(code) {
    return request({
      method: 'POST',
      url: common.dictionary,
      data: {
        code,
      },
    });
  },
});
