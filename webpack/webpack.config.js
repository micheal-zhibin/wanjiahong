const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: {
		vendor: ['react', 'react-dom', 'babel-polyfill', 'jquery']
	},
	resolve: {
		modules: [path.resolve(__dirname, '../node_modules')]
	},
	devtool: 'cheap-module-eval-source-map',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'app/[name]_[hash:8].js'
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}]
		}, {
			test: /\.scss$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'sass-loader'
			}]
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {}
			}]
		}]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
		})
	]
}