const merge = require('webpack-merge')
const common = require('./config/webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'verbose',
  devServer: {
    contentBase: 'dist',
  },
})
