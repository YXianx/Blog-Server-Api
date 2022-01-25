const mysql = require('mysql')
// 配置参数单独抽离
const {MYSQL_CONFIG} = require('../config/db.config.js')

// 创建连接对象
var conn;

// 执行sql语句时，创建新连接，防止长时间不操作连接挂断
function execSQL(sql){
    return new Promise((resolve,reject)=>{
        conn = mysql.createConnection(MYSQL_CONFIG)
        conn.connect(connectState)
        conn.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
        conn.end()
    })
}

function connectState(err,data){
    if(err){
        console.error(err);
    }
    if(data){
        console.log("connection is success:",data);
    }
}

module.exports = {
    execSQL
}