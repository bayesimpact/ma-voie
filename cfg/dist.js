const path = require('path')
const webpack = require('webpack')
const RenameOutputWebpackPlugin = require('rename-output-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const fromPairs = require('lodash/fromPairs')
const mapKeys = require('lodash/mapKeys')
const mapValues = require('lodash/mapValues')

const baseConfig = require('./base')
const entrypoints = require('./entrypoints')
const colors = require('./colors.json5')
const constants = require('./const.json5')
const distConstants = require('./const_dist.json5')

const srcDir = path.resolve(__dirname, '../src') + '/'

const finalDistConstants = {
  ...constants,
  ...distConstants,
}


const minify = {
  collapseWhitespace: true,
  decodeEntities: true,
  minifyCSS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
}


module.exports = {
  ...baseConfig,
  bail: true,
  cache: false,
  devtool: 'source-map',
  entry: mapValues(entrypoints, ({entry}) => ['@babel/polyfill', 'whatwg-fetch'].concat([entry])),
  mode: 'production',
  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules,
      {
        include: [
          path.join(__dirname, '/../src'),
        ],
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      sourceMap: true,
      // TODO(pascal): Find a way to reenable the warnings without slowing down
      // the build 10 times. Probably related to
      // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/286
      terserOptions: {warnings: false},
      warningsFilter: source => source && source.slice(0, srcDir.length) === srcDir,
    })],
  },
  output: {
    chunkFilename: '[name].[hash].js',
    filename: '[name].[hash].js',
    path: path.join(__dirname, '/../dist/assets'),
    publicPath: `${process.env.HREF_BASE || ''}/assets/`,
  },
  plugins: [
    ...baseConfig.plugins,
    // Define free variables -> global constants.
    new webpack.DefinePlugin({
      ...mapKeys(mapValues(colors, JSON.stringify), (color, name) => `colors.${name}`),
      ...mapKeys(
        mapValues(finalDistConstants, JSON.stringify),
        (value, key) => `config.${key}`),
      'config.clientVersion': JSON.stringify(process.env.CLIENT_VERSION),
      'config.environment': '"production"',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
    // Embed the JavaScript in the index.html page.
    ...Object.keys(entrypoints).filter(key => entrypoints[key].htmlFilename).map(key =>
      new HtmlWebpackPlugin({
        chunks: [key],
        filename: `../${entrypoints[key].htmlFilename}`,
        minify,
        template: path.join(__dirname, '/../src/index.tsx'),
      }),
    ),
    ...Object.keys(entrypoints).filter(key => entrypoints[key].htmlFilename).map(key =>
      new HtmlWebpackPlugin({
        chunks: [key],
        filename: `../en.${entrypoints[key].htmlFilename}`,
        minify,
        template: path.join(__dirname, '/../src/en.index.tsx'),
      }),
    ),
    new WebpackPwaManifest({
      // eslint-disable-next-line camelcase
      background_color: colors.REDDISH_ORANGE,
      lang: 'fr-FR',
      name: finalDistConstants.productName,
      // eslint-disable-next-line camelcase
      theme_color: colors.REDDISH_ORANGE,
    }),
    new RenameOutputWebpackPlugin(fromPairs(
      Object.keys(entrypoints).filter(key => !entrypoints[key].htmlFilename).
        map(key => [key, '[name].js']),
    )),
  ],
}
