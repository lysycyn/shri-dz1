const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';

const devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
});

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve('./build'),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
            },
            {
                test: /\.(png)$/,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
    },
    devServer: {
        contentBase: './build',
        noInfo: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        compress: true,
        port: PORT,
        host: HOST,
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index'],
        }),
        devFlagPlugin,
    ],
};
