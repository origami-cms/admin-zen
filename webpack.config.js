const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PATH_DIST = path.resolve(__dirname, './dist');
const PATH_SRC = path.resolve(__dirname, './src');

module.exports = {
    entry: path.resolve('./src/main.js'),
    output: {
        path: PATH_DIST,
        filename: 'admin.js',
        publicPath: '/admin/'
    },
    devtool: 'eval-source-map',
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
                test: /\.s?css$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(svg|jpg|png)/,
                loader: 'file-loader',
                exclude: /loading\.svg/
            }
        ]
    },
    resolve: {
        alias: {
            'const': path.resolve(PATH_SRC, 'const'),
            'actions': path.resolve(PATH_SRC, 'actions'),
            'router': path.resolve(PATH_SRC, 'router'),
            'stores': path.resolve(PATH_SRC, 'stores'),
            'containers': path.resolve(PATH_SRC, 'containers'),
            'components': path.resolve(PATH_SRC, 'components'),
            'reducers': path.resolve(PATH_SRC, 'reducers'),
            'lib': path.resolve(PATH_SRC, 'lib'),
            'styles': path.resolve(PATH_SRC, 'styles'),
            'images': path.resolve(PATH_SRC, 'images'),

            'icons': path.resolve(__dirname, 'node_modules/origami-icons'),
            'origami-css': path.resolve(__dirname, 'node_modules/origami-css')
        }
    },
    plugins: [new HTMLWebpackPlugin({
        template: path.resolve('./index.html')
    })]
}
