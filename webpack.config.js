const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
mode: "development",
entry: "./src/index.js",
resolve:{
    extensions: [".js", ".jsx"],
    alias: {
        "@": path.resolve(__dirname, "./src"), // 这样配置后 @ 可以指向 src 目录
    },
},
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
    {
        test: /\.css$/,
        use: [
            {
                loader: 'style-loader'  // 可以把css放在页面上
            },
            {
                loader: 'css-loader'    // 放在后面的先被解析
            }
        ]
    }
    ],
},
plugins: [
    new htmlWebpackPlugin({
    filename: "index.html",
    template: path.resolve(__dirname, "./public/index.html"),
    }),
],

devServer: {
    open: false, // 自动打开浏览器
    // 默认为true
    hot: true,
    // 启动的端口
    port: 9000,
    proxy: {
        '/api/info': {
            target: 'http://localhost:9092', 
            pathRewrite: {"^/api/info" : "/api/info"}, 
            changeOrigin: true, // 加了这个属性，那后端收到的请求头中的host是目标地址 target
            // secure: false,   // 设置支持https协议的代理,
        },
        '/platform/service.do': {
            target: 'https://open.alipay.com',
            changeOrigin: true,    
            secure: false,          
        }, 
    
        }
},
};
