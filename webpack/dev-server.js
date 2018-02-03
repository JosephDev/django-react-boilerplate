const paths = require('./config').paths;
const IS_PRODUCTION = require('./config').IS_PRODUCTION;
const DEV_SERVER = {
  host: '127.0.0.1',
  protocol: 'http:',
  port: 8000,
};

const devServer = {
  contentBase: IS_PRODUCTION ? paths.build : paths.source,
  historyApiFallback: true,
  port: 3000,
  proxy: {
    '/api': {
      target: DEV_SERVER,
    },
  },
  compress: IS_PRODUCTION,
  inline: !IS_PRODUCTION,
  hot: !IS_PRODUCTION,
  host: '127.0.0.1',
  disableHostCheck: true, // To enable local network testing
  overlay: true,
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: true,
  },
};

module.exports = {
  devServer,
};
