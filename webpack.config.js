var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const prodPlugin = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        output: {comments: false},
        sourceMap: 'cheap-source-map'
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
]

module.exports = {
    entry:  {
          app: __dirname + '/src/index.js',
    },
    output: {
        path:  __dirname + '/output',
        filename: 'js/[name].bundle.js'
        //publicPath:'网址开头'用于上线时添加
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: "./output",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /node_modules/, 
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                include: /node_modules/, 
                loaders: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/, 
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                        }
                    }
                ]
             },
            {
                test:/\.less$/,
                loaders:['style-loader','css-loader','less-loader']
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            filename:'index.html',
             // inject:'head', // 或者 inject:'body',
             template:'src/src.html',
             title:'webpack is good'
             //minify 上线时压缩，
            //new htmlWebpackPlugin({
           // filename:'index-[chunkhash].html',
            // inject:'head', // 或者 inject:'body',
           // template:'index.html',
          //  title:'webpack is good'
            //minify 上线时压缩
            //chunk:
            //excludeChunks
        })
    ].concat(isProduction ? prodPlugin : [])
}
