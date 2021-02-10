const { VUE_APP_API } = process.env;

const files = require.context('./modules', true, /\.js$/);

let urlMaps = files.keys().reduce((res, item) => {
  const filename = item.replace(/(.*\/)*([^.]+).*/, '$2');
  const urls = require(`./modules/${filename}.js`).default;

  res[filename] = urls;
  return res;
}, {});
export default {
  apiHost: VUE_APP_API,
  ...urlMaps,
};
