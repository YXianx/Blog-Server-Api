const {execSQL} = require('../db/mysql')

// 获取博客列表
const getBlogList = (author,keyword)=>{
    // 1=1相当于没有条件，用于author和keyword参数没有传递的时候则查找全部数据
    let sql = `select * from blogs where 1=1 `

    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `and state=1`

    return execSQL(sql)
}

// 获取博客详情
const getBlogDetail = (id)=>{
    const sql = `select * from blogs where id='${id}' `
    return execSQL(sql).then(result=>{
        return result[0]
    })
}

// 新建博客
const createNewBlog = (blogData)=>{
    console.log("post数据:",blogData);
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const userId = blogData.userId
    const createdAt = (Date.now()/1000).toFixed(0)
    const image = blogData.image

    const sql = `
        INSERT INTO blogs (userId,title,content,author,createdAt,image) values(${userId},'${title}','${content}','${author}',${createdAt},'${image}')
    `

    return execSQL(sql).then(insertedResult=>{
        console.log("insertedResult",insertedResult);
        return {
            id:insertedResult.insertId
        }
    })
}

// 更新博客 blogData={}防止数据未传初始化为空对象{}
const updateBlog = (id,blogData={})=>{
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}',content='${content}' where id=${id}
    `

    return execSQL(sql).then(updateResult=>{
        console.log("updateResult",updateResult);
        if(updateResult.affectedRows>0)
            return true
        else
            return false
    })
}

// 删除博客
const deleteBlog = (id)=>{
    const sql = `
        update blogs set state=0 where id=${id}
    `
    
    return execSQL(sql).then(deleteResult=>{
        console.log("deleteResult",deleteResult);
        if(deleteResult.affectedRows>0){
            return true
        }
        else
            return false
    })
}

module.exports = {
    getBlogList,
    getBlogDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}