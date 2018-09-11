const path           = require('path')
const fs             = require('fs')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const srcDir         = path.resolve(process.cwd(), 'src')

const getEntry = function () {
	let source = path.resolve(srcDir, 'js')
	let dirs = fs.readdirSync(source)
	let matchs = [], files = {}

	dirs.forEach(function (item) {
		matchs = item.match(/(.+)\.js/)

		if (matchs) {
			files[matchs[1]] = path.resolve(srcDir, 'js', item)
		}
	})
	return files
}

module.exports = {
	// cache: false,
	// devtool: '#',
	mode: 'development',
	entry: getEntry(),
	output: {
		path: path.join(__dirname, '../dist/js/'),
		publicPath: 'dist/js/',
		filename: '[name].js',
		chunkFilename: '[chunkhash].js'
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					warnings: false,
					compress: {
						drop_debugger: false
					}
				}
				
			})
		]
	},
	plugins: []
}