const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  source: path.join(__dirname, '../source/client'),
  assets: path.join(__dirname, '../source/client/assets/'),
  css: path.join(__dirname, '../source/client/css/'),
  fonts: path.join(__dirname, '../source/client/assets/fonts/'),
  images: path.join(__dirname, '../source/client/assets/img'),
  javascript: path.join(__dirname, '../source/client/js'),
  svg: path.join(__dirname, '../source/client/assets/svg'),
  build: path.join(__dirname, '../source/client/build'),
  templates: path.join(__dirname, '../source/templates'),
};

const outputFiles = require('./output-files').outputFiles;

const NODE_ENV = process.env.NODE_ENV || 'development';
const HYDRATE = process.env.HYDRATE === 'true';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// ----------
// PLUGINS
// ----------

// Shared plugins
const plugins = [
  // Extracts CSS to a file
  new ExtractTextPlugin(outputFiles.css),
  // Injects env variables to our app
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      HYDRATE: JSON.stringify(HYDRATE) === 'true',
    },
  }),
];

if (IS_PRODUCTION) {
  // Shared production plugins
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    })
  );
} else {
  // Shared development plugins
  plugins.push(
    // Enables pretty names instead of index
    new webpack.NamedModulesPlugin()
  );
}

// ----------
// RULES
// ----------

// Shared rules
const rules = [
  // Babel loader
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  // SVG are imported as react components
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                removeTitle: true,
              },
            ],
            floatPrecision: 3,
          },
        },
      },
    ],
    include: paths.svg,
  },
  // Images
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: paths.images,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/assets/[name]-[hash].[ext]',
        },
      },
    ],
  },
  // Fonts
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    include: paths.fonts,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/fonts/[name]-[hash].[ext]',
        },
      },
    ],
  },
];


// For both production and server ExtractTextPlugin is used
if (IS_PRODUCTION) {
  rules.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
            },
          },
          'sass-loader',
        ],
      }),
    }
  );
} else {
  rules.push(
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "style-loader", // creates style nodes from JS strings
          options: { sourceMap: true },
        }, 
        {
          loader: "css-loader", // translates CSS into CommonJS
          options: {
            importLoaders: 1,
            sourceMap: true,
          },
        }, 
        {
          loader: "sass-loader", // compiles Sass to CSS
          options: { sourceMap: true },
        }
      ]
    }
  );
}

// ----------
// RESOLVE
// ----------

const resolve = {
  extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
  modules: [
    path.join(__dirname, '../node_modules'),
    paths.javascript,
    paths.assets,
    paths.css,
  ],
};

// ----------
// CLI STATS
// ----------

const stats = {
  colors: true,
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
};

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  outputFiles,
  paths,
  plugins,
  resolve,
  rules,
  stats,
};
