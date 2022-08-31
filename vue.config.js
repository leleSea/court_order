
let PROXY = {
    test: {
        '/api/court': {
            target: 'http://tennis.bjofp.cn',
            // target: 'http://ntc.chinaopen.com',
            ws: true,
            changeOrigin: false,
            pathRewrite: {
                '^/api/court': ''
            }
        },
        '/api/chinaCourt': {
            target: 'http://ntc.chinaopen.com',
            ws: true,
            changeOrigin: false,
            pathRewrite: {
                '^/api/chinaCourt': ''
            }
        },
    },
    // Cookie: JSESSIONID=3FE4CA6F5E7947A6B18CF38D6179C41B; openid=o6sCqt1Hh1cyTrW35LwtdtVOSTxk
    // http://ntc.chinaopen.com/TennisCenterInterface/umUser/getUserInfoByOpenid.action
    pro: {
        '/api/court':{
            target: 'http://tennis.bjofp.cn',
            // target: 'http://ntc.chinaopen.com',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/court': ''
            }
        }
    }
}
let model = 'test'
// let model = 'local'
// let model = 'pro'
let proxyData = PROXY[`${model}`]
module.exports = {
    // baseUrl: '/',
    // publicPath: process.env.NODE_ENV === 'production' ? 'https://assets.weiqiai.com' : '/',
    publicPath: '/',
    productionSourceMap: false,
    devServer: {
        // open: false,
        https: false,
        // host: 'localhost',
        port:8080,
        proxy: proxyData
    },
    configureWebpack: (config)=>{
        if(process.env.NODE_ENV === 'production'){
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
        if (process.env.NODE_ENV !== 'production') return;
        return {
            plugins: [],
        }
    },
}
