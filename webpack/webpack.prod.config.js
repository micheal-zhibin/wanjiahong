const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackConfig, {
	entry: [
		'babel-polyfill',
		path.resolve(__dirname, '../src/index.prod.js')
	],
	plugins: [
		new UglifyJSPlugin({
			uglifyOptions: {
				output: {
					comments: false,
					beautify: false,
				},
			},
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.template.html'),
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				removeTagWhitespace: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
			}
		}),
	]
})