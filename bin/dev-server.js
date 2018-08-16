'use strict'

const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack/webpack.dev.config.js');
const webpack = require('webpack');
const path = require('path');
const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
	contentBase: path.resolve(__dirname, '../dist'),
	historyApiFallback: true,
	port: 9090,
	publicPath: '/',
	inline: true,
	hot: true,
})

server.listen(9090, 'localhost', function(err) {
	if (err) {
		throw err
	}
})