// 创建响应格式数据模型 规范化
class BaseModel{
    constructor(data,message){
        // 特殊处理：如果data是字符串类型则对其处理，添加messages属性给字符串数据
        // 将data和msg参数都置为null，防止程序往下走满足if进行赋值
        if(typeof data == "string"){
            // this.xxx 给该类添加属性
            this.message = data
            data = null
            message = null
        }
        if(data){
            this.data = data
        }
        if(message){
            this.message = message
        }
    }
}

// 成功模型
class SuccessModel extends BaseModel{
    constructor(data,message){
        // 执行父类的构造函数
        super(data,message)
        this.errno = 0
    }
}

// 失败模型
class ErrorModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
} 