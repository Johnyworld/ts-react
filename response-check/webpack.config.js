const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
    },
    entry: {
        app: './index'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader'
        }]
    },
    plugins: [],
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist'
    }
}