const queryString = require('querystring')

const serverHandler = (req,res,next)=>{
    // 设置 响应格式
    res.setHeader('Content-Type','application/json')
    //设置允许跨域的域名，*代表允许任意域名跨域 如不设置前端请求跨域过不来
    res.setHeader("Access-Control-Allow-Origin","*");
    //跨域允许的header类型
    res.setHeader("Access-Control-Allow-Headers","Content-type,Content-Length,Authorization,Accept,X-Requested-Width");
    //跨域允许的请求方式
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")

    next()
}

module.exports = serverHandler
