const
    path = require('path'),
    webpack = require('webpack');

module.exports = {
    // or devtool: 'eval' to debug issues with compiled output:
    devtool: 'cheap-module-eval-source-map',

    entry: [
        'webpack-hot-middleware/client',
        './app/index',
    ],

    output: {
        path      : path.join(__dirname, 'public/dist'),
        filename  : 'bundle.js',
        publicPath: '/public/dist/',
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
        loaders: [
            {
                test   : /\.jsx?$/,
                loader : 'babel-loader',
                exclude: [/node_modules/],

                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1'],
                },
            },

            {
                test   : /\.css$/,
                exclude: [/node_modules/],
                loader : [
                    'style-loader?sourceMap',
                    'css-loader?modules&camelCase=dashes&importLoaders=1&localIdentName=[local]__[hash:base64:5]!postcss-loader',
                ],
            },

            {
                test   : /\.css$/,
                include: [/node_modules/],
                loader : [
                    'style-loader?sourceMap',
                    'css-loader',
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.json', '.js'],

        modules: [
            path.resolve(__dirname, './', 'app'),
            path.resolve(__dirname, './', 'node_modules'),
        ],
    },

};
