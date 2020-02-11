const path = required('path');
const webpack = required('webpack');

module.exports = {
    mode: 'development', // production
    devtool: 'eval', // hidden-source-map
    resolve: {
        extensions: ['.jsx', 'js', '.tsx', '.ts'],
    },
    // module, plugins 에 적힌 처리 과정을 entry.app 에 적힌 파일에 적용해서 
    // 최종 output.filename (app.js)를 뽑아 냄.
    extry: {
        app: './client'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
        }]
    },
    plugins: {

    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist')
    }
}