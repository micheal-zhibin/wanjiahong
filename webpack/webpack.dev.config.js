const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config')

process.env.NODE_ENV = 'development'

module.exports = merge(webpackConfig, {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:9090',
		'webpack/hot/only-dev-server',
		path.resolve(__dirname, '../src/index.js')
	],
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'procosee.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.template.html'),
			inject: true
		}),
		new webpack.NoEmitOnErrorsPlugin(),
	]
})