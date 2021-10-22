const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
mode: "development",
entry: "./src/index.js",
output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js",
},
module: {
    rules: [
    {
        test: /\.jsx?$/,
        use: "babel-loader",
    },
    ],
},
plugins: [
    new htmlWebpackPlugin({
    filename: "index.html",
    template: path.resolve(__dirname, "./public/index.html"),
    }),
],
devServer: {
// 当使用 [HTML5 History API] 时，任意的 `404` 响应被替代为 `index.html`
    historyApiFallback: true,
    open: true, // 自动打开浏览器
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port: 9000,
},
};
