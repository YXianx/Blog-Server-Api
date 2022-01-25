const {execSQL} = require('../db/mysql')
// 验证码库
const vCode = require('svg-captcha')
// 后台存储验证码 进行比对
var codeText = null

// 注册用户
const createNewUser = (userData)=>{
    let name = userData.name
    let username = userData.username
    let password = userData.password
    let email = userData.email
    let image = userData.image

    const sql = `INSERT INTO users(name,username,password,email,image) values('${name}','${username}','${password}','${email}','${image}')`
    return execSQL(sql).then(insertedUser=>{
        console.log("insertedUser",insertedUser);
        return {
            id:insertedUser.insertId
        }
    })
}

// 检验用户是否存在
const checkNewUser = (userData)=>{
    let username = userData.username

    const sql = `SELECT * FROM users where username='${username}'`
    return execSQL(sql)
}

// 用户登录信息验证
const checkUserLogin = (userData)=>{
    console.log("post",userData);
    let uname = userData.username
    let pwd = userData.password
    const sql = `SELECT * FROM users where username='${uname}' and password='${pwd}'`
    return execSQL(sql) 
}

// 生成验证码
const createLoginCode = ()=>{
    const code = vCode.create({
        fontSize:50,
        width:100,
        height:32,
        noise:6
    })

    codeText = code.text
    console.log("userlogin-code:",codeText);
    // 只给验证码SVG图片到前端，如果连text答案也给过去那么验证码毫无验证意义
    return code.data
}

const getCodeText = ()=>{
    return codeText
}

module.exports = {
    createNewUser,
    checkNewUser,
    checkUserLogin,
    createLoginCode,
    getCodeText
}