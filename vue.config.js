module.exports = {
//=>process.env.NODE_ENV：环境变量中存储的是生产环境还是开发环境
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
//=>outputDir
//=>自定义目录名称，把生成的JS/CSS/图片等静态资源放置到这个目录中
    assetsDir: 'assets',
//=>关闭生产环境下的资源映射（生产环境下不在创建xxx.js.map文件）
    productionSourceMap: false,
//=>设置一些webpack配置项，用这些配置项和默认的配置项合并
    configureWebpack: {
        plugins: []
    },
//=>直接去修改内置的webpack配置项
    chainWebpack: config => {
//=>config:原始配置信息对象
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options.limit = 200 * 1024;
                return options;
            });
    },
//=>修改webpack-dev-server配置（尤其是跨域代理）
    devServer: {
        proxy: {
//请求地址 /user/add
//代理地址 http://api.xxx.cn/user/add
            "/apis": {
                changeOrigin: true,
                target: "http://10.200.12.175:3000",
                pathRewrite:{
                    '^/apis':''
                }
            }
        },
        port:8083
    },
//=>多余1核cpu时：启动并行压缩
    parallel: require('os').cpus().length > 1
}