const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};
console.log(PATHS);
process.env.BABEL_ENV = TARGET;

const common = {

	entry: {
		app: PATHS.app
	},
	resolve: {
		extensions: ['', '.js']
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			// {
			// 	test: /\.css$/,
			// 	loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
			// 	include: PATHS.app
			// },
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader'],
				include: PATHS.app
			}
		]
	}
};

if(TARGET === 'start' || !TARGET){
	module.exports = merge(common, {

		devtool: 'eval-source-map',

	    devServer: {
	      contentBase: PATHS.build,

	      // Enable history API fallback so HTML5 History API based
	      // routing works. This is a good default that will come
	      // in handy in more complicated setups.
	      historyApiFallback: true,
	      hot: true,
	      inline: true,
	      progress: true,

	      // Display only errors to reduce the amount of output.
	      stats: 'errors-only',

	      // Parse host and port from env so this is easy to customize.
	      //
	      // If you use Vagrant or Cloud9, set
	      // host: process.env.HOST || '0.0.0.0';
	      //
	      // 0.0.0.0 is available to all network devices unlike default
	      // localhost
	      host: process.env.HOST,
	      port: process.env.PORT
	    },
	    plugins: [
	      new webpack.HotModuleReplacementPlugin(),
	      new NpmInstallPlugin()
	    ]
	  });
}

if(TARGET === 'build'){
	module.exports = merge(common, {});
}