const { SuccessModel, ErrorModel } = require("../model/responseModel");
const {
    createNewUser,
    checkNewUser,
    checkUserLogin,
    createLoginCode,
    getCodeText
} = require('../controllers/user')

const userRouter = (app)=>{
    // 注册用户
    app.post('/api/user/new',(req,res)=>{
        const newUserDataPromise = createNewUser(req.body);
        if(newUserDataPromise){
            newUserDataPromise.then(newUserData=>{
                console.log(newUserData);
                if(newUserData)
                    res.send(new SuccessModel(newUserData))
                else
                    res.send(new ErrorModel(newUserData))
            })
        }
    })

    // 检验用户是否存在
    app.get('/api/user/check',(req,res)=>{
        const checkNewUserDataPromise = checkNewUser(req.query)
        if(checkNewUserDataPromise){
            checkNewUserDataPromise.then(checkUserData=>{
                console.log(checkUserData);
                if(checkUserData)
                    res.send(new SuccessModel(checkUserData))
                else
                    res.send(new ErrorModel(checkUserData))
            })
        }
    })

    // 用户登录
    app.post('/api/user/login',(req,res)=>{
        let userCode = req.body.code
        let systemCode = req.session.code

        // 验证码比对
        if(userCode === systemCode){
            // 账号密码比对
            const checkUserLoginDataPromise = checkUserLogin(req.body)
            if(checkUserLoginDataPromise){
                checkUserLoginDataPromise.then(checkUserLoginData=>{
                    console.log(checkUserLoginData);
                    if(checkUserLoginData){
                        // session保存用户信息
                        let userData = checkUserLoginData[0]
                        req.session.userdata = userData

                        res.send(new SuccessModel(checkUserLoginData))
                    }
                    else
                        res.send(new ErrorModel(checkUserLoginData))
                })
            }
        }
        else    
            res.send(new ErrorModel("验证码错误"));

    })

    // 生成验证码
    app.post('/api/user/login/code',(req,res)=>{
        var code = createLoginCode()
        let text = getCodeText()
        // 将验证码存入session
        req.session.code = text
        res.send(new SuccessModel(code))
    })

    // 发送用户Session
    app.post('/api/user/info',(req,res)=>{
        if(req.session.userdata){
            res.send(
                new SuccessModel(req.session.userdata)
            )
        }
        else{
            res.send(new ErrorModel("用户未登录"))
        }
    })
}

module.exports = userRouter