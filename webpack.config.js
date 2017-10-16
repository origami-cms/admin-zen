const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PATH_DIST = path.resolve(__dirname, './dist');
const PATH_SRC = path.resolve(__dirname, './src');

module.exports = {
    entry: path.resolve('./src/main.js'),
    output: {
        path: PATH_DIST,
        filename: 'admin.js'
    },
    devServer: {
        contentBase: PATH_SRC,
        hot: true,
        open: true,
        inline: true
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                include: [
                    PATH_SRC
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'actions': path.resolve(PATH_SRC, 'actions'),
            'router': path.resolve(PATH_SRC, 'router'),
            'stores': path.resolve(PATH_SRC, 'stores'),
            'containers': path.resolve(PATH_SRC, 'containers'),
            'components': path.resolve(PATH_SRC, 'components'),
            'reducers': path.resolve(PATH_SRC, 'reducers'),
            'lib': path.resolve(PATH_SRC, 'lib'),
            'styles': path.resolve(PATH_SRC, 'styles')
        }
    },
    plugins: [new HTMLWebpackPlugin({
        template: path.resolve('./index.html')
    })]
}
