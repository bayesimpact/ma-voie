const path = require('path')
const webpack = require('webpack')
const mapKeys = require('lodash/mapKeys')
const mapValues = require('lodash/mapValues')

const baseConfig = require('./base')
const colors = require('./colors.json5')
const constants = require('./const.json5')


module.exports = {
  devtool: 'eval',
  entry: './test/webpack/loadtests.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|css|sass|scss|less|styl|txt)$/,
        use: 'null-loader',
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: 'json5-loader',
      },
      {
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../test/webpack'),
        ],
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ...mapKeys(mapValues(colors, () => '""'), (color, name) => `colors.${name}`),
      ...mapKeys(mapValues(constants, () => '""'), (value, key) => `config.${key}`),
      'config.canonicalUrl': '"https://www.example.com"',
      'config.clientVersion': '""',
      'config.environment': '"test"',
      'config.partnerUrls': '"{}"',
    }),
  ],
  resolve: baseConfig.resolve,
}
